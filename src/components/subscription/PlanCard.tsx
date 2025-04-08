
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

export type PlanType = {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
  popular?: boolean;
  cta: string;
};

interface PlanCardProps {
  plan: PlanType;
  selectedPlan: string | null;
  onSelect: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, selectedPlan, onSelect }) => {
  return (
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
          onClick={() => onSelect(plan.id)}
        >
          {selectedPlan === plan.id ? "Selected" : plan.cta}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
