import { useState, useEffect } from "react";
import { PostCard } from "@/components/feed/PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post, User } from "@/lib/types";
import { Image, Video, FileText, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface FeedPageProps {
  posts: Post[];
  currentUser: User;
  onEditPost?: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
}

export function FeedPage({ posts, currentUser, onEditPost, onDeletePost }: FeedPageProps) {
  const [localPosts, setLocalPosts] = useState(posts);

  // Update local posts when props change
  useEffect(() => {
    setLocalPosts(posts);
  }, [posts]);
  const [newPostContent, setNewPostContent] = useState("");

  const handleLike = (postId: string) => {
    setLocalPosts(prev =>
      prev.map(p =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleComment = (postId: string) => {
    toast.info("Comment feature coming soon!");
  };

  const handleShare = (postId: string) => {
    toast.success("Post shared!");
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userHeadline: currentUser.headline,
      type: "general",
      content: newPostContent,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date().toISOString(),
    };

    setLocalPosts([newPost, ...localPosts]);
    setNewPostContent("");
    toast.success("Post published!");
  };

  // Sort posts by engagement for trending
  const trendingPosts = [...localPosts].sort((a, b) => {
    const scoreA = a.likes + a.comments * 2 + a.shares * 3;
    const scoreB = b.likes + b.comments * 2 + b.shares * 3;
    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Create Post Card */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Share your thoughts, achievements, or questions..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Image className="w-4 h-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Document
                    </Button>
                  </div>
                  <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Tabs */}
        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-6">
            {localPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={currentUser.id}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onEdit={onEditPost}
                onDelete={onDeletePost}
              />
            ))}
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="bg-secondary/50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Posts sorted by engagement (likes, comments, and shares)</span>
              </div>
            </div>
            {trendingPosts.map((post, idx) => (
              <div key={post.id} className="relative">
                {idx < 3 && (
                  <Badge
                    className="absolute -top-3 -left-3 z-10"
                    variant={idx === 0 ? "default" : "secondary"}
                  >
                    #{idx + 1} Trending
                  </Badge>
                )}
                <PostCard
                  post={post}
                  currentUserId={currentUser.id}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  onEdit={onEditPost}
                  onDelete={onDeletePost}
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
