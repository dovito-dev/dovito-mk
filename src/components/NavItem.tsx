
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  hasChildren?: boolean;
  isOpen?: boolean;
  onToggleSubMenu?: () => void;
  collapsed?: boolean;
  toggleSidebar?: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  label, 
  active, 
  hasChildren = false,
  isOpen = false,
  onToggleSubMenu,
  collapsed = false,
  toggleSidebar
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (collapsed && toggleSidebar) {
      e.preventDefault();
      toggleSidebar();
    }
  };

  const activeClasses = active 
    ? "bg-gray-200 text-primary font-medium dark:bg-gray-700" 
    : "hover:bg-gray-100 text-gray-600 hover:text-foreground dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200";

  if (hasChildren) {
    return (
      <Button
        variant="ghost"
        className={`w-full flex justify-center items-center mb-1 rounded-xl ${activeClasses} ${collapsed ? "px-2" : "justify-between"}`}
        onClick={onToggleSubMenu}
      >
        <div className="flex items-center gap-2">
          {icon}
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed && <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${active ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`} />}
      </Button>
    );
  }
  
  if (collapsed) {
    return (
      <Button
        variant="ghost"
        className={`w-full flex justify-center items-center mb-1 rounded-xl ${activeClasses} px-2`}
        onClick={handleClick}
      >
        {icon}
      </Button>
    );
  }

  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={`w-full flex justify-start items-center gap-2 mb-1 rounded-xl ${activeClasses}`}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export default NavItem;
