import React, { useState } from 'react';
import {
  Button,
  Container,
  Section,
  Heading,
  Text,
  Flex,
  Box,
  Grid,
  Card,
  TextField,
  TextArea,
  IconButton,
} from '@radix-ui/themes';
import { Icon } from '@iconify/react';
import {
  ChevronRight,
  Building2,
  Wrench,
  CheckCircle2,
  Construction,
  Heart,
  Hammer,
  ArrowLeft,
  ChevronLeft,
  Clock,
  Phone,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { motion } from 'framer-motion';
import useScreen from '../hooks/useScreen';
import { TestimonialCarousel } from '../components/ui/TestimonialCarousel';
import { ProjectShowcase } from '../components/sections/ProjectShowcase';
import { TeamShowCase } from '../components/sections/TeamShowCase';
import ContactSection from '../components/sections/contact';

interface QuickFormData {
  name: string;
  phone: string;
  service?: string;
  info?: string;
}

interface QuickFormErrors {
  [key: string]: string | undefined;
  name?: string;
  phone?: string;
  service?: string;
  info?: string;
}

interface QuickFormData {
  name: string;
  phone: string;
  service?: string;
  info?: string;
}

export function Home() {
  const [quickFormData, setQuickFormData] = useState<QuickFormData>({
    name: '',
    phone: '',
  });
  const [quickFormErrors, setQuickFormErrors] = useState<QuickFormErrors>({});
  const [moreInfo, setMoreInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setShowModal] = useState(false);
  const { isMobile } = useScreen();

  const validateQuickForm = () => {
    const errors: QuickFormErrors = {};
    if (!quickFormData.name) errors.name = 'נדרש למלא שם';
    if (!quickFormData.phone) errors.phone = 'נדרש למלא מספר טלפון';
    else if (!/^[0-9-+\s()]*$/.test(quickFormData.phone)) errors.phone = 'מספר טלפון לא תקין';
    else if (moreInfo) {
      if (!quickFormData.service) errors.service = 'נדרש למלא שירות';
      if (!quickFormData.info) errors.info = 'נדרש למלא מידע נוסף';
    }
    setQuickFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleQuickFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateQuickForm()) {
      console.log('Quick form submitted:', quickFormData);
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      // setQuickFormData({ name: '', phone: '', ...(moreInfo ? { service: '', info: '' } : {}) });
      setQuickFormErrors({});
    }
  };

  const handleQuickFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuickFormData(prev => ({ ...prev, [name]: value }));
    if (quickFormErrors[name]) {
      setQuickFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setQuickFormData(prev => ({ ...prev, [name]: value }));
  //   if (quickFormErrors[name]) {
  //     setQuickFormErrors(prev => ({ ...prev, [name]: undefined }));
  //   }
  // };

  return (
    <Box style={{ position: 'relative' }} dir="rtl">
      {/* Hero Section - Enhanced with improved styling */}
      <Section
        size="3"
        className="hero-background"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4), transparent), url("${
            import.meta.env.VITE_BASE_URL
          }hero_2.jpg")`,
          // 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.pexels.com/photos/31117955/pexels-photo-31117955.jpeg")',
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
        {/* <Box
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
        </Box> */}

        <Container
          mt={isMobile ? '8' : '0'}
          style={{ position: 'relative', zIndex: 2, width: '100%' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <Flex direction="column" align="center" gap="6" py={{ initial: '0', sm: '6' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div className="rt-r-display-flex rt-r-jc-center">
                  <Icon color="var(--amber-8)" icon="ion:diamond-sharp" width={40} />
                </div>
                <Box className="hero-badge">
                  <Wrench color="var(--text-color)" size={16} />
                  <Text
                    as="div"
                    weight="bold"
                    size="2"
                    style={{ color: 'var(--text-color)', opacity: 0.9 }}
                  >
                    בניה • שיפוצים • תחזוקה
                  </Text>
                </Box>
              </div>
              <Flex
                style={{
                  backdropFilter: 'blur(0px)',
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-4)',
                }}
                direction="column"
                align="center"
                gap="4"
              >
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
                <motion.div style={{}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="4"
                    className="cta-button primary"
                    style={{
                      alignItems: 'center',
                      boxShadow: '0 10px 50px var(--amber-a10)',
                      borderRadius: 'var(--radius-6)',
                    }}
                    mb={isMobile ? '8' : '0'}
                    onClick={() => {
                      const contactSection = document.getElementById('contact-section');
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    צרו קשר עכשיו
                    {/* <Icon icon="ion:diamond-sharp" width={20} /> */}
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
            // boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
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
          // background: 'linear-gradient(to bottom right, var(--gray-1), var(--gray-2))',
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
                size={isMobile ? '3' : '5'}
                align={isMobile ? 'center' : 'right'}
                mx={isMobile ? 'auto' : undefined}
                as="div"
                weight="medium"
                // mb="8"
                style={{
                  maxWidth: '800px',
                  // margin: '0 auto 2.5rem auto',
                  color: 'var(--gray-11)',
                  // opacity: 0.9,
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
                      background: 'var(--gray-2)',
                    }}
                    className="modern-service-card"
                  >
                    {/* Decorative elements */}
                    <Box className="service-card-decoration-corner" />
                    <Box
                      style={{
                        animationDelay: `${index * 2}s`,
                      }}
                      className="service-card-decoration-circle"
                    />

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
                      as="div"
                      size="2"
                      style={{
                        color: 'var(--gray-11)',
                        margin: '0 0 1.5rem 0',
                        lineHeight: 1.6,
                      }}
                    >
                      {service.description}
                    </Text>

                    {/* <Box className="service-card-action">
                      <Button variant="ghost" className="read-more-button">
                        קרא עוד
                        <ArrowLeft size={16} />
                      </Button>
                    </Box> */}
                  </Box>
                </motion.div>
              ))}
            </Grid>

            {/* Enhanced CTA Button */}
            <Flex justify="center" mt="9">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="solid"
                  size="4"
                  className="cta-button primary"
                  onClick={() => {
                    const contactSection = document.getElementById('contact-section');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  צור קשר לייעוץ
                  <ArrowLeft size={16} />
                </Button>
              </motion.div>
            </Flex>
          </motion.div>
        </Container>
      </Section>

      <ProjectShowcase />
      <TeamShowCase />

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
        {/* <Box className="bg-pattern2" /> */}
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

      {/* Testimonials Section */}
      <Section mb="4" size="3" className="testimonials-section">
        <Box className="testimonial-bg-pattern" />
        <Container>
          <Flex direction="column" align="center" gap="6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Heading
                size="7"
                mx="auto"
                align="center"
                className="section-title with-accent"
                mb="4"
              >
                מה הלקוחות שלנו אומרים?
              </Heading>
              <Text
                as="div"
                mx="auto"
                weight="medium"
                size={isMobile ? '3' : '5'}
                align="center"
                style={{
                  maxWidth: '600px',
                  // marginBottom: '2rem',
                  color: 'var(--gray-11)',
                }}
              >
                אנחנו גאים בשירות שאנחנו מעניקים ובשביעות הרצון של לקוחותינו
              </Text>
            </motion.div>

            <TestimonialCarousel />
          </Flex>
        </Container>
      </Section>

      {/* Contact Section */}
      <ContactSection extendSection />
    </Box>
  );
}
