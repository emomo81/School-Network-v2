import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';

export default function MobileNav() {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Questions', icon: MessageSquare },
    { to: '/students', label: 'Students', icon: Users },
    { to: `/profile/${user?.id}`, label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors',
                isActive ? 'text-blue-600' : 'text-gray-600'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'text-blue-600')} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
