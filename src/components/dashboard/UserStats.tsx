
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface UserStatsProps {
  briefs: any[];
  profile: any;
}

const UserStats: React.FC<UserStatsProps> = ({ briefs, profile }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Brand Briefs</CardTitle>
          <CardDescription>Total created briefs</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{briefs.length}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Usage</CardTitle>
          <CardDescription>Monthly quota</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {profile?.used_quota || 0}/{profile?.monthly_quota || 'Unlimited'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Subscription</CardTitle>
          <CardDescription>Current plan</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold gradient-text">
            {profile?.plan_name || 'Free'}
          </p>
        </CardContent>
        <CardFooter>
          {(profile?.plan_name === 'Free' || !profile?.plan_name) && (
            <Link to="/get-started">
              <Button size="sm" variant="outline">Upgrade Plan</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserStats;
