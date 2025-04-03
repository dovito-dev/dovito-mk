
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="flex items-center gap-2 p-2 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md rounded-full border border-white/10 dark:border-gray-700/30 shadow-sm">
      <Sun className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-yellow-500'}`} />
      <Switch 
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-brand-purple data-[state=unchecked]:bg-gray-200"
      />
      <Moon className={`h-4 w-4 ${isDark ? 'text-brand-purple' : 'text-gray-400'}`} />
    </div>
  );
};

export default ThemeToggle;
