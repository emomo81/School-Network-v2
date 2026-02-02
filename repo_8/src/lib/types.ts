// Core types for the university social network

export const DEPARTMENTS = [
  "Accounting",
  "Economics",
  "Finance",
  "Development Studies",
  "International Relations",
  "Population Studies",
  "Sociology",
  "Administrative Sciences",
  "Public Law",
  "Private Law",
  "Networking",
  "Software Engineering",
  "Data Science",
  "Sciences in Education",
  "Languages and Humanities in Education",
  "Electrical and Electronics",
  "Civil Engineering",
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export interface User {
  id: string;
  email: string;
  name: string;
  department: Department;
  bio: string;
  avatarUrl: string;
  year: 1 | 2 | 3 | 4;
  skills: string[];
  createdAt: string;
}

export type PostType = "question" | "project" | "resource";

export interface Post {
  id: string;
  userId: string;
  content: string;
  type: PostType;
  tags: string[];
  likes: string[]; // user IDs who liked
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface Connection {
  userId: string;
  connectedUserId: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
