import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Search, Send } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userHeadline: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    userId: "user-1",
    userName: "Sarah Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    userHeadline: "Data Scientist | Machine Learning Researcher",
    lastMessage: "That sounds great! Let's schedule a meeting.",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    messages: [
      {
        id: "msg-1",
        senderId: "user-1",
        senderName: "Sarah Chen",
        senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        content: "Hi! I saw your project on campus navigator. Very impressive!",
        timestamp: "2024-12-10T10:00:00Z",
        isRead: true,
      },
      {
        id: "msg-2",
        senderId: "current-user",
        senderName: "Alex Johnson",
        senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        content: "Thanks! I'd love to collaborate on something similar.",
        timestamp: "2024-12-10T10:15:00Z",
        isRead: true,
      },
      {
        id: "msg-3",
        senderId: "user-1",
        senderName: "Sarah Chen",
        senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        content: "That sounds great! Let's schedule a meeting.",
        timestamp: "2024-12-10T11:00:00Z",
        isRead: false,
      },
    ],
  },
  {
    id: "conv-2",
    userId: "user-2",
    userName: "Michael Torres",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    userHeadline: "Financial Analyst | Investment Banking Intern",
    lastMessage: "See you at the Finance Summit!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "msg-4",
        senderId: "user-2",
        senderName: "Michael Torres",
        senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        content: "Are you attending the Finance Summit next week?",
        timestamp: "2024-12-09T14:00:00Z",
        isRead: true,
      },
      {
        id: "msg-5",
        senderId: "current-user",
        senderName: "Alex Johnson",
        senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        content: "Yes, I already RSVP'd!",
        timestamp: "2024-12-09T14:30:00Z",
        isRead: true,
      },
      {
        id: "msg-6",
        senderId: "user-2",
        senderName: "Michael Torres",
        senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        content: "See you at the Finance Summit!",
        timestamp: "2024-12-09T15:00:00Z",
        isRead: true,
      },
    ],
  },
];

export function MessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      senderName: "Alex Johnson",
      senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: newMessage,
              lastMessageTime: "Just now",
            }
          : conv
      )
    );

    setSelectedConversation(prev =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, message],
            lastMessage: newMessage,
            lastMessageTime: "Just now",
          }
        : null
    );

    setNewMessage("");
  };

  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <Card className="md:col-span-1">
            <CardContent className="p-4 space-y-4 h-full flex flex-col">
              <div className="space-y-3">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Messages
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors ${
                        selectedConversation?.id === conv.id ? "bg-secondary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={conv.userAvatar}
                          alt={conv.userName}
                          className="w-12 h-12 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-sm truncate">
                              {conv.userName}
                            </h3>
                            {conv.unreadCount > 0 && (
                              <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {conv.lastMessage}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {conv.lastMessageTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2">
            {selectedConversation ? (
              <CardContent className="p-0 h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center gap-3">
                  <img
                    src={selectedConversation.userAvatar}
                    alt={selectedConversation.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{selectedConversation.userName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.userHeadline}
                    </p>
                  </div>
                  <Button variant="outline">View Profile</Button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.senderId === "current-user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <img
                          src={message.senderAvatar}
                          alt={message.senderName}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div
                          className={`max-w-[70%] ${
                            message.senderId === "current-user" ? "text-right" : ""
                          }`}
                        >
                          <div
                            className={`inline-block p-3 rounded-lg ${
                              message.senderId === "current-user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            ) : (
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground">
                    Select a conversation to start messaging
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
