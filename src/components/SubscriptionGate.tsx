
import React from 'react';
import { useSubscription } from '@/context/SubscriptionContext';
import { useUserUsageStore } from '@/store/userUsageStore';
import Paywall from './Paywall';
import FreemiumPaywall from './FreemiumPaywall';

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

  if (!requiresSubscription || isPaying) {
    return <>{children}</>;
  }

  if (allowFreeTier && isFreeUsageAvailable()) {
    return <>{children}</>;
  }

  return allowFreeTier ? <FreemiumPaywall /> : <Paywall />;
};

export default SubscriptionGate;
