
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
        className="p-1 flex items-center justify-center h-8 w-8 text-indigo-600"
      >
        {isDark ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </button>
    );
  }
  
  return (
    <Switch 
      checked={isDark}
      onCheckedChange={toggleTheme}
      className="data-[state=checked]:bg-indigo-600"
    />
  );
};

export default ThemeToggle;
