
import React, { useState } from 'react';
import SubscriptionGate from '@/components/SubscriptionGate';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Copy, Clock, Download } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import ReactMarkdown from 'react-markdown';

type BrandBrief = {
  id: string;
  brief_title: string;
  brand_name: string;
  industry: string;
  brief_type: string;
  brief_content: string;
  generated_brief: string | null;
  created_at: string;
};

const BriefDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [copying, setCopying] = useState(false);

  // Fetch brief from Supabase
  const { data: brief, isLoading } = useQuery({
    queryKey: ['brief', id],
    queryFn: async (): Promise<BrandBrief | null> => {
      if (!user || !id) return null;

      const { data, error } = await supabase
        .from('brand_briefs')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        toast({
          title: "Error fetching brief",
          description: error.message,
          variant: "destructive"
        });
        return null;
      }

      return data;
    },
    enabled: !!user && !!id,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Loading brief...</h2>
      </div>
    );
  }

  if (!brief) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Brief not found</h2>
        <Link to="/dashboard">
          <Button variant="outline">Back to Briefs</Button>
        </Link>
      </div>
    );
  }

  const copyBriefContent = async () => {
    try {
      setCopying(true);
      const contentToCopy = brief.generated_brief || brief.brief_content;
      await navigator.clipboard.writeText(contentToCopy);
      toast({
        title: "Copied to clipboard",
        description: "The brief content has been copied to your clipboard.",
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

  const downloadBrief = () => {
    const contentToDownload = brief.generated_brief || brief.brief_content;
    const element = document.createElement("a");
    const file = new Blob([contentToDownload], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${brief.brief_title.replace(/\s+/g, '-').toLowerCase()}-brief.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <SubscriptionGate allowFreeTier={true}>
      <div className="max-w-4xl mx-auto pb-8">
        <div className="mb-6">
          <Link to="/dashboard" className="text-muted-foreground hover:text-primary inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to briefs
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{brief.brief_title}</h1>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {format(new Date(brief.created_at), 'MMM d, yyyy')}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            onClick={copyBriefContent} 
            variant="outline" 
            className="flex items-center gap-2"
            disabled={copying}
          >
            <Copy className="h-4 w-4" />
            {copying ? "Copying..." : "Copy Brief"}
          </Button>
          
          <Button 
            onClick={downloadBrief} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Brief
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-0">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">Brand: {brief.brand_name}</p>
                <p className="text-sm text-muted-foreground">{brief.industry}</p>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {brief.brief_type}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {brief.generated_brief ? (
              <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown>{brief.generated_brief}</ReactMarkdown>
              </div>
            ) : (
              <div className="prose max-w-none whitespace-pre-line">
                {brief.brief_content}
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-md">
                  <p>Your brief is being processed. Check back soon for the generated result.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SubscriptionGate>
  );
};

export default BriefDetail;
