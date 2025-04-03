
import React from 'react';
import { PanelLeft, PanelRightClose } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SidebarToggleProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const SidebarToggle = ({ collapsed, toggleCollapsed }: SidebarToggleProps) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleCollapsed} 
      className="rounded-full"
    >
      <span className="sr-only">
        {collapsed ? "Expand sidebar" : "Collapse sidebar"}
      </span>
      {collapsed ? (
        <PanelLeft className="h-5 w-5" />
      ) : (
        <PanelRightClose className="h-5 w-5" />
      )}
    </Button>
  );
};

export default SidebarToggle;
