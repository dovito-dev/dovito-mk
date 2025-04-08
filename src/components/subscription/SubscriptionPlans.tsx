
import React from 'react';
import { Button } from '@/components/ui/button';
import PlanCard, { PlanType } from './PlanCard';

interface SubscriptionPlansProps {
  selectedPlan: string | null;
  setSelectedPlan: (plan: string | null) => void;
  user: any;
  onContinue: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  selectedPlan, 
  setSelectedPlan, 
  user, 
  onContinue 
}) => {
  const plans: PlanType[] = [
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Choose Your Plan</h1>
        <p className="text-muted-foreground">Select the plan that suits your marketing needs</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {plans.map((plan) => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            selectedPlan={selectedPlan} 
            onSelect={(planId) => setSelectedPlan(planId)}
          />
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button 
          size="lg" 
          className={selectedPlan === 'free' ? 'bg-green-600 hover:bg-green-700 text-white' : 'gradient-bg'}
          disabled={!selectedPlan}
          onClick={onContinue}
        >
          {selectedPlan === 'free' ? 'Start for Free' : 'Continue to Payment'}
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          {selectedPlan === 'free' 
            ? 'No credit card required. Get started right away.' 
            : "You'll be redirected to our secure payment processor."}
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
