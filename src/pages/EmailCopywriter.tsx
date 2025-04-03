
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmailCopywriter = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
          <Mail className="text-white h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Email Copywriter</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Generate persuasive email copy tailored to your brand and audience
        </p>
      </div>

      <Card className="p-8 rounded-xl">
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block font-medium mb-2">Email to Analyze <span className="text-sm text-muted-foreground">(optional)</span></label>
            <Textarea 
              id="email" 
              placeholder="Paste an existing email here to analyze its style..."
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Paste a sample email to help generate copy that matches your existing style.
            </p>
          </div>
          
          <div>
            <label htmlFor="website" className="block font-medium mb-2">Company Website</label>
            <Input 
              id="website" 
              placeholder="https://your-company.com"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Enter the URL of the company you're sending the email to. This helps generate relevant messaging.
            </p>
          </div>
          
          <div>
            <label htmlFor="name" className="block font-medium mb-2">Recipient's Full Name</label>
            <Input 
              id="name" 
              placeholder="John Doe"
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-1">
              The full name of the person you're emailing.
            </p>
          </div>
          
          <div>
            <label htmlFor="purpose" className="block font-medium mb-2">Email Purpose</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select purpose..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prospect-outreach">Prospect Outreach</SelectItem>
                <SelectItem value="lead-nurturing">Lead Nurturing</SelectItem>
                <SelectItem value="promotions">Promotions/Special Offers</SelectItem>
                <SelectItem value="follow-up">Warm Follow-Up</SelectItem>
                <SelectItem value="event-announcement">Event or Launch Announcement</SelectItem>
                <SelectItem value="welcome">Welcome/Onboarding</SelectItem>
                <SelectItem value="re-engagement">Re-Engagement</SelectItem>
                <SelectItem value="upsell">Upsell/Cross-Sell</SelectItem>
                <SelectItem value="partnerships">Partnerships/Collaborations</SelectItem>
                <SelectItem value="newsletter">Newsletter/Updates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4">
            <Button className="w-full gradient-bg">Generate Email Copy</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmailCopywriter;
