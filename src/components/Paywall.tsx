
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Paywall: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 h-full">
      <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-6">
        <Lock className="h-8 w-8 text-white" />
      </div>
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Premium Feature</CardTitle>
          <CardDescription className="text-center">
            This feature requires a subscription to access.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Upgrade your account to unlock all features and get the most out of our platform.
          </p>
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

export default Paywall;
