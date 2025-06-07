import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  jobTitle?: string;
  company?: string;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const chats: Chat[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      lastMessage: "Thanks for your interest in the position!",
      timestamp: "2m ago",
      unreadCount: 2,
      isOnline: true,
      jobTitle: "Senior Frontend Developer",
      company: "Tech Innovations",
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      lastMessage: "When would be a good time for an interview?",
      timestamp: "1h ago",
      unreadCount: 0,
      isOnline: false,
      jobTitle: "UX Designer",
      company: "Creative Labs",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      lastMessage: "Your portfolio looks impressive!",
      timestamp: "3h ago",
      unreadCount: 1,
      isOnline: true,
      jobTitle: "Product Manager",
      company: "StartupCo",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      text: "Hi! I saw your profile and I'm interested in the Frontend Developer position.",
      sender: "user",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      text: "Thanks for your interest in the position! I'd love to learn more about your experience.",
      sender: "other",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      text: "I have 5 years of experience with React and TypeScript. Would you like to see my portfolio?",
      sender: "user",
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      text: "Absolutely! Please share your portfolio link.",
      sender: "other",
      timestamp: "10:36 AM",
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.company?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-blue-600">Messages</h1>
          </div>
          <div className="flex items-center space-x-2">
            {selectedChat && (
              <>
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Chat List */}
          <div
            className={`${selectedChat ? "hidden lg:block" : "block"} lg:col-span-1`}
          >
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredChats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                      className={`p-4 cursor-pointer border-b border-gray-100 ${
                        selectedChat === chat.id
                          ? "bg-blue-50 border-blue-200"
                          : ""
                      }`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                            <AvatarFallback>
                              {chat.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">
                              {chat.name}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {chat.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {chat.jobTitle} at {chat.company}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">
                              {chat.lastMessage}
                            </p>
                            {chat.unreadCount > 0 && (
                              <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div
            className={`${selectedChat ? "block" : "hidden lg:block"} lg:col-span-2`}
          >
            {selectedChat ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedChat(null)}
                      className="lg:hidden"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={chats.find((c) => c.id === selectedChat)?.avatar}
                        alt={chats.find((c) => c.id === selectedChat)?.name}
                      />
                      <AvatarFallback>
                        {chats
                          .find((c) => c.id === selectedChat)
                          ?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {chats.find((c) => c.id === selectedChat)?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {chats.find((c) => c.id === selectedChat)?.jobTitle}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === "user"
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
