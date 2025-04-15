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
import { CreditCard, LogOut, Settings, User, Link as LinkIcon } from 'lucide-react';

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
  const navigate = useNavigate();
  
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
            {[
              { to: "/", label: user ? "Dashboard" : "Tools", active: location.pathname === "/" },
              { to: "/brand-briefs", label: "Brand Briefs", active: location.pathname.startsWith('/brand-briefs') },
              { to: "/email-copywriter", label: "Email Copywriter", active: location.pathname === '/email-copywriter' },
              { to: "/agent-voice", label: "Agent Voice", active: location.pathname === '/agent-voice' },
              { to: "/social-media", label: "Social Media", active: location.pathname === '/social-media' }
            ].map(({ to, label, active }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium ${
                  active 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          
          {user ? (
            <div className="ml-4 flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-9 w-9 p-0">
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url || profile?.profile_image_url} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {profile?.full_name || profile?.email || user.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {plan || 'Free'} Plan
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings?tab=billing')}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings?tab=connections')}>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Connections
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings?tab=preferences')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="text-red-500 hover:text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isSigningOut ? 'Signing out...' : 'Sign out'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/get-started">
              <Button size="sm" className="ml-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
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
