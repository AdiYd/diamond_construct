import { useEffect, useState } from 'react';
import { Text, Section, Box } from '@radix-ui/themes';
import { useLanguage } from '../context/LanguageContext';
import { marked } from 'marked';

export function Privacy() {
  const { language } = useLanguage();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.BASE_URL}content/legal/privacy-policy.md`);
        if (!response.ok) {
          // Fallback to the default privacy-policy.md if language-specific version doesn't exist
          const fallbackResponse = await fetch(
            `${import.meta.env.BASE_URL}content/legal/privacy-policy.md`
          );
          const fallbackContent = await fallbackResponse.text();
          setContent(await marked.parse(fallbackContent));
        } else {
          const content = await response.text();
          setContent(await marked.parse(content));
        }
      } catch (error) {
        console.error('Error loading privacy policy content:', error);
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
