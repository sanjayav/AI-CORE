import { create } from 'zustand';

export type ScopeType = 'library' | 'upload' | 'combined';
export type ViewMode = 'table' | 'json' | 'checklist';

interface FilterState {
  program: string;
  modelYear: string;
  subsystem: string;
  docType: string;
}

interface AppState {
  // Scope
  scope: ScopeType;
  setScope: (scope: ScopeType) => void;
  uploadedDoc: string | null;
  setUploadedDoc: (doc: string | null) => void;

  // Filters
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;

  // Evidence Viewer
  evidenceViewerOpen: boolean;
  setEvidenceViewerOpen: (open: boolean) => void;
  selectedCitation: any;
  setSelectedCitation: (citation: any) => void;

  // Upload Drawer
  uploadDrawerOpen: boolean;
  setUploadDrawerOpen: (open: boolean) => void;

  // Extract View Mode
  extractViewMode: ViewMode;
  setExtractViewMode: (mode: ViewMode) => void;

  // Compare
  compareDocA: string | null;
  compareDocB: string | null;
  setCompareDocA: (doc: string | null) => void;
  setCompareDocB: (doc: string | null) => void;

  // Search
  query: string;
  setQuery: (query: string) => void;
}

const initialFilters: FilterState = {
  program: 'Defender',
  modelYear: '2022',
  subsystem: 'Powertrain',
  docType: 'Service Manual',
};

export const useStore = create<AppState>((set) => ({
  // Scope
  scope: 'library',
  setScope: (scope) => set({ scope }),
  uploadedDoc: null,
  setUploadedDoc: (doc) => set({ uploadedDoc: doc }),

  // Filters
  filters: initialFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: initialFilters }),

  // Evidence Viewer
  evidenceViewerOpen: false,
  setEvidenceViewerOpen: (open) => set({ evidenceViewerOpen: open }),
  selectedCitation: null,
  setSelectedCitation: (citation) => set({ selectedCitation: citation }),

  // Upload Drawer
  uploadDrawerOpen: false,
  setUploadDrawerOpen: (open) => set({ uploadDrawerOpen: open }),

  // Extract View Mode
  extractViewMode: 'table',
  setExtractViewMode: (mode) => set({ extractViewMode: mode }),

  // Compare
  compareDocA: 'SM-DEF-2021-PT-001',
  compareDocB: 'SM-DEF-2022-PT-001',
  setCompareDocA: (doc) => set({ compareDocA: doc }),
  setCompareDocB: (doc) => set({ compareDocB: doc }),

  // Search
  query: '',
  setQuery: (query) => set({ query }),
}));
