
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="flex items-center gap-2 p-2 bg-secondary/80 dark:bg-gray-800/50 backdrop-blur-md rounded-full border border-white/20 dark:border-gray-700/30 shadow-sm">
      <Sun className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
      <Switch 
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-gray-200"
      />
      <Moon className={`h-4 w-4 ${isDark ? 'text-gray-300' : 'text-gray-400'}`} />
    </div>
  );
};

export default ThemeToggle;
