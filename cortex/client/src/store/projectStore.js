import { create } from 'zustand';

const useProjectStore = create((set) => ({
  projects: [],
  activeProjectId: null,
  projectFiles: null, // File tree structure

  setProjects: (projects) => set({ projects }),
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  setProjectFiles: (files) => set({ projectFiles: files }),
}));

export default useProjectStore;
