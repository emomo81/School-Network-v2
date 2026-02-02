// Mock API layer - ready for Supabase migration
import { User, Post, Message, Connection, Department } from "./types";

// Mock data storage
let users: User[] = [
  {
    id: "1",
    email: "jean@ulk.ac.rw",
    name: "Jean Claude Mugabo",
    department: "Software Engineering",
    bio: "Passionate about web development and AI. Looking to collaborate on innovative projects.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
    year: 3,
    skills: ["React", "TypeScript", "Node.js"],
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    email: "marie@ulk.ac.rw",
    name: "Marie Uwase",
    department: "Data Science",
    bio: "Data enthusiast exploring machine learning and analytics.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
    year: 2,
    skills: ["Python", "Machine Learning", "SQL"],
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    email: "patrick@ulk.ac.rw",
    name: "Patrick Nkurunziza",
    department: "Networking",
    bio: "Network security researcher and cybersecurity advocate.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patrick",
    year: 4,
    skills: ["Cisco", "Network Security", "Linux"],
    createdAt: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let posts: Post[] = [
  {
    id: "1",
    userId: "1",
    content:
      "Anyone interested in collaborating on a React Native mobile app for campus navigation? Looking for designers and backend developers!",
    type: "project",
    tags: ["React Native", "Mobile Dev", "Collaboration"],
    likes: ["2"],
    comments: [
      {
        id: "c1",
        userId: "2",
        content: "This sounds interesting! I can help with data modeling.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    userId: "2",
    content:
      "Can someone explain the difference between supervised and unsupervised learning? I have an exam tomorrow 😅",
    type: "question",
    tags: ["Machine Learning", "Exam Help"],
    likes: ["1", "3"],
    comments: [],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    userId: "3",
    content:
      "Great resource for learning network protocols: https://example.com/networking-guide",
    type: "resource",
    tags: ["Networking", "Study Material"],
    likes: ["1"],
    comments: [],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

let messages: Message[] = [
  {
    id: "1",
    senderId: "1",
    receiverId: "2",
    content: "Hey Marie! Would you be interested in the mobile app project?",
    read: true,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    senderId: "2",
    receiverId: "1",
    content: "Yes! That sounds amazing. Let's discuss the details.",
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

let connections: Connection[] = [
  {
    userId: "1",
    connectedUserId: "2",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Auth
export const mockAuth = {
  login: async (email: string, password: string): Promise<User | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = users.find((u) => u.email === email);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user;
    }
    return null;
  },

  signup: async (
    email: string,
    password: string,
    name: string,
    department: Department,
    year: 1 | 2 | 3 | 4
  ): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: User = {
      id: String(users.length + 1),
      email,
      name,
      department,
      bio: "",
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      year,
      skills: [],
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return newUser;
  },

  logout: () => {
    localStorage.removeItem("currentUser");
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  },
};

// Users
export const mockUsers = {
  getAll: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return users;
  },

  getById: async (id: string): Promise<User | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return users.find((u) => u.id === id) || null;
  },

  getByDepartment: async (department: Department): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return users.filter((u) => u.department === department);
  },

  update: async (id: string, updates: Partial<User>): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      // Update localStorage if it's the current user
      const currentUser = mockAuth.getCurrentUser();
      if (currentUser?.id === id) {
        localStorage.setItem("currentUser", JSON.stringify(users[index]));
      }
      return users[index];
    }
    throw new Error("User not found");
  },
};

// Posts
export const mockPosts = {
  getAll: async (): Promise<Post[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getByUserId: async (userId: string): Promise<Post[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return posts.filter((p) => p.userId === userId);
  },

  create: async (
    post: Omit<Post, "id" | "likes" | "comments" | "createdAt">
  ): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const newPost: Post = {
      ...post,
      id: String(posts.length + 1),
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    return newPost;
  },

  like: async (postId: string, userId: string): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error("Post not found");

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      post.likes.push(userId);
    }
    return post;
  },

  addComment: async (
    postId: string,
    userId: string,
    content: string
  ): Promise<Post> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const post = posts.find((p) => p.id === postId);
    if (!post) throw new Error("Post not found");

    const newComment = {
      id: `c${post.comments.length + 1}`,
      userId,
      content,
      createdAt: new Date().toISOString(),
    };
    post.comments.push(newComment);
    return post;
  },
};

// Messages
export const mockMessages = {
  getConversation: async (
    user1Id: string,
    user2Id: string
  ): Promise<Message[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return messages
      .filter(
        (m) =>
          (m.senderId === user1Id && m.receiverId === user2Id) ||
          (m.senderId === user2Id && m.receiverId === user1Id)
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  },

  getConversations: async (userId: string): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const userIds = new Set<string>();
    messages.forEach((m) => {
      if (m.senderId === userId) userIds.add(m.receiverId);
      if (m.receiverId === userId) userIds.add(m.senderId);
    });
    return Array.from(userIds);
  },

  send: async (
    senderId: string,
    receiverId: string,
    content: string
  ): Promise<Message> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newMessage: Message = {
      id: String(messages.length + 1),
      senderId,
      receiverId,
      content,
      read: false,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    return newMessage;
  },

  markAsRead: async (messageId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const message = messages.find((m) => m.id === messageId);
    if (message) message.read = true;
  },
};

// Connections
export const mockConnections = {
  getByUserId: async (userId: string): Promise<Connection[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return connections.filter(
      (c) => c.userId === userId || c.connectedUserId === userId
    );
  },

  connect: async (userId: string, connectedUserId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    connections.push({
      userId,
      connectedUserId,
      createdAt: new Date().toISOString(),
    });
  },
};
