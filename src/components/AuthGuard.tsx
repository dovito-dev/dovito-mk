
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

type AuthGuardProps = {
  children: React.ReactNode;
  showContent?: boolean;
  message?: string;
};

/**
 * AuthGuard component that shows a sign-in prompt if the user is not authenticated.
 * 
 * @param children - The content to render when the user is authenticated
 * @param showContent - Whether to show the content even if the user is not authenticated (with a warning)
 * @param message - Custom message to display when not authenticated
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  showContent = false,
  message = "You need to sign in to use this feature."
}) => {
  const { user } = useAuth();
  
  if (user) {
    return <>{children}</>;
  }
  
  if (showContent) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{message}</p>
            <p className="text-sm mt-1">Your data won't be saved until you sign in.</p>
          </div>
        </div>
        {children}
      </div>
    );
  }
  
  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Authentication Required</CardTitle>
        <CardDescription>
          {message}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Sign in to your account to access all features and save your content.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/dashboard">Go Back</Link>
        </Button>
        <Button asChild>
          <Link to="/auth">Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthGuard;
