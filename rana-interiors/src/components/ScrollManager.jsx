import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to #hash targets (e.g. /#about) or to the top on a new page. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash]);

  return null;
}
