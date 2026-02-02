import { Student, Post, Conversation, Message } from '@/types/student';

export const currentUser: Student = {
  id: 'current-user',
  name: 'Alex Rivera',
  avatar: 'https://i.pravatar.cc/150?img=33',
  department: 'Computer Science',
  year: 3,
  bio: 'Passionate about AI and web development. Always looking for exciting projects!',
  interests: ['Machine Learning', 'React', 'UI/UX Design', 'Open Source'],
};

export const students: Student[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=5',
    department: 'Computer Science',
    year: 2,
    bio: 'Full-stack developer interested in web technologies and mobile apps.',
    interests: ['JavaScript', 'React Native', 'Node.js'],
    mutualConnections: 3,
  },
  {
    id: '2',
    name: 'Marcus Williams',
    avatar: 'https://i.pravatar.cc/150?img=12',
    department: 'Data Science',
    year: 4,
    bio: 'Data enthusiast exploring ML and analytics. Love working on real-world problems.',
    interests: ['Python', 'Machine Learning', 'Statistics'],
    mutualConnections: 5,
  },
  {
    id: '3',
    name: 'Emily Zhang',
    avatar: 'https://i.pravatar.cc/150?img=9',
    department: 'Design',
    year: 3,
    bio: 'UI/UX designer who codes. Creating beautiful and functional digital experiences.',
    interests: ['Figma', 'React', 'Design Systems'],
    mutualConnections: 2,
  },
  {
    id: '4',
    name: 'Jordan Lee',
    avatar: 'https://i.pravatar.cc/150?img=15',
    department: 'Computer Science',
    year: 2,
    bio: 'Game developer and graphics programming enthusiast. Building the next big indie game!',
    interests: ['Unity', 'C++', 'Graphics Programming'],
    mutualConnections: 4,
  },
  {
    id: '5',
    name: 'Priya Patel',
    avatar: 'https://i.pravatar.cc/150?img=47',
    department: 'Cybersecurity',
    year: 3,
    bio: 'Security researcher passionate about ethical hacking and secure coding practices.',
    interests: ['Penetration Testing', 'Cryptography', 'Network Security'],
    mutualConnections: 1,
  },
];

export const posts: Post[] = [
  {
    id: '1',
    author: students[0],
    content:
      'Looking for teammates for a hackathon next month! Building a sustainability-focused app. Need backend and design help. DM if interested!',
    type: 'project',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 24,
    comments: 8,
    tags: ['Hackathon', 'Team', 'Sustainability'],
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    author: students[1],
    content:
      'Can anyone explain the difference between supervised and unsupervised learning? I keep mixing them up in my ML class.',
    type: 'question',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: 12,
    comments: 15,
    tags: ['Machine Learning', 'Help Needed'],
    isLiked: true,
    isSaved: false,
  },
  {
    id: '3',
    author: students[2],
    content:
      'Just finished redesigning my portfolio website! Would love feedback from the community. Check the link in my bio.',
    type: 'general',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likes: 45,
    comments: 12,
    tags: ['Design', 'Portfolio', 'Feedback'],
    isLiked: false,
    isSaved: true,
  },
  {
    id: '4',
    author: students[3],
    content:
      'Forming a study group for Database Systems final exam. Meeting twice a week at the library. Comment below if you want to join!',
    type: 'study-group',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    likes: 31,
    comments: 22,
    tags: ['Study Group', 'Database', 'Finals'],
    isLiked: true,
    isSaved: true,
  },
  {
    id: '5',
    author: students[4],
    content:
      'Hosting a workshop on ethical hacking basics this Friday at 6 PM in Room 204. Free pizza! RSVP in comments.',
    type: 'general',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    likes: 67,
    comments: 28,
    tags: ['Workshop', 'Cybersecurity', 'Event'],
    isLiked: false,
    isSaved: false,
  },
  {
    id: '6',
    author: currentUser,
    content:
      'Working on an open-source React component library. Contributors welcome! Perfect for beginners looking to get into open source.',
    type: 'project',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    likes: 18,
    comments: 6,
    tags: ['Open Source', 'React', 'Collaboration'],
    isLiked: false,
    isSaved: false,
  },
];

const messages: Message[] = [
  {
    id: 'm1',
    conversationId: 'c1',
    sender: students[0],
    content: "Hey! Are you free to work on the project this weekend?",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
  },
  {
    id: 'm2',
    conversationId: 'c2',
    sender: students[1],
    content: "Thanks for the ML explanation! That really helped.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    read: true,
  },
  {
    id: 'm3',
    conversationId: 'c3',
    sender: students[2],
    content: "Your portfolio looks amazing! Love the animations.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
  {
    id: 'm4',
    conversationId: 'c4',
    sender: students[3],
    content: "See you at the study group tomorrow!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    read: true,
  },
];

export const conversations: Conversation[] = [
  {
    id: 'c1',
    participant: students[0],
    lastMessage: messages[0],
    unreadCount: 2,
  },
  {
    id: 'c2',
    participant: students[1],
    lastMessage: messages[1],
    unreadCount: 0,
  },
  {
    id: 'c3',
    participant: students[2],
    lastMessage: messages[2],
    unreadCount: 0,
  },
  {
    id: 'c4',
    participant: students[3],
    lastMessage: messages[3],
    unreadCount: 0,
  },
];
