
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
        "stripe-card h-full flex flex-col", 
        gradient && "gradient-border",
        className
      )}>
        <CardContent className="p-6 flex-1">
          <div className="w-14 h-14 rounded-full stripe-icon-bg flex items-center justify-center mb-4">
            {React.cloneElement(icon as React.ReactElement, {
              className: "text-indigo-600 h-6 w-6"
            })}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button variant="link" className="px-0 text-indigo-600">
            Explore {title} <span className="ml-1">→</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
