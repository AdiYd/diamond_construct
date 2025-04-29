import { useEffect, useState } from 'react';
import { Text, Section, Flex, Box } from '@radix-ui/themes';
import { useLanguage } from '../context/LanguageContext';
import { marked } from 'marked';

export function Accessibility() {
  const { language } = useLanguage();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        // For Hebrew content specifically as requested
        const response = await fetch(`${import.meta.env.BASE_URL}content/legal/accessibility.md`);
        if (!response.ok) {
          setContent('');
        } else {
          const content = await response.text();
          setContent(await marked.parse(content));
        }
      } catch (error) {
        console.error('Error loading accessibility content:', error);
        setContent('<p>Error loading content</p>');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  return (
    <Box
      dir={language === 'he' ? 'rtl' : 'ltr'}
      style={{ paddingTop: '2rem', paddingBottom: '4rem' }}
    >
      <Section size="3">
        <Flex direction="column" gap="4">
          {/* <Heading size="8" align={language === 'he' ? 'right' : 'left'} weight="bold">
            הצהרת נגישות
          </Heading> */}

          {/* <Separator size="4" /> */}

          <Box px={'4'} style={{ marginTop: '1rem' }}>
            {isLoading ? (
              <Text size="3">טוען תוכן...</Text>
            ) : (
              <div
                className="markdown-content legal-document"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </Box>
        </Flex>
      </Section>
    </Box>
  );
}
