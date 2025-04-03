
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';

type ThemeToggleProps = {
  collapsed?: boolean;
};

const ThemeToggle = ({ collapsed = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  if (collapsed) {
    return (
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 dark:from-brand-blue/20 dark:to-brand-purple/20 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-sm transition-all hover:shadow-md flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-brand-purple" />
        ) : (
          <Sun className="h-4 w-4 text-brand-blue" />
        )}
      </button>
    );
  }
  
  return (
    <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 dark:from-brand-blue/20 dark:to-brand-purple/20 backdrop-blur-md rounded-full border border-white/20 dark:border-gray-700/30 shadow-sm">
      <Sun className={`h-4 w-4 ${isDark ? 'text-brand-blue/70' : 'text-brand-blue'}`} />
      <Switch 
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-brand-purple data-[state=unchecked]:bg-brand-blue/70"
      />
      <Moon className={`h-4 w-4 ${isDark ? 'text-brand-purple' : 'text-brand-purple/70'}`} />
    </div>
  );
};

export default ThemeToggle;
