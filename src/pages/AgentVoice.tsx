
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Mic, Upload, File } from 'lucide-react';

const AgentVoice = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
          <Mic className="text-white h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Agent Voice Setup</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Create consistent voice and tone guidelines for your customer service agents
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
          <p className="text-muted-foreground mb-6">
            Upload your existing brand guidelines or communication samples
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="mb-2">Drag and drop files here or</p>
            <Button variant="outline">Browse Files</Button>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Uploaded Files</h3>
            <div className="text-muted-foreground text-sm">
              No files uploaded yet
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Manual Setup</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block font-medium mb-1">Your Prompt</label>
              <Input
                id="prompt"
                placeholder="e.g., Create a friendly but professional tone for our IT support team"
              />
            </div>
            
            <div>
              <label htmlFor="output" className="block font-medium mb-1">Your Desired Output</label>
              <Textarea
                id="output"
                placeholder="Describe in detail how you want your agents to sound in their communications..."
                className="min-h-[200px]"
              />
            </div>
            
            <Button className="w-full gradient-bg">Generate Voice Guidelines</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentVoice;
