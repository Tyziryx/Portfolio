import React, { useState } from 'react';
import './Projects.css';
import ProjectCard from './ProjectCard';
import useTranslation from '../../hooks/Hooks';
import { motion } from 'framer-motion';

// Importez vos images
import project1Image from '../../assets/images/geodex.jpg';
import project2Image from '../../assets/images/java-bdd.png';
import project3Image from '../../assets/images/ams-dashboard.jpg';

function Projects() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const projects = [
    {
      id: 1,
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      image: project1Image,
      imagePosition: 'center 25%',
      codeLink: "https://github.com/Tyziryx/WebsiteProg",
      siteLink: null, // Lien retiré
      maintenanceNote: "Site en maintenance" // Note simple
    },
    {
      id: 2,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      image: project2Image,
      imagePosition: 'center 30%',
      codeLink: "https://github.com/Tyziryx/Ams-JavaBdd",
    },
    {
      id: 3,
      title: t('projects.project3.title'),
      description: t('projects.project3.description'),
      image: project3Image,
      imagePosition: 'center 25%',
      codeLink: "https://github.com/Tyziryx/amserveur",
    }
  ];

  return (
    <section id="projects" className="section projects">
      <h2 className="section-title" data-aos="fade-up">{t('projects.title')}</h2>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <ProjectCard 
              project={project} 
              onImageClick={() => openImageModal(project.image)}
            />
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="image-modal" onClick={() => setShowModal(false)}>
          <div className="modal-content">
            <span className="close-modal">&times;</span>
            <img src={selectedImage} alt="Agrandissement" />
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;