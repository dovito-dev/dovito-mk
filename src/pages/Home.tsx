
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useBrandBriefs } from '@/hooks/useBrandBriefs';
import ToolsSection from '@/components/home/ToolsSection';
import DashboardView from '@/components/dashboard/DashboardView';

const Home = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: briefs = [], isLoading: loadingBriefs } = useBrandBriefs();
  
  // Show Dashboard if user is logged in, otherwise show Tools page
  return user ? (
    <DashboardView 
      user={user} 
      profile={profile} 
      briefs={briefs} 
      isLoading={loadingBriefs} 
    />
  ) : (
    <ToolsSection />
  );
};

export default Home;
