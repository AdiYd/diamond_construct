import { motion } from 'framer-motion';
import { Container, Section, Heading, Text, Flex, Box, Grid, Card } from '@radix-ui/themes';
import { Star, Heart, Users, Shield, Zap, Handshake } from 'lucide-react';
import useScreen from '../hooks/useScreen';
import '../styles/about.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { teamImages } from '../components/sections/TeamShowCase';

// Team members data
const teamMembers = [
  {
    name: 'יעקב כהן',
    position: 'מנכ"ל ומייסד',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
    description:
      'יעקב הקים את דיאמונד לפני 15 שנים, אחרי שירות צבאי כמפקד בחיל ההנדסה הקרבית. עם נסיון של מעל 20 שנה בתחום הבנייה והשיפוצים, הוא מוביל את החברה עם חזון ברור למצוינות ושירות לקוחות יוצא דופן.',
    education: 'תואר בהנדסת בניין, טכניון חיפה',
  },
  {
    name: 'רונית לוי',
    position: 'אדריכלית ראשית',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2787&auto=format&fit=crop',
    description:
      'רונית מצטרפת אלינו עם ניסיון עשיר בעיצוב פנים ואדריכלות. היא בוגרת בצלאל ומתמחה בתכנון מרחבים פונקציונליים עם נגיעה אסתטית ייחודית.',
    education: 'תואר באדריכלות, בצלאל ירושלים',
  },
  {
    name: 'אייל גולן',
    position: 'מנהל פרויקטים',
    image:
      'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description:
      'אחרי שירות משמעותי כקצין בסיירת מטכ"ל, אייל הצטרף לצוות שלנו לפני 7 שנים. הוא מנהל את הפרויקטים הגדולים שלנו ביד רמה, עם דגש על יעילות וקפדנות.',
    education: 'תואר ראשון בניהול, אוניברסיטת תל אביב',
  },
  {
    name: 'מיכל אברהמי',
    position: 'מנהלת קשרי לקוחות',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop',
    description:
      'מיכל היא הפנים של החברה מול הלקוחות שלנו. עם ניסיון רב בתחום השירות, היא מבטיחה שכל לקוח מקבל יחס אישי ומענה מהיר לכל שאלה.',
    education: 'תואר בתקשורת ושיווק, המכללה למנהל',
  },
];

// Company values data
const companyValues = [
  {
    icon: <Star size={28} />,
    title: 'מצוינות',
    description: 'אנחנו שואפים למצוינות בכל פרויקט, קטן כגדול.',
    color: 'var(--amber-9)',
  },
  {
    icon: <Users size={28} />,
    title: 'עבודת צוות',
    description: 'הצוות שלנו עובד יחד בשיתוף פעולה מלא להשגת התוצאות הטובות ביותר.',
    color: 'var(--blue-9)',
  },
  {
    icon: <Handshake size={28} />,
    title: 'אמינות',
    description: 'אנו מקפידים על שקיפות מלאה ועמידה בהבטחות שלנו.',
    color: 'var(--crimson-9)',
  },
  {
    icon: <Shield size={28} />,
    title: 'בטיחות',
    description: 'הבטיחות היא ערך עליון בכל העבודות שאנחנו מבצעים.',
    color: 'var(--grass-9)',
  },
  {
    icon: <Heart size={28} />,
    title: 'שירות',
    description: 'אנו מאמינים במתן שירות לקוחות ברמה הגבוהה ביותר.',
    color: 'var(--indigo-9)',
  },
  {
    icon: <Zap size={28} />,
    title: 'חדשנות',
    description: 'תמיד מחפשים פתרונות חדשניים וטכנולוגיות מתקדמות.',
    color: 'var(--orange-9)',
  },
];

// Milestones data
const milestones = [
  {
    year: '2010',
    title: 'הקמת החברה',
    description: 'דיאמונד הוקמה מתוך חזון ליצור חברת שיפוצים עם דגש על איכות ושירות.',
  },
  {
    year: '2013',
    title: 'הרחבת השירותים',
    description: 'הרחבנו את תחומי הפעילות שלנו לכלול גם פרויקטים של בנייה פרטית.',
  },
  {
    year: '2016',
    title: '100 פרויקטים',
    description: 'חגגנו השלמה מוצלחת של 100 פרויקטים, כולם בשביעות רצון מלאה של הלקוחות.',
  },
  {
    year: '2020',
    title: 'מחלקת עיצוב',
    description: 'הוספנו מחלקת עיצוב פנים לחברה, המאפשרת לנו להציע פתרון מקיף מתכנון לביצוע.',
  },
  {
    year: '2023',
    title: 'הרחבה אזורית',
    description: 'הרחבנו את פעילותנו לכל אזור הצפון, עם משרד נוסף בכרמיאל.',
  },
  {
    year: '2025',
    title: 'היום',
    description: 'ממשיכים לצמוח ולהתפתח, עם מעל 500 פרויקטים מוצלחים ולקוחות מרוצים.',
  },
];

