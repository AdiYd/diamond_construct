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
import teamData from './team.json'; // Fallback data for team members

// Define the TeamImage interface
export interface TeamImage {
  image: string;
  title: string;
  description: string;
  size: string;
  show?: boolean;
  hide?: boolean; // Optional property to hide certain members
}

export interface TeamMember {
  image: string;
  name: string;
  position: string;
  description: string;
  education: string;
  full: boolean;
}

export function TeamShowCase() {
  const navigate = useNavigate();
  const { isMobile } = useScreen();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setTeamImages] = useState<TeamImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const shuffledTeamImages = useRef<TeamImage[]>([]);
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

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`/content/team.json`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch team data');
        // }
        const data = teamData;
        if (data.length > 0) {
          const shuffled = [...data]
            .filter((member: TeamImage) => member.hide !== true)
            .sort(() => Math.random() - 0.5)
            .slice(0, 11);
          const mandatoryMembers = data.filter((member: TeamImage) => member.show === true);
          const combinedTeams = new Set([...shuffled, ...mandatoryMembers]);
          // Convert Set back to array and shuffle
          shuffledTeamImages.current = Array.from(combinedTeams).sort(() => Math.random() - 0.5);
        }
        setTeamImages(data);
      } catch (err) {
        console.error('Error fetching team data, showing fallback:', err);
        const data = teamData as TeamImage[]; // Fallback to local data
        if (data.length > 0) {
          const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 9);
          const mandatoryMembers = data.filter((member: TeamImage) => member.show === true);
          const combinedTeams = new Set([...shuffled, ...mandatoryMembers]);
          // Convert Set back to array and shuffle
          shuffledTeamImages.current = Array.from(combinedTeams).sort(() => Math.random() - 0.5);
        }
        setTeamImages(data);
        // setError('Failed to load team information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
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

  // Auto-scroll carousel
  useEffect(() => {
    if (!emblaApi) return;

    let clientEngaged = false;
    emblaApi.on('pointerDown', () => {
      clientEngaged = true; // User has engaged with the carousel
    });
    emblaApi.on('slideFocus', () => {
      clientEngaged = true; // User has engaged with the carousel
    });

    emblaApi.on('pointerUp', () => {
      clientEngaged = false;
    });

    const autoScroll = setInterval(() => {
      if (!clientEngaged && emblaApi) emblaApi.scrollNext();
    }, 4000);

    return () => {
      clearInterval(autoScroll);
      emblaApi.off('pointerDown', () => {
        clientEngaged = true;
      }); // Clean up event listener
      emblaApi.off('pointerUp', () => {
        clientEngaged = false;
      }); // Clean up event listener
      emblaApi.off('slideFocus', () => {
        clientEngaged = true;
      }); // Clean up event listener
      clearInterval(autoScroll);
    };
  }, [emblaApi]);

  if (loading) {
    return (
      <Box className="project-showcase" py="6">
        <Container>
          <Text align="center">טוען מידע על הצוות...</Text>
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
            הצוות שלנו
          </Heading>
          <Text
            as="div"
            align="center"
            mx="auto"
            weight="medium"
            size={isMobile ? '3' : '5'}
            style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'var(--gray-11)' }}
          >
            החוזק האמיתי שלנו הוא האנשים - צוות מקצועי, מנוסה, אכפתי ומסור
          </Text>
        </motion.div>

        {isMobile ? (
          // Mobile Embla Carousel View with improved spacing
          <Box mt="4" className="embla" style={{ position: 'relative' }}>
            <Box className="embla__viewport" ref={emblaRef}>
              <Box className="embla__container">
                {shuffledTeamImages.current.slice(0, 10).map((member, index) => (
                  <Box key={index} className="embla__slide">
                    <motion.div
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box className="project-card">
                        <Box className="project-image-container" style={{ height: '300px' }}>
                          <Asset
                            style={{ borderRadius: 'var(--radius-4)' }}
                            src={member.image}
                            alt={member.title}
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
                                {member.title}
                              </Text>
                              <Text
                                dir="ltr"
                                as="div"
                                align="right"
                                className="project-description"
                                size="2"
                              >
                                {member.description}
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
              {shuffledTeamImages.current
                .slice(0, 6)
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
            {shuffledTeamImages.current.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`masonry-item ${member.size}`}
              >
                <Box className="project-card">
                  <Box className="project-image-container">
                    <Asset
                      style={{ borderRadius: 'var(--radius-4)' }}
                      src={member.image}
                      alt={member.title}
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
                          {member.title}
                        </Text>
                        <Text
                          dir="ltr"
                          as="div"
                          align="right"
                          className="project-description"
                          size="2"
                        >
                          {member.description}
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
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              mx="auto"
              size="4"
              onClick={() => navigate('/about#team')}
              className="cta-button primary"
            >
              <Text>הכירו את הצוות המלא</Text>
              <ArrowRight size={16} style={{ marginRight: '8px', transform: 'scaleX(-1)' }} />
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
