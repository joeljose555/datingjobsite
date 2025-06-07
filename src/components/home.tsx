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
import SwipeCard from "./SwipeCard";
import MatchModal from "./MatchModal";
import RoleSelection from "./onboarding/RoleSelection";
import JobSeekerOnboarding from "./onboarding/JobSeekerOnboarding";
import RecruiterOnboarding from "./onboarding/RecruiterOnboarding";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import {
  UserRole,
  JobSeekerProfile,
  RecruiterProfile,
  JobPosting,
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

type OnboardingStep = "roleSelection" | "onboarding" | "completed";

interface FilterState {
  location: string;
  salaryRange: string;
  jobType: string[];
  experience: string;
  skills: string[];
  remote: boolean;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [onboardingStep, setOnboardingStep] =
    useState<OnboardingStep>("roleSelection");
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userProfile, setUserProfile] = useState<Partial<
    JobSeekerProfile | RecruiterProfile
  > | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Job | Candidate | null>(
    null,
  );
  const [showProfileSheet, setShowProfileSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
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

  const handleRoleSelection = (role: UserRole) => {
    setUserRole(role);
    setOnboardingStep("onboarding");
  };

  const handleOnboardingComplete = (profile: any, jobPostings?: any) => {
    setUserProfile(profile);
    setOnboardingStep("completed");
    setCurrentItems(userRole === "jobSeeker" ? sampleJobs : sampleCandidates);
  };

  const handleBackToRoleSelection = () => {
    setOnboardingStep("roleSelection");
    setUserRole(null);
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
    let filtered = [...allItems];

    // Search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) => {
        if (userRole === "jobSeeker") {
          const job = item as Job;
          return (
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          );
        } else {
          const candidate = item as Candidate;
          return (
            candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            candidate.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            candidate.skills.some((skill) =>
              skill.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          );
        }
      });
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((item) =>
        item.location.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // Remote filter
    if (filters.remote && userRole === "jobSeeker") {
      filtered = filtered.filter((item) => {
        const job = item as Job;
        return job.tags.some((tag) => tag.toLowerCase().includes("remote"));
      });
    }

    // Job type filter
    if (filters.jobType.length > 0 && userRole === "jobSeeker") {
      filtered = filtered.filter((item) => {
        const job = item as Job;
        return filters.jobType.some((type) =>
          job.tags.some((tag) =>
            tag.toLowerCase().includes(type.toLowerCase()),
          ),
        );
      });
    }

    // Skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter((item) => {
        if (userRole === "jobSeeker") {
          const job = item as Job;
          return filters.skills.some((skill) =>
            job.tags.some((tag) =>
              tag.toLowerCase().includes(skill.toLowerCase()),
            ),
          );
        } else {
          const candidate = item as Candidate;
          return filters.skills.some((skill) =>
            candidate.skills.some((candidateSkill) =>
              candidateSkill.toLowerCase().includes(skill.toLowerCase()),
            ),
          );
        }
      });
    }

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
    setCurrentItems([...allItems]);
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleJobTypeToggle = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      jobType: prev.jobType.includes(type)
        ? prev.jobType.filter((t) => t !== type)
        : [...prev.jobType, type],
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // Show onboarding flow if user hasn't completed it
  if (onboardingStep === "roleSelection") {
    return <RoleSelection onRoleSelect={handleRoleSelection} />;
  }

  if (onboardingStep === "onboarding" && userRole) {
    if (userRole === "jobSeeker") {
      return (
        <JobSeekerOnboarding
          onComplete={handleOnboardingComplete}
          onBack={handleBackToRoleSelection}
        />
      );
    } else {
      return (
        <RecruiterOnboarding
          onComplete={handleOnboardingComplete}
          onBack={handleBackToRoleSelection}
        />
      );
    }
  }

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
            <Badge
              variant="outline"
              className="hidden md:inline-flex lg:text-sm"
            >
              {userRole === "jobSeeker" ? "Job Seeker" : "Recruiter"}
            </Badge>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={`Search ${userRole === "jobSeeker" ? "jobs" : "candidates"}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 bg-white/50 border-gray-200 focus:bg-white transition-all duration-200"
                onKeyPress={(e) => e.key === "Enter" && applyFilters()}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <SlidersHorizontal className="h-5 w-5" />
                  {(filters.location ||
                    filters.remote ||
                    filters.jobType.length > 0 ||
                    filters.skills.length > 0 ||
                    searchQuery) && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full"></span>
                  )}
                </Button>
              </SheetTrigger>
            </Sheet>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Sheet open={showProfileSheet} onOpenChange={setShowProfileSheet}>
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
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate("/profile");
                        setShowProfileSheet(false);
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={toggleUserRole}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Switch to{" "}
                      {userRole === "jobSeeker" ? "Recruiter" : "Job Seeker"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/signin")}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Search Bar - Mobile */}
      <div className="lg:hidden px-4 py-3 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${userRole === "jobSeeker" ? "jobs" : "candidates"}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-10"
            onKeyPress={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-6 py-6 lg:py-8 flex flex-col items-center min-h-[calc(100vh-140px)]">
        <div className="w-full max-w-md lg:max-w-2xl xl:max-w-4xl">
          {/* Role-specific heading */}
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold mb-2 lg:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {userRole === "jobSeeker"
                ? "Find Your Next Opportunity"
                : "Discover Talented Candidates"}
            </h2>
            <p className="text-muted-foreground text-lg lg:text-xl">
              {userRole === "jobSeeker"
                ? "Swipe right on jobs you're interested in"
                : "Swipe right on candidates you'd like to interview"}
            </p>

            {/* Filter Summary */}
            {(filters.location ||
              filters.remote ||
              filters.jobType.length > 0 ||
              filters.skills.length > 0 ||
              searchQuery) && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {searchQuery && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Search: {searchQuery}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSearchQuery("")}
                    />
                  </Badge>
                )}
                {filters.location && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <MapPin className="h-3 w-3" />
                    {filters.location}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange("location", "")}
                    />
                  </Badge>
                )}
                {filters.remote && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    Remote
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange("remote", false)}
                    />
                  </Badge>
                )}
                {filters.jobType.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {type}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleJobTypeToggle(type)}
                    />
                  </Badge>
                ))}
                {filters.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleSkillToggle(skill)}
                    />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Swipe Cards Stack */}
          <div className="relative h-[600px] lg:h-[700px] w-full max-w-md lg:max-w-lg mx-auto">
            {currentItems.length > 0 ? (
              <>
                {currentItems.slice(-3).map((item, index, array) => (
                  <SwipeCard
                    key={item.id}
                    item={item}
                    isTop={index === array.length - 1}
                    onSwipeLeft={() => handleSwipeLeft(item)}
                    onSwipeRight={() => handleSwipeRight(item)}
                    onSuperLike={() => handleSuperLike(item)}
                    userRole={userRole}
                  />
                ))}
              </>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-12">
                <div className="text-6xl lg:text-8xl mb-4 lg:mb-6">🎉</div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-4">
                  All caught up!
                </h3>
                <p className="text-gray-500 text-center mb-6 lg:mb-8 text-lg lg:text-xl">
                  {searchQuery ||
                  filters.location ||
                  filters.remote ||
                  filters.jobType.length > 0 ||
                  filters.skills.length > 0
                    ? `No ${userRole === "jobSeeker" ? "jobs" : "candidates"} match your current filters.`
                    : `You've viewed all available ${userRole === "jobSeeker" ? "jobs" : "candidates"}.`}
                </p>
                <div className="space-y-3">
                  {(searchQuery ||
                    filters.location ||
                    filters.remote ||
                    filters.jobType.length > 0 ||
                    filters.skills.length > 0) && (
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      size="lg"
                      className="lg:text-lg lg:px-8"
                    >
                      Clear Filters
                    </Button>
                  )}
                  <Button
                    onClick={() => setCurrentItems([...allItems])}
                    size="lg"
                    className="lg:text-lg lg:px-8"
                  >
                    Refresh Cards
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg border-t border-gray-200/50 lg:hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-blue-600"
            >
              {userRole === "jobSeeker" ? (
                <Briefcase className="h-5 w-5" />
              ) : (
                <Users className="h-5 w-5" />
              )}
              <span className="text-xs">
                {userRole === "jobSeeker" ? "Jobs" : "Candidates"}
              </span>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 relative"
              onClick={() => navigate("/chat")}
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Messages</span>
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 relative"
              onClick={() => setShowFilterSheet(true)}
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span className="text-xs">Filter</span>
              {(filters.location ||
                filters.remote ||
                filters.jobType.length > 0 ||
                filters.skills.length > 0 ||
                searchQuery) && (
                <span className="absolute top-0 right-2 h-2 w-2 bg-blue-500 rounded-full"></span>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Filter Sheet */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent className="w-full sm:max-w-md">
          <div className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>

            <Separator />

            {/* Search */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={`Search ${userRole === "jobSeeker" ? "jobs" : "candidates"}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Enter city or state"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {userRole === "jobSeeker" && (
              <>
                {/* Remote Work */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={filters.remote}
                    onCheckedChange={(checked) =>
                      handleFilterChange("remote", checked)
                    }
                  />
                  <Label htmlFor="remote" className="text-sm font-medium">
                    Remote work only
                  </Label>
                </div>

                {/* Job Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Job Type</Label>
                  <div className="space-y-2">
                    {[
                      "Full-time",
                      "Part-time",
                      "Contract",
                      "Freelance",
                      "Internship",
                    ].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={filters.jobType.includes(type)}
                          onCheckedChange={() => handleJobTypeToggle(type)}
                        />
                        <Label htmlFor={type} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Salary Range</Label>
                  <Select
                    value={filters.salaryRange}
                    onValueChange={(value) =>
                      handleFilterChange("salaryRange", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select salary range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50k">$0 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">
                        $50,000 - $100,000
                      </SelectItem>
                      <SelectItem value="100k-150k">
                        $100,000 - $150,000
                      </SelectItem>
                      <SelectItem value="150k+">$150,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Skills */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                {userRole === "jobSeeker"
                  ? "Required Skills"
                  : "Candidate Skills"}
              </Label>
              <div className="space-y-2">
                {[
                  "React",
                  "JavaScript",
                  "TypeScript",
                  "Node.js",
                  "Python",
                  "Java",
                  "AWS",
                  "Docker",
                  "MongoDB",
                  "PostgreSQL",
                ].map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={filters.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={skill} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Experience Level</Label>
              <Select
                value={filters.experience}
                onValueChange={(value) =>
                  handleFilterChange("experience", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">
                    Senior Level (6+ years)
                  </SelectItem>
                  <SelectItem value="lead">
                    Lead/Principal (8+ years)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 space-y-3">
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilterSheet(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Match Modal */}
      {showMatchModal && currentMatch && (
        <MatchModal
          isOpen={showMatchModal}
          match={currentMatch}
          userRole={userRole}
          onClose={handleCloseMatchModal}
          onMessage={() => {
            navigate("/chat");
            handleCloseMatchModal();
          }}
          onContinue={handleCloseMatchModal}
        />
      )}
    </div>
  );
}
