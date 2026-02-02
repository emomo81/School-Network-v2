import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { User, Message } from "@/lib/types";
import { RiSendPlaneLine } from "@remixicon/react";

interface ChatWindowProps {
  currentUser: User;
  otherUser: User;
  messages: Message[];
  onSendMessage: (content: string) => Promise<void>;
}

export function ChatWindow({
  currentUser,
  otherUser,
  messages,
  onSendMessage,
}: ChatWindowProps) {
  const [messageText, setMessageText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!messageText.trim()) return;

    await onSendMessage(messageText);
    setMessageText("");
  };

  const otherInitials = otherUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat header */}
      <div className="p-4 border-b border-navy-200 flex items-center gap-3">
        <Avatar className="h-10 w-10 border border-navy-200">
          <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} />
          <AvatarFallback className="bg-secondary text-white text-sm">
            {otherInitials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-navy-800">{otherUser.name}</h3>
          <Badge variant="outline" className="text-xs">
            {otherUser.department}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const showAvatar =
              index === 0 ||
              messages[index - 1].senderId !== message.senderId;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-2 ${
                  isCurrentUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {showAvatar ? (
                  <Avatar className="h-8 w-8 border border-navy-200">
                    <AvatarImage
                      src={
                        isCurrentUser
                          ? currentUser.avatarUrl
                          : otherUser.avatarUrl
                      }
                    />
                    <AvatarFallback className="bg-secondary text-white text-xs">
                      {isCurrentUser
                        ? currentUser.name[0]
                        : otherInitials}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-8" />
                )}
                <div
                  className={`flex flex-col ${
                    isCurrentUser ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-md rounded-lg px-4 py-2 ${
                      isCurrentUser
                        ? "bg-secondary text-white"
                        : "bg-muted text-navy-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(message.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-navy-200">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="border-navy-200"
          />
          <Button
            onClick={handleSend}
            disabled={!messageText.trim()}
            size="icon"
            className="bg-secondary hover:bg-blue-400"
          >
            <RiSendPlaneLine className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
