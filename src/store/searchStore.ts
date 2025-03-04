import { create } from 'zustand';
import { Model } from '../types';

interface SearchState {
  searchQuery: string;
  searchResults: Model[];
  isSearchOpen: boolean;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Model[]) => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  openSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  searchResults: [],
  isSearchOpen: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),
  openSearch: () => set({ isSearchOpen: true }),
}));