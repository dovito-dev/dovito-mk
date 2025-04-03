
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';
import { useSubscription } from '@/context/SubscriptionContext';

const DevModeToggle: React.FC = () => {
  const { isPaying, setIsPaying } = useSubscription();

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="font-medium text-yellow-800">Developer Mode</p>
            <p className="text-sm text-yellow-700 hidden sm:block">
              This toggle will be removed in production
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch 
            id="subscription-mode" 
            checked={isPaying}
            onCheckedChange={setIsPaying}
          />
          <Label htmlFor="subscription-mode" className="font-medium">
            {isPaying ? "Paying Member" : "Free User"}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default DevModeToggle;
