import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/lib/types";
import { Heart, MessageCircle, Share2, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

export function PostCard({ post, currentUserId, onLike, onComment, onShare, onEdit, onDelete }: PostCardProps) {
  const typeColors = {
    achievement: "bg-yellow-100 text-yellow-700",
    project: "bg-blue-100 text-blue-700",
    question: "bg-purple-100 text-purple-700",
    event: "bg-green-100 text-green-700",
    general: "bg-gray-100 text-gray-700",
  };

  const isOwner = currentUserId === post.userId;

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <img
                  src={post.userAvatar}
                  alt={post.userName}
                  className="w-12 h-12 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                />
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex gap-3">
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{post.userName}</h4>
                    <p className="text-sm text-muted-foreground">{post.userHeadline}</p>
                    <Button size="sm" className="mt-2">
                      View Profile
                    </Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{post.userName}</h4>
                <Badge variant="secondary" className={typeColors[post.type]}>
                  {post.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{post.userHeadline}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(post.id)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Post
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete?.(post.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>

          {/* Media */}
          {post.media && post.media.length > 0 && (
            <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
              {post.media.map((media, idx) => (
                <div
                  key={idx}
                  className={`relative ${post.media!.length === 1 ? 'col-span-2' : ''} ${
                    idx === 0 && post.media!.length === 3 ? 'col-span-2' : ''
                  }`}
                >
                  {media.type === 'image' && (
                    <img
                      src={media.url}
                      alt="Post media"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 pt-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike?.(post.id)}
            className="gap-2 flex-1"
          >
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment?.(post.id)}
            className="gap-2 flex-1"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare?.(post.id)}
            className="gap-2 flex-1"
          >
            <Share2 className="w-4 h-4" />
            <span>{post.shares}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
