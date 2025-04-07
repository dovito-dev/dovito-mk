
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SubscriptionGate from '@/components/SubscriptionGate';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutList, LayoutGrid } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useBrandBriefs, BrandBrief } from '@/hooks/useBrandBriefs';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();
  
  // Use our new hook to fetch briefs
  const { data: briefs = [], isLoading } = useBrandBriefs();

  // Calculate quota information
  const getQuotaDisplay = () => {
    if (!profile) return null;
    
    // If monthly_quota is null or undefined, user has unlimited quota
    if (profile.monthly_quota === null || profile.monthly_quota === undefined) {
      return null;
    }
    
    const used = profile.used_quota || 0;
    const total = profile.monthly_quota;
    const planName = profile.plan_name || 'Free';
    
    return {
      used,
      total,
      planName
    };
  };

  const quotaInfo = getQuotaDisplay();
  
  return (
    <SubscriptionGate allowFreeTier={true}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">My Brand Briefs</h1>
          <p className="text-muted-foreground">
            Manage and view all your created brand briefs in one place
          </p>
          
          {quotaInfo && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-md inline-block">
              <p>
                You have used {quotaInfo.used} of {quotaInfo.total} 
                {quotaInfo.planName === 'Free' ? ' free' : ''} briefs
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">View Options</h2>
          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}
            className="border rounded-md dark:border-gray-700"
          >
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your brand briefs...</p>
          </div>
        ) : briefs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No briefs created yet</p>
            <Link to="/create">
              <Button className="bg-primary text-white">
                Create your first brief
              </Button>
            </Link>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "grid gap-4"}>
            {briefs.map((brief) => (
              <Link to={`/brief/${brief.id}`} key={brief.id}>
                <Card className={`hover:shadow-md transition-shadow duration-200 ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
                  <CardHeader className={viewMode === 'list' ? 'flex-1' : ''}>
                    <CardTitle>{brief.brief_title}</CardTitle>
                    <CardDescription>
                      Created on {brief.created_at ? format(new Date(brief.created_at), 'MMMM d, yyyy') : 'Unknown date'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={viewMode === 'list' ? 'flex items-center' : ''}>
                    <p className="text-sm text-muted-foreground">
                      Brand: {brief.brand_name} | {brief.industry} | {brief.brief_type}
                    </p>
                    {brief.generated_brief && (
                      <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                        Brief generated ✓
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
        
        {briefs.length > 0 && (
          <div className="mt-6 text-center">
            <Link to="/create">
              <Button className="bg-primary text-white">
                Create Another Brief
              </Button>
            </Link>
          </div>
        )}
      </div>
    </SubscriptionGate>
  );
};

export default Dashboard;
