
import React, { useState } from 'react';
import { useSubscription } from '@/context/SubscriptionContext';
import { useAuth } from '@/context/AuthContext';
import OnboardingGuide from '@/components/subscription/OnboardingGuide';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';

const GetStarted: React.FC = () => {
  const { isPaying } = useSubscription();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
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
    <div className="container mx-auto px-4 py-6">
      {isPaying ? (
        <OnboardingGuide />
      ) : (
        <SubscriptionPlans 
          selectedPlan={selectedPlan} 
          setSelectedPlan={setSelectedPlan} 
          user={user}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default GetStarted;
