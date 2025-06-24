import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, Flex, Text } from '@radix-ui/themes';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import '../../styles/carousel.css';
import useScreen from '../../hooks/useScreen';

interface TestimonialCardProps {
  testimonial: {
    name: string;
    type: string;
    content: string;
    rating: number;
    project: string;
  };
  index: number;
  isMobile: boolean;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Define content truncation conditions
  const maxLength = 80; // Character limit for truncation
  const shouldTruncate = testimonial.content.length > maxLength && !expanded;
  const displayContent = shouldTruncate
    ? `${testimonial.content.substring(0, maxLength).trim()}...`
    : testimonial.content;

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        borderRadius: '12px',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
        border: '0.8px solid var(--gray-a7)',
      }}
    >
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
        <div style={{ position: 'relative' }}>❝</div>
      </Box>

      <Flex
        direction="column"
        justify="between"
        dir="rtl"
        p="2"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingLeft: '2rem',
          paddingRight: '2rem',
        }}
      >
        <Flex direction="column" gap="3" align="center" mt="4" mb="2">
          <Box style={{ textAlign: 'center' }}>
            <Text size="4" weight="bold" mb="1" className="testimonial-author">
              {testimonial.name}
            </Text>
            <br />
            <br />
            <Text size="2" style={{ color: 'var(--gray-11)' }}>
              {testimonial.project}
            </Text>
          </Box>
        </Flex>

        <div>
          <Text
            as="div"
            weight="medium"
            align="right"
            dir="rtl"
            className="testimonial-text"
            size="3"
            mb="0"
            style={{ whiteSpace: 'pre-line' }}
          >
            {displayContent}
          </Text>

          {shouldTruncate && (
            <Text
              as="span"
              size="2"
              dir="ltr"
              style={{
                color: 'var(--accent-11)',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'block',
                textAlign: 'left',
                marginTop: '0.5rem',
              }}
              onClick={() => setExpanded(true)}
            >
              ...קרא עוד
            </Text>
          )}

          {expanded && (
            <Text
              as="span"
              size="2"
              style={{
                color: 'var(--accent-11)',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'block',
                textAlign: 'left',
                marginTop: '0.5rem',
              }}
              onClick={() => setExpanded(false)}
            >
              הצג פחות
            </Text>
          )}
        </div>

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
          dir="rtl"
          style={{
            color: 'var(--accent-11)',
            marginTop: '1rem',
            fontWeight: 500,
          }}
        >
          {testimonial.type}
        </Text>
      </Flex>
    </div>
  );
}

interface Testimonial {
  name: string;
  type: string;
  content: string;
  rating: number;
  project: string;
}

