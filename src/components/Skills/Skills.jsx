import React, { useState } from 'react';
import './Skills.css';
import useTranslation from '../../hooks/Hooks';
import ccnaImage from '../../assets/images/CCNAITN__1_.png';

function Skills() {
  const { t } = useTranslation();

  // Données de compétences avec descriptions et liens
  const skillsData = [
    // Langages de programmation
    { 
      name: "C++", 
      icon: "devicon-cplusplus-plain colored",
      category: "programming", 
      description: "Langage polyvalent pour le développement de systèmes performants, jeux vidéo et applications nécessitant des performances élevées.",
      link: "https://isocpp.org/"
    },
    { 
      name: "Python", 
      icon: "devicon-python-plain colored", 
      category: "programming", 
      description: "Langage de programmation multi-paradigme orienté vers la simplicité et la productivité. Idéal pour le développement web, l'analyse de données et l'IA.",
      link: "https://www.python.org/"
    },
    { 
      name: "Java", 
      icon: "devicon-java-plain colored", 
      category: "programming", 
      description: "Langage orienté objet conçu pour être portable et performant. Utilisé pour les applications d'entreprise, Android et systèmes embarqués.",
      link: "https://www.java.com/"
    },
    
    // Technologies Web
    { 
      name: "HTML5", 
      icon: "devicon-html5-plain colored", 
      category: "web", 
      description: "Langage de balisage pour structurer le contenu des pages web. La dernière version apporte de nouvelles fonctionnalités pour les applications web modernes.",
      link: "https://developer.mozilla.org/fr/docs/Web/HTML"
    },
    { 
      name: "CSS3", 
      icon: "devicon-css3-plain colored", 
      category: "web", 
      description: "Langage de style utilisé pour définir la présentation des documents HTML. CSS3 permet des mises en page avancées et des animations fluides.",
      link: "https://developer.mozilla.org/fr/docs/Web/CSS"
    },
    { 
      name: "JavaScript", 
      icon: "devicon-javascript-plain colored", 
      category: "web", 
      description: "Langage de programmation qui permet d'implémenter des fonctionnalités complexes sur les pages web, créant des applications interactives.",
      link: "https://developer.mozilla.org/fr/docs/Web/JavaScript"
    },
    { 
      name: "React", 
      icon: "devicon-react-original colored", 
      category: "web", 
      description: "Bibliothèque JavaScript pour créer des interfaces utilisateur interactives. Basée sur des composants réutilisables pour des applications web rapides et réactives.",
      link: "https://reactjs.org/"
    },
    { 
      name: "PHP", 
      icon: "devicon-php-plain colored", 
      category: "web", 
      description: "Langage de script côté serveur conçu pour le développement web. Permet de créer des pages dynamiques et d'interagir avec des bases de données.",
      link: "https://www.php.net/"
    },
    
    // Réseaux et Systèmes
    { 
      name: "PostgreSQL", 
      icon: "devicon-postgresql-plain colored", 
      category: "network", 
      description: "Système de gestion de base de données relationnel avancé, open-source, avec de puissantes fonctionnalités d'extension et de conformité SQL.",
      link: "https://www.postgresql.org/"
    },
    { 
      name: "Linux", 
      icon: "devicon-linux-plain", 
      category: "network", 
      description: "Système d'exploitation open-source basé sur Unix, stable et sécurisé. Largement utilisé pour les serveurs, le développement et la formation en informatique.",
      link: "https://www.linux.org/"
    },
    { 
      name: "Git", 
      icon: "devicon-git-plain colored", 
      category: "tools", 
      description: "Système de contrôle de version distribué permettant de suivre les modifications du code source et de collaborer efficacement entre développeurs.",
      link: "https://git-scm.com/"
    },
    { 
      name: "GitHub", 
      icon: "devicon-github-original", 
      category: "tools", 
      description: "Plateforme d'hébergement de code et de collaboration basée sur Git. Facilite la gestion de projets et le travail en équipe sur des logiciels.",
      link: "https://github.com/"
    },
  ];

  return (
    <section id="skills" className="section skills">
      <h2 className="section-title" data-aos="fade-up">{t('skills.title')}</h2>
      
      {/* Certification CCNA */}
      <div className="certification-badge" data-aos="fade-up">
        <div className="certification-badge-icon">
          <img src={ccnaImage} alt="CCNA1 Certification" className="certification-image" />
        </div>
        <div className="certification-badge-content">
          <h3>CCNA1 - Cisco</h3>
          <p>{t('skills.ccnaBadge')}</p>
        </div>
      </div>
      
      {/* Grille de compétences avec cartes flip */}
      <div className="skills-inline-container" data-aos="fade-up">
        <div className="skills-grid-inline">
          {skillsData.map((skill, index) => (
            <div 
              key={index} 
              className="skill-card-flip" 
              data-aos="fade-up" 
              data-aos-delay={50 * index}
            >
              <div className="skill-card-inner">
                {/* Face avant avec l'icône et le nom */}
                <div className="skill-card-front">
                  <div className="skill-icon">
                    <i className={skill.icon}></i>
                  </div>
                  <h4>{skill.name}</h4>
                  <div className="flip-indicator">
                    <i className="fas fa-redo-alt"></i>
                  </div>
                </div>
                
                {/* Face arrière avec la description et le lien */}
                <div className="skill-card-back">
                  <p className="skill-description">{skill.description}</p>
                  <a href={skill.link} target="_blank" rel="noopener noreferrer" className="skill-link" aria-label="En savoir plus">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;