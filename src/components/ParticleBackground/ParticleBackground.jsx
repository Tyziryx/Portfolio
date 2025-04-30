import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import './ParticleBackground.css';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    // Au lieu de loadFull, utilisons l'initialisation de base
    await engine.init();
    // Pas besoin de vérifier la version avec checkVersion
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="particles-background"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              }
            }
          },
        },
        particles: {
          color: {
            value: "#4a71ff", // Remplacé #42d3ff (cyan) par bleu moyen
          },
          links: {
            color: "#7a4aff", // Remplacé #e65cff par violet plus profond
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1000, // Augmenté de 800 à 1000 pour moins de particules
            },
            value: 28, // Réduit de 40 à 28
          },
          opacity: {
            value: 0.3, // Réduit de 0.4 à 0.3
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.8, max: 2.5 }, // Ajusté pour une meilleure apparence
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;