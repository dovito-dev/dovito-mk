
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Search, Filter, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactMarkdown from 'react-markdown';
import { BrandBrief } from '@/hooks/useBrandBriefs';

interface ContentBrowserProps {
  briefs: BrandBrief[];
  isLoading: boolean;
}

const ContentBrowser: React.FC<ContentBrowserProps> = ({ briefs, isLoading }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('all');

  // Simple filtering function
  const filteredBriefs = briefs
    .filter(brief => {
      // Search filter
      if (search && !brief.brief_title.toLowerCase().includes(search.toLowerCase()) && 
          !brief.company_name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      // Type filter - we don't have a brief_type field, so this filtering won't work currently
      if (filter !== 'all') {
        return false;
      }
      
      // Time range filter
      if (timeRange !== 'all' && brief.created_at) {
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
          
          {isLoading ? (
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
                        <h3 className="font-medium">{brief.company_name}</h3>
                        <p className="text-sm text-muted-foreground">{brief.brief_title}</p>
                      </div>
                      <div className="text-sm text-right">
                        <span className="inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                          Brand Brief
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
  );
};

export default ContentBrowser;
