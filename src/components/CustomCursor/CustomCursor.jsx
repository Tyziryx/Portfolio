import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isOverThreeJs, setIsOverThreeJs] = useState(false);

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseDown = () => {
      setIsClicking(true);
    };

    const mouseUp = () => {
      setIsClicking(false);
    };

    // Détection d'entrée/sortie de la zone ThreeJS
    const handleThreeJsEnter = () => {
      setIsOverThreeJs(true);
    };

    const handleThreeJsLeave = () => {
      setIsOverThreeJs(false);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    // Ajouter les écouteurs d'événements pour ThreeJS
    const threeContainer = document.querySelector('.three-container');
    if (threeContainer) {
      threeContainer.addEventListener("mouseenter", handleThreeJsEnter);
      threeContainer.addEventListener("mouseleave", handleThreeJsLeave);
    }

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      
      if (threeContainer) {
        threeContainer.removeEventListener("mouseenter", handleThreeJsEnter);
        threeContainer.removeEventListener("mouseleave", handleThreeJsLeave);
      }
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 5,  // Centrer le point (10px / 2)
      y: mousePosition.y - 5,
      transition: { 
        type: "spring", 
        stiffness: 1000, 
        damping: 40, 
        mass: 0.5 
      }
    },
    hover: {
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
      scale: 1.2,
      transition: { 
        type: "spring", 
        stiffness: 1000, 
        damping: 40 
      }
    },
    clicking: {
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
      scale: 1.5,
      transition: { 
        type: "spring", 
        stiffness: 1000, 
        damping: 40 
      }
    }
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 20, // Centrer l'anneau (40px / 2)
      y: mousePosition.y - 20,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 35, 
        mass: 1 
      }
    },
    hover: {
      x: mousePosition.x - 32.5, // Centrer l'anneau agrandi (65px / 2)
      y: mousePosition.y - 32.5,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 35 
      }
    },
    clicking: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 0.8,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 35 
      }
    }
  };

  useEffect(() => {
    const handleLinkHoverEvents = () => {
      // Sélectionne tous les éléments interactifs sauf dans ThreeJS
      document.querySelectorAll("a, button, .hover-effect").forEach(el => {
        el.addEventListener("mouseenter", () => setCursorVariant("hover"));
        el.addEventListener("mouseleave", () => setCursorVariant("default"));
      });
    };
    
    handleLinkHoverEvents();
    
    // Observer les changements DOM pour les éléments ajoutés dynamiquement
    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  // Détermine la variante à utiliser
  const currentVariant = isClicking ? "clicking" : cursorVariant;

  return (
    <>
      <motion.div
        className={`cursor-dot ${isClicking ? 'clicking' : ''} ${isOverThreeJs ? 'over-threejs' : ''}`}
        variants={variants}
        animate={currentVariant}
        initial="default"
      />
      <motion.div
        className={`cursor-ring ${isClicking ? 'clicking' : ''} ${cursorVariant === "hover" ? 'hover' : ''} ${isOverThreeJs ? 'over-threejs' : ''}`}
        variants={ringVariants}
        animate={currentVariant}
        initial="default"
      />
    </>
  );
};

export default CustomCursor;