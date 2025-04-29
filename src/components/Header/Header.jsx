import React, { useState, useEffect } from 'react';
import './Header.css';
import { useLanguage } from '../../context/Context';
import useTranslation from '../../hooks/Hooks';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  // Détecter le scroll pour animer la navbar et suivre la section active
  useEffect(() => {
    const handleScroll = () => {
      // Pour l'animation de la navbar
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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
    e.stopPropagation(); // Ajoutez cette ligne pour empêcher la propagation

    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - 100;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const toggleLanguage = (e) => {
    e.preventDefault(); // Ajoutez cette ligne
    e.stopPropagation(); // Et celle-ci
    changeLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="island-navigation">
        <ul data-aos="zoom-in" data-aos-duration="800" data-aos-once="true">
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
      </nav>
    </header>
  );
}

export default Header;