
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center gap-2 rounded-full bg-muted/60 p-1 border shadow-sm dark:bg-gray-700 dark:border-gray-600">
      <Sun className={`h-4 w-4 ${theme === 'light' ? 'text-amber-500' : 'text-muted-foreground'}`} />
      
      <Switch 
        checked={theme === 'dark'} 
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-primary/10"
      />
      
      <Moon className={`h-4 w-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-muted-foreground'}`} />
    </div>
  );
};

export default ThemeToggle;
