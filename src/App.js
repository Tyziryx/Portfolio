import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import CustomCursor from './components/CustomCursor/CustomCursor';
import { LanguageProvider } from './context/Context';
import { motion, AnimatePresence } from 'framer-motion';

// Importer AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import polices personnalisées via CSS
import './fonts.css';

function App() {
  const [loading, setLoading] = useState(true);

  // Initialiser AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
      offset: 100
    });

    // Simulation de chargement
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="loader-content">
              <div className="loader-logo">A</div>
              <div className="loader-bar">
                <div className="loader-progress"></div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            className="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CustomCursor />
            <ParticleBackground />
            <Header />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </LanguageProvider>
  );
}

export default App;
