import React from 'react';
import './Projects.css';
import ProjectCard from './ProjectCard';
import useTranslation from '../../hooks/Hooks';

// Importez vos images
import project1Image from '../../assets/images/dbl.jpg';
import project2Image from '../../assets/images/dbl.jpg';
import project3Image from '../../assets/images/dbl.jpg';

function Projects() {
  const { t } = useTranslation();
  
  const projects = [
    {
      id: 1,
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      image: project1Image,
      codeLink: "https://github.com/Tyziryx/WebsiteProg",
      siteLink: "https://tyzi.fr/geodex" // Ajout du lien vers le site

    },
    {
      id: 2,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      image: project2Image,
      codeLink: "https://github.com/Tyziryx/Ams-JavaBdd"
    },
  ];

  return (
    <section id="projects" className="section projects">
      <h2 className="section-title" data-aos="fade-up">{t('projects.title')}</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} data-aos="fade-up" data-aos-delay={200 + project.id * 100}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;