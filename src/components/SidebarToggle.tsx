
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
      className="rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
    >
      <span className="sr-only">
        {collapsed ? "Expand sidebar" : "Collapse sidebar"}
      </span>
      {collapsed ? (
        <div className="text-gray-600 dark:text-gray-400">
          <PanelRight className="h-5 w-5" />
        </div>
      ) : (
        <div className="text-gray-600 dark:text-gray-400">
          <PanelLeftClose className="h-5 w-5" />
        </div>
      )}
    </Button>
  );
};

export default SidebarToggle;
