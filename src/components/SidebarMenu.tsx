
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Home, List, Mail, Mic, Share2, BookOpen, Send, Settings, CreditCard, Moon } from 'lucide-react';
import SidebarToggle from './SidebarToggle';
import ThemeToggle from './ThemeToggle';
import NavItem from './NavItem';
import { useSubscription } from '@/context/SubscriptionContext';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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
  const { isPaying, setIsPaying } = useSubscription();

  return (
    <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 border-r bg-gray-100 dark:bg-gray-800/90 dark:border-gray-700 p-4 hidden md:flex md:flex-col fixed h-full top-0 pt-[64px]`}>
      <div className="flex justify-end mb-2">
        <SidebarToggle collapsed={sidebarCollapsed} toggleCollapsed={toggleSidebar} />
      </div>
      
      {/* Scrollable navigation items */}
      <div className="flex-1 overflow-y-auto pr-1 pb-4">
        <nav className="space-y-1 flex flex-col">
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
              icon={<FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
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
                    variant={location.pathname === '/brand-briefs' ? "secondary" : "ghost"}
                    className={`w-full flex justify-start gap-2 mb-1 text-sm rounded-xl ${location.pathname === '/brand-briefs' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    size="sm"
                  >
                    <BookOpen className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Intro</span>
                  </Button>
                </Link>
                <Link to="/create">
                  <Button
                    variant={location.pathname === '/create' ? "secondary" : "ghost"}
                    className={`w-full flex justify-start gap-2 mb-1 text-sm rounded-xl ${location.pathname === '/create' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    size="sm"
                  >
                    <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Create Brief</span>
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant={location.pathname === '/dashboard' ? "secondary" : "ghost"}
                    className={`w-full flex justify-start gap-2 mb-1 text-sm rounded-xl ${location.pathname === '/dashboard' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    size="sm"
                  >
                    <List className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>My Briefs</span>
                  </Button>
                </Link>
              </div>
            )}
            
            {isBrandBriefsOpen && sidebarCollapsed && (
              <div className="space-y-2 flex flex-col items-center px-1">
                <Link to="/brand-briefs">
                  <Button
                    variant={location.pathname === '/brand-briefs' ? "secondary" : "ghost"}
                    size="icon"
                    className={`h-10 w-10 rounded-xl ${location.pathname === '/brand-briefs' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    onClick={toggleSidebar}
                  >
                    <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </Button>
                </Link>
                <Link to="/create">
                  <Button
                    variant={location.pathname === '/create' ? "secondary" : "ghost"}
                    size="icon"
                    className={`h-10 w-10 rounded-xl ${location.pathname === '/create' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    onClick={toggleSidebar}
                  >
                    <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant={location.pathname === '/dashboard' ? "secondary" : "ghost"}
                    size="icon"
                    className={`h-10 w-10 rounded-xl ${location.pathname === '/dashboard' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    onClick={toggleSidebar}
                  >
                    <List className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Email Copywriter with sub-menu */}
          <div className="space-y-1">
            <NavItem 
              to="/email-copywriter"
              icon={<Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
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
                    variant={location.pathname === '/email-copywriter' ? "secondary" : "ghost"}
                    className={`w-full flex justify-start gap-2 mb-1 text-sm rounded-xl ${location.pathname === '/email-copywriter' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    size="sm"
                  >
                    <Mail className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Create Email</span>
                  </Button>
                </Link>
                <Link to="/generated-emails">
                  <Button
                    variant={location.pathname === '/generated-emails' ? "secondary" : "ghost"}
                    className={`w-full flex justify-start gap-2 mb-1 text-sm rounded-xl ${location.pathname === '/generated-emails' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    size="sm"
                  >
                    <Send className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>My Emails</span>
                  </Button>
                </Link>
              </div>
            )}
            
            {isEmailsOpen && sidebarCollapsed && (
              <div className="space-y-2 flex flex-col items-center px-1">
                <Link to="/email-copywriter">
                  <Button
                    variant={location.pathname === '/email-copywriter' ? "secondary" : "ghost"}
                    size="icon"
                    className={`h-10 w-10 rounded-xl ${location.pathname === '/email-copywriter' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    onClick={toggleSidebar}
                  >
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </Button>
                </Link>
                <Link to="/generated-emails">
                  <Button
                    variant={location.pathname === '/generated-emails' ? "secondary" : "ghost"}
                    size="icon"
                    className={`h-10 w-10 rounded-xl ${location.pathname === '/generated-emails' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    onClick={toggleSidebar}
                  >
                    <Send className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <NavItem 
            to="/agent-voice"
            icon={<Mic className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
            label="Agent Voice"
            active={location.pathname === '/agent-voice'}
            collapsed={sidebarCollapsed}
            toggleSidebar={sidebarCollapsed ? toggleSidebar : undefined}
          />
          <NavItem 
            to="/social-media"
            icon={<Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
            label="Social Media"
            active={location.pathname === '/social-media'}
            collapsed={sidebarCollapsed}
            toggleSidebar={sidebarCollapsed ? toggleSidebar : undefined}
          />
        </nav>
      </div>
      
      {/* Settings and Theme Toggle fixed at the bottom */}
      <div className="mt-auto border-t pt-4 dark:border-gray-700/50">
        {/* Developer Mode Toggle */}
        <div className={`mb-4 ${!sidebarCollapsed ? 'px-2' : 'flex justify-center'}`}>
          {!sidebarCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Developer Mode</span>
              </div>
              <Switch 
                id="subscription-mode" 
                checked={isPaying}
                onCheckedChange={setIsPaying}
                className="data-[state=checked]:bg-gray-600 dark:data-[state=checked]:bg-gray-400"
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => toggleSidebar()}
            >
              <CreditCard className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Settings Button with similar styling to Developer Mode */}
        <div className={`mb-4 ${!sidebarCollapsed ? 'px-2' : 'flex justify-center'}`}>
          {!sidebarCollapsed ? (
            <Link to="/settings" className="w-full">
              <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-xl">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Settings</span>
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/settings">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>

        {/* Theme toggle with similar styling */}
        <div className={`${!sidebarCollapsed ? 'px-2' : 'flex justify-center'}`}>
          {!sidebarCollapsed ? (
            <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-xl">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Theme</span>
              </div>
              <ThemeToggle collapsed={false} />
            </div>
          ) : (
            <div className="flex justify-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-xl">
              <ThemeToggle collapsed={true} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarMenu;
