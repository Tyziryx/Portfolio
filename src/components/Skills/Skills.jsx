import React from 'react';
import './Skills.css';
import useTranslation from '../../hooks/Hooks';
import ccnaImage from '../../assets/images/CCNAITN__1_.png'; // Import de l'image CCNA1

function Skills() {
  const { t } = useTranslation();

  const skillsData = [
    {
      id: 1,
      category: t('skills.categories.programming'),
      items: [
        { name: "C++", icon: "fa-code" },
        { name: "Python", icon: "fa-python" },
        { name: "Java", icon: "fa-java" }
      ]
    },
    {
      id: 2,
      category: t('skills.categories.web'),
      items: [
        { name: "HTML5", icon: "fa-html5" },
        { name: "CSS3", icon: "fa-css3-alt" },
        { name: "JavaScript", icon: "fa-js" },
        { name: "React", icon: "fa-react" }
      ]
    }
  ];

  // Ajouter un badge pour la certification CCNA1 avec l'image
  const certificationBadge = (
    <div className="certification-badge" data-aos="fade-up">
      <div className="certification-badge-icon">
        <img src={ccnaImage} alt="CCNA1 Certification" className="certification-image" />
      </div>
      <div className="certification-badge-content">
        <h3>CCNA1 - Cisco</h3>
        <p>{t('skills.ccnaBadge')}</p>
      </div>
    </div>
  );

  return (
    <section id="skills" className="section skills">
      <h2 className="section-title" data-aos="fade-up">{t('skills.title')}</h2>
      
      {certificationBadge}
      
      {skillsData.map(category => (
        <div key={category.id} className="skills-category-container" data-aos="fade-up">
          <h3 className="skills-category-title">{category.category}</h3>
          
          <div className="skills-grid">
            {category.items.map((skill, index) => (
              <div 
                key={index} 
                className="skill-card" 
                data-aos="fade-up" 
                data-aos-delay={100 * index}
              >
                <div className="skill-icon">
                  {skill.name === "C++" ? (
                    <span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>C++</span>
                  ) : (
                    <i className={`fab ${skill.icon}`}></i>
                  )}
                </div>
                <h4>{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Skills;