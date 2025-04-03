
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, FileText, Home, List, Mail, Mic, Share2, BookOpen, Send, Settings } from 'lucide-react';
import DevModeToggle from './DevModeToggle';
import ThemeToggle from './ThemeToggle';
import SidebarToggle from './SidebarToggle';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  hasChildren?: boolean;
  isOpen?: boolean;
  onToggleSubMenu?: () => void;
  collapsed?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  label, 
  active, 
  hasChildren = false,
  isOpen = false,
  onToggleSubMenu,
  collapsed = false
}) => {
  if (hasChildren) {
    return (
      <Button
        variant={active ? "default" : "ghost"}
        className={`w-full flex justify-between items-center mb-1 ${active ? "" : "hover:bg-muted"} ${collapsed ? "px-2" : ""}`}
        onClick={onToggleSubMenu}
      >
        <div className="flex items-center gap-2">
          {icon}
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed && <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </Button>
    );
  }
  
  return (
    <Link to={to}>
      <Button
        variant={active ? "default" : "ghost"}
        className={`w-full flex ${collapsed ? "justify-center" : "justify-start"} gap-2 mb-1 ${active ? "" : "hover:bg-muted"} ${collapsed ? "px-2" : ""}`}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isBrandBriefsOpen, setBrandBriefsOpen] = React.useState(
    location.pathname.startsWith('/brand-briefs') || 
    location.pathname === '/create' || 
    location.pathname === '/dashboard'
  );
  
  const [isEmailsOpen, setEmailsOpen] = React.useState(
    location.pathname === '/email-copywriter' || 
    location.pathname === '/generated-emails' || 
    location.pathname.startsWith('/email/')
  );

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const isBrandBriefsActive = 
    location.pathname.startsWith('/brand-briefs') || 
    location.pathname === '/create' || 
    location.pathname === '/dashboard';
    
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
      <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/7a9c88d6-ba2f-4247-89c5-ae6e8fc600d9.png" alt="mk.dovito.com" className="h-8" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium ${location.pathname === '/' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}>
              Home
            </Link>
            <Link to="/brand-briefs" className={`text-sm font-medium ${isBrandBriefsActive ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}>
              Brand Briefs
            </Link>
            <Link to="/email-copywriter" className={`text-sm font-medium ${isEmailsActive ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}>
              Email Copywriter
            </Link>
            <Link to="/agent-voice" className={`text-sm font-medium ${location.pathname === '/agent-voice' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}>
              Agent Voice
            </Link>
            <Link to="/social-media" className={`text-sm font-medium ${location.pathname === '/social-media' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'}`}>
              Social Media
            </Link>
            <Link to="/get-started">
              <Button size="sm" className="ml-4 gradient-bg">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r bg-muted dark:bg-gray-800 dark:border-gray-700 p-4 hidden md:block flex flex-col`}>
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
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/create">
                      <Button
                        variant={location.pathname === '/create' ? "default" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/dashboard">
                      <Button
                        variant={location.pathname === '/dashboard' ? "default" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
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
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/generated-emails">
                      <Button
                        variant={location.pathname === '/generated-emails' ? "default" : "ghost"}
                        size="icon"
                        className="h-8 w-8"
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
              />
              <NavItem 
                to="/social-media"
                icon={<Share2 className="h-5 w-5" />}
                label="Social Media"
                active={location.pathname === '/social-media'}
                collapsed={sidebarCollapsed}
              />
            </div>
            
            {/* Settings and Theme Toggle at the bottom */}
            <div className="mt-auto pb-4">
              <NavItem 
                to="/settings"
                icon={<Settings className="h-5 w-5" />}
                label="Settings"
                active={location.pathname === '/settings'}
                collapsed={sidebarCollapsed}
              />
              <div className={`flex ${sidebarCollapsed ? 'justify-center' : 'justify-start'} mt-2`}>
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </aside>
        
        <main className="flex-1 p-6 dark:bg-gray-900 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
