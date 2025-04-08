
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Mail, Mic, Share2 } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/create">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Create Brand Brief
          </Button>
        </Link>
        <Link to="/email-copywriter">
          <Button variant="outline" className="w-full justify-start">
            <Mail className="mr-2 h-4 w-4" />
            Write Email
          </Button>
        </Link>
        <Link to="/agent-voice">
          <Button variant="outline" className="w-full justify-start">
            <Mic className="mr-2 h-4 w-4" />
            Define Agent Voice
          </Button>
        </Link>
        <Link to="/social-media">
          <Button variant="outline" className="w-full justify-start">
            <Share2 className="mr-2 h-4 w-4" />
            Create Social Post
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
