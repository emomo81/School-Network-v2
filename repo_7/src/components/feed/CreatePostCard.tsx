import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

interface CreatePostCardProps {
  userData: any;
  onPost: (postData: any) => void;
}

export default function CreatePostCard({ userData, onPost }: CreatePostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [postType, setPostType] = useState('question');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    onPost({
      type: postType,
      title: title.trim(),
      content: content.trim(),
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });

    setTitle('');
    setContent('');
    setTags('');
    setIsExpanded(false);
  };

  const getInitials = () => {
    const name = userData.displayName || userData.fullName;
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-[#15161C] border border-white/10 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C8AF8] to-[#A855F7] flex items-center justify-center text-white text-sm font-bold overflow-hidden flex-shrink-0">
          {userData.avatar ? (
            <img src={userData.avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            <span>{getInitials()}</span>
          )}
        </div>

        <div className="flex-1">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full text-left px-4 py-2.5 bg-[#0F1012] border border-white/10 rounded-lg text-white/40 hover:border-white/20 transition-colors text-sm"
            >
              What's on your mind?
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {/* Post Type */}
              <div className="flex gap-2">
                {[
                  { id: 'question', label: '❓ Question', color: '#1C8AF8' },
                  { id: 'project', label: '🚀 Project', color: '#A855F7' },
                  { id: 'resource', label: '📚 Resource', color: '#10B981' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPostType(type.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      postType === type.id
                        ? 'text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: postType === type.id ? `${type.color}20` : undefined,
                      color: postType === type.id ? type.color : undefined,
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Title */}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a title..."
                className="bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8]"
              />

              {/* Content */}
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What would you like to share?"
                rows={4}
                className="bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8] resize-none"
              />

              {/* Tags */}
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add tags (comma separated)..."
                className="bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8]"
              />

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmit}
                  disabled={!title.trim() || !content.trim()}
                  className="bg-[#1C8AF8] hover:bg-[#1C8AF8]/90 text-white px-4 h-9 text-sm"
                >
                  Post
                </Button>
                <Button
                  onClick={() => {
                    setIsExpanded(false);
                    setTitle('');
                    setContent('');
                    setTags('');
                  }}
                  variant="ghost"
                  className="text-white/60 hover:text-white hover:bg-white/5 px-4 h-9 text-sm"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
