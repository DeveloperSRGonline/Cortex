import React, { useState, useCallback, useEffect } from 'react';
import useUIStore from '../store/uiStore';
import './AppShell.scss';

const AppShell = ({ sidebar, editor, featurePanel, bottomPanel }) => {
  const { 
    sidebarWidth, setSidebarWidth,
    featurePanelOpen, featurePanelWidth, setFeaturePanelWidth,
    bottomPanelOpen, bottomPanelHeight, setBottomPanelHeight
  } = useUIStore();

  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingFeature, setIsResizingFeature] = useState(false);
  const [isResizingBottom, setIsResizingBottom] = useState(false);

  const startResizingSidebar = useCallback(() => setIsResizingSidebar(true), []);
  const startResizingFeature = useCallback(() => setIsResizingFeature(true), []);
  const startResizingBottom = useCallback(() => setIsResizingBottom(true), []);

  const stopResizing = useCallback(() => {
    setIsResizingSidebar(false);
    setIsResizingFeature(false);
    setIsResizingBottom(false);
  }, []);

  const resize = useCallback((e) => {
    if (isResizingSidebar) {
      const newWidth = e.clientX - 48; // Activity bar is 48px
      if (newWidth >= 160 && newWidth <= 400) {
        setSidebarWidth(newWidth);
      }
    } else if (isResizingFeature) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 300 && newWidth <= 600) {
        setFeaturePanelWidth(newWidth);
      }
    } else if (isResizingBottom) {
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight >= 120 && newHeight <= window.innerHeight * 0.5) {
        setBottomPanelHeight(newHeight);
      }
    }
  }, [isResizingSidebar, isResizingFeature, isResizingBottom, setSidebarWidth, setFeaturePanelWidth, setBottomPanelHeight]);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="app-shell">
      <div className="activity-bar">
        {/* Activity Bar Icons */}
        <div className="activity-icon active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </div>
        <div className="activity-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <div className="activity-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"></path></svg>
        </div>
        <div className="spacer"></div>
        <div className="activity-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
      </div>

      <div className="sidebar" style={{ width: sidebarWidth }}>
        {sidebar}
        <div className="resizer sidebar-resizer" onMouseDown={startResizingSidebar}></div>
      </div>

      <div className="main-area">
        <div className="editor-area">
          {editor}
        </div>
        
        {bottomPanelOpen && (
          <div className="bottom-panel" style={{ height: bottomPanelHeight }}>
            <div className="resizer bottom-resizer" onMouseDown={startResizingBottom}></div>
            {bottomPanel}
          </div>
        )}
      </div>

      {featurePanelOpen && (
        <div className="feature-panel" style={{ width: featurePanelWidth }}>
          <div className="resizer feature-resizer" onMouseDown={startResizingFeature}></div>
          {featurePanel}
        </div>
      )}
    </div>
  );
};

export default AppShell;
