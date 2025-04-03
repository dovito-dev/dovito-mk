
import { create } from 'zustand';

export interface Brief {
  id: string;
  title: string;
  brandName: string;
  industry: string;
  type: string;
  content: string;
  createdAt: string;
}

interface BriefState {
  briefs: Brief[];
  addBrief: (brief: Brief) => void;
  getBrief: (id: string) => Brief | undefined;
}

export const useBriefStore = create<BriefState>((set, get) => ({
  briefs: [
    {
      id: '1',
      title: 'Social Media Brand Guidelines',
      brandName: 'Acme Tech',
      industry: 'Technology',
      type: 'Brand Voice',
      content: `Brand Voice: Innovative, Knowledgeable, Approachable

Target Audience: Tech professionals and decision makers ages 25-45

Key Messaging:
- Focus on how our solutions solve real business problems
- Highlight the innovative aspects of our technology
- Emphasize ease of implementation and customer support

Visual Guidelines:
- Use our brand blue (#0062FF) as the primary color
- Support with light gray (#F2F4F8) and dark navy (#171C30)
- Image style should be clean, modern with people using technology in professional environments

Post Types:
- Product announcements: Feature clear product shots with concise value proposition
- How-to content: Step-by-step guides with screenshots or short video clips
- Customer stories: Quote cards and brief success metrics
- Industry news: Share industry developments with our expert perspective

Tone by Platform:
- LinkedIn: Professional, insightful, educational
- Twitter: Conversational, quick tips, industry commentary
- Instagram: Visual case studies, behind-the-scenes, team culture
- Facebook: Community-focused, longer-form educational content

Hashtag Strategy:
Primary: #AcmeTech #TechSolutions
Secondary: #BusinessTech #InnovationMatters #TechTrends

Response Guidelines:
- Reply to all comments within 4 hours during business hours
- Address negative feedback with empathy and solutions
- Acknowledge positive feedback and build community`,
      createdAt: '2023-04-12T10:30:00Z'
    },
    {
      id: '2',
      title: 'Website Content Brief',
      brandName: 'Green Living',
      industry: 'Sustainable Products',
      type: 'Content Strategy',
      content: `Website Content Strategy Brief

Brand Values:
- Sustainability
- Transparency
- Quality
- Education

Target Audience:
- Primary: Environmentally-conscious consumers (25-45)
- Secondary: Businesses looking for sustainable alternatives

Website Goals:
1. Educate visitors about environmental impact of everyday products
2. Showcase our sustainable product line
3. Build credibility through transparency about sourcing and manufacturing
4. Convert visitors to customers or newsletter subscribers

Content Tone: Informative, optimistic, straightforward

Key Pages:
- Homepage: Clear value proposition, featured products, sustainability impact counter
- About Us: Our story, mission, and manufacturing process (include video tour)
- Product Pages: Benefits-focused descriptions, sustainability metrics for each product, user reviews
- Sustainability Hub: Educational blog posts, guides, and resources
- FAQ: Focus on product usage, materials, shipping, and environmental impact

SEO Strategy:
- Primary keywords: sustainable home products, eco-friendly alternatives, plastic-free living
- Secondary keywords: zero-waste household, biodegradable products, sustainable living tips

Call-to-Actions:
- Primary: "Shop Now" and "Learn More"
- Secondary: "Subscribe to our Newsletter" and "Calculate Your Impact"

Content Types:
- Product descriptions
- Educational blog posts
- How-to guides
- Impact reports
- Customer testimonials
- Video demonstrations

Content Calendar:
- Weekly blog posts (Tuesdays)
- Monthly impact reports
- Quarterly deep-dive sustainability guides`,
      createdAt: '2023-05-22T14:15:00Z'
    },
  ],
  addBrief: (brief) => set((state) => ({ 
    briefs: [...state.briefs, brief] 
  })),
  getBrief: (id) => {
    const { briefs } = get();
    return briefs.find(brief => brief.id === id);
  }
}));
