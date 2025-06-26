import { motion } from 'framer-motion';
import { Container, Section, Heading, Text, Flex, Box, Grid, Card } from '@radix-ui/themes';
import { Star, Heart, Users, Shield, Zap, Handshake } from 'lucide-react';
import useScreen from '../hooks/useScreen';
import '../styles/about.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import ContactSection from '../components/sections/contactUs';
import { useState } from 'react';
import { TeamImage, TeamMember } from '../components/sections/TeamShowCase';
import Asset from '../components/Asset';
import teamMembersJson from '../components/sections/team_members.json';
import enviromentList from '../components/sections/team.json';

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

const visionDict = {
  title: 'החזון שלנו: השיפוץ שלנו , הרוגע שלכם.',
  description: `החזון של חברת דאימונד להפוך את עולם השיפוצים לחוויה רגועה, חיובית שמאפשרת ללקוח\n                
  להשאר בראש שקט ובבטחון מלא לאורך כל הדרך. אנחנו עוסקים בשיפוץ דירות ובתים פרטיים,\n                
  תוספות בניה ותחזוקה שוטפת, עם מיקוד באזור כרמיאל והסביבה. מה שמייחד אותנו הוא השילוב\n                
  בין מקצועיות טכנית בלתי מתפשרת, לבין יחס אישי שמציב את הלקוח במרכז.`,
  // description2: `החזון שלנו הוא להעניק ללקוחותינו חווית שיפוץ ייחודית, שבה כל פרט נחשב, וכל לקוח הוא חלק מהמשפחה שלנו.`,
  description2: `אנו מאמינים ששיפוץ איכותי מתחיל בהקשבה אמיתית, ומתבצע מתוך הבנה שהבית שלכם הוא הרבה
                יותר ממבנה – הוא המקום הכי חשוב בעולם.`,
};

// Milestones data
// const milestones = [
//   {
//     year: '2010',
//     title: 'הקמת החברה',
//     description: 'דיאמונד הוקמה מתוך חזון ליצור חברת שיפוצים עם דגש על איכות ושירות.',
//   },
//   {
//     year: '2013',
//     title: 'הרחבת השירותים',
//     description: 'הרחבנו את תחומי הפעילות שלנו לכלול גם פרויקטים של בנייה פרטית.',
//   },
//   {
//     year: '2016',
//     title: '100 פרויקטים',
//     description: 'חגגנו השלמה מוצלחת של 100 פרויקטים, כולם בשביעות רצון מלאה של הלקוחות.',
//   },
//   {
//     year: '2020',
//     title: 'מחלקת עיצוב',
//     description: 'הוספנו מחלקת עיצוב פנים לחברה, המאפשרת לנו להציע פתרון מקיף מתכנון לביצוע.',
//   },
//   {
//     year: '2023',
//     title: 'הרחבה אזורית',
//     description: 'הרחבנו את פעילותנו לכל אזור הצפון, עם משרד נוסף בכרמיאל.',
//   },
//   {
//     year: '2025',
//     title: 'היום',
//     description: 'ממשיכים לצמוח ולהתפתח, עם מעל 500 פרויקטים מוצלחים ולקוחות מרוצים.',
//   },
// ];

