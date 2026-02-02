import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Student } from '@/types/student';

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: Student;
  onPost: (content: string, type: string, tags: string[]) => void;
}

export function CreatePost({ isOpen, onClose, currentUser, onPost }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [selectedType, setSelectedType] = useState<'question' | 'project' | 'study-group' | 'general'>('general');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const postTypes = [
    { id: 'general' as const, label: 'General', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800' },
    { id: 'question' as const, label: 'Question', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' },
    { id: 'project' as const, label: 'Project', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30' },
    { id: 'study-group' as const, label: 'Study Group', color: 'bg-green-100 text-green-700 dark:bg-green-900/30' },
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handlePost = () => {
    if (content.trim()) {
      onPost(content, selectedType, tags);
      setContent('');
      setTags([]);
      setSelectedType('general');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <Button variant="ghost" size="icon" onClick={onClose} className="h-9 w-9">
                <X className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-semibold">Create Post</h2>
              <Button
                onClick={handlePost}
                disabled={!content.trim()}
                size="sm"
                className="h-9"
              >
                Post
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">{currentUser.name}</h3>
                  <p className="text-xs text-muted-foreground">{currentUser.department}</p>
                </div>
              </div>

              {/* Post Type Selection */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">
                  Post Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {postTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        selectedType === type.id
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background ' + type.color
                          : type.color + ' opacity-60'
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Input */}
              <div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="min-h-[120px] resize-none text-base"
                  autoFocus
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {content.length} / 500 characters
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">
                  Tags (Optional)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      <Hash className="w-3 h-3" />
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {tags.length < 5 && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Add a tag..."
                      className="flex-1 h-9 px-3 text-sm rounded-md border border-input bg-background"
                    />
                    <Button onClick={handleAddTag} size="sm" variant="outline">
                      Add
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
