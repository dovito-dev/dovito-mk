
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';

type SubscriptionContextType = {
  isPaying: boolean;
  setIsPaying: (value: boolean) => void;
  plan: string | null;
};

const SubscriptionContext = createContext<SubscriptionContextType>({
  isPaying: false,
  setIsPaying: () => {},
  plan: null,
});

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPaying, setIsPaying] = useState(false);
  const { data: profile } = useProfile();
  const [plan, setPlan] = useState<string | null>(null);

  // Update plan and isPaying based on profile data
  useEffect(() => {
    if (profile) {
      const profilePlan = profile.plan_name || 'Free';
      setPlan(profilePlan);
      setIsPaying(profilePlan !== 'Free');
    }
  }, [profile]);

  return (
    <SubscriptionContext.Provider value={{ isPaying, setIsPaying, plan }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
