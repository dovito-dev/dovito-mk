
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
}

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
    }),
    {
      name: 'brief-storage',
    }
  )
);