export function About() {
  const { isMobile } = useScreen();
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
                אודות Diamond
              </Heading>
              <Text
                size="5"
                align="center"
                style={{ marginBottom: '2rem', color: 'var(--gray-8)', lineHeight: '1.6' }}
              >
                שיפוץ ובנייה זה לא רק קירות – זה אנשים, הקשבה, ותוצאה שמשנה חיים
              </Text>
              {/* <br />
              <Text
                size="4"
                align="center"
                style={{ marginBottom: '1rem', color: 'var(--gray-12)', lineHeight: '1.8' }}
              >
                דיאמונד – בניה | שיפוצים | תחזוקה הוקמה מתוך חזון פשוט: להפוך את חוויית השיפוץ
                בישראל – מדבר שצריך "לשרוד" לדבר שמרגישים בו בטוחים, שמחים, ושיודעים שיש על מי
                לסמוך.
              </Text> */}
            </motion.div>
          </Flex>
        </Container>
      </Section>

      {/* Vision Section */}
      <Section size="3" style={{}}>
        <Container>
          <Flex direction="column" align="center" gap="6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '800px', textAlign: 'center' }}
            >
              <Card
                className="about-card"
                style={{
                  padding: isMobile ? '1rem 1.5rem' : '2rem 3.5rem',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Box className="service-card-decoration-circle" />
                <Box
                  style={{ animation: 'rotate 8s ease-in infinite' }}
                  className="testimonial-decoration-3"
                />
                <Box
                  style={{ animation: 'rotate 15s ease-in infinite' }}
                  className="testimonial-decoration-4"
                />
                <Heading size="6" align="center" className="section-title with-accent" mb="4">
                  החזון שלנו: שיפוץ עם נשמה
                </Heading>
                <Text
                  as="div"
                  size="4"
                  style={{ lineHeight: '1.8', fontWeight: 600, marginBottom: '1rem' }}
                >
                  אנחנו עוסקים בשיפוץ דירות ובתים פרטיים, תוספות בניה ותחזוקה שוטפת, עם מיקוד באזור
                  כרמיאל והסביבה. מה שמייחד אותנו הוא השילוב בין מקצועיות טכנית בלתי מתפשרת, לבין
                  יחס אישי שמציב את הלקוח במרכז.
                </Text>
                <Text as="div" size="4" style={{ lineHeight: '1.8', fontWeight: 600 }}>
                  אנו מאמינים ששיפוץ איכותי מתחיל בהקשבה אמיתית, ומתבצע מתוך הבנה שהבית שלכם הוא
                  הרבה יותר ממבנה – הוא המקום הכי חשוב בעולם.
                </Text>
              </Card>
            </motion.div>
            <Box as="div" style={{ width: '100vw' }}>
              <div
                style={{
                  animation: 'scrollX 30s linear alternate infinite',
                  display: 'flex',
                  gap: '1rem',
                  overflowX: 'visible',
                  position: 'relative',
                  // top: '-50px',
                  rotate: '4deg',
                  zIndex: 1,
                }}
              >
                {teamImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.url}
                      className="team-image"
                      alt={`Team member ${index + 1}`}
                      style={{
                        aspectRatio: '1/1',
                        objectFit: 'cover',
                        width: '200px',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                ))}
              </div>
            </Box>
          </Flex>
        </Container>
      </Section>

      {/* Our Approach Section */}
      <Section size="3" style={{ background: 'var(--color-background)' }}>
        <Container>
          <Flex direction="column" align="center" gap="6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%' }}
            >
              <Heading size="6" align="center" className="section-title with-accent" mb="4">
                הגישה שלנו: שקיפות, סדר ונשמה
              </Heading>
              <Text
                as="div"
                align={isMobile ? 'center' : 'right'}
                size={isMobile ? '3' : '5'}
                style={{ maxWidth: '800px' }}
              >
                אנחנו יודעים עד כמה תהליך שיפוץ יכול להיות מלחיץ – ולכן תכננו את כל מערך העבודה שלנו
                כך שתהיה ללקוח תחושת ביטחון ושליטה
              </Text>
            </motion.div>

            <Grid columns={{ initial: '1', sm: '2' }} gap="4" width="100%">
              {[
                {
                  title: 'תקשורת שוטפת',
                  description: 'עדכונים שוטפים בקבוצת וואטסאפ ייעודית לכל פרויקט',
                  icon: (
                    <Icon color="var(--green-9)" icon="ri:whatsapp-fill" width="28" height="28" />
                  ),
                },
                {
                  title: 'תכנון מקדים',
                  description: 'תכנון מפורט שמונע הפתעות ומבטיח ביצוע חלק',

                  icon: (
                    <Icon
                      color="var(--blue-9)"
                      icon="ri:calendar-check-fill"
                      width="28"
                      height="28"
                    />
                  ),
                },
                {
                  title: 'חוזה ברור',
                  description: 'חוזה מפורט ולוחות זמנים מוגדרים מראש',
                  icon: (
                    <Icon color="var(--red-9)" icon="mdi:contract-outline" width="28" height="28" />
                  ),
                },
                {
                  title: 'צוות מקצועי',
                  description: 'צוות נעים, מנומס, ומסודר שעובד בסטנדרטים גבוהים',
                  icon: <Icon color="var(--purple-9)" icon="ri:team-fill" width="28" height="28" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    style={{
                      padding: isMobile ? 'var(--space-3)' : 'var(--space-4)',
                      borderRadius: 'var(--radius-2)',
                      border: '1px solid var(--gray-a1)',
                      backgroundImage:
                        'linear-gradient(to bottom left,var(--iris-a3), var(--sky-a3))',
                      backgroundColor: 'var(--gray-a1)',
                      // height: '100%',
                      transform: 'skew(5deg)',
                      textAlign: isMobile ? 'start' : 'start',
                    }}
                  >
                    <Heading style={{ display: 'flex', gap: '12px' }} size="4" mb="2">
                      {item.icon}
                      {item.title}
                    </Heading>
                    <Text size="2" style={{ color: 'var(--gray-11)' }}>
                      {item.description}
                    </Text>
                  </Box>
                </motion.div>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>

      {/* Our Values */}
      <Section size="3" style={{ background: 'var(--gray-1)' }}>
        <Container>
          <Flex direction="column" align="center" gap="6" py="6">
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
                הערכים שלנו
              </Heading>
            </motion.div>

            <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4" width="100%">
              {companyValues.map((value, index) => (
                <motion.div
                  key={index}
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
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        borderBottomLeftRadius: '100%',
                        background: `${value.color}10`,
                        marginRight: '-2rem',
                        marginTop: '-2rem',
                      }}
                    />

                    <Flex
                      direction="column"
                      align="center"
                      gap="3"
                      style={{ position: 'relative', zIndex: 1 }}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '3.5rem',
                          height: '3.5rem',
                          borderRadius: '50%',
                          background: `${value.color}20`,
                          color: value.color,
                          marginBottom: '0.5rem',
                        }}
                      >
                        {value.icon}
                      </Box>
                      <Text size="5" weight="bold">
                        {value.title}
                      </Text>
                      <Text size="2" align="center" style={{ color: 'var(--gray-11)' }}>
                        {value.description}
                      </Text>
                    </Flex>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>

      {/* Our Team */}
      <Section size="3" style={{ background: 'var(--color-background)' }}>
        <Container>
          <Flex direction="column" align="center" gap="6" py="6">
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
                align="center"
                size="3"
                style={{ maxWidth: '600px', marginBottom: '2rem', color: 'var(--gray-11)' }}
              >
                הכירו את הצוות המקצועי שעומד מאחורי ההצלחה של דיאמונד
              </Text>
            </motion.div>

            <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="6" width="100%">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
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
                      // display: 'flex',
                      // flexDirection: 'column',
                      // justifyContent: 'space-between',
                    }}
                    className="team-card"
                  >
                    <Flex pb="2" height="100%" direction="column" gap="3">
                      <Box
                        style={{
                          width: '100%',
                          height: '280px',
                          overflow: 'hidden',
                          borderRadius: 'var(--radius-3)',
                          position: 'relative',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <Box
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '1rem',
                            background:
                              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                            color: 'white',
                          }}
                        >
                          <Text size="3" weight="bold">
                            {member.name}
                          </Text>
                          <Text mr="2" size="1" style={{ opacity: 0.9 }}>
                            {member.position}
                          </Text>
                        </Box>
                      </Box>
                      <Text size="1" style={{ color: 'var(--gray-11)' }}>
                        {member.description}
                      </Text>
                      <Text
                        size="1"
                        weight="bold"
                        style={{ color: 'var(--accent-9)', marginTop: 'auto' }}
                      >
                        {member.education}
                      </Text>
                    </Flex>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>

      {/* Company Milestones */}
      <Section size="3" style={{ background: 'var(--accent-2)' }}>
        <Container>
          <Flex direction="column" align="center" gap="6" py="6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Heading
                size={{ initial: '6', sm: '7' }}
                className="section-title with-accent"
                mb="4"
              >
                אבני דרך
              </Heading>
            </motion.div>

            <Box style={{ width: '100%', position: 'relative' }}>
              {/* Timeline line */}
              <Box
                display={{ initial: 'none', md: 'block' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: '2px',
                  backgroundColor: 'var(--accent-6)',
                  transform: 'translateX(-50%)',
                  zIndex: 0,
                  // display: { initial: 'none', md: 'block' },
                }}
              />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <Box
                    pl={index % 2 === 0 ? { md: '3rem' } : { md: '0' }}
                    pr={index % 2 === 1 ? { md: '3rem' } : { md: '0' }}
                    ml={index % 2 === 0 ? { md: '50%' } : { md: '0' }}
                    mr={index % 2 === 1 ? { md: '50%' } : { md: '0' }}
                    style={{
                      position: 'relative',
                      marginBottom: '2rem',
                      // paddingLeft: index % 2 === 0 ? { md: '3rem' } : { md: '0' },
                      // paddingRight: index % 2 === 1 ? { md: '3rem' } : { md: '0' },
                      // marginLeft: index % 2 === 0 ? { md: '50%' } : { md: '0' },
                      // marginRight: index % 2 === 1 ? { md: '50%' } : { md: '0' },
                      textAlign: index % 2 === 0 ? 'left' : 'right',
                    }}
                    className="milestone"
                  >
                    <Card
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        zIndex: 2,
                      }}
                    >
                      <Flex gap="4" align="center">
                        <Box
                          style={{
                            backgroundColor: 'var(--accent-6)',
                            color: 'var(--accent-contrast)',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-2)',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            minWidth: '80px',
                            textAlign: 'center',
                          }}
                        >
                          {milestone.year}
                        </Box>
                        <Box>
                          <Text weight="bold" size="3" mb="1">
                            {milestone.title}
                          </Text>
                          <br />
                          <Text size="2" style={{ color: 'var(--gray-11)' }}>
                            {milestone.description}
                          </Text>
                        </Box>
                      </Flex>

                      {/* Circle on timeline (visible only on medium screens and up) */}
                      <Box
                        left={index % 2 === 0 ? { md: '-1.5rem' } : { md: 'auto' }}
                        right={index % 2 === 1 ? { md: '-1.5rem' } : { md: 'auto' }}
                        display={{ initial: 'none', md: 'block' }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          width: '1rem',
                          height: '1rem',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-9)',
                          border: '3px solid var(--accent-3)',
                          transform: 'translate(-50%, -50%)',
                          zIndex: 3,
                        }}
                      />
                    </Card>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Flex>
        </Container>
      </Section>

      {/* Call to action */}
      <Section
        size="3"
        style={{ background: 'linear-gradient(to bottom right, var(--accent-5), var(--accent-3))' }}
      >
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
              gap="6"
              style={{
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto',
                padding: 'var(--space-9) 0',
              }}
            >
              <Heading size="6">צרו איתנו קשר עוד היום</Heading>
              <Text size="3" style={{ marginBottom: '2rem' }}>
                אנו מזמינים אתכם לפנות אלינו לתיאום פגישת ייעוץ ללא התחייבות, בה נוכל לשמוע על
                הצרכים שלכם ולהציע פתרונות מתאימים.
              </Text>
              <Box>
                <a href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      backgroundColor: 'white',
                      color: 'var(--accent-9)',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '9999px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-4)',
                    }}
                  >
                    צור קשר
                  </motion.button>
                </a>
              </Box>
            </Flex>
          </motion.div>
        </Container>
      </Section>
    </Box>
  );
}
