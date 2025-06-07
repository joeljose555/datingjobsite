import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building, ArrowRight } from "lucide-react";
import { UserRole } from "@/types/User";

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">JobMatchr</h1>
          <p className="text-xl text-muted-foreground">
            Find your perfect match in the job market
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Job Seeker Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            onClick={() => onRoleSelect("jobSeeker")}
          >
            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">
                  I'm Looking for a Job
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">
                  Discover exciting opportunities and connect with top
                  recruiters
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    Upload your resume and showcase your skills
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    Swipe through personalized job recommendations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    Connect directly with hiring managers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    Get matched with your dream job
                  </li>
                </ul>
                <Button className="w-full mt-6" size="lg">
                  Get Started as Job Seeker
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recruiter Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            onClick={() => onRoleSelect("recruiter")}
          >
            <Card className="h-full border-2 hover:border-green-500 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                  <Building className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="text-2xl">I'm Hiring Talent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">
                  Find the perfect candidates for your open positions
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                    Create your company profile and job postings
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                    Browse through qualified candidate profiles
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                    Connect with top talent instantly
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                    Build your dream team faster
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Get Started as Recruiter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button className="text-blue-600 hover:underline font-medium">
              Sign in here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;
