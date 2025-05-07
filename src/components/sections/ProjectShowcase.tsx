import { motion } from 'framer-motion';
import { Box, Container, Heading, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import useScreen from '../../hooks/useScreen';
import useEmblaCarousel from 'embla-carousel-react';
import '../../styles/carousel.css';
import '../../styles/project-showcase.css';
import Asset from '../Asset';
import fallbackData from './projects.json';

// Define the Project interface
interface Project {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  size: string;
  show: boolean;
  video?: boolean;
}

export function ProjectShowcase() {
  const navigate = useNavigate();
  const { isMobile } = useScreen();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setProjectImages] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const shuffledProjects = useRef<Project[]>([]);
  // Set up Embla Carousel for mobile with improved spacing options
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: false,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/content/projects.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects data');
        }
        const data = await response.json();
        setProjectImages(data);
        if (data.length > 0) {
          // Create a shuffled selection of projects
          const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 9);

          // Find the special project with field show
          const mandatoryProjects = data.filter((p: Project) => p.show === true);

          if (mandatoryProjects.length > 0) {
            // Use a Set to ensure uniqueness
            const combinedProjects = new Set([...shuffled, ...mandatoryProjects]);
            shuffledProjects.current = Array.from(combinedProjects);
          } else {
            shuffledProjects.current = shuffled;
          }
        }
      } catch (err) {
        console.error('Error fetching project data, showing fallback:', err);
        const data = fallbackData as Project[]; // Fallback to local data
        setProjectImages(data);
        if (data.length > 0) {
          // Create a shuffled selection of projects
          const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 9);

          // Find the special project with field show
          const mandatoryProjects = data.filter((p: Project) => p.show === true);

          if (mandatoryProjects.length > 0) {
            // Use a Set to ensure uniqueness
            const combinedProjects = new Set([...shuffled, ...mandatoryProjects]);
            shuffledProjects.current = Array.from(combinedProjects);
          } else {
            shuffledProjects.current = shuffled;
          }
        }
        // setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    emblaApi.reInit(); // Reinitialize to apply settings
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (loading) {
    return (
      <Box className="project-showcase" py="6">
        <Container>
          <Text align="center">טוען פרויקטים...</Text>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="project-showcase" py="6">
        <Container>
          <Text align="center" color="red">
            {error}
          </Text>
        </Container>
      </Box>
    );
  }
  return (
    <Box className="project-showcase" py="6">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Heading
            mx="auto"
            size={{ initial: '6', sm: '7' }}
            align="center"
            className="section-title with-accent"
            mb="4"
          >
            הפרויקטים שלנו
          </Heading>
          <Text
            as="div"
            align="center"
            mx="auto"
            weight="medium"
            size={isMobile ? '3' : '5'}
            style={{ maxWidth: '600px', color: 'var(--gray-11)' }}
          >
            מבחר מהפרויקטים האחרונים שביצענו
          </Text>
        </motion.div>

        {isMobile ? (
          // Mobile Embla Carousel View with improved spacing
          <Box mt="4" className="embla" style={{ position: 'relative' }}>
            <Box className="embla__viewport" ref={emblaRef}>
              <Box className="embla__container">
                {shuffledProjects.current.slice(0, 10).map((project, index) => (
                  <Box key={index} className="embla__slide">
                    <motion.div
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box className="project-card">
                        <Box className="project-image-container" style={{ height: '300px' }}>
                          <Asset
                            video={project.video}
                            style={{ borderRadius: 'var(--radius-4)' }}
                            url={project.url}
                            alt={project.title}
                            className="project-image"
                          />
                          <Box className="project-overlay">
                            <div className="rt-r-position-absolute rt-r-bottom-3 rt-r-right-4">
                              <Text
                                as="div"
                                align="right"
                                className="project-title"
                                size="4"
                                weight="bold"
                              >
                                {project.title}
                              </Text>
                              <Text
                                as="div"
                                dir="ltr"
                                align="right"
                                className="project-description"
                                size="2"
                              >
                                {project.description}
                              </Text>
                            </div>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Dots navigation */}
            <Box
              className="embla__dots"
              style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
            >
              {shuffledProjects.current
                .map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`embla__dot ${selectedIndex === index ? 'embla__dot--active' : ''}`}
                  />
                ))
                .reverse()}
            </Box>
          </Box>
        ) : (
          // Desktop Masonry Layout
          <Box mt="4" className="masonry-gallery">
            {shuffledProjects.current.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`masonry-item ${project.size}`}
              >
                <Box className="project-card">
                  <Box className="project-image-container">
                    <Asset
                      video={project.video}
                      style={{ borderRadius: 'var(--radius-4)' }}
                      url={project.url}
                      alt={project.title}
                      className="project-image"
                    />
                    <Box className="project-overlay">
                      <Box width="100%" className="rt-r-position-absolute rt-r-bottom-4">
                        <Text
                          as="div"
                          align="right"
                          className="project-title"
                          size="4"
                          weight="bold"
                        >
                          {project.title}
                        </Text>
                        <Text
                          dir="ltr"
                          as="div"
                          align="right"
                          className="project-description"
                          size="2"
                        >
                          {project.description}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        )}

        <Box style={{ textAlign: 'center', marginTop: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              mx="auto"
              size="4"
              onClick={() => navigate('/gallery')}
              className="cta-button primary"
            >
              <Text>לצפיה בעוד פרויקטים</Text>
              <ArrowRight size={16} style={{ marginRight: '8px', transform: 'scaleX(-1)' }} />
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
