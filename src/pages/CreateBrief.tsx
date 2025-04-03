
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useBrandBriefStore } from '@/store/brandBriefStore';
import { Loader2 } from 'lucide-react';

const CreateBrief = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addBrief, updateBrief } = useBrandBriefStore();
  
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [otherLinks, setOtherLinks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim() || !website.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both company name and website.",
        variant: "destructive",
      });
      return;
    }
    
    if (!website.includes('.')) {
      toast({
        title: "Invalid Website",
        description: "Please enter a valid website URL.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Add to local store with otherLinks included
      const briefId = addBrief(companyName, website, otherLinks);
      
      // For demo, just generate mock data after delay
      setTimeout(() => {
        updateBrief(briefId, {
          status: 'completed',
          briefData: {
            targetAudience: `${companyName} primarily serves small to medium businesses in the tech sector who need professional branding solutions.`,
            brandVoice: `${companyName}'s voice is professional yet approachable, balancing expertise with clarity and warmth.`,
            brandValues: ['Innovation', 'Reliability', 'Customer-centricity', 'Quality'],
            colorPalette: ['#4361EE', '#7209B7', '#3A0CA3', '#F72585', '#4CC9F0'],
            competitiveAnalysis: `${companyName} stands out in a crowded marketplace by offering more personalized service compared to larger agencies, while maintaining higher quality than freelance alternatives.`,
            brandPositioning: `${companyName} positions itself as the ideal partner for growing businesses that need professional branding without the overhead of a large agency.`,
          }
        });
      }, 3000);
      
      toast({
        title: 'Brief Requested',
        description: 'Your brand brief is being generated. You will be redirected to the dashboard.',
      });
      
      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error creating brief:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Create Your Brand Brief</h1>
        <p className="text-muted-foreground">
          Provide your company details to generate a comprehensive brand brief
        </p>
      </div>
      
      <Card className="animate-fade-up">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>
              Enter your company details below to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Inc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Company Website</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. acme.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="otherLinks">Other Links</Label>
              <Input
                id="otherLinks"
                value={otherLinks}
                onChange={(e) => setOtherLinks(e.target.value)}
                placeholder="e.g. instagram.com/acme, linkedin.com/company/acme"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can paste several links separated by commas for extra context (e.g. Instagram, LinkedIn, etc.)
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="gradient-bg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Brand Brief'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateBrief;
