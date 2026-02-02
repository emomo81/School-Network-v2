import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiSendPlaneFill, RiMoreFill } from '@remixicon/react';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

interface MessagesViewProps {
  userData: any;
}

const mockConversations = [
  {
    id: '1',
    name: 'Sarah Johnson',
    department: 'Software Engineering',
    avatar: '',
    lastMessage: 'Thanks for the help with React!',
    timestamp: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Study Group - Marketing',
    department: 'Marketing',
    avatar: '',
    lastMessage: 'Meeting tomorrow at 3pm?',
    timestamp: '1h ago',
    unread: 5,
    online: false,
  },
  {
    id: '3',
    name: 'Michael Chen',
    department: 'Data Science',
    avatar: '',
    lastMessage: 'Check out this ML resource',
    timestamp: '3h ago',
    unread: 0,
    online: true,
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    department: 'Accounting',
    avatar: '',
    lastMessage: 'See you in class!',
    timestamp: '1d ago',
    unread: 0,
    online: false,
  },
];

const mockMessages = [
  {
    id: '1',
    senderId: '1',
    content: 'Hey! How are you doing?',
    timestamp: '10:30 AM',
    isMine: false,
  },
  {
    id: '2',
    senderId: 'me',
    content: "I'm good! Just working on my project. How about you?",
    timestamp: '10:32 AM',
    isMine: true,
  },
  {
    id: '3',
    senderId: '1',
    content: 'Same here! Working on the React state management assignment.',
    timestamp: '10:33 AM',
    isMine: false,
  },
  {
    id: '4',
    senderId: '1',
    content: 'Do you have any resources you can share?',
    timestamp: '10:33 AM',
    isMine: false,
  },
  {
    id: '5',
    senderId: 'me',
    content: 'Sure! Let me send you some links. I found this great article about Redux vs Context API.',
    timestamp: '10:35 AM',
    isMine: true,
  },
  {
    id: '6',
    senderId: '1',
    content: 'Thanks for the help with React!',
    timestamp: '10:40 AM',
    isMine: false,
  },
];

export default function MessagesView({ userData }: MessagesViewProps) {
  const [selectedConvo, setSelectedConvo] = useState(mockConversations[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
      isMine: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Conversations List */}
      <div className="w-80 bg-[#15161C] border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">Messages</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {mockConversations.map((convo) => (
              <motion.button
                key={convo.id}
                onClick={() => setSelectedConvo(convo)}
                whileHover={{ scale: 1.01 }}
                className={`w-full flex items-start gap-3 p-3 rounded-lg mb-1 transition-colors ${
                  selectedConvo.id === convo.id
                    ? 'bg-white/10'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1C8AF8] to-[#A855F7] flex items-center justify-center text-white text-sm font-bold">
                    {convo.avatar ? (
                      <img
                        src={convo.avatar}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span>{getInitials(convo.name)}</span>
                    )}
                  </div>
                  {convo.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#15161C] rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium text-sm truncate">
                      {convo.name}
                    </h3>
                    <span className="text-white/40 text-xs flex-shrink-0 ml-2">
                      {convo.timestamp}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs truncate">
                    {convo.lastMessage}
                  </p>
                </div>

                {convo.unread > 0 && (
                  <div className="flex-shrink-0 w-5 h-5 bg-[#1C8AF8] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {convo.unread}
                    </span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0F1012]">
        {/* Chat Header */}
        <div className="h-16 bg-[#15161C] border-b border-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C8AF8] to-[#A855F7] flex items-center justify-center text-white text-sm font-bold">
              {selectedConvo.avatar ? (
                <img
                  src={selectedConvo.avatar}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>{getInitials(selectedConvo.name)}</span>
              )}
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">
                {selectedConvo.name}
              </h3>
              <p className="text-white/40 text-xs">{selectedConvo.department}</p>
            </div>
          </div>

          <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <RiMoreFill className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-3xl">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md ${
                    message.isMine
                      ? 'bg-[#1C8AF8] text-white'
                      : 'bg-[#15161C] text-white'
                  } px-4 py-2.5 rounded-2xl ${
                    message.isMine ? 'rounded-br-md' : 'rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isMine ? 'text-white/70' : 'text-white/40'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#15161C] px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-2 h-2 bg-white/40 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-2 h-2 bg-white/40 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-2 h-2 bg-white/40 rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-[#15161C] border-t border-white/10">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8]"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-4 h-10 bg-[#1C8AF8] hover:bg-[#1C8AF8]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
            >
              <RiSendPlaneFill className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
