import React from 'react';
import './About.css';
import useTranslation from '../../hooks/Hooks';

function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section about">
      <h2 className="section-title" data-aos="fade-up">{t('about.title')}</h2>
      <div className="about-content">
        {/* Colonne gauche - Texte de présentation */}
        <div className="about-card" data-aos="fade-up" data-aos-delay="300">
          <h3 className="card-title">{t('about.profileTitle')}</h3>
          <div className="card-content">
            <p dangerouslySetInnerHTML={{__html: 
              t('about.paragraph1').replace('C++', '<strong>C++</strong>')
                .replace('Python', '<strong>Python</strong>')
                .replace('Java', '<strong>Java</strong>')
                .replace('JavaScript', '<strong>JavaScript</strong>')
            }}></p>
            <p dangerouslySetInnerHTML={{__html: 
              t('about.paragraph2').replace('CCNA1', '<strong>CCNA1</strong>')
                .replace('web', '<strong>web</strong>')
            }}></p>
            <p>{t('about.paragraph3')}</p>
          </div>
        </div>

        {/* Colonne droite - Intérêts techniques */}
        <div className="about-card" data-aos="fade-up" data-aos-delay="400">
          <h3 className="card-title">{t('about.interestsTitle')}</h3>
          <div className="interests-grid">
            <div className="interest-card">
              <div className="interest-icon">
                <i className="fas fa-code"></i>
              </div>
              <div className="interest-content">
                <h4>{t('about.interests.development')}</h4>
                <p>{t('about.interests.developmentDesc')}</p>
              </div>
            </div>
            
            <div className="interest-card">
              <div className="interest-icon">
                <i className="fas fa-network-wired"></i>
              </div>
              <div className="interest-content">
                <h4>{t('about.interests.networking')}</h4>
                <p>{t('about.interests.networkingDesc')}</p>
              </div>
            </div>
            
            <div className="interest-card">
              <div className="interest-icon">
                <i className="fas fa-laptop-medical"></i>
              </div>
              <div className="interest-content">
                <h4>{t('about.interests.maintenance')}</h4>
                <p>{t('about.interests.maintenanceDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;