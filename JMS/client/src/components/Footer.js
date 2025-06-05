import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo" aria-label="Footer section">
      <div className="container">
        <p>&copy;JAIN JEWELLERS; {new Date().getFullYear()}  All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
