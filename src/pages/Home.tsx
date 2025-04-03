
import React from 'react';
import { FileText, Mail, Mic, Share2, Clock } from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-3 gradient-text">AI Content Creation Tools</h1>
        <p className="text-xl text-gray-600 max-w-xl mx-auto">
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
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>
    </div>
  );
};

export default Home;
