
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Target, Users, BarChart } from 'lucide-react';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="max-w-full mx-auto">
      {/* Hero Section */}
      <HeroSection
        title="Financial"
        subtitle="infrastructure to grow your revenue"
        description="Join the millions of companies that use our services to accept payments online and in person, embed financial services, power custom revenue models, and build a more profitable business."
        showEmailCapture={true}
      />

      {/* Feature Showcase */}
      <div className="max-w-5xl mx-auto mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to your comprehensive brand brief</p>
        </div>
        
        <div className="stripe-card p-8 animate-fade-in mb-16" style={{ animationDelay: '0.2s' }}>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full step-icon-bg flex items-center justify-center mb-4">
                <FileText className="text-white h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Enter Your Details</h3>
              <p className="text-muted-foreground">Provide your company name and website to get started</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full step-icon-bg flex items-center justify-center mb-4">
                <Zap className="text-white h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">Our system analyzes your website and market positioning</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full step-icon-bg flex items-center justify-center mb-4">
                <Target className="text-white h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Get Your Brief</h3>
              <p className="text-muted-foreground">Receive a comprehensive brand brief within minutes</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Why Use Our Brand Brief Generator</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how our tool helps businesses establish clear brand identities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="stripe-card p-6 hover:shadow-md transition-all">
              <Users className="h-10 w-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Target Audience Insights</h3>
              <p className="text-muted-foreground">
                Identify your ideal customers and understand their needs, preferences, and pain points.
              </p>
            </div>
            
            <div className="stripe-card p-6 hover:shadow-md transition-all">
              <Target className="h-10 w-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Brand Positioning</h3>
              <p className="text-muted-foreground">
                Define how your brand differs from competitors and resonates with your audience.
              </p>
            </div>
            
            <div className="stripe-card p-6 hover:shadow-md transition-all">
              <BarChart className="h-10 w-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Competitive Analysis</h3>
              <p className="text-muted-foreground">
                Get insights on your industry landscape and how to stand out from competitors.
              </p>
            </div>
            
            <div className="stripe-card p-6 hover:shadow-md transition-all">
              <FileText className="h-10 w-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Brand Voice & Values</h3>
              <p className="text-muted-foreground">
                Establish a consistent communication style and core values that represent your brand.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20">
          <div className="rounded-xl p-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/20 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Define Your Brand?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
              Join hundreds of businesses who've clarified their brand identity with our tool.
            </p>
            <Link to="/create">
              <Button variant="stripe-primary" size="lg" className="rounded-full">
                Generate Your Brief Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
