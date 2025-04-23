
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionGate from '@/components/SubscriptionGate';
import AuthGuard from '@/components/AuthGuard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useUserUsageStore } from '@/store/userUsageStore';
import { createBrandBrief } from '@/hooks/useBrandBriefs';
import { Link } from 'react-router-dom';

const CreateBrief = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [briefTitle, setBriefTitle] = useState('');
  const [extraInstructions, setExtraInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { incrementBriefsCreated } = useUserUsageStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Company Name and URL required
    if (!companyName.trim() || !companyUrl.trim()) {
      toast({
        title: "Missing Information",
        description: "Company/Business Name and URL are required.",
        variant: "destructive",
      });
      return;
    }
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
      // Use briefTitle, fallback to companyName if empty
      const titleToUse = briefTitle.trim() || companyName.trim();
      await createBrandBrief(user.id, {
        brief_title: titleToUse,
        brand_name: companyName.trim(),
        company_url: companyUrl.trim(),
        brief_content: extraInstructions,
      });

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
            <h1 className="text-3xl font-bold mb-3 text-[#3333ff]">Create Brand Brief</h1>
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
              <CardDescription>Fill in the details about your company or business</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="briefTitle" className="block text-sm font-medium mb-1 text-[#3333ff]">Brief Title <span className="text-muted-foreground text-xs">(optional)</span></label>
                    <Input
                      id="briefTitle"
                      value={briefTitle}
                      onChange={(e) => setBriefTitle(e.target.value)}
                      placeholder="E.g. Summer Campaign Brief"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Will default to company or business name if left blank.</p>
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-1 text-[#3333ff]">Company or Business Name <span className="text-red-600">*</span></label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Your company or business name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="companyUrl" className="block text-sm font-medium mb-1 text-[#3333ff]">Company/Business URL <span className="text-red-600">*</span></label>
                    <Input
                      id="companyUrl"
                      value={companyUrl}
                      onChange={(e) => setCompanyUrl(e.target.value)}
                      placeholder="https://your-company.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="extraInstructions" className="block text-sm font-medium mb-1 text-[#3333ff]">Extra Instructions</label>
                    <Textarea
                      id="extraInstructions"
                      value={extraInstructions}
                      onChange={(e) => setExtraInstructions(e.target.value)}
                      placeholder="Anything else the AI should know..."
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
                
                <CardFooter className="px-0 flex flex-col sm:flex-row gap-4">
                  {!user ? (
                    <>
                      <Button type="button" variant="outline" asChild className="w-full sm:w-auto border-[#3333ff] text-[#3333ff]">
                        <Link to="/auth">Sign In to Continue</Link>
                      </Button>
                      <Button type="button" asChild className="w-full sm:w-auto bg-[#3333ff]">
                        <Link to="/auth?tab=signup">Create Account</Link>
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || isQuotaExceeded}
                      className="w-full bg-[#3333ff] hover:bg-[#2222bb] text-white"
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
