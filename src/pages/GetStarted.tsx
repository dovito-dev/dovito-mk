
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { useSubscription } from '@/context/SubscriptionContext';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const GetStarted: React.FC = () => {
  const { isPaying } = useSubscription();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  return (
    <div className="container mx-auto px-4 py-6">
      {isPaying ? (
        <OnboardingGuide />
      ) : (
        <SubscriptionPortal selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} user={user} />
      )}
    </div>
  );
};

// Onboarding guide shown to paying subscribers
const OnboardingGuide: React.FC = () => {
  const steps = [
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

// Subscription portal for non-paying users
const SubscriptionPortal: React.FC<{
  selectedPlan: string | null;
  setSelectedPlan: (plan: string | null) => void;
  user: any;
}> = ({ selectedPlan, setSelectedPlan, user }) => {
  const plans = [
    {
      id: "free",
      name: "Free Trial",
      price: "$0",
      period: "month",
      features: [
        "3 Brand Briefs per month",
        "5 Email Templates",
        "Basic Agent Voice",
        "Limited Social Media Content",
        "Community Support"
      ],
      highlight: false,
      cta: "Start for Free"
    },
    {
      id: "all",
      name: "All Access",
      price: "$99",
      period: "month",
      features: [
        "Brand Brief Creation",
        "Email Copywriting",
        "Agent Voice Training",
        "Social Media Content Generation",
        "Priority Support",
        "Advanced Analytics"
      ],
      popular: true,
      highlight: true,
      cta: "Select Plan"
    },
    {
      id: "brand",
      name: "Brand Briefs",
      price: "$39",
      period: "month",
      features: [
        "Brand Brief Creation",
        "Brand Voice Definition",
        "Brand Style Guidelines",
        "Standard Support"
      ],
      highlight: false,
      cta: "Select Plan"
    },
    {
      id: "email",
      name: "Email Copywriter",
      price: "$39",
      period: "month",
      features: [
        "Email Campaign Creation",
        "Subject Line Generator",
        "A/B Testing Templates",
        "Standard Support"
      ],
      highlight: false,
      cta: "Select Plan"
    },
    {
      id: "social",
      name: "Social Media",
      price: "$39",
      period: "month",
      features: [
        "Multi-platform Content Generation",
        "Hashtag Recommendations",
        "Content Calendar",
        "Standard Support"
      ],
      highlight: false,
      cta: "Select Plan"
    }
  ];

  const handleContinue = () => {
    if (selectedPlan === 'free') {
      // Just navigate to dashboard for free plan
      window.location.href = user ? '/dashboard' : '/auth?redirect=/dashboard';
    } else {
      // Continue to payment for paid plans
      // This would be replaced with actual payment processing
      alert('Continuing to payment for ' + selectedPlan + ' plan');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Choose Your Plan</h1>
        <p className="text-muted-foreground">Select the plan that suits your marketing needs</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`transition-all ${
              selectedPlan === plan.id 
                ? "ring-2 ring-primary" 
                : "hover:shadow-md"
            } ${plan.popular ? "relative" : ""} ${plan.highlight ? "border-primary/30" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>Most Popular</span>
              </div>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-sm">/{plan.period}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button
                className={`w-full ${plan.id === 'free' ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                variant={selectedPlan === plan.id ? "default" : "outline"}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button 
          size="lg" 
          className={selectedPlan === 'free' ? 'bg-green-600 hover:bg-green-700 text-white' : 'gradient-bg'}
          disabled={!selectedPlan}
          onClick={handleContinue}
        >
          {selectedPlan === 'free' ? 'Start for Free' : 'Continue to Payment'}
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          {selectedPlan === 'free' 
            ? 'No credit card required. Get started right away.' 
            : 'You'll be redirected to our secure payment processor.'}
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
