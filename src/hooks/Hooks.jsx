import { useLanguage } from '../context/Context'; 
import { useState, useEffect } from 'react';

export default function useTranslation() {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState({});
  
  // Chargement asynchrone des traductions pour éviter les dépendances circulaires
  useEffect(() => {
    const loadTranslations = async () => {
      // Import dynamique pour éviter les dépendances circulaires
      const frModule = await import('../translations/fr');
      const enModule = await import('../translations/eng');
      
      setTranslations({
        fr: frModule.default,
        en: enModule.default
      });
    };
    
    loadTranslations();
  }, []);
  
  const t = (key) => {
    if (!key) return '';
    
    const keys = key.split('.');
    let translation = translations[language];
    
    if (!translation) return key;
    
    for (const k of keys) {
      if (translation[k] === undefined) {
        return key;
      }
      translation = translation[k];
    }
    
    if (typeof translation === 'string' && translation.includes('{year}')) {
      return translation.replace('{year}', new Date().getFullYear());
    }
    
    return translation;  // Il manque ce return !
  };

  return { t, language };  // Return est nécessaire ici
}