import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  User,
  MessageSquare,
  Filter,
  Users,
  Briefcase,
  Menu,
  MapPin,
  DollarSign,
  Clock,
  X,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import SwipeCard from "@/components/features/job-search/SwipeCard";
import MatchModal from "@/components/features/job-search/MatchModal";
import BottomNavigation from "@/components/global/BottomNavigation";
import NotificationModal from "@/components/features/notifications/NotificationModal";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import {
  UserRole,
} from "@/types/User";

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  description: string;
  location: string;
  tags: string[];
  salary?: string;
}

interface Candidate {
  id: string;
  name: string;
  photo: string;
  title: string;
  description: string;
  skills: string[];
  location: string;
  experience?: string;
}

interface FilterState {
  location: string;
  salaryRange: string;
  jobType: string[];
  experience: string;
  skills: string[];
  remote: boolean;
}

const JobSearchPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole>("jobSeeker");
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Job | Candidate | null>(
    null,
  );
  const [showProfileSheet, setShowProfileSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showNotificationSheet, setShowNotificationSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    salaryRange: "",
    jobType: [],
    experience: "",
    skills: [],
    remote: false,
  });

  // Sample data
  const sampleJobs: Job[] = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Innovations Inc.",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=techinn",
      description:
        "We are looking for a skilled frontend developer with experience in React and modern JavaScript frameworks.",
      location: "San Francisco, CA",
      tags: ["React", "JavaScript", "TypeScript", "Remote"],
      salary: "$120,000 - $150,000",
    },
    {
      id: "2",
      title: "UX Designer",
      company: "Creative Solutions",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=creative",
      description:
        "Join our design team to create beautiful and intuitive user experiences for our clients.",
      location: "New York, NY",
      tags: ["Figma", "UI/UX", "Prototyping", "Hybrid"],
      salary: "$90,000 - $120,000",
    },
    {
      id: "3",
      title: "Full Stack Engineer",
      company: "Growth Startup",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=growth",
      description:
        "Looking for a versatile developer who can work across our entire stack and help us scale.",
      location: "Austin, TX",
      tags: ["Node.js", "React", "MongoDB", "AWS", "On-site"],
      salary: "$130,000 - $160,000",
    },
  ];

  const sampleCandidates: Candidate[] = [
    {
      id: "1",
      name: "Alex Johnson",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      title: "Senior Frontend Developer",
      description:
        "5+ years of experience building responsive web applications with React and TypeScript.",
      skills: ["React", "TypeScript", "Redux", "CSS-in-JS"],
      location: "Seattle, WA",
      experience: "5 years",
    },
    {
      id: "2",
      name: "Jamie Smith",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamie",
      title: "UX/UI Designer",
      description:
        "Passionate designer with a portfolio of user-centered digital products and experiences.",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      location: "Portland, OR",
      experience: "3 years",
    },
    {
      id: "3",
      name: "Taylor Wilson",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=taylor",
      title: "Full Stack Developer",
      description:
        "Full stack developer with expertise in MERN stack and cloud infrastructure.",
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
      location: "Chicago, IL",
      experience: "4 years",
    },
  ];

  const [allItems] = useState<(Job | Candidate)[]>(
    userRole === "jobSeeker" ? sampleJobs : sampleCandidates,
  );
  const [currentItems, setCurrentItems] = useState<(Job | Candidate)[]>(
    userRole === "jobSeeker" ? sampleJobs : sampleCandidates,
  );

  const handleSwipeLeft = (item: Job | Candidate) => {
    // Remove the item from the current items
    setCurrentItems(currentItems.filter((i) => i.id !== item.id));
  };

  const handleSwipeRight = (item: Job | Candidate) => {
    // Simulate a match (in a real app, this would check against backend data)
    const isMatch = Math.random() > 0.5;

    if (isMatch) {
      setCurrentMatch(item);
      setShowMatchModal(true);
    }

    // Remove the item from the current items
    setCurrentItems(currentItems.filter((i) => i.id !== item.id));
  };

  const handleSuperLike = (item: Job | Candidate) => {
    // Higher chance of match with super like
    const isMatch = Math.random() > 0.3;

    if (isMatch) {
      setCurrentMatch(item);
      setShowMatchModal(true);
    }

    // Remove the item from the current items
    setCurrentItems(currentItems.filter((i) => i.id !== item.id));
  };

  const handleCloseMatchModal = () => {
    setShowMatchModal(false);
    setCurrentMatch(null);
  };
  
  const toggleUserRole = () => {
    const newRole = userRole === "jobSeeker" ? "recruiter" : "jobSeeker";
    setUserRole(newRole);
    const newItems = newRole === "jobSeeker" ? sampleJobs : sampleCandidates;
    setCurrentItems(newItems);
    // Reset filters when switching roles
    setFilters({
      location: "",
      salaryRange: "",
      jobType: [],
      experience: "",
      skills: [],
      remote: false,
    });
    setSearchQuery("");
  };

  const applyFilters = () => {
    let filtered = allItems;

    if (searchQuery) {
      filtered = filtered.filter(item => 
        ('title' in item && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ('name' in item && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ('company' in item && item.company.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // In a real app, you'd apply more filters from the state here
    
    setCurrentItems(filtered);
    setShowFilterSheet(false);
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      salaryRange: "",
      jobType: [],
      experience: "",
      skills: [],
      remote: false,
    });
    setSearchQuery("");
    setCurrentItems(allItems);
    setShowFilterSheet(false);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleJobTypeToggle = (type: string) => {
    setFilters(prev => {
      const jobType = prev.jobType.includes(type)
        ? prev.jobType.filter(t => t !== type)
        : [...prev.jobType, type];
      return { ...prev, jobType };
    });
  };

  const handleSkillToggle = (skill: string) => {
    setFilters(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  // Main app interface after onboarding is complete
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JobMatchr
            </h1>
            {/* <Badge
              variant="outline"
              className="hidden md:inline-flex lg:text-sm"
            >
              {userRole === "jobSeeker" ? "Job Seeker" : "Recruiter"}
            </Badge> */}
          </div>

          {/* Search Bar - Desktop */}
          {/* <div className="hidden lg:flex flex-1 max-w-xl mx-8 items-center relative">
            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
            <Input
              placeholder={`Search ${userRole === "jobSeeker" ? "jobs" : "candidates"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-11 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-300"
              onKeyPress={(e) => e.key === "Enter" && applyFilters()}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2"
              onClick={() => setShowFilterSheet(true)}
            >
              <SlidersHorizontal className="h-5 w-5 text-gray-500" />
            </Button>
          </div> */}

          {/* Action Icons */}
          <div className="flex items-center space-x-3 lg:space-x-5">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotificationSheet(true)}>
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilterSheet(true)}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
            
            {/* Profile Dropdown/Sheet */}
            {/* <Sheet open={showProfileSheet} onOpenChange={setShowProfileSheet}>
              <SheetTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </SheetTrigger>
              <SheetContent>
                <div className="space-y-6 mt-6">
                  <div className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">
                      {userRole === "jobSeeker" ? "Job Seeker" : "Recruiter"}
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={toggleUserRole}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Switch to{" "}
                      {userRole === "jobSeeker" ? "Recruiter" : "Job Seeker"}
                    </Button>
                    <Separator />
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-500 hover:text-red-600"
                      onClick={() => navigate("/")}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>
      </header>

      {/* Search Bar - Mobile */}
      {/* <div className="lg:hidden px-4 py-3 bg-white border-b flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${userRole === "jobSeeker" ? "jobs" : "candidates"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-10"
            onKeyPress={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>
      </div> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-6 py-6 lg:py-8 flex justify-center pb-24">
        <div className="w-full max-w-md lg:max-w-2xl xl:max-w-4xl">
          {/* Swiping Deck */}
          <div className="relative h-[600px] lg:h-[700px]">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="absolute w-full h-full"
                  style={{
                    zIndex: currentItems.length - index,
                  }}
                  initial={{ scale: 0.95, y: 20, opacity: 0 }}
                  animate={{
                    scale: 1 - Math.min(index, 2) * 0.05,
                    y: index * 10,
                    opacity: index < 3 ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <SwipeCard
                    item={item}
                    isTop={index === 0}
                    onSwipeLeft={() => handleSwipeLeft(item)}
                    onSwipeRight={() => handleSwipeRight(item)}
                    onSuperLike={() => handleSuperLike(item)}
                    userRole={userRole}
                  />
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-2xl">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No more {userRole === "jobSeeker" ? "jobs" : "candidates"}
                </h3>
                <p className="text-muted-foreground mt-2">
                  Check back later or adjust your filters.
                </p>
                <Button className="mt-6" onClick={() => setCurrentItems(allItems)}>
                  Reset Deck
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Filter Sheet */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent className="w-full sm:max-w-md">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilterSheet(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Location */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="e.g., San Francisco, CA"
                    className="pl-9"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
              </div>

              {/* Salary Range */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Salary Range</Label>
                <Select
                  value={filters.salaryRange}
                  onValueChange={(value) => handleFilterChange("salaryRange", value)}
                >
                  <SelectTrigger>
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Any salary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Salary</SelectItem>
                    <SelectItem value="<50k">&lt; $50,000</SelectItem>
                    <SelectItem value="50-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100-150k">$100,000 - $150,000</SelectItem>
                    <SelectItem value=">150k">&gt; $150,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Job Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Full-time", "Part-time", "Contract", "Internship"].map(
                    (type) => (
                      <Button
                        key={type}
                        variant={filters.jobType.includes(type) ? "default" : "outline"}
                        onClick={() => handleJobTypeToggle(type)}
                        className="justify-start"
                      >
                        {filters.jobType.includes(type) && "✓ "} {type}
                      </Button>
                    ),
                  )}
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Experience Level</Label>
                <Select
                  value={filters.experience}
                  onValueChange={(value) => handleFilterChange("experience", value)}
                >
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Any experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Experience</SelectItem>
                    <SelectItem value="entry">Entry-level</SelectItem>
                    <SelectItem value="mid">Mid-level</SelectItem>
                    <SelectItem value="senior">Senior-level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "JavaScript",
                    "Node.js",
                    "Python",
                    "Figma",
                    "UI/UX",
                  ].map((skill) => (
                    <Button
                      key={skill}
                      variant={filters.skills.includes(skill) ? "default" : "outline"}
                      onClick={() => handleSkillToggle(skill)}
                      size="sm"
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Remote */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remote"
                  checked={filters.remote}
                  onCheckedChange={(checked) => handleFilterChange("remote", checked)}
                />
                <Label htmlFor="remote">Remote Only</Label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-between">
              <Button variant="ghost" onClick={clearFilters}>
                Clear All
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Match Modal */}
      {showMatchModal && currentMatch && (
        <MatchModal
          match={currentMatch}
          onClose={handleCloseMatchModal}
          onMessage={() => {
            handleCloseMatchModal();
            navigate("/chat");
          }}
          userRole={userRole}
        />
      )}

      <NotificationModal isOpen={showNotificationSheet} onOpenChange={setShowNotificationSheet} />
      <BottomNavigation />
    </div>
  );
};

export default JobSearchPage;
