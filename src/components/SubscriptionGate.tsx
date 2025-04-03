
import React from 'react';
import { useSubscription } from '@/context/SubscriptionContext';
import Paywall from './Paywall';

type SubscriptionGateProps = {
  children: React.ReactNode;
  requiresSubscription?: boolean;
};

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({ 
  children, 
  requiresSubscription = true 
}) => {
  const { isPaying } = useSubscription();

  if (requiresSubscription && !isPaying) {
    return <Paywall />;
  }

  return <>{children}</>;
};

export default SubscriptionGate;
