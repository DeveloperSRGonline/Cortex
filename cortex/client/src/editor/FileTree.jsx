import React, { useState } from 'react';
import useProjectStore from '../store/projectStore';
import useEditorStore from '../store/editorStore';
import './FileTree.scss';

const FileTreeItem = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openFile } = useEditorStore();
  const activeFileId = useEditorStore(state => state.activeFileId);

  const isFolder = item.type === 'folder';
  const isActive = activeFileId === item.id;

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      openFile(item);
    }
  };

  return (
    <div className="file-tree-item-container">
      <div 
        className={`file-tree-item ${isActive ? 'active' : ''}`} 
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
        onClick={handleClick}
      >
        {isFolder && (
          <span className={`chevron ${isOpen ? 'open' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
          </span>
        )}
        {!isFolder && <span className="file-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
        </span>}
        <span className="name">{item.name}</span>
      </div>
      
      {isFolder && isOpen && item.children && (
        <div className="children">
          {item.children.map(child => (
            <FileTreeItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileTree = () => {
  const { projectFiles } = useProjectStore();

  if (!projectFiles) {
    return <div className="file-tree-empty">No files loaded.</div>;
  }

  return (
    <div className="file-tree">
      <div className="file-tree-header">EXPLORER</div>
      {projectFiles.map(item => (
        <FileTreeItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FileTree;
