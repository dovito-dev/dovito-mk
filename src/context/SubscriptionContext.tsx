
import React, { createContext, useContext, useState, ReactNode } from 'react';

type SubscriptionContextType = {
  isPaying: boolean;
  setIsPaying: (value: boolean) => void;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [isPaying, setIsPaying] = useState(false);

  return (
    <SubscriptionContext.Provider value={{ isPaying, setIsPaying }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
