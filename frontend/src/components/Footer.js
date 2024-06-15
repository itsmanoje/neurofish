//frontend/src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4" style={{ position: 'relative', bottom: '0px' }}>
      <div className="container text-center">
        <p> &copy; Trident. All rights reserved. {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
export default Footer;
