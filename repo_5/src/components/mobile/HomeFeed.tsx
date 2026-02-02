import { useState, useRef } from 'react';
import { Post } from '@/types/student';
import { Heart, MessageCircle, Bookmark, MoreVertical, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HomeFeedProps {
  posts: Post[];
  onPostUpdate: (postId: string, updates: Partial<Post>) => void;
}

export function HomeFeed({ posts, onPostUpdate }: HomeFeedProps) {
  const [filterType, setFilterType] = useState<'all' | 'question' | 'project' | 'study-group'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredPosts = filterType === 'all' ? posts : posts.filter((p) => p.type === filterType);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getTypeColor = (type: Post['type']) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'project':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'study-group':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleLike = (postId: string, currentlyLiked: boolean) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    
    onPostUpdate(postId, {
      isLiked: !currentlyLiked,
      likes: currentlyLiked ? post.likes - 1 : post.likes + 1,
    });
  };

  const handleSave = (postId: string, currentlySaved: boolean) => {
    onPostUpdate(postId, { isSaved: !currentlySaved });
    if (!currentlySaved) {
      // Show feedback when saving
      setTimeout(() => {
        // Visual feedback already shown in UI
      }, 100);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Refresh Indicator */}
      {isRefreshing && (
        <div className="absolute top-14 left-0 right-0 z-20 flex justify-center py-2 bg-background/95 backdrop-blur">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw className="w-5 h-5 text-primary" />
          </motion.div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="sticky top-14 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {['all', 'question', 'project', 'study-group'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                filterType === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {type === 'all' ? 'All Posts' : type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pb-20"
        onTouchStart={(e) => {
          const scrollTop = scrollRef.current?.scrollTop || 0;
          if (scrollTop === 0) {
            const touch = e.touches[0];
            scrollRef.current?.setAttribute('data-start-y', touch.clientY.toString());
          }
        }}
        onTouchMove={(e) => {
          const scrollTop = scrollRef.current?.scrollTop || 0;
          if (scrollTop === 0) {
            const startY = parseFloat(scrollRef.current?.getAttribute('data-start-y') || '0');
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            if (diff > 80 && !isRefreshing) {
              handleRefresh();
            }
          }
        }}
      >
        {filteredPosts.map((post) => (
          <article key={post.id} className="bg-card border-b border-border p-4">
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{post.author.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {post.author.department} • {formatTimestamp(post.timestamp)}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-3">
              <p className="text-sm leading-relaxed">{post.content}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={cn('text-xs', getTypeColor(post.type))}>
                {post.type.charAt(0).toUpperCase() + post.type.slice(1).replace('-', ' ')}
              </Badge>
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleLike(post.id, post.isLiked || false)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors min-w-[60px]',
                  post.isLiked
                    ? 'text-red-500 bg-red-50 dark:bg-red-950/30'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <Heart className={cn('w-4 h-4', post.isLiked && 'fill-current')} />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors min-w-[60px]">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button
                onClick={() => handleSave(post.id, post.isSaved || false)}
                className={cn(
                  'ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors',
                  post.isSaved
                    ? 'text-blue-500 bg-blue-50 dark:bg-blue-950/30'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <Bookmark className={cn('w-4 h-4', post.isSaved && 'fill-current')} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
