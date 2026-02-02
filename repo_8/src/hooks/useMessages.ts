import { useState, useEffect } from "react";
import { Message } from "@/lib/types";
import { mockMessages } from "@/lib/mockApi";

export function useMessages(currentUserId: string | null, otherUserId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId || !otherUserId) {
      setMessages([]);
      setIsLoading(false);
      return;
    }

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const data = await mockMessages.getConversation(
          currentUserId,
          otherUserId
        );
        setMessages(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [currentUserId, otherUserId]);

  const sendMessage = async (content: string) => {
    if (!currentUserId || !otherUserId) return;

    const newMessage = await mockMessages.send(
      currentUserId,
      otherUserId,
      content
    );
    setMessages((prev) => [...prev, newMessage]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
}

export function useConversations(userId: string | null) {
  const [conversationUserIds, setConversationUserIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setConversationUserIds([]);
      setIsLoading(false);
      return;
    }

    const fetchConversations = async () => {
      setIsLoading(true);
      try {
        const data = await mockMessages.getConversations(userId);
        setConversationUserIds(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [userId]);

  return {
    conversationUserIds,
    isLoading,
  };
}
