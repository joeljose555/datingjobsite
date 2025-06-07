export type UserRole = "jobSeeker" | "recruiter";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isOnboarded: boolean;
}

export interface JobSeekerProfile {
  userId: string;
  resume?: File;
  skills: string[];
  experience: string;
  location: string;
  jobPreferences: {
    jobTypes: string[];
    salaryRange: {
      min: number;
      max: number;
    };
    remotePreference: "remote" | "hybrid" | "onsite" | "any";
  };
}

export interface RecruiterProfile {
  userId: string;
  companyName: string;
  companyLogo?: string;
  companyDescription: string;
  industry: string;
  companySize: string;
  website?: string;
}

export interface JobPosting {
  id: string;
  recruiterId: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salaryRange?: {
    min: number;
    max: number;
  };
  jobType: "full-time" | "part-time" | "contract" | "internship";
  remoteOption: "remote" | "hybrid" | "onsite";
  tags: string[];
}
