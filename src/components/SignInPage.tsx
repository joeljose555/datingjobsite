import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [step, setStep] = useState<"method" | "phone" | "otp">("method");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const handlePhoneSubmit = async () => {
    if (phoneNumber) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep("otp");
      setCountdown(60);
      setIsLoading(false);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/");
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    // In a real app, this would handle OAuth flow
    console.log(`Login with ${provider}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate("/");
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCountdown(60);
    setIsLoading(false);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 lg:p-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md lg:max-w-lg xl:max-w-xl relative z-10"
      >
        <div className="text-center mb-8 lg:mb-12">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 lg:mb-6"
          >
            <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 lg:mb-4">JobMatchr</h1>
          <p className="text-muted-foreground text-lg lg:text-xl">
            Welcome back! Sign in to continue
          </p>
        </div>

        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/80 lg:p-2">
          <CardHeader className="text-center pb-4 lg:pb-6">
            <CardTitle className="text-xl lg:text-2xl font-semibold">
              {step === "method" && "Choose Sign In Method"}
              {step === "phone" && "Enter Phone Number"}
              {step === "otp" && "Verify OTP"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6 lg:px-8">
            {step === "method" && (
              <>
                <Button
                  onClick={() => setStep("phone")}
                  className="w-full h-12 lg:h-14 text-left justify-start hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                  variant="outline"
                >
                  <Phone className="mr-3 h-5 w-5 text-blue-600" />
                  <span className="flex-1 text-left lg:text-lg">Continue with Phone Number</span>
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="space-y-3 lg:space-y-4">
                  <Button
                    onClick={() => handleSocialLogin("Google")}
                    variant="outline"
                    className="w-full h-12 lg:h-14 justify-start hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                    disabled={isLoading}
                  >
                    <Mail className="mr-3 h-5 w-5 text-red-500" />
                    <span className="lg:text-lg">Continue with Google</span>
                    {isLoading && <div className="ml-auto w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />}
                  </Button>

                  <Button
                    onClick={() => handleSocialLogin("LinkedIn")}
                    variant="outline"
                    className="w-full h-12 lg:h-14 justify-start hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                    disabled={isLoading}
                  >
                    <Linkedin className="mr-3 h-5 w-5 text-blue-600" />
                    <span className="lg:text-lg">Continue with LinkedIn</span>
                    {isLoading && <div className="ml-auto w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
                  </Button>

                  <Button
                    onClick={() => handleSocialLogin("GitHub")}
                    variant="outline"
                    className="w-full h-12 lg:h-14 justify-start hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    disabled={isLoading}
                  >
                    <Github className="mr-3 h-5 w-5" />
                    <span className="lg:text-lg">Continue with GitHub</span>
                    {isLoading && <div className="ml-auto w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />}
                  </Button>
                </div>
              </>
            )}

            {step === "phone" && (
              <>
                <div className="space-y-2 lg:space-y-3">
                  <Label htmlFor="phone" className="text-sm lg:text-base font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12 lg:h-14 text-lg lg:text-xl focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    autoFocus
                  />
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    We'll send you a verification code via SMS
                  </p>
                </div>
                <Button
                  onClick={handlePhoneSubmit}
                  className="w-full h-12 lg:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  disabled={!phoneNumber || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </div>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setStep("method")}
                  variant="ghost"
                  className="w-full lg:text-base"
                  disabled={isLoading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in options
                </Button>
              </>
            )}

            {step === "otp" && (
              <>
                <div className="text-center mb-4 lg:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full mb-3 lg:mb-4">
                    <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
                  </div>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    We've sent a verification code to
                  </p>
                  <p className="font-medium text-lg lg:text-xl">{phoneNumber}</p>
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <Label htmlFor="otp" className="text-sm lg:text-base font-medium">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="h-12 lg:h-14 text-center text-lg lg:text-2xl tracking-widest font-mono focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    maxLength={6}
                    autoFocus
                  />
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-1 rounded-full transition-all duration-200 ${
                            i < otp.length ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleOtpSubmit}
                  className="w-full h-12 lg:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  disabled={otp.length !== 6 || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Verifying...
                    </div>
                  ) : (
                    'Verify & Sign In'
                  )}
                </Button>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => setStep("phone")}
                    variant="ghost"
                    size="sm"
                    className="lg:text-base"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Change number
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="lg:text-base"
                    onClick={handleResendOtp}
                    disabled={countdown > 0 || isLoading}
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6 lg:mt-8">
          <p className="text-sm lg:text-base text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-purple-600 hover:underline font-medium transition-colors duration-200"
            >
              Sign up here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage;