import React, { useState } from "react";
import RoleSelection from "@/components/features/onboarding/RoleSelection";
import JobSeekerOnboarding from "@/components/features/onboarding/JobSeekerOnboarding";
import RecruiterOnboarding from "@/components/features/onboarding/RecruiterOnboarding";
import { useNavigate } from "react-router-dom";
import {
  UserRole,
  JobSeekerProfile,
  RecruiterProfile,
} from "@/types/User";

type OnboardingStep = "roleSelection" | "onboarding";

export default function LandingPage() {
  const navigate = useNavigate();
  const [onboardingStep, setOnboardingStep] =
    useState<OnboardingStep>("roleSelection");
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleRoleSelection = (role: UserRole) => {
    setUserRole(role);
    setOnboardingStep("onboarding");
  };

  const handleOnboardingComplete = (profile: Partial<JobSeekerProfile | RecruiterProfile>) => {
    // In a real app, you'd save the profile to a backend/global state
    console.log("Onboarding complete for:", profile);
    navigate("/home");
  };

  const handleBackToRoleSelection = () => {
    setOnboardingStep("roleSelection");
    setUserRole(null);
  };

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

  return <RoleSelection onRoleSelect={handleRoleSelection} />;
}
