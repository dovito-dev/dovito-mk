
import React from 'react';
import UserStats from './UserStats';
import ContentBrowser from './ContentBrowser';
import QuickActions from './QuickActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Mail, Mic, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BrandBrief } from '@/hooks/useBrandBriefs';

interface DashboardViewProps {
  user: any;
  profile: any;
  briefs: BrandBrief[];
  isLoading: boolean;
}

const DashboardView: React.FC<DashboardViewProps> = ({ user, profile, briefs, isLoading }) => {
  // Find the most recent brief
  const latestBrief = briefs.length > 0 ? briefs[0] : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {profile?.full_name || user.email?.split('@')[0] || 'User'}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your content creation activities
        </p>
      </div>

      <UserStats briefs={briefs} profile={profile} />
      
      {latestBrief && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Latest Brief</h2>
          <Card>
            <CardHeader>
              <CardTitle>{latestBrief.company_name || latestBrief.brief_title}</CardTitle>
              <CardDescription>Brief: {latestBrief.brief_title}</CardDescription>
            </CardHeader>
            <CardContent>
              {latestBrief.generated_brief ? (
                <div className="prose dark:prose-invert max-h-40 overflow-hidden">
                  <ReactMarkdown>{latestBrief.generated_brief.substring(0, 300) + '...'}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-muted-foreground italic">No content available yet</p>
              )}
              <div className="mt-4">
                <Link to={`/brief/${latestBrief.id}`}>
                  <Button variant="outline">View Full Brief</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <ContentBrowser briefs={briefs} isLoading={isLoading} />
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <CardTitle className="text-lg">Email Copywriter</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate persuasive email copy tailored to your brand voice and audience.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Mic className="h-5 w-5 mr-2 text-primary" />
                <CardTitle className="text-lg">Agent Voice</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create consistent voice profiles for your customer service agents.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Share2 className="h-5 w-5 mr-2 text-primary" />
                <CardTitle className="text-lg">Social Media</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate engaging social media content for multiple platforms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <QuickActions />
    </div>
  );
};

export default DashboardView;
