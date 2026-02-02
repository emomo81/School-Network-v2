export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  department: string;
  year: number;
  bio?: string;
  avatar?: string;
  skills: string[];
  createdAt: string;
}

export interface Answer {
  id: string;
  userId: string;
  questionId: string;
  content: string;
  upvotes: number;
  createdAt: string;
}

export interface Question {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  department: string;
  answers: Answer[];
  views: number;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'Notes' | 'Assignments' | 'Projects';
  fileUrl?: string;
  link?: string;
  department: string;
  tags: string[];
  downloads: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'answer' | 'mention' | 'message';
  content: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  course: string;
  department: string;
  memberIds: string[];
  createdBy: string;
  createdAt: string;
}

export const DEPARTMENTS = [
  'All Departments',
  'Accounting',
  'Economics',
  'Finance',
  'International Relations',
  'Sociology',
  'Psychology',
  'Networking',
  'Software Engineering',
  'Data Science',
  'Electrical Engineering',
  'Civil Engineering',
  'Sciences in Education',
  'Languages in Education',
] as const;

export type Department = typeof DEPARTMENTS[number];
