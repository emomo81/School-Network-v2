import { Home, Compass, Plus, MessageCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TabType = 'home' | 'discover' | 'post' | 'messages' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadMessages?: number;
}

export function BottomNav({ activeTab, onTabChange, unreadMessages = 0 }: BottomNavProps) {
  const tabs = [
    { id: 'home' as TabType, icon: Home, label: 'Home' },
    { id: 'discover' as TabType, icon: Compass, label: 'Discover' },
    { id: 'post' as TabType, icon: Plus, label: 'Post', special: true },
    { id: 'messages' as TabType, icon: MessageCircle, label: 'Messages', badge: unreadMessages },
    { id: 'profile' as TabType, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileTap={{ scale: tab.special ? 1.05 : 0.95 }}
              className={cn(
                'relative flex flex-col items-center justify-center min-w-[60px] h-12 rounded-lg transition-all',
                tab.special
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 scale-110 shadow-lg'
                  : isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('w-5 h-5', tab.special && 'w-6 h-6')} />
              <span className={cn('text-[10px] mt-0.5 font-medium', tab.special && 'hidden')}>
                {tab.label}
              </span>
              {tab.badge && tab.badge > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-3 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-destructive rounded-full"
                >
                  {tab.badge > 9 ? '9+' : tab.badge}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
