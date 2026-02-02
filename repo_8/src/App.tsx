import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./hooks/useAuth";
import { usePosts } from "./hooks/usePosts";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { Header } from "./components/common/Header";
import { Sidebar } from "./components/common/Sidebar";
import { Feed } from "./components/feed/Feed";
import { ProfileView } from "./components/profile/ProfileView";
import { MessagingView } from "./components/messaging/MessagingView";
import { DiscoverView } from "./components/discover/DiscoverView";
import { mockUsers } from "./lib/mockApi";
import { User } from "./lib/types";

type View = "feed" | "messages" | "profile" | "discover";
type AuthView = "login" | "signup";

function App() {
  const { user, isLoading: authLoading, login, signup, logout } = useAuth();
  const { posts, isLoading: postsLoading, createPost, likePost, addComment } = usePosts();
  
  const [authView, setAuthView] = useState<AuthView>("login");
  const [currentView, setCurrentView] = useState<View>("feed");
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  // Animated gradient background
  const GradientBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(21, 87, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(174, 233, 56, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(51, 136, 255, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );

  if (authLoading) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center bg-beige-100">
        <GradientBackground />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-navy-800 text-lg font-medium"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center bg-beige-100">
        <GradientBackground />
        <AnimatePresence mode="wait">
          {authView === "login" ? (
            <Login
              key="login"
              onLogin={async (email, password) => {
                const result = await login(email, password);
                if (!result) {
                  throw new Error("Invalid credentials");
                }
              }}
              onSwitchToSignup={() => setAuthView("signup")}
            />
          ) : (
            <Signup
              key="signup"
              onSignup={async (email, password, name, department, year) => {
                await signup(email, password, name, department, year);
              }}
              onSwitchToLogin={() => setAuthView("login")}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  const handleUpdateProfile = async (updates: Partial<User>) => {
    await mockUsers.update(user.id, updates);
    // The auth hook will update automatically from localStorage
    window.location.reload();
  };

  const handleViewProfile = (targetUser?: User) => {
    if (targetUser) {
      setViewingUser(targetUser);
    } else {
      setViewingUser(null);
    }
    setCurrentView("profile");
  };

  const handleSendMessage = (userId: string) => {
    // In a real app, this would open the chat with that user
    setCurrentView("messages");
  };

  const renderContent = () => {
    if (currentView === "profile") {
      const profileUser = viewingUser || user;
      const isOwnProfile = profileUser.id === user.id;

      return (
        <ProfileView
          user={profileUser}
          isOwnProfile={isOwnProfile}
          onUpdateProfile={isOwnProfile ? handleUpdateProfile : undefined}
          onSendMessage={
            !isOwnProfile ? () => handleSendMessage(profileUser.id) : undefined
          }
        />
      );
    }

    if (currentView === "messages") {
      return <MessagingView currentUser={user} />;
    }

    if (currentView === "discover") {
      return (
        <DiscoverView
          currentUser={user}
          onViewProfile={handleViewProfile}
          onSendMessage={handleSendMessage}
        />
      );
    }

    return (
      <Feed
        posts={posts}
        currentUser={user}
        onCreatePost={async (content, type, tags) => {
          await createPost(user.id, content, type, tags);
        }}
        onLikePost={(postId) => likePost(postId, user.id)}
        onCommentPost={(postId, content) => addComment(postId, user.id, content)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-beige-100">
      <GradientBackground />
      <Header user={user} onLogout={logout} onViewProfile={() => handleViewProfile()} />
      
      <div className="container mx-auto flex gap-6 pt-6">
        <Sidebar currentView={currentView} onViewChange={(view) => {
          setCurrentView(view);
          if (view !== "profile") {
            setViewingUser(null);
          }
        }} />
        
        <main className="flex-1 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView + (viewingUser?.id || "")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
