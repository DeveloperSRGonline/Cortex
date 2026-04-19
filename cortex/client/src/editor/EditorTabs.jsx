import React from 'react';
import useEditorStore from '../store/editorStore';
import './EditorTabs.scss';

const EditorTabs = () => {
  const { openFiles, activeFileId, setActiveFileId, closeFile, tabOrder } = useEditorStore();

  const handleTabClick = (fileId) => {
    setActiveFileId(fileId);
  };

  const handleClose = (e, fileId) => {
    e.stopPropagation();
    closeFile(fileId);
  };

  return (
    <div className="editor-tabs">
      {tabOrder.map((fileId) => {
        const file = openFiles.find(f => f.id === fileId);
        if (!file) return null;

        const isActive = activeFileId === fileId;

        return (
          <div 
            key={fileId}
            className={`editor-tab ${isActive ? 'active' : ''}`}
            onClick={() => handleTabClick(fileId)}
          >
            <span className="tab-name">{file.name}</span>
            <button className="tab-close" onClick={(e) => handleClose(e, fileId)}>
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EditorTabs;
