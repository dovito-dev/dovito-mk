import React from 'react';
import SubscriptionGate from '@/components/SubscriptionGate';

const CreateBrief = () => {
  return (
    <SubscriptionGate>
      <div>
        <h1>Create Brief</h1>
        <p>This is the create brief page.</p>
      </div>
    </SubscriptionGate>
  );
};

export default CreateBrief;
