import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Zap, Target, Users, BarChart } from 'lucide-react';

const Index = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Generate Professional <span className="gradient-text">Brand Briefs</span> in Minutes
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your business identity with AI-powered brand briefs. Just enter your company name and website.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" className="gradient-bg">
                Create Your Brief
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                View Examples
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Showcase */}
        <div className="border rounded-xl p-8 shadow-sm bg-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to your comprehensive brand brief</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                <FileText className="text-white h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Enter Your Details</h3>
              <p className="text-muted-foreground">Provide your company name and website to get started</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                <Zap className="text-white h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">Our system analyzes your website and market positioning</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-4">
                <Target className="text-white h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Get Your Brief</h3>
              <p className="text-muted-foreground">Receive a comprehensive brand brief within minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Why Use Our Brand Brief Generator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how our tool helps businesses establish clear brand identities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
            <Users className="h-10 w-10 text-brand-blue mb-4" />
            <h3 className="text-xl font-semibold mb-2">Target Audience Insights</h3>
            <p className="text-muted-foreground">
              Identify your ideal customers and understand their needs, preferences, and pain points.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
            <Target className="h-10 w-10 text-brand-purple mb-4" />
            <h3 className="text-xl font-semibold mb-2">Brand Positioning</h3>
            <p className="text-muted-foreground">
              Define how your brand differs from competitors and resonates with your audience.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
            <BarChart className="h-10 w-10 text-brand-lightBlue mb-4" />
            <h3 className="text-xl font-semibold mb-2">Competitive Analysis</h3>
            <p className="text-muted-foreground">
              Get insights on your industry landscape and how to stand out from competitors.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
            <FileText className="h-10 w-10 text-brand-pink mb-4" />
            <h3 className="text-xl font-semibold mb-2">Brand Voice & Values</h3>
            <p className="text-muted-foreground">
              Establish a consistent communication style and core values that represent your brand.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="gradient-bg rounded-xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Define Your Brand?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses who've clarified their brand identity with our tool.
          </p>
          <Link to="/create">
            <Button size="lg" variant="secondary" className="bg-white text-brand-blue hover:bg-gray-100">
              Generate Your Brief Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
