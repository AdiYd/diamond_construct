import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Section, Heading, Text, Flex, Box, Card, Grid } from '@radix-ui/themes';
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

const servicesList = [
  {
    id: 'bathrooms',
    title: 'שיפוץ אמבטיות',
    shortDescription: 'שיפוצי חדרי אמבטיה מקצועיים עם חומרים איכותיים וטכניקות מתקדמות.',
    fullDescription:
      'חדר האמבטיה הוא אחד החדרים הכי שימושיים בבית, ואצלנו הוא זוכה לטיפול מיוחד. צוות המומחים שלנו בעל ניסיון רב בשיפוץ חדרי אמבטיה, החל מריצוף, חיפוי, החלפת סנטרייה, ועד התקנת אמבטיות, מקלחונים וארונות אמבטיה. אנו משתמשים בחומרים איכותיים ועמידים למים תוך שמירה על אסתטיקה ופונקציונליות.',
    icon: <Droplet size={36} />,
    color: 'var(--blue-9)',
    benefits: [
      'עמידות בפני רטיבות ולחות',
      'חיפויים איכותיים נגד עובש',
      'סנטרייה מיובאת ממיטב היצרנים',
      'עבודה מדויקת ונקייה',
    ],
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1770&auto=format&fit=crop',
  },
  {
    id: 'kitchens',
    title: 'שיפוץ מטבחים',
    shortDescription: 'עיצוב והתקנת מטבחים מודרניים המשלבים פונקציונליות ואסתטיקה.',
    fullDescription:
      'המטבח הוא לב הבית, ואנחנו מבינים את חשיבותו. צוות המומחים שלנו מתמחה בשיפוץ מטבחים ברמה הגבוהה ביותר, תוך שילוב בין עיצוב מודרני לפונקציונליות מקסימלית. אנחנו מציעים פתרונות מותאמים אישית לכל חלל, כולל החלפת ארונות, משטחי עבודה, כיורים, ברזים, אריחים, תאורה ועוד. אנו עובדים עם מיטב הספקים לאספקת חומרים איכותיים ועמידים.',
    icon: <ChefHat size={36} />,
    color: 'var(--amber-9)',
    benefits: [
      'תכנון מותאם אישית לניצול מקסימלי של החלל',
      'חומרים עמידים במיוחד',
      'פתרונות אחסון חכמים',
      'שילוב מערכות חשמל מתקדמות',
    ],
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1768&auto=format&fit=crop',
  },
  {
    id: 'construction',
    title: 'בנייה פרטית קומפלט',
    shortDescription: 'מימוש חלומות הבנייה שלכם מהיסוד ועד למפתח, בליווי מקצועי מלא.',
    fullDescription:
      'דיאמונד מציעה שירותי בנייה פרטית מקיפים, מהשלב התכנוני ועד מסירת המפתח. הצוות שלנו מורכב מאנשי מקצוע מנוסים הפועלים בסטנדרטים הגבוהים ביותר, תוך הקפדה על איכות הביצוע ועמידה בלוחות זמנים. אנחנו מלווים אתכם בכל שלבי הבנייה, מתכנון ואישור תכניות, דרך הנחת תשתיות, יציקת רצפות וקירות, ועד עבודות גמר.',
    icon: <Construction size={36} />,
    color: 'var(--crimson-9)',
    benefits: [
      'ליווי מקצועי לאורך כל התהליך',
      'עבודה לפי תקנים ותקנות הבנייה',
      'שימוש בחומרים איכותיים',
      'פיקוח הנדסי צמוד',
    ],
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1772&auto=format&fit=crop',
  },
  {
    id: 'renovations',
    title: 'שיפוצים כלליים',
    shortDescription: 'החזרת הברק לבית שלכם עם שיפוץ כולל מקיר לקיר.',
    fullDescription:
      'בין אם אתם מעוניינים בשינוי מראה הבית, בהגדלת החלל או בשיפור הפונקציונליות, צוות דיאמונד מציע מגוון רחב של שירותי שיפוץ. אנחנו מתמחים בהריסת קירות לא נושאים, בניית קירות גבס, החלפת ריצוף, צביעה מקצועית, החלפת דלתות וחלונות, שיפוץ מרפסות וחדרי מדרגות, ועוד. שירותי השיפוץ שלנו מאופיינים באיכות גבוהה, תוך שימוש בחומרים מתקדמים ועמידים.',
    icon: <Wrench size={36} />,
    color: 'var(--grass-9)',
    benefits: [
      'תכנון מדויק לפי צרכי הלקוח',
      'ביצוע בסטנדרטים גבוהים',
      'פתרונות יצירתיים לכל בעיה',
      'גימור ברמה הגבוהה ביותר',
    ],
    image:
      'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1770&auto=format&fit=crop',
  },
  {
    id: 'maintenance',
    title: 'תחזוקה שוטפת',
    shortDescription: 'שמירה על הבית והנכס שלכם במצב מיטבי לאורך זמן.',
    fullDescription:
      'שירותי התחזוקה השוטפת שלנו נועדו לשמר את הנכס שלכם במצב מיטבי, למנוע בעיות עתידיות ולחסוך בעלויות תיקון גבוהות. אנחנו מציעים חוזי תחזוקה המותאמים לצרכים שלכם, הכוללים ביקורות תקופתיות, תיקוני נזילות, תחזוקת מערכות חשמל, טיפול בסדקים ברצפה ובקירות, צביעה תקופתית, ניקוי תעלות ניקוז, ועוד. צוות המומחים שלנו זמין לכל קריאת שירות.',
    icon: <ClipboardCheck size={36} />,
    color: 'var(--indigo-9)',
    benefits: [
      'מניעת נזקים עתידיים',
      'חיסכון בהוצאות תיקון',
      'טיפול מהיר בתקלות',
      'שמירה על ערך הנכס',
    ],
    image:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1769&auto=format&fit=crop',
  },
];

