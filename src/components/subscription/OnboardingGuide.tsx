
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type OnboardingStep = {
  title: string;
  description: string;
  action: string;
  buttonText: string;
};

const OnboardingGuide: React.FC = () => {
  const steps: OnboardingStep[] = [
    {
      title: "Create your first brand brief",
      description: "Start by defining your brand's voice, values, and target audience.",
      action: "/brand-briefs",
      buttonText: "Create Brief"
    },
    {
      title: "Draft your first email campaign",
      description: "Craft compelling email copy that converts readers into customers.",
      action: "/email-copywriter",
      buttonText: "Write Email"
    },
    {
      title: "Define your agent's voice",
      description: "Create a consistent voice for all your customer communications.",
      action: "/agent-voice",
      buttonText: "Define Voice"
    },
    {
      title: "Create social media content",
      description: "Generate engaging content for multiple social platforms.",
      action: "/social-media",
      buttonText: "Create Content"
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Welcome to Your AI Marketing Suite</h1>
        <p className="text-muted-foreground">Get started with these simple steps</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
              <Button asChild>
                <a href={step.action}>{step.buttonText}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold mb-3">Need Help?</h2>
        <p className="mb-4">Check our documentation or contact support if you have any questions.</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline">View Documentation</Button>
          <Button variant="outline">Contact Support</Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingGuide;
