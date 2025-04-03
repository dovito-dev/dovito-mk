
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Home, List, Mail, Mic, Share2, BookOpen, Send, Settings } from 'lucide-react';
import SidebarToggle from './SidebarToggle';
import ThemeToggle from './ThemeToggle';
import NavItem from './NavItem';

type SidebarMenuProps = {
  location: {
    pathname: string;
  };
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isBrandBriefsOpen: boolean;
  setBrandBriefsOpen: (open: boolean) => void;
  isEmailsOpen: boolean;
  setEmailsOpen: (open: boolean) => void;
  isBrandBriefsActive: boolean;
  isEmailsActive: boolean;
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  location,
  sidebarCollapsed,
  toggleSidebar,
  isBrandBriefsOpen,
  setBrandBriefsOpen,
  isEmailsOpen,
  setEmailsOpen,
  isBrandBriefsActive,
  isEmailsActive
}) => {
  return (
    <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r bg-muted dark:bg-gray-800 dark:border-gray-700 p-4 hidden md:block flex-shrink-0`}>
      <div className="flex justify-end mb-2">
        <SidebarToggle collapsed={sidebarCollapsed} toggleCollapsed={toggleSidebar} />
      </div>
      <nav className="space-y-1 pt-4 flex flex-col h-full">
        <div className="flex-grow">
          <NavItem 
            to="/"
            icon={<Home className="h-5 w-5" />}
            label="Home"
            active={location.pathname === '/'}
            collapsed={sidebarCollapsed}
            toggleSidebar={sidebarCollapsed ? toggleSidebar : undefined}
          />
          
          {/* Brand Briefs with sub-menu */}
          <div className="space-y-1">
            <NavItem 
              to="/brand-briefs"
              icon={<FileText className="h-5 w-5" />}
              label="Brand Briefs"
              active={isBrandBriefsActive}
              hasChildren={true}
              isOpen={isBrandBriefsOpen}
              onToggleSubMenu={() => setBrandBriefsOpen(!isBrandBriefsOpen)}
              collapsed={sidebarCollapsed}
              toggleSidebar={sidebarCollapsed ? toggleSidebar : undefined}
            />
            
            {isBrandBriefsOpen && !sidebarCollapsed && (
              <div className="pl-6 space-y-1">
                <Link to="/brand-briefs">
                  <Button
                    variant={location.pathname === '/brand-briefs' ? "default" : "ghost"}
                    className="w-full flex justify-start gap-2 mb-1 text-sm"
                    size="sm"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Intro</span>
                  </Button>
                </Link>
                <Link to="/create">
                  <Button
                    variant={location.pathname === '/create' ? "default" : "ghost"}
                    className="w-full flex justify-start gap-2 mb-1 text-sm"
                    size="sm"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Create Brief</span>
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant={location.pathname === '/dashboard' ? "default" : "ghost"}
                    className="w-full flex justify-start gap-2 mb-1 text-sm"
                    size="sm"
                  >
                    <List className="h-4 w-4" />
                    <span>My Briefs</span>
                  </Button>
                </Link>
              </div>
            )}
            
            {isBrandBriefsOpen && sidebarCollapsed && (
              <div className="space-y-1 flex flex-col items-center">
                <Link to="/brand-briefs">
                  <Button
                    variant={location.pathname === '/brand-briefs' ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleSidebar}
                  >
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/create">
                  <Button
                    variant={location.pathname === '/create' ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleSidebar}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant={location.pathname === '/dashboard' ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleSidebar}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Email Copywriter with sub-menu */}
          <div className="space-y-1">
            <NavItem 
              to="/email-copywriter"
              icon={<Mail className="h-5 w-5" />}
              label="Email Copywriter"
              active={isEmailsActive}
              hasChildren={true}
              isOpen={isEmailsOpen}
              onToggleSubMenu={() => setEmailsOpen(!isEmailsOpen)}
              collapsed={sidebarCollapsed}
              toggleSidebar={sidebarCollapsed ? toggleSidebar : undefined}
            />
            
            {isEmailsOpen && !sidebarCollapsed && (
              <div className="pl-6 space-y-1">
                <Link to="/email-copywriter">
                  <Button
                    variant={location.pathname === '/email-copywriter' ? "default" : "ghost"}
                    className="w-full flex justify-start gap-2 mb-1 text-sm"
                    size="sm"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Create Email</span>
                  </Button>
                </Link>
                <Link to="/generated-emails">
                  <Button
                    variant={location.pathname === '/generated-emails' ? "default" : "ghost"}
                    className="w-full flex justify-start gap-2 mb-1 text-sm"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                    <span>My Emails</span>
                  </Button>
                </Link>
              </div>
            )}
            
            {isEmailsOpen && sidebarCollapsed && (
              <div className="space-y-1 flex flex-col items-center">
                <Link to="/email-copywriter">
                  <Button
                    variant={location.pathname === '/email-copywriter' ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleSidebar}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/generated-emails">
                  <Button
                    variant={location.pathname === '/generated-emails' ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleSidebar}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <NavItem 
            to="/agent-voice"
            icon={<Mic className="h-5 w-5" />}
            label="Agent Voice"
            active={location.pathname === '/agent-voice'}
            collapsed={sidebarCollapsed}
            toggleSidebar={sidebarCollapsed ? toggleSidebar : undefined}
          />
          <NavItem 
            to="/social-media"
            icon={<Share2 className="h-5 w-5" />}
            label="Social Media"
            active={location.pathname === '/social-media'}
            collapsed={sidebarCollapsed}
            toggleSidebar={sidebarCollapsed ? toggleSidebar : undefined}
          />
        </div>
        
        {/* Settings and Theme Toggle at the bottom with increased padding */}
        <div className="mt-auto pb-12">
          <NavItem 
            to="/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            active={location.pathname === '/settings'}
            collapsed={sidebarCollapsed}
            toggleSidebar={sidebarCollapsed ? toggleSidebar : undefined}
          />
          <div className={`flex ${sidebarCollapsed ? 'justify-center' : 'justify-between items-center'} mt-4 px-2`}>
            {!sidebarCollapsed && <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Theme</span>}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarMenu;
