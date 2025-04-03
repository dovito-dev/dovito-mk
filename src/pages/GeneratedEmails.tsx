import React from 'react';
import { useEmailStore } from '@/store/emailStore';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Clock } from 'lucide-react';
import { format } from 'date-fns';
import SubscriptionGate from '@/components/SubscriptionGate';

const GeneratedEmails = () => {
  const { emails } = useEmailStore();

  return (
    <SubscriptionGate>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
            <Mail className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Generated Emails</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse your generated email copy and send emails directly to your recipients
          </p>
        </div>

        <div className="grid gap-6">
          {emails.map((email) => (
            <Link to={`/email/${email.id}`} key={email.id}>
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{email.title}</h2>
                      <p className="text-muted-foreground mb-3">To: {email.recipient.name} ({email.recipient.email})</p>
                      <p className="text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {email.purpose.charAt(0).toUpperCase() + email.purpose.slice(1).replace('-', ' ')}
                        </span>
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {format(new Date(email.createdAt), 'MMM d, yyyy')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/email-copywriter">
            <Button className="gradient-bg">Generate New Email</Button>
          </Link>
        </div>
      </div>
    </SubscriptionGate>
  );
};

export default GeneratedEmails;