export function About() {
  const { isMobile, isTablet } = useScreen();
  const [teamImages] = useState<TeamImage[]>(enviromentList);
  const [teamMembers] = useState<TeamMember[]>(teamMembersJson as TeamMember[]);
  const [vision] = useState<null | Record<string, string>>(visionDict);

  // useEffect(() => {
  //   const fetchMembersData = async () => {
  //     try {
  //       const teamMembersResponse = await fetch(`/content/team_members.json`);
  //       const teamMembersData = await teamMembersResponse.json();
  //       setTeamMembers(teamMembersData);
  //     } catch (error) {
  //       const data = fallbackTeamMember as TeamMember[];
  //       setTeamMembers(data);
  //       console.error('Error fetching members data:', error);
  //     }
  //   };

  //   fetchMembersData();
  // }, []);

  return (
    <Box dir="rtl">
      {/* Hero Section */}
      <Section
        size="2"
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
                Diamond
              </Heading>
              <Text
                size="5"
                align="center"
                style={{ marginBottom: '2rem', color: 'var(--header-sub)', lineHeight: '1.6' }}
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
      <Section size={isMobile ? '2' : '3'} style={{}}>
        <Flex direction="column" align="center" gap="6">
          <motion.div style={{ maxWidth: '800px', textAlign: 'center' }}>
            <div
              className="about-card"
              style={{
                padding: isMobile ? '1rem 1.5rem' : '2rem 4rem',
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
                {vision?.title || 'החזון שלנו: השיפוץ שלנו , הרוגע שלכם.'}
              </Heading>
              <Text
                as="div"
                align={isMobile ? 'center' : 'right'}
                size="3"
                style={{ lineHeight: '1.8', fontWeight: 500, marginBottom: '1rem' }}
              >
                {vision?.description ||
                  `החזון של חברת דאימונד להפוך את עולם השיפוצים לחוויה רגועה, חיובית שמאפשרת ללקוח
                להשאר בראש שקט ובבטחון מלא לאורך כל הדרך. אנחנו עוסקים בשיפוץ דירות ובתים פרטיים,
                תוספות בניה ותחזוקה שוטפת, עם מיקוד באזור כרמיאל והסביבה. מה שמייחד אותנו הוא השילוב
                בין מקצועיות טכנית בלתי מתפשרת, לבין יחס אישי שמציב את הלקוח במרכז.`}
              </Text>
              <Text
                align={isMobile ? 'center' : 'right'}
                as="div"
                size="3"
                style={{ lineHeight: '1.8', fontWeight: 500 }}
              >
                {vision?.description2}
              </Text>
            </div>
          </motion.div>
          <Box as="div" style={{ width: '100vw' }}>
            <div
              style={{
                animation: `scrollX ${isMobile ? '20' : '30'}s linear alternate infinite`,
                display: 'flex',
                gap: '1rem',
                overflowX: 'visible',
                position: 'relative',
                top: isMobile ? '' : '24px',
                // top: '-50px',
                rotate: '2deg',
                // height: '200px',
                width: isMobile ? '450%' : '250%',
                zIndex: 1,
              }}
            >
              {teamImages.map((image, index) => (
                <div key={index}>
                  <Asset
                    imageOnly
                    style={{
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      width: '250px',
                      height: isMobile ? '140px' : '250px',
                      borderRadius: '8px',
                    }}
                    src={image.image}
                    alt={image.title}
                    className="team-image"
                  />
                </div>
              ))}
            </div>
          </Box>
        </Flex>
      </Section>

      {/* Our Approach Section */}
      <Section size="3" style={{ background: 'var(--color-background)' }}>
        <Container px={'8'}>
          <Flex direction="column" align="center" gap="6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%' }}
            >
              <Heading
                as="h2"
                mx={isMobile ? 'auto' : undefined}
                size="6"
                align={isMobile ? 'center' : 'right'}
                className="section-title with-accent"
                mb="4"
              >
                הגישה שלנו: שקיפות, סדר ונשמה
              </Heading>
              <Text
                as="div"
                mx={isMobile ? 'auto' : undefined}
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
                  description: 'עדכונים שוטפים בקבוצת וואטסאפ ייעודית',
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
                      borderRadius: 'var(--radius-4)',
                      border: '1px solid var(--gray-a1)',
                      backgroundImage:
                        'linear-gradient(to bottom left,var(--iris-a3), var(--sky-a3))',
                      backgroundColor: 'var(--gray-a1)',
                      backdropFilter: 'blur(20px)',
                      // height: '100%',
                      transform: 'skew(2deg)',
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
        <Container px={'8'}>
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
      <Section id="team" size="3" style={{ background: 'var(--color-background)' }}>
        <Container px={'8'}>
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

            <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="6" width="100%">
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
                  style={{
                    gridColumn:
                      member.full && !isMobile ? (isTablet ? 'span 2' : 'span 2') : 'span 1',
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
                        <Asset
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-3)',
                          }}
                          src={member.image}
                          alt={member.name}
                          // className="team-image"
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

      {/* Call to action */}
      <ContactSection noBackground />
    </Box>
  );
}
