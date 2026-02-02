import { Profile, Post, Event, Project, User } from "./types";

// Mock current user
export const currentUser: User = {
  id: "current-user",
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  coverPhoto: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop",
  department: "Software Engineering",
  faculty: "Technology",
  year: "3rd Year",
  headline: "Full-Stack Developer | AI Enthusiast | Open Source Contributor",
  about: "Passionate software engineer with focus on web technologies and machine learning. Love building products that make a difference.",
  location: "Campus, Main Building",
  joinedDate: "2023-01-15",
  isVerified: true,
};

// Mock users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Sarah Chen",
    email: "sarah.chen@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    coverPhoto: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop",
    department: "Data Science",
    faculty: "Technology",
    year: "4th Year",
    headline: "Data Scientist | Machine Learning Researcher",
    about: "Exploring the intersection of AI and social impact",
    location: "Research Lab 3",
    joinedDate: "2022-09-01",
    isVerified: true,
    isMentor: true,
  },
  {
    id: "user-2",
    name: "Michael Torres",
    email: "michael.torres@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    coverPhoto: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop",
    department: "Finance",
    faculty: "Business & Economics",
    year: "Graduate",
    headline: "Financial Analyst | Investment Banking Intern",
    about: "Specialized in quantitative finance and risk management",
    location: "Business School",
    joinedDate: "2021-08-15",
    isVerified: true,
    isMentor: true,
  },
  {
    id: "user-3",
    name: "Emily Watson",
    email: "emily.watson@university.edu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    coverPhoto: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop",
    department: "International Relations",
    faculty: "Social Sciences",
    year: "2nd Year",
    headline: "Aspiring Diplomat | Model UN Delegate",
    about: "Focused on global governance and international policy",
    location: "International Studies Wing",
    joinedDate: "2023-09-01",
    isVerified: false,
  },
];

// Mock profile data
export const mockProfile: Profile = {
  ...currentUser,
  skills: [
    {
      id: "skill-1",
      name: "React.js",
      endorsements: [
        {
          userId: "user-1",
          userName: "Sarah Chen",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          date: "2024-12-01",
        },
        {
          userId: "user-2",
          userName: "Michael Torres",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
          date: "2024-11-15",
        },
      ],
    },
    {
      id: "skill-2",
      name: "TypeScript",
      endorsements: [
        {
          userId: "user-1",
          userName: "Sarah Chen",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          date: "2024-12-01",
        },
      ],
    },
    {
      id: "skill-3",
      name: "Python",
      endorsements: [
        {
          userId: "user-1",
          userName: "Sarah Chen",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          date: "2024-11-20",
        },
        {
          userId: "user-3",
          userName: "Emily Watson",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
          date: "2024-11-18",
        },
      ],
    },
    {
      id: "skill-4",
      name: "Node.js",
      endorsements: [],
    },
    {
      id: "skill-5",
      name: "Machine Learning",
      endorsements: [
        {
          userId: "user-1",
          userName: "Sarah Chen",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          date: "2024-12-05",
        },
      ],
    },
  ],
  experience: [
    {
      id: "exp-1",
      title: "Frontend Developer Intern",
      company: "Tech Startup Inc.",
      location: "Remote",
      startDate: "2024-06-01",
      current: true,
      description: "Building responsive web applications using React and TypeScript. Collaborated with design team to implement UI/UX improvements.",
    },
    {
      id: "exp-2",
      title: "Research Assistant",
      company: "University AI Lab",
      location: "Campus",
      startDate: "2024-01-01",
      endDate: "2024-05-31",
      current: false,
      description: "Assisted in machine learning research projects. Developed data preprocessing pipelines and model evaluation scripts.",
    },
  ],
  projects: [],
  achievements: [
    {
      id: "ach-1",
      title: "Dean's List",
      description: "Achieved Dean's List for 2 consecutive semesters",
      icon: "trophy",
      date: "2024-06-01",
      category: "academic",
    },
    {
      id: "ach-2",
      title: "Hackathon Winner",
      description: "1st place at University Hackathon 2024",
      icon: "award",
      date: "2024-03-15",
      category: "project",
    },
    {
      id: "ach-3",
      title: "Open Source Contributor",
      description: "100+ contributions to open source projects",
      icon: "git-branch",
      date: "2024-12-01",
      category: "skill",
    },
  ],
  recommendations: [
    {
      id: "rec-1",
      fromUserId: "user-1",
      fromUserName: "Sarah Chen",
      fromUserAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      fromUserHeadline: "Data Scientist | Machine Learning Researcher",
      toUserId: "current-user",
      relationship: "Worked together on research project",
      content: "Alex is an exceptional developer with strong problem-solving skills. Their ability to quickly learn new technologies and apply them effectively is impressive. Highly recommend!",
      status: "published",
      createdAt: "2024-11-20",
    },
  ],
  connections: ["user-1", "user-2", "user-3"],
  connectionCount: 156,
};

