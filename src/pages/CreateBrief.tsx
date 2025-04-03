
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionGate from '@/components/SubscriptionGate';
import { useBriefStore } from '@/store/briefStore';
import { useUserUsageStore } from '@/store/userUsageStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const CreateBrief = () => {
  const [title, setTitle] = useState('');
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addBrief } = useBriefStore();
  const { incrementBriefsCreated, isFreeUsageAvailable, briefsCreated, FREE_BRIEF_LIMIT } = useUserUsageStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const briefId = addBrief({
        title,
        brandName,
        industry,
        type,
        content
      });
      
      // Increment the brief counter
      incrementBriefsCreated();
      
      toast({
        title: "Brief Created",
        description: "Your brand brief has been successfully created.",
      });
      
      navigate(`/brief/${briefId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your brief. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SubscriptionGate allowFreeTier={true}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Create Brand Brief</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isFreeUsageAvailable() ? 
              `You have ${FREE_BRIEF_LIMIT - briefsCreated} free brand briefs remaining` : 
              'Create your brand brief'}
          </p>
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
              
              <CardFooter className="px-0">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Creating..." : "Create Brief"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </SubscriptionGate>
  );
};

export default CreateBrief;
