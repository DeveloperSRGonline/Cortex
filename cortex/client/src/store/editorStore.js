import { create } from 'zustand';

const useEditorStore = create((set) => ({
  openFiles: [], // Array of file objects
  activeFileId: null,
  tabOrder: [],
  editorContent: {}, // Map of fileId -> content

  setOpenFiles: (files) => set({ openFiles: files }),
  setActiveFileId: (id) => set({ activeFileId: id }),
  setTabOrder: (order) => set({ tabOrder: order }),
  updateEditorContent: (fileId, content) => set((state) => ({
    editorContent: { ...state.editorContent, [fileId]: content }
  })),

  openFile: (file) => set((state) => {
    if (state.openFiles.find(f => f.id === file.id)) {
      return { activeFileId: file.id };
    }
    return {
      openFiles: [...state.openFiles, file],
      tabOrder: [...state.tabOrder, file.id],
      activeFileId: file.id
    };
  }),

  closeFile: (fileId) => set((state) => {
    const newOpenFiles = state.openFiles.filter(f => f.id !== fileId);
    const newTabOrder = state.tabOrder.filter(id => id !== fileId);
    let newActiveFileId = state.activeFileId;

    if (state.activeFileId === fileId) {
      newActiveFileId = newTabOrder.length > 0 ? newTabOrder[newTabOrder.length - 1] : null;
    }

    return {
      openFiles: newOpenFiles,
      tabOrder: newTabOrder,
      activeFileId: newActiveFileId
    };
  }),
}));

export default useEditorStore;
