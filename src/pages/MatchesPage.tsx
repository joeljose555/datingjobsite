import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const appliedJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=techinn",
    status: "Applied",
    date: "2023-10-27",
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Creative Solutions",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=creative",
    status: "Interviewing",
    date: "2023-10-25",
  },
];

const recruiterMatches = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Full Stack Engineer",
    company: "Data Systems",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    date: "2023-10-26",
  },
  {
    id: "2",
    name: "Samantha Lee",
    title: "Product Manager",
    company: "Innovate Co.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=samantha",
    date: "2023-10-24",
  },
];

const MatchesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-blue-600">Matches</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Recruiter Matches</h2>
            <Card>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {recruiterMatches.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-4 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={match.avatar} />
                          <AvatarFallback>
                            {match.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{match.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {match.title} at {match.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm" onClick={() => navigate('/chat')}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Matched on {match.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>
            <Card>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {appliedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={job.logo} />
                          <AvatarFallback>
                            {job.company.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{job.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {job.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            job.status === "Interviewing"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {job.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          Applied on {job.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MatchesPage; 