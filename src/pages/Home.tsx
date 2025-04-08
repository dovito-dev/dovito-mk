
import React from 'react';
import { FileText, Mail, Mic, Share2, Clock, Search, Filter, Loader2 } from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useBrandBriefs } from '@/hooks/useBrandBriefs';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Home = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  
  // Show Dashboard if user is logged in, otherwise show Tools page
  return user ? <Dashboard user={user} profile={profile} /> : <ToolsPage />;
};

// Dashboard shown to logged-in users
const Dashboard = ({ user, profile }: { user: any, profile: any }) => {
  const { data: briefs = [], isLoading: loadingBriefs } = useBrandBriefs();
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const [timeRange, setTimeRange] = React.useState('all');

  // Simple filtering function
  const filteredBriefs = briefs
    .filter(brief => {
      // Search filter
      if (search && !brief.brief_title.toLowerCase().includes(search.toLowerCase()) && 
          !brief.brand_name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      // Type filter
      if (filter !== 'all' && brief.brief_type !== filter) {
        return false;
      }
      
      // Time range filter
      if (timeRange !== 'all') {
        const createdDate = new Date(brief.created_at);
        const now = new Date();
        
        if (timeRange === 'today') {
          return createdDate.toDateString() === now.toDateString();
        } else if (timeRange === 'week') {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          return createdDate >= weekAgo;
        } else if (timeRange === 'month') {
          const monthAgo = new Date();
          monthAgo.setMonth(now.getMonth() - 1);
          return createdDate >= monthAgo;
        }
      }
      
      return true;
    });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {profile?.full_name || user.email?.split('@')[0] || 'User'}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your content creation activities
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Brand Briefs</CardTitle>
            <CardDescription>Total created briefs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{briefs.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Usage</CardTitle>
            <CardDescription>Monthly quota</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {profile?.used_quota || 0}/{profile?.monthly_quota || 'Unlimited'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Subscription</CardTitle>
            <CardDescription>Current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold gradient-text">
              {profile?.plan_name || 'Free'}
            </p>
          </CardContent>
          <CardFooter>
            {(profile?.plan_name === 'Free' || !profile?.plan_name) && (
              <Link to="/get-started">
                <Button size="sm" variant="outline">Upgrade Plan</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>

      {/* Content Browser */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Content</CardTitle>
          <CardDescription>Browse and manage your content</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="brand-briefs" className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="brand-briefs">Brand Briefs</TabsTrigger>
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="social-posts">Social Posts</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="brand-briefs" className="p-6 pt-2">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search brand briefs..." 
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Brand Identity">Brand Identity</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {loadingBriefs ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
              </div>
            ) : filteredBriefs.length > 0 ? (
              <div className="space-y-4">
                {filteredBriefs.map((brief) => (
                  <Link to={`/brief/${brief.id}`} key={brief.id}>
                    <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{brief.brief_title}</h3>
                          <p className="text-sm text-muted-foreground">{brief.brand_name}</p>
                        </div>
                        <div className="text-sm text-right">
                          <span className="inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                            {brief.brief_type || 'Brand Brief'}
                          </span>
                          <p className="mt-1 text-muted-foreground">
                            {brief.created_at ? format(new Date(brief.created_at), 'MMM d, yyyy') : 'Unknown date'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No brand briefs found</p>
                <Link to="/create">
                  <Button>Create a Brief</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="emails" className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No emails found</p>
              <Link to="/email-copywriter">
                <Button>Create an Email</Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="social-posts" className="p-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No social posts found</p>
              <Link to="/social-media">
                <Button>Create Social Post</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/create">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Create Brand Brief
            </Button>
          </Link>
          <Link to="/email-copywriter">
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Write Email
            </Button>
          </Link>
          <Link to="/agent-voice">
            <Button variant="outline" className="w-full justify-start">
              <Mic className="mr-2 h-4 w-4" />
              Define Agent Voice
            </Button>
          </Link>
          <Link to="/social-media">
            <Button variant="outline" className="w-full justify-start">
              <Share2 className="mr-2 h-4 w-4" />
              Create Social Post
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Tools page shown to non-logged-in users (original Home page)
const ToolsPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-3 gradient-text">AI Content Creation Tools</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Create professional content for your brand with our suite of AI-powered tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<FileText />}
          title="Brand Briefs"
          description="Generate comprehensive brand briefs to establish your brand identity and voice"
          to="/brand-briefs"
          gradient={true}
        />
        
        <FeatureCard
          icon={<Mail />}
          title="Email Copywriter"
          description="Generate persuasive email copy tailored to your brand and audience"
          to="/email-copywriter"
          gradient={true}
        />
        
        <FeatureCard
          icon={<Mic />}
          title="Agent Voice"
          description="Create a consistent voice for your customer service agents"
          to="/agent-voice"
          gradient={true}
        />
        
        <FeatureCard
          icon={<Share2 />}
          title="Social Media"
          description="Generate engaging social media content for multiple platforms"
          to="/social-media"
          gradient={true}
        />
        
        <FeatureCard
          icon={<Clock />}
          title="Coming Soon"
          description="More AI-powered tools are on the way to enhance your content creation"
          to="/"
          gradient={false}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        />
      </div>
    </div>
  );
};

export default Home;
