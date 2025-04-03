
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

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
            <Twitter className="text-white h-5 w-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center">
            <Linkedin className="text-white h-5 w-5" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3">Social Media Content Creator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Generate engaging content optimized for multiple social platforms
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl border">
        <h2 className="font-semibold mb-4">Select Platforms</h2>
        
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={isPlatformSelected('all') ? "default" : "outline"}
            className={isPlatformSelected('all') ? "gradient-bg" : ""}
            onClick={() => togglePlatform('all')}
          >
            All Platforms
          </Button>
          
          <Button
            variant={isPlatformSelected('instagram') ? "default" : "outline"}
            className={isPlatformSelected('instagram') ? "bg-[#E1306C] hover:bg-[#C13584]" : ""}
            onClick={() => togglePlatform('instagram')}
          >
            <Instagram className="h-4 w-4 mr-2" /> Instagram
          </Button>
          
          <Button
            variant={isPlatformSelected('facebook') ? "default" : "outline"}
            className={isPlatformSelected('facebook') ? "bg-[#1877F2] hover:bg-[#166FE5]" : ""}
            onClick={() => togglePlatform('facebook')}
          >
            <Facebook className="h-4 w-4 mr-2" /> Facebook
          </Button>
          
          <Button
            variant={isPlatformSelected('twitter') ? "default" : "outline"}
            className={isPlatformSelected('twitter') ? "bg-[#000000] hover:bg-[#333333]" : ""}
            onClick={() => togglePlatform('twitter')}
          >
            <Twitter className="h-4 w-4 mr-2" /> X
          </Button>
          
          <Button
            variant={isPlatformSelected('linkedin') ? "default" : "outline"}
            className={isPlatformSelected('linkedin') ? "bg-[#0A66C2] hover:bg-[#004182]" : ""}
            onClick={() => togglePlatform('linkedin')}
          >
            <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
          </Button>
        </div>
        
        <h2 className="font-semibold mb-4">Content Generation</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Button size="lg" className="gradient-bg h-auto py-6">
            <span className="text-lg">AutoGenerate</span>
            <span className="block text-xs mt-1">AI will create ideas for you</span>
          </Button>
          
          <Button size="lg" variant="outline" className="h-auto py-6">
            <span className="text-lg">Use My Idea</span>
            <span className="block text-xs mt-1">Start with your own concept</span>
          </Button>
        </div>
        
        <div className="mt-8">
          <label htmlFor="topic" className="block font-medium mb-2">Content Topic or Idea (Optional)</label>
          <Textarea
            id="topic"
            placeholder="Describe your content idea here..."
            className="min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
