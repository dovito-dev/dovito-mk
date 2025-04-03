
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
        className="p-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-sm transition-all hover:shadow"
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        ) : (
          <Sun className="h-4 w-4 text-indigo-600" />
        )}
      </button>
    );
  }
  
  return (
    <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-md rounded-full border border-white/20 dark:border-gray-700/30 shadow-sm">
      <Sun className={`h-4 w-4 ${isDark ? 'text-indigo-400/70' : 'text-indigo-600'}`} />
      <Switch 
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-indigo-500 data-[state=unchecked]:bg-indigo-300/70"
      />
      <Moon className={`h-4 w-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600/70'}`} />
    </div>
  );
};

export default ThemeToggle;
