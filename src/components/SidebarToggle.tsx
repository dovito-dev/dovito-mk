
import React from 'react';
import { PanelLeftClose, PanelRight } from 'lucide-react';
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
      className="rounded-full hover:bg-brand-softPurple/20 transition-colors"
    >
      <span className="sr-only">
        {collapsed ? "Expand sidebar" : "Collapse sidebar"}
      </span>
      {collapsed ? (
        <div className="text-brand-purple">
          <PanelRight className="h-5 w-5" />
        </div>
      ) : (
        <div className="text-brand-purple">
          <PanelLeftClose className="h-5 w-5" />
        </div>
      )}
    </Button>
  );
};

export default SidebarToggle;
