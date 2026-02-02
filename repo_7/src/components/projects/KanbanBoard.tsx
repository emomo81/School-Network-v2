import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface KanbanBoardProps {
  projects: any[];
  setProjects: (projects: any[]) => void;
}

const columns = [
  { id: 'todo', title: 'To Do', color: '#6B7280' },
  { id: 'in-progress', title: 'In Progress', color: '#1C8AF8' },
  { id: 'done', title: 'Done', color: '#10B981' },
];

export default function KanbanBoard({ projects, setProjects }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-180px)]">
      {columns.map((column) => {
        const columnProjects = projects.filter((p) => p.status === column.id);

        return (
          <div key={column.id} className="flex flex-col min-h-0">
            {/* Column Header */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <h3 className="text-white font-semibold text-sm">{column.title}</h3>
              <span className="text-white/40 text-xs ml-auto">
                {columnProjects.length}
              </span>
            </div>

            {/* Cards Container */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {columnProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}

              {columnProjects.length === 0 && (
                <div className="text-center py-8 text-white/30 text-sm">
                  No projects
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
