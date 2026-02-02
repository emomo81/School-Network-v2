import { useState } from 'react';
import { Student, Post } from '@/types/student';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit3, Grid3X3, Bookmark, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileProps {
  user: Student;
  posts: Post[];
  isOwnProfile?: boolean;
}

export function Profile({ user, posts, isOwnProfile = true }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'connections'>('posts');

  const userPosts = posts.filter((p) => p.author.id === user.id);
  const savedPosts = posts.filter((p) => p.isSaved);
  const connectionCount = 142; // Mock data

  const tabs = [
    { id: 'posts' as const, label: 'Posts', icon: Grid3X3, count: userPosts.length },
    { id: 'saved' as const, label: 'Saved', icon: Bookmark, count: savedPosts.length },
    { id: 'connections' as const, label: 'Connections', icon: Users, count: connectionCount },
  ];

  const stats = [
    { label: 'Posts', value: userPosts.length },
    { label: 'Connections', value: connectionCount },
    { label: 'Year', value: user.year },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-muted h-32" />

      <div className="px-4 pb-6">
        {/* Avatar & Edit Button */}
        <div className="flex items-end justify-between -mt-16 mb-4">
          <Avatar className="w-28 h-28 ring-4 ring-background shadow-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {isOwnProfile && (
            <Button variant="outline" size="sm" className="mb-2">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Name & Department */}
        <div className="mb-3">
          <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
          <p className="text-muted-foreground">{user.department}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-4 pb-4 border-b border-border">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-sm leading-relaxed">{user.bio}</p>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <Badge key={interest} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-4">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-3 border-b-2 transition-colors',
                    activeTab === tab.id
                      ? 'border-primary text-primary font-semibold'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-1">
              {userPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-muted rounded-lg flex items-center justify-center p-3 text-center"
                >
                  <p className="text-xs line-clamp-4">{post.content}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'saved' && (
            <div className="grid grid-cols-3 gap-1">
              {savedPosts.map((post) => (
                <div
                  key={post.id}
                  className="aspect-square bg-muted rounded-lg flex items-center justify-center p-3 text-center"
                >
                  <p className="text-xs line-clamp-4">{post.content}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'connections' && (
            <div className="space-y-3">
              {/* Mock connections - in real app this would be separate data */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">Student Name</h4>
                    <p className="text-xs text-muted-foreground">Computer Science</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
