import React from 'react';
import './Projects.css';
import useTranslation from '../../hooks/Hooks';

function ProjectCard({ project }) {
  const { t } = useTranslation();
  
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title} />
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-links">
        <a href={project.codeLink} className="project-link">{t('projects.codeLink')}</a>
      </div>
    </div>
  );
}

export default ProjectCard;