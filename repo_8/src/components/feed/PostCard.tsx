import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Post, User } from "@/lib/types";
import {
  RiHeart3Line,
  RiHeart3Fill,
  RiChat3Line,
  RiSendPlaneLine,
} from "@remixicon/react";

interface PostCardProps {
  post: Post;
  author: User;
  currentUserId: string;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

export function PostCard({
  post,
  author,
  currentUserId,
  onLike,
  onComment,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [allCommentAuthors, setAllCommentAuthors] = useState<Record<string, User>>({});

  const isLiked = post.likes.includes(currentUserId);
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const typeColors = {
    question: "bg-blue-100 text-blue-800 border-blue-200",
    project: "bg-green-100 text-green-800 border-green-200",
    resource: "bg-purple-100 text-purple-800 border-purple-200",
  };

  const typeLabels = {
    question: "Question",
    project: "Project",
    resource: "Resource",
  };

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-navy-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 border border-navy-200">
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback className="bg-secondary text-white text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-navy-800">{author.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {author.department}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <Badge className={typeColors[post.type]}>
              {typeLabels[post.type]}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-navy-800 whitespace-pre-wrap">{post.content}</p>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-navy-200/50"
                >
                  #{tag.replace(/\s+/g, "")}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${
                isLiked ? "text-red-500 hover:text-red-600" : ""
              }`}
              onClick={() => onLike(post.id)}
            >
              {isLiked ? (
                <RiHeart3Fill className="h-5 w-5" />
              ) : (
                <RiHeart3Line className="h-5 w-5" />
              )}
              <span>{post.likes.length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setShowComments(!showComments)}
            >
              <RiChat3Line className="h-5 w-5" />
              <span>{post.comments.length}</span>
            </Button>
          </div>

          {showComments && (
            <div className="space-y-3 border-t border-navy-200 pt-3">
              {post.comments.map((comment) => {
                // In a real app, fetch the comment author
                const commentAuthor = {
                  name: "Student",
                  avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userId}`,
                };
                return (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={commentAuthor.avatarUrl} />
                      <AvatarFallback className="bg-secondary text-white text-xs">
                        S
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-muted rounded-lg p-2">
                      <p className="text-sm font-medium text-navy-800">
                        {commentAuthor.name}
                      </p>
                      <p className="text-sm text-navy-600">{comment.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleComment()}
                  className="border-navy-200"
                />
                <Button
                  size="icon"
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="bg-secondary hover:bg-blue-400"
                >
                  <RiSendPlaneLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
