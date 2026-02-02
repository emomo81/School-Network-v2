import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedGradientHero } from "@/components/ui/animated-gradient";
import { 
  Users, 
  Calendar, 
  FolderKanban, 
  Award,
  TrendingUp,
  UserCheck,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";

interface WelcomePageProps {
  onGetStarted: () => void;
}

export function WelcomePage({ onGetStarted }: WelcomePageProps) {
  const features = [
    {
      icon: Users,
      title: "Professional Profiles",
      description: "Build your academic portfolio with projects, skills, and achievements",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Award,
      title: "Skill Endorsements",
      description: "Get endorsed by peers and faculty for your technical and soft skills",
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: FolderKanban,
      title: "Project Showcase",
      description: "Display your work with images, demos, and collaboration details",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: UserCheck,
      title: "Mentor Matching",
      description: "Connect with faculty and alumni mentors in your field",
      color: "bg-orange-100 text-orange-700",
    },
    {
      icon: Calendar,
      title: "Campus Events",
      description: "Discover workshops, seminars, and networking opportunities",
      color: "bg-pink-100 text-pink-700",
    },
    {
      icon: TrendingUp,
      title: "Professional Feed",
      description: "Share achievements, ask questions, and engage with the community",
      color: "bg-indigo-100 text-indigo-700",
    },
  ];

  const stats = [
    { label: "Active Students", value: "2,500+" },
    { label: "Projects Shared", value: "450+" },
    { label: "Events Monthly", value: "30+" },
    { label: "Mentors Available", value: "150+" },
  ];

  const departments = [
    "Software Engineering",
    "Data Science",
    "Finance",
    "International Relations",
    "Public Law",
    "Networking",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <AnimatedGradientHero />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm border-white/30">
              LinkedIn Meets Academia
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              AcademiaLink
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Professional networking platform for university students.<br />
              Build your portfolio, connect with mentors, and prepare for your career.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20 text-lg px-8"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.3 }}
            >
              <Card className="text-center shadow-lg">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground">
            Powerful features to help you stand out and connect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Departments Section */}
      <div className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">15 Departments, 5 Faculties</h2>
            <p className="text-xl text-muted-foreground">
              Connect with students and mentors across all academic disciplines
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept) => (
              <Badge key={dept} variant="secondary" className="px-4 py-2 text-sm">
                {dept}
              </Badge>
            ))}
            <Badge variant="outline" className="px-4 py-2 text-sm">
              +9 more
            </Badge>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Build Your Professional Network?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of students preparing for their careers
        </p>
        
        <div className="space-y-4 mb-8">
          {[
            "Create your professional profile in minutes",
            "Showcase your projects and achievements",
            "Get skill endorsements from peers",
            "Connect with mentors in your field",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 text-left">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-lg">{item}</span>
            </div>
          ))}
        </div>

        <Button size="lg" onClick={onGetStarted} className="text-lg px-8">
          Explore the Platform
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
