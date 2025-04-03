
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
      className="rounded-full hover:bg-gradient-to-r hover:from-brand-blue/10 hover:to-brand-purple/10 dark:hover:from-brand-blue/20 dark:hover:to-brand-purple/20 transition-colors"
    >
      <span className="sr-only">
        {collapsed ? "Expand sidebar" : "Collapse sidebar"}
      </span>
      {collapsed ? (
        <div className="text-brand-blue/80 dark:text-brand-blue">
          <PanelRight className="h-5 w-5" />
        </div>
      ) : (
        <div className="text-brand-purple dark:text-brand-purple/80">
          <PanelLeftClose className="h-5 w-5" />
        </div>
      )}
    </Button>
  );
};

export default SidebarToggle;
