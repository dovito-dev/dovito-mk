import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CreditCard, 
  User, 
  Link as LinkIcon, 
  Mail, 
  Loader2, 
  RefreshCw,
  Upload,
  Edit,
  AlertCircle
} from 'lucide-react';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'profile');

  useEffect(() => {
    if (tabParam && ['profile', 'billing', 'connections'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      
      <Card className="border-0 shadow-sm">
        <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="w-full">
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
              <LinkIcon className="h-4 w-4" />
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
  const { user } = useAuth();
  const { data: profile, refetch } = useProfile();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [saving, setSaving] = useState(false);
  const [verifyingSent, setVerifyingSent] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.full_name) {
      const nameParts = profile.full_name.split(' ');
      if (nameParts.length >= 1) {
        setFirstName(nameParts[0]);
        if (nameParts.length >= 2) {
          setLastName(nameParts.slice(1).join(' '));
        }
      }
    }
    
    if (profile?.email) {
      setEmail(profile.email);
    }
    
    setImageUrl(profile?.profile_image_url || profile?.avatar_url || null);
  }, [profile]);

  const getUserInitials = () => {
    if (!firstName && !lastName && profile?.full_name) {
      const nameParts = profile.full_name.trim().split(' ');
      if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    }
    
    if (!firstName && !lastName) return user?.email?.charAt(0).toUpperCase() || 'U';
    
    return (firstName.charAt(0) + (lastName ? lastName.charAt(0) : '')).toUpperCase();
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      if (email !== profile?.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: email,
        });
        
        if (authError) throw authError;

        await supabase
          .from('profiles')
          .update({ 
            email_verification_pending: true,
            last_verification_sent: new Date().toISOString()
          })
          .eq('id', user.id);
      }
      
      const fullName = `${firstName} ${lastName}`.trim();
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      await refetch();
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "There was a problem updating your profile.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResendVerification = async () => {
    if (!user) return;
    
    setVerifyingSent(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) throw error;
      
      await supabase
        .from('profiles')
        .update({ 
          last_verification_sent: new Date().toISOString()
        })
        .eq('id', user.id);
      
      toast({
        title: "Verification email sent",
        description: "A new verification email has been sent to your email address."
      });
    } catch (error: any) {
      toast({
        title: "Error sending verification",
        description: error.message || "There was a problem sending the verification email.",
        variant: "destructive"
      });
    } finally {
      setVerifyingSent(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadProfileImage = async () => {
    if (!selectedFile || !user) return;
    
    setUploadingImage(true);
    try {
      const fileName = `${user.id}/${Date.now()}-${selectedFile.name}`;
      const { error: uploadError, data } = await supabase.storage
        .from('profile_images')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('profile_images')
        .getPublicUrl(fileName);
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          profile_image_url: publicUrl
        })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      setImageUrl(publicUrl);
      await refetch();
      
      toast({
        title: "Profile image updated",
        description: "Your profile image has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message || "There was a problem uploading your profile image.",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadProfileImage();
    }
  }, [selectedFile]);

  return (
    <div className="px-4 py-2">
      <CardHeader className="px-2">
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your profile information. This will be used across the platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 mb-4 border-4 border-background">
              <AvatarImage src={imageUrl} />
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-black/30 rounded-full"></div>
              <label htmlFor="profile-image" className="relative z-10 cursor-pointer">
                <div className="flex items-center justify-center gap-1 bg-primary text-white p-1 rounded-full">
                  <Edit className="h-4 w-4" />
                </div>
              </label>
              <input 
                type="file" 
                id="profile-image" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploadingImage}
              />
            </div>
            
            {uploadingImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/50 rounded-full"></div>
                <Loader2 className="animate-spin h-8 w-8 text-white z-10" />
              </div>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            Click the image to upload a new profile picture
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              placeholder="Enter your first name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              placeholder="Enter your last name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            {profile?.email_verification_pending && (
              <div className="mt-2 flex items-center text-amber-600 dark:text-amber-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Waiting for verification</span>
                <Button 
                  variant="link" 
                  className="ml-2 h-auto p-0 text-sm"
                  onClick={handleResendVerification}
                  disabled={verifyingSent}
                >
                  {verifyingSent ? (
                    <><Loader2 className="mr-1 h-3 w-3 animate-spin" /> Sending...</>
                  ) : (
                    <>Resend verification email</>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input 
            id="company" 
            placeholder="Your company name" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">Job Title</Label>
          <Input 
            id="role" 
            placeholder="Your job title" 
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        
        <Separator className="my-4" />
        
        <h3 className="text-lg font-medium">Email Signature Information</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This information will be used to create your email signature
        </p>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            placeholder="+1 (555) 000-0000" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input 
            id="website" 
            placeholder="https://yourwebsite.com" 
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        
        <Button className="mt-4" onClick={handleSaveProfile} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </CardContent>
    </div>
  );
};

const BillingSettings: React.FC = () => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPaymentMethods();
    }
  }, [user]);

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('user_id', user?.id)
        .order('is_default', { ascending: false });
        
      if (error) throw error;
      
      setPaymentMethods(data || []);
    } catch (error: any) {
      console.error('Error fetching payment methods:', error);
      toast({
        title: "Error loading payment information",
        description: error.message || "There was a problem loading your payment information.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayment = () => {
    toast({
      title: "Payment update",
      description: "This would open a payment update modal integrated with your payment processor."
    });
  };

  const handleChangePlan = () => {
    toast({
      title: "Change plan",
      description: "This would redirect to the subscription page."
    });
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Cancel subscription",
      description: "This would trigger your subscription cancellation process."
    });
  };

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
            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">
              {profile?.plan_name === 'Free' ? 'Free' : 'Active'}
            </span>
          </div>
          <p className="text-lg font-bold">{profile?.plan_name || 'Free'}</p>
          {profile?.plan_name !== 'Free' && (
            <>
              <p className="text-sm text-muted-foreground">$99 per month</p>
              <p className="text-sm text-muted-foreground mt-2">
                Next billing date: {profile?.plan_ends ? new Date(profile.plan_ends).toLocaleDateString() : 'N/A'}
              </p>
            </>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={handleChangePlan}>Change Plan</Button>
          {profile?.plan_name !== 'Free' && (
            <Button 
              variant="outline" 
              className="text-destructive border-destructive hover:bg-destructive/10"
              onClick={handleCancelSubscription}
            >
              Cancel Subscription
            </Button>
          )}
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h3 className="font-medium mb-4">Payment Method</h3>
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center gap-4 bg-muted/50 p-4 rounded-md">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <p className="font-medium">•••• •••• •••• {method.last_four || '4242'}</p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expires_at || '12/2025'}
                    </p>
                  </div>
                  <Button variant="outline" className="ml-auto" onClick={handleUpdatePayment}>
                    Update
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted/50 p-4 rounded-md text-center">
              <p className="text-muted-foreground mb-2">No payment methods found</p>
              <Button variant="outline" onClick={handleUpdatePayment}>
                Add Payment Method
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-4">Billing History</h3>
          <div className="border rounded-md">
            {profile?.plan_name !== 'Free' ? (
              <div className="divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-sm text-muted-foreground">{profile?.plan_name} Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$99.00</p>
                    <Button variant="link" className="p-0 h-auto">Download</Button>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-sm text-muted-foreground">{profile?.plan_name} Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$99.00</p>
                    <Button variant="link" className="p-0 h-auto">Download</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-muted-foreground">No billing history available</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  );
};

const ConnectionSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const connectedAccounts = [
    { 
      id: 'google', 
      name: 'Google', 
      connected: false, 
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
      connected: false, 
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

  useEffect(() => {
    if (user) {
      fetchConnections();
    }
  }, [user]);

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .eq('user_id', user?.id);
        
      if (error) throw error;
      
      setConnections(data || []);
    } catch (error: any) {
      console.error('Error fetching connections:', error);
      toast({
        title: "Error loading connections",
        description: error.message || "There was a problem loading your connected accounts.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (accountId: string) => {
    const existingConnection = connections.find(conn => conn.provider === accountId);
    
    if (existingConnection) {
      try {
        const { error } = await supabase
          .from('connections')
          .delete()
          .eq('id', existingConnection.id);
          
        if (error) throw error;
        
        toast({
          title: "Account disconnected",
          description: `Your ${accountId} account has been disconnected.`
        });
        
        await fetchConnections();
      } catch (error: any) {
        toast({
          title: "Error disconnecting account",
          description: error.message || `There was a problem disconnecting your ${accountId} account.`,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Connect account",
        description: `This would start the OAuth flow for ${accountId}.`
      });
    }
  };

  const getConnectionStatus = (accountId: string) => {
    return connections.some(conn => conn.provider === accountId);
  };

  return (
    <div className="px-4 py-2">
      <CardHeader className="px-2">
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>
          Connect your accounts to enable additional features and integrations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {connectedAccounts.map((account) => {
              const isConnected = getConnectionStatus(account.id);
              
              return (
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
                        {isConnected ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={isConnected ? "outline" : "default"}
                    onClick={() => handleConnect(account.id)}
                  >
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              );
            })}
          </>
        )}
      </CardContent>
    </div>
  );
};

export default Settings;
