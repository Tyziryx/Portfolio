import { useState, useEffect } from 'react';

// Export nommé pour être cohérent avec la façon dont vous l'importez
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Ajoutez aussi un export par défaut si vous préférez cette syntaxe d'import
export default useMediaQuery;