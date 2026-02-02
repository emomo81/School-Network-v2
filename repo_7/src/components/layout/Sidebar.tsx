import { motion } from 'framer-motion';
import {
  RiHome5Fill,
  RiProjector2Fill,
  RiMessage3Fill,
  RiGroupFill,
  RiHashtag,
} from '@remixicon/react';

interface SidebarProps {
  userData: any;
  currentView: string;
  onViewChange: (view: any) => void;
  selectedDepartment: string | null;
  onDepartmentChange: (dept: string | null) => void;
}

const departments = [
  { id: 'software-engineering', name: 'Software Engineering', color: '#1C8AF8', icon: '💻' },
  { id: 'data-science', name: 'Data Science', color: '#A855F7', icon: '📊' },
  { id: 'accounting', name: 'Accounting', color: '#10B981', icon: '💰' },
  { id: 'marketing', name: 'Marketing', color: '#F59E0B', icon: '📢' },
  { id: 'business-admin', name: 'Business Admin', color: '#EF4444', icon: '💼' },
  { id: 'psychology', name: 'Psychology', color: '#EC4899', icon: '🧠' },
  { id: 'nursing', name: 'Nursing', color: '#06B6D4', icon: '🏥' },
  { id: 'education', name: 'Education', color: '#8B5CF6', icon: '📚' },
];

export default function Sidebar({
  userData,
  currentView,
  onViewChange,
  selectedDepartment,
  onDepartmentChange,
}: SidebarProps) {
  const navItems = [
    { id: 'feed', label: 'Home Feed', icon: RiHome5Fill },
    { id: 'projects', label: 'Projects', icon: RiProjector2Fill },
    { id: 'messages', label: 'Messages', icon: RiMessage3Fill },
    { id: 'groups', label: 'Study Groups', icon: RiGroupFill },
  ];

  return (
    <div className="w-60 bg-[#15161C] border-r border-white/10 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1C8AF8] rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">U</span>
          </div>
          <span className="text-white font-bold text-lg">UniHub</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#1C8AF8] text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Departments */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="flex items-center gap-2 px-3 mb-2">
          <RiHashtag className="w-4 h-4 text-white/40" />
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
            Departments
          </span>
        </div>
        <div className="space-y-0.5">
          <motion.button
            onClick={() => onDepartmentChange(null)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              selectedDepartment === null
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-lg">🌐</span>
            <span className="text-sm font-medium">All Departments</span>
          </motion.button>
          {departments.map((dept) => (
            <motion.button
              key={dept.id}
              onClick={() => onDepartmentChange(dept.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                selectedDepartment === dept.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: dept.color }}
              />
              <span className="text-sm font-medium truncate">{dept.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1C8AF8] to-[#A855F7] flex items-center justify-center text-white text-sm font-bold overflow-hidden">
            {userData.avatar ? (
              <img src={userData.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span>
                {userData.displayName?.[0]?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">
              {userData.displayName || 'User'}
            </div>
            <div className="text-white/40 text-xs truncate">
              {userData.departmentData?.name || 'Student'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
