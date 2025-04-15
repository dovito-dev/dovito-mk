import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useSubscription } from '@/context/SubscriptionContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CreditCard, LogOut, User, Link as LinkIcon } from 'lucide-react';

type NavbarProps = {
  location: {
    pathname: string;
  };
};

const Navbar: React.FC<NavbarProps> = ({ location }) => {
  const { theme } = useTheme();
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const { plan } = useSubscription();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const isDark = theme === 'dark';
  
  const isBrandBriefsActive = 
    location.pathname.startsWith('/brand-briefs') || 
    location.pathname === '/create' || 
    location.pathname === '/dashboard' ||
    location.pathname.startsWith('/brief/');
    
  const isEmailsActive = 
    location.pathname === '/email-copywriter' || 
    location.pathname === '/generated-emails' || 
    location.pathname.startsWith('/email/');

  const getUserInitials = () => {
    if (!profile || !profile.full_name) return 'U';
    
    const nameParts = profile.full_name.trim().split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="border-b border-white/20 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70 dark:border-gray-800/30 shadow-lg">
      <div className="flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex items-center relative">
          <img 
            src="/lovable-uploads/7a9c88d6-ba2f-4247-89c5-ae6e8fc600d9.png" 
            alt="mk.dovito.com" 
            className={`h-8 absolute transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`} 
          />
          <img 
            src="/lovable-uploads/0a5324f3-7a3f-4c1a-b9ba-0e609890677f.png" 
            alt="mk.dovito.com" 
            className={`h-8 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`} 
          />
          <div className="h-8 w-[104px]"></div>
        </Link>
        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium ${location.pathname === '/' ? 'gradient-text' : 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white'}`}
            >
              {user ? 'Dashboard' : 'Tools'}
            </Link>
            <Link 
              to="/brand-briefs" 
              className={`text-sm font-medium ${isBrandBriefsActive ? 'gradient-text' : 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white'}`}
            >
              Brand Briefs
            </Link>
            <Link 
              to="/email-copywriter" 
              className={`text-sm font-medium ${isEmailsActive ? 'gradient-text' : 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white'}`}
            >
              Email Copywriter
            </Link>
            <Link 
              to="/agent-voice" 
              className={`text-sm font-medium ${location.pathname === '/agent-voice' ? 'gradient-text' : 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white'}`}
            >
              Agent Voice
            </Link>
            <Link 
              to="/social-media" 
              className={`text-sm font-medium ${location.pathname === '/social-media' ? 'gradient-text' : 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white'}`}
            >
              Social Media
            </Link>
          </nav>
          
          {user ? (
            <div className="ml-4 flex items-center">
              {plan === 'Free' && (
                <Link to="/get-started">
                  <Button size="sm" className="mr-4 bg-secondary text-white hover:bg-secondary/80 rounded-full px-6 shadow-sm hover:shadow-md">
                    Upgrade
                  </Button>
                </Link>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
                    <AvatarImage src={profile?.avatar_url || profile?.profile_image_url} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 p-2">
                  <div className="px-2 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {profile?.full_name || profile?.email || user.email}
                  </div>
                  <div className="px-2 py-1 text-xs text-muted-foreground">
                    {plan || 'Free'} Plan
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings?tab=billing" className="flex items-center cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings?tab=connections" className="flex items-center cursor-pointer">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      <span>Connections</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex items-center cursor-pointer text-red-500 hover:text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isSigningOut ? 'Signing out...' : 'Sign out'}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/get-started">
              <Button size="sm" className="ml-4 bg-secondary text-white hover:bg-secondary/80 rounded-full px-6 shadow-sm hover:shadow-md">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
