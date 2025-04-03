
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, FileText, Home, List, Mail, Mic, Share2, BookOpen, Send, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SidebarToggle from './SidebarToggle';
import Navbar from './Navbar';
import SidebarMenu from './SidebarMenu';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isBrandBriefsOpen, setBrandBriefsOpen] = React.useState(
    location.pathname.startsWith('/brand-briefs') || 
    location.pathname === '/create' || 
    location.pathname === '/dashboard' ||
    location.pathname.startsWith('/brief/')
  );
  
  const [isEmailsOpen, setEmailsOpen] = React.useState(
    location.pathname === '/email-copywriter' || 
    location.pathname === '/generated-emails' || 
    location.pathname.startsWith('/email/')
  );

  // Start with the sidebar collapsed by default
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  
  const isBrandBriefsActive = 
    location.pathname.startsWith('/brand-briefs') || 
    location.pathname === '/create' || 
    location.pathname === '/dashboard' ||
    location.pathname.startsWith('/brief/');
    
  const isEmailsActive = 
    location.pathname === '/email-copywriter' || 
    location.pathname === '/generated-emails' || 
    location.pathname.startsWith('/email/');

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-brand-lightPurple/50">
      <div className="flex flex-col h-screen">
        {/* Fixed Navbar at the top */}
        <div className="sticky top-0 z-40 w-full">
          <Navbar location={location} />
        </div>
        
        {/* Content area below navbar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Fixed Sidebar */}
          <SidebarMenu 
            location={location}
            sidebarCollapsed={sidebarCollapsed}
            toggleSidebar={toggleSidebar}
            isBrandBriefsOpen={isBrandBriefsOpen}
            setBrandBriefsOpen={setBrandBriefsOpen}
            isEmailsOpen={isEmailsOpen}
            setEmailsOpen={setEmailsOpen}
            isBrandBriefsActive={isBrandBriefsActive}
            isEmailsActive={isEmailsActive}
          />
          
          {/* Scrollable main content */}
          <main className={`flex-1 overflow-y-auto ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} transition-all duration-300 p-6 dark:bg-gray-900 dark:text-gray-100`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
