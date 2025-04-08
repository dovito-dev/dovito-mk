
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Mail, Mic, Share2, Clock } from 'lucide-react';
import { FeatureCard } from '@/components/ui/feature-card';

const ToolsSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-3 gradient-text">AI Content Creation Tools</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-6">
          Create professional content for your brand with our suite of AI-powered tools
        </p>
        
        {/* Add prominent Get Started button */}
        <Link to="/get-started">
          <Button size="lg" className="bg-secondary text-white hover:bg-secondary/80 rounded-full px-8 shadow-md hover:shadow-lg">
            Get Started
          </Button>
        </Link>
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
      
      {/* Add call to action at the bottom */}
      <div className="mt-16 text-center pb-10">
        <h2 className="text-2xl font-semibold mb-4">Ready to supercharge your content creation?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Start creating professional marketing content for your brand today with our AI-powered tools.
        </p>
        <Link to="/get-started">
          <Button size="lg" className="gradient-bg">
            Start Your Free Trial
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolsSection;
