import { create } from 'zustand';

const useUIStore = create((set) => ({
  sidebarWidth: 240,
  featurePanelOpen: false,
  featurePanelMode: 'intent', // 'intent' | 'explainer' | 'memory'
  featurePanelWidth: 380,
  bottomPanelOpen: false,
  bottomPanelHeight: 200,

  setSidebarWidth: (width) => set({ sidebarWidth: width }),
  setFeaturePanelOpen: (isOpen) => set({ featurePanelOpen: isOpen }),
  setFeaturePanelMode: (mode) => set({ featurePanelMode: mode }),
  setFeaturePanelWidth: (width) => set({ featurePanelWidth: width }),
  setBottomPanelOpen: (isOpen) => set({ bottomPanelOpen: isOpen }),
  setBottomPanelHeight: (height) => set({ bottomPanelHeight: height }),
  
  toggleFeaturePanel: (mode) => set((state) => {
    if (state.featurePanelOpen && state.featurePanelMode === mode) {
      return { featurePanelOpen: false };
    }
    return { featurePanelOpen: true, featurePanelMode: mode };
  }),
}));

export default useUIStore;
