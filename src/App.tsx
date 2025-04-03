
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import BrandBriefs from "./pages/BrandBriefs";
import EmailCopywriter from "./pages/EmailCopywriter";
import GeneratedEmails from "./pages/GeneratedEmails";
import EmailDetail from "./pages/EmailDetail";
import AgentVoice from "./pages/AgentVoice";
import SocialMedia from "./pages/SocialMedia";
import CreateBrief from "./pages/CreateBrief";
import Dashboard from "./pages/Dashboard";
import BriefDetail from "./pages/BriefDetail";
import GetStarted from "./pages/GetStarted";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/brand-briefs" element={<Layout><BrandBriefs /></Layout>} />
          <Route path="/email-copywriter" element={<Layout><EmailCopywriter /></Layout>} />
          <Route path="/generated-emails" element={<Layout><GeneratedEmails /></Layout>} />
          <Route path="/email/:id" element={<Layout><EmailDetail /></Layout>} />
          <Route path="/agent-voice" element={<Layout><AgentVoice /></Layout>} />
          <Route path="/social-media" element={<Layout><SocialMedia /></Layout>} />
          <Route path="/create" element={<Layout><CreateBrief /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/brief/:id" element={<Layout><BriefDetail /></Layout>} />
          <Route path="/get-started" element={<Layout><GetStarted /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
