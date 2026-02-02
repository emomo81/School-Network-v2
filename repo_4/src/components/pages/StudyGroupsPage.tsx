import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AvatarGroup from "@/components/ui/avatar-group";
import { Users, Search, Plus, BookOpen, Clock } from "lucide-react";
import { toast } from "sonner";

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  department: string;
  members: {
    id: string;
    name: string;
    avatar: string;
  }[];
  meetingTime: string;
  location: string;
  capacity: number;
  isActive: boolean;
}

const mockStudyGroups: StudyGroup[] = [
  {
    id: "sg-1",
    name: "Advanced Algorithms Study Group",
    description: "Weekly sessions covering advanced algorithm design and analysis. Focus on competitive programming and interview preparation.",
    subject: "Data Structures & Algorithms",
    department: "Software Engineering",
    members: [
      { id: "1", name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
      { id: "2", name: "Michael Torres", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
      { id: "3", name: "Emily Watson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
    ],
    meetingTime: "Tuesdays, 6:00 PM",
    location: "Library Room 302",
    capacity: 8,
    isActive: true,
  },
  {
    id: "sg-2",
    name: "Machine Learning Reading Group",
    description: "Discuss latest ML research papers and work on practical projects together. All levels welcome!",
    subject: "Machine Learning",
    department: "Data Science",
    members: [
      { id: "1", name: "Sarah Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
      { id: "4", name: "Alex Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    ],
    meetingTime: "Fridays, 4:00 PM",
    location: "Tech Lab Building 301",
    capacity: 10,
    isActive: true,
  },
  {
    id: "sg-3",
    name: "Financial Modeling Workshop",
    description: "Learn financial modeling techniques for investment analysis and corporate finance.",
    subject: "Corporate Finance",
    department: "Finance",
    members: [
      { id: "2", name: "Michael Torres", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
    ],
    meetingTime: "Thursdays, 5:30 PM",
    location: "Business School B202",
    capacity: 12,
    isActive: true,
  },
];

export function StudyGroupsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set());

  const handleJoin = (groupId: string) => {
    setJoinedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
        toast.info("Left study group");
      } else {
        newSet.add(groupId);
        toast.success("Joined study group!");
      }
      return newSet;
    });
  };

  const filteredGroups = mockStudyGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              Study Groups
            </h1>
            <p className="text-muted-foreground mt-1">
              Join collaborative learning sessions with peers
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Group
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search study groups by name, subject, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Study Groups Grid */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg line-clamp-2 flex-1">
                        {group.name}
                      </h3>
                      {group.isActive && (
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {group.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subject:</span>
                      <Badge variant="outline" className="text-xs">{group.subject}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <Badge variant="outline" className="text-xs">{group.department}</Badge>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{group.meetingTime}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{group.location}</span>
                    </div>
                  </div>

                  {/* Members */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="text-muted-foreground">
                        {group.members.length} / {group.capacity}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(group.members.length / group.capacity) * 100}%` }}
                      />
                    </div>
                    <AvatarGroup
                      items={group.members.map((m, idx) => ({
                        id: idx,
                        name: m.name,
                        designation: "Member",
                        image: m.avatar,
                      }))}
                      maxVisible={4}
                      size="sm"
                      className="justify-start"
                    />
                  </div>

                  {/* Join Button */}
                  <Button
                    onClick={() => handleJoin(group.id)}
                    className="w-full"
                    variant={joinedGroups.has(group.id) ? "outline" : "default"}
                  >
                    {joinedGroups.has(group.id) ? "Leave Group" : "Join Group"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No study groups found</h3>
            <p className="text-muted-foreground">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
