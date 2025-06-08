import React from "react";
import RoleSelection from "./RoleSelection";
import JobSeekerOnboarding from "./JobSeekerOnboarding";
import RecruiterOnboarding from "./RecruiterOnboarding";

export default function OnboardingStoryboard() {
  return (
    <div className="bg-white min-h-screen">
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Onboarding Flow Demo
        </h1>

        <div className="space-y-12">
          {/* Role Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Role Selection</h2>
            <div className="border rounded-lg overflow-hidden">
              <RoleSelection
                onRoleSelect={(role) => console.log("Selected role:", role)}
              />
            </div>
          </div>

          {/* Job Seeker Onboarding Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              2. Job Seeker Onboarding
            </h2>
            <div className="border rounded-lg overflow-hidden h-96">
              <div className="p-4 bg-gray-50 h-full flex items-center justify-center">
                <p className="text-muted-foreground">
                  Job Seeker Onboarding Flow (4 steps)
                </p>
              </div>
            </div>
          </div>

          {/* Recruiter Onboarding Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              3. Recruiter Onboarding
            </h2>
            <div className="border rounded-lg overflow-hidden h-96">
              <div className="p-4 bg-gray-50 h-full flex items-center justify-center">
                <p className="text-muted-foreground">
                  Recruiter Onboarding Flow (4 steps)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
