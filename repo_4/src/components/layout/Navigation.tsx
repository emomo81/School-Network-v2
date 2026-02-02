import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";
import { useAuth } from "@/lib/auth";
import {
  Home,
  Users,
  Calendar,
  FolderKanban,
  UserCheck,
  Bell,
  Search,
  Menu,
  BookOpen,
  MessageSquare,
  Network,
  HelpCircle,
  LogOut,
  Compass
} from "lucide-react";

interface NavigationProps {
  currentUser: User | null;
  onSearch?: (query: string) => void;
}

export function Navigation({ currentUser, onSearch }: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const mainNavItems = [
    { id: "feed", label: "Home", icon: Home, href: "/dashboard" },
    { id: "students", label: "Students", icon: Users, href: "/dashboard/students" },
    { id: "discover", label: "Discover", icon: Compass, href: "/dashboard/discover" },
    { id: "projects", label: "Projects", icon: FolderKanban, href: "/dashboard/projects" },
    { id: "study-groups", label: "Study Groups", icon: BookOpen, href: "/dashboard/study-groups" },
  ];

  const moreNavItems = [
    { id: "events", label: "Events", icon: Calendar, href: "/dashboard/events" },
    { id: "mentors", label: "Mentors", icon: UserCheck, href: "/dashboard/mentors" },
    { id: "messages", label: "Messages", icon: MessageSquare, href: "/dashboard/messages" },
    { id: "connections", label: "Connections", icon: Network, href: "/dashboard/connections" },
    { id: "help", label: "Help", icon: HelpCircle, href: "/dashboard/help" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const currentPath = location.pathname;
  const isTabActive = (href: string) => {
    if (href === "/dashboard" && currentPath === "/dashboard") return true;
    if (href !== "/dashboard" && currentPath.startsWith(href)) return true;
    return false;
  };

  if (!currentUser) return null;

  return (
    <nav className="sticky top-0 z-50 bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div> */}
            <img src="/ulk-logo.png" alt="ULK Logo" className="w-10 h-10 object-contain" />
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl">ULK Network</h1>
              <p className="text-xs text-muted-foreground">Independent University of Kigali</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {showSearch ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search students, projects..."
                    className="pl-10 w-64"
                    autoFocus
                  />
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowSearch(false)}>
                  Cancel
                </Button>
              </form>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(true)}
                  className="mr-2"
                >
                  <Search className="w-5 h-5" />
                </Button>
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isTabActive(item.href);

                  return (
                    <Link key={item.id} to={item.href}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="gap-2"
                        size="sm"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  );
                })}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Menu className="w-4 h-4" />
                      More
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {moreNavItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <DropdownMenuItem
                          key={item.id}
                          asChild
                        >
                          <Link to={item.href} className="w-full flex items-center cursor-pointer">
                            <Icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Link to="/dashboard/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80" align="end">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{currentUser.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{currentUser.headline}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><strong>Department:</strong> {currentUser.department}</p>
                    <p><strong>Year:</strong> {currentUser.year}</p>
                  </div>
                  <Button
                    className="w-full"
                    asChild
                  >
                    <Link to="/dashboard/profile">View Profile</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {[...mainNavItems, ...moreNavItems].map((item) => {
            const Icon = item.icon;
            const isActive = isTabActive(item.href);

            return (
              <Link key={item.id} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2 whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
