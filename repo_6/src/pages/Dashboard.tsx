import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Question, User } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEPARTMENTS } from '@/types';
import { MessageSquare, Eye, ChevronUp, Plus } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Dashboard() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent');
  const [department, setDepartment] = useState('All Departments');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, [sortBy, department]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      // Fetch questions
      const questionsRes = await fetch('http://localhost:3001/questions');
      const questionsData = await questionsRes.json();

      // Fetch users
      const usersRes = await fetch('http://localhost:3001/users');
      const usersData = await usersRes.json();
      const usersMap = usersData.reduce((acc: Record<string, User>, user: User) => {
        acc[user.id] = user;
        return acc;
      }, {});
      setUsers(usersMap);

      // Filter by department
      let filtered = department === 'All Departments'
        ? questionsData
        : questionsData.filter((q: Question) => q.department === department);

      // Sort
      if (sortBy === 'recent') {
        filtered.sort((a: Question, b: Question) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === 'popular') {
        filtered.sort((a: Question, b: Question) => b.upvotes - a.upvotes);
      } else if (sortBy === 'unanswered') {
        filtered = filtered.filter((q: Question) => q.answers.length === 0);
      }

      setQuestions(filtered);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Questions</h1>
            <p className="text-gray-600 mt-1">Ask questions and help your peers</p>
          </div>
          <Link to="/questions/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ask Question
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading questions...</div>
          ) : questions.length === 0 ? (
            <Card className="border shadow-sm">
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">No questions found. Be the first to ask!</p>
              </CardContent>
            </Card>
          ) : (
            questions.map((question) => {
              const author = users[question.userId];
              return (
                <Link key={question.id} to={`/questions/${question.id}`}>
                  <Card className="border shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors">
                            {question.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {question.content}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {question.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex flex-col items-end gap-2 text-sm text-gray-500 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <ChevronUp className="h-4 w-4" />
                            <span>{question.upvotes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{question.answers.length}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{question.views}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {author && (
                            <>
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={author.avatar} alt={author.name} />
                                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-gray-600">{author.name}</span>
                            </>
                          )}
                        </div>
                        <span className="text-gray-400">{formatTimeAgo(question.createdAt)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
