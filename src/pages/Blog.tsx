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
  Card,
} from '@radix-ui/themes';
import { Calendar, ChevronRight, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with React and Radix UI',
    excerpt:
      'Learn how to build beautiful, accessible components using React and Radix UI primitives.',
    date: '2025-03-15',
    category: 'Development',
  },
  {
    id: 2,
    title: 'Mastering TypeScript in 2025',
    excerpt: 'Explore the latest features and best practices for TypeScript development.',
    date: '2025-03-10',
    category: 'TypeScript',
  },
  {
    id: 3,
    title: 'Building Responsive Layouts',
    excerpt: 'A comprehensive guide to creating responsive layouts that work across all devices.',
    date: '2025-03-05',
    category: 'Design',
  },
  {
    id: 4,
    title: 'State Management Simplified',
    excerpt: 'Modern approaches to managing state in React applications.',
    date: '2025-03-01',
    category: 'Development',
  },
];

export function Blog() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Section size="3" className="section-lg" style={{ backgroundColor: 'var(--accent-2)' }}>
        <Container>
          <Flex direction="column" align="center" gap="6" py="9">
            <Heading size="9" weight="bold" align="center">
              Our Blog
            </Heading>
            <Text size="5" align="center" style={{ maxWidth: '42rem', color: 'var(--gray-11)' }}>
              Insights, thoughts, and discoveries from our team.
            </Text>
          </Flex>
        </Container>
      </Section>

      {/* Featured Post */}
      <Section size="3" className="section">
        <Container>
          <Grid columns={{ initial: '1', md: '2' }} gap="8">
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
            <Flex direction="column" justify="center" gap="4">
              <Text size="2" style={{ color: 'var(--accent-11)' }}>
                Featured Post
              </Text>
              <Heading size="7" mb="2">
                The Future of Web Development
              </Heading>
              <Text size="3" style={{ color: 'var(--gray-11)' }}>
                Explore the latest trends and technologies shaping the future of web development.
                From AI-powered tools to new frameworks, we'll look at what's next.
              </Text>
              <Flex gap="4" mt="4">
                <Button variant="solid" size="3">
                  Read More
                  <ChevronRight size={16} />
                </Button>
              </Flex>
            </Flex>
          </Grid>
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section size="3" className="section" style={{ backgroundColor: 'var(--gray-1)' }}>
        <Container>
          <Heading size="6" mb="8">
            Latest Articles
          </Heading>
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="6">
            {blogPosts.map(post => (
              <Card
                key={post.id}
                className="blog-card"
                style={{
                  backgroundColor: 'var(--color-background)',
                  height: '100%',
                  transition: 'transform 0.2s ease',
                }}
              >
                <Flex direction="column" justify="between" style={{ height: '100%' }}>
                  <Box>
                    <AspectRatio ratio={16 / 9}>
                      <Box
                        style={{
                          backgroundColor: 'var(--accent-3)',
                          borderRadius: 'var(--radius-2)',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </AspectRatio>
                    <Box p="4">
                      <Flex gap="2" mb="2" align="center">
                        <Text size="1" style={{ color: 'var(--accent-11)' }}>
                          {post.category}
                        </Text>
                        <Text size="1" style={{ color: 'var(--gray-8)' }}>
                          •
                        </Text>
                        <Flex align="center" gap="1">
                          <Calendar size={12} />
                          <Text size="1" style={{ color: 'var(--gray-11)' }}>
                            {formatDate(post.date)}
                          </Text>
                        </Flex>
                      </Flex>
                      <Heading size="4" mb="3">
                        {post.title}
                      </Heading>
                      <Text size="2" style={{ color: 'var(--gray-11)' }}>
                        {post.excerpt}
                      </Text>
                    </Box>
                  </Box>
                  <Box p="4" pt="0">
                    <Button variant="soft" size="2">
                      Read Article
                      <ArrowRight size={14} />
                    </Button>
                  </Box>
                </Flex>
              </Card>
            ))}
          </Grid>

          {/* Load More */}
          <Flex justify="center" mt="8">
            <Button variant="soft" size="3">
              Load More Articles
              <ChevronRight size={16} />
            </Button>
          </Flex>
        </Container>
      </Section>

      {/* Newsletter Section */}
      <Section size="3" className="section">
        <Container>
          <Flex
            direction="column"
            align="center"
            gap="6"
            style={{ maxWidth: '32rem', margin: '0 auto' }}
          >
            <Heading size="6" align="center">
              Subscribe to Our Newsletter
            </Heading>
            <Text size="3" align="center" style={{ color: 'var(--gray-11)' }}>
              Get the latest articles and insights delivered straight to your inbox.
            </Text>
            <Flex direction={{ initial: 'column', sm: 'row' }} gap="2" style={{ width: '100%' }}>
              <Box style={{ flex: 1 }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input"
                  style={{
                    width: '100%',
                    height: '2.5rem',
                    padding: '0 1rem',
                    borderRadius: 'var(--radius-2)',
                    border: '1px solid var(--gray-6)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--gray-12)',
                  }}
                />
              </Box>
              <Button size="3">
                Subscribe
                <ArrowRight size={16} />
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Section>
    </Box>
  );
}
