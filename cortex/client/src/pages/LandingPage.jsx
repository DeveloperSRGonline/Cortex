import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import './LandingPage.scss';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="logo-container">
          <div className="cortex-logo">⬡</div>
          <h1 className="brand-name">Cortex</h1>
        </div>
        <p className="tagline">Code with Intent. Build with Memory.</p>
        <div className="auth-container">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
