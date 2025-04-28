import React from 'react';
import { Flex, Button, Card } from '@radix-ui/themes';
import useScreen from '../hooks/useScreen';
import { motion, AnimatePresence } from 'framer-motion';

const availableFonts = [
  'Alef',
  'Assistant',
  'Rubik',
  'Roboto',
  'Poppins',
  'Inter',
  'Montserrat',
  'Heebo',
  'Noto Sans Hebrew',
  'Noto Serif Hebrew',
  'David Libre',
];

const FontSelector = () => {
  const { isMobile } = useScreen();
  const [currentFont, setCurrentFont] = React.useState('Alef');
  const [isOpen, setIsOpen] = React.useState(true);
  const setFont = (font: string) => {
    document.documentElement.style.setProperty('--font-family', `'${font}', sans-serif`);
    setCurrentFont(font);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
        style={{ position: 'fixed', top: isMobile ? '10%' : '15%', left: '8px', zIndex: 1000 }}
      >
        <Card mx={'auto'}>
          {/* Closing button */}
          <div
            style={{
              display: 'flex',
              transition: 'all 0.3s ease',
              justifyContent: 'center',
              ...(isOpen && { marginBottom: '10px', borderBottom: '0.7px solid var(--accent-a8)' }),
            }}
          >
            <Button
              size="1"
              color="tomato"
              variant="ghost"
              mb={isOpen ? '2' : '0'}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? 'X' : 'Fonts'}
            </Button>
          </div>
          {isOpen && (
            <Flex direction="column" gap={'2'} justify={'between'}>
              {availableFonts.map(font => (
                <Button
                  size="1"
                  color="tomato"
                  variant={currentFont === font ? 'solid' : 'soft'}
                  key={font}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      '--font-family',
                      `'${font}', sans-serif`
                    );
                    setFont(font);
                  }}
                  style={{
                    border: '0.8px solid var(--accent-8)',
                    padding: '4px 8px',
                    borderRadius: '8px',
                  }}
                >
                  {font}
                </Button>
              ))}
            </Flex>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default FontSelector;
