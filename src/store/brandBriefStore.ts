
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BrandBrief {
  id: string;
  brief_title: string;
  company_name: string;
  company_url: string | null;
  extra_instructions?: string | null;
  status: 'pending' | 'completed';
  created_at: string;
  updated_at?: string | null;
  generated_brief?: string | null;
  user_id: string;
  briefData?: {
    targetAudience?: string;
    brandVoice?: string;
    brandValues?: string[];
    colorPalette?: string[];
    competitiveAnalysis?: string;
    brandPositioning?: string;
  };
}

interface BrandBriefState {
  briefs: BrandBrief[];
  addBrief: (briefTitle: string, companyName: string, companyUrl: string, extraInstructions?: string) => string;
  updateBrief: (id: string, data: Partial<BrandBrief>) => void;
  getBrief: (id: string) => BrandBrief | undefined;
}

export const useBrandBriefStore = create<BrandBriefState>()(
  persist(
    (set, get) => ({
      briefs: [],
      addBrief: (briefTitle, companyName, companyUrl, extraInstructions = '') => {
        const id = Date.now().toString();
        const newBrief: BrandBrief = {
          id,
          brief_title: briefTitle,
          company_name: companyName,
          company_url: companyUrl,
          extra_instructions: extraInstructions,
          status: 'pending',
          created_at: new Date().toISOString(),
          user_id: '', // This will be set by the backend
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
    }),
    {
      name: 'brand-brief-storage',
    }
  )
);
