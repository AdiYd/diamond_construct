import { motion } from 'framer-motion';
import { Container, Section, Heading, Text, Flex, Box, Grid } from '@radix-ui/themes';
import {
  Droplet,
  ChefHat,
  Construction,
  Wrench,
  ClipboardCheck,
  Settings,
  CheckCircle,
  Clock,
  Users,
  Shield,
} from 'lucide-react';
import useScreen from '../hooks/useScreen';
import ContactSection from '../components/sections/contactUs';
import { JSX, useState } from 'react';
import Asset from '../components/Asset';

const iconDict: { [key: string]: JSX.Element } = {
  droplet: <Droplet size={36} />,
  chefHat: <ChefHat size={36} />,
  construction: <Construction size={36} />,
  wrench: <Wrench size={36} />,
  clipboardCheck: <ClipboardCheck size={36} />,
};

const servicesList = [
  {
    id: 'construction',
    title: 'בנייה פרטית קומפלט',
    shortDescription: 'מימוש חלום הבית הפרטי מתחיל כאן.',
    fullDescription:
      'מימוש חלום הבית הפרטי מתחיל כאן. אנו מציעים ליווי מלא מהשלב התכנוני ועד קבלת המפתח, עם צוות מקצועי המורכב מבעלי מקצוע מנוסים. אנו מקפידים על תכנון מוקפד, ביצוע איכותי ועמידה בלוחות זמנים, תוך שימוש בחומרים הטובים ביותר וסטנדרטים בלתי מתפשרים.',
    icon: 'construction',
    color: 'var(--crimson-9)',
    benefits: [
      'ליווי אישי ומקצועי לאורך כל הדרך',
      'עבודה לפי תקנים ותקנות הבניה',
      'שימוש בחומרי גלם מובחרים',
      'ביצוע מדויק בלוחות זמנים',
    ],
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1772&auto=format&fit=crop',
  },
  {
    id: 'renovations',
    title: 'שיפוצים כלליים',
    shortDescription: 'מתחדשים בבית? אנחנו כאן כדי להפוך כל רעיון למציאות.',
    fullDescription:
      'מתחדשים בבית? אנחנו כאן כדי להפוך כל רעיון למציאות. צוות דיאמונד מציע מגוון רחב של שירותי שיפוץ– שבירת קירות, עבודות חשמל ואינסטלציה, ריצוף, טיח, צבע, ועוד. שירותי השיפוץ שלנו מאופיינים באיכות גבוהה, תוך שימוש בחומרים מתקדמים ועמידים.',
    icon: 'wrench',
    color: 'var(--grass-9)',
    benefits: [
      'פתרונות יצירתיים לכל בעיה',
      'עבודה לפי תקני איכות מחמירים',
      'התאמה אישית לצרכי הלקוח',
      'גימור ברמה הגבוהה ביותר',
    ],
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1768&auto=format&fit=crop',
  },
  {
    id: 'offices',
    title: 'שיפוץ משרדים',
    shortDescription: 'יצירת סביבת עבודה נעימה, פרקטית ומעוצבת.',
    fullDescription:
      'יצירת סביבת עבודה נעימה, פרקטית ומעוצבת – זו המומחיות שלנו. אנו מבצעים שיפוץ משרדים כולל תכנון אדריכלי, התאמת פתרונות תאורה, מערכות חשמל, חלוקת חללים חכמה, ריצוף, צבע ואלמנטים עיצוביים – והכל בהתאמה מלאה לצרכי העסק.',
    icon: 'clipboardCheck',
    color: 'var(--indigo-9)',
    benefits: [
      'תכנון חכם לחוויית עבודה מיטבית',
      'ביצוע מהיר עם מינימום הפרעה',
      'פתרונות עיצוביים בהתאמה אישית',
      'עבודה בסטנדרטים עסקיים',
    ],
    image: 'https://images.unsplash.com/photo-0116?q=80&w=1769&auto=format&fit=crop',
  },
  {
    id: 'lightweight-construction',
    title: 'בנייה קלה',
    shortDescription: 'פתרונות בנייה קלה לכל מטרה – מהיר, איכותי ומותאם אישית.',
    fullDescription:
      'פתרונות בנייה קלה לכל מטרה – יחידות דיור, משרדים, תוספות בנייה ועוד. אנו מתמחים בביצוע מהיר ואיכותי תוך שמירה על תקני אש, בידוד, עמידות ובטיחות. כל מבנה מתוכנן ומבוצע בהתאמה מושלמת לצרכי הלקוח – עם אחריות מלאה ושקט נפשי.',
    icon: 'construction',
    color: 'var(--blue-9)',
    benefits: [
      'בנייה מהירה ויעילה',
      'בידוד תרמי ואקוסטי איכותי',
      'פתרון משתלם לתוספת מקום',
      'תכנון אישי לפי דרישה',
    ],
    image:
      'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1770&auto=format&fit=crop',
  },
  {
    id: 'bathroom-kitchen',
    title: 'שיפוץ חדרי רחצה ומטבחים',
    shortDescription: 'הפיכת חללים פונקציונליים לחללים מעוצבים, איכותיים ונוחים.',
    fullDescription:
      'המטבח וחדר הרחצה הם הלב הפונקציונלי של הבית – ואנחנו הופכים אותם לחללים מעוצבים, איכותיים ונוחים. אנו מציעים פתרונות מותאמים אישית הכוללים פירוק, תכנון מחודש, חיפויים, אינסטלציה, חשמל, ריצוף, ארונות, תאורה ועוד.',
    icon: 'droplet',
    color: 'var(--amber-9)',
    benefits: [
      'תכנון מותאם אישית',
      'שילוב מערכות מתקדמות',
      'חומרים עמידים ויוקרתיים',
      'הקפדה על פרטים ואסתטיקה',
    ],
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1770&auto=format&fit=crop',
  },
  {
    id: 'commercial',
    title: 'שיפוץ שטחי מסחר',
    shortDescription: 'שיפוצים חכמים ואסתטיים בחנויות, קליניקות ועסקים.',
    fullDescription:
      'ביצוע שיפוצים חכמים ואסתטיים בחנויות, קליניקות, עסקים ושטחי מסחר – כולל מיתוג, עיצוב חלל, פתרונות מידוף, תקרות, תאורה, ריצוף ומערכות טכניות. אנו מלווים אתכם משלב הרעיון ועד פתיחת העסק, עם תוצאה מרשימה ומקצועית.',
    icon: 'chefHat',
    color: 'var(--crimson-9)',
    benefits: [
      'ניסיון בשיפוץ עסקים פעילים',
      'תכנון לפי קונספט ומיתוג',
      'שילוב מערכות חשמל ותאורה',
      'עבודה מהירה עם תיאום מלא',
    ],
    image: 'video/VID-20250325-WA0075.mp4',
  },
];

