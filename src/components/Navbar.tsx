
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
  );
};

export default Navbar;
