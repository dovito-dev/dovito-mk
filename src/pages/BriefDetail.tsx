
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Download, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { useBrandBrief } from '@/hooks/useBrandBriefs';
import AuthGuard from '@/components/AuthGuard';
import ReactMarkdown from 'react-markdown';

const BriefDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: brief, isLoading } = useBrandBrief(id);
  const { toast } = useToast();

  const handleDownload = () => {
    if (!brief?.generated_brief) return;
    
    // Create a blob from the brief content
    const blob = new Blob([brief.generated_brief], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brief.brief_title.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Brief Downloaded",
      description: "The brief has been downloaded as a markdown file.",
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">Loading brief details...</p>
      </div>
    );
  }

  if (!brief) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Brief Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The brief you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Button asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{brief.brief_title}</CardTitle>
            <CardDescription>
              Created on {brief.created_at ? format(new Date(brief.created_at), 'MMMM d, yyyy') : 'Unknown date'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Brand Name</h3>
              <p className="text-lg">{brief.brand_name}</p>
            </div>
            
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Industry</h3>
                <p>{brief.industry}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Brief Type</h3>
                <p>{brief.brief_type}</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Brief Content</h3>
              <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap">
                {brief.brief_content}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {brief.generated_brief ? (
          <Card>
            <CardHeader>
              <CardTitle>Generated Brief</CardTitle>
              <CardDescription>
                This AI-generated brief is based on your inputs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{brief.generated_brief}</ReactMarkdown>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(brief.generated_brief || '');
                toast({
                  title: "Copied to clipboard",
                  description: "The generated brief has been copied to your clipboard.",
                });
              }}>
                <Share2 className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Brief Generation in Progress</CardTitle>
              <CardDescription>
                Your brief is being generated. Check back soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-8 rounded-md text-center">
                <p className="text-muted-foreground">
                  The AI is working on your brand brief. This process usually takes 1-2 minutes.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthGuard>
  );
};

export default BriefDetail;
