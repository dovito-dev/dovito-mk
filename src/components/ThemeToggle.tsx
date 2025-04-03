
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
        className="p-2 rounded-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-sm transition-all hover:shadow-md flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <Sun className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    );
  }
  
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100/30 dark:bg-gray-800/50 backdrop-blur-md rounded-full border border-white/20 dark:border-gray-700/30 shadow-sm">
      <Sun className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
      <Switch 
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-gray-600 data-[state=unchecked]:bg-gray-300"
      />
      <Moon className={`h-4 w-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
    </div>
  );
};

export default ThemeToggle;
