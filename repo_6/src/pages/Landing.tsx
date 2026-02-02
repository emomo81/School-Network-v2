import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Users, BookOpen, TrendingUp } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-lg">Academic Network</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Connect, Learn, and Grow Together
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join your university's academic network. Ask questions, share knowledge, 
            and collaborate with peers across all departments.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6">
              Join Now - It's Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Q&A Forum</h3>
                <p className="text-sm text-gray-600">
                  Get answers to your academic questions from peers and experts
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Student Directory</h3>
                <p className="text-sm text-gray-600">
                  Connect with students from your department and beyond
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Resource Sharing</h3>
                <p className="text-sm text-gray-600">
                  Share and access study materials, notes, and projects
                </p>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Build Reputation</h3>
                <p className="text-sm text-gray-600">
                  Earn points by helping others and contributing knowledge
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 Academic Network. Built for students, by students.</p>
        </div>
      </footer>
    </div>
  );
}
