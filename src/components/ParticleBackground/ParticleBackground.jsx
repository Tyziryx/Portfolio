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
            value: "#42d3ff",
          },
          links: {
            color: "#e65cff",
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
              area: 800,
            },
            value: 40,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;