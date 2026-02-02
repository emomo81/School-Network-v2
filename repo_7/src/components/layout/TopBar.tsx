import { useState } from 'react';
import { RiSearchLine, RiNotification3Fill, RiSettings4Fill } from '@remixicon/react';
import { Input } from '../ui/input';

interface TopBarProps {
  userData: any;
}

export default function TopBar({ userData }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-16 bg-[#15161C] border-b border-white/10 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts, projects, or people..."
            className="h-10 pl-10 bg-[#0F1012] border-white/10 text-white placeholder:text-white/40 focus:border-[#1C8AF8] focus:ring-1 focus:ring-[#1C8AF8]"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <RiNotification3Fill className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#1C8AF8] rounded-full" />
        </button>

        {/* Settings */}
        <button className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <RiSettings4Fill className="w-5 h-5" />
        </button>

        {/* User Avatar */}
        <button className="flex items-center gap-2 hover:bg-white/5 rounded-lg p-1.5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1C8AF8] to-[#A855F7] flex items-center justify-center text-white text-sm font-bold overflow-hidden">
            {userData.avatar ? (
              <img src={userData.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span>
                {userData.displayName?.[0]?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
