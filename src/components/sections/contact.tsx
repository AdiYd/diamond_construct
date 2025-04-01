import React, { useState } from 'react';
import { useScreen } from '../../hooks/useScreen';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Section,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { ChevronLeft, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from 'framer-motion';

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

export default function ContactSection({ extendSection = false, noBackground = false }) {
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

  return (
    <Section
      id="contact-section"
      size="3"
      style={{
        // background: 'linear-gradient(135deg, var(--accent-4), var(--accent-1))',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '4rem 1.5rem' : '5rem 2rem',
      }}
    >
      <Container style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ zIndex: 20 }}
        >
          <Grid style={{ zIndex: 20 }} columns={{ initial: '1', sm: '2' }} gap="6">
            {/* Contact Information */}
            <Box>
              <Heading size="6" mb="4">
                בואו נדבר על הפרויקט שלכם
              </Heading>
              <Text
                as="div"
                size={isMobile ? '3' : '4'}
                mb="6"
                style={{ color: 'var(--gray-11)', maxWidth: '500px' }}
              >
                נשמח לענות על כל שאלה ולסייע בתכנון הפרויקט הבא שלכם. השאירו פרטים או פנו אלינו
                ישירות.
              </Text>

              <Flex style={{ zIndex: 10 }} direction="column" gap="4" my="6">
                {[
                  {
                    icon: <Phone size={20} />,
                    title: 'יעקב',
                    content: '052-703-6959',
                    action: 'tel:+972527036959',
                    color: 'var(--red-9)',
                  },
                  {
                    icon: <Mail size={20} />,
                    title: 'אימייל',
                    content: 'info@diamond-renovation.co.il',
                    action: 'mailto:info@diamond-renovation.co.il',
                    color: 'var(--blue-9)',
                  },
                  {
                    icon: <MapPin size={20} />,
                    title: 'כתובת',
                    content: 'רחוב המלאכה 5, כרמיאל',
                    action: 'https://maps.google.com/?q=כרמיאל+המלאכה+5',
                    color: 'var(--green-9)',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <Flex
                      onClick={() => {
                        window.open(item.action);
                      }}
                      gap="3"
                      align="center"
                    >
                      <Box
                        style={{
                          display: 'flex',
                          cursor: 'pointer',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'var(--gray-a1)',
                          color: item.color,
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '50%',
                          flexShrink: 0,

                          border: `1px solid var(--accent-a5)`,
                        }}
                        onClick={() => {
                          window.open(item.action, '_blank');
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box as="div" style={{ textAlign: 'start' }}>
                        <Text as="div" weight="bold" size="4">
                          {item.title}:
                        </Text>
                        <a
                          href={item.action}
                          target={item.action.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          style={{
                            color: 'var(--gray-12)',
                            textDecoration: 'none',
                          }}
                        >
                          <Text
                            as="div"
                            align="right"
                            size={isMobile ? '3' : '4'}
                            weight="medium"
                            mx="1"
                          >
                            {item.content}
                            {item.title === 'יעקב' && (
                              <Text
                                as="label"
                                className="rt-underline-hover rt-underline-always"
                                style={{
                                  color: 'var(--gray-11)',
                                  marginRight: '4px',
                                  cursor: 'pointer',
                                }}
                              >
                                (לחצו לחיוג)
                              </Text>
                            )}
                          </Text>
                        </a>
                      </Box>
                    </Flex>
                  </motion.div>
                ))}
              </Flex>
            </Box>

            {/* Quick Contact Form */}
            <Box>
              <Card
                style={{
                  backdropFilter: 'blur(10px)',
                  // backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  // border: '1px solid var(--accent-5)',
                  padding: 'var(--space-5)',
                  position: 'relative',
                }}
              >
                <Flex style={{ zIndex: 10 }} direction="column" gap="4">
                  <Box>
                    <Heading size="4" mb="2">
                      השאירו פרטים ונחזור אליכם
                    </Heading>
                    <Text size="2" style={{ color: 'var(--gray-11)' }}>
                      מלאו את הטופס המקוצר או צרו קשר בוואטסאפ
                    </Text>
                  </Box>

                  <form onSubmit={handleQuickFormSubmit}>
                    <Flex direction="column" gap="3">
                      <Box>
                        <Text align="right" as="label" size="2" mb="1" style={{ display: 'block' }}>
                          שם מלא*
                        </Text>
                        <TextField.Root
                          size="3"
                          name="name"
                          // variant="soft"
                          value={quickFormData.name}
                          onChange={handleQuickFormInputChange}
                          placeholder="הכנס את שמך המלא"
                          // className="input"
                          style={{
                            backgroundColor: 'var(--gray-1)',
                            minHeight: '2rem',
                            // padding: '0.5rem',
                          }}
                        >
                          {/* <input
                           
                          /> */}
                        </TextField.Root>
                        {quickFormErrors.name && (
                          <Text
                            size="1"
                            color="red"
                            align="left"
                            style={{ marginTop: '0.25rem', display: 'block' }}
                          >
                            {quickFormErrors.name}
                          </Text>
                        )}
                      </Box>

                      <Box>
                        <Text align="right" as="label" size="2" mb="1" style={{ display: 'block' }}>
                          טלפון*
                        </Text>
                        <TextField.Root
                          size="3"
                          // variant="soft"
                          // type="tel"
                          name="phone"
                          value={quickFormData.phone}
                          onChange={handleQuickFormInputChange}
                          placeholder="הכנס מספר טלפון"
                          style={{
                            backgroundColor: 'var(--gray-1)',
                            minHeight: '2rem',
                            // padding: '0.5rem',
                          }}
                        />
                        {quickFormErrors.phone && (
                          <Text
                            size="1"
                            color="red"
                            align="left"
                            style={{ marginTop: '0.25rem', display: 'block' }}
                          >
                            {quickFormErrors.phone}
                          </Text>
                        )}
                      </Box>
                      <div
                        onClick={() => setMoreInfo(!moreInfo)}
                        style={{ cursor: 'pointer', color: 'var(--gray-12)' }}
                      >
                        <Text
                          align="center"
                          style={{
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                          }}
                          size="2"
                          weight="bold"
                          mb="1"
                        >
                          {moreInfo ? 'רוצים לפרט פחות?' : 'רוצים לפרט יותר?'}

                          <Icon
                            style={{
                              transform: !moreInfo ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease-in-out',
                            }}
                            width={24}
                            icon="mdi:chevron-up"
                          />
                        </Text>
                      </div>

                      {moreInfo && (
                        <>
                          <Box>
                            <Text
                              as="label"
                              align="right"
                              // size="2"
                              weight="bold"
                              htmlFor="service"
                              mb="1"
                              style={{ display: 'block' }}
                            >
                              סוג השירות
                            </Text>
                            <select
                              id="service"
                              name="service"
                              value={quickFormData.service}
                              onChange={handleQuickFormInputChange}
                              // placeholder="בחר שירות מבוקש"
                              style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-3)',
                                border: '1px solid var(--gray-6)',
                                backgroundColor: 'var(--gray-1)',
                                color: 'var(--text-color)',
                                fontSize: '1rem',
                              }}
                            >
                              <option value="">ובחר שירות מבוקש</option>
                              <option value="bathrooms">שיפוץ אמבטיות</option>
                              <option value="kitchens">שיפוץ מטבחים</option>
                              <option value="construction">בנייה פרטית</option>
                              <option value="renovations">שיפוצים כלליים</option>
                              <option value="maintenance">תחזוקה שוטפת</option>
                              <option value="other">אחר</option>
                            </select>
                          </Box>
                          <div>
                            {quickFormErrors.service && (
                              <Text
                                size="1"
                                color="red"
                                align="left"
                                style={{ marginTop: '0.25rem', display: 'block' }}
                              >
                                {quickFormErrors.service}
                              </Text>
                            )}
                          </div>

                          <Box>
                            <Text
                              as="label"
                              align="right"
                              // size="2"
                              weight="bold"
                              htmlFor="message"
                              mb="1"
                              style={{ display: 'block' }}
                            >
                              תוכן הפנייה*
                            </Text>
                            <TextArea
                              id="info"
                              name="info"
                              // variant="soft"
                              value={quickFormData?.info}
                              onChange={handleQuickFormInputChange}
                              placeholder="תארו בקצרה את השיפוץ שאתם מעוניים בו"
                              style={{
                                width: '100%',
                                minHeight: '150px',
                                backgroundColor: 'var(--gray-1)',
                                border: quickFormErrors.info ? '1px solid var(--red-9)' : undefined,
                              }}
                            />
                            {quickFormErrors.info && (
                              <Text
                                size="1"
                                color="red"
                                align="left"
                                style={{ marginTop: '0.25rem', display: 'block' }}
                              >
                                {quickFormErrors.info}
                              </Text>
                            )}
                          </Box>
                        </>
                      )}

                      <Flex align="center" wrap="wrap" justify="center" gap="3" mt="4" mb="4">
                        <Button
                          type="submit"
                          loading={loading}
                          size="4"
                          className="cta-button"
                          // style={{
                          //   flex: 1,
                          //   background: loading
                          //     ? 'var(--gray-6)'
                          //     : 'linear-gradient(135deg, var(--accent-9), var(--accent-10))',
                          // }}
                        >
                          <Send size={16} />
                          שליחת פרטים
                        </Button>

                        <a
                          href="https://wa.me/972527036959"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ flex: 1 }}
                        >
                          <IconButton
                            size="4"
                            // variant="soft"
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Open WhatsApp link in a new tab
                              window.open('https://wa.me/972527036959', '_blank');
                            }}
                            style={{
                              width: 'fit-content',
                              height: 'fit-content',
                              backgroundColor: '#25D366',
                              borderRadius: '100%',
                              padding: '0.5rem',
                              color: 'white',
                            }}
                          >
                            <Icon icon="mdi:whatsapp" width={20} />
                            {/* וואטסאפ */}
                          </IconButton>
                        </a>
                      </Flex>
                    </Flex>
                  </form>
                </Flex>
              </Card>
            </Box>
          </Grid>
        </motion.div>
      </Container>
      {/* </Section> */}

      {/* Final CTA Section - Enhanced with modern design */}
      {extendSection && (
        <>
          <motion.div
            className="cta-background-pattern*"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 30,
              ease: 'linear',
            }}
            style={{
              marginTop: 'var(--space-8)',
              marginBottom: 'var(--space-8)',
              borderTop: '1px solid var(--gray-6)',
            }}
          />

          <Container>
            <Flex direction="column" align="center" gap="6" className="">
              <Heading
                size={{ initial: '6', sm: '7' }}
                align="center"
                className="section-title with-accent"
                style={{
                  marginBottom: '1rem',
                }}
              >
                רוצים להתחיל?
              </Heading>

              <Text
                size={isMobile ? '3' : '5'}
                mx="auto"
                as="div"
                weight="medium"
                align="center"
                className="cta-subheading"
              >
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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                  // className="animatedShine"
                >
                  <Icon icon="ion:diamond-sharp" width={50} />
                </div>
                <Text
                  size="5"
                  weight="bold"
                  className="animatedShine"
                  style={{
                    // color: 'var(--accent-11)',
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
        </>
      )}
      {!noBackground && (
        <div style={{ zIndex: 0 }} className="bg-pattern2* cta-background-pattern" />
      )}
    </Section>
  );
}
