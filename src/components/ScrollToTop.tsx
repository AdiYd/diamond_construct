import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Handle initial scroll
    const scrollToPosition = () => {
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Try immediately
    scrollToPosition();

    // Also try after a delay to ensure content has loaded
    const timeoutId = setTimeout(scrollToPosition, 500);

    // Also try after all images and resources have loaded
    window.addEventListener('load', scrollToPosition);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', scrollToPosition);
    };
  }, [pathname, hash]);

  return null;
}
