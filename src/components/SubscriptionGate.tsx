
import React from 'react';
import { useSubscription } from '@/context/SubscriptionContext';
import { useUserUsageStore } from '@/store/userUsageStore';
import Paywall from './Paywall';
import FreemiumPaywall from './FreemiumPaywall';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';

type SubscriptionGateProps = {
  children: React.ReactNode;
  requiresSubscription?: boolean;
  allowFreeTier?: boolean;
};

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({ 
  children, 
  requiresSubscription = true,
  allowFreeTier = false
}) => {
  const { isPaying } = useSubscription();
  const { isFreeUsageAvailable } = useUserUsageStore();
  const { user } = useAuth();
  const { data: profile } = useProfile();

  // Check if user has a paid subscription in Supabase
  const hasPaidPlan = profile?.plan_name && profile.plan_name !== 'Free';
  
  // Check if user has remaining quota in Supabase
  const hasRemainingQuota = () => {
    if (!profile) return isFreeUsageAvailable();
    
    // If monthly_quota is null or undefined, user has unlimited quota
    if (profile.monthly_quota === null || profile.monthly_quota === undefined) {
      return true;
    }
    
    const used = profile.used_quota || 0;
    return used < profile.monthly_quota;
  };

  if (!requiresSubscription || isPaying || hasPaidPlan) {
    return <>{children}</>;
  }

  if (allowFreeTier && (isFreeUsageAvailable() || hasRemainingQuota())) {
    return <>{children}</>;
  }

  return allowFreeTier ? <FreemiumPaywall /> : <Paywall />;
};

export default SubscriptionGate;
