
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CreditCard, User, Link, Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <Card className="border-0 shadow-sm">
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-2 p-1 bg-muted/50">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span>Connections</span>
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[75vh]">
            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
            
            <TabsContent value="billing">
              <BillingSettings />
            </TabsContent>
            
            <TabsContent value="connections">
              <ConnectionSettings />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </Card>
    </div>
  );
};

const ProfileSettings: React.FC = () => {
  return (
    <div className="px-4 py-2">
      <CardHeader className="px-2">
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your profile information. This will be used across the platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="Enter your first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Enter your last name" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="your@email.com" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Your company name" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">Job Title</Label>
          <Input id="role" placeholder="Your job title" />
        </div>
        
        <Separator className="my-4" />
        
        <h3 className="text-lg font-medium">Email Signature Information</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This information will be used to create your email signature
        </p>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="+1 (555) 000-0000" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" placeholder="https://yourwebsite.com" />
        </div>
        
        <Button className="mt-4">Save Changes</Button>
      </CardContent>
    </div>
  );
};

const BillingSettings: React.FC = () => {
  return (
    <div className="px-4 py-2">
      <CardHeader className="px-2">
        <CardTitle>Subscription Management</CardTitle>
        <CardDescription>
          Manage your current subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Current Plan</h3>
            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">Active</span>
          </div>
          <p className="text-lg font-bold">All Access</p>
          <p className="text-sm text-muted-foreground">$99 per month</p>
          <p className="text-sm text-muted-foreground mt-2">Next billing date: November 15, 2023</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline">Change Plan</Button>
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">Cancel Subscription</Button>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h3 className="font-medium mb-4">Payment Method</h3>
          <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-md">
            <CreditCard className="h-5 w-5" />
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2025</p>
            </div>
            <Button variant="outline" className="ml-auto">Update</Button>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-4">Billing History</h3>
          <div className="border rounded-md divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">October 15, 2023</p>
                <p className="text-sm text-muted-foreground">All Access Monthly</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$99.00</p>
                <Button variant="link" className="p-0 h-auto">Download</Button>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">September 15, 2023</p>
                <p className="text-sm text-muted-foreground">All Access Monthly</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$99.00</p>
                <Button variant="link" className="p-0 h-auto">Download</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

const ConnectionSettings: React.FC = () => {
  const connectedAccounts = [
    { 
      id: 'google', 
      name: 'Google', 
      connected: true, 
      iconPath: "https://www.google.com/gmail/about/static/images/logo-gmail.png"
    },
    { 
      id: 'outlook', 
      name: 'Microsoft Outlook', 
      connected: false, 
      iconPath: "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg"
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      connected: false, 
      iconPath: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      connected: true, 
      iconPath: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
    },
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      connected: false, 
      iconPath: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
    },
    { 
      id: 'twitter', 
      name: 'X (Twitter)', 
      connected: false, 
      iconPath: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
    },
  ];

  return (
    <div className="px-4 py-2">
      <CardHeader className="px-2">
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>
          Connect your accounts to enable additional features and integrations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {connectedAccounts.map((account) => (
          <div key={account.id} className="flex items-center justify-between p-4 border rounded-md bg-background hover:bg-muted/20 transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-white">
                <AvatarImage src={account.iconPath} alt={account.name} className="p-1" />
                <AvatarFallback className="bg-muted">
                  {account.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{account.name}</p>
                <p className="text-sm text-muted-foreground">
                  {account.connected ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            <Button size="sm" variant={account.connected ? "outline" : "default"}>
              {account.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        ))}
      </CardContent>
    </div>
  );
};

export default Settings;
