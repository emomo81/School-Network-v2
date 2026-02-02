import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { RiAddFill, RiUserLine, RiCalendarLine, RiTimeLine } from '@remixicon/react';

interface StudyGroupsViewProps {
  userData: any;
}

const mockGroups = [
  {
    id: '1',
    name: 'React Study Group',
    department: 'Software Engineering',
    departmentColor: '#1C8AF8',
    description: 'Weekly sessions on React and modern web development',
    members: 12,
    nextSession: 'Tomorrow, 3:00 PM',
    schedule: 'Tue & Thu, 3:00 PM',
    location: 'Library Room 204',
    topics: ['React', 'JavaScript', 'Web Dev'],
  },
  {
    id: '2',
    name: 'Machine Learning Fundamentals',
    department: 'Data Science',
    departmentColor: '#A855F7',
    description: 'Learning ML algorithms and practical applications',
    members: 8,
    nextSession: 'Mar 15, 2:00 PM',
    schedule: 'Mon & Wed, 2:00 PM',
    location: 'CS Building 301',
    topics: ['ML', 'Python', 'AI'],
  },
  {
    id: '3',
    name: 'Financial Accounting Prep',
    department: 'Accounting',
    departmentColor: '#10B981',
    description: 'Preparing for the final exam together',
    members: 15,
    nextSession: 'Mar 16, 5:00 PM',
    schedule: 'Wed & Fri, 5:00 PM',
    location: 'Business School 102',
    topics: ['Accounting', 'Finance', 'Exam Prep'],
  },
  {
    id: '4',
    name: 'Digital Marketing Strategy',
    department: 'Marketing',
    departmentColor: '#F59E0B',
    description: 'Discuss and analyze real-world marketing campaigns',
    members: 10,
    nextSession: 'Mar 17, 4:00 PM',
    schedule: 'Thu, 4:00 PM',
    location: 'Marketing Lab',
    topics: ['Marketing', 'Strategy', 'Digital'],
  },
];

export default function StudyGroupsView({ userData }: StudyGroupsViewProps) {
  const [groups, setGroups] = useState(mockGroups);
  const [filter, setFilter] = useState<'all' | 'joined' | 'available'>('all');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Study Groups</h1>
          <p className="text-white/60 text-sm">
            Join or create study groups to collaborate with peers
          </p>
        </div>
        <Button className="bg-[#1C8AF8] hover:bg-[#1C8AF8]/90 text-white h-10 px-4">
          <RiAddFill className="w-5 h-5 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'all', label: 'All Groups' },
          { id: 'joined', label: 'My Groups' },
          { id: 'available', label: 'Available' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === tab.id
                ? 'bg-[#1C8AF8] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#15161C] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base mb-1">
                  {group.name}
                </h3>
                <div
                  className="inline-block text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${group.departmentColor}20`,
                    color: group.departmentColor,
                  }}
                >
                  {group.department}
                </div>
              </div>
              <div className="flex items-center gap-1 text-white/60">
                <RiUserLine className="w-4 h-4" />
                <span className="text-sm font-medium">{group.members}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              {group.description}
            </p>

            {/* Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <RiCalendarLine className="w-4 h-4" />
                <span>Next: {group.nextSession}</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <RiTimeLine className="w-4 h-4" />
                <span>{group.schedule}</span>
              </div>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {group.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 bg-white/5 text-white/50 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-white/5">
              <Button className="flex-1 bg-[#1C8AF8] hover:bg-[#1C8AF8]/90 text-white h-9 text-sm">
                Join Group
              </Button>
              <Button
                variant="ghost"
                className="flex-1 text-white/60 hover:text-white hover:bg-white/5 h-9 text-sm"
              >
                View Details
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {groups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/40 text-sm">
            No study groups found. Create one to get started!
          </p>
        </div>
      )}
    </div>
  );
}
