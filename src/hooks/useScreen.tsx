import { useState, useEffect } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

// Define breakpoints for different device types
export const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  laptop: '(min-width: 1024px) and (max-width: 1439px)',
  desktop: '(min-width: 1440px)',
};

/**
 * Custom hook for responsive design that provides boolean values for different screen sizes
 * @returns Object with boolean flags for different device types and viewport dimensions
 */
export const useScreen = () => {
  // Use @react-hook/media-query to check screen sizes
  const isMobile = useMediaQuery(breakpoints.mobile);
  const isTablet = useMediaQuery(breakpoints.tablet);
  const isLaptop = useMediaQuery(breakpoints.laptop);
  const isDesktop = useMediaQuery(breakpoints.desktop);

  // Keep track of actual dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    width: dimensions.width,
    height: dimensions.height,
  };
};

export default useScreen;
