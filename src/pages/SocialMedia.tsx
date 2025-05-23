
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Facebook, X, Linkedin } from 'lucide-react';
import SubscriptionGate from '@/components/SubscriptionGate';

const SocialMedia = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => {
      if (platform === 'all') {
        return ['all'];
      }
      
      const newSelection = prev.filter(p => p !== 'all');
      
      if (prev.includes(platform)) {
        return newSelection.filter(p => p !== platform);
      } else {
        return [...newSelection, platform];
      }
    });
  };

  const isPlatformSelected = (platform: string) => {
    if (selectedPlatforms.includes('all') && platform !== 'all') return true;
    return selectedPlatforms.includes(platform);
  };

  return (
    <SubscriptionGate>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#E1306C] flex items-center justify-center">
              <Instagram className="text-white h-5 w-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center">
              <Facebook className="text-white h-5 w-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center">
              <X className="text-white h-5 w-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center">
              <Linkedin className="text-white h-5 w-5" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3">Social Media Content Creator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate engaging content optimized for multiple social platforms
          </p>
        </div>

        <div className="glass-card p-8">
          <h2 className="font-semibold mb-4">Select Platforms</h2>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              variant={isPlatformSelected('all') ? "default" : "outline"}
              className={isPlatformSelected('all') 
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 rounded-full" 
                : "rounded-full"}
              onClick={() => togglePlatform('all')}
            >
              All Platforms
            </Button>
            
            <Button
              variant={isPlatformSelected('instagram') ? "default" : "outline"}
              className={isPlatformSelected('instagram') 
                ? "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:from-[#E1306C] hover:to-[#C13584] rounded-full" 
                : "rounded-full"}
              onClick={() => togglePlatform('instagram')}
            >
              <Instagram className="h-4 w-4 mr-2" /> Instagram
            </Button>
            
            <Button
              variant={isPlatformSelected('facebook') ? "default" : "outline"}
              className={isPlatformSelected('facebook') 
                ? "bg-gradient-to-r from-[#1877F2] via-[#166FE5] to-[#0E62DA] text-white hover:from-[#166FE5] hover:to-[#0D54BC] rounded-full" 
                : "rounded-full"}
              onClick={() => togglePlatform('facebook')}
            >
              <Facebook className="h-4 w-4 mr-2" /> Facebook
            </Button>
            
            <Button
              variant={isPlatformSelected('twitter') ? "default" : "outline"}
              className={isPlatformSelected('twitter') 
                ? "bg-gradient-to-r from-[#000000] to-[#333333] text-white hover:from-[#1A1A1A] hover:to-[#4D4D4D] rounded-full" 
                : "rounded-full"}
              onClick={() => togglePlatform('twitter')}
            >
              <X className="h-4 w-4 mr-2" /> X
            </Button>
            
            <Button
              variant={isPlatformSelected('linkedin') ? "default" : "outline"}
              className={isPlatformSelected('linkedin') 
                ? "bg-gradient-to-r from-[#0A66C2] to-[#0077B5] text-white hover:from-[#004182] hover:to-[#0064A0] rounded-full" 
                : "rounded-full"}
              onClick={() => togglePlatform('linkedin')}
            >
              <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
            </Button>
          </div>
          
          <h2 className="font-semibold mb-4">Content Generation</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Button size="lg" className="purple-button h-auto py-6 rounded-full">
              <span className="text-lg">AutoGenerate</span>
              <span className="block text-xs mt-1">AI will create ideas for you</span>
            </Button>
            
            <Button size="lg" variant="outline" className="h-auto py-6 rounded-full border-brand-purple/20 text-brand-purple hover:bg-brand-softPurple/20">
              <span className="text-lg">Use My Idea</span>
              <span className="block text-xs mt-1">Start with your own concept</span>
            </Button>
          </div>
          
          <div className="mt-8">
            <label htmlFor="topic" className="block font-medium mb-2">Content Topic or Idea (Optional)</label>
            <Textarea
              id="topic"
              placeholder="Describe your content idea here..."
              className="min-h-[120px] rounded-xl focus:ring-brand-purple/30 focus:border-brand-purple/30"
            />
          </div>
        </div>
      </div>
    </SubscriptionGate>
  );
};

export default SocialMedia;
