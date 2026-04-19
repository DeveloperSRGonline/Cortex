import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import useEditorStore from '../store/editorStore';
import './MonacoWrapper.scss';

const MonacoWrapper = () => {
  const { activeFileId, openFiles, editorContent, updateEditorContent } = useEditorStore();
  const activeFile = openFiles.find(f => f.id === activeFileId);

  const handleEditorChange = (value) => {
    if (activeFileId) {
      updateEditorContent(activeFileId, value);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    // Define Cortex Theme
    monaco.editor.defineTheme('cortex-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0D0D17', // $color-code-bg
        'editor.selectionBackground': '#4F6EF720', // $color-highlight
        'editor.lineHighlightBackground': '#1A1A28',
        'editorCursor.foreground': '#4F6EF7',
        'editorWhitespace.foreground': '#2E2E45',
      }
    });
    monaco.editor.setTheme('cortex-dark');
  };

  if (!activeFile) {
    return (
      <div className="no-file-selected">
        <p>No file selected. Open a file from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="monaco-wrapper">
      <Editor
        height="100%"
        language={activeFile.language || 'javascript'}
        value={editorContent[activeFileId] || ''}
        theme="cortex-dark"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default MonacoWrapper;
