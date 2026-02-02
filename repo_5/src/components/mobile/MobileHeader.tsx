import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  title: string;
  showNotifications?: boolean;
  showSearch?: boolean;
  notificationCount?: number;
}

export function MobileHeader({
  title,
  showNotifications = true,
  showSearch = false,
  notificationCount = 0,
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          {showSearch && (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Search className="w-5 h-5" />
            </Button>
          )}
          {showNotifications && (
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-destructive rounded-full">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
