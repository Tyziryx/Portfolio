import React from 'react';
import './Projects.css';
import useTranslation from '../../hooks/Hooks';

function ProjectCard({ project, onImageClick }) {
  const { t } = useTranslation();
  
  return (
    <div className="project-card">
      <div className="project-image">
        <img 
          src={project.image} 
          alt={project.title} 
          style={{ objectPosition: 'center 0' }} 
          onError={(e) => {
            // Image de secours en cas d'échec de chargement
            e.target.onerror = null;
            e.target.style.opacity = "0.8"; 
          }}
          onClick={onImageClick}
          className="clickable-image"
        />
        <button className="view-image-btn" onClick={onImageClick} aria-label="Voir l'image">
          <i className="fas fa-search-plus"></i>
        </button>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-links">
        <a href={project.codeLink} className="project-link" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i> {t('projects.codeLink')}
        </a>
        {project.siteLink && (
          <a href={project.siteLink} className="project-link" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-external-link-alt"></i> {t('projects.siteLink', 'Voir le site')}
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;