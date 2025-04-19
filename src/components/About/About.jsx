import React from 'react';
import './About.css';
import useTranslation from '../../hooks/Hooks';

function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section about">
      <h2 className="section-title" data-aos="fade-up">{t('about.title')}</h2>
      <div className="about-content">
        <div className="about-text">
          <p data-aos="fade-up" data-aos-delay="300">
            {t('about.paragraph1')}
          </p>
          <p data-aos="fade-up" data-aos-delay="400">
            {t('about.paragraph2')}
          </p>
          <p data-aos="fade-up" data-aos-delay="500">
            {t('about.paragraph3')}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;