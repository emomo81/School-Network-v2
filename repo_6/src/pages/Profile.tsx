import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Question, Answer } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = currentUser?.id === id;

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Fetch user
      const userRes = await fetch(`http://localhost:3001/users/${id}`);
      const userData = await userRes.json();
      setProfileUser(userData);

      // Fetch user's questions
      const questionsRes = await fetch(`http://localhost:3001/questions?userId=${id}`);
      const questionsData = await questionsRes.json();
      setQuestions(questionsData);

      // Fetch user's answers
      const answersRes = await fetch(`http://localhost:3001/answers?userId=${id}`);
      const answersData = await answersRes.json();
      setAnswers(answersData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!profileUser) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">User not found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="border shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileUser.avatar} alt={profileUser.name} />
                <AvatarFallback className="text-2xl">{profileUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-2xl font-bold">{profileUser.name}</h1>
                    <p className="text-gray-600">{profileUser.email}</p>
                  </div>
                  {isOwnProfile && (
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary">{profileUser.department}</Badge>
                  <Badge variant="secondary">Year {profileUser.year}</Badge>
                </div>
                
                {profileUser.bio && (
                  <p className="text-gray-700 mb-4">{profileUser.bio}</p>
                )}
                
                {profileUser.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {profileUser.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{answers.length}</div>
                <div className="text-sm text-gray-600">Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {questions.reduce((sum, q) => sum + q.upvotes, 0) + 
                   answers.reduce((sum, a) => sum + a.upvotes, 0)}
                </div>
                <div className="text-sm text-gray-600">Reputation</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="questions">
          <TabsList>
            <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
            <TabsTrigger value="answers">Answers ({answers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4 mt-6">
            {questions.length === 0 ? (
              <Card className="border shadow-sm">
                <CardContent className="py-12 text-center text-gray-500">
                  No questions yet
                </CardContent>
              </Card>
            ) : (
              questions.map((question) => (
                <Card key={question.id} className="border shadow-sm">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{question.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{question.upvotes} upvotes</span>
                      <span>{question.answers.length} answers</span>
                      <span>{question.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="answers" className="space-y-4 mt-6">
            {answers.length === 0 ? (
              <Card className="border shadow-sm">
                <CardContent className="py-12 text-center text-gray-500">
                  No answers yet
                </CardContent>
              </Card>
            ) : (
              answers.map((answer) => (
                <Card key={answer.id} className="border shadow-sm">
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-3">{answer.content}</p>
                    <div className="text-sm text-gray-600">
                      {answer.upvotes} upvotes
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
