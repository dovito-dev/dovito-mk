import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useBrandBriefStore } from '@/store/brandBriefStore';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Clock, CheckCircle, Globe, File, Users, Target, BarChart, FileText } from 'lucide-react';

const ColorPalette = ({ colors }: { colors: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {colors.map((color, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className="w-12 h-12 rounded-lg border shadow-sm"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs mt-1">{color}</span>
        </div>
      ))}
    </div>
  );
};

const BriefDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBrief } = useBrandBriefStore();
  
  const brief = getBrief(id || '');
  
  if (!brief) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Brief Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The brand brief you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-bold gradient-text">{brief.companyName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a 
                href={brief.website.startsWith('http') ? brief.website : `https://${brief.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary hover:underline"
              >
                {brief.website}
              </a>
            </div>
          </div>
          <Badge variant={brief.status === 'completed' ? 'default' : 'outline'}>
            {brief.status === 'completed' ? (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                <span>Completed</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Pending</span>
              </div>
            )}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Created {formatDate(brief.createdAt)}
        </p>
      </div>
      
      {brief.status === 'pending' ? (
        <Card className="animate-pulse border p-8">
          <div className="text-center py-12">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Brief generation in progress</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We're currently analyzing your company's website and generating your comprehensive brand brief. This usually takes a few minutes.
            </p>
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-8 animate-fade-up">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="audience">Audience & Positioning</TabsTrigger>
              <TabsTrigger value="brand">Brand Identity</TabsTrigger>
              <TabsTrigger value="competitive">Competitive Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Brief Summary</CardTitle>
                  <CardDescription>
                    Overall findings and recommendations for {brief.companyName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Target className="h-5 w-5 text-brand-blue" />
                        Brand Positioning
                      </h3>
                      <p>{brief.briefData?.brandPositioning}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-brand-purple" />
                        Target Audience
                      </h3>
                      <p>{brief.briefData?.targetAudience}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-brand-lightBlue" />
                        Brand Voice
                      </h3>
                      <p>{brief.briefData?.brandVoice}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-brand-pink" />
                        Competitive Edge
                      </h3>
                      <p>{brief.briefData?.competitiveAnalysis}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-3">Brand Values</h3>
                    <div className="flex flex-wrap gap-2">
                      {brief.briefData?.brandValues?.map((value, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Color Palette</h3>
                    <ColorPalette colors={brief.briefData?.colorPalette || []} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-4 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-brand-purple" />
                    Target Audience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{brief.briefData?.targetAudience}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-brand-blue" />
                    Brand Positioning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{brief.briefData?.brandPositioning}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="brand" className="space-y-4 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-brand-lightBlue" />
                    Brand Voice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{brief.briefData?.brandVoice}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Brand Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {brief.briefData?.brandValues?.map((value, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1 text-base">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Color Palette</CardTitle>
                </CardHeader>
                <CardContent>
                  <ColorPalette colors={brief.briefData?.colorPalette || []} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="competitive" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-brand-pink" />
                    Competitive Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{brief.briefData?.competitiveAnalysis}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center">
            <Button variant="outline" className="mr-2" onClick={() => window.print()}>
              <File className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
            <Link to="/create">
              <Button className="gradient-bg">
                Create Another Brief
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BriefDetail;
