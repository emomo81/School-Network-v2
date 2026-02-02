import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/lib/types";
import { Search, UserCheck, UserX, MessageSquare, Network } from "lucide-react";
import { toast } from "sonner";

interface ConnectionRequest {
  id: string;
  user: User;
  message: string;
  timestamp: string;
}

interface ConnectionsPageProps {
  users: User[];
  currentUserId: string;
}

const mockRequests: ConnectionRequest[] = [
  {
    id: "req-1",
    user: {
      id: "user-4",
      name: "David Kim",
      email: "david.kim@university.edu",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      coverPhoto: "",
      department: "Networking",
      faculty: "Technology",
      year: "2nd Year",
      headline: "Network Engineer | Cybersecurity Enthusiast",
      about: "Passionate about network security and infrastructure",
      location: "Tech Building",
      joinedDate: "2024-09-01",
      isVerified: false,
    },
    message: "Hi! I'd love to connect and discuss network security topics.",
    timestamp: "2 hours ago",
  },
];

export function ConnectionsPage({ users, currentUserId }: ConnectionsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [connections, setConnections] = useState<User[]>(users.slice(0, 3));
  const [requests, setRequests] = useState<ConnectionRequest[]>(mockRequests);

  const handleAcceptRequest = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setConnections(prev => [...prev, request.user]);
      setRequests(prev => prev.filter(r => r.id !== requestId));
      toast.success(`You are now connected with ${request.user.name}`);
    }
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
    toast.info("Connection request declined");
  };

  const handleRemoveConnection = (userId: string) => {
    const user = connections.find(c => c.id === userId);
    setConnections(prev => prev.filter(c => c.id !== userId));
    toast.info(`Removed connection with ${user?.name}`);
  };

  const filteredConnections = connections.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.headline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Network className="w-8 h-8" />
              Connections
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your professional network
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {connections.length} Connections
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="connections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connections">
              My Connections ({connections.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              Requests ({requests.length})
            </TabsTrigger>
          </TabsList>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search connections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Connections Grid */}
            {filteredConnections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConnections.map((user) => (
                  <Card key={user.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      {/* Profile */}
                      <div className="flex items-start gap-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            {user.name}
                            {user.isVerified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
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
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveConnection(user.id)}
                        >
                          <UserX className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Network className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No connections found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search"
                    : "Start connecting with other students"}
                </p>
              </div>
            )}
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={request.user.avatar}
                          alt={request.user.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {request.user.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {request.user.headline}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {request.timestamp}
                            </p>
                          </div>

                          {request.message && (
                            <div className="bg-secondary p-3 rounded-lg">
                              <p className="text-sm">{request.message}</p>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">{request.user.department}</Badge>
                            <Badge variant="outline">{request.user.year}</Badge>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAcceptRequest(request.id)}
                              className="flex-1"
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              onClick={() => handleRejectRequest(request.id)}
                              variant="outline"
                              className="flex-1"
                            >
                              <UserX className="w-4 h-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <UserCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No pending requests</h3>
                <p className="text-muted-foreground">
                  Connection requests will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
