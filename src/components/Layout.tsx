
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Home, List } from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
  return (
    <Link to={to}>
      <Button
        variant={active ? "default" : "ghost"}
        className={`w-full flex justify-start gap-2 mb-1 ${active ? "" : "hover:bg-muted"}`}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/7a9c88d6-ba2f-4247-89c5-ae6e8fc600d9.png" alt="mk.dovito.com" className="h-8" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium ${location.pathname === '/' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900'}`}>
              Home
            </Link>
            <Link to="/brand-briefs" className={`text-sm font-medium ${location.pathname.startsWith('/brand-briefs') ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900'}`}>
              Brand Briefs
            </Link>
            <Link to="/email-copywriter" className={`text-sm font-medium ${location.pathname === '/email-copywriter' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900'}`}>
              Email Copywriter
            </Link>
            <Link to="/agent-voice" className={`text-sm font-medium ${location.pathname === '/agent-voice' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900'}`}>
              Agent Voice
            </Link>
            <Link to="/social-media" className={`text-sm font-medium ${location.pathname === '/social-media' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900'}`}>
              Social Media
            </Link>
            <Button size="sm" className="ml-4 gradient-bg">
              Get Started
            </Button>
          </nav>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted p-4 hidden md:block">
          <nav className="space-y-1 pt-4">
            <NavItem 
              to="/"
              icon={<Home className="h-5 w-5" />}
              label="Home"
              active={location.pathname === '/'}
            />
            <NavItem 
              to="/brand-briefs"
              icon={<FileText className="h-5 w-5" />}
              label="Brand Briefs"
              active={location.pathname.startsWith('/brand-briefs')}
            />
            <NavItem 
              to="/create"
              icon={<FileText className="h-5 w-5" />}
              label="Create Brief"
              active={location.pathname === '/create'}
            />
            <NavItem 
              to="/dashboard"
              icon={<List className="h-5 w-5" />}
              label="My Briefs"
              active={location.pathname === '/dashboard'}
            />
          </nav>
        </aside>
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
