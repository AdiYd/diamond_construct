import React from 'react';
// import { useLanguage } from '../context/LanguageContext';
import * as Dialog from '@radix-ui/react-dialog';
import { Button, Container, Section, Heading, Text, Flex, Box, TextField } from '@radix-ui/themes';
import { ChevronRight, X } from 'lucide-react';

export function Home() {
  // const { t } = useLanguage();
  const [showModal, setShowModal] = React.useState(false);

  return (
    <Box>
      {/* Hero Section */}
      <Section size="3" className="section-lg" style={{ backgroundColor: 'var(--accent-2)' }}>
        <Container>
          <Flex direction="column" align="center" gap="6" py="9">
            <Heading size="9" weight="bold" align="center" style={{ maxWidth: '42rem' }}>
              Welcome to Our Platform
            </Heading>
            <Text size="5" align="center" style={{ maxWidth: '42rem', color: 'var(--gray-11)' }}>
              Discover amazing features and capabilities that will help you achieve your goals.
            </Text>
            <Dialog.Root open={showModal} onOpenChange={setShowModal}>
              <Dialog.Trigger asChild>
                <Button size="4" variant="solid" radius="large">
                  Get Started
                  <ChevronRight size={16} />
                </Button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                  <Dialog.Title asChild>
                    <Heading size="6" mb="4">
                      Start Your Journey
                    </Heading>
                  </Dialog.Title>
                  <Dialog.Description asChild>
                    <Text size="3" mb="6" style={{ color: 'var(--gray-11)' }}>
                      Fill out this form to begin your journey with us.
                    </Text>
                  </Dialog.Description>

                  <form onSubmit={e => e.preventDefault()}>
                    <Flex direction="column" gap="4">
                      <Box>
                        <Text as="label" size="2" mb="2" weight="medium">
                          Name
                        </Text>
                        <TextField.Root>
                          <input type="text" placeholder="Enter your name" />
                        </TextField.Root>
                      </Box>

                      <Box>
                        <Text as="label" size="2" mb="2" weight="medium">
                          Email
                        </Text>
                        <TextField.Root>
                          <input type="email" placeholder="Enter your email" />
                        </TextField.Root>
                      </Box>

                      <Button type="submit" size="3" variant="solid" mt="2">
                        Submit
                      </Button>
                    </Flex>
                  </form>

                  <Dialog.Close asChild>
                    <Button
                      variant="ghost"
                      style={{
                        position: 'absolute',
                        top: 'var(--space-4)',
                        right: 'var(--space-4)',
                      }}
                    >
                      <X size={16} />
                    </Button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </Flex>
        </Container>
      </Section>

      {/* Features Section */}
      <Section size="3" className="section">
        <Container>
          <Heading size="7" align="center" mb="8">
            Our Features
          </Heading>
          <Flex gap="6" wrap="wrap">
            {[1, 2, 3].map(feature => (
              <Box
                key={feature}
                className="feature-card"
                style={{
                  flex: '1 1 300px',
                  backgroundColor: 'var(--gray-1)',
                  borderRadius: 'var(--radius-4)',
                  padding: 'var(--space-6)',
                  boxShadow: 'var(--shadow-4)',
                  minHeight: '280px',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Flex direction="column" justify="between" style={{ height: '100%' }}>
                  <Box>
                    <Box
                      mb="4"
                      style={{
                        width: '3rem',
                        height: '3rem',
                        backgroundColor: 'var(--accent-3)',
                        borderRadius: 'var(--radius-3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                    <Heading size="4" mb="3">
                      Feature {feature}
                    </Heading>
                    <Text size="2" style={{ color: 'var(--gray-11)' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                  </Box>
                  <Button size="2" variant="soft" mt="4">
                    Learn More
                    <ChevronRight size={16} />
                  </Button>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section
        size="3"
        className="section"
        style={{
          backgroundColor: 'var(--accent-a2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background elements */}
        <Box
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'var(--accent-a3)',
            top: '-100px',
            right: '-100px',
            opacity: 0.5,
          }}
        />
        <Box
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'var(--accent-a3)',
            bottom: '-50px',
            left: '-50px',
            opacity: 0.3,
          }}
        />
        <Container>
          <Flex direction="column" align="center" gap="6" py="9">
            <Heading
              size="8"
              align="center"
              style={{
                maxWidth: '42rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Ready to Get Started?
            </Heading>
            <Text
              size="4"
              align="center"
              style={{
                color: 'var(--accent-a11)',
                maxWidth: '36rem',
                lineHeight: '1.6',
              }}
            >
              Join thousands of satisfied users who have already taken the first step. Start your
              journey today and unlock amazing possibilities.
            </Text>
            <Flex gap="4" mt="4">
              <Button
                size="4"
                variant="solid"
                radius="large"
                className="hover-button"
                style={{
                  // backgroundColor: 'white',
                  // color: 'var(--accent-9)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                Start Now
                <ChevronRight size={16} />
              </Button>
              <Button
                size="4"
                variant="outline"
                radius="large"
                className="hover-button-light"
                // style={{
                //   borderColor: 'white',
                //   color: 'white',
                // }}
              >
                Learn More
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Section>
    </Box>
  );
}
