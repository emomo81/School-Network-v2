import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Question, Answer, User } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth';
import { ChevronUp, MessageSquare, Eye, ArrowLeft } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function QuestionDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answerAuthors, setAnswerAuthors] = useState<Record<string, User>>({});
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      // Fetch question
      const questionRes = await fetch(`http://localhost:3001/questions/${id}`);
      const questionData = await questionRes.json();
      setQuestion(questionData);

      // Fetch author
      const authorRes = await fetch(`http://localhost:3001/users/${questionData.userId}`);
      const authorData = await authorRes.json();
      setAuthor(authorData);

      // Fetch answers
      const answersRes = await fetch(`http://localhost:3001/answers?questionId=${id}`);
      const answersData = await answersRes.json();
      setAnswers(answersData);

      // Fetch answer authors
      const userIds = [...new Set(answersData.map((a: Answer) => a.userId))];
      const usersPromises = userIds.map(userId => 
        fetch(`http://localhost:3001/users/${userId}`).then(r => r.json())
      );
      const usersData = await Promise.all(usersPromises);
      const usersMap = usersData.reduce((acc: Record<string, User>, user: User) => {
        acc[user.id] = user;
        return acc;
      }, {});
      setAnswerAuthors(usersMap);

      // Increment views
      await fetch(`http://localhost:3001/questions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ views: questionData.views + 1 }),
      });
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim() || !user) return;

    setSubmitting(true);
    try {
      const answer: Answer = {
        id: Date.now().toString(),
        userId: user.id,
        questionId: id!,
        content: newAnswer,
        upvotes: 0,
        createdAt: new Date().toISOString(),
      };

      await fetch('http://localhost:3001/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answer),
      });

      setNewAnswer('');
      fetchQuestion();
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!question) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">Question not found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back button */}
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to questions
          </Button>
        </Link>

        {/* Question Card */}
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex gap-4">
              {/* Vote section */}
              <div className="flex flex-col items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ChevronUp className="h-6 w-6" />
                </Button>
                <span className="text-lg font-semibold">{question.upvotes}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap mb-4">{question.content}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{answers.length} answers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{question.views} views</span>
                    </div>
                  </div>
                  
                  {author && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link to={`/profile/${author.id}`} className="text-blue-600 hover:underline">
                          {author.name}
                        </Link>
                        <div className="text-xs text-gray-500">{formatTimeAgo(question.createdAt)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Answers */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{answers.length} Answers</h2>
          
          {answers.map((answer) => {
            const answerAuthor = answerAuthors[answer.userId];
            return (
              <Card key={answer.id} className="border shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ChevronUp className="h-5 w-5" />
                      </Button>
                      <span className="font-semibold">{answer.upvotes}</span>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-gray-700 whitespace-pre-wrap mb-4">{answer.content}</p>
                      
                      {answerAuthor && (
                        <div className="flex items-center gap-2 text-sm">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={answerAuthor.avatar} alt={answerAuthor.name} />
                            <AvatarFallback>{answerAuthor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Link to={`/profile/${answerAuthor.id}`} className="text-blue-600 hover:underline">
                            {answerAuthor.name}
                          </Link>
                          <span className="text-gray-400">{formatTimeAgo(answer.createdAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Answer Form */}
        <Card className="border shadow-sm">
          <CardHeader>
            <h3 className="text-lg font-semibold">Your Answer</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitAnswer} className="space-y-4">
              <Textarea
                placeholder="Write your answer here..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <Button type="submit" disabled={submitting || !newAnswer.trim()}>
                {submitting ? 'Submitting...' : 'Post Answer'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
