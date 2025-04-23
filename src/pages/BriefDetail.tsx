
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBrandBrief } from '@/hooks/useBrandBriefs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Building, Link as LinkIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';

const BriefDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: brief, isLoading } = useBrandBrief(id);
  const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard');

  const handleCopyToClipboard = () => {
    if (brief?.generated_brief) {
      navigator.clipboard.writeText(brief.generated_brief)
        .then(() => {
          setCopyButtonText('Copied!');
          setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!brief) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Brief Not Found</h1>
        <p className="text-muted-foreground mb-6">The brief you're looking for doesn't exist or you don't have permission to view it.</p>
        <Link to="/dashboard">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{brief.brief_title}</h1>
      
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Building className="h-4 w-4 mr-1" />
          <span>{brief.brand_name}</span>
        </div>
        {brief.company_url && (
          <div className="flex items-center">
            <LinkIcon className="h-4 w-4 mr-1" />
            <a href={brief.company_url.startsWith('http') ? brief.company_url : `https://${brief.company_url}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:underline">
              {brief.company_url}
            </a>
          </div>
        )}
        {brief.created_at && (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Created {format(new Date(brief.created_at), 'MMMM d, yyyy')}</span>
          </div>
        )}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Brief Content</CardTitle>
          <CardDescription>
            Your original brand brief content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap">
            {brief.brief_content}
          </div>
        </CardContent>
      </Card>

      {brief.generated_brief && (
        <Card className="mb-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generated Brand Brief</CardTitle>
              <CardDescription>
                AI-generated brand brief based on your inputs
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopyToClipboard}
            >
              {copyButtonText}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{brief.generated_brief}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BriefDetail;
