
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionGate from '@/components/SubscriptionGate';
import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useUserUsageStore } from '@/store/userUsageStore';
import { createBrandBrief } from '@/hooks/useBrandBriefs';
import { Link } from 'react-router-dom';

const CreateBrief = () => {
  const [title, setTitle] = useState('');
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { incrementBriefsCreated } = useUserUsageStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a brand brief.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    // Check if user has reached their quota limit
    if (profile?.monthly_quota !== null && profile?.monthly_quota !== undefined) {
      const used = profile.used_quota || 0;
      if (used >= profile.monthly_quota) {
        toast({
          title: "Quota Exceeded",
          description: "You have reached your monthly brief limit. Please upgrade your plan to continue.",
          variant: "destructive",
        });
        navigate('/get-started');
        return;
      }
    }
    
    setIsSubmitting(true);

    try {
      // Insert the brief using our extracted function
      await createBrandBrief(user.id, {
        brief_title: title,
        brand_name: brandName,
        industry,
        brief_type: type,
        brief_content: content,
      });
      
      // Increment the brief counter in local store for UI updates
      incrementBriefsCreated();
      
      toast({
        title: "Brief Created",
        description: "Your brand brief has been successfully created and is being processed.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was an error creating your brief. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate remaining quota
  const getRemainingQuota = () => {
    if (!profile) return null;
    
    // If monthly_quota is null or undefined, user has unlimited quota
    if (profile.monthly_quota === null || profile.monthly_quota === undefined) {
      return null;
    }
    
    const used = profile.used_quota || 0;
    const total = profile.monthly_quota;
    const remaining = total - used;
    
    return {
      used,
      total,
      remaining,
      planName: profile.plan_name || 'Free'
    };
  };

  const quotaInfo = getRemainingQuota();
  const isQuotaExceeded = quotaInfo && quotaInfo.remaining <= 0;

  return (
    <SubscriptionGate allowFreeTier={true}>
      <AuthGuard showContent={true} message="Sign in to save your brand brief and generate content.">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Create Brand Brief</h1>
            {user && quotaInfo && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  You have {quotaInfo.remaining} {quotaInfo.planName === 'Free' ? 'free ' : ''}
                  briefs remaining
                </p>
                
                {isQuotaExceeded && (
                  <Button size="sm" asChild className="gradient-bg">
                    <Link to="/get-started">Upgrade Plan</Link>
                  </Button>
                )}
              </div>
            )}
            
            {!user && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fill in the details below and sign in to save your brand brief.
              </p>
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Brand Information</CardTitle>
              <CardDescription>Fill in the details about your brand</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">Brief Title</label>
                    <Input 
                      id="title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      placeholder="E.g. Summer Campaign Brief" 
                      required 
                    />
                  </div>

                  <div>
                    <label htmlFor="brandName" className="block text-sm font-medium mb-1">Brand Name</label>
                    <Input 
                      id="brandName" 
                      value={brandName} 
                      onChange={(e) => setBrandName(e.target.value)} 
                      placeholder="Your brand name" 
                      required 
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium mb-1">Industry</label>
                    <Input 
                      id="industry" 
                      value={industry} 
                      onChange={(e) => setIndustry(e.target.value)} 
                      placeholder="E.g. Technology, Retail, Healthcare" 
                      required 
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium mb-1">Brief Type</label>
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brief type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brand-identity">Brand Identity</SelectItem>
                        <SelectItem value="campaign">Marketing Campaign</SelectItem>
                        <SelectItem value="product-launch">Product Launch</SelectItem>
                        <SelectItem value="rebranding">Rebranding</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-1">Brief Content</label>
                    <Textarea 
                      id="content" 
                      value={content} 
                      onChange={(e) => setContent(e.target.value)} 
                      placeholder="Describe your brand, target audience, goals, and any specific requirements..." 
                      className="min-h-[200px]" 
                      required 
                    />
                  </div>
                </div>
                
                <CardFooter className="px-0 flex flex-col sm:flex-row gap-4">
                  {!user ? (
                    <>
                      <Button type="button" variant="outline" asChild className="w-full sm:w-auto">
                        <Link to="/auth">Sign In to Continue</Link>
                      </Button>
                      <Button type="button" asChild className="w-full sm:w-auto">
                        <Link to="/auth?tab=signup">Create Account</Link>
                      </Button>
                    </>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || isQuotaExceeded} 
                      className="w-full"
                    >
                      {isSubmitting ? "Creating..." : "Create Brief"}
                    </Button>
                  )}
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </AuthGuard>
    </SubscriptionGate>
  );
};

export default CreateBrief;
