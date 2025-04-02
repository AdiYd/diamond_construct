import { motion } from 'framer-motion';
import { Box, Container, Heading, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import useScreen from '../../hooks/useScreen';
import useEmblaCarousel from 'embla-carousel-react';
import '../../styles/carousel.css';
import '../../styles/project-showcase.css';

// Team members data with images and descriptions
export const teamImages = [
  {
    id: 1,
    url: '/image/team/IMG_20240703_134753_141.jpg',
    title: 'גדי כהן',
    description: '8 שנות נאסיון בתחום הבנייה | מתמחה בשיפוצים ובניה פרטית',
    category: 'management',
    size: 'large',
  },
  {
    id: 2,
    url: '/image/team/IMG20250131124919.jpg',
    title: 'יעקב דיאמונד',
    description: 'מנהל פרויקטים ובעלים | מלווה אתכם בכל שלב, מהתכנון ועד הביצוע',
    category: 'customer-service',
    size: 'medium',
  },
  {
    id: 3,
    url: '/image/team/PXL_20240908_115634333.jpg',
    title: 'אלון דוד',
    description: 'אדריכל ראשי | שם דגש על פונקציונליות ואסתטיקה בכל פרויקט',
    category: 'design',
    size: 'small',
  },
  {
    id: 4,
    url: '/image/team/PXL_20241001_132821300.MP.jpg',
    title: 'אבי גולן',
    description: 'מנהל עבודה | מוביל את הצוות בשטח מתוך מחויבות לאיכות ולו״ז',
    category: 'construction',
    size: 'medium',
  },
  {
    id: 5,
    url: '/image/team/PXL_20241208_092655939.jpg',
    title: 'אלכס לוינסון',
    description: 'אני אתלכלך בשבילכם עד שהתוצאה תהיה מושלמת!',
    category: 'design',
    size: 'small',
  },
  {
    id: 6,
    url: '/image/team/PXL_20241010_115336941.jpg',
    title: 'דני מזרחי',
    description: 'ראש צוות שיפוצים | בעל ידע רב בכל תחומי הבנייה והשיפוצים',
    category: 'renovations',
    size: 'large',
  },
  {
    id: 7,
    url: '/image/team/PXL_20241001_132912903.jpg',
    title: 'צוות מנצח',
    description: 'הצוות שלנו הוא הלב של החברה - מקצועי, מסור ואכפתי',
    category: 'operations',
    size: 'medium',
  },
  {
    id: 8,
    url: '/image/team/PXL_20241007_105155714.jpg',
    title: 'אורי גולן',
    description: '',
    category: 'engineering',
    size: 'small',
  },
  {
    id: 9,
    url: '/image/team/PXL_20250216_081515079.MP~2.jpg',
    title: 'מאור שטרית',
    description: 'אנחנו עובדים תוך כבוד ושמירה על הסביבה שלכם ועל הטבע',
    category: 'design',
    size: 'large',
  },
  {
    id: 10,
    url: '/image/team/IMG-20250109-WA0083.jpg',
    title: 'דברו איתנו',
    description:
      'אנחנו כאן בשבילכם, יש לנו את הכלים והאנשים בשביל לשפץ לכם את הבית על הצד הטוב ביותר!',
    category: 'renovations',
    size: 'medium',
  },
  {
    id: 11,
    url: '/image/team/PXL_20240905_151748546.MP.jpg',
    title: 'מוכנים לכל אתגר',
    description: 'עובדים יחד כמו משפחה אחת למען ההצלחה שלכם',
    category: 'team',
    size: 'medium',
  },
  {
    id: 12,
    url: '/image/work/PXL_20250303_140836441.MP.jpg',
    title: 'האנשים שמאחורי הפרויקטים',
    description: 'צוות מקצועי, מסור ואכפתי שמתייחס לבית שלכם כאילו היה שלו',
    category: 'team',
    size: 'large',
  },
  {
    id: 13,
    name: 'אבי גולן',
    position: 'מנהל עבודה',
    url: 'image/team/PXL_20241001_132912903.jpg',
    description: 'אבי מוביל את הצוות בשטח מתוך מחויבות לאיכות ולו״ז',
    category: 'team',
    size: 'medium',
  },
];

export function TeamShowCase() {
  const navigate = useNavigate();
  const { isMobile } = useScreen();
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const shuffledTeamMembers = useRef([...teamImages].sort(() => Math.random() - 0.5)); // Shuffle team members

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
                {shuffledTeamMembers.current.slice(0, 10).map((member, index) => (
                  <Box key={member.id} className="embla__slide">
                    <motion.div
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box className="project-card">
                        <Box className="project-image-container" style={{ height: '300px' }}>
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}${member.url}`}
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
                              <Text as="div" align="right" className="project-description" size="2">
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
              {shuffledTeamMembers.current
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
            {shuffledTeamMembers.current.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`masonry-item ${member.size}`}
              >
                <Box className="project-card">
                  <Box className="project-image-container">
                    <img
                      style={{ borderRadius: 'var(--radius-4)' }}
                      src={`${import.meta.env.VITE_BASE_URL}${member.url}`}
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
                        <Text as="div" align="right" className="project-description" size="2">
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
              onClick={() => navigate('/about')}
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
