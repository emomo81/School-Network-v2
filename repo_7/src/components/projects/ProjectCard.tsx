import { motion } from 'framer-motion';
import { RiCalendarLine, RiUserLine } from '@remixicon/react';

interface ProjectCardProps {
  project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#15161C] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all cursor-pointer"
    >
      {/* Title */}
      <h3 className="text-white font-semibold text-sm mb-2">{project.title}</h3>

      {/* Description */}
      <p className="text-white/60 text-xs mb-3 line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="text-xs px-2 py-0.5 bg-white/5 text-white/50 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-white/40 text-xs pt-3 border-t border-white/5">
        {/* Due Date */}
        <div className="flex items-center gap-1.5">
          <RiCalendarLine className="w-3.5 h-3.5" />
          <span>{project.dueDate}</span>
        </div>

        {/* Members */}
        <div className="flex items-center gap-1">
          <RiUserLine className="w-3.5 h-3.5" />
          <span>{project.members.length}</span>
        </div>
      </div>
    </motion.div>
  );
}
