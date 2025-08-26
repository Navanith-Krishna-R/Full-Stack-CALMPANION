'use client';

import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function Jobs() {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const jobs = [
    {
      id: 1,
      title: "Clinical Psychologist",
      description: "Provide counseling and therapy to individuals dealing with stress, anxiety, and other mental health challenges.",
      location: "Remote / On-site",
      type: "Full-time"
    },
    {
      id: 2,
      title: "Mental Health Support Volunteer",
      description: "Offer peer support and help create safe spaces for people to connect and share their experiences.",
      location: "Remote",
      type: "Part-time"
    },
    {
      id: 3,
      title: "Research Assistant – AI in Mental Health",
      description: "Collaborate with our AI/ML team to analyze data and develop tools that improve access to mental health care.",
      location: "Hybrid",
      type: "Internship"
    },
  ];

  const handleOpen = (job: any) => {
    setSelectedJob(job);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Careers in <span className="text-orange-500">Mental Health</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of our mission to make mental health care accessible and impactful.  
              Explore opportunities where your skills can truly make a difference.
            </p>
          </div>
        </section>

        {/* Jobs Listing */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <Card key={job.id} className="p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-6 h-6 text-orange-500" />
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <p className="text-sm text-gray-500 mb-2">📍 {job.location}</p>
                  <p className="text-sm text-gray-500 mb-4">🕒 {job.type}</p>
                  <Button onClick={() => handleOpen(job)} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Job Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">{selectedJob?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedJob?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p><strong>📍 Location:</strong> {selectedJob?.location}</p>
            <p><strong>🕒 Type:</strong> {selectedJob?.type}</p>
          </div>
          <DialogFooter className="flex gap-3">
            <Button onClick={() => setOpen(false)} variant="outline">Close</Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Apply Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