const testimonialsList: Testimonial[] = [
  {
    name: 'נעה קאליש',
    type: '8.2023',
    content:
      'התחלנו שיפוץ בעזרת ש.י.דיאמונד ממש בתחילת המלחמה, וכשהשכנים פנו אלי נלחצתי.אבל מה שהיה חשוב להם לומר היה שמעולם הם לא פגשו עובדי בניה כל כך חרוצים, נעימים ומתחשבים\nוכלקוחה, וגם כמעצבת שנים בתחום, הכרתי הרבה קבלנים, והפעם זה היה משהו אחר.\nעבודה מקצועית ברמה גבוהה ביותר, עם אחריות גם להמשך, והכל באווירה הכי טובה שיש, ובהרגשה הכי בטוחה שאפשר.\nלגבי פעמים נוספות - אני אעדיף להמתין שדיאמונד יוכלו לבצע את העבודה, גם אם זה ייקח זמן.',
    rating: 5,
    project: 'שיפוץ בית קומפלט, הוספת קומה על הגג בבניה קלה עם חלוקה ל- 2 יחידות דיור. כולל מדרגות',
  },
  {
    name: 'חגי דביר',
    type: '9.6.24',
    content: 'עשה לי כל מה שאני צריך. אחלה שירות.',
    rating: 5,
    project: 'שיפוץ משרד',
  },
  {
    name: 'יהודה ארנפרוינג',
    type: '8.7.24',
    content: 'השירות היה מצוין, הוא בסדר גמור. השתמשתי בשירות שלהם כבר כמה פעמים.',
    rating: 5,
    project: 'שיפוץ דירה שכלל שירותים, אמבטיה, חדר שינה, צביעה ובניה בחצר',
  },
  {
    name: 'יהודה קרוננברג',
    type: '8.7.24',
    content:
      'עשיתי כמה פעמים שיפוצים מאז שהגעתי לארץ, וזו פעם ראשונה שיש לי מישהו לדבר איתו, ושבן אדם נותן שירות. עם קבלנים אחרים כל הזמן היו ויכוחים זה כן שלי זה לא שלי, והוא עובד על הכל, יודע לדבר ולקחת אחריות על נזק שהעובדים שלו עשו, כי לכל קבלן יהיה נזק. בשורה התחתונה הוא בן אדם שנותן שירות עבודה ברמה מאד מאד גבוהה. היו כמה דברים שביקשתי שהוא יעשה שוב ובאמת לפני שהוא יצא הוא ואח שלו שגם בא לבית עשו רשימה של פינישים בלי שהייתי צריך לבקש, וגם אמרו דברים שלא חשבתי עליהם. אין שירות כזה בארץ, זה כמו בארצות הברית. מבחינת המחיר בטוח שילמתי יותר מקבלנים אחרים, המחיר שלו מוצדק בגלל האחריות, השירות והאיכות. לדוגמא לפני שנתיים וחצי עשיתי עבודה אצל קבלן אחר אבל הייתי צריך לשלם 50 אלף יותר כדי לעשות את העבודה שוב...',
    rating: 5,
    project:
      'בניית מטבח כוללה רחבה, שירותים, מדרגות, דק ופרגולה והתקנת דלתות וקווי מים וגז בבית פרטי.',
  },
  {
    name: 'מוטי כץ',
    type: '13.1.24 | ירושלים- מנכל "נפש יהודי"',
    content:
      'אני ממליץ מאד. הוא ישר, הגון ומקצועי מאד. לקח אחריות על העבודה שלו גם כשהיו שינויים. התאים את עצמו לשטח, כל דבר שאל אותנו לפני שעשה.',
    rating: 5,
    project:
      'שיפוץ מבנים בירושלים ובקריית שמונה, שכלל אינסטלציה, ריצוף, תקרה, צבע וחשמל, גינון ופרגולות בחצר.',
  },
  {
    name: 'משה לוי',
    type: '12.1.24 | סמנכל תשתיות ולוגיסטיקה "איחוד הצלה"',
    content: 'הוא אדם מאד אמין, דייקן, עומד במה שסגרנו ולא מרמה.',
    rating: 5,
    project: 'שיפוץ בית עסק שכלל עבודות בחשמל, צבע, מטבח, אינסטלציה במתחם בגודל 120 מ"ר.',
  },
  {
    name: 'משה רוט',
    type: '8.7.24',
    content: 'הוא בחור מדהים בעל מרץ עבודה ורצון טוב, רוצה להצליח, המלצתי עליו כבר לאנשים',
    rating: 5,
    project: 'בניית מקלחות בישיבה, שיפוץ דירות כולל תיקון צנרת וצביעת 4-5 קומות',
  },
  {
    name: 'צחי בסו',
    type: '10.1.24',
    content: 'ממליץ מאד, מקצועיים, רציניים. הם אחלה אנשים, הייתי מבסוט',
    rating: 5,
    project: 'בניה קלה של שני חדרים',
  },
  {
    name: 'קרלוס פרטו',
    type: '8.7.24',
    content: 'הוא מצוין, אחלה, עדיין לא סיימנו, נשארו עוד כמה דברים קטנים',
    rating: 5,
    project: 'שיפוץ דירה שכלל עבודות חשמל, צביעה, אינסטלציה וריצוף',
  },
];

export function TestimonialCarousel() {
  const { isMobile, isTablet } = useScreen();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials] = useState<Testimonial[]>(testimonialsList);
  const emblaContainerRef = useRef<HTMLDivElement>(null);
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
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const isClientEngaged = { value: false };
    const isHovering = { value: false };

    // Pointer events
    emblaApi.on('pointerDown', () => {
      isClientEngaged.value = true;
    });

    emblaApi.on('slideFocus', () => {
      isClientEngaged.value = true;
    });

    emblaApi.on('pointerUp', () => {
      isClientEngaged.value = false;
    });

    // Add hover detection
    const handleMouseEnter = () => {
      isHovering.value = true;
    };

    const handleMouseLeave = () => {
      isHovering.value = false;
    };

    // Add event listeners to the carousel container
    const containerElement = emblaContainerRef.current;
    if (containerElement) {
      containerElement.addEventListener('mouseenter', handleMouseEnter);
      containerElement.addEventListener('mouseleave', handleMouseLeave);
    }

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

    // Set up the auto-scroll interval
    const autoScrollInterval = setInterval(() => {
      // Only scroll if the user is not hovering and not actively engaging
      if (emblaApi && !isClientEngaged.value && !isHovering.value) {
        emblaApi.scrollNext();
      }
    }, 5000); // Auto-scroll every 5 seconds

    return () => {
      window.removeEventListener('resize', handleResize);

      // Remove hover detection listeners
      if (containerElement) {
        containerElement.removeEventListener('mouseenter', handleMouseEnter);
        containerElement.removeEventListener('mouseleave', handleMouseLeave);
      }

      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);

      // Using proper closures for event handlers
      const pointerDownHandler = () => {
        isClientEngaged.value = true;
      };
      const pointerUpHandler = () => {
        isClientEngaged.value = false;
      };
      const slideFocusHandler = () => {
        isClientEngaged.value = true;
      };

      emblaApi.off('pointerDown', pointerDownHandler);
      emblaApi.off('pointerUp', pointerUpHandler);
      emblaApi.off('slideFocus', slideFocusHandler);

      clearInterval(autoScrollInterval);
    };
  }, [emblaApi, onSelect, slidesToShow]);

  return (
    <Box
      my={isMobile ? '8' : '4'}
      style={{ width: '100%', position: 'relative', padding: isMobile ? '0' : '0 1rem' }}
    >
      <Box className="embla" dir="ltr" ref={emblaContainerRef}>
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
                <TestimonialCard testimonial={testimonial} index={index} isMobile={isMobile} />
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
                dir="ltr"
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
