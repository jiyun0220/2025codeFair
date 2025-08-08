import { create } from 'zustand';
import type { HospitalRoom } from '@/types/emergency';

type ViewMode = 'list' | 'map';

interface HospitalState {
  viewMode: ViewMode;
  searchQuery: string;
  // TODO: Add more filter states later
  results: HospitalRoom[];
  selectedHospital: HospitalRoom | null;
  isLoading: boolean;
  error: string | null;
  
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setResults: (list: HospitalRoom[]) => void;
  setSelectedHospital: (h: HospitalRoom | null) => void;
  setIsLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
}

export const useHospitalStore = create<HospitalState>((set) => ({
  viewMode: 'list', // Default view mode
  searchQuery: '',
  results: [],
  selectedHospital: null,
  isLoading: false,
  error: null,

  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setResults: (list) => set({ results: list }),
  setSelectedHospital: (h) => set({ selectedHospital: h }),
  setIsLoading: (v) => set({ isLoading: v }),
  setError: (msg) => set({ error: msg }),
}));
