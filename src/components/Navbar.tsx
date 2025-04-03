
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type NavbarProps = {
  location: {
    pathname: string;
  };
};

const Navbar: React.FC<NavbarProps> = ({ location }) => {
  const isBrandBriefsActive = 
    location.pathname.startsWith('/brand-briefs') || 
    location.pathname === '/create' || 
    location.pathname === '/dashboard' ||
    location.pathname.startsWith('/brief/');
    
  const isEmailsActive = 
    location.pathname === '/email-copywriter' || 
    location.pathname === '/generated-emails' || 
    location.pathname.startsWith('/email/');

  return (
    <header className="border-b border-white/20 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70 dark:border-gray-800/30">
      <div className="flex justify-between items-center px-6 py-3">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/7a9c88d6-ba2f-4247-89c5-ae6e8fc600d9.png" alt="mk.dovito.com" className="h-8" />
        </Link>
        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium ${location.pathname === '/' ? 'text-brand-purple' : 'text-gray-600 hover:text-brand-purple dark:text-gray-300 dark:hover:text-white'}`}>
              Home
            </Link>
            <Link to="/brand-briefs" className={`text-sm font-medium ${isBrandBriefsActive ? 'text-brand-purple' : 'text-gray-600 hover:text-brand-purple dark:text-gray-300 dark:hover:text-white'}`}>
              Brand Briefs
            </Link>
            <Link to="/email-copywriter" className={`text-sm font-medium ${isEmailsActive ? 'text-brand-purple' : 'text-gray-600 hover:text-brand-purple dark:text-gray-300 dark:hover:text-white'}`}>
              Email Copywriter
            </Link>
            <Link to="/agent-voice" className={`text-sm font-medium ${location.pathname === '/agent-voice' ? 'text-brand-purple' : 'text-gray-600 hover:text-brand-purple dark:text-gray-300 dark:hover:text-white'}`}>
              Agent Voice
            </Link>
            <Link to="/social-media" className={`text-sm font-medium ${location.pathname === '/social-media' ? 'text-brand-purple' : 'text-gray-600 hover:text-brand-purple dark:text-gray-300 dark:hover:text-white'}`}>
              Social Media
            </Link>
          </nav>
          <Link to="/get-started">
            <Button size="sm" className="ml-4 bg-brand-softPurple text-brand-purple hover:bg-brand-softPurple/80 rounded-full px-6">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
