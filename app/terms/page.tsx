'use client';

import React from 'react';
import { FileText, Shield, UserCheck, Lock, Globe, AlertCircle } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using <span className="text-orange-500">Calmpanion</span>.  
              By accessing or using our services, you agree to be bound by these terms.
            </p>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto space-y-12">

            {/* Acceptance of Terms */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
              </div>
              <p className="text-muted-foreground">
                By registering, accessing, or using Calmpanion, you agree to comply with these Terms and Conditions. 
                If you do not agree, you should discontinue use of our services immediately.
              </p>
            </div>

            {/* Use of Services */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">2. Use of Services</h2>
              </div>
              <p className="text-muted-foreground">
                Our services are designed to provide mental health support and resources. 
                They are not a replacement for professional medical advice, diagnosis, or treatment. 
                Always seek the advice of a qualified healthcare provider with any questions regarding a medical condition.
              </p>
            </div>

            {/* Privacy & Data */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">3. Privacy & Data Protection</h2>
              </div>
              <p className="text-muted-foreground">
                We respect your privacy and are committed to protecting your personal data. 
                Please refer to our Privacy Policy for details on how your information is collected, used, and safeguarded.
              </p>
            </div>

            {/* User Responsibilities */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">4. User Responsibilities</h2>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate and truthful information when registering or using services.</li>
                <li>Respect the rights and privacy of other users.</li>
                <li>Do not misuse or attempt to exploit the platform for harmful purposes.</li>
              </ul>
            </div>

            {/* International Use */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">5. International Use</h2>
              </div>
              <p className="text-muted-foreground">
                If you access Calmpanion from outside your country of residence, 
                you are responsible for complying with local laws and regulations.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-7 h-7 text-orange-500" />
                <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
              </div>
              <p className="text-muted-foreground">
                Calmpanion is not liable for any damages, losses, or consequences arising from 
                the use or inability to use our services. The platform is provided on an 
                “as-is” and “as-available” basis.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
