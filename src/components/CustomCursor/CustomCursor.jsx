import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isClicking, setIsClicking] = useState(false);

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

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: { type: "spring", stiffness: 500, damping: 28 }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(66, 211, 255, 0.4)",
      border: "none",
      transition: { type: "spring", stiffness: 500, damping: 28 }
    },
    clicking: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 0.8,
      backgroundColor: "rgba(230, 92, 255, 0.4)",
      transition: { type: "spring", stiffness: 500, damping: 28 }
    }
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      transition: { type: "spring", stiffness: 300, damping: 22 }
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 1.5,
      transition: { type: "spring", stiffness: 300, damping: 22 }
    },
    clicking: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 0.8,
      opacity: 0.7,
      transition: { type: "spring", stiffness: 300, damping: 22 }
    }
  };

  useEffect(() => {
    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, .hover-effect").forEach(el => {
        el.addEventListener("mouseenter", () => setCursorVariant("hover"));
        el.addEventListener("mouseleave", () => setCursorVariant("default"));
      });
    };
    
    handleLinkHoverEvents();
    
    // Réexécuter quand le DOM peut changer
    window.addEventListener('DOMContentLoaded', handleLinkHoverEvents);
    
    return () => {
      window.removeEventListener('DOMContentLoaded', handleLinkHoverEvents);
    };
  }, []);

  // Détermine la variante à utiliser en fonction des états
  const currentVariant = isClicking ? "clicking" : cursorVariant;

  return (
    <>
      <motion.div
        className={`cursor-dot ${isClicking ? 'clicking' : ''}`}
        variants={variants}
        animate={currentVariant}
      />
      <motion.div
        className={`cursor-ring ${isClicking ? 'clicking' : ''}`}
        variants={ringVariants}
        animate={currentVariant}
      />
    </>
  );
};

export default CustomCursor;