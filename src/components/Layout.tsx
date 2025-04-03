
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, FileText, Home, List, Mail, Mic, Share2, BookOpen, Send, Settings } from 'lucide-react';
import DevModeToggle from './DevModeToggle';
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
    <div className="min-h-screen flex flex-col">
      <DevModeToggle />
      <Navbar location={location} />
      
      <div className="flex flex-1 overflow-hidden">
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
        
        <main className="flex-1 p-6 dark:bg-gray-900 dark:text-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
