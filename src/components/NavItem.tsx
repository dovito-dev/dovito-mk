
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
    ? "bg-secondary text-secondary-foreground font-medium" 
    : "hover:bg-accent/50 text-gray-600 hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200";

  if (hasChildren) {
    return (
      <Button
        variant="ghost"
        className={`w-full flex justify-between items-center mb-1 rounded-xl ${activeClasses} ${collapsed ? "px-2" : ""}`}
        onClick={onToggleSubMenu}
      >
        <div className="flex items-center gap-2">
          {icon}
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed && <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${active ? 'text-secondary-foreground' : 'text-gray-500 dark:text-gray-400'}`} />}
      </Button>
    );
  }
  
  if (collapsed) {
    return (
      <Button
        variant="ghost"
        className={`w-full flex ${collapsed ? "justify-center" : "justify-start"} gap-2 mb-1 rounded-xl ${activeClasses} ${collapsed ? "px-2" : ""}`}
        onClick={handleClick}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </Button>
    );
  }

  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={`w-full flex ${collapsed ? "justify-center" : "justify-start"} gap-2 mb-1 rounded-xl ${activeClasses} ${collapsed ? "px-2" : ""}`}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export default NavItem;
