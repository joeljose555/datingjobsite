import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, X } from "lucide-react";

interface MatchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onMessage?: () => void;
  onContinue?: () => void;
  match?: any;
  userRole?: "jobSeeker" | "recruiter";
  matchedUser?: {
    name: string;
    avatar: string;
    jobTitle?: string;
    company?: string;
  };
  currentUser?: {
    name: string;
    avatar: string;
    jobTitle?: string;
    company?: string;
  };
}

const MatchModal = ({
  isOpen = true,
  onClose = () => {},
  onMessage = () => {},
  onContinue = () => {},
  match,
  userRole = "jobSeeker",
  matchedUser = {
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    jobTitle: "UX Designer",
    company: "Creative Labs",
  },
  currentUser = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    jobTitle: "Frontend Developer",
    company: "Tech Solutions",
  },
}: MatchModalProps) => {
  // Use match data if provided
  const displayMatch = match
    ? {
        name: userRole === "jobSeeker" ? match.title : match.name,
        avatar: userRole === "jobSeeker" ? match.logo : match.photo,
        jobTitle: userRole === "jobSeeker" ? match.company : match.title,
        company: userRole === "jobSeeker" ? "" : match.company || "",
      }
    : matchedUser;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 bg-opacity-75">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md"
      >
        <Card className="bg-white rounded-xl overflow-hidden shadow-xl">
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    top: "50%",
                    left: "50%",
                    width: Math.random() * 10 + 5,
                    height: Math.random() * 10 + 5,
                    backgroundColor: [
                      "#FF6B6B",
                      "#4ECDC4",
                      "#FFE66D",
                      "#1A535C",
                      "#FF9F1C",
                    ][Math.floor(Math.random() * 5)],
                    borderRadius: "50%",
                  }}
                  animate={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}

          <div className="pt-8 px-6 text-center">
            <motion.h2
              className="text-2xl font-bold text-primary mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              It's a Match!
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-6"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              You and {displayMatch.name} have expressed interest in each other
            </motion.p>
          </div>

          <CardContent className="pb-8">
            <div className="flex justify-center items-center gap-4 mb-8">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Avatar className="h-24 w-24 border-4 border-primary">
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-center mt-2 font-medium">
                  {currentUser.name}
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  {currentUser.jobTitle}
                </p>
              </motion.div>

              <motion.div
                className="text-primary text-3xl font-bold"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ❤️
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Avatar className="h-24 w-24 border-4 border-primary">
                  <AvatarImage
                    src={displayMatch.avatar}
                    alt={displayMatch.name}
                  />
                  <AvatarFallback>{displayMatch.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-center mt-2 font-medium">
                  {displayMatch.name}
                </p>
                <p className="text-center text-xs text-muted-foreground">
                  {displayMatch.jobTitle}
                  {displayMatch.company ? ` at ${displayMatch.company}` : ""}
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={onMessage} className="w-full" size="lg">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button
                onClick={onContinue}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Continue Swiping
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MatchModal;
