
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
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center">
              <FileText className="text-white h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold gradient-text">BrandBriefGenerator</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium ${location.pathname === '/' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900'}`}>
              Home
            </Link>
            <Link to="/create" className={`text-sm font-medium ${location.pathname === '/create' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900'}`}>
              Create Brief
            </Link>
            <Link to="/dashboard" className={`text-sm font-medium ${location.pathname === '/dashboard' ? 'text-brand-blue' : 'text-gray-600 hover:text-gray-900'}`}>
              My Briefs
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
