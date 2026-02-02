export interface Student {
  id: string;
  name: string;
  avatar: string;
  department: string;
  year: number;
  bio: string;
  interests: string[];
  mutualConnections?: number;
}

export interface Post {
  id: string;
  author: Student;
  content: string;
  type: 'question' | 'project' | 'study-group' | 'general';
  timestamp: Date;
  likes: number;
  comments: number;
  tags: string[];
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: Student;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: Student;
  lastMessage: Message;
  unreadCount: number;
}
