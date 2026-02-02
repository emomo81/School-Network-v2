// Core type definitions for the academic platform

export type Faculty =
  | "Business & Economics"
  | "Social Sciences"
  | "Law"
  | "Technology"
  | "Engineering & Education";

export type Department =
  | "Accounting"
  | "Economics"
  | "Finance"
  | "International Relations"
  | "Population Studies"
  | "Sociology"
  | "Development Studies"
  | "Public Law"
  | "Private Law"
  | "Administrative Sciences"
  | "Networking"
  | "Software Engineering"
  | "Data Science"
  | "Electrical/Electronics"
  | "Civil Engineering"
  | "Sciences/Languages in Education";

export const DEPARTMENTS = [
  "Accounting",
  "Economics",
  "Finance",
  "International Relations",
  "Population Studies",
  "Sociology",
  "Development Studies",
  "Public Law",
  "Private Law",
  "Administrative Sciences",
  "Networking",
  "Software Engineering",
  "Data Science",
  "Electrical/Electronics",
  "Civil Engineering",
  "Sciences/Languages in Education",
] as const;

export type YearOfStudy = "1st Year" | "2nd Year" | "3rd Year" | "4th Year" | "Graduate" | "Alumni";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  coverPhoto: string;
  department: Department;
  faculty: Faculty;
  year: YearOfStudy;
  headline: string;
  about: string;
  location: string;
  joinedDate: string;
  isVerified: boolean;
  isMentor?: boolean;
  password?: string;
  bio?: string;
}

export interface Skill {
  id: string;
  name: string;
  endorsements: {
    userId: string;
    userName: string;
    userAvatar: string;
    date: string;
  }[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  collaborators: {
    userId: string;
    userName: string;
    userAvatar: string;
  }[];
  likes: number;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  category: "academic" | "project" | "community" | "skill";
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userHeadline: string;
  type: "achievement" | "project" | "question" | "event" | "general";
  content: string;
  media?: {
    type: "image" | "video";
    url: string;
  }[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  department: Department;
  type: "seminar" | "workshop" | "career-fair" | "networking" | "competition";
  date: string;
  time: string;
  location: string;
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
  attendees: {
    id: string;
    name: string;
    avatar: string;
  }[];
  capacity: number;
  thumbnail?: string;
}

export interface Recommendation {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  fromUserHeadline: string;
  toUserId: string;
  relationship: string;
  content: string;
  status: "draft" | "pending" | "published";
  createdAt: string;
}

export interface Connection {
  id: string;
  userId: string;
  status: "pending" | "accepted" | "rejected";
  message?: string;
  createdAt: string;
}

export interface Profile extends User {
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  recommendations: Recommendation[];
  connections: string[]; // Array of user IDs
  connectionCount: number;
}
