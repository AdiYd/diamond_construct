import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { testimonials } from '../../content/testimonials';
import '../../styles/carousel.css';
import useScreen from '../../hooks/useScreen';

export function TestimonialCarousel() {
  const { isMobile, isTablet } = useScreen();

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

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Set the number of slides to show
    emblaApi.reInit();
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    // This helps with proper alignment after resize
    const handleResize = () => {
      if (emblaApi) emblaApi.reInit();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [emblaApi, onSelect, slidesToShow]);

  return (
    <Box
      my={isMobile ? '8' : '4'}
      style={{ width: '100%', position: 'relative', padding: '0 1rem' }}
    >
      <Box className="embla" dir="ltr">
        <Box className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {testimonials.map((testimonial, index) => (
              <Box
                className="embla__slide"
                key={testimonial.id}
                style={{
                  flex: `0 0 ${100 / slidesToShow}%`,
                  minWidth: 0,
                  padding: '0 8px',
                }}
              >
                <Card
                  style={{
                    display: 'flex',
                    height: '100%',
                  }}
                  className="testimonial-slide* modern-testimonial-card*"
                >
                  {index % 3 === 0 && <Box className="testimonial-decoration-1" />}
                  {index % 3 === 1 && <Box className="testimonial-decoration-2" />}
                  {index % 3 === 2 && <Box className="testimonial-decoration-3" />}
                  <Box
                    className="testimonial-quote-icon"
                    style={{
                      fontSize: '2rem',
                      fontFamily: 'serif',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        top: '0.5rem',
                      }}
                    >
                      ❝
                    </div>
                  </Box>
                  <Flex direction="column" gap="4" style={{ position: 'relative', zIndex: 1 }}>
                    <Flex direction="column" gap="3" align="center" mb="4">
                      <Box style={{ textAlign: 'center' }}>
                        <Text size="4" weight="bold" mb="1" className="testimonial-author">
                          {testimonial.name}
                        </Text>
                        <br />
                        <Text size="2" style={{ color: 'var(--gray-11)' }}>
                          {testimonial.role}
                        </Text>
                      </Box>
                    </Flex>

                    <Text dir="rtl" className="testimonial-text" size="3">
                      {testimonial.content}
                    </Text>

                    <Flex gap="1" mt="2" justify="center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={i < testimonial.rating ? 'var(--yellow-9)' : 'transparent'}
                          stroke={i < testimonial.rating ? 'var(--yellow-9)' : 'var(--gray-8)'}
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
                </Card>
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
      </Box>
    </Box>
  );
}
