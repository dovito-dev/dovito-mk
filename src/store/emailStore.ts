
import { create } from 'zustand';
import { EmailTemplate } from '@/types/email';

interface EmailState {
  emails: EmailTemplate[];
  addEmail: (email: EmailTemplate) => void;
  getEmail: (id: string) => EmailTemplate | undefined;
}

export const useEmailStore = create<EmailState>((set, get) => ({
  emails: [
    {
      id: '1',
      title: 'Product Demo Follow-Up',
      recipient: {
        name: 'John Smith',
        email: 'john.smith@example.com'
      },
      company: 'Acme Corp',
      purpose: 'follow-up',
      content: `Dear John,

Thank you for taking the time to join our product demonstration yesterday. I hope you found the session informative and could see how our solution might benefit Acme Corp.

Based on our conversation, I believe our platform could help you achieve your goals of increasing team productivity by 30% and streamlining your workflow processes. I'd like to suggest a follow-up call next week to discuss any questions that may have come up since our meeting.

Would you be available for a 20-minute call on Tuesday at 2 PM? If not, please suggest a time that works better for your schedule.

Best regards,

Your Name
`,
      createdAt: '2023-10-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Partnership Proposal',
      recipient: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techfirm.com'
      },
      company: 'TechFirm Inc',
      purpose: 'partnerships',
      content: `Dear Sarah,

I hope this email finds you well. I'm reaching out because I believe there's a fantastic opportunity for our companies to collaborate on an upcoming project.

TechFirm's expertise in cloud solutions, combined with our data analytics capabilities, could create a powerful offering for enterprise clients in the financial sector.

I'd love to schedule a meeting to discuss how we might structure a partnership that benefits both organizations. Are you open to exploring this possibility?

Looking forward to your response,

Your Name
`,
      createdAt: '2023-10-18T14:45:00Z'
    }
  ],
  addEmail: (email) => set((state) => ({ 
    emails: [...state.emails, email] 
  })),
  getEmail: (id) => {
    const { emails } = get();
    return emails.find(email => email.id === id);
  }
}));
