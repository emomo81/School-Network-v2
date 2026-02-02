import { useState } from 'react';
import { Conversation, Message, Student } from '@/types/student';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MessagesProps {
  conversations: Conversation[];
  currentUser: Student;
}

export function Messages({ conversations, currentUser }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days === 1) return 'yesterday';
    return `${days}d`;
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      // In a real app, this would send the message
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  if (selectedConversation) {
    return (
      <ConversationView
        conversation={selectedConversation}
        currentUser={currentUser}
        onBack={() => setSelectedConversation(null)}
        messageInput={messageInput}
        onMessageInputChange={setMessageInput}
        onSendMessage={handleSendMessage}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto pb-20">
        {conversations.map((conversation) => (
          <motion.button
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation)}
            className="w-full flex items-start gap-3 p-4 hover:bg-muted/50 active:bg-muted transition-colors border-b border-border text-left"
            whileTap={{ scale: 0.98 }}
          >
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
              <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className={cn('font-semibold text-sm truncate', conversation.unreadCount > 0 && 'text-primary')}>
                  {conversation.participant.name}
                </h3>
                <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                  {formatTimestamp(conversation.lastMessage.timestamp)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={cn(
                    'text-sm truncate',
                    conversation.unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}
                >
                  {conversation.lastMessage.content}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="ml-2 flex-shrink-0 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-primary rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

interface ConversationViewProps {
  conversation: Conversation;
  currentUser: Student;
  onBack: () => void;
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
}

function ConversationView({
  conversation,
  currentUser,
  onBack,
  messageInput,
  onMessageInputChange,
  onSendMessage,
}: ConversationViewProps) {
  // Mock messages for the conversation
  const messages: Message[] = [
    {
      id: '1',
      conversationId: conversation.id,
      sender: conversation.participant,
      content: "Hey! How's the project coming along?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
    },
    {
      id: '2',
      conversationId: conversation.id,
      sender: currentUser,
      content: "Pretty good! I just finished the frontend part. Want to review it?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
      read: true,
    },
    {
      id: '3',
      conversationId: conversation.id,
      sender: conversation.participant,
      content: "Absolutely! Send me the link.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true,
    },
    {
      id: '4',
      conversationId: conversation.id,
      sender: currentUser,
      content: "Here you go: github.com/project/demo",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      read: true,
    },
    {
      id: '5',
      conversationId: conversation.id,
      sender: conversation.participant,
      content: conversation.lastMessage.content,
      timestamp: conversation.lastMessage.timestamp,
      read: conversation.lastMessage.read,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="sticky top-14 z-10 flex items-center gap-3 px-4 h-14 bg-card border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Avatar className="w-9 h-9">
          <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
          <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-sm truncate">{conversation.participant.name}</h2>
          <p className="text-xs text-muted-foreground truncate">{conversation.participant.department}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.sender.id === currentUser.id;
          const showAvatar = index === 0 || messages[index - 1].sender.id !== message.sender.id;

          return (
            <div
              key={message.id}
              className={cn('flex gap-2', isCurrentUser ? 'flex-row-reverse' : 'flex-row')}
            >
              {showAvatar ? (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-8 flex-shrink-0" />
              )}
              <div className={cn('flex flex-col max-w-[75%]', isCurrentUser && 'items-end')}>
                <div
                  className={cn(
                    'px-4 py-2 rounded-2xl',
                    isCurrentUser
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted text-foreground rounded-tl-sm'
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="sticky bottom-16 z-10 p-4 bg-background border-t border-border">
        <div className="flex gap-2">
          <Input
            value={messageInput}
            onChange={(e) => onMessageInputChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && onSendMessage()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            onClick={onSendMessage}
            disabled={!messageInput.trim()}
            size="icon"
            className="h-10 w-10 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
