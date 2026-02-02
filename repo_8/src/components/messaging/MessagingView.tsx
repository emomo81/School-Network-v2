import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChatList } from "./ChatList";
import { ChatWindow } from "./ChatWindow";
import { User } from "@/lib/types";
import { useConversations, useMessages } from "@/hooks/useMessages";
import { mockUsers } from "@/lib/mockApi";
import { Card } from "@/components/ui/card";

interface MessagingViewProps {
  currentUser: User;
}

export function MessagingView({ currentUser }: MessagingViewProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [conversationUsers, setConversationUsers] = useState<User[]>([]);
  const { conversationUserIds } = useConversations(currentUser.id);
  const { messages, sendMessage } = useMessages(currentUser.id, selectedUserId);

  useEffect(() => {
    const loadConversationUsers = async () => {
      const users = await Promise.all(
        conversationUserIds.map((id) => mockUsers.getById(id))
      );
      setConversationUsers(users.filter((u): u is User => u !== null));
    };

    if (conversationUserIds.length > 0) {
      loadConversationUsers();
    }
  }, [conversationUserIds]);

  const selectedUser = conversationUsers.find((u) => u.id === selectedUserId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-10rem)]"
    >
      <Card className="h-full border-navy-200 flex overflow-hidden">
        <ChatList
          conversations={conversationUsers}
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
        />
        {selectedUser ? (
          <ChatWindow
            currentUser={currentUser}
            otherUser={selectedUser}
            messages={messages}
            onSendMessage={sendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/30">
            <p className="text-muted-foreground">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
