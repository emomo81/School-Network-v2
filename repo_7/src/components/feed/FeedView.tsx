import { useState } from 'react';
import { motion } from 'framer-motion';
import PostCard from './PostCard';
import CreatePostCard from './CreatePostCard';

interface FeedViewProps {
  userData: any;
  selectedDepartment: string | null;
}

const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: '',
      department: 'Software Engineering',
      departmentColor: '#1C8AF8',
    },
    type: 'question',
    title: 'Best practices for React state management?',
    content:
      "I'm working on a large-scale project and wondering what state management solution you all recommend. Currently using Context API but considering Redux or Zustand.",
    likes: 24,
    comments: 12,
    timestamp: '2 hours ago',
    tags: ['React', 'State Management'],
  },
  {
    id: '2',
    author: {
      name: 'Michael Chen',
      avatar: '',
      department: 'Data Science',
      departmentColor: '#A855F7',
    },
    type: 'project',
    title: 'Machine Learning Model for Student Performance Prediction',
    content:
      "Just finished a project predicting student performance using various ML algorithms. Achieved 87% accuracy with Random Forest. Would love to collaborate with anyone interested!",
    likes: 45,
    comments: 8,
    timestamp: '4 hours ago',
    tags: ['ML', 'Python', 'Collaboration'],
  },
  {
    id: '3',
    author: {
      name: 'Emily Rodriguez',
      avatar: '',
      department: 'Accounting',
      departmentColor: '#10B981',
    },
    type: 'resource',
    title: 'Free Course on Financial Modeling',
    content:
      "Found this amazing free course on Coursera about financial modeling in Excel. Highly recommend for anyone preparing for internships in finance!",
    likes: 67,
    comments: 15,
    timestamp: '6 hours ago',
    tags: ['Finance', 'Resources', 'Career'],
  },
  {
    id: '4',
    author: {
      name: 'Alex Thompson',
      avatar: '',
      department: 'Marketing',
      departmentColor: '#F59E0B',
    },
    type: 'question',
    title: 'Anyone interested in a study group for Digital Marketing?',
    content:
      "Looking to form a study group for the upcoming Digital Marketing exam. Planning to meet twice a week. DM me if you're interested!",
    likes: 18,
    comments: 23,
    timestamp: '8 hours ago',
    tags: ['Study Group', 'Marketing'],
  },
  {
    id: '5',
    author: {
      name: 'Jessica Lee',
      avatar: '',
      department: 'Psychology',
      departmentColor: '#EC4899',
    },
    type: 'project',
    title: 'Research Study on Social Media Impact',
    content:
      "Conducting a research study on social media's impact on mental health. Need 50 more participants. Takes only 10 minutes. Link in comments!",
    likes: 31,
    comments: 19,
    timestamp: '1 day ago',
    tags: ['Research', 'Psychology'],
  },
];

export default function FeedView({ userData, selectedDepartment }: FeedViewProps) {
  const [posts, setPosts] = useState(mockPosts);

  const filteredPosts = selectedDepartment
    ? posts.filter((post) => {
        const deptId = post.author.department.toLowerCase().replace(/ /g, '-');
        return deptId === selectedDepartment;
      })
    : posts;

  const handleNewPost = (postData: any) => {
    const newPost = {
      id: Date.now().toString(),
      author: {
        name: userData.displayName || userData.fullName,
        avatar: userData.avatar,
        department: userData.departmentData?.name || 'Student',
        departmentColor: userData.departmentData?.color || '#1C8AF8',
      },
      ...postData,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          {selectedDepartment
            ? posts.find((p) =>
                p.author.department.toLowerCase().replace(/ /g, '-') === selectedDepartment
              )?.author.department || 'Department Feed'
            : 'Home Feed'}
        </h1>
        <p className="text-white/60 text-sm">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {/* Create Post */}
      <CreatePostCard userData={userData} onPost={handleNewPost} />

      {/* Posts Feed */}
      <div className="space-y-4 mt-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40 text-sm">
              No posts in this department yet. Be the first to post!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
