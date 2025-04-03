
import React from 'react';
import { PanelLeftClose, PanelRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
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
        <div className="flex items-center text-brand-purple">
          <PanelRight className="h-5 w-5" />
          <ChevronsRight className="h-4 w-4 ml-[-5px]" />
        </div>
      ) : (
        <div className="flex items-center text-brand-purple">
          <PanelLeftClose className="h-5 w-5" />
          <ChevronsLeft className="h-4 w-4 ml-[-5px]" />
        </div>
      )}
    </Button>
  );
};

export default SidebarToggle;
