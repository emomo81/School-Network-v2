import { useState } from 'react';
import { motion } from 'framer-motion';
import KanbanBoard from './KanbanBoard';
import { Button } from '../ui/button';
import { RiAddFill } from '@remixicon/react';

interface ProjectsViewProps {
  userData: any;
}

const mockProjects = [
  {
    id: '1',
    title: 'AI Study Assistant',
    description: 'Building an AI-powered study assistant for students',
    status: 'in-progress',
    members: ['Sarah', 'Mike', 'Alex'],
    dueDate: '2024-03-15',
    tags: ['AI', 'React', 'Python'],
  },
  {
    id: '2',
    title: 'Campus Event App',
    description: 'Mobile app for discovering campus events',
    status: 'todo',
    members: ['Emily', 'Jessica'],
    dueDate: '2024-03-20',
    tags: ['Mobile', 'React Native'],
  },
  {
    id: '3',
    title: 'Financial Tracker',
    description: 'Personal finance management tool for students',
    status: 'in-progress',
    members: ['Michael'],
    dueDate: '2024-03-18',
    tags: ['Finance', 'Web'],
  },
  {
    id: '4',
    title: 'Study Group Scheduler',
    description: 'Tool to schedule and manage study group meetings',
    status: 'done',
    members: ['Sarah', 'Alex'],
    dueDate: '2024-02-28',
    tags: ['Productivity'],
  },
];

export default function ProjectsView({ userData }: ProjectsViewProps) {
  const [projects, setProjects] = useState(mockProjects);

  return (
    <div className="h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Projects</h1>
          <p className="text-white/60 text-sm">
            Collaborate on projects and track progress
          </p>
        </div>
        <Button className="bg-[#1C8AF8] hover:bg-[#1C8AF8]/90 text-white h-10 px-4">
          <RiAddFill className="w-5 h-5 mr-2" />
          New Project
        </Button>
      </div>

      <KanbanBoard projects={projects} setProjects={setProjects} />
    </div>
  );
}
