import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";
import { Post, User, Department, PostType } from "@/lib/types";
import { mockUsers } from "@/lib/mockApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface FeedProps {
  posts: Post[];
  currentUser: User;
  onCreatePost: (content: string, type: PostType, tags: string[]) => Promise<void>;
  onLikePost: (postId: string) => void;
  onCommentPost: (postId: string, content: string) => void;
}

export function Feed({
  posts,
  currentUser,
  onCreatePost,
  onLikePost,
  onCommentPost,
}: FeedProps) {
  const [authors, setAuthors] = useState<Record<string, User>>({});
  const [departmentFilter, setDepartmentFilter] = useState<Department | "all">("all");
  const [typeFilter, setTypeFilter] = useState<PostType | "all">("all");

  useEffect(() => {
    const loadAuthors = async () => {
      const users = await mockUsers.getAll();
      const authorsMap: Record<string, User> = {};
      users.forEach((user) => {
        authorsMap[user.id] = user;
      });
      setAuthors(authorsMap);
    };
    loadAuthors();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const author = authors[post.userId];
    if (!author) return false;

    const matchesDepartment =
      departmentFilter === "all" || author.department === departmentFilter;
    const matchesType = typeFilter === "all" || post.type === typeFilter;

    return matchesDepartment && matchesType;
  });

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CreatePost onCreatePost={onCreatePost} />
      </motion.div>

      <div className="flex gap-3 items-center">
        <Select
          value={departmentFilter}
          onValueChange={(v) => setDepartmentFilter(v as Department | "all")}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as PostType | "all")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="question">Questions</SelectItem>
            <SelectItem value="project">Projects</SelectItem>
            <SelectItem value="resource">Resources</SelectItem>
          </SelectContent>
        </Select>

        {(departmentFilter !== "all" || typeFilter !== "all") && (
          <Badge variant="outline" className="ml-auto">
            {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const author = authors[post.userId];
          if (!author) return null;

          return (
            <PostCard
              key={post.id}
              post={post}
              author={author}
              currentUserId={currentUser.id}
              onLike={onLikePost}
              onComment={onCommentPost}
            />
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
