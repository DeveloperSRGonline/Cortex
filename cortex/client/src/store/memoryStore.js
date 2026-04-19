import { create } from 'zustand';

const useMemoryStore = create((set) => ({
  memories: [],
  activeMemoryId: null,
  isMemoryPanelOpen: false,

  setMemories: (memories) => set({ memories }),
  setActiveMemoryId: (id) => set({ activeMemoryId: id }),
  setIsMemoryPanelOpen: (isOpen) => set({ isMemoryPanelOpen: isOpen }),
}));

export default useMemoryStore;
