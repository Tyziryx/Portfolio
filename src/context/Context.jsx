import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer le contexte
const LanguageContext = createContext();

// Créer le provider
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fr');

  // Charger la langue sauvegardée dans localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Fonction pour changer de langue
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useLanguage() {
  return useContext(LanguageContext);
}