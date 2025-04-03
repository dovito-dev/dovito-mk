
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  addBrief: (brief: Omit<Brief, 'id' | 'createdAt'>) => string;
  updateBrief: (id: string, data: Partial<Brief>) => void;
  getBrief: (id: string) => Brief | undefined;
  addExampleBrief: () => void;
  hasExampleBrief: () => boolean;
}

const appleExampleContent = `
⸻

Apple Inc. – Brand Brief

⸻

Executive Summary

Apple Inc. embodies the spirit of innovation and simplicity. With a timeless logo recognized around the world—a clean, minimalist apple with a bite—the company redefines technology with products that are as beautifully designed as they are powerful. Apple is a global leader in hardware, software, and services, driven by a singular mission: to create products that enrich people's lives through intuitive design and groundbreaking technology. Founded on the belief that technology should be accessible and elegantly simple, Apple consistently delivers products that integrate seamlessly into daily life. This brief outlines Apple's mission, core values, target audiences, product and service offerings, brand positioning, visual identity, and competitive landscape, providing a comprehensive reference for both internal alignment and external communication.

⸻

Mission & Vision

Mission:
Apple's mission is to deliver the best user experience by combining innovative hardware, sophisticated software, and seamless services. Every product is designed to empower users, inspire creativity, and enrich everyday life.

Vision:
Apple envisions a world where technology transcends the ordinary—where every device is a natural extension of the user. We aim to lead the transformation of how people connect, create, and experience the world by continually pushing the boundaries of innovation and design.

⸻

Core Values & Principles
	•	Simplicity:
At Apple, simplicity is not merely a design goal—it's a philosophy. We believe that technology should be intuitive and accessible, stripping away unnecessary complexity to reveal the beauty of streamlined functionality.
	•	Innovation:
Innovation is at the heart of everything we do. From revolutionary product designs to cutting-edge research in augmented reality, artificial intelligence, and beyond, Apple is relentlessly committed to pioneering new technologies that change the way we live and work.
	•	Quality & Craftsmanship:
Every Apple product reflects meticulous attention to detail and a dedication to excellence. We believe that superior quality, built through rigorous testing and refined craftsmanship, is the foundation of trust and long-term customer satisfaction.
	•	Integration:
Our products are designed as part of a cohesive ecosystem. The seamless integration of hardware, software, and services ensures that every Apple experience is consistent, secure, and uniquely powerful.
	•	Privacy & Security:
Apple prioritizes the privacy and security of its users. We build products that protect personal data and empower individuals to control their digital lives, making privacy a core aspect of our identity.
	•	Sustainability:
We are committed to protecting our planet. Apple continually strives to reduce environmental impact through sustainable practices, energy-efficient designs, and a dedication to reducing our carbon footprint.
	•	Empowerment & Accessibility:
Apple's technology is designed to empower everyone—from creative professionals to everyday users. We are dedicated to making our products accessible, ensuring that innovative design and breakthrough technology benefit all.

⸻

Audience Profiles

Apple's products and services resonate with a diverse global audience that values innovation, design, and seamless user experiences. Key audience segments include:
	•	Creative Professionals & Designers:
Individuals who demand powerful tools for creativity and productivity. They appreciate the blend of cutting-edge technology with intuitive design that enables them to bring ideas to life effortlessly.
	•	Everyday Consumers:
A broad audience that spans from tech enthusiasts to casual users. These customers seek reliable, beautifully designed products that simplify daily life and integrate naturally with their lifestyles.
	•	Educational Institutions & Students:
Learners and educators who rely on Apple's technology to foster creativity, collaboration, and digital literacy in classrooms and remote learning environments.
	•	Enterprise & Business Leaders:
Organizations that value secure, scalable solutions for communication, collaboration, and productivity. Apple's ecosystem supports business needs with robust tools, seamless integration, and top-notch security.
	•	Health & Wellness Advocates:
Users who engage with Apple's wearable technology and health services to monitor well-being, stay active, and lead healthier lives through data-driven insights.

⸻

Products & Solutions

Apple's portfolio spans an integrated ecosystem that redefines the way technology supports life and work:
	•	Hardware:
	•	Mac: High-performance desktops and laptops that combine power with sleek design for creative and professional use.
	•	iPhone: The world's most advanced smartphone, setting benchmarks for user experience and innovation.
	•	iPad: Versatile tablets that empower users in education, creative pursuits, and productivity.
	•	Apple Watch: A wearable device that transforms personal health and fitness through intuitive design and real-time data.
	•	AirPods & HomePod: Premium audio products designed to deliver immersive sound experiences and seamless connectivity.
	•	Software:
	•	iOS, macOS, watchOS, and tvOS: Operating systems that provide a consistent, intuitive interface across all Apple devices.
	•	Creative and Productivity Apps: Tools like Final Cut Pro, Logic Pro, and iWork that enable powerful content creation and collaboration.
	•	Services:
	•	Apple Music, Apple TV+, and Apple Arcade: Subscription services offering curated entertainment experiences.
	•	iCloud: A secure, integrated cloud service for seamless data storage and sharing.
	•	Apple Pay and Apple Card: Financial services that simplify transactions with unmatched security and convenience.
	•	AppleCare: Comprehensive support and service options that ensure the longevity and reliability of Apple products.

⸻

Value Proposition

At Apple, our value lies in the marriage of technology and artistry. Our products are not just tools—they're experiences that redefine what's possible. By prioritizing design, integration, and user privacy, Apple delivers solutions that are elegant, intuitive, and reliable. Our ecosystem empowers users to create, communicate, and connect in ways that enrich every aspect of life.

⸻

Positioning Statement

Apple is positioned as the global standard for premium technology and design. We are the innovators who bridge the gap between art and science, delivering products that are as beautiful as they are functional. Unlike competitors who focus solely on specifications, Apple puts the user experience first—transforming everyday interactions into moments of delight. With a commitment to simplicity, security, and sustainability, Apple stands apart as a trusted partner in technology for millions of users worldwide.

⸻

Brand Personality & Voice

Apple's brand is defined by a blend of visionary innovation and understated elegance. Key characteristics include:
	•	Elegant & Minimal:
Our language is refined and direct, with every word chosen for clarity and impact. We eliminate clutter—both visually and verbally—to focus on what truly matters.
	•	Innovative & Forward-Thinking:
We speak with the confidence of leaders who are constantly pushing boundaries. Our tone is inspirational yet accessible, inviting users to be a part of the future we're building.
	•	Human & Empathetic:
Apple's voice is warm, engaging, and deeply personal. We recognize that technology is ultimately about people, and our communication reflects a genuine understanding of their needs and dreams.
	•	Bold & Visionary:
We are not afraid to challenge the status quo. Our messaging is clear and resolute, emphasizing breakthrough ideas and transformative solutions.

Voice Guidelines:
	•	Do:
	•	Use concise, powerful language that resonates emotionally.
	•	Focus on storytelling that highlights innovation and simplicity.
	•	Maintain a tone that is both confident and approachable.
	•	Don't:
	•	Overwhelm with technical jargon or unnecessary complexity.
	•	Rely on hyperbole; let the quality of our products speak for themselves.
	•	Use a tone that feels impersonal or detached.

⸻

Key Messaging Pillars
	1.	Simplicity & Clarity:
"Less is More." Every Apple product is designed to simplify life, turning complex technology into an elegant, intuitive experience.
	2.	Innovation & Creativity:
Pushing the boundaries of what's possible, Apple leads with breakthrough ideas that empower users to think differently and create without limits.
	3.	Integration & Seamlessness:
Our ecosystem is built on seamless integration—devices, software, and services work together to deliver a unified and effortless experience.
	4.	Privacy & Security:
We prioritize your trust by protecting your personal data with industry-leading security and privacy measures.
	5.	Design & Craftsmanship:
With an unwavering commitment to quality and detail, every Apple product is a testament to design excellence and meticulous craftsmanship.

⸻

Content Strategy

Apple's content strategy is centered on inspiring, educating, and connecting with our audience through high-quality, visually stunning storytelling:
	•	Product Narratives:
In-depth stories that reveal the design process, technology breakthroughs, and the human creativity behind each product.
	•	Visual Storytelling:
Rich, minimalist visuals that capture the beauty of our products and the simplicity of their design. Every image is carefully curated to reflect our brand ethos.
	•	User Experience:
Content that emphasizes real-world usage—showing how Apple devices seamlessly integrate into everyday life to empower creativity, productivity, and joy.
	•	Thought Leadership:
Insights and commentary on the future of technology, design, and sustainability. Apple content inspires users to imagine and shape a better future.
	•	Interactive Experiences:
Engaging digital content, including immersive videos, interactive product tours, and elegant website design, that invite users to explore and experience the Apple ecosystem.
	•	Community & Support:
Clear, helpful guides, tutorials, and customer stories that foster a sense of belonging and trust within the Apple community.

⸻

Visual Identity

Apple's visual identity is as iconic as its products—clean, minimalist, and instantly recognizable:
	•	Logo:
The Apple logo is a symbol of innovation and simplicity. Its sleek, monochrome design is a timeless mark of quality and creativity.
	•	Color Palette:
A refined palette of white, black, and subtle accents of silver and space gray forms the backdrop of our brand. This palette emphasizes clarity and sophistication.
	•	Typography:
Modern, sans-serif fonts (such as San Francisco) ensure readability and elegance across all platforms. Typography is used sparingly, leaving ample white space to highlight content.
	•	Imagery:
Photography and video content are meticulously styled to capture the essence of our products—clean lines, natural light, and a focus on the user experience. Every visual element is designed to evoke emotion and inspire creativity.
	•	Layout & Design:
Our digital and physical materials feature a minimalist design, with intuitive navigation and a focus on content. Consistent use of white space and subtle gradients reinforces the overall sense of refinement and ease.

⸻

Competitor Landscape

In a highly competitive technology market, Apple stands apart through its commitment to design excellence and user experience. Key differentiators include:
	•	Premium Innovation:
Unlike other tech companies that compete primarily on specs, Apple focuses on delivering an integrated, delightful user experience.
	•	Seamless Ecosystem:
The strength of Apple's ecosystem—where every device, software, and service works in harmony—is unmatched. This integration is a core competitive advantage.
	•	Design & Craftsmanship:
Apple's relentless pursuit of perfection in design sets us apart from competitors who prioritize functionality over form.
	•	Privacy & Trust:
With a strong commitment to privacy, Apple builds trust with customers by ensuring that personal data is protected by state-of-the-art security measures.
	•	Global Brand & Local Impact:
Apple's brand is globally recognized, yet it remains deeply committed to innovative design and localized user experiences that resonate across cultures.

⸻

Public-Facing Brand Overview

About Apple Inc.:
Apple is more than a technology company—it's a catalyst for creativity and a champion of simplicity. With a legacy of innovation that spans decades, Apple designs products that empower people to create, connect, and explore the world in new ways.

Our Products & Services:
From the groundbreaking iPhone and Mac to the intuitive iPad, Apple Watch, and AirPods, our products are designed to work together seamlessly. Apple's software and services—including iOS, macOS, iCloud, and Apple Music—ensure a unified, effortless experience that redefines what technology can do for you.

Our Promise:
At Apple, we believe that technology should be beautiful, intuitive, and personal. Our mission is to create products that not only meet your needs but also inspire you to think differently. With a focus on design, innovation, and privacy, Apple continues to push the boundaries of what's possible, creating a lasting impact on the way you live and work.

Join Us:
Experience the simplicity and brilliance of Apple. Explore our products, learn about our innovations, and discover how Apple is making technology work for you. Visit apple.com to learn more, connect with our community, and experience the future—today.
`;

