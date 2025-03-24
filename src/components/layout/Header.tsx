import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Container, Flex, IconButton, DropdownMenu, useThemeContext } from '@radix-ui/themes';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { pagesConfig } from '../../config/pages.config';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const context = useThemeContext();
  console.log('Theme context:', context);
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
    <Box
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--navigation-background)',
        borderBottom: '1px solid var(--gray-5)',
        zIndex: 50,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container>
        <Flex py="2" justify="between" align="center">
          <Flex align="center" gap="6">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box>
                <img src="/vite.svg" alt="Logo" style={{ height: '2rem' }} />
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
                    color: location.pathname === page.path ? 'var(--accent-11)' : 'var(--gray-11)',
                    fontWeight: location.pathname === page.path ? 700 : 400,
                  }}
                >
                  {page.translations[language] || page.translations.en}
                </Link>
              ))}
            </Flex>
          </Flex>

          <Flex align="center" direction="row-reverse" gap="4">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton
                  radius="full"
                  style={{
                    backgroundColor: 'var(--gray-1)',
                    color: 'var(--gray-11)',
                  }}
                  size="2"
                  variant="outline"
                  aria-label="Change language"
                >
                  <Globe size={15} />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'active' : ''}
                >
                  English
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => setLanguage('he')}
                  className={language === 'he' ? 'active' : ''}
                >
                  עברית
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <IconButton
              size="2"
              radius="full"
              variant="outline"
              onClick={toggleTheme}
              style={{
                backgroundColor: 'var(--gray-1)',
                color: 'var(--gray-11)',
              }}
              aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDarkTheme ? <Sun size={15} /> : <Moon size={15} />}
            </IconButton>

            {/* Mobile Menu Button */}
            <Box display={{ initial: 'block', md: 'none' }}>
              <IconButton
                size="3"
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </IconButton>
            </Box>
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
                    color: location.pathname === page.path ? 'var(--accent-11)' : 'var(--text)',
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
  );
}
