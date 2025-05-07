import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import '../../styles/carousel.css';
import useScreen from '../../hooks/useScreen';

interface Testimonial {
  name: string;
  type: string;
  content: string;
  rating: number;
  project: string;
}

export function TestimonialCarousel() {
  const { isMobile, isTablet } = useScreen();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]); // Adjust type as needed
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`/content/testimonials.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials data');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  // Calculate slides to show based on screen size
  const getSlidesToShow = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3; // default for laptop and larger screens
  };

  const slidesToShow = getSlidesToShow();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    slidesToScroll: 1,
    containScroll: 'keepSnaps',
  });

  const goToSlide = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
      setCurrentIndex(index);
    }
  };

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setCurrentIndex(emblaApi.selectedScrollSnap()); // Update currentIndex on scroll
  }, [emblaApi]);

  //   const onScroll = useCallback(() => {
  //     if (!emblaApi) return;
  //     setCurrentIndex(emblaApi.selectedScrollSnap());
  //   }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    let autoScroll = null; // Declare autoScroll variable
    let clientEngaged = false; // Flag to check if the user has engaged with the carousel

    emblaApi.on('pointerDown', () => {
      clientEngaged = true; // User has engaged with the carousel
    });
    emblaApi.on('slideFocus', () => {
      clientEngaged = true; // User has engaged with the carousel
    });

    emblaApi.on('pointerUp', () => {
      clientEngaged = false;
    });

    autoScroll = setInterval(() => {
      if (emblaApi && !clientEngaged) emblaApi.scrollNext();
    }, 5000); // Auto-scroll every 5 seconds

    // Set the number of slides to show
    emblaApi.reInit();
    onSelect();
    emblaApi.on('select', onSelect); // Listen to the 'select' event
    emblaApi.on('reInit', onSelect);
    // emblaApi.on('scroll', onSelect); // Listen to the 'scroll' event

    // This helps with proper alignment after resize
    const handleResize = () => {
      if (emblaApi) emblaApi.reInit();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      emblaApi.off('select', onSelect); // Clean up event listener
      emblaApi.off('reInit', onSelect);
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
  }, [emblaApi, onSelect, slidesToShow]);

  return (
    <Box
      my={isMobile ? '8' : '4'}
      style={{ width: '100%', position: 'relative', padding: isMobile ? '0' : '0 1rem' }}
    >
      <Box className="embla" dir="ltr">
        <Box className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {testimonials.map((testimonial, index) => (
              <Box
                className="embla__slide"
                key={index}
                style={{
                  flex: `0 0 ${100 / slidesToShow}%`,
                  minWidth: 0,
                  padding: '0 8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    height: '100%',
                    // border: 'none',
                    borderRadius: '12px',
                    // backgroundColor: 'var(--background-color)',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '0.8px solid var(--gray-a7)',
                  }}
                >
                  {/* {index % 3 === 0 && <Box className="testimonial-decoration-1" />}
                  {index % 3 === 1 && <Box className="testimonial-decoration-2" />}
                  {index % 3 === 2 && <Box className="testimonial-decoration-3" />} */}
                  {index % 3 === 0 && <Box className="testimonial-background-1" />}
                  {index % 3 === 1 && <Box className="testimonial-background-2" />}
                  {index % 3 === 2 && <Box className="testimonial-background-3" />}
                  <Box
                    className="testimonial-quote-icon"
                    style={{
                      fontSize: '2rem',
                      fontFamily: 'serif',
                      top: '1.5rem',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                      }}
                    >
                      ❝
                    </div>
                  </Box>
                  <Flex
                    direction="column"
                    justify="between"
                    p="4"
                    // gap="4"
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <Flex direction="column" gap="3" align="center" my="4">
                      <Box style={{ textAlign: 'center' }}>
                        <Text size="4" weight="bold" mb="1" className="testimonial-author">
                          {testimonial.name}
                        </Text>
                        <br />
                        <Text size="2" style={{ color: 'var(--gray-11)' }}>
                          {testimonial.type}
                        </Text>
                      </Box>
                    </Flex>

                    <Text
                      as="div"
                      mx={isMobile ? 'auto' : undefined}
                      weight="medium"
                      align={isMobile ? 'center' : 'right'}
                      dir="rtl"
                      className="testimonial-text"
                      size="3"
                      mb="2"
                    >
                      {testimonial.content}
                    </Text>

                    {/* <Box
                      className="testimonial-quote-icon"
                      style={{
                        fontSize: '2rem',
                        fontFamily: 'serif',
                        bottom: '1.5rem',
                        left: '0.5rem',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                        }}
                      >
                        ❝
                      </div>
                    </Box> */}

                    <Flex gap="1" mt="2" justify="center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={i < testimonial.rating ? 'var(--yellow-9)' : 'transparent'}
                          stroke={i < testimonial.rating ? 'var(--amber-9)' : 'var(--gray-8)'}
                        />
                      ))}
                    </Flex>

                    <Text
                      size="2"
                      align="center"
                      style={{
                        color: 'var(--accent-11)',
                        marginTop: '1rem',
                        fontWeight: 500,
                      }}
                    >
                      {testimonial.project}
                    </Text>
                  </Flex>
                </div>
              </Box>
            ))}
          </div>
        </Box>

        {/* Navigation Buttons */}
        <Flex
          justify="center"
          gap="4"
          mt="6"
          style={{
            position: 'absolute',
            bottom: '-4rem',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <button
            className="embla__prev"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="embla__next"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </Flex>

        {/* Carousel pagination */}
        <Flex justify="center" mt="4">
          {testimonials
            .map((_, index) => (
              <Box
                key={index}
                className={`pagination-dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: currentIndex === index ? 'var(--accent-11)' : 'var(--gray-8)',
                  margin: '0 5px',
                  cursor: 'pointer',
                }}
              />
            ))
            .reverse()}
        </Flex>
      </Box>
    </Box>
  );
}
