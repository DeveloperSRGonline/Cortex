import React from 'react';
import { UserButton } from '@clerk/clerk-react';
import useUIStore from '../store/uiStore';
import Button from '../components/Button/Button';
import Badge from '../components/Badge/Badge';
import './EditorToolbar.scss';

const EditorToolbar = () => {
  const { toggleFeaturePanel } = useUIStore();

  return (
    <div className="editor-toolbar">
      <div className="toolbar-zone zone-left">
        <span className="breadcrumb">project &gt; src &gt; App.jsx</span>
      </div>

      <div className="toolbar-zone zone-center-left">
        <Badge variant="primary" className="lang-badge">Javascript</Badge>
        <span className="line-col">Line 1, Col 1</span>
      </div>

      <div className="toolbar-zone zone-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="cta-intent"
          onClick={() => toggleFeaturePanel('intent')}
        >
          Intent Mode
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="cta-explainer"
          onClick={() => toggleFeaturePanel('explainer')}
        >
          Explain Codebase
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="cta-memory"
          onClick={() => toggleFeaturePanel('memory')}
        >
          Add Memory
        </Button>
      </div>

      <div className="toolbar-zone zone-center-right">
        <button className="toolbar-icon-btn">Format</button>
        <button className="toolbar-icon-btn">Wrap</button>
        <button className="toolbar-icon-btn">Minimap</button>
      </div>

      <div className="toolbar-zone zone-right">
        <button className="settings-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default EditorToolbar;
