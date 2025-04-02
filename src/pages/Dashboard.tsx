import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { useBrandBriefStore, BrandBrief } from '@/store/brandBriefStore';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Clock, FileText, Plus } from 'lucide-react';

const Dashboard = () => {
  const { briefs } = useBrandBriefStore();
  
  const pendingBriefs = briefs.filter(brief => brief.status === 'pending');
  const completedBriefs = briefs.filter(brief => brief.status === 'completed');
  
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };
  
  const renderBriefCard = (brief: BrandBrief) => {
    return (
      <Card key={brief.id} className="mb-4 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{brief.companyName}</CardTitle>
              <CardDescription className="mt-1">
                <a href={brief.website.startsWith('http') ? brief.website : `https://${brief.website}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="hover:underline text-blue-500">
                  {brief.website}
                </a>
              </CardDescription>
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
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Created {formatDate(brief.createdAt)}
          </p>
        </CardContent>
        <CardFooter>
          <Link to={`/brief/${brief.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              {brief.status === 'completed' ? 'View Brief' : 'Check Status'}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Brand Briefs</h1>
          <p className="text-muted-foreground">
            Manage and view all your generated brand briefs
          </p>
        </div>
        <Link to="/create">
          <Button className="gradient-bg">
            <Plus className="mr-2 h-4 w-4" />
            New Brief
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="all">
            All Briefs ({briefs.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedBriefs.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingBriefs.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="animate-fade-in">
          {briefs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {briefs.map(renderBriefCard)}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="animate-fade-in">
          {completedBriefs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {completedBriefs.map(renderBriefCard)}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No completed briefs yet</h3>
              <p className="text-muted-foreground mb-4">
                Your completed brand briefs will appear here.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="animate-fade-in">
          {pendingBriefs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {pendingBriefs.map(renderBriefCard)}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No pending briefs</h3>
              <p className="text-muted-foreground mb-4">
                Briefs that are currently being generated will appear here.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center py-12 border rounded-lg">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
      <h3 className="text-lg font-medium mb-2">No brand briefs yet</h3>
      <p className="text-muted-foreground mb-4">
        Get started by creating your first brand brief
      </p>
      <Link to="/create">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Brand Brief
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;
