import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { User, Department } from "@/lib/types";
import { Search, Filter, UserCheck, Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface MentorsPageProps {
  mentors: User[];
}

export function MentorsPage({ mentors }: MentorsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [connectedMentorIds, setConnectedMentorIds] = useState<Set<string>>(new Set());

  const handleConnect = (mentorId: string, mentorName: string) => {
    setConnectedMentorIds(prev => new Set([...prev, mentorId]));
    toast.success(`Connection request sent to ${mentorName}!`);
  };

  // Filter mentors
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || mentor.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Get unique departments
  const departments = ["all", ...Array.from(new Set(mentors.map(m => m.department)))];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserCheck className="w-8 h-8" />
            Find a Mentor
          </h1>
          <p className="text-muted-foreground mt-1">
            Connect with faculty and alumni mentors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search mentors by name, department, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {departments.slice(0, 5).map(dept => (
              <Badge
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </Badge>
            ))}
          </div>
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor, index) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onConnect={handleConnect}
                isConnected={connectedMentorIds.has(mentor.id)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <UserCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No mentors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function MentorCard({ 
  mentor, 
  onConnect, 
  isConnected,
  index 
}: { 
  mentor: User; 
  onConnect: (id: string, name: string) => void;
  isConnected: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          {/* Cover */}
          <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
            <img 
              src={mentor.coverPhoto} 
              alt="Cover" 
              className="w-full h-full object-cover opacity-50"
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Avatar */}
            <div className="flex justify-center -mt-16 mb-2">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="relative cursor-pointer">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-24 h-24 rounded-full border-4 border-background shadow-lg hover:scale-105 transition-transform"
                    />
                    {mentor.isVerified && (
                      <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{mentor.name}</h4>
                    <p className="text-sm text-muted-foreground">{mentor.headline}</p>
                    <p className="text-sm">{mentor.about}</p>
                    <Button size="sm" className="w-full mt-2">
                      View Full Profile
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            {/* Info */}
            <div className="text-center space-y-2">
              <div>
                <h3 className="font-semibold text-lg">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {mentor.headline}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary">{mentor.department}</Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  Mentor
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">{mentor.year}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
              >
                <Mail className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => onConnect(mentor.id, mentor.name)}
                disabled={isConnected}
                className="flex-1"
              >
                {isConnected ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Request Sent
                  </>
                ) : (
                  "Connect"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
