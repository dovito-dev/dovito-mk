
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
        className="p-2 rounded-full bg-brand-softPurple/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-sm transition-all hover:shadow-md flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-brand-purple dark:text-brand-lilac" />
        ) : (
          <Sun className="h-4 w-4 text-brand-darkBlue" />
        )}
      </button>
    );
  }
  
  return (
    <div className="flex items-center gap-2 p-2 bg-brand-softPurple/30 dark:bg-gray-800/50 backdrop-blur-md rounded-full border border-white/20 dark:border-gray-700/30 shadow-sm">
      <Sun className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-brand-darkBlue'}`} />
      <Switch 
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-brand-purple data-[state=unchecked]:bg-brand-lightPurple"
      />
      <Moon className={`h-4 w-4 ${isDark ? 'text-brand-purple' : 'text-gray-400'}`} />
    </div>
  );
};

export default ThemeToggle;
