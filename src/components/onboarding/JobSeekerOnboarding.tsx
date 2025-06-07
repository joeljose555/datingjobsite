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
import { Upload, Plus, X, ArrowRight, ArrowLeft } from "lucide-react";
import { JobSeekerProfile } from "@/types/User";

interface JobSeekerOnboardingProps {
  onComplete: (profile: Partial<JobSeekerProfile>) => void;
  onBack?: () => void;
}

const JobSeekerOnboarding: React.FC<JobSeekerOnboardingProps> = ({
  onComplete,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<JobSeekerProfile>>({
    skills: [],
    experience: "",
    location: "",
    jobPreferences: {
      jobTypes: [],
      salaryRange: { min: 50000, max: 150000 },
      remotePreference: "any",
    },
  });
  const [newSkill, setNewSkill] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const steps = [
    "Resume Upload",
    "Skills & Experience",
    "Job Preferences",
    "Location & Salary",
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills?.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...(profile.skills || []), newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills?.filter((skill) => skill !== skillToRemove) || [],
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setProfile({ ...profile, resume: file });
    }
  };

  const handleJobTypeToggle = (jobType: string) => {
    const currentTypes = profile.jobPreferences?.jobTypes || [];
    const updatedTypes = currentTypes.includes(jobType)
      ? currentTypes.filter((type) => type !== jobType)
      : [...currentTypes, jobType];

    setProfile({
      ...profile,
      jobPreferences: {
        ...profile.jobPreferences!,
        jobTypes: updatedTypes,
      },
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(profile);
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
        return true; // Resume is optional
      case 1:
        return (
          profile.skills && profile.skills.length > 0 && profile.experience
        );
      case 2:
        return (
          profile.jobPreferences?.jobTypes &&
          profile.jobPreferences.jobTypes.length > 0
        );
      case 3:
        return profile.location;
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
              <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
              <p className="text-muted-foreground">
                Help recruiters learn about your background (optional)
              </p>
            </div>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              {resumeFile ? (
                <div className="space-y-4">
                  <div className="text-green-600">
                    <Upload className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-medium">{resumeFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setResumeFile(null);
                      setProfile({ ...profile, resume: undefined });
                    }}
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium mb-2">Drop your resume here</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supports PDF, DOC, DOCX (max 10MB)
                    </p>
                    <label htmlFor="resume-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                      <input
                        id="resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Skills & Experience</h2>
              <p className="text-muted-foreground">
                Tell us about your skills and experience level
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="skills">Add Skills</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="skills"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g., React, JavaScript, Python"
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  />
                  <Button onClick={handleAddSkill} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {profile.skills && profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="pr-1">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Select
                  value={profile.experience}
                  onValueChange={(value) =>
                    setProfile({ ...profile, experience: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="4-5">4-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
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
              <h2 className="text-2xl font-bold mb-2">Job Preferences</h2>
              <p className="text-muted-foreground">
                What type of opportunities are you looking for?
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Job Types (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {["Full-time", "Part-time", "Contract", "Internship"].map(
                    (jobType) => (
                      <div
                        key={jobType}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={jobType}
                          checked={profile.jobPreferences?.jobTypes?.includes(
                            jobType.toLowerCase(),
                          )}
                          onCheckedChange={() =>
                            handleJobTypeToggle(jobType.toLowerCase())
                          }
                        />
                        <Label htmlFor={jobType}>{jobType}</Label>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div>
                <Label>Remote Work Preference</Label>
                <Select
                  value={profile.jobPreferences?.remotePreference}
                  onValueChange={(value: any) =>
                    setProfile({
                      ...profile,
                      jobPreferences: {
                        ...profile.jobPreferences!,
                        remotePreference: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote Only</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site Only</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Location & Salary</h2>
              <p className="text-muted-foreground">
                Help us find the right opportunities for you
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Preferred Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  placeholder="e.g., San Francisco, CA or Remote"
                />
              </div>
              <div>
                <Label>Salary Range (USD)</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="min-salary" className="text-sm">
                      Minimum
                    </Label>
                    <Input
                      id="min-salary"
                      type="number"
                      value={profile.jobPreferences?.salaryRange?.min}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          jobPreferences: {
                            ...profile.jobPreferences!,
                            salaryRange: {
                              ...profile.jobPreferences!.salaryRange,
                              min: parseInt(e.target.value) || 0,
                            },
                          },
                        })
                      }
                      placeholder="50000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-salary" className="text-sm">
                      Maximum
                    </Label>
                    <Input
                      id="max-salary"
                      type="number"
                      value={profile.jobPreferences?.salaryRange?.max}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          jobPreferences: {
                            ...profile.jobPreferences!,
                            salaryRange: {
                              ...profile.jobPreferences!.salaryRange,
                              max: parseInt(e.target.value) || 0,
                            },
                          },
                        })
                      }
                      placeholder="150000"
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
                {currentStep === steps.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default JobSeekerOnboarding;
