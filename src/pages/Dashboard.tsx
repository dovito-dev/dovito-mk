import React from 'react';
import SubscriptionGate from '@/components/SubscriptionGate';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const Dashboard = () => {
  return (
    <SubscriptionGate>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">My Brand Briefs</h1>
          <p className="text-muted-foreground">
            Manage and view all your created brand briefs in one place
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Brief Title</CardTitle>
              <CardDescription>Created on January 1, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Brief description or a short summary of the brief. This could
                include the brand's mission, vision, and values.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Brief Title</CardTitle>
              <CardDescription>Created on January 1, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Brief description or a short summary of the brief. This could
                include the brand's mission, vision, and values.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Brief Title</CardTitle>
              <CardDescription>Created on January 1, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Brief description or a short summary of the brief. This could
                include the brand's mission, vision, and values.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SubscriptionGate>
  );
};

export default Dashboard;
