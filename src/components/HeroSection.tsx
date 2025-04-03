
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type HeroSectionProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  description: string;
  cta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  showEmailCapture?: boolean;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  cta,
  secondaryCta,
  showEmailCapture = false,
}) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Handle email subscription logic here
    setEmail('');
  };

  return (
    <div className="hero-gradient relative overflow-hidden pt-20 pb-16 md:pb-32 md:pt-32">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 -left-[10%] w-[45%] h-[80%] rounded-full bg-purple-600 blur-[120px]" />
        <div className="absolute top-[5%] right-0 w-[35%] h-[40%] rounded-full bg-blue-600 blur-[120px]" />
        <div className="absolute bottom-0 left-[20%] w-[40%] h-[40%] rounded-full bg-red-600 blur-[120px]" />
        <div className="absolute -bottom-[10%] right-[10%] w-[40%] h-[60%] rounded-full bg-yellow-400 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mt-6 mb-10 flex justify-center">
            <div className="relative rounded-full px-4 py-2 text-sm leading-6 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-700 dark:text-gray-200 hover:bg-white/20 transition duration-300">
              Sessions 2025 • May 6-8 • {' '}
              <Link to="/register" className="inline-flex items-center font-semibold text-indigo-400">
                Register now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold tracking-tight sm:text-7xl mb-8">
            <span className="text-gray-900 dark:text-white">{title}</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">{subtitle}</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            {showEmailCapture ? (
              <form onSubmit={handleSubmit} className="flex max-w-md gap-x-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="min-w-0 flex-auto rounded-full border-0 bg-white/10 backdrop-blur-sm px-6 py-4 text-gray-900 shadow-md ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-white"
                />
                <Button type="submit" className="rounded-full bg-indigo-600 px-6 py-6 shadow-sm hover:bg-indigo-700 flex-none">
                  Start now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            ) : (
              <>
                {cta && (
                  <Link to={cta.link}>
                    <Button size="lg" className="rounded-full px-6 py-6 shadow-md">
                      {cta.text}
                    </Button>
                  </Link>
                )}
                {secondaryCta && (
                  <Link to={secondaryCta.link}>
                    <Button variant="outline" size="lg" className="rounded-full bg-white/20 backdrop-blur-sm border border-white/40 px-6 py-6 shadow-md hover:bg-white/30">
                      {secondaryCta.text}
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Diagonal section divider */}
      <div className="absolute -bottom-5 left-0 right-0 h-16 bg-gradient-to-br from-white via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transform -skew-y-2"></div>
    </div>
  );
};

export default HeroSection;
