
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BrandBrief {
  id: string;
  companyName: string;
  website: string;
  status: 'pending' | 'completed';
  createdAt: string;
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
  addBrief: (companyName: string, website: string) => string;
  updateBrief: (id: string, data: Partial<BrandBrief>) => void;
  getBrief: (id: string) => BrandBrief | undefined;
}

export const useBrandBriefStore = create<BrandBriefState>()(
  persist(
    (set, get) => ({
      briefs: [],
      addBrief: (companyName, website) => {
        const id = Date.now().toString();
        const newBrief: BrandBrief = {
          id,
          companyName,
          website,
          status: 'pending',
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
    }),
    {
      name: 'brand-brief-storage',
    }
  )
);
