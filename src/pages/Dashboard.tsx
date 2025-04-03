
import React from 'react';
import { Link } from 'react-router-dom';
import SubscriptionGate from '@/components/SubscriptionGate';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useBriefStore, type Brief } from '@/store/briefStore';
import { format } from 'date-fns';

const Dashboard = () => {
  const { briefs } = useBriefStore();
  
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
          {briefs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No briefs created yet</p>
              <Link to="/create">
                <button className="bg-primary text-white px-4 py-2 rounded">
                  Create your first brief
                </button>
              </Link>
            </div>
          ) : (
            briefs.map((brief) => (
              <Link to={`/brief/${brief.id}`} key={brief.id}>
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle>{brief.title}</CardTitle>
                    <CardDescription>
                      Created on {format(new Date(brief.createdAt), 'MMMM d, yyyy')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Brand: {brief.brandName} | {brief.industry} | {brief.type}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </SubscriptionGate>
  );
};

export default Dashboard;
