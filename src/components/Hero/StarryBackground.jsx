import React, { useEffect, useRef } from 'react';
import './StarryBackground.css';

const StarryBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configuration
    const particles = [];
    const particleCount = 80; // Nombre modéré pour la performance
    
    // Ajuster la taille du canvas à la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Créer les particules
    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          color: i % 3 === 0 ? '#42d3ff' : (i % 4 === 0 ? '#6a00ff' : '#ffffff'),
          velocity: {
            x: (Math.random() - 0.5) * 0.2, // Mouvement très lent
            y: (Math.random() - 0.5) * 0.2
          },
          alpha: Math.random() * 0.5 + 0.2,
          pulse: Math.random() * 0.1
        });
      }
    };
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Pulsation subtile
        p.alpha += Math.sin(p.pulse) * 0.01;
        p.alpha = Math.max(0.1, Math.min(p.alpha, 0.8));
        
        ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba');
        ctx.fill();
        
        // Mouvement lent
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        
        // Rebond aux bords
        if (p.x < 0 || p.x > canvas.width) p.velocity.x *= -1;
        if (p.y < 0 || p.y > canvas.height) p.velocity.y *= -1;
      });
    };
    
    // Initialisation
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    createParticles();
    animate();
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="starry-background" />;
};

export default StarryBackground;