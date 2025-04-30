import React from 'react';
import './Contact.css';
import useTranslation from '../../hooks/Hooks';

function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section contact">
      <h2 className="section-title" data-aos="fade-up">{t('contact.title')}</h2>
      
      <div className="contact-container" data-aos="fade-up" data-aos-delay="200">
        <div className="contact-info">
          <p className="contact-description">
            {t('contact.description')}
          </p>
          
          <div className="contact-methods">
            <div className="contact-method" data-aos="fade-up" data-aos-delay="300">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-method-details">
                <h3>Email</h3>
                <a href="mailto:alexim13550@gmail.com">alexim13550@gmail.com</a>
              </div>
            </div>
            
            <div className="contact-method" data-aos="fade-up" data-aos-delay="400">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-method-details">
                <h3>Location</h3>
                <p>Noves, France</p>
              </div>
            </div>
          </div>
          
          <div className="social-links" data-aos="fade-up" data-aos-delay="500">
            <a href="https://github.com/Tyziryx" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/alexi-miaille-baba88333" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;