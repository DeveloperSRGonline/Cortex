import React, { useEffect } from 'react';
import AppShell from '../layouts/AppShell';
import FileTree from '../editor/FileTree';
import MonacoWrapper from '../editor/MonacoWrapper';
import EditorTabs from '../editor/EditorTabs';
import EditorToolbar from '../editor/EditorToolbar';
import useProject from '../hooks/useProject';

const EditorPage = () => {
  const { loadProject } = useProject();

  useEffect(() => {
    loadProject('default-project');
  }, [loadProject]);

  return (
    <AppShell
      sidebar={<FileTree />}
      editor={
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <EditorTabs />
          <EditorToolbar />
          <div style={{ flex: 1, position: 'relative' }}>
            <MonacoWrapper />
          </div>
        </div>
      }
      featurePanel={
        <div style={{ padding: '20px', color: 'white' }}>
          <h3>Feature Panel</h3>
          <p>This is where Intent Mode, Explainer, and Memory details will appear.</p>
        </div>
      }
      bottomPanel={
        <div style={{ padding: '10px', color: 'white' }}>
          <h4>Terminal</h4>
          <p>Cortex terminal ready...</p>
        </div>
      }
    />
  );
};

export default EditorPage;
