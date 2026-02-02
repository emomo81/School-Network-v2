import { motion } from 'framer-motion';
import { RiThumbUpFill, RiChat3Fill, RiShareForwardFill } from '@remixicon/react';

interface PostCardProps {
  post: any;
}

const postTypeIcons = {
  question: '❓',
  project: '🚀',
  resource: '📚',
};

export default function PostCard({ post }: PostCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-[#15161C] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${post.author.departmentColor}, ${post.author.departmentColor}dd)`,
          }}
        >
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span>{getInitials(post.author.name)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium text-sm">{post.author.name}</h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${post.author.departmentColor}20`,
                color: post.author.departmentColor,
              }}
            >
              {post.author.department}
            </span>
          </div>
          <p className="text-white/40 text-xs mt-0.5">{post.timestamp}</p>
        </div>
        <div className="text-2xl">{postTypeIcons[post.type as keyof typeof postTypeIcons]}</div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h2 className="text-white font-semibold text-base mb-2">{post.title}</h2>
        <p className="text-white/70 text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="text-xs px-2.5 py-1 bg-white/5 text-white/60 rounded-full hover:bg-white/10 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-white/5">
        <button className="flex items-center gap-2 text-white/60 hover:text-[#1C8AF8] transition-colors">
          <RiThumbUpFill className="w-4 h-4" />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-white/60 hover:text-[#1C8AF8] transition-colors">
          <RiChat3Fill className="w-4 h-4" />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-white/60 hover:text-[#1C8AF8] transition-colors ml-auto">
          <RiShareForwardFill className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
