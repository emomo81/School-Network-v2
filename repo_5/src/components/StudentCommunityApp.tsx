/**
 * Student Community App - Mobile-First Social Platform
 * 
 * Features:
 * - Bottom Tab Navigation (5 tabs: Home, Discover, Post, Messages, Profile)
 * - Swipeable Student Cards (Tinder-style for connecting)
 * - Real-time Messaging Interface
 * - Post Feed with Filtering (Questions, Projects, Study Groups)
 * - Pull-to-Refresh on Home Feed
 * - Smooth Page Transitions
 * - Mobile-First Design (responsive up to desktop)
 * - Toast Notifications
 * - Like, Comment, Save Post Actions
 * - Profile with Tabs (Posts, Saved, Connections)
 * - Create Post Modal with Tags
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav, TabType } from './mobile/BottomNav';
import { MobileHeader } from './mobile/MobileHeader';
import { HomeFeed } from './mobile/HomeFeed';
import { DiscoverStudents } from './mobile/DiscoverStudents';
import { Messages } from './mobile/Messages';
import { Profile } from './mobile/Profile';
import { CreatePost } from './mobile/CreatePost';
import { posts as initialPosts, students, conversations, currentUser } from '@/data/mock-data';
import { Post } from '@/types/student';
import { toast } from 'sonner';

export function StudentCommunityApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  // Uncomment the line below to show a welcome screen on first load
  // const [showWelcome, setShowWelcome] = useState(true);

  const handleTabChange = (tab: TabType) => {
    if (tab === 'post') {
      setIsCreatePostOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handlePostUpdate = (postId: string, updates: Partial<Post>) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, ...updates } : post)));
  };

  const handleConnect = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      toast.success(`Connected with ${student.name}!`, {
        description: 'You can now message each other.',
      });
    }
  };

  const handleSkip = (studentId: string) => {
    console.log('Skipped student:', studentId);
  };

  const handleCreatePost = (content: string, type: string, tags: string[]) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: currentUser,
      content,
      type: type as Post['type'],
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      tags,
      isLiked: false,
      isSaved: false,
    };
    setPosts([newPost, ...posts]);
    toast.success('Post created!', {
      description: 'Your post has been shared with the community.',
    });
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Campus Connect';
      case 'discover':
        return 'Discover Students';
      case 'messages':
        return 'Messages';
      case 'profile':
        return 'Profile';
      default:
        return 'Campus Connect';
    }
  };

  const unreadMessages = conversations.filter((c) => c.unreadCount > 0).reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Container with max width for desktop */}
      <div className="mx-auto max-w-lg h-full relative bg-background border-x border-border">
        {/* Mobile Header */}
        <MobileHeader
          title={getHeaderTitle()}
          showNotifications={activeTab === 'home'}
          showSearch={activeTab === 'home' || activeTab === 'discover'}
          notificationCount={3}
        />

        {/* Main Content */}
        <main className="h-[calc(100vh-3.5rem)] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'home' && <HomeFeed posts={posts} onPostUpdate={handlePostUpdate} />}
              {activeTab === 'discover' && (
                <DiscoverStudents students={students} onConnect={handleConnect} onSkip={handleSkip} />
              )}
              {activeTab === 'messages' && <Messages conversations={conversations} currentUser={currentUser} />}
              {activeTab === 'profile' && <Profile user={currentUser} posts={posts} isOwnProfile />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} unreadMessages={unreadMessages} />

        {/* Create Post Modal */}
        <CreatePost
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
          currentUser={currentUser}
          onPost={handleCreatePost}
        />
      </div>
    </div>
  );
}
