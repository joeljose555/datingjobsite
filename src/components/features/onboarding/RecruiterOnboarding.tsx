import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Plus, X, ArrowRight, ArrowLeft, Building } from "lucide-react";
import { RecruiterProfile, JobPosting } from "@/types/User";

interface RecruiterOnboardingProps {
  onComplete: (
    profile: Partial<RecruiterProfile>,
    jobPostings: Partial<JobPosting>[],
  ) => void;
  onBack?: () => void;
}

const RecruiterOnboarding: React.FC<RecruiterOnboardingProps> = ({
  onComplete,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<RecruiterProfile>>({
    companyName: "",
    companyDescription: "",
    industry: "",
    companySize: "",
    website: "",
  });
  const [jobPostings, setJobPostings] = useState<Partial<JobPosting>[]>([]);
  const [currentJob, setCurrentJob] = useState<Partial<JobPosting>>({
    title: "",
    description: "",
    requirements: [],
    location: "",
    jobType: "full-time",
    remoteOption: "onsite",
    tags: [],
  });
  const [newRequirement, setNewRequirement] = useState("");
  const [newTag, setNewTag] = useState("");

  const steps = [
    "Company Profile",
    "Company Details",
    "Create Job Posting",
    "Job Requirements",
  ];

  const handleAddRequirement = () => {
    if (
      newRequirement.trim() &&
      !currentJob.requirements?.includes(newRequirement.trim())
    ) {
      setCurrentJob({
        ...currentJob,
        requirements: [
          ...(currentJob.requirements || []),
          newRequirement.trim(),
        ],
      });
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (reqToRemove: string) => {
    setCurrentJob({
      ...currentJob,
      requirements:
        currentJob.requirements?.filter((req) => req !== reqToRemove) || [],
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !currentJob.tags?.includes(newTag.trim())) {
      setCurrentJob({
        ...currentJob,
        tags: [...(currentJob.tags || []), newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCurrentJob({
      ...currentJob,
      tags: currentJob.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Add current job to job postings if it's valid
      const finalJobPostings =
        currentJob.title && currentJob.description
          ? [...jobPostings, currentJob]
          : jobPostings;
      onComplete(profile, finalJobPostings);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return profile.companyName && profile.companyDescription;
      case 1:
        return profile.industry && profile.companySize;
      case 2:
        return (
          currentJob.title && currentJob.description && currentJob.location
        );
      case 3:
        return currentJob.requirements && currentJob.requirements.length > 0;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Building className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Company Profile</h2>
              <p className="text-muted-foreground">
                Tell candidates about your company
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name *</Label>
                <Input
                  id="company-name"
                  value={profile.companyName}
                  onChange={(e) =>
                    setProfile({ ...profile, companyName: e.target.value })
                  }
                  placeholder="e.g., Tech Innovations Inc."
                />
              </div>
              <div>
                <Label htmlFor="company-description">
                  Company Description *
                </Label>
                <Textarea
                  id="company-description"
                  value={profile.companyDescription}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      companyDescription: e.target.value,
                    })
                  }
                  placeholder="Describe your company, mission, and culture..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="website">Company Website</Label>
                <Input
                  id="website"
                  value={profile.website}
                  onChange={(e) =>
                    setProfile({ ...profile, website: e.target.value })
                  }
                  placeholder="https://www.yourcompany.com"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Company Details</h2>
              <p className="text-muted-foreground">
                Help candidates understand your company better
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Industry *</Label>
                <Select
                  value={profile.industry}
                  onValueChange={(value) =>
                    setProfile({ ...profile, industry: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="media">Media & Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Company Size *</Label>
                <Select
                  value={profile.companySize}
                  onValueChange={(value) =>
                    setProfile({ ...profile, companySize: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Create Job Posting</h2>
              <p className="text-muted-foreground">
                Create your first job posting to attract candidates
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="job-title">Job Title *</Label>
                <Input
                  id="job-title"
                  value={currentJob.title}
                  onChange={(e) =>
                    setCurrentJob({ ...currentJob, title: e.target.value })
                  }
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              <div>
                <Label htmlFor="job-description">Job Description *</Label>
                <Textarea
                  id="job-description"
                  value={currentJob.description}
                  onChange={(e) =>
                    setCurrentJob({
                      ...currentJob,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Job Type</Label>
                  <Select
                    value={currentJob.jobType}
                    onValueChange={(value: any) =>
                      setCurrentJob({ ...currentJob, jobType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Work Arrangement</Label>
                  <Select
                    value={currentJob.remoteOption}
                    onValueChange={(value: any) =>
                      setCurrentJob({ ...currentJob, remoteOption: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="job-location">Location *</Label>
                <Input
                  id="job-location"
                  value={currentJob.location}
                  onChange={(e) =>
                    setCurrentJob({ ...currentJob, location: e.target.value })
                  }
                  placeholder="e.g., San Francisco, CA or Remote"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Job Requirements</h2>
              <p className="text-muted-foreground">
                Add requirements and tags to help candidates understand the role
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="requirements">Requirements *</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="requirements"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="e.g., 3+ years React experience"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddRequirement()
                    }
                  />
                  <Button onClick={handleAddRequirement} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {currentJob.requirements &&
                  currentJob.requirements.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {currentJob.requirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-muted p-2 rounded"
                        >
                          <span className="text-sm">{req}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRequirement(req)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
              <div>
                <Label htmlFor="tags">Skills/Tags</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g., React, TypeScript, Node.js"
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {currentJob.tags && currentJob.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {currentJob.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="pr-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Label>Salary Range (Optional)</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="min-salary" className="text-sm">
                      Minimum (USD)
                    </Label>
                    <Input
                      id="min-salary"
                      type="number"
                      value={currentJob.salaryRange?.min || ""}
                      onChange={(e) =>
                        setCurrentJob({
                          ...currentJob,
                          salaryRange: {
                            ...currentJob.salaryRange,
                            min: parseInt(e.target.value) || 0,
                            max: currentJob.salaryRange?.max || 0,
                          },
                        })
                      }
                      placeholder="80000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-salary" className="text-sm">
                      Maximum (USD)
                    </Label>
                    <Input
                      id="max-salary"
                      type="number"
                      value={currentJob.salaryRange?.max || ""}
                      onChange={(e) =>
                        setCurrentJob({
                          ...currentJob,
                          salaryRange: {
                            min: currentJob.salaryRange?.min || 0,
                            max: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      placeholder="120000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-blue-600">JobMatchr</CardTitle>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    index <= currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStep()}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {currentStep === 0 ? "Back" : "Previous"}
              </Button>
              <Button onClick={handleNext} disabled={!isStepValid()}>
                {currentStep === steps.length - 1 ? "Complete Setup" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RecruiterOnboarding;
