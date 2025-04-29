import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import * as THREE from 'three';

// Composant pour ajuster la taille de la caméra
const CameraController = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    const updateCameraFov = () => {
      camera.fov = window.innerWidth < 768 ? 75 : 60;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', updateCameraFov);
    updateCameraFov();
    
    return () => window.removeEventListener('resize', updateCameraFov);
  }, [camera]);
  
  return null;
};

// Composant pour la sphère avec effet violet/magenta
const EnhancedSphere = ({ isMobile }) => {
  const sphereRef = useRef();
  
  // Matériau amélioré sans bordures visibles
  const materialProps = useMemo(() => ({
    color: new THREE.Color("#6a00ff"),
    attach: "material",
    distort: 0.5,
    speed: 1.5,
    roughness: 0.35,      // Légère diminution pour plus d'éclat
    metalness: 0.75,      // Augmentation pour de meilleurs reflets
    emissive: new THREE.Color("#9d4eff"),
    emissiveIntensity: 0.4, // Augmenté pour plus de brillance
    clearcoat: 1.5,       // Plus de brillance
    clearcoatRoughness: 0.15,
    opacity: 0.9,         // Légèrement plus opaque
    transparent: true,
    transmission: 0.12,   // Légèrement augmenté
    envMapIntensity: 1.2, // Meilleurs reflets d'environnement
  }), []);
  
  // Animation de rotation améliorée
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.mouse.x * 0.1;
    const mouseY = state.mouse.y * 0.1;
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.sin(time * 0.3) * 0.3 + mouseY;
      sphereRef.current.rotation.y = Math.sin(time * 0.4) * 0.4 + mouseX;
      sphereRef.current.scale.x = 1 + Math.sin(time * 0.8) * 0.05;
      sphereRef.current.scale.y = 1 + Math.sin(time * 0.8) * 0.05;
      sphereRef.current.scale.z = 1 + Math.sin(time * 0.8) * 0.05;
    }
  });
  
  return (
    <Sphere ref={sphereRef} args={[isMobile ? 1.3 : 1.8, 64, 64]}>
      <MeshDistortMaterial {...materialProps} />
    </Sphere>
  );
};

