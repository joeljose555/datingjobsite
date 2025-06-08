import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface NotificationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const sampleNotifications = [
  {
    id: 1,
    type: "match",
    title: "New Match!",
    message: "You matched with Google.",
    timestamp: "5m ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
  },
  {
    id: 2,
    type: "message",
    title: "New Message from Amazon",
    message: "We'd like to schedule an interview...",
    timestamp: "1h ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amazon",
  },
  {
    id: 3,
    type: "profile_view",
    title: "Your profile was viewed",
    message: "A recruiter from Microsoft viewed your profile.",
    timestamp: "3h ago",
    read: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=microsoft",
  },
    {
    id: 4,
    type: "job_alert",
    title: "New Job Alert",
    message: "A new 'Senior React Developer' job matches your profile.",
    timestamp: "1d ago",
    read: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=job",
  },
];

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {sampleNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg flex items-start gap-3 ${
                !notification.read ? "bg-blue-50" : "bg-white"
              }`}
            >
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={notification.avatar} />
                <AvatarFallback>{notification.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                Close
            </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationModal; 