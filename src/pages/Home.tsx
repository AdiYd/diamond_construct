import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Button,
  Container,
  Section,
  Heading,
  Text,
  Flex,
  Box,
  TextField,
  Grid,
  Card,
  IconButton,
} from '@radix-ui/themes';
import { Icon } from '@iconify/react';
import {
  ChevronRight,
  X,
  Building2,
  Wrench,
  CheckCircle2,
  Construction,
  Heart,
  Hammer,
  Quote,
  ArrowLeft,
  ChevronLeft,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import useScreen from '../hooks/useScreen';

interface FormData {
  name: string;
  phone: string;
  email: string;
}

export function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const { isMobile } = useScreen();

  const validateForm = () => {
    const errors: Partial<FormData> = {};
    if (!formData.name) errors.name = 'נדרש למלא שם';
    if (!formData.phone) errors.phone = 'נדרש למלא מספר טלפון';
    else if (!/^[0-9-+\s()]*$/.test(formData.phone)) errors.phone = 'מספר טלפון לא תקין';
    if (!formData.email) errors.email = 'נדרש למלא אימייל';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = 'כתובת אימייל לא תקינה';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      setShowModal(false);
      setFormData({ name: '', phone: '', email: '' });
      setFormErrors({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Helper to determine sizes based on screen width

  return (
    <Box dir="rtl">
      {/* Hero Section - Enhanced with improved styling */}
      <Section
        size="3"
        className="hero-background"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/31117955/pexels-photo-31117955.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          color: 'white',
          overflow: 'hidden',
          padding: isMobile ? '3rem 1rem' : undefined,
        }}
      >
        {/* Enhanced decorative elements */}
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
            }}
            className="decorative-circle"
            style={{
              position: 'absolute',
              width: isMobile ? '8rem' : '16rem',
              height: isMobile ? '8rem' : '16rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              top: '25%',
              right: isMobile ? '10%' : '25%',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="decorative-circle"
            style={{
              position: 'absolute',
              width: isMobile ? '6rem' : '12rem',
              height: isMobile ? '6rem' : '12rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
              top: '33%',
              left: isMobile ? '5%' : '33%',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: isMobile ? 'none' : 'block',
            }}
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="decorative-circle"
            style={{
              position: 'absolute',
              width: isMobile ? '10rem' : '20rem',
              height: isMobile ? '10rem' : '20rem',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 70%)',
              borderRadius: '50%',
              bottom: '25%',
              left: isMobile ? '-5%' : '25%',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />

          {/* Add geometric accent shapes for modern look */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              top: '15%',
              left: '15%',
              width: isMobile ? '80px' : '120px',
              height: isMobile ? '80px' : '120px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transform: 'rotate(45deg)',
              display: isMobile ? 'none' : 'block',
            }}
          />
        </Box>

        <Container
          mt={{ initial: isMobile ? '8' : '0', sm: '4' }}
          style={{ position: 'relative', zIndex: 2, width: '100%' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Flex direction="column" align="center" gap="6" py={{ initial: '0', sm: '6' }}>
              <Box className="hero-badge">
                <Wrench color="var(--accent-contrast)" size={16} />
                <Text
                  size={{ initial: '2', sm: '3', md: '2' }}
                  style={{ color: 'var(--accent-contrast)', opacity: 0.9 }}
                >
                  בניה • שיפוצים • תחזוקה
                </Text>
              </Box>
              <Flex direction="column" align="center" gap="4">
                <Heading
                  size={{ initial: '6', xs: '7', sm: '8', md: '9' }}
                  weight="bold"
                  align="center"
                  className="hero-heading"
                  style={{
                    width: '100%',
                    // maxWidth: '85%',
                  }}
                >
                  שיפוץ מקצועי מהתכנון ועד המסירה
                </Heading>

                {!isMobile && (
                  <Text
                    size={{ initial: '5', sm: '4', md: '5' }}
                    align="center"
                    className="hero-text*"
                    style={{
                      width: '100%',
                      fontSize: '1.6rem',
                      // maxWidth: '42rem',
                      opacity: 0.9,
                      padding: '0 1rem',
                    }}
                  >
                    Diamond – מקצועיות ואכפתיות מכל הלב
                  </Text>
                )}

                <Text
                  size={{ initial: '2', sm: '3', md: '4' }}
                  align="center"
                  className="hero-text"
                  style={{
                    width: '100%',
                    // maxWidth: '42rem',
                    opacity: 0.85,
                    padding: isMobile ? '0' : '0 1rem',
                  }}
                >
                  אנחנו כאן כדי להפוך את הבית שלכם למה שתמיד חלמתם עליו מבלי לעבור מסע ייסורים בדרך.
                  עם ניסיון עשיר, צוות איכותי ושקיפות מלאה – אנחנו מציעים חוויית שיפוץ אחרת: בטוחה,
                  מדויקת, ומלאת אכפתיות.
                </Text>
              </Flex>

              <Flex justify="center" gap="4" mt={isMobile ? '0' : '2'}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size={{ initial: '3', sm: '4' }}
                    className="hero-cta"
                    style={{
                      alignItems: 'center',
                    }}
                    mb={isMobile ? '8' : '0'}
                    onClick={() => setShowModal(true)}
                  >
                    צור קשר עכשיו
                    <Icon icon="ion:diamond-sharp" width={20} />
                  </Button>
                </motion.div>
              </Flex>
            </Flex>
          </motion.div>
        </Container>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            bottom: isMobile ? '5px' : '10px',
            left: isMobile ? '45%' : '49%',
            display: 'grid',
            transform: 'translateX(-50%)',
            // background: 'rgba(255, 255, 255, 0.1)',
            // backdropFilter: 'blur(5px)',
            borderRadius: '50%',
            padding: '0.5rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
            fontSize: '1.6rem',
            color: 'white',
            zIndex: 200,
          }}
        >
          <ChevronRight
            // rotate={90}
            color="white"
            size={isMobile ? 24 : 32}
            style={{
              color: 'white',
              // opacity: 0.9,
              transform: 'rotate(90deg)',
            }}
          />
          <ChevronRight
            // rotate={90}
            color="white"
            size={isMobile ? 24 : 32}
            style={{
              color: 'white',
              position: 'relative',
              top: '-8px',
              // opacity: 0.9,
              transform: 'rotate(90deg)',
            }}
          />
        </motion.div>
      </Section>

      {/* Services Section - Enhanced with modern card design */}
      <Section
        size="3"
        className="section"
        style={{
          background: 'linear-gradient(to bottom right, var(--gray-1), var(--gray-2))',
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? '4rem 1.5rem' : '5rem 2rem',
        }}
      >
        {/* Enhanced background pattern with motion */}
        <motion.div
          className=""
          animate={{
            opacity: [0.03, 0.05, 0.03],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'easeInOut',
          }}
        />

        <Container style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'block' }}>
              <Heading
                mx={isMobile ? 'auto' : ''}
                size={{ initial: '6', sm: '7' }}
                align={isMobile ? 'center' : 'right'}
                className="section-title with-accent"
                mb="4"
              >
                שירותי שיפוצים ובנייה בצפון
              </Heading>

              <Text
                size={{ initial: '3', sm: '4' }}
                align="center"
                mb="8"
                style={{
                  maxWidth: '800px',
                  // margin: '0 auto 2.5rem auto',
                  color: 'var(--gray-11)',
                  opacity: 0.9,
                  // padding: '0 1rem',
                  lineHeight: 1.7,
                }}
              >
                אצלנו תקבלו ליווי אישי וצמוד לכל אורך הדרך – משלב הרעיון ועד גמר נקי ומסודר. אנחנו
                מתמחים בבנייה פרטית, תוספות בנייה, שיפוץ כללי, חידוש מטבחים, אמבטיות ותחזוקה שוטפת.
              </Text>
            </div>

            <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="6" width="100%" pt="4">
              {[
                {
                  icon: <Building2 size={28} />,
                  title: 'שיפוץ דירות ובתים קומפלט',
                  description:
                    'אנחנו מבצעים שיפוץ כולל לדירות ובתים – משלב הפירוק ועד הגימור הסופי. התהליך כולל תכנון מחודש של החלל, עבודות חשמל ואינסטלציה, ריצוף, צבע, נגרות ועוד.',
                  color: 'var(--accent-9)',
                  gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
                },
                {
                  icon: <Construction size={28} />,
                  title: 'תוספות בנייה ותכנון מותאם אישית',
                  description:
                    'זקוקים לעוד חדר? משרד ביתי? יחידת דיור? אנחנו מתמחים בביצוע תוספות בנייה לפי כל התקנים – תוך שיתוף פעולה עם מהנדסים, אדריכלים ומעצבים.',
                  color: 'var(--accent-10)',
                  gradient: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
                },
                {
                  icon: <Wrench size={28} />,
                  title: 'שיפוץ מטבחים וחדרי רחצה',
                  description:
                    'המטבח וחדר הרחצה הם החללים הכי שימושיים בבית – ואצלנו הם זוכים לטיפול מיוחד. שיפוץ חכם ומדויק הכולל החלפת תשתיות, חיפויים מודרניים וריצוף איכותי.',
                  color: 'var(--accent-11)',
                  gradient: 'linear-gradient(135deg, #F43F5E, #FB7185)',
                },
                {
                  icon: <Hammer size={28} />,
                  title: 'תחזוקה שוטפת ואחזקת מבנים',
                  description:
                    'שירותי תחזוקה שוטפת לבניינים, עסקים ובתים פרטיים – כולל תיקוני צבע, עבודות גבס, טיפול בנזילות, תיקוני חשמל, תחזוקה של תשתיות ועוד.',
                  color: 'var(--accent-9)',
                  gradient: 'linear-gradient(135deg, #65A30D, #84CC16)',
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                  }}
                >
                  <Box
                    style={{
                      background: 'var(--gray-1)',
                    }}
                    className="modern-service-card"
                  >
                    {/* Decorative elements */}
                    <Box className="service-card-decoration-corner" />
                    <Box className="service-card-decoration-circle" />

                    {/* Icon container */}
                    <Box
                      className="service-icon-container"
                      style={{
                        background: service.gradient,
                      }}
                    >
                      {service.icon}
                    </Box>

                    <Heading size="4" weight="bold" mb="3" style={{ position: 'relative' }}>
                      {service.title}
                    </Heading>

                    <Text
                      size="2"
                      style={{
                        color: 'var(--gray-11)',
                        margin: '0 0 1.5rem 0',
                        lineHeight: 1.6,
                      }}
                    >
                      {service.description}
                    </Text>

                    <Box className="service-card-action">
                      <Button variant="ghost" className="read-more-button">
                        קרא עוד
                        <ArrowLeft size={16} />
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Grid>

            {/* Enhanced CTA Button */}
            <Flex justify="center" mt="9">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="solid"
                  size="3"
                  className="cta-button primary"
                  onClick={() => setShowModal(true)}
                >
                  צור קשר לייעוץ
                  <ArrowLeft size={16} />
                </Button>
              </motion.div>
            </Flex>
          </motion.div>
        </Container>
      </Section>

      {/* Benefits Section - Enhanced with modern card design */}
      <Section
        size="3"
        style={{
          // background: 'linear-gradient(to bottom, var(--accent-a2), var(--gray-1))',
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? '4rem 1.5rem' : '5rem 2rem',
        }}
      >
        <Box className="bg-pattern2" />
        {/* Add decorative elements */}
        <Box className="benefits-background-decoration" />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              mx="auto"
              size={{ initial: '6', sm: '7' }}
              align="center"
              className="section-title with-accent"
              mb="4"
            >
              למה לבחור בנו?
            </Heading>

            <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="6" width="100%" pt="4">
              {[
                {
                  icon: <CheckCircle2 size={28} />,
                  title: 'מקצועיות וניסיון',
                  description:
                    'צוות שעבר הכשרות מתקדמות, עם תודעת שירות גבוהה ותשומת לב מיוחדת לכל פרט ופרט.',
                  color: 'var(--blue-9)',
                  borderColor: 'var(--blue-6)',
                  bgColor: 'var(--blue-3)',
                },
                {
                  icon: <Heart size={28} />,
                  title: 'שקיפות מלאה',
                  description:
                    'חוזה מסודר, לוחות זמנים ברורים, הצעת מחיר מפורטת ועדכונים שוטפים בקבוצת וואטסאפ ייעודית לפרויקט.',
                  color: 'var(--crimson-9)',
                  borderColor: 'var(--crimson-6)',
                  bgColor: 'var(--crimson-3)',
                },
                {
                  icon: <Clock size={28} />,
                  title: 'עמידה בזמנים',
                  description:
                    'הזמן שלכם יקר לנו. אנחנו עומדים בלוחות הזמנים שנקבעו מראש ומתחייבים לסיום הפרויקט במועד.',
                  color: 'var(--amber-9)',
                  borderColor: 'var(--amber-6)',
                  bgColor: 'var(--amber-3)',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                  }}
                >
                  <Box
                    className="modern-benefit-card"
                    style={{
                      borderColor: benefit.borderColor,
                      background: `linear-gradient(145deg, var(--gray-1), ${benefit.bgColor})`,
                    }}
                  >
                    <Box
                      className="benefit-icon-container"
                      style={{
                        backgroundColor: benefit.bgColor,
                        color: benefit.color,
                      }}
                    >
                      {benefit.icon}
                      <Box className="benefit-icon-glow" style={{ background: benefit.color }} />
                    </Box>

                    <Heading size="4" mb="3" className="benefit-title">
                      {benefit.title}
                    </Heading>

                    <Text
                      size="2"
                      className="benefit-description"
                      style={{ color: 'var(--gray-11)' }}
                    >
                      {benefit.description}
                    </Text>
                  </Box>
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials Section - Enhanced with modern design */}
      <Section size="3" className="testimonials-section">
        <Container>
          <Heading
            mx="auto"
            size={{ initial: '6', sm: '7' }}
            align="center"
            className="section-title with-accent"
            mb="4"
          >
            מה הלקוחות שלנו אומרים?
          </Heading>

          <Card className="modern-testimonial-card">
            {/* Enhanced quote icon */}
            <Box className="testimonial-quote-icon">
              <Quote size={28} />
            </Box>

            {/* Add decorative elements */}
            <Box className="testimonial-decoration-1" />
            <Box className="testimonial-decoration-2" />

            <Text size={{ initial: '4', sm: '5' }} align="center" className="testimonial-text">
              "יעקב והצוות פשוט תענוג לעבוד איתם. מקצועיים, מדויקים, זמינים ורגועים. השיפוץ עבר
              בצורה חלקה ומסודרת עם תקשורת מעולה – לא האמנתי שזה אפשרי! ממליצה בחום."
            </Text>

            <Flex className="testimonial-author" align="center" justify="center" gap="3" mt="4">
              <Box className="testimonial-avatar">
                <Text>א</Text>
              </Box>
              <Text size="3" weight="medium">
                איילת, כרמיאל
              </Text>
            </Flex>

            <Box style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
              <Button variant="soft" size="3" className="testimonial-action-button">
                לצפייה בהמלצות נוספות
                <ChevronRight size={16} />
              </Button>
            </Box>
          </Card>
        </Container>
      </Section>

      {/* Final CTA Section - Enhanced with modern design */}
      <Section size="3" className="final-cta-section">
        <motion.div
          className="cta-background-pattern"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 30,
            ease: 'linear',
          }}
        />

        <Container>
          <Flex direction="column" align="center" gap="6" className="cta-container">
            <Heading size={{ initial: '6', sm: '7' }} align="center" className="cta-heading">
              רוצים להתחיל?
            </Heading>

            <Text size={{ initial: '3', sm: '4' }} align="center" className="cta-subheading">
              זה הזמן לדבר איתנו ולתכנן את השיפוץ שלכם – כמו שצריך.
            </Text>

            <Flex gap="4" wrap="wrap" justify="center" className="cta-buttons">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="4"
                  variant="solid"
                  onClick={() => setShowModal(true)}
                  className="cta-button primary"
                >
                  <ChevronLeft size={16} />
                  לתיאום שיחת ייעוץ ללא התחייבות
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="https://wa.me/972527036959"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-link"
                >
                  <Button
                    style={{
                      borderColor: 'var(--accent-10)',
                      color: 'var(--accent-10)',
                    }}
                    size="4"
                    variant="outline"
                    className="cta-button* secondary"
                  >
                    <ChevronLeft size={16} />
                    שלחו לנו וואטסאפ עכשיו
                  </Button>
                </a>
              </motion.div>
            </Flex>

            <Box className="cta-tagline">
              <Text
                size="5"
                weight="bold"
                style={{
                  color: 'var(--accent-11)',
                  marginBottom: 'var(--space-2)',
                  display: 'block',
                }}
              >
                דיאמונד – שיפוצים שמרגישים אחרת
              </Text>
              <Text size="3" style={{ color: 'var(--gray-11)' }}>
                יחס אישי | מקצועיות ללא פשרות | תוצאה שמשדרגת חיים
              </Text>
            </Box>
          </Flex>
        </Container>
      </Section>

      {/* Contact Dialog with improved form - Enhanced UI */}
      <Dialog.Root open={showModal} onOpenChange={setShowModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay enhanced" />
          <Dialog.Content className="DialogContent contact-dialog">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dialog header with icon */}
              <Box className="dialog-header">
                <Box className="dialog-icon-container">
                  <Icon icon="ion:diamond-sharp" width={20} color="var(--accent-contrast)" />
                </Box>
                <Dialog.Title asChild>
                  <Heading size={{ initial: '5', md: '6' }} className="dialog-title">
                    דברו איתנו עכשיו
                  </Heading>
                </Dialog.Title>
                <Text size={{ initial: '2', md: '3' }} className="dialog-subtitle">
                  אנחנו כאן כדי להפוך את החלום שלכם למציאות
                </Text>
              </Box>

              {/* Form area */}
              <Box py="5" px={{ initial: '4', md: '6' }} className="dialog-body">
                <form onSubmit={handleSubmit} className="contact-form">
                  <Flex direction="column" gap="5">
                    <Box className="form-field">
                      <Text as="label" size="2" className="form-label">
                        שם מלא
                      </Text>
                      <TextField.Root
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="הקלד את שמך המלא"
                        className="form-input-container"
                      >
                        {/* <input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="הקלד את שמך המלא"
                          className="form-input"
                        /> */}
                      </TextField.Root>
                      {formErrors.name && (
                        <Text size="1" className="form-error">
                          {formErrors.name}
                        </Text>
                      )}
                    </Box>

                    <Box className="form-field">
                      <Text as="label" size="2" className="form-label">
                        מספר טלפון
                      </Text>
                      <TextField.Root
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="הקלד את מספר הטלפון שלך"
                        className="form-input-container"
                      >
                        {/* <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="הקלד את מספר הטלפון שלך"
                          className="form-input"
                        /> */}
                      </TextField.Root>
                      {formErrors.phone && (
                        <Text size="1" className="form-error">
                          {formErrors.phone}
                        </Text>
                      )}
                    </Box>

                    <Box className="form-field">
                      <Text as="label" size="2" className="form-label">
                        דוא"ל
                      </Text>
                      <TextField.Root
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className="form-input-container"
                      >
                        {/* <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className="form-input"
                        /> */}
                      </TextField.Root>
                      {formErrors.email && (
                        <Text size="1" className="form-error">
                          {formErrors.email}
                        </Text>
                      )}
                    </Box>

                    <Button type="submit" size="3" variant="solid" className="form-submit-button">
                      שלח פרטים ונחזור אליך בהקדם
                    </Button>
                  </Flex>
                </form>
              </Box>

              {/* Dialog footer with additional contact options */}
              <Box className="dialog-footer">
                <Text size="2" className="dialog-footer-text">
                  או צרו קשר דרך:
                </Text>
                <Flex justify="center" gap="4" mt="2">
                  <a href="https://wa.me/972527036959" target="_blank" rel="noopener noreferrer">
                    <IconButton variant="ghost" className="contact-icon-button">
                      <Icon icon="ion:logo-whatsapp" width={20} color="green" />
                      וואטסאפ
                    </IconButton>
                  </a>
                </Flex>
              </Box>
            </motion.div>

            <Dialog.Close asChild>
              <Button variant="ghost" className="dialog-close">
                <X size={16} />
              </Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Box>
  );
}
