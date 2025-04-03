
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
      className="rounded-full hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 transition-colors"
    >
      <span className="sr-only">
        {collapsed ? "Expand sidebar" : "Collapse sidebar"}
      </span>
      {collapsed ? (
        <div className="text-indigo-500/80 dark:text-indigo-400">
          <PanelRight className="h-5 w-5" />
        </div>
      ) : (
        <div className="text-indigo-600 dark:text-indigo-400/80">
          <PanelLeftClose className="h-5 w-5" />
        </div>
      )}
    </Button>
  );
};

export default SidebarToggle;
