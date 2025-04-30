import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import useTranslation from '../../hooks/Hooks';
import { useLanguage } from '../../context/Context';
import { ThreeScene } from './ThreeScene';
import StarryBackground from './StarryBackground';
import './Hero.css';

// Enregistrer le plugin TextPlugin pour les animations de texte
gsap.registerPlugin(TextPlugin);

function Hero() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Animation séquentielle
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animer les éléments sociaux
    tl.fromTo(
      socialsRef.current.children,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
      0
    );
    
    // Animer le titre
    tl.fromTo(
      titleRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2 }
    );
    
    // Animer le sous-titre
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.5,
        onComplete: () => {
          // Animation de typing pour le texte d'accroche
          const typeText = gsap.timeline();
          typeText.to(descriptionRef.current, {
            duration: 2.5,
            text: {
              value: t('hero.description'),
              delimiter: ""
            },
            ease: "none"
          });
        }
      }
    );
    
    // Animer le bouton CTA
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8 }
    );

    return () => {
      tl.kill();
    };
  }, [t]);

  return (
    <section className="modern-hero">
      <div className="hero-background">
        <div className="gradient-overlay"></div>
        <div className="noise-texture"></div>
      </div>

      <div className="hero-content">
        {/* Section gauche - Textes et CTA */}
        <div className="hero-left">
          {/* Réseaux sociaux */}
          <div className="social-links" ref={socialsRef}>
            <motion.a 
              href="https://github.com/Tyziryx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, y: -5, color: "#7a4aff" }} // Changé en violet
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-github"></i>
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/alexi-miaille-baba88333" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, y: -5, color: "#7a4aff" }} // Changé en violet
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-linkedin-in"></i>
            </motion.a>
          </div>

          {/* Texte principal */}
          <div className="hero-text">
            <h1 ref={titleRef} className="hero-title">
              <span className="gradient-text">Alexi</span>
            </h1>

            <h2 ref={subtitleRef} className="hero-subtitle">
              {t('hero.subtitle')}
            </h2>

            <p ref={descriptionRef} className="hero-description"></p>

            <motion.button 
              ref={ctaRef}
              className="hero-cta"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 25px rgba(74, 113, 255, 0.4)" // Remplacé cyan par bleu moyen
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('hero.cta')}
              <span className="btn-arrow">
                <i className="fas fa-long-arrow-alt-right"></i>
              </span>
            </motion.button>
          </div>
        </div>

        {/* Section droite - Animation 3D avec meilleure intégration */}
        <div className="hero-right">
          <div className="three-container-wrapper">
            <div className="three-container">
              <ThreeScene />
              <div className="three-container-mask"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;