// Points lumineux
const NetworkPoints = ({ count = 25, isMobile }) => {
  const size = isMobile ? 12 : 25;
  
  // Palette de couleurs violettes/magenta
  const colors = useMemo(() => [
    "#6a00ff", // Violet profond
    "#b57aff", // Lavande
    "#d442ff", // Violet clair
    "#ff00ff", // Magenta
    "#ff57d8"  // Rose
  ], []);
  
  // Génération de points avec disposition circulaire
  const points = useMemo(() => {
    const tempPoints = [];
    for (let i = 0; i < count; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      // Distribution circulaire pour un effet "constellation" autour de la sphère
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * size * 0.8;
      const x = Math.cos(angle) * radius * (Math.random() * 0.5 + 0.5);
      const y = (Math.random() - 0.5) * size * 0.7;
      const z = Math.sin(angle) * radius * (Math.random() * 0.5 + 0.5);
      
      tempPoints.push({
        position: [x, y, z],
        size: Math.random() * 0.15 + 0.04,
        color: colors[colorIndex],
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return tempPoints;
  }, [count, size, colors]);
  
  const pointsGroup = useRef();
  const pointRefs = useRef([]);
  
  useEffect(() => {
    pointRefs.current = pointRefs.current.slice(0, points.length);
  }, [points.length]);
  
  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    
    if (pointsGroup.current) {
      pointsGroup.current.rotation.y = time * 0.1;
      pointsGroup.current.rotation.x = mouse.y * 0.2;
      pointsGroup.current.rotation.z = mouse.x * 0.2;
    }
    
    pointRefs.current.forEach((point, i) => {
      if (point) {
        const pulse = Math.sin(time * points[i].speed * 5) * 0.2 + 0.8;
        point.scale.set(pulse, pulse, pulse);
        
        const orbitRadius = 0.1;
        const orbitSpeed = 0.5 + points[i].speed;
        const orbitX = Math.cos(time * orbitSpeed + i) * orbitRadius;
        const orbitZ = Math.sin(time * orbitSpeed + i) * orbitRadius;
        
        point.position.x = points[i].position[0] + orbitX;
        point.position.z = points[i].position[2] + orbitZ;
      }
    });
  });
  
  return (
    <group ref={pointsGroup}>
      {points.map((point, index) => (
        <mesh 
          key={`point-${index}`}
          position={point.position}
          ref={el => pointRefs.current[index] = el}
        >
          <sphereGeometry args={[point.size, 16, 16]} />
          <meshBasicMaterial 
            color={point.color}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
};

// Remplacer le composant Glow existant par cette version améliorée

// Effet de lueur amélioré avec plusieurs couches pour masquer les bordures
const EnhancedGlow = () => {
  const innerGlowRef = useRef();
  const middleGlowRef = useRef();
  const outerGlowRef = useRef();
  
  // Animation de pulsation pour toutes les couches
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (innerGlowRef.current) {
      // Couche interne - pulsation rapide
      innerGlowRef.current.material.opacity = Math.sin(time * 0.5) * 0.02 + 0.08;
    }
    
    if (middleGlowRef.current) {
      // Couche moyenne - pulsation moyenne et décalée
      middleGlowRef.current.material.opacity = Math.sin(time * 0.3 + 0.5) * 0.015 + 0.05;
    }
    
    if (outerGlowRef.current) {
      // Couche externe - pulsation lente
      outerGlowRef.current.material.opacity = Math.sin(time * 0.2 + 1) * 0.01 + 0.03;
    }
  });
  
  return (
    <>
      {/* Couche interne - violet vif */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial 
          color="#b57aff" 
          transparent={true}
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Couche moyenne - violet moyen */}
      <mesh ref={middleGlowRef}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial 
          color="#9d4eff" 
          transparent={true}
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Couche externe - violet pâle et large */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[4.5, 24, 24]} />
        <meshBasicMaterial 
          color="#6a00ff" 
          transparent={true}
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

// Remplacez le composant GlowRings par cette version optimisée

// Anneaux lumineux améliorés pour masquer les bordures
const GlowRings = ({ isMobile }) => {
  const ringsRef = useRef();
  
  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    
    if (ringsRef.current) {
      // Rotation influencée par le temps et la souris pour plus de dynamisme
      ringsRef.current.rotation.x = Math.PI / 4 + Math.sin(time * 0.2) * 0.1 + mouse.y * 0.2;
      ringsRef.current.rotation.y = time * 0.1 + mouse.x * 0.2;
      ringsRef.current.rotation.z = Math.sin(time * 0.15) * 0.05;
    }
  });
  
  // Taille augmentée pour couvrir plus d'espace
  const size = isMobile ? 2.5 : 3.5;
  
  return (
    <group ref={ringsRef}>
      {/* Premier anneau - plus grand et plus visible */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size, 0.03, 16, 100]} />
        <meshBasicMaterial color="#ff00ff" transparent opacity={0.2} />
      </mesh>
      
      {/* Deuxième anneau - angle différent */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[size * 0.85, 0.025, 16, 80]} />
        <meshBasicMaterial color="#d442ff" transparent opacity={0.15} />
      </mesh>
      
      {/* Troisième anneau - autre angle */}
      <mesh rotation={[Math.PI / 3, Math.PI / 3, Math.PI / 5]}>
        <torusGeometry args={[size * 0.7, 0.02, 16, 60]} />
        <meshBasicMaterial color="#6a00ff" transparent opacity={0.2} />
      </mesh>
      
      {/* Quatrième anneau - angle supplémentaire */}
      <mesh rotation={[Math.PI / 6, Math.PI / 2, Math.PI / 3]}>
        <torusGeometry args={[size * 1.2, 0.01, 16, 90]} />
        <meshBasicMaterial color="#b57aff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

// Modifiez le rendu du Canvas pour une transparence parfaite

export function ThreeScene() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance",
        precision: "highp",
        stencil: false,
        depth: true,
        premultipliedAlpha: true, // Important pour un mélange transparent parfait
      }}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
        pointerEvents: 'auto',
        outline: 'none',
        border: 'none'
      }}
      shadows={false}
      dpr={[1, Math.min(2, window.devicePixelRatio)]}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // Couleur de fond transparent
        gl.physicallyCorrectLights = true;
      }}
    >
      <CameraController />
      
      {/* Environnement plus léger */}
      <Environment preset="sunset" intensity={0.5} />
      
      {/* Éclairage optimisé */}
      <ambientLight intensity={1.2} color="#ffffff" />
      
      {/* Lumières pour masquer les bordures */}
      <directionalLight position={[5, 5, 5]} intensity={2.2} color="#b57aff" castShadow={false} />
      <pointLight position={[0, 0, 7]} intensity={1.0} color="#ff00ff" distance={20} decay={2} />
      <pointLight position={[0, -5, 3]} intensity={1.5} color="#ffffff" distance={15} decay={2} />
      
      {/* Lumières supplémentaires pour masquer les bords */}
      <pointLight position={[3, 0, 0]} intensity={0.5} color="#6a00ff" distance={7} />
      <pointLight position={[-3, 0, 0]} intensity={0.5} color="#6a00ff" distance={7} />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#6a00ff" distance={7} />
      <pointLight position={[0, -3, 0]} intensity={0.5} color="#6a00ff" distance={7} />
      
      <group position={[0, 0, 0]} rotation={[0, Math.PI * 0.25, 0]}>
        {/* Anneaux extérieurs agrandis pour masquer les bordures */}
        <GlowRings isMobile={isMobile} />
        
        {/* Effet de lueur amélioré */}
        <EnhancedGlow />
        
        {/* Sphère principale */}
        <EnhancedSphere isMobile={isMobile} />
        
        {/* Points de lumière */}
        <NetworkPoints count={isMobile ? 20 : 30} isMobile={isMobile} />
      </group>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate={true}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}