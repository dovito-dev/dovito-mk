
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useEmailStore } from '@/store/emailStore';
import { v4 as uuidv4 } from 'uuid';

const EmailCopywriter = () => {
  const [open, setOpen] = useState(false);
  const [sampleEmail, setSampleEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { addEmail } = useEmailStore();
  const navigate = useNavigate();
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newEmail = {
        id: uuidv4(),
        title: `Email to ${recipientName} - ${purposeToTitle(purpose)}`,
        recipient: {
          name: recipientName,
          email: recipientEmail
        },
        company: website?.replace(/https?:\/\/(www\.)?/, '').split('/')[0] || '',
        purpose: purpose,
        content: generateEmailContent(purpose, recipientName, website),
        createdAt: new Date().toISOString()
      };
      
      addEmail(newEmail);
      setIsGenerating(false);
      navigate(`/email/${newEmail.id}`);
    }, 1500);
  };
  
  const purposeToTitle = (purposeKey: string): string => {
    const purposeMap: Record<string, string> = {
      'prospect-outreach': 'Prospect Outreach',
      'lead-nurturing': 'Lead Nurturing',
      'promotions': 'Special Offer',
      'follow-up': 'Follow-Up',
      'event-announcement': 'Event Announcement',
      'welcome': 'Welcome Message',
      're-engagement': 'Re-Engagement',
      'upsell': 'Product Recommendation',
      'partnerships': 'Partnership Proposal',
      'newsletter': 'Newsletter'
    };
    
    return purposeMap[purposeKey] || 'Email';
  };
  
  const generateEmailContent = (purpose: string, name: string, website: string): string => {
    // This is a placeholder - in a real implementation, you'd call an AI service or use templates
    const domain = website?.replace(/https?:\/\/(www\.)?/, '').split('/')[0] || 'your company';
    
    // Simple template based on purpose
    switch(purpose) {
      case 'prospect-outreach':
        return `Dear ${name},

I hope this email finds you well. I recently came across ${domain} and was impressed by your work in the industry.

Our company specializes in helping businesses like yours improve their processes and achieve better results. I'd love to schedule a brief call to discuss how we might be able to support your goals.

Would you have 15 minutes for a quick conversation next week?

Looking forward to connecting,

Your Name
`;
      case 'follow-up':
        return `Dear ${name},

I wanted to follow up on our previous conversation about how our services could benefit ${domain}.

Have you had a chance to review the materials I sent over? I'd be happy to answer any questions you might have or provide additional information.

Let me know what works best for your schedule if you'd like to discuss further.

Best regards,

Your Name
`;
      default:
        return `Dear ${name},

Thank you for your interest in our services. I believe we can provide significant value to ${domain} based on your specific needs.

I'd love to schedule a time to discuss how we can work together. Please let me know when would be convenient for you.

Looking forward to our conversation,

Your Name
`;
    }
  };
  
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
              value={sampleEmail}
              onChange={(e) => setSampleEmail(e.target.value)}
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
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Enter the URL of the company you're sending the email to. This helps generate relevant messaging.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">Recipient's Full Name</label>
              <Input 
                id="name" 
                placeholder="John Doe"
                className="w-full"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                The full name of the person you're emailing.
              </p>
            </div>
            
            <div>
              <label htmlFor="recipientEmail" className="block font-medium mb-2">Recipient's Email</label>
              <Input 
                id="recipientEmail" 
                type="email"
                placeholder="john.doe@example.com"
                className="w-full"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                The email address of the person you're contacting.
              </p>
            </div>
          </div>
          
          <div>
            <label htmlFor="purpose" className="block font-medium mb-2">Email Purpose</label>
            <Select onOpenChange={setOpen} value={purpose} onValueChange={setPurpose}>
              <SelectTrigger 
                className={`w-full ${open ? 'border-primary ring-2 ring-primary/20 bg-background' : 'border-input bg-background'} transition-all duration-200`}
              >
                <SelectValue placeholder="Select purpose..." />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-sm border border-primary/20 shadow-xl rounded-lg p-1 animate-fade-in">
                <div className="p-2 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 rounded-md mb-2">
                  <p className="text-xs font-medium text-primary">Choose the purpose of your email</p>
                </div>
                <SelectItem value="prospect-outreach" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Prospect Outreach</SelectItem>
                <SelectItem value="lead-nurturing" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Lead Nurturing</SelectItem>
                <SelectItem value="promotions" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Promotions/Special Offers</SelectItem>
                <SelectItem value="follow-up" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Warm Follow-Up</SelectItem>
                <SelectItem value="event-announcement" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Event or Launch Announcement</SelectItem>
                <SelectItem value="welcome" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Welcome/Onboarding</SelectItem>
                <SelectItem value="re-engagement" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Re-Engagement</SelectItem>
                <SelectItem value="upsell" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Upsell/Cross-Sell</SelectItem>
                <SelectItem value="partnerships" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Partnerships/Collaborations</SelectItem>
                <SelectItem value="newsletter" className="rounded-md hover:bg-brand-blue/10 focus:bg-brand-blue/20 my-1 cursor-pointer">Newsletter/Updates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-4">
            <Button 
              className="w-full gradient-bg" 
              onClick={handleGenerate}
              disabled={!recipientName || !recipientEmail || !purpose || isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Email Copy"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmailCopywriter;
