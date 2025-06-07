import React, { useState } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  X,
  Star,
  MapPin,
  DollarSign,
  Clock,
  Building,
} from "lucide-react";

interface SwipeCardProps {
  item: any;
  isTop?: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSuperLike: () => void;
  userRole: "jobSeeker" | "recruiter";
}

const SwipeCard = ({
  item,
  isTop = false,
  onSwipeLeft,
  onSwipeRight,
  onSuperLike,
  userRole,
}: SwipeCardProps) => {
  const [isGone, setIsGone] = useState(false);
  const controls = useAnimation();

  const handleDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 100;
    const direction = info.offset.x > 0 ? "right" : "left";

    if (Math.abs(info.offset.x) > threshold) {
      const xPosition = direction === "right" ? 1000 : -1000;

      await controls.start({
        x: xPosition,
        opacity: 0,
        transition: { duration: 0.3 },
      });

      setIsGone(true);

      if (direction === "right") {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    } else {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      });
    }
  };

  const handleSwipeLeft = async () => {
    await controls.start({
      x: -1000,
      opacity: 0,
      transition: { duration: 0.3 },
    });
    setIsGone(true);
    onSwipeLeft();
  };

  const handleSwipeRight = async () => {
    await controls.start({
      x: 1000,
      opacity: 0,
      transition: { duration: 0.3 },
    });
    setIsGone(true);
    onSwipeRight();
  };

  const handleSuperLike = async () => {
    await controls.start({
      y: -1000,
      opacity: 0,
      transition: { duration: 0.3 },
    });
    setIsGone(true);
    onSuperLike();
  };

  if (isGone) {
    return null;
  }

  // Return null if item is not provided
  if (!item) {
    return null;
  }

  const isJob = userRole === "jobSeeker";
  const displayName = isJob ? item.title : item.name;
  const displaySubtitle = isJob ? item.company : item.title;
  const displayImage = isJob ? item.logo : item.photo;
  const displayTags = isJob ? item.tags : item.skills;
  const displayLocation = item.location;

  return (
    <div
      className={`absolute w-full max-w-sm mx-auto h-[600px] ${
        isTop ? "z-10" : "z-0"
      }`}
      style={{
        transform: isTop ? "scale(1)" : "scale(0.95)",
        opacity: isTop ? 1 : 0.8,
      }}
    >
      <motion.div
        drag={isTop}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.9}
        onDragEnd={isTop ? handleDragEnd : undefined}
        animate={controls}
        className="w-full h-full"
      >
        <Card className="w-full h-full overflow-hidden shadow-xl rounded-2xl border bg-white">
          {/* Header with Avatar/Logo */}
          <div className="relative p-6 pb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                <AvatarImage src={displayImage} alt={displayName} />
                <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {displayName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-900 truncate">
                  {displayName}
                </h2>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  {isJob ? (
                    <>
                      <Building className="h-4 w-4 mr-1" />
                      {displaySubtitle}
                    </>
                  ) : (
                    displaySubtitle
                  )}
                </p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {displayLocation}
                  {isJob && item.experience && (
                    <>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      {item.experience}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <CardContent className="px-6 pb-6 flex flex-col h-[calc(100%-140px)]">
            {/* Salary for jobs */}
            {isJob && item.salary && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center text-green-700">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="font-semibold">{item.salary}</span>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-4 flex-grow">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                {item.description}
              </p>
            </div>

            {/* Tags/Skills */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {displayTags?.slice(0, 6).map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {tag}
                  </Badge>
                ))}
                {displayTags?.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{displayTags.length - 6} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center space-x-4 mt-auto">
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                onClick={handleSwipeLeft}
              >
                <X className="h-6 w-6 text-red-500" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-2 border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200"
                onClick={handleSuperLike}
              >
                <Star className="h-5 w-5 text-yellow-500" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-2 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                onClick={handleSwipeRight}
              >
                <Heart className="h-6 w-6 text-green-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SwipeCard;
