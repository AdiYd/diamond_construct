import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Section,
  Heading,
  Text,
  Flex,
  Box,
  Grid,
  Button,
  Tabs,
  Card,
} from '@radix-ui/themes';
import { Image as ImageIcon, X, ChevronRight, ChevronLeft } from 'lucide-react';
import useScreen from '../hooks/useScreen';
import ContactSection from '../components/sections/contactUs';

// Project portfolio data
const portfolioProjects = [
  {
    id: 'kitchen-1',
    title: 'שיפוץ מטבח מודרני',
    category: 'kitchens',
    location: 'כרמיאל',
    description:
      'שיפוץ מקיף של מטבח ישן לעיצוב מודרני עם אי, ארונות בהירים ומשטח עבודה מאבן קיסר. המטבח החדש מספק פונקציונליות מקסימלית ואסתטיקה נקייה.',
    images: {
      before:
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2070&auto=format&fit=crop',
      process: [
        'https://images.unsplash.com/photo-1677159555085-b60f68166603?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    testimonial: {
      text: 'התהליך היה חלק מאוד, והתוצאה עולה על כל הציפיות שלנו. המטבח הפך להיות מרכז הבית.',
      author: 'משפחת לוי',
    },
  },
  {
    id: 'bathroom-1',
    title: 'שדרוג חדר אמבטיה',
    category: 'bathrooms',
    location: 'עכו',
    description:
      'שיפוץ מלא של חדר אמבטיה משנות ה-90 לחדר מודרני עם אריחים גדולים, מקלחון זכוכית ואביזרים בשחור מט.',
    images: {
      before:
        'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?q=80&w=1936&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1645427911017-c14b9416ce08?q=80&w=2070&auto=format&fit=crop',
      process: [
        'https://images.unsplash.com/photo-1632933964451-e11a62378034?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1639501295122-28c362020c63?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    testimonial: {
      text: 'הצוות עבד במקצועיות וסיים את העבודה מהר יותר מהצפוי. חדר האמבטיה נראה כמו מתוך מגזין עיצוב.',
      author: 'משפחת כהן',
    },
  },
  {
    id: 'house-renovation',
    title: 'שיפוץ דירה קומפלט',
    category: 'renovations',
    location: 'נהריה',
    description:
      'שיפוץ מקיף של דירה בת 4 חדרים שכלל החלפת ריצוף, צביעה, שדרוג מטבח וחדרי אמבטיה, החלפת דלתות ותאורה.',
    images: {
      before:
        'https://images.unsplash.com/photo-1560184611-064284d0e628?q=80&w=1974&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1585128903994-9788298932a6?q=80&w=1974&auto=format&fit=crop',
      process: [
        'https://images.unsplash.com/photo-1687385504211-cf7bc95bbcc9?q=80&w=2071&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    testimonial: {
      text: 'הדירה הישנה שלנו הפכה לבית חלומות מודרני! כל פרט נבחן בקפידה והעבודה בוצעה במקצועיות רבה.',
      author: 'משפחת טל',
    },
  },
  {
    id: 'private-house',
    title: 'בית פרטי מהיסוד',
    category: 'construction',
    location: 'כפר ורדים',
    description:
      'בניית בית פרטי בן 2 קומות מהיסוד, כולל תכנון מלא והתאמה לצרכי המשפחה. הבית כולל 5 חדרי שינה וחצר מעוצבת.',
    images: {
      before:
        'https://images.unsplash.com/photo-1620332372374-f108c53d2e03?q=80&w=1972&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1975&auto=format&fit=crop',
      process: [
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2067&auto=format&fit=crop',
      ],
    },
    testimonial: {
      text: 'מתחילת התכנון ועד למסירת המפתח, דיאמונד ליוותה אותנו בצורה מושלמת. הבית בדיוק כמו שחלמנו.',
      author: 'משפחת גולן',
    },
  },
  {
    id: 'kitchen-2',
    title: 'מטבח בסגנון כפרי',
    category: 'kitchens',
    location: 'מעלות',
    description:
      'שיפוץ והסבה של מטבח עירוני למטבח בסגנון כפרי מודרני עם ארונות עץ, אי גדול במרכז ופינת ישיבה מובנית.',
    images: {
      before:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2071&auto=format&fit=crop',
      process: [
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2070&auto=format&fit=crop',
      ],
    },
    testimonial: {
      text: 'המטבח החדש שלנו הוא החלל הכי אהוב עלינו בבית. הייעוץ והביצוע היו מעולים.',
      author: 'משפחת אברהם',
    },
  },
  {
    id: 'bathroom-2',
    title: 'חדר רחצה מעוצב',
    category: 'bathrooms',
    location: 'קריית ביאליק',
    description:
      'שדרוג חדר אמבטיה לדירה בת 3 חדרים, כולל אמבטיה חדשה, ארון אמבטיה תלוי, מראה מעוצבת ותאורה ייחודית.',
    images: {
      before:
        'https://images.unsplash.com/photo-1620626011761-996c9275e9df?q=80&w=2069&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1887&auto=format&fit=crop',
      process: [
        'https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
      ],
    },
    testimonial: {
      text: 'מקצועיות גבוהה ותוצאה מרשימה. חדר הרחצה שודרג מהיסוד והתוצאה היא חלל יפהפה ופונקציונלי.',
      author: 'משפחת שלומי',
    },
  },
  {
    id: 'apartment-renovation',
    title: 'חידוש דירה ישנה',
    category: 'renovations',
    location: 'חיפה',
    description:
      'שיפוץ מקיף לדירה משנות ה-70, כולל הריסת קירות פנימיים ליצירת חלל פתוח, החלפת תשתיות חשמל ואינסטלציה, ריצוף חדש ומטבח חדש.',
    images: {
      before:
        'https://images.unsplash.com/photo-1493809712911-5ff8e7d5a064?q=80&w=2070&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2080&auto=format&fit=crop',
      process: [
        'https://images.unsplash.com/photo-1560184611-da934a86fef1?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    testimonial: {
      text: 'הדירה עברה מהפך מדהים. יעקב וצוות דיאמונד פשוט עשו את הבלתי אפשרי והפכו דירה ישנה לחדשה ומודרנית.',
      author: 'משפחת אדרי',
    },
  },
  {
    id: 'garden-apartment',
    title: 'דירת גן עם חצר מעוצבת',
    category: 'renovations',
    location: 'כרמיאל',
    description:
      'שיפוץ דירת גן שכלל עיצוב מחדש של החצר, הקמת פרגולה, מטבח חיצוני ופינת ישיבה. בפנים שופצו חדרי השינה והמטבח.',
    images: {
      before:
        'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=2070&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop',
      process: [
        'https://images.unsplash.com/photo-1541183663121-1f2dbbe23a1d?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1574739782594-db4ead022697?q=80&w=1974&auto=format&fit=crop',
      ],
    },
    testimonial: {
      text: 'החצר הפכה להיות סלון חיצוני שאנחנו משתמשים בו כל השנה. השילוב של שיפוץ פנים וחוץ היה מושלם.',
      author: 'משפחת רוזן',
    },
  },
];

// Categories
const categories = [
  { id: 'all', label: 'הכל' },
  { id: 'kitchens', label: 'מטבחים' },
  { id: 'bathrooms', label: 'חדרי אמבטיה' },
  { id: 'renovations', label: 'שיפוצים כלליים' },
  { id: 'construction', label: 'בנייה פרטית' },
];

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  images: {
    before: string;
    after: string;
    process: string[];
  };
  testimonial: {
    text: string;
    author: string;
  };
}

interface LightboxProps {
  project: {
    id: string;
    title: string;
    category: string;
    location: string;
    description: string;
    images: {
      before: string;
      after: string;
      process: string[];
    };
    testimonial: {
      text: string;
      author: string;
    };
  };
  onClose: () => void;
  currentImageType: 'before' | 'after' | 'process';
  processIndex?: number;
  setProcessIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const Lightbox: React.FC<LightboxProps> = ({
  project,
  onClose,
  currentImageType,
  processIndex = 0,
  setProcessIndex,
}) => {
  const handlePrev = () => {
    if (currentImageType === 'process' && setProcessIndex && processIndex > 0) {
      setProcessIndex(processIndex - 1);
    }
  };

  const handleNext = () => {
    if (
      currentImageType === 'process' &&
      setProcessIndex &&
      processIndex < project.images.process.length - 1
    ) {
      setProcessIndex(processIndex + 1);
    }
  };

  let imageSrc = '';
  if (currentImageType === 'before') {
    imageSrc = project.images.before;
  } else if (currentImageType === 'after') {
    imageSrc = project.images.after;
  } else if (currentImageType === 'process' && processIndex !== undefined) {
    imageSrc = project.images.process[processIndex];
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '2rem',
        backdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      <Box
        style={{
          position: 'relative',
          //   width: '90%',
          padding: '1rem',
          maxWidth: '900px',
          height: '80vh',
          backgroundColor: 'transparent',
        }}
        onClick={e => e.stopPropagation()}
      >
        <Box
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            cursor: 'pointer',
            zIndex: 10,
          }}
          onClick={onClose}
        >
          <X size={24} color="white" />
        </Box>

        {currentImageType === 'process' && (
          <>
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                left: '1rem',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                cursor: processIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: processIndex === 0 ? 0.5 : 1,
                transform: 'translateY(-50%)',
                zIndex: 10,
              }}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} color="white" />
            </Box>

            <Box
              style={{
                position: 'absolute',
                top: '50%',
                right: '1rem',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                cursor:
                  processIndex === project.images.process.length - 1 ? 'not-allowed' : 'pointer',
                opacity: processIndex === project.images.process.length - 1 ? 0.5 : 1,
                transform: 'translateY(-50%)',
                zIndex: 10,
              }}
              onClick={handleNext}
            >
              <ChevronRight size={24} color="white" />
            </Box>
          </>
        )}

        <img
          src={imageSrc}
          alt={`${project.title} - ${currentImageType}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />

        <Box
          mx="auto"
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            padding: '1rem',
            backgroundColor: 'rgba(0,0,0,0.7)',
            width: '95%',
            color: 'white',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-3)',
          }}
        >
          <Text size="3" weight="bold">
            {project.title}
          </Text>
          <Text mx="2" size="2" style={{ opacity: 0.8 }}>
            {currentImageType === 'before'
              ? 'לפני השיפוץ'
              : currentImageType === 'after'
              ? 'אחרי השיפוץ'
              : `תהליך העבודה - שלב ${processIndex + 1} מתוך ${project.images.process.length}`}
          </Text>
        </Box>
      </Box>
    </motion.div>
  );
};

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageType, setCurrentImageType] = useState<'before' | 'after' | 'process'>('after');
  const [processIndex, setProcessIndex] = useState(0);
  const { isMobile } = useScreen();

  const filteredProjects =
    selectedCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter(project => project.category === selectedCategory);

  const openLightbox = (project: Project, imageType: 'before' | 'after' | 'process') => {
    setSelectedProject(project);
    setCurrentImageType(imageType);
    setProcessIndex(0); // Reset process index
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <Box dir="rtl">
      {/* Hero Section */}
      <Section
        size="3"
        style={{
          background: 'linear-gradient(to right, #30345e, #0b0e29)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box className="bg-pattern2"></Box>
        <Container style={{ zIndex: 10 }}>
          <Flex direction="column" align="center" gap="6" py="7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', maxWidth: '800px' }}
            >
              <Heading
                size={isMobile ? '8' : '9'}
                align="center"
                style={{ marginBottom: '1.5rem', color: 'white' }}
              >
                גלריית פרויקטים
              </Heading>
              <Text
                size="5"
                align="center"
                style={{ marginBottom: '2rem', color: 'var(--gray-8)', lineHeight: '1.6' }}
              >
                פה תוכלו לראות מגוון פרויקטים שביצענו - לפני ואחרי השיפוץ
              </Text>
            </motion.div>
          </Flex>
        </Container>
      </Section>

      {/* Filter Categories */}
      <Section size="2" style={{ background: 'var(--color-background)' }}>
        <Container>
          <Box style={{ overflowX: 'auto', padding: '1rem 0' }}>
            <Flex gap="3" justify="center" wrap="wrap">
              {categories.map(category => (
                <Button
                  key={category.id}
                  size="3"
                  variant={selectedCategory === category.id ? 'solid' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    minWidth: '120px',
                  }}
                >
                  {category.label}
                </Button>
              ))}
            </Flex>
          </Box>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section size="3" style={{ background: 'var(--gray-1)' }}>
        <Container>
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <Card
                  style={{
                    borderRadius: 'var(--radius-4)',
                    overflow: 'hidden',
                    // backgroundColor: 'white',
                    // boxShadow: 'var(--shadow-5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Project Images - Before & After */}
                  <Tabs.Root defaultValue="after">
                    <Tabs.List style={{ justifyContent: 'center' }}>
                      <Tabs.Trigger value="before">לפני</Tabs.Trigger>
                      <Tabs.Trigger value="after">אחרי</Tabs.Trigger>
                    </Tabs.List>

                    <Box style={{ position: 'relative' }}>
                      <Tabs.Content value="before">
                        <Box
                          style={{
                            position: 'relative',
                            height: '280px',
                            cursor: 'pointer',
                          }}
                          onClick={() => openLightbox(project, 'before')}
                        >
                          <img
                            src={project.images.before}
                            alt={`${project.title} - לפני השיפוץ`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                          <Box
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'rgba(0,0,0,0.2)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              //   ':hover': {
                              //     opacity: 1,
                              //   },
                            }}
                            className="image-overlay"
                          >
                            <Box
                              style={{
                                width: '3rem',
                                height: '3rem',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(5px)',
                              }}
                            >
                              <ImageIcon size={24} color="white" />
                            </Box>
                          </Box>
                        </Box>
                      </Tabs.Content>

                      <Tabs.Content value="after">
                        <Box
                          style={{
                            position: 'relative',
                            height: '280px',
                            cursor: 'pointer',
                          }}
                          onClick={() => openLightbox(project, 'after')}
                        >
                          <img
                            src={project.images.after}
                            alt={`${project.title} - אחרי השיפוץ`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                          <Box
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'rgba(0,0,0,0.2)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              //   ':hover': {
                              //     opacity: 1,
                              //   },
                            }}
                            className="image-overlay"
                          >
                            <Box
                              style={{
                                width: '3rem',
                                height: '3rem',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backdropFilter: 'blur(5px)',
                              }}
                            >
                              <ImageIcon size={24} color="white" />
                            </Box>
                          </Box>
                        </Box>
                      </Tabs.Content>
                    </Box>
                  </Tabs.Root>

                  <Box
                    style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}
                  >
                    <Heading size="3" mb="2">
                      {project.title}
                    </Heading>
                    <Text size="2" color="gray" mb="3">
                      מיקום: {project.location}
                    </Text>
                    <Text size="2" style={{ color: 'var(--gray-11)', flex: 1 }}>
                      {project.description}
                    </Text>

                    {/* View Process Button */}
                    {/* <Button
                      variant="outline"
                      mt="4"
                      onClick={() => openLightbox(project, 'process')}
                      style={{ alignSelf: 'flex-start' }}
                    >
                      צפה בתהליך העבודה
                    </Button> */}

                    {/* Testimonial Quote */}
                    {project.testimonial && (
                      <Box
                        mt="4"
                        style={{
                          padding: '1rem',
                          backgroundColor: 'var(--lime-a2)',
                          borderRadius: 'var(--radius-4)',
                          position: 'relative',
                        }}
                      >
                        <Text size="1" style={{ fontStyle: 'italic', color: 'var(--gray-11)' }}>
                          "{project.testimonial.text}"
                        </Text>
                        <Text size="1" weight="bold" mt="2" style={{ color: 'var(--accent-9)' }}>
                          — {project.testimonial.author}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Call to action */}
      <Section size="3" style={{ background: 'var(--accent-3)' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Flex
              direction="column"
              align="center"
              gap="4"
              style={{
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto',
                // padding: 'var(--space-6) 0',
              }}
            >
              <Heading as="h3" size="6">
                רוצים תוצאה דומה?
              </Heading>
              <Text size="3" style={{ marginBottom: '1.5rem' }}>
                צור איתנו קשר עכשיו לשיחת ייעוץ ראשונית ללא התחייבות
              </Text>
            </Flex>
          </motion.div>
        </Container>
        <ContactSection noBackground />
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedProject && (
          <Lightbox
            project={selectedProject}
            onClose={closeLightbox}
            currentImageType={currentImageType}
            processIndex={processIndex}
            setProcessIndex={setProcessIndex}
          />
        )}
      </AnimatePresence>

      {/* Add some CSS for hover effects */}
      <style>{`
        .image-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        *:hover > .image-overlay {
          opacity: 1;
        }
      `}</style>
    </Box>
  );
}
