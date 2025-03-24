import React from 'react';
import {
  Box,
  Container,
  Section,
  Heading,
  Text,
  Flex,
  Grid,
  Button,
  AspectRatio,
} from '@radix-ui/themes';
import { ChevronRight } from 'lucide-react';
// import { useLanguage } from '../context/LanguageContext';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO & Founder',
    bio: 'John has over 15 years of experience in the industry, leading innovative projects and building successful teams. His vision drives our company forward.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO',
    bio: 'Jane brings technical excellence to our team with her background in software architecture and system design. She ensures we stay at the cutting edge.',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Lead Designer',
    bio: 'Mike transforms complex problems into elegant solutions. His design philosophy combines aesthetics with functionality.',
  },
];

export function About() {
  // const { t } = useLanguage();
  const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);
  console.log(selectedMember);

  return (
    <Box>
      {/* Hero Section */}
      <Section size="3" className="section-lg" style={{ backgroundColor: 'var(--accent-2)' }}>
        <Container>
          <Flex direction="column" align="center" gap="6" py="9">
            <Heading size="9" weight="bold" align="center">
              About Us
            </Heading>
            <Text size="5" align="center" style={{ maxWidth: '42rem', color: 'var(--gray-11)' }}>
              We're a team of passionate individuals dedicated to creating amazing experiences.
            </Text>
          </Flex>
        </Container>
      </Section>

      {/* Story Section */}
      <Section size="3" className="section">
        <Container>
          <Grid columns={{ initial: '1', md: '2' }} gap="8" align="center">
            <Box>
              <Heading size="7" mb="4">
                Our Story
              </Heading>
              <Flex direction="column" gap="4">
                <Text size="3" style={{ color: 'var(--gray-11)' }}>
                  Founded in 2020, we set out to revolutionize how people interact with technology.
                  Our journey began with a simple idea: make complex solutions accessible to
                  everyone.
                </Text>
                <Text size="3" style={{ color: 'var(--gray-11)' }}>
                  Today, we continue to push boundaries and innovate, always keeping our users at
                  the heart of everything we do.
                </Text>
              </Flex>
            </Box>
            <AspectRatio ratio={16 / 9}>
              <Box
                style={{
                  backgroundColor: 'var(--accent-3)',
                  borderRadius: 'var(--radius-4)',
                  width: '100%',
                  height: '100%',
                }}
              />
            </AspectRatio>
          </Grid>
        </Container>
      </Section>

      {/* Values Section */}
      <Section size="3" className="section" style={{ backgroundColor: 'var(--gray-1)' }}>
        <Container>
          <Heading size="7" align="center" mb="8">
            Our Values
          </Heading>
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="6">
            {['Innovation', 'Quality', 'Integrity'].map(value => (
              <Box
                key={value}
                style={{
                  backgroundColor: 'var(--accent-2)',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-4)',
                  boxShadow: 'var(--shadow-2)',
                }}
              >
                <Box
                  mb="4"
                  style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: 'var(--accent-3)',
                    borderRadius: 'var(--radius-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <Heading size="4" mb="2">
                  {value}
                </Heading>
                <Text size="2" style={{ color: 'var(--gray-11)' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Team Section */}
      <Section size="3" className="section">
        <Container>
          <Heading size="7" align="center" mb="8">
            Meet Our Team
          </Heading>
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="6">
            {teamMembers.map(member => (
              <Box
                key={member.id}
                className="team-card"
                style={{
                  backgroundColor: 'var(--gray-1)',
                  borderRadius: 'var(--radius-4)',
                  padding: 'var(--space-6)',
                  height: '100%',
                  minHeight: '320px',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Flex direction="column" justify="between" style={{ height: '100%' }}>
                  <Box>
                    <Box
                      style={{
                        width: '8rem',
                        height: '8rem',
                        margin: '0 auto',
                        backgroundColor: 'var(--accent-3)',
                        borderRadius: '50%',
                        marginBottom: 'var(--space-4)',
                      }}
                    />
                    <Heading size="4" mb="2" align="center">
                      {member.name}
                    </Heading>
                    <Text
                      size="2"
                      align="center"
                      style={{ color: 'var(--gray-11)', marginBottom: 'var(--space-4)' }}
                    >
                      {member.role}
                    </Text>
                    <Text
                      size="2"
                      align="center"
                      style={{ color: 'var(--gray-11)', marginBottom: 'var(--space-4)' }}
                    >
                      {member.bio.substring(0, 100)}...
                    </Text>
                  </Box>
                  <Flex mt="4" justify="center">
                    <Button variant="soft" onClick={() => setSelectedMember(member)}>
                      View Bio
                      <ChevronRight size={16} />
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Grid>
        </Container>
      </Section>
    </Box>
  );
}
