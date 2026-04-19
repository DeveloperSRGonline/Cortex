import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import EditorPage from './pages/Editor';
import MemoryVault from './pages/MemoryVault';
import ExplainerView from './pages/ExplainerView';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Routes>
          <Route path="/" element={<EditorPage />} />
          <Route path="/memory" element={<MemoryVault />} />
          <Route path="/explainer" element={<ExplainerView />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SignedIn>
    </Router>
  );
}

export default App;
