import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Environment, ContactShadows, useHelper } from '@react-three/drei';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import * as THREE from 'three';

// Particules représentant des bits/données informatiques
const DataParticles = ({ count = 40, radius = 2.2 }) => {
  const points = useRef();
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      // Distribution sur plusieurs orbites pour simuler des flux de données
      const orbitRadius = radius * (0.8 + Math.random() * 0.5);
      const x = Math.cos(angle) * orbitRadius;
      const y = (Math.random() - 0.5) * 1.2;
      const z = Math.sin(angle) * orbitRadius;
      pos.push(x, y, z);
    }
    return new Float32Array(pos);
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (points.current) {
      const time = clock.getElapsedTime() * 0.3;
      points.current.rotation.y = time * 0.2;
      // Animation plus dynamique des particules
      points.current.rotation.z = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute 
          attachObject={['attributes', 'position']} 
          array={positions} 
          count={count} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        color="#4a71ff" // Bleu plus clair qui correspond au thème
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Lignes de code simulées autour de la sphère
const CodeLines = ({ count = 8, radius = 2.5 }) => {
  const lines = useRef();
  const linePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      // Créer des lignes horizontales à différentes hauteurs
      const y = (i / count) * 4 - 2;
      const length = 1.5 + Math.random() * 1.5;
      positions.push(-length, y, 0);
      positions.push(length, y + Math.random() * 0.5, 0);
    }
    return new Float32Array(positions);
  }, [count]);

  useFrame(({ clock }) => {
    if (lines.current) {
      const t = clock.getElapsedTime();
      lines.current.rotation.y = t * 0.2;
      lines.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <lineSegments ref={lines}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={linePositions}
          count={count * 2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#4a71ff" opacity={0.4} transparent /> {/* Bleu adapté */}
    </lineSegments>
  );
};

// Sphère principale avec thème informatique/technologique
const TechSphere = ({ isMobile }) => {
  const sphereRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();
  
  // Matériau avec couleurs tech/cyber
  const materialProps = useMemo(() => ({
    color: new THREE.Color("#0a1d56"), // Bleu foncé
    attach: "material",
    distort: hovered ? 0.55 : 0.5,
    speed: 1.8,
    roughness: 0.1,
    metalness: 0.9,
    emissive: new THREE.Color("#4a71ff"), // Bleu moyen
    emissiveIntensity: 0.7,  // Augmenté de 0.5 à 0.7
    clearcoat: 2.0,
    clearcoatRoughness: 0.05,
    opacity: 1.0,
    transparent: true,
    transmission: 0.18,  // Légèrement augmenté de 0.15 à 0.18
    envMapIntensity: 2.0,  // Augmenté de 1.6 à 2.0
    reflectivity: 0.6,  // Ajout de reflectivity pour les bords
  }), [hovered]); // Gardons la dépendance pour les autres effets de survol

  // Animation interactive
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Interaction avec la souris
    const targetRotationX = mouse.y * 0.3;
    const targetRotationY = mouse.x * 0.5;
    
    if (sphereRef.current) {
      // Rotation fluide
      sphereRef.current.rotation.x = THREE.MathUtils.lerp(
        sphereRef.current.rotation.x,
        targetRotationX + Math.sin(time * 0.3) * 0.3,
        0.05
      );
      sphereRef.current.rotation.y = THREE.MathUtils.lerp(
        sphereRef.current.rotation.y,
        targetRotationY + Math.sin(time * 0.4) * 0.4,
        0.05
      );
      
      // Pulsation numérique - comme un processeur qui travaille
      const pulseBase = Math.sin(time * 0.8) * 0.02;
      const pulseDigital = Math.sin(time * 3.0) * 0.01; // Pulsation rapide pour effet digital
      
      // Effet de scale simplifié qui ne dépend pas du survol
      sphereRef.current.scale.x = 1 + pulseBase + pulseDigital;
      sphereRef.current.scale.y = 1 + pulseBase + pulseDigital;
      sphereRef.current.scale.z = 1 + pulseBase + pulseDigital;
    }
  });
  
  return (
    <group>
      {/* Sphère principale - comme un "noyau digital" */}
      <Sphere 
        ref={sphereRef} 
        args={[isMobile ? 1.3 : 1.7, 128, 128]}
        onPointerOver={() => {
          // Ne pas changer le cursor du document.body
          setHovered(true);
        }}
        onPointerOut={() => {
          // Ne pas changer le cursor du document.body
          setHovered(false);
        }}
        onPointerMove={(e) => {
          // Simplement bloquer la propagation pour éviter les problèmes
          e.stopPropagation();
        }}
      >
        <MeshDistortMaterial {...materialProps} />
      </Sphere>
      
      {/* Aura digitale */}
      <mesh scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[isMobile ? 1.3 : 1.7, 32, 32]} />
        <meshBasicMaterial 
          color="#0a1d56" // Bleu foncé 
          transparent={true} 
          opacity={0.07} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Particules de données et lignes de code */}
      <DataParticles count={42} radius={isMobile ? 1.9 : 2.3} />
      <CodeLines count={10} radius={isMobile ? 2.0 : 2.5} />
    </group>
  );
};

export function ThreeScene() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance"
        // Suppression de autoClear et outputEncoding qui peuvent causer des problèmes
      }}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'none',
        outline: 'none',
        border: 'none',
        pointerEvents: 'auto',
        overflow: 'visible'
      }}
      shadows={false}
      dpr={[1, 2]}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        // Suppression de mixBlendMode qui peut causer des artefacts
        gl.domElement.style.background = 'none';
        gl.domElement.style.border = 'none';
        gl.domElement.style.outline = 'none';
        
        // Suppression du fog et de l'environment qui peuvent causer des bordures noires
      }}
    >
      {/* Éclairage simplifié mais toujours coloré */}
      <ambientLight intensity={0.8} color="#ffffff" /> {/* Revenu au blanc pour l'éclairage ambiant principal */}
      <pointLight position={[10, 10, 10]} intensity={1.3} color="#7a4aff" /> 
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#4a71ff" />
      <pointLight position={[5, 0, -5]} intensity={1.5} color="#4a71ff" />
      
      {/* Environnement night sans modifications supplémentaires */}
      <Environment preset="night" background={false} />
      
      {/* Modèle principal */}
      <TechSphere isMobile={isMobile} />
      
      {/* Ombre très légère ou à supprimer si encore problématique
        - opacity réduit de 0.12 à 0.08
        - blur augmenté de 3 à 5 pour réduire la netteté
      */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.08}
        scale={10}
        blur={5}
        far={3}
        color="#0a1d56"
      />
    </Canvas>
  );
}