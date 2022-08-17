import React from 'react';
import { Footer } from './Footer';
import { HeaderSection } from './HeaderSection';

export const MainPanel = ({ children, toggleMobileMenu, handleKeyMenu }:any): JSX.Element => {
  return (
        <div className="main-panel">
        <span onClick={toggleMobileMenu} onKeyPress={handleKeyMenu} id="mobilemenutoggle" tabIndex={0} role="button">
          <i className="fas fa-bars" />
        </span>
        <div className="mainPanel">
          <div className="swipe-area" />
          <HeaderSection/>
          <div style={{ width: 'auto' }} id="contentBlock" className="content-block">
            {children}
            <Footer />
          </div>
        </div>
      </div>
  );
};
