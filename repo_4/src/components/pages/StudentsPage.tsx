import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { User, Department, Faculty } from "@/lib/types";
import { Search, Filter, UserPlus, Users as UsersIcon } from "lucide-react";
import { toast } from "sonner";

interface StudentsPageProps {
  users: User[];
  currentUserId: string;
}

export function StudentsPage({ users, currentUserId }: StudentsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set());

  const handleConnect = (userId: string) => {
    setConnectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
        toast.info("Connection removed");
      } else {
        newSet.add(userId);
        toast.success("Connection request sent!");
      }
      return newSet;
    });
  };

  // Get unique departments
  const departments = ["all", ...Array.from(new Set(users.map(u => u.department)))];

  // Filter users
  const filteredUsers = users
    .filter(u => u.id !== currentUserId)
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <UsersIcon className="w-8 h-8" />
              Students
            </h1>
            <p className="text-muted-foreground mt-1">
              Connect with fellow students across campus
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {filteredUsers.length} Students
          </Badge>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name, headline, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {departments.slice(0, 6).map(dept => (
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

        {/* Students Grid */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  {/* Profile Section */}
                  <div className="flex items-start gap-4">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-16 h-16 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h4 className="font-semibold">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.headline}</p>
                            </div>
                          </div>
                          <div className="space-y-1 text-sm">
                            <p><strong>Department:</strong> {user.department}</p>
                            <p><strong>Year:</strong> {user.year}</p>
                            <p><strong>Location:</strong> {user.location}</p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {user.name}
                        {user.isVerified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                        {user.isMentor && (
                          <Badge className="text-xs bg-purple-100 text-purple-700">
                            Mentor
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {user.headline}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <Badge variant="outline">{user.department}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Year:</span>
                      <Badge variant="outline">{user.year}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Faculty:</span>
                      <Badge variant="outline" className="text-xs">{user.faculty}</Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1"
                      variant={connectedUsers.has(user.id) ? "outline" : "default"}
                      onClick={() => handleConnect(user.id)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {connectedUsers.has(user.id) ? "Connected" : "Connect"}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <UsersIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No students found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
