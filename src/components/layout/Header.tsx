import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Container, Flex, IconButton, useThemeContext } from '@radix-ui/themes';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { pagesConfig } from '../../config/pages.config';
import { ScrollToTop } from './scrollToTop';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isOnTop, setIsOnTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 1000; // Threshold for header visibility
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const location = useLocation();
  const context = useThemeContext();
  const pageName = location.pathname.split('/')[1] || 'home';
  const isHomePage = pageName === 'home';

  // Handle scroll events to control header visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling back up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < scrollThreshold) {
        setIsVisible(true);
        setIsOnTop(currentScrollY <= 20);
      }
      // Hide header when scrolling down past threshold
      else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        setIsVisible(false);
        // Also close mobile menu if it's open
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isMenuOpen]);

  // Original theme context effect
  useEffect(() => {
    const config = {
      accentColor: context.accentColor,
      grayColor: context.grayColor,
      panelBackground: context.panelBackground,
      scaling: context.scaling,
      radius: context.radius,
      theme,
    };
    console.log('Theme config:', config);
  }, [context, theme]);

  const isDarkTheme = theme === 'dark';

  return (
    <>
      <ScrollToTop />
      <Box
        style={{
          position: 'fixed', // Changed from 'sticky' to 'fixed' to stay on top of the content
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: isOnTop
            ? 'transparent'
            : isHomePage
            ? 'rgba(0, 0, 0, 0.4)'
            : 'rgba(255,255,255,0.2)', // Semi-transparent background
          // borderBottom: '1px solid var(--gray-5)',
          zIndex: 50,
          backdropFilter: 'blur(20px)',
          color: 'white',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease',
          boxShadow: isVisible && !isOnTop ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <Container px="3" dir="rtl">
          <Flex py="2" justify="between" align="center">
            <Flex align="center" gap="6">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Box>
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/logo.jpeg`}
                    alt="Logo"
                    style={{ height: '2rem', borderRadius: '50%' }}
                  />
                </Box>
              </Link>

              {/* Desktop Navigation */}
              <Flex display={{ initial: 'none', md: 'flex' }} gap="6">
                {pagesConfig.map(page => (
                  <Link
                    key={page.id}
                    to={page.path}
                    className={location.pathname === page.path ? 'header-nav-active' : 'header-nav'}
                    style={{
                      textDecoration: 'none',
                      color:
                        location.pathname === page.path
                          ? isHomePage
                            ? 'var(--accent-4)'
                            : 'var(--accent-8)'
                          : isHomePage
                          ? 'var(--accent-1)'
                          : 'var(--accent-12)',
                      fontWeight: location.pathname === page.path ? 700 : 400,
                    }}
                  >
                    {page.translations[language] || page.translations.en}
                  </Link>
                ))}
              </Flex>
            </Flex>

            <Flex align="center" direction="row-reverse" gap="6">
              {/* Mobile Menu Button */}
              <Box position="relative" top="4px" display={{ initial: 'block', md: 'none' }}>
                <IconButton
                  size="3"
                  style={{
                    color: 'var(--gray-11)',
                  }}
                  variant="ghost"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </IconButton>
              </Box>

              <IconButton
                size="2"
                radius="full"
                variant="outline"
                onClick={toggleTheme}
                style={{
                  backgroundColor: 'var(--gray-2)',
                  color: 'var(--gray-11)',
                }}
                aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {isDarkTheme ? <Sun size={15} /> : <Moon size={15} />}
              </IconButton>
            </Flex>
          </Flex>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <Box
              display={{ initial: 'block', md: 'none' }}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'var(--color-background)',
                borderBottom: '1px solid var(--gray-5)',
                padding: 'var(--space-4)',
              }}
            >
              <Flex direction="column" gap="4">
                {pagesConfig.map(page => (
                  <Link
                    key={page.id}
                    to={page.path}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color:
                        location.pathname === page.path
                          ? isHomePage
                            ? 'var(--accent-4)'
                            : 'var(--accent-8)'
                          : '',
                      fontWeight: location.pathname === page.path ? 700 : 600,
                      padding: 'var(--space-2)',
                    }}
                  >
                    {page.translations[language] || page.translations.en}
                  </Link>
                ))}
              </Flex>
            </Box>
          )}
        </Container>
      </Box>
      {/* <Box style={{ height: isMenuOpen ? 0 : '3.5rem' }} /> */}
    </>
  );
}