export const useBriefStore = create<BriefState>()(
  persist(
    (set, get) => ({
      briefs: [],
      addBrief: (brief) => {
        const id = Date.now().toString();
        const newBrief: Brief = {
          id,
          ...brief,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          briefs: [...state.briefs, newBrief],
        }));
        
        return id;
      },
      updateBrief: (id, data) => {
        set((state) => ({
          briefs: state.briefs.map((brief) => 
            brief.id === id ? { ...brief, ...data } : brief
          ),
        }));
      },
      getBrief: (id) => {
        return get().briefs.find((brief) => brief.id === id);
      },
      hasExampleBrief: () => {
        return get().briefs.some((brief) => brief.brandName === "Apple Inc.");
      },
      addExampleBrief: () => {
        if (!get().hasExampleBrief()) {
          const appleExampleBrief: Omit<Brief, 'id' | 'createdAt'> = {
            title: "Apple Inc. Brand Brief",
            brandName: "Apple Inc.",
            industry: "Technology",
            type: "Comprehensive",
            content: appleExampleContent
          };
          
          get().addBrief(appleExampleBrief);
        }
      },
    }),
    {
      name: 'brief-storage',
    }
  )
);

// Add the example Apple brief on initial load if it doesn't exist
if (typeof window !== 'undefined') {
  setTimeout(() => {
    const { hasExampleBrief, addExampleBrief } = useBriefStore.getState();
    if (!hasExampleBrief()) {
      addExampleBrief();
    }
  }, 1000);
}
