
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './card';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  gradient?: boolean;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  to,
  gradient = false,
  className
}) => {
  return (
    <Link to={to}>
      <Card className={cn(
        "bg-white rounded-xl overflow-hidden transition-all hover:shadow-lg border-transparent h-full flex flex-col hover:-translate-y-1", 
        gradient && "gradient-border",
        className
      )}>
        <CardContent className="p-6 flex-1">
          <div className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center mb-4", 
            gradient ? "gradient-bg" : "bg-slate-100"
          )}>
            {React.cloneElement(icon as React.ReactElement, {
              className: gradient ? "text-white h-6 w-6" : "text-brand-blue h-6 w-6"
            })}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="ghost" className="hover:bg-muted px-0">
            Explore {title} <span className="ml-2 text-lg">→</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
