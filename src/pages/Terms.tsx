import { useEffect, useState } from 'react';
import { Text, Section, Box } from '@radix-ui/themes';
import { useLanguage } from '../context/LanguageContext';
import { marked } from 'marked';

export function Terms() {
  const { language } = useLanguage();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/content/legal/terms-of-service.md`);
        if (!response.ok) {
          // Fallback to the default terms-of-service.md if language-specific version doesn't exist
          const fallbackResponse = await fetch(`/content/legal/terms-of-service.md`);
          const fallbackContent = await fallbackResponse.text();
          setContent(await marked.parse(fallbackContent));
        } else {
          const content = await response.text();
          setContent(await marked.parse(content));
        }
      } catch (error) {
        console.error('Error loading terms of service content:', error);
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
      </Section>
    </Box>
  );
}