export function Services() {
  const { isMobile } = useScreen();
  const [services] = useState(servicesList);

  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await fetch(`/content/blog.json`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch services data');
  //       }
  //       const data = await response.json();
  //       if (data.length > 0) {
  //         setServices(data);
  //       } else {
  //         console.warn('No services data found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching services:', error);
  //     }
  //   };

  //   fetchServices();
  // }, []);

  return (
    <Box dir="rtl">
      {/* Hero Section */}
      <Section
        size="2"
        className="section services-hero"
        style={{
          background: 'linear-gradient(to right, #30345e, #0b0e29)',
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? 'var(--section-spacing-sm) var(--page-padding-mobile)' : undefined,
        }}
      >
        <Box className="bg-pattern2" />
        <Container>
          <Flex direction="column" align="center" gap="6" py="7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                textAlign: 'center',
              }}
            >
              <Heading
                size={isMobile ? '8' : '9'}
                align="center"
                style={{ marginBottom: '1.5rem', color: 'white' }}
              >
                השירותים שלנו
              </Heading>
              <Text
                size={{ initial: '3', sm: '4', md: '5' }}
                align="center"
                style={{
                  maxWidth: '800px',
                  marginBottom: '2rem',
                  color: 'var(--header-sub)',
                  padding: isMobile ? '0 var(--space-3)' : 0,
                }}
              >
                אנו מציעים מגוון רחב של פתרונות בנייה ושיפוצים באיכות הגבוהה ביותר
              </Text>
            </motion.div>
          </Flex>
        </Container>
      </Section>

      <Section
        size="3"
        className="section"
        style={{
          background: 'var(--color-background)',
          padding: isMobile ? 'var(--section-spacing-sm) var(--page-padding-mobile)' : undefined,
        }}
      >
        <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap={{ initial: '3', sm: '4' }} my="6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
            >
              <Box
                as="div"
                style={{
                  height: '100%',
                  background: index % 2 === 0 ? 'var(--gray-1)' : 'var(--color-background)',
                  border: '0.8px solid var(--gray-a6)',
                  borderRadius: 'var(--radius-4)',
                  padding: isMobile ? 'var(--space-4)' : 'var(--space-5)',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const element = document.getElementById(service.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="service-brief-card"
              >
                <Flex direction="column" gap="3" style={{ height: '100%' }}>
                  <Box
                    style={{
                      color: service.color,
                      marginBottom: '0.5rem',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {iconDict[service.icon]}
                  </Box>
                  <Heading size={{ initial: '3', sm: '4' }} as="h3">
                    {service.title}
                  </Heading>
                  <Text as="div" size="3" style={{ color: 'var(--gray-11)', flex: 1 }}>
                    {service.shortDescription}
                  </Text>
                  <Box>
                    <a
                      href={`#${service.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: service.color,
                        fontWeight: 500,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                      }}
                    >
                      קרא עוד
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: 'scaleX(-1)' }}
                      >
                        <path
                          d="M6.5 3L11.5 8L6.5 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </Box>
                </Flex>
              </Box>
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* Why Choose Us */}
      <Section
        size="3"
        className="section"
        style={{
          background: 'var(--color-background)',
          padding: isMobile ? 'var(--section-spacing-sm) var(--page-padding-mobile)' : undefined,
        }}
      >
        <Container>
          <Flex direction="column" align="center" gap="6" py={{ initial: '4', sm: '6' }}>
            <Heading
              mx="auto"
              size={{ initial: '6', sm: '7' }}
              align="center"
              className="section-title with-accent"
              mb="4"
            >
              מה אנחנו מציעים?
            </Heading>
            <Grid
              columns={{ initial: '1', sm: '2', md: '3' }}
              gap={{ initial: '3', sm: '4' }}
              width="100%"
            >
              {[
                {
                  icon: <Settings size={24} />,
                  title: 'מקצועיות',
                  description:
                    'צוות מיומן בעל הכשרה רחבה וניסיון עשירצוות מקצועי עם ניסיון מוכח של הכשרות מתקדמות ומתעדכנות',
                  color: 'var(--blue-9)',
                },
                {
                  icon: <CheckCircle size={24} />,
                  title: 'איכות',
                  description: 'שימוש בחומרים האיכותיים ביותר ובסטנדרטים הגבוהים היותר',
                  color: 'var(--amber-9)',
                },
                {
                  icon: <Clock size={24} />,
                  title: 'עמידה בזמנים',
                  // description: 'הקפדה על זמנים וסיום פרויקטים במועד',
                  description:
                    'הזמן שלכם יקר לנו , אנחנו נותנים מראש לוחות זמנים ברורים ועומדים בהתאם למה שקבע מראש עם התחייבות לסיום הפרוייקט במועד.',
                  color: 'var(--crimson-9)',
                },
                {
                  icon: <Users size={24} />,
                  title: 'יחס אישי',
                  description: 'ליווי צמוד ושקיפות מלאה לאורך כל התהליך',
                  color: 'var(--grass-9)',
                },
                {
                  icon: <Shield size={24} />,
                  title: 'אחריות',
                  description: 'אחריות מקיפה על כל העבודות שאנו מבצעים',
                  color: 'var(--indigo-9)',
                },
                {
                  icon: <Construction size={24} />,
                  title: 'פתרונות כוללים',
                  description: 'מענה מקצה לקצה - מהתכנון ועד הביצוע',
                  color: 'var(--orange-9)',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    textAlign: isMobile ? 'center' : 'initial',
                  }}
                >
                  <Flex
                    gap="3"
                    align={isMobile ? 'start' : 'center'}
                    // direction={isMobile ? 'column' : 'row'}
                    style={{
                      padding: isMobile ? 'var(--space-4)' : 'var(--space-4)',
                      borderRadius: 'var(--radius-4)',
                      border: '1px solid var(--gray-a1)',
                      background: 'linear-gradient(to bottom left,var(--iris-a3), var(--sky-a3))',
                      height: '100%',
                      transform: 'skew(3deg)',
                      textAlign: isMobile ? 'start' : 'start',
                    }}
                    className="shadowHover"
                  >
                    <Box
                      style={{
                        borderRadius: 'var(--radius-2)',
                        padding: 'var(--space-2)',
                        minHeight: '100px',
                        color: feature.color,
                        marginBottom: isMobile ? 'var(--space-2)' : 0,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Text weight="bold" size="3">
                        {feature.title}
                      </Text>
                      <br />
                      <Text size="2" style={{ color: 'var(--gray-11)' }}>
                        {feature.description}
                      </Text>
                    </Box>
                  </Flex>
                </motion.div>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>

      {/* Detailed Services */}
      {services.map((service, index) => (
        <Section
          key={service.id}
          id={service.id}
          size="3"
          className="section"
          style={{
            background: index % 2 === 0 ? 'var(--gray-2)' : 'var(--color-background)',
            position: 'relative',
            overflow: 'hidden',
            padding: isMobile
              ? 'var(--section-spacing-sm) var(--page-padding-mobile)'
              : 'var(--space-8) 0',
          }}
        >
          <Container>
            <Grid
              columns={{ initial: '1', md: '2' }}
              gap={{ initial: '6', md: '8' }}
              align="center"
            >
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? -20 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Box>
                  {/* <Box
                    style={{
                      color: service.color,
                      marginBottom: '1rem',
                      textAlign: isMobile ? 'center' : 'initial',
                    }}
                  >
                    {service.icon}
                  </Box> */}
                  <Heading
                    as="h2"
                    size="6"
                    weight="bold"
                    mb="4"
                    style={{
                      textAlign: 'start',
                    }}
                  >
                    {service.title}
                  </Heading>
                  <Text
                    as="div"
                    size={isMobile ? '3' : '4'}
                    weight="medium"
                    style={{
                      color: 'var(--gray-11)',
                      lineHeight: '1.7',
                      textAlign: 'start',
                    }}
                  >
                    {service.fullDescription}
                  </Text>

                  {service?.benefits && service.benefits?.length > 0 && (
                    <Box my="6">
                      <Text
                        weight="bold"
                        size="3"
                        mb="4"
                        style={{
                          textAlign: 'start',
                          marginBottom: '1rem',
                        }}
                      >
                        היתרונות שלנו:
                      </Text>
                      <Flex
                        mt="4"
                        direction="column"
                        gap="2"
                        style={{
                          alignItems: isMobile ? 'center' : 'flex-start',
                        }}
                      >
                        {service.benefits.map((benefit, idx) => (
                          <Flex key={idx} gap="2" align="start">
                            <Box style={{ color: service.color }}>
                              <CheckCircle style={{ position: 'relative', top: '3px' }} size={16} />
                            </Box>
                            <Text align="right" weight="medium" as="div" size="3">
                              {benefit}
                            </Text>
                          </Flex>
                        ))}
                      </Flex>
                    </Box>
                  )}
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  style={{
                    position: 'relative',
                    height: isMobile ? '250px' : '350px',
                    borderRadius: 'var(--radius-4)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-4)',
                  }}
                >
                  <Asset
                    url={service.image}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  <Box
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(to top, ${service.color}60 0%, transparent 100%)`,
                      opacity: 0.4,
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Container>
        </Section>
      ))}

      <ContactSection noBackground />
    </Box>
  );
}
