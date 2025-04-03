
export interface EmailTemplate {
  id: string;
  title: string;
  recipient: {
    name: string;
    email: string;
  };
  company: string;
  purpose: string;
  content: string;
  createdAt: string;
}
