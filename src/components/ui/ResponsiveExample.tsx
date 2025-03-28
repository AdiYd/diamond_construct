import React from 'react';
import { Box, Heading, Text, Card, Flex } from '@radix-ui/themes';
import useScreen from '../../hooks/useScreen';

export const ResponsiveExample: React.FC = () => {
  const { isMobile, isTablet, isLaptop, isDesktop, width, height } = useScreen();
  
  return (
    <Box p="4">
      <Card>
        <Heading size={{ initial: '6', sm: '7', md: '8' }} mb="4">
          Responsive Screen Demo
        </Heading>
        
        <Flex direction="column" gap="3">
          <Text size="4">Current viewport size: {width}px × {height}px</Text>
          
          <Box p="3" style={{ backgroundColor: 'var(--accent-2)', borderRadius: 'var(--radius-3)' }}>
            <Flex direction="column" gap="2">
              <Text as="div" weight={isMobile ? "bold" : "regular"} size="4">
                Mobile: {isMobile ? '✅' : '❌'}
              </Text>
              <Text as="div" weight={isTablet ? "bold" : "regular"} size="4">
                Tablet: {isTablet ? '✅' : '❌'}
              </Text>
              <Text as="div" weight={isLaptop ? "bold" : "regular"} size="4">
                Laptop: {isLaptop ? '✅' : '❌'}
              </Text>
              <Text as="div" weight={isDesktop ? "bold" : "regular"} size="4">
                Desktop: {isDesktop ? '✅' : '❌'} 
              </Text>
            </Flex>
          </Box>
          
          <Box style={{ marginTop: '1rem' }}>
            <Text size="3">
              {isMobile && "You're viewing on a mobile device"}
              {isTablet && "You're viewing on a tablet device"}
              {isLaptop && "You're viewing on a laptop display"}
              {isDesktop && "You're viewing on a desktop display"}
            </Text>
          </Box>
          
          <Box style={{ marginTop: '1rem' }}>
            <Text size="2">
              Resize your browser window to see how the component adapts to different screen sizes.
            </Text>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default ResponsiveExample;