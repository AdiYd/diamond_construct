import { motion } from 'framer-motion';
import { Box, Container, Heading, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import useScreen from '../../hooks/useScreen';
import useEmblaCarousel from 'embla-carousel-react';
import '../../styles/carousel.css';
import '../../styles/project-showcase.css';

// Project data with images and descriptions
const projectImages = [
  {
    id: 1,
    url: '/image/IMG-20240517-WA0038.jpg',
    title: 'שיפוץ חדר אמבטיה',
    description: 'שיפוץ מלא של חדר אמבטיה כולל החלפת אריחים, כלים סניטריים ואביזרים',
    category: 'bathrooms',
    size: 'large',
  },
  {
    id: 2,
    url: '/image/IMG-20240517-WA0040.jpg',
    title: 'שיפוץ מטבח',
    description: 'שדרוג מטבח מודרני עם אי וארונות בהירים',
    category: 'kitchens',
    size: 'medium',
  },
  {
    id: 3,
    url: '/image/IMG-20240517-WA0041.jpg',
    title: 'עיצוב פנים',
    description: 'תכנון ועיצוב דירה שלמה בסגנון מודרני',
    category: 'design',
    size: 'small',
  },
  //   {
  //     id: 4,
  //     url: '/image/IMG-20240517-WA0042.jpg',
  //     title: 'תוספת בנייה',
  //     description: 'הרחבת בית פרטי עם תוספת קומה',
  //     category: 'construction',
  //     size: 'medium',
  //   },
  {
    id: 5,
    url: '/image/IMG-20240517-WA0043.jpg',
    title: 'שירותים ומקלחת',
    description: 'החלפת שירותים ומקלחת עם אריחים חדשים',
    category: 'renovations',
    size: 'small',
  },
  {
    id: 6,
    url: '/image/IMG-20240517-WA0046.jpg',
    title: 'מקלחת וכיור',
    description: 'חידוש מקלחת וכיור עם אריחים חדשים',
    category: 'bathrooms',
    size: 'large',
  },
  {
    id: 7,
    url: '/image/IMG-20240517-WA0047.jpg',
    title: 'חדר שינה',
    description: 'עיצוב חדר שינה בסגנון מינימליסטי',
    category: 'bedrooms',
    size: 'medium',
  },
  {
    id: 8,
    url: '/image/IMG-20240517-WA0048.jpg',
    title: 'שיפוץ כללי',
    description: 'שיפוץ פנים מטבח, כולל ארונות חדשים',
    category: 'renovations',
    size: 'small',
  },
  {
    id: 9,
    url: '/image/IMG-20240517-WA0054.jpg',
    title: 'שירוקלחת',
    description: 'התקנת שירותים ומקלחת חדשים',
    category: 'bathrooms',
    size: 'large',
  },
  {
    id: 10,
    url: '/image/IMG-20240517-WA0055.jpg',
    title: 'חדר רחצה',
    description: 'עיצוב חדר רחצה מודרני עם מקלחון',
    category: 'bathrooms',
    size: 'medium',
  },
  //   {
  //     id: 11,
  //     url: '/image/IMG-20250325-WA0004.jpg',
  //     title: 'עובדים יסודי ומקצועי',
  //     description: 'עבודה מקצועית עם דגש על פרטים',
  //     category: 'renovations',
  //     size: 'large',
  //   },
  {
    id: 12,
    url: '/image/IMG-20250325-WA0006.jpg',
    title: 'מטבח מעוצב',
    description: 'שיפוץ והתאמה אישית של מטבח',
    category: 'kitchens',
    size: 'medium',
  },
  {
    id: 13,
    url: '/image/IMG-20250325-WA0009.jpg',
    title: 'פינת קפה מעוצבת',
    description: 'פינת קפה מעוצבת עם ארונות חדשים',
    category: 'kitchens',
    size: 'small',
  },
  {
    id: 14,
    url: '/image/IMG-20250325-WA0016.jpg',
    title: 'שיפוץ מטבח',
    description: 'חידוש מטבח כולל ארונות חדשים ושטח עבודה',
    category: 'construction',
    size: 'large',
  },
  {
    id: 15,
    url: '/image/IMG-20250325-WA0020.jpg',
    title: 'עיצוב פנים מודרני',
    description: 'עיצוב פנים לדירה חדשה בסגנון מודרני',
    category: 'design',
    size: 'medium',
  },
];

export function ProjectShowcase() {
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
    // slides: {
    //   spacing: 16, // Add spacing between slides
    //   perView: 1.2, // Show a bit of the next slide
    //   origin: 'center', // Center align the active slide
    // },
  });

  const shuffledProjects = useRef([
    ...[...projectImages].sort(() => Math.random() - 0.5).slice(0, 9),
    {
      id: 11,
      url: '/image/IMG-20250325-WA0004.jpg',
      title: 'עובדים יסודי ומקצועי',
      description: 'עבודה מקצועית עם דגש על פרטים',
      category: 'renovations',
      size: 'medium',
    },
  ]); // Shuffle projects

  //   const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  //   const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

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
                  <Box key={project.id} className="embla__slide">
                    <motion.div
                      //   initial={{ opacity: 0, y: 20 }}
                      //   whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box className="project-card">
                        <Box className="project-image-container" style={{ height: '300px' }}>
                          <img
                            src={`${import.meta.env.BASE_URL}${project.url}`}
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
                              {/* <br /> */}
                              <Text as="div" align="right" className="project-description" size="2">
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

            {/* Navigation Buttons */}
            {/* <button
              className="embla__prev carousel-nav-button"
              onClick={scrollPrev}
              style={{
                backgroundColor: 'var(--accent-9)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '5px',
                zIndex: 10,
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={20} />
            </button>

            <button
              className="embla__next carousel-nav-button"
              onClick={scrollNext}
              style={{
                backgroundColor: 'var(--accent-9)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '5px',
                zIndex: 10,
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={20} />
            </button> */}

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
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`masonry-item ${project.size}`}
              >
                <Box className="project-card">
                  <Box className="project-image-container">
                    <img
                      style={{ borderRadius: 'var(--radius-4)' }}
                      src={`${import.meta.env.BASE_URL}${project.url}`}
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
                        {/* <br /> */}
                        <Text as="div" align="right" className="project-description" size="2">
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
            transition={{ duration: 0.5, delay: 0.5 }}
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
