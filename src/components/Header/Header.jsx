import React, { useState, useEffect } from 'react';
import './Header.css';
import { useLanguage } from '../../context/Context';
import useTranslation from '../../hooks/Hooks';
import { motion } from 'framer-motion';

function Header() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Détecter le scroll pour animer la navbar et suivre la section active
  useEffect(() => {
    const handleScroll = () => {
      // Pour l'animation de la navbar
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Pour détecter la section active
      const sections = ['about', 'projects', 'skills', 'contact'];
      
      // Trouver la section la plus proche du haut de l'écran
      let currentSection = '';
      let minDistance = Number.MAX_VALUE;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Défilement doux vers les sections
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();

    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - 100;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Fermer le menu mobile si ouvert
      setMobileMenuOpen(false);
    }
  };

  const toggleLanguage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    changeLanguage(language === 'fr' ? 'en' : 'fr');
  };

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Fermer le menu mobile si ouvert
    setMobileMenuOpen(false);
  };

  // Bloquer le défilement quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      {/* Votre navbar existante - inchangée */}
      <div className="island-navigation desktop-only">
        <ul data-aos="zoom-in" data-aos-duration="800" data-aos-once="true">
          {/* Logo ajouté à gauche */}
          <li className="nav-logo">
            <img 
              src="/Logo_Alexi.svg" 
              alt="Logo Alexi" 
              className="header-logo" 
              onClick={scrollToTop}
            />
          </li>
          <li>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              <span>{t('header.about')}</span>
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'projects')}
            >
              {t('header.projects')}
            </a>
          </li>
          <li>
            <a 
              href="#skills" 
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'skills')}
            >
              {t('header.skills')}
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              {t('header.contact')}
            </a>
          </li>
          <li className="language-selector">
            <button 
              className="language-toggle" 
              onClick={toggleLanguage}
              aria-label="Change language"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>
          </li>
        </ul>
      </div>
      
      {/* Logo pour mobile */}
      <div className="mobile-nav-logo">
        <img 
          src="/Logo_Alexi.svg" 
          alt="Logo Alexi" 
          className="header-logo" 
          onClick={scrollToTop}
        />
      </div>

      {/* Bouton Menu Burger Mobile */}
      <button 
        className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Menu"
      >
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
        <span className="burger-bar"></span>
      </button>

      {/* Menu Mobile */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li>
            <a 
              href="#about"
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              {t('header.about')}
            </a>
          </li>
          <li>
            <a 
              href="#projects"
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'projects')}
            >
              {t('header.projects')}
            </a>
          </li>
          <li>
            <a 
              href="#skills"
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'skills')}
            >
              {t('header.skills')}
            </a>
          </li>
          <li>
            <a 
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              {t('header.contact')}
            </a>
          </li>
        </ul>
        <div className="mobile-language-selector">
          <button 
            className="mobile-language-toggle"
            onClick={toggleLanguage}
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          <span>{language === 'fr' ? 'English' : 'Français'}</span>
        </div>
      </div>

      {/* Overlay pour fermer le menu en cliquant ailleurs */}
      <div 
        className={`menu-overlay ${mobileMenuOpen ? 'active' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </header>
  );
}

export default Header;