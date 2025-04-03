
import React from 'react';
import SubscriptionGate from '@/components/SubscriptionGate';
import { useParams, Link } from 'react-router-dom';
import { useBriefStore } from '@/store/briefStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Copy, Clock, Download } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

const BriefDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getBrief } = useBriefStore();
  const brief = getBrief(id || '');
  const { toast } = useToast();
  const [copying, setCopying] = React.useState(false);

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
      await navigator.clipboard.writeText(brief.content);
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
    const element = document.createElement("a");
    const file = new Blob([brief.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${brief.title.replace(/\s+/g, '-').toLowerCase()}-brief.txt`;
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
          <h1 className="text-3xl font-bold">{brief.title}</h1>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {format(new Date(brief.createdAt), 'MMM d, yyyy')}
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
                <p className="text-sm font-medium">Brand: {brief.brandName}</p>
                <p className="text-sm text-muted-foreground">{brief.industry}</p>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {brief.type}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="prose max-w-none whitespace-pre-line">
              {brief.content}
            </div>
          </CardContent>
        </Card>
      </div>
    </SubscriptionGate>
  );
};

export default BriefDetail;
