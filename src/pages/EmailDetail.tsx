import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEmailStore } from '@/store/emailStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Copy, Mail as MailIcon, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import SubscriptionGate from '@/components/SubscriptionGate';

const EmailDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmail } = useEmailStore();
  const email = getEmail(id || '');
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);

  if (!email) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Email not found</h2>
        <Link to="/generated-emails">
          <Button variant="outline">Back to Emails</Button>
        </Link>
      </div>
    );
  }

  const copyEmailContent = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(email.content);
      toast({
        title: "Copied to clipboard",
        description: "The email content has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "There was an error copying the text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCopying(false);
    }
  };

  const openInGmail = () => {
    const subject = encodeURIComponent(email.title);
    const body = encodeURIComponent(email.content);
    const recipient = encodeURIComponent(email.recipient.email);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`, '_blank');
  };

  const openInOutlook = () => {
    const subject = encodeURIComponent(email.title);
    const body = encodeURIComponent(email.content);
    const recipient = encodeURIComponent(email.recipient.email);
    window.open(`https://outlook.office.com/mail/deeplink/compose?to=${recipient}&subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <SubscriptionGate>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/generated-emails" className="text-muted-foreground hover:text-primary inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to emails
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{email.title}</h1>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {format(new Date(email.createdAt), 'MMM d, yyyy')}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            onClick={copyEmailContent} 
            variant="outline" 
            className="flex items-center gap-2"
            disabled={copying}
          >
            <Copy className="h-4 w-4" />
            {copying ? "Copying..." : "Copy Email"}
          </Button>
          
          <Button 
            onClick={openInGmail} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <MailIcon className="h-4 w-4" />
            Open in Gmail
          </Button>
          
          <Button 
            onClick={openInOutlook} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Outlook
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-0">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">To: {email.recipient.name}</p>
                <p className="text-sm text-muted-foreground">{email.recipient.email}</p>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {email.purpose.charAt(0).toUpperCase() + email.purpose.slice(1).replace('-', ' ')}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="prose max-w-none whitespace-pre-line">
              {email.content}
            </div>
          </CardContent>
        </Card>
      </div>
    </SubscriptionGate>
  );
};

export default EmailDetail;
