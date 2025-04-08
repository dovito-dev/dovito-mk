
import React from 'react';
import UserStats from './UserStats';
import ContentBrowser from './ContentBrowser';
import QuickActions from './QuickActions';

interface DashboardViewProps {
  user: any;
  profile: any;
  briefs: any[];
  isLoading: boolean;
}

const DashboardView: React.FC<DashboardViewProps> = ({ user, profile, briefs, isLoading }) => {
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
      <ContentBrowser briefs={briefs} isLoading={isLoading} />
      <QuickActions />
    </div>
  );
};

export default DashboardView;
