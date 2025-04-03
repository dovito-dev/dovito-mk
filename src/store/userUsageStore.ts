
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserUsageState {
  briefsCreated: number;
  incrementBriefsCreated: () => void;
  isFreeUsageAvailable: () => boolean;
  FREE_BRIEF_LIMIT: number;
}

export const useUserUsageStore = create<UserUsageState>()(
  persist(
    (set, get) => ({
      briefsCreated: 0,
      FREE_BRIEF_LIMIT: 5,
      incrementBriefsCreated: () => set(state => ({ briefsCreated: state.briefsCreated + 1 })),
      isFreeUsageAvailable: () => get().briefsCreated < get().FREE_BRIEF_LIMIT,
    }),
    {
      name: 'user-usage-storage',
    }
  )
);
