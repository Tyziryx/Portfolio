import React, { useEffect, useRef } from 'react';
import './Hero.css';
import useTranslation from '../../hooks/Hooks';

function Hero() {
  const titleRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.classList.add('animated');
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="text-animation-wrapper" ref={titleRef}>
          <h1 className="hello-text">{t('hero.greeting')} <span className="highlight">Alexi</span></h1>
        </div>
        <h2 className="subtitle">{t('hero.subtitle')}</h2>
        <p>{t('hero.description')}</p>
        <button 
          onClick={() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }} 
          className="cta-button"
        >
          {t('hero.cta')}
        </button>
      </div>
    </section>
  );
}

export default Hero;