import React, { JSX, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Container,
  Section,
  Heading,
  Text,
  Flex,
  Box,
  Card,
  Grid,
  TextField,
  TextArea,
  Button,
} from '@radix-ui/themes';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import useScreen from '../hooks/useScreen';
import { ContactInformation } from '../components/sections/contactUs';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  service: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const iconDict: { [key: string]: JSX.Element } = {
  phone: <Phone size={20} />,
  email: <Mail size={20} />,
  address: <MapPin size={20} />,
};
const demoData: ContactInformation[] = [
  {
    icon: 'phone',
    title: 'יעקב',
    content: '052-703-6959',
    action: 'tel:+972527036959',
    color: 'var(--red-9)',
  },
  {
    icon: 'email',
    title: 'אימייל',
    content: 'info@diamond-renovation.co.il',
    action: 'mailto:info@diamond-renovation.co.il',
    color: 'var(--blue-9)',
  },
  {
    icon: 'address',
    title: 'כתובת',
    content: 'הדס 22, כרמיאל',
    action: 'https://maps.google.com/?q=כרמיאל+הדס+22',
    color: 'var(--green-9)',
  },
];

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    service: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [contactInfo, setContactInfo] = useState<ContactInformation[]>(demoData);
  const { isMobile } = useScreen();

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(`/content/contact_information.json`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch contact information');
        }
        setContactInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContactData();
  }, []);

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'נא למלא שם מלא';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'נא למלא מספר טלפון';
    } else if (!/^[0-9\-\\+\s()]*$/.test(formData.phone)) {
      errors.phone = 'מספר טלפון לא תקין';
    }

    // if (!formData.email.trim()) {
    //   errors.email = 'נא למלא כתובת אימייל';
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   errors.email = 'כתובת אימייל לא תקינה';
    // }

    if (!formData.message.trim()) {
      errors.message = 'נא למלא את הודעתך';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      const formDataToSend = {
        API: '9f2edb6c-8dbe-41c9-aeda-7cac06e0791b',
        service: 'send_lead',
        data: {
          to: 'info@diamond-il.com',
          subject: 'New Lead',
          data: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            service: formData.service,
          },
        },
      };
      // Simulate form submission to backend
      try {
        const response = await axios.post('https://taskomatic.net:7443/test1-mail', formDataToSend);

        if (response.status === 200) {
          setSubmitStatus('success');
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }

      // setTimeout(() => {
      //   setIsSubmitting(false);
      //   setSubmitStatus('success');

      //   // Reset form after successful submission
      //   setTimeout(() => {
      //     setFormData({
      //       name: '',
      //       phone: '',
      //       email: '',
      //       message: '',
      //       service: '',
      //     });
      //     setSubmitStatus('idle');
      //   }, 3000);
      // }, 1500);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

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
              {/* <Box className="bg-pattern2" /> */}
              <Heading
                size={isMobile ? '8' : '9'}
                align="center"
                style={{ marginBottom: '1.5rem', color: 'white' }}
              >
                צור קשר
              </Heading>
              <Text
                size="5"
                align="center"
                style={{ marginBottom: '2rem', color: 'var(--header-sub)', lineHeight: '1.6' }}
              >
                {'השאירו פרטים בטופס ונחזור אליכם בהקדם עם מענה אישי ומדויק'}
                {/* {'נשמח לעמוד לרשותך. מלא את הטופס או פנה אלינו באחת מהדרכים הבאות'} */}
              </Text>
            </motion.div>
          </Flex>
        </Container>
      </Section>
      <Section size={'1'} style={{ background: 'var(--color-background)' }}>
        <Box
          mx="auto"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0rem',
          }}
        >
          <Heading
            align="center"
            as="h2"
            size="6"
            style={{ textAlign: 'center', zIndex: 10, maxWidth: '90%' }}
          >
            רוצים לקבל הצעת מחיר? יש לכם שאלה על שיפוץ, תוספת בנייה או תחזוקה שוטפת?
            <br />
            אנחנו כאן כדי להקשיב, לייעץ, ולהתחיל איתכם את הדרך לבית מחודש ומושלם
          </Heading>
          <br />
          <Text
            as="div"
            size="3"
            style={{ color: 'var(--gray-11)', textAlign: 'center', zIndex: 10 }}
          >
            {/* השאירו פרטים בטופס ונחזור אליכם בהקדם עם מענה אישי ומדויק */}
          </Text>
        </Box>
      </Section>
      <Section
        mx="auto"
        px={isMobile ? '0.5rem' : '2rem'}
        size={isMobile ? '1' : '2'}
        style={{ background: 'var(--color-background)', maxWidth: isMobile ? '100%' : '90%' }}
      >
        <Grid columns={isMobile ? '1' : '3'} gapY="8" gapX={!isMobile ? '4' : '0'}>
          {/* Contact Info Cards */}
          <Box>
            <Grid rows="3" gap="4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    style={{
                      // height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      backdropFilter: 'blur(20px)',
                      backgroundColor: 'var(--background)',
                      // boxShadow: 'var(--shadow-4)',
                    }}
                  >
                    {/* Decorative corner */}
                    <Box
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '80px',
                        height: '80px',
                        borderBottomLeftRadius: '100%',
                        background: `${item.color.replace(/9/g, '3')}`,
                        marginRight: '-2rem',
                        marginTop: '-2rem',
                      }}
                    />

                    <Flex
                      gap="4"
                      align="center"
                      style={{ position: 'relative', zIndex: 1, padding: '0rem 1.5rem' }}
                    >
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: `${item.color.replace(/9/g, '3')}`,
                          color: `${item.color}`,
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '50%',
                          flexShrink: 0,
                        }}
                      >
                        {iconDict[item.icon]}
                      </Box>
                      <Box
                        style={{
                          textAlign: 'start',
                        }}
                      >
                        <Text as="div" weight="bold" size="3" mb="1">
                          {item.title}
                        </Text>
                        <a
                          href={item.action}
                          target={item.action.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          style={{
                            color: 'var(--gray-11)',
                            textDecoration: 'none',
                            display: 'block',
                          }}
                        >
                          <Text as="div" weight="medium" size="3">
                            {item.content}
                          </Text>
                        </a>
                      </Box>
                    </Flex>
                  </Card>
                </motion.div>
              ))}

              {/* Business Hours Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(20px)',
                    backgroundColor: 'var(--background)',
                    // boxShadow: 'var(--shadow-4)',
                  }}
                >
                  {/* Decorative corner */}
                  <Box
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '80px',
                      height: '80px',
                      borderBottomLeftRadius: '100%',
                      background: `var(--indigo-3)`,
                      marginRight: '-2rem',
                      marginTop: '-2rem',
                    }}
                  />
                  <Flex gap="4" align="center" style={{ padding: '0rem 1.5rem' }}>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--indigo-3)',
                        color: 'var(--indigo-9)',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        flexShrink: 0,
                      }}
                    >
                      <Clock size={24} />
                    </Box>
                    <Box style={{ textAlign: 'start' }}>
                      <Text as="div" weight="bold" size="3" mb="1">
                        שעות פעילות
                      </Text>
                      <Text as="div" weight="medium" size="2">
                        ימים א'-ה':{` `} 09:00-18:00
                      </Text>
                      <Text as="div" weight="medium" size="2">
                        יום ו':{} 09:00-13:00
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </motion.div>
            </Grid>
          </Box>

          {/* Contact Form */}
          <Box style={{ gridColumn: 'span 2' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: 'var(--space-5)',
                  // boxShadow: 'var(--shadow-6)',
                }}
              >
                <Flex direction="column" gap="5">
                  <Flex align="center" gap="4">
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--accent-3)',
                        color: 'var(--accent-9)',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        flexShrink: 0,
                      }}
                    >
                      <MessageSquare size={24} />
                    </Box>
                    <Box>
                      <Heading size="4" style={{ marginBottom: '0.5rem' }}>
                        דברו איתנו
                      </Heading>
                      <Text as="div" size="2" style={{ color: 'var(--gray-11)' }}>
                        מלאו את הפרטים ונחזור אליכם בהקדם
                      </Text>
                    </Box>
                  </Flex>

                  {submitStatus === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Flex
                        direction="column"
                        align="center"
                        gap="4"
                        style={{
                          padding: 'var(--space-6)',
                          textAlign: 'center',
                        }}
                      >
                        <Box
                          style={{
                            backgroundColor: 'var(--grass-3)',
                            color: 'var(--grass-9)',
                            width: '4rem',
                            height: '4rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CheckCircle size={32} />
                        </Box>
                        <Heading size="3">תודה על פנייתך!</Heading>
                        <Text style={{ color: 'var(--gray-11)' }}>
                          קיבלנו את ההודעה ונחזור אליך בהקדם
                        </Text>
                      </Flex>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <Flex direction="column" gap="4">
                        <Grid columns={{ initial: '1', sm: '2' }} gap="4">
                          <Box>
                            <Text
                              as="label"
                              align={'right'}
                              size="2"
                              weight="bold"
                              htmlFor="name"
                              mb="1"
                              style={{ display: 'block' }}
                            >
                              שם מלא*
                            </Text>
                            <TextField.Root
                              style={{
                                width: '100%',
                                minHeight: '2rem',
                                height: '2.5rem',
                                backgroundColor: 'var(--gray-1)',
                              }}
                              id="name"
                              name="name"
                              // variant="soft"
                              size="3"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="שם מלא"
                              //   state={formErrors.name ? 'invalid' : undefined}
                            ></TextField.Root>
                            {formErrors.name && (
                              <Text size="1" color="red" style={{ marginTop: '0.25rem' }}>
                                {formErrors.name}
                              </Text>
                            )}
                          </Box>

                          <Box>
                            <Text
                              as="label"
                              size="2"
                              align="right"
                              weight="bold"
                              htmlFor="phone"
                              mb="1"
                              style={{ display: 'block' }}
                            >
                              טלפון*
                            </Text>
                            <TextField.Root
                              style={{
                                width: '100%',
                                minHeight: '2rem',
                                height: '2.5rem',
                                backgroundColor: 'var(--gray-1)',
                              }}
                              id="phone"
                              size="3"
                              name="phone"
                              // variant="soft"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="טלפון ליצירת קשר"
                              //   state={formErrors.phone ? 'invalid' : undefined}
                            ></TextField.Root>
                            {formErrors.phone && (
                              <Text size="1" color="red" style={{ marginTop: '0.25rem' }}>
                                {formErrors.phone}
                              </Text>
                            )}
                          </Box>
                        </Grid>

                        {/* <Box>
                            <Text
                              as="label"
                              size="2"
                              weight="bold"
                              htmlFor="email"
                              mb="1"
                              style={{ display: 'block' }}
                            >
                              אימייל*
                            </Text>
                            <TextField.Root
                              style={{ width: '100%', minHeight: '2rem' }}
                              id="email"
                              size="3"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="הכנס את כתובת האימייל שלך"
                              // state={formErrors.email ? 'invalid' : undefined}
                            ></TextField.Root>
                            {formErrors.email && (
                              <Text size="1" color="red" style={{ marginTop: '0.25rem' }}>
                                {formErrors.email}
                              </Text>
                            )}
                          </Box> */}

                        <Box>
                          <Text
                            as="label"
                            align="right"
                            size="2"
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
                            value={formData.service}
                            onChange={handleInputChange}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              borderRadius: 'var(--radius-3)',
                              border: '1px solid var(--gray-6)',
                              backgroundColor: 'var(--gray-1)',
                              color: 'var(--gray-11)',
                              fontSize: '1rem',
                            }}
                          >
                            <option value="">בחרו שירות מבוקש</option>
                            <option value="bathrooms">שיפוץ אמבטיות</option>
                            <option value="kitchens">שיפוץ מטבחים</option>
                            <option value="add_room">הוספת קומה</option>
                            <option value="construction">בנייה פרטית</option>
                            <option value="renovations">שיפוצים כלליים</option>
                            <option value="maintenance">תחזוקה שוטפת</option>
                            <option value="other">אחר</option>
                          </select>
                        </Box>

                        <Box>
                          <Text
                            as="label"
                            size="2"
                            align="right"
                            weight="bold"
                            htmlFor="message"
                            mb="1"
                            style={{ display: 'block' }}
                          >
                            תוכן הפנייה*
                          </Text>
                          <TextArea
                            id="message"
                            name="message"
                            // variant="soft"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="תארו בקצרה את השירות שאתם מעוניינים בו"
                            style={{
                              width: '100%',
                              minHeight: '150px',
                              backgroundColor: 'var(--gray-1)',
                              border: formErrors.message ? '1px solid var(--red-9)' : undefined,
                            }}
                          />
                          {formErrors.message && (
                            <Text size="1" color="red" style={{ marginTop: '0.25rem' }}>
                              {formErrors.message}
                            </Text>
                          )}
                        </Box>

                        <Button
                          size="4"
                          mx="auto"
                          className="cta-button"
                          style={{
                            alignSelf: 'flex',
                            marginTop: '1rem',
                            minWidth: '140px',
                            position: 'relative',
                          }}
                          disabled={isSubmitting || submitStatus !== 'idle'}
                        >
                          <Flex gap="2" align="center" justify="center">
                            {isSubmitting ? (
                              <>
                                <Text>שולח...</Text>
                                <Loader2 size={16} className="animate-spin" />
                              </>
                            ) : submitStatus === 'error' ? (
                              <>
                                <Text>נסו שוב</Text>
                                <AlertCircle size={16} />
                              </>
                            ) : (
                              <>
                                <Text>שלחו פנייה</Text>
                                <Send size={16} />
                              </>
                            )}
                          </Flex>
                        </Button>
                      </Flex>
                    </form>
                  )}
                </Flex>
              </Card>
            </motion.div>
          </Box>
        </Grid>
      </Section>

      {/* Map Section */}
      <Section size="3" style={{ padding: '0', zIndex: 10 }}>
        <Box
          mx="auto"
          mb="4"
          style={{
            maxHeight: '500px',
            width: '80%',
            aspectRatio: '1',
            boxShadow: 'var(--shadow-2)',
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.694699349839!2d35.288500476202714!3d32.92052997611377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c3e5de671c98f%3A0x30b93e686f80f837!2z15TXnteQ15vXlCAyLCDXpteo16og16rXqNep15nXl9eQ!5e0!3m2!1siw!2sil!4v1648314993704!5m2!1siw!2sil"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: 'grayscale(20%)',
              borderRadius: 'var(--radius-3)',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="מפת מיקום משרדי דיאמונד"
          />
        </Box>
      </Section>
    </Box>
  );
}