export function Services() {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <Box dir="rtl">
      {/* Hero Section */}
      <Section
        size="3"
        className="section services-hero"
        style={{
          background: 'linear-gradient(to right, var(--accent-3), var(--accent-2))',
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? 'var(--section-spacing-sm) var(--page-padding-mobile)' : undefined,
        }}
      >
        <Container>
          <Box className="bg-pattern2" />
          <Flex direction="column" align="center" gap="6" py={{ initial: '4', sm: '6', md: '9' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                textAlign: 'center',
              }}
            >
              <Heading
                size={{ initial: '6', sm: '7', md: '8' }}
                align="center"
                style={{
                  //   maxWidth: '800px',
                  marginBottom: '1rem',
                  padding: isMobile ? '0 var(--space-2)' : 0,
                }}
              >
                השירותים שלנו
              </Heading>
              <Text
                size={{ initial: '3', sm: '4', md: '5' }}
                align="center"
                style={{
                  maxWidth: '800px',
                  marginBottom: '2rem',
                  color: 'var(--gray-11)',
                  padding: isMobile ? '0 var(--space-3)' : 0,
                }}
              >
                אנו מציעים מגוון רחב של פתרונות בנייה ושיפוצים באיכות הגבוהה ביותר
              </Text>

              <Grid
                columns={{ initial: '1', sm: '2', md: '3' }}
                gap={{ initial: '3', sm: '4' }}
                my="6"
              >
                {servicesList.map((service, index) => (
                  <motion.div
                    key={service.id}
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
                        height: '100%',
                        background: 'var(--color-background)',
                        boxShadow: 'var(--shadow-3)',
                        borderRadius: 'var(--radius-4)',
                        padding: isMobile ? 'var(--space-4)' : 'var(--space-5)',
                      }}
                      className="service-brief-card"
                    >
                      <Flex direction="column" gap="3" style={{ height: '100%' }}>
                        <Box
                          style={{
                            color: service.color,
                            marginBottom: '0.5rem',
                          }}
                        >
                          {service.icon}
                        </Box>
                        <Heading size={{ initial: '3', sm: '4' }} as="h3">
                          {service.title}
                        </Heading>
                        <Text
                          size={{ initial: '2', sm: '2' }}
                          style={{ color: 'var(--gray-11)', flex: 1 }}
                        >
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
                    </Card>
                  </motion.div>
                ))}
              </Grid>
            </motion.div>
          </Flex>
        </Container>
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
            <Heading size={{ initial: '5', sm: '6' }} align="center">
              למה לבחור בנו?
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
                  description: 'צוות מיומן בעל הכשרה רחבה וניסיון עשיר',
                  color: 'var(--blue-9)',
                },
                {
                  icon: <CheckCircle size={24} />,
                  title: 'איכות',
                  description: 'שימוש בחומרים איכותיים והקפדה על כל פרט',
                  color: 'var(--amber-9)',
                },
                {
                  icon: <Clock size={24} />,
                  title: 'עמידה בזמנים',
                  description: 'הקפדה על לוחות זמנים וסיום פרויקטים במועד',
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
                >
                  <Flex
                    gap="3"
                    align={isMobile ? 'start' : 'center'}
                    direction={isMobile ? 'column' : 'row'}
                    style={{
                      padding: isMobile ? 'var(--space-3)' : 'var(--space-4)',
                      borderRadius: 'var(--radius-3)',
                      background: 'var(--gray-1)',
                      height: '100%',
                    }}
                  >
                    <Box
                      style={{
                        backgroundColor: `${feature.color}20`,
                        borderRadius: 'var(--radius-2)',
                        padding: 'var(--space-2)',
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
      {servicesList.map((service, index) => (
        <Section
          key={service.id}
          id={service.id}
          size="3"
          className="section"
          style={{
            background: index % 2 === 0 ? 'var(--gray-1)' : 'var(--color-background)',
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
                  <Box
                    style={{
                      color: service.color,
                      marginBottom: '1rem',
                      textAlign: isMobile ? 'center' : 'initial',
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Heading
                    as="h2"
                    size={{ initial: '5', sm: '6' }}
                    mb="4"
                    style={{
                      textAlign: isMobile ? 'center' : 'initial',
                    }}
                  >
                    {service.title}
                  </Heading>
                  <Text
                    size={{ initial: '2', sm: '3' }}
                    style={{
                      color: 'var(--gray-11)',
                      lineHeight: '1.7',
                      textAlign: isMobile ? 'center' : 'initial',
                    }}
                  >
                    {service.fullDescription}
                  </Text>

                  <Box
                    mt="6"
                    style={{
                      textAlign: isMobile ? 'center' : 'initial',
                    }}
                  >
                    <Text
                      weight="bold"
                      size="3"
                      mb="3"
                      style={{
                        textAlign: isMobile ? 'center' : 'initial',
                      }}
                    >
                      היתרונות שלנו:
                    </Text>
                    <Flex
                      direction="column"
                      gap="2"
                      style={{
                        alignItems: isMobile ? 'center' : 'flex-start',
                      }}
                    >
                      {service.benefits.map((benefit, idx) => (
                        <Flex key={idx} gap="2" align="center">
                          <Box style={{ color: service.color }}>
                            <CheckCircle size={18} />
                          </Box>
                          <Text size="2">{benefit}</Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Box>
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
                  <img
                    src={service.image}
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
    </Box>
  );
}
