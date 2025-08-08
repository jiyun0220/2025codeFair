import { create } from 'zustand';

type ViewMode = 'list' | 'map';

interface HospitalState {
  viewMode: ViewMode;
  searchQuery: string;
  // TODO: Add more filter states later
  
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
}

export const useHospitalStore = create<HospitalState>((set) => ({
  viewMode: 'list', // Default view mode
  searchQuery: '',

  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
