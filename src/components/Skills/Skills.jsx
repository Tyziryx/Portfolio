import React from 'react';
import './Skills.css';
import useTranslation from '../../hooks/Hooks';
import ccnaImage from '../../assets/images/CCNAITN__1_.png';

function Skills() {
  const { t } = useTranslation();

  // Données de compétences avec des icônes améliorées
  const skillsData = [
    // Langages de programmation
    { name: "C++", icon: "devicon-cplusplus-plain colored", category: "programming" },
    { name: "Python", icon: "devicon-python-plain colored", category: "programming" },
    { name: "Java", icon: "devicon-java-plain colored", category: "programming" },
    
    // Technologies Web
    { name: "HTML5", icon: "devicon-html5-plain colored", category: "web" },
    { name: "CSS3", icon: "devicon-css3-plain colored", category: "web" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored", category: "web" },
    { name: "React", icon: "devicon-react-original colored", category: "web" },
    
    // Réseaux et Systèmes
    { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", category: "network" },
    { name: "Linux", icon: "devicon-linux-plain", category: "network" },
    { name: "Git", icon: "devicon-git-plain colored", category: "tools" },
    { name: "GitHub", icon: "devicon-github-original", category: "tools" },
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
      
      {/* Grille de compétences en ligne */}
      <div className="skills-inline-container" data-aos="fade-up">
        <div className="skills-grid-inline">
          {skillsData.map((skill, index) => (
            <div 
              key={index} 
              className="skill-card" 
              data-aos="fade-up" 
              data-aos-delay={50 * index}
            >
              <div className="skill-icon">
                <i className={skill.icon}></i>
              </div>
              <h4>{skill.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;