// Mock projects
export const mockProjects: Project[] = [
  {
    id: "proj-1",
    userId: "current-user",
    title: "Smart Campus Navigator",
    description: "An AI-powered mobile app that helps students navigate campus, find study spaces, and discover events. Built with React Native and TensorFlow.",
    techStack: ["React Native", "TypeScript", "TensorFlow", "Firebase"],
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    ],
    liveUrl: "https://example.com/campus-navigator",
    githubUrl: "https://github.com/example/campus-navigator",
    collaborators: [
      {
        userId: "user-1",
        userName: "Sarah Chen",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
    ],
    likes: 89,
    createdAt: "2024-10-15",
  },
  {
    id: "proj-2",
    userId: "current-user",
    title: "Study Buddy Matcher",
    description: "Platform that connects students based on their courses and study preferences. Uses machine learning for smart matching.",
    techStack: ["Next.js", "Python", "PostgreSQL", "Scikit-learn"],
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
    ],
    githubUrl: "https://github.com/example/study-buddy",
    collaborators: [],
    likes: 45,
    createdAt: "2024-08-20",
  },
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: "post-1",
    userId: "user-1",
    userName: "Sarah Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    userHeadline: "Data Scientist | Machine Learning Researcher",
    type: "achievement",
    content: "Excited to share that our research paper on 'Neural Networks for Climate Prediction' has been accepted at the International AI Conference! Grateful for the mentorship and collaboration opportunities at our university. 🎉",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
      },
    ],
    likes: 234,
    comments: 28,
    shares: 12,
    timestamp: "2024-12-10T10:30:00Z",
    tags: ["Research", "AI", "MachineLearning"],
  },
  {
    id: "post-2",
    userId: "user-2",
    userName: "Michael Torres",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    userHeadline: "Financial Analyst | Investment Banking Intern",
    type: "event",
    content: "Join us for the Annual Finance Summit next week! Industry leaders will share insights on fintech innovation and career opportunities. Free for all students.",
    likes: 156,
    comments: 15,
    shares: 8,
    timestamp: "2024-12-09T14:20:00Z",
    tags: ["Finance", "Event", "Networking"],
  },
  {
    id: "post-3",
    userId: "current-user",
    userName: "Alex Johnson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    userHeadline: "Full-Stack Developer | AI Enthusiast",
    type: "project",
    content: "Just launched Smart Campus Navigator! 🚀 An AI-powered app to help students navigate campus and discover events. Check it out and let me know what you think!",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop",
      },
    ],
    likes: 189,
    comments: 34,
    shares: 21,
    timestamp: "2024-12-08T16:45:00Z",
    tags: ["Project", "AI", "MobileApp"],
  },
  {
    id: "post-4",
    userId: "user-3",
    userName: "Emily Watson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    userHeadline: "Aspiring Diplomat | Model UN Delegate",
    type: "question",
    content: "Looking for recommendations on international policy courses for next semester. What have been your favorite electives? Any professors you'd recommend?",
    likes: 45,
    comments: 19,
    shares: 2,
    timestamp: "2024-12-07T09:15:00Z",
    tags: ["Question", "Courses"],
  },
];

// Mock events
export const mockEvents: Event[] = [
  {
    id: "event-1",
    title: "Annual Finance Summit 2024",
    description: "Join industry leaders for insights on fintech innovation, blockchain, and career opportunities in finance. Networking session included.",
    department: "Finance",
    type: "career-fair",
    date: "2024-12-20",
    time: "14:00",
    location: "Business School Auditorium",
    organizer: {
      id: "user-2",
      name: "Michael Torres",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    attendees: [
      {
        id: "user-1",
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      {
        id: "current-user",
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
    ],
    capacity: 200,
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  },
  {
    id: "event-2",
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering neural networks, deep learning, and practical applications. Bring your laptop!",
    department: "Data Science",
    type: "workshop",
    date: "2024-12-18",
    time: "10:00",
    location: "Tech Lab Building, Room 301",
    organizer: {
      id: "user-1",
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    attendees: [
      {
        id: "current-user",
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
    ],
    capacity: 50,
    thumbnail: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop",
  },
  {
    id: "event-3",
    title: "Model UN Conference",
    description: "Annual Model United Nations conference. Represent countries, debate global issues, and develop diplomatic skills.",
    department: "International Relations",
    type: "competition",
    date: "2024-12-22",
    time: "09:00",
    location: "International Studies Center",
    organizer: {
      id: "user-3",
      name: "Emily Watson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    attendees: [],
    capacity: 100,
    thumbnail: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=400&fit=crop",
  },
  {
    id: "event-4",
    title: "Web Development Bootcamp",
    description: "3-day intensive bootcamp covering modern web development: React, Node.js, and deployment strategies.",
    department: "Software Engineering",
    type: "workshop",
    date: "2024-12-15",
    time: "13:00",
    location: "Computer Science Building",
    organizer: {
      id: "current-user",
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    attendees: [
      {
        id: "user-1",
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      {
        id: "user-3",
        name: "Emily Watson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      },
    ],
    capacity: 30,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
  },
];

// Mock API functions
export const mockApi = {
  getCurrentUser: () => Promise.resolve(currentUser),
  getProfile: (userId: string) => Promise.resolve(mockProfile),
  getUsers: () => Promise.resolve(mockUsers),
  getPosts: () => Promise.resolve(mockPosts),
  getProjects: () => Promise.resolve(mockProjects),
  getEvents: () => Promise.resolve(mockEvents),
  
  endorseSkill: (skillId: string) => {
    return Promise.resolve({ success: true });
  },
  
  toggleLike: (postId: string) => {
    return Promise.resolve({ success: true });
  },
  
  rsvpEvent: (eventId: string) => {
    return Promise.resolve({ success: true });
  },
  
  sendConnectionRequest: (userId: string, message: string) => {
    return Promise.resolve({ success: true });
  },
};
