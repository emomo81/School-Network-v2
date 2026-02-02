import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  RiHome5Line,
  RiHome5Fill,
  RiMessage3Line,
  RiMessage3Fill,
  RiUserLine,
  RiUserFill,
  RiCompassLine,
  RiCompassFill,
} from "@remixicon/react";

type View = "feed" | "messages" | "profile" | "discover";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const navItems = [
    {
      view: "feed" as View,
      label: "Feed",
      icon: RiHome5Line,
      activeIcon: RiHome5Fill,
    },
    {
      view: "messages" as View,
      label: "Messages",
      icon: RiMessage3Line,
      activeIcon: RiMessage3Fill,
    },
    {
      view: "discover" as View,
      label: "Discover",
      icon: RiCompassLine,
      activeIcon: RiCompassFill,
    },
    {
      view: "profile" as View,
      label: "Profile",
      icon: RiUserLine,
      activeIcon: RiUserFill,
    },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="sticky top-20 h-[calc(100vh-5rem)] w-64 border-r border-navy-200 bg-white p-4"
    >
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Button
              key={item.view}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive
                  ? "bg-navy-800 text-white hover:bg-navy-600"
                  : "hover:bg-navy-200/50"
              }`}
              onClick={() => onViewChange(item.view)}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </motion.aside>
  );
}
