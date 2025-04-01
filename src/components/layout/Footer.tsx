import React from 'react';
import { Link } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { Facebook, Twitter, Instagram, Linkedin, X as Close } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { marked } from 'marked';
import { pagesConfig } from '../../config/pages.config';
import { Grid, Text } from '@radix-ui/themes';

export function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [legalContent, setLegalContent] = React.useState<Record<string, string>>({});

  const loadLegalContent = React.useCallback(
    async (type: string) => {
      try {
        const response = await fetch(`/src/content/legal/${language}/${type}.md`);
        const content = await response.text();
        const htmlContent = marked.parse(content);
        if (typeof htmlContent === 'string') {
          setLegalContent(prev => ({
            ...prev,
            [type]: htmlContent,
          }));
        }
      } catch (error) {
        console.error(`Error loading ${type} content:`, error);
        setLegalContent(prev => ({
          ...prev,
          [type]: 'Error loading content',
        }));
      }
    },
    [language]
  );

  return (
    <footer
      style={{
        // backgroundColor: 'var(--background-color)',
        zIndex: 100,
        borderTop: '1px solid var(--border)',
        padding: '2rem 0',
        marginTop: 'auto',
      }}
      dir={language === 'he' ? 'rtl' : 'ltr'}
    >
      <div className="container">
        <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4">
          {/* Brand Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              to="/"
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}/logo.jpeg`}
                alt="Logo"
                style={{ height: '2rem', borderRadius: '50%' }}
              />
              Diamond
            </Link>
            <div style={{ gap: '6px' }} className="rt-r-display-flex rt-r-fd-column ">
              <p
                style={{
                  color: 'var(--muted-foreground)',
                  textAlign: 'start',
                  marginBottom: '0.1rem',
                }}
              >
                {t('brandDescription')}
              </p>
              <Text
                // align="center"
                // mx="auto"
                align="right"
                as="p"
                size="4"
                weight="medium"
                style={{
                  borderRadius: '8px',
                  // position: 'relative',
                  // left: '20%',
                  width: 'fit-content',
                  // border: '1px solid var(--border)',
                  padding: '8px',
                  // background: 'var(--gray-2)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  window.open('https://wa.me/972527036959', '_blank');
                }}
              >
                052-703-6959
              </Text>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ color: 'var(--foreground)', fontWeight: 600 }}>{t('quickLinks')}</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {pagesConfig.map(page => (
                <Link
                  key={page.id}
                  to={page.path}
                  className="nav-link"
                  // style={{
                  //   textDecoration: 'none',
                  //   color: 'var(--foreground)',
                  //   fontWeight: 400,
                  //   padding: '0.5rem 0',
                  // }}
                >
                  {page.translations[language] || page.translations.en}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ color: 'var(--foreground)', fontWeight: 600 }}>{t('legal')}</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Dialog.Root onOpenChange={() => loadLegalContent('privacy-policy')}>
                <Dialog.Trigger asChild>
                  <button
                    className="nav-link"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: language === 'he' ? 'right' : 'left',
                    }}
                  >
                    {t('privacyPolicy')}
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="DialogOverlay" />
                  <Dialog.Content className="DialogContent">
                    <div className="DialogHeader">
                      <Dialog.Title asChild>
                        <h1>{t('privacyPolicy')}</h1>
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button className="DialogCloseButton">
                          <Close size={16} />
                        </button>
                      </Dialog.Close>
                    </div>
                    <div
                      className="markdown-content"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                      dangerouslySetInnerHTML={{ __html: legalContent['privacy-policy'] || '' }}
                    />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              <Dialog.Root onOpenChange={() => loadLegalContent('terms-of-service')}>
                <Dialog.Trigger asChild>
                  <button
                    className="nav-link"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: language === 'he' ? 'right' : 'left',
                    }}
                  >
                    {t('termsOfService')}
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="DialogOverlay" />
                  <Dialog.Content className="DialogContent">
                    <div className="DialogHeader">
                      <Dialog.Title asChild>
                        <h1>{t('termsOfService')}</h1>
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button className="DialogCloseButton">
                          <Close size={16} />
                        </button>
                      </Dialog.Close>
                    </div>
                    <div
                      className="markdown-content"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                      dangerouslySetInnerHTML={{ __html: legalContent['terms-of-service'] || '' }}
                    />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              <Dialog.Root onOpenChange={() => loadLegalContent('accessibility')}>
                <Dialog.Trigger asChild>
                  <button
                    className="nav-link"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: language === 'he' ? 'right' : 'left',
                    }}
                  >
                    {t('accessibility')}
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="DialogOverlay" />
                  <Dialog.Content className="DialogContent">
                    <div className="DialogHeader">
                      <Dialog.Title asChild>
                        <h1>{t('accessibility')}</h1>
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button className="DialogCloseButton">
                          <Close size={16} />
                        </button>
                      </Dialog.Close>
                    </div>
                    <div
                      className="markdown-content"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                      dangerouslySetInnerHTML={{ __html: legalContent['accessibility'] || '' }}
                    />
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </nav>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ color: 'var(--foreground)', fontWeight: 600 }}>{t('connectWithUs')}</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-outline"
                style={{ padding: '0.5rem' }}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-outline"
                style={{ padding: '0.5rem' }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-outline"
                style={{ padding: '0.5rem' }}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-outline"
                style={{ padding: '0.5rem' }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </Grid>

        {/* Copyright */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
            color: 'var(--muted-foreground)',
          }}
        >
          <p>
            &copy; {currentYear} Diamond. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
