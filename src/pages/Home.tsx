
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, Mic, Instagram, Facebook, Twitter, Linkedin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ToolCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  comingSoon?: boolean;
};

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, to, comingSoon = false }) => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      {comingSoon ? (
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>Coming Soon</span>
        </div>
      ) : (
        <Link to={to}>
          <Button className="gradient-bg">Get Started</Button>
        </Link>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All-in-One <span className="gradient-text">Marketing Tools</span> for Your Business
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate professional marketing materials in minutes with our AI-powered tools
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
          <ToolCard
            title="Brand Briefs"
            description="Create comprehensive brand briefs that define your identity and positioning"
            icon={<FileText className="text-white h-6 w-6" />}
            to="/brand-briefs"
          />
          
          <ToolCard
            title="Email Copywriter"
            description="Generate persuasive email content tailored to your audience"
            icon={<Mail className="text-white h-6 w-6" />}
            to="/email-copywriter"
          />
          
          <ToolCard
            title="Agent Voice Setup"
            description="Create consistent voice and tone guides for your service agents"
            icon={<Mic className="text-white h-6 w-6" />}
            to="/agent-voice"
          />
          
          <ToolCard
            title="Social Media Content Creator"
            description="Create engaging content optimized for multiple social platforms"
            icon={<Instagram className="text-white h-6 w-6" />}
            to="/social-media"
          />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="gradient-bg rounded-xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Supercharge Your Marketing</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our AI tools help you create professional marketing materials in a fraction of the time.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-brand-blue hover:bg-gray-100">
            Explore All Tools
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
