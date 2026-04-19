import { useCallback } from 'react';
import useProjectStore from '../store/projectStore';
import useEditorStore from '../store/editorStore';

const useProject = () => {
  const { activeProjectId, setProjectFiles } = useProjectStore();
  const { openFile, setActiveFileId } = useEditorStore();

  const loadProject = useCallback(async (projectId) => {
    // Mocking project loading for now
    const mockFiles = [
      {
        id: '1',
        name: 'src',
        type: 'folder',
        children: [
          { id: '2', name: 'App.jsx', type: 'file', language: 'javascript' },
          { id: '3', name: 'main.jsx', type: 'file', language: 'javascript' },
          { 
            id: '4', 
            name: 'components', 
            type: 'folder',
            children: [
              { id: '5', name: 'Button.jsx', type: 'file', language: 'javascript' }
            ]
          }
        ]
      },
      { id: '6', name: 'package.json', type: 'file', language: 'json' },
      { id: '7', name: 'README.md', type: 'file', language: 'markdown' }
    ];

    setProjectFiles(mockFiles);
  }, [setProjectFiles]);

  const switchFile = useCallback((fileId) => {
    setActiveFileId(fileId);
  }, [setActiveFileId]);

  return {
    loadProject,
    switchFile
  };
};

export default useProject;
