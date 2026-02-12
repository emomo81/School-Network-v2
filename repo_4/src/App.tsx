import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useOutlet, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth";
import { Navigation } from "@/components/layout/Navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  mockProfile,
  mockPosts,
  mockEvents,
  mockProjects,
  mockUsers
} from "@/lib/mock-data";
import { Post, Event, Project } from "@/lib/types";

// Page Imports 
import Landing from "@/components/pages/auth/Landing";
import Login from "@/components/pages/auth/Login";
import Signup from "@/components/pages/auth/Signup";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { DiscoverPage } from "@/components/pages/DiscoverPage";
import { WelcomePage } from "@/components/pages/WelcomePage";
import { ProfilePage } from "@/components/pages/ProfilePage";
import { FeedPage } from "@/components/pages/FeedPage";
import { EventsPage } from "@/components/pages/EventsPage";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { MentorsPage } from "@/components/pages/MentorsPage";
import { StudentsPage } from "@/components/pages/StudentsPage";
import { StudyGroupsPage } from "@/components/pages/StudyGroupsPage";
import { MessagesPage } from "@/components/pages/MessagesPage";
import { ConnectionsPage } from "@/components/pages/ConnectionsPage";
import { HelpPage } from "@/components/pages/HelpPage";

// Dialog Imports
import { EditPostDialog } from "@/components/dialogs/EditPostDialog";
import { EditProjectDialog } from "@/components/dialogs/EditProjectDialog";
import { EditEventDialog } from "@/components/dialogs/EditEventDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function DashboardLayout() {
  const { user, isAuthenticated } = useAuth();
  const outlet = useOutlet();

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentUser={user} onSearch={(q) => console.log(q)} />
      {outlet}
    </div>
  );
}

function PageContent() {
  // State for CRUD operations (moved from App.tsx)
  const [posts, setPosts] = useState(mockPosts);
  const [projects, setProjects] = useState(mockProjects);
  const [events, setEvents] = useState(mockEvents);

  // Edit dialogs state
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  // Delete confirmation state
  const [deletingItem, setDeletingItem] = useState<{ type: 'post' | 'project' | 'event', id: string } | null>(null);

  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  // Filter mentors from users
  const mentors = mockUsers.filter(u => u.isMentor);

  // CRUD Handlers
  const handleEditPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) setEditingPost(post);
  };

  const handleSavePost = (postId: string, content: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, content } : p));
    toast.success("Post updated successfully!");
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    setDeletingItem(null);
    toast.success("Post deleted successfully!");
  };

  // Projects CRUD
  const handleEditProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) setEditingProject(project);
  };

  const handleSaveProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, ...updates } : p
    ));
    toast.success("Project updated successfully!");
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setDeletingItem(null);
    toast.success("Project deleted successfully!");
  };

  // Events CRUD
  const handleEditEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) setEditingEvent(event);
  };

  const handleSaveEvent = (eventId: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(e =>
      e.id === eventId ? { ...e, ...updates } : e
    ));
    toast.success("Event updated successfully!");
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setDeletingItem(null);
    toast.success("Event deleted successfully!");
  };

  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/dashboard/feed" replace />} />

        <Route path="feed" element={
          <FeedPage
            posts={posts}
            currentUser={user}
            onEditPost={handleEditPost}
            onDeletePost={(id) => setDeletingItem({ type: 'post', id })}
          />
        } />

        <Route path="profile" element={
          <ProfilePage
            profile={{ ...mockProfile, ...user }} // Merge mock profile with current user session data
            projects={projects}
            isOwnProfile={true}
          />
        } />

        <Route path="students" element={
          <StudentsPage users={mockUsers} currentUserId={user.id} />
        } />

        <Route path="discover" element={
          <DiscoverPage currentUser={user} onViewProfile={(u) => console.log('view', u)} />
        } />

        <Route path="projects" element={
          <ProjectsPage
            projects={projects}
            currentUserId={user.id}
            onEditProject={handleEditProject}
            onDeleteProject={(id) => setDeletingItem({ type: 'project', id })}
          />
        } />

        <Route path="study-groups" element={
          <StudyGroupsPage />
        } />

        <Route path="events" element={
          <EventsPage
            events={events}
            currentUserId={user.id}
            onEditEvent={handleEditEvent}
            onDeleteEvent={(id) => setDeletingItem({ type: 'event', id })}
          />
        } />

        <Route path="mentors" element={
          <MentorsPage mentors={mentors} />
        } />

        <Route path="messages" element={
          <MessagesPage />
        } />

        <Route path="connections" element={
          <ConnectionsPage users={mockUsers} currentUserId={user.id} />
        } />

        <Route path="help" element={
          <HelpPage />
        } />
      </Routes>

      {/* Dialogs */}
      {editingPost && (
        <EditPostDialog
          post={editingPost}
          open={!!editingPost}
          onOpenChange={(open) => !open && setEditingPost(null)}
          onSave={handleSavePost}
        />
      )}
      {editingProject && (
        <EditProjectDialog
          project={editingProject}
          open={!!editingProject}
          onOpenChange={(open) => !open && setEditingProject(null)}
          onSave={handleSaveProject}
        />
      )}
      {editingEvent && (
        <EditEventDialog
          event={editingEvent}
          open={!!editingEvent}
          onOpenChange={(open) => !open && setEditingEvent(null)}
          onSave={handleSaveEvent}
        />
      )}

      <AlertDialog open={!!deletingItem} onOpenChange={(open) => !open && setDeletingItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your {deletingItem?.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingItem?.type === 'post') handleDeletePost(deletingItem.id);
                if (deletingItem?.type === 'project') handleDeleteProject(deletingItem.id);
                if (deletingItem?.type === 'event') handleDeleteEvent(deletingItem.id);
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />

          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route path="*" element={<PageContent />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
