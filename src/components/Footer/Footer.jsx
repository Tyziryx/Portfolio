import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="simple-footer">
      <div className="footer-content">
        <p className="copyright">© {currentYear} Alexi Portfolio</p>
        
        <motion.button 
          className="scroll-top-button"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Revenir en haut"
        >
          <i className="fas fa-arrow-up"></i>
        </motion.button>
      </div>
    </footer>
  );
}

export default Footer;