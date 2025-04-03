
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LockKeyhole, AlertCircle } from 'lucide-react';
import { useUserUsageStore } from '@/store/userUsageStore';

const FreemiumPaywall: React.FC = () => {
  const { briefsCreated, FREE_BRIEF_LIMIT } = useUserUsageStore();

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-6">
        <AlertCircle className="h-8 w-8 text-white" />
      </div>
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Free Limit Reached</CardTitle>
          <CardDescription className="text-center">
            You've used {briefsCreated} of your {FREE_BRIEF_LIMIT} free brand briefs
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Upgrade to our premium plan to create unlimited brand briefs and access all features.
          </p>
          <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md mb-4">
            <LockKeyhole className="h-5 w-5" />
            <span>Upgrade now to continue creating brand briefs</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/get-started">
            <Button className="gradient-bg">View Plans</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FreemiumPaywall;
