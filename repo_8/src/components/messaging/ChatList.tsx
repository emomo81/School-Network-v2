import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/lib/types";

interface ChatListProps {
  conversations: User[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

export function ChatList({
  conversations,
  selectedUserId,
  onSelectUser,
}: ChatListProps) {
  return (
    <div className="w-80 border-r border-navy-200 flex flex-col">
      <div className="p-4 border-b border-navy-200">
        <h2 className="text-lg font-semibold text-navy-800">Messages</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No conversations yet
            </div>
          ) : (
            conversations.map((user) => {
              const isSelected = selectedUserId === user.id;
              const initials = user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
                <button
                  key={user.id}
                  onClick={() => onSelectUser(user.id)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    isSelected
                      ? "bg-navy-800 text-white"
                      : "hover:bg-navy-200/50"
                  }`}
                >
                  <Avatar className="h-10 w-10 border border-navy-200">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback
                      className={`text-sm ${
                        isSelected ? "bg-white text-navy-800" : "bg-secondary text-white"
                      }`}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left overflow-hidden">
                    <p
                      className={`font-medium truncate ${
                        isSelected ? "text-white" : "text-navy-800"
                      }`}
                    >
                      {user.name}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        isSelected ? "border-white/30 text-white" : ""
                      }`}
                    >
                      {user.department}
                    </Badge>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
