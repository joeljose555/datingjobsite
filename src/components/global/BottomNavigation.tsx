import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Briefcase, Heart, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: Briefcase, label: "Jobs" },
    { path: "/matches", icon: Heart, label: "Matches" },
    { path: "/chat", icon: MessageSquare, label: "Messages" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg border-t border-gray-200/50 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 h-auto px-2 py-1 ${
                location.pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation; 