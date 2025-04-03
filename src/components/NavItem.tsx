
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

export default NavItem;
