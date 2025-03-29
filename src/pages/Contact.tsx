import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const { isMobile } = useScreen();

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

    if (!formData.email.trim()) {
      errors.email = 'נא למלא כתובת אימייל';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'כתובת אימייל לא תקינה';
    }

    if (!formData.message.trim()) {
      errors.message = 'נא למלא את הודעתך';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate form submission to backend
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            phone: '',
            email: '',
            message: '',
            service: '',
          });
          setSubmitStatus('idle');
        }, 3000);
      }, 1500);
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
        size="3"
        style={{
          background: 'linear-gradient(to right, var(--accent-4), var(--accent-2))',
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
                style={{ marginBottom: '1.5rem' }}
              >
                צור קשר
              </Heading>
              <Text
                size="5"
                align="center"
                style={{ marginBottom: '2rem', color: 'var(--gray-11)', lineHeight: '1.6' }}
              >
                נשמח לעמוד לרשותך. מלא את הטופס או פנה אלינו באחת מהדרכים הבאות
              </Text>
            </motion.div>
          </Flex>
        </Container>
      </Section>

      {/* Contact Information and Form */}
      <Section size="3" style={{ background: 'var(--color-background)' }}>
        <Container>
          <Grid columns={isMobile ? '1' : '3'} gapY="4" gapX={!isMobile ? '4' : '0'}>
            {/* Contact Info Cards */}
            <Box>
              <Grid rows="3" gap="4" height="100%">
                {[
                  {
                    icon: <Phone size={24} />,
                    title: 'טלפון',
                    content: '052-703-6959',
                    action: 'tel:+972527036959',
                    color: 'var(--blue-9)',
                  },
                  {
                    icon: <Mail size={24} />,
                    title: 'אימייל',
                    content: 'info@diamond-renovation.co.il',
                    action: 'mailto:info@diamond-renovation.co.il',
                    color: 'var(--amber-9)',
                  },
                  {
                    icon: <MapPin size={24} />,
                    title: 'כתובת',
                    content: 'רחוב המלאכה 5, כרמיאל',
                    action: 'https://maps.google.com/?q=כרמיאל+המלאכה+5',
                    color: 'var(--crimson-9)',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      style={{
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
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
                          background: `${item.color}10`,
                          marginRight: '-2rem',
                          marginTop: '-2rem',
                        }}
                      />

                      <Flex gap="3" align="center" style={{ position: 'relative', zIndex: 1 }}>
                        <Box
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: `${item.color}20`,
                            color: item.color,
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '50%',
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box
                          style={{
                            textAlign: 'start',
                          }}
                        >
                          <Text weight="bold" size="3" mb="1">
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
                            <Text size="3">{item.content}</Text>
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
                  <Card style={{ marginTop: '2rem' }}>
                    <Flex gap="3" align="center">
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'var(--grass-3)',
                          color: 'var(--grass-9)',
                          width: '3rem',
                          height: '3rem',
                          borderRadius: '50%',
                          flexShrink: 0,
                        }}
                      >
                        <Clock size={24} />
                      </Box>
                      <Box>
                        <Text weight="bold" size="3" mb="1">
                          שעות פעילות
                        </Text>
                        <br />
                        <Text size="2">ימים א'-ה': 09:00-18:00</Text>
                        <br />
                        <Text size="2">יום ו': 09:00-13:00</Text>
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
                    boxShadow: 'var(--shadow-4)',
                  }}
                >
                  <Flex direction="column" gap="5">
                    <Flex align="center" gap="3">
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'var(--accent-3)',
                          color: 'var(--accent-9)',
                          width: '3rem',
                          height: '3rem',
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
                        <Text size="2" style={{ color: 'var(--gray-11)' }}>
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
                          <Grid columns={{ initial: '1', sm: '2' }} gap="3">
                            <Box>
                              <Text
                                as="label"
                                size="2"
                                weight="bold"
                                htmlFor="name"
                                mb="1"
                                style={{ display: 'block' }}
                              >
                                שם מלא*
                              </Text>
                              <TextField.Root
                                style={{ width: '100%' }}
                                id="name"
                                name="name"
                                size="3"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="הכנס את שמך המלא"
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
                                weight="bold"
                                htmlFor="phone"
                                mb="1"
                                style={{ display: 'block' }}
                              >
                                טלפון*
                              </Text>
                              <TextField.Root
                                style={{ width: '100%' }}
                                id="phone"
                                size="3"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="הכנס מספר טלפון"
                                //   state={formErrors.phone ? 'invalid' : undefined}
                              ></TextField.Root>
                              {formErrors.phone && (
                                <Text size="1" color="red" style={{ marginTop: '0.25rem' }}>
                                  {formErrors.phone}
                                </Text>
                              )}
                            </Box>
                          </Grid>

                          <Box>
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
                              style={{ width: '100%' }}
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
                          </Box>

                          <Box>
                            <Text
                              as="label"
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
                                backgroundColor: 'var(--color-background)',
                                color: 'var(--gray-11)',
                                fontSize: '1rem',
                              }}
                            >
                              <option value="">בחר שירות מבוקש</option>
                              <option value="bathrooms">שיפוץ אמבטיות</option>
                              <option value="kitchens">שיפוץ מטבחים</option>
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
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="תאר בקצרה את השירות שאתה מעוניין בו"
                              style={{
                                width: '100%',
                                minHeight: '150px',
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
                            size="3"
                            mx="auto"
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
                                  <Text>נסה שוב</Text>
                                  <AlertCircle size={16} />
                                </>
                              ) : (
                                <>
                                  <Text>שלח פנייה</Text>
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
        </Container>
      </Section>

      {/* Map Section */}
      <Section size="3" style={{ padding: '0' }}>
        <Box
          style={{
            height: '500px',
            width: '100%',
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.694699349839!2d35.288500476202714!3d32.92052997611377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c3e5de671c98f%3A0x30b93e686f80f837!2z15TXnteQ15vXlCAzLCDXpteo16og16rXqNep15nXl9eQ!5e0!3m2!1siw!2sil!4v1648314993704!5m2!1siw!2sil"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: 'grayscale(20%)',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="מפת מיקום משרדי דיאמונד"
          />
        </Box>
      </Section>

      {/* WhatsApp CTA Floating Button */}
      <Box
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: { initial: '1rem', md: '2rem' },
          zIndex: 100,
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
        >
          <a
            href="https://wa.me/972527036959"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '50%',
              backgroundColor: '#25D366',
              color: 'white',
              boxShadow: 'var(--shadow-4)',
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.3764 4.62436C17.2662 2.51423 14.4775 1.35938 11.5207 1.35938C5.44297 1.35938 0.489655 6.3127 0.489655 12.3904C0.489655 14.4854 1.0478 16.5225 2.10409 18.3057L0.37207 23.6904L5.87646 21.9975C7.59462 22.9696 9.53329 23.4878 11.5159 23.4878H11.5208C17.5974 23.4878 22.5 18.5345 22.5 12.4568C22.5513 9.50001 21.4866 6.73449 19.3764 4.62436ZM11.5207 21.6127H11.5159C9.74644 21.6127 8.01341 21.1185 6.4933 20.1943L6.18186 20.0094L3.13293 21.0237L4.15718 18.0659L3.95146 17.744C2.9272 16.1647 2.37463 14.3094 2.37463 12.3904C2.37463 7.3432 6.47358 3.24464 11.5255 3.24464C13.9789 3.24464 16.2861 4.2111 18.0042 5.92929C19.7224 7.64741 20.6895 9.954 20.6895 12.4568C20.6846 17.504 16.5674 21.6127 11.5207 21.6127ZM16.6513 14.9058C16.3916 14.7767 15.0257 14.1057 14.7904 14.0246C14.5552 13.9338 14.3832 13.8952 14.2063 14.1638C14.0343 14.4323 13.5003 15.0555 13.3527 15.2275C13.2099 15.3995 13.0622 15.4188 12.8025 15.2897C12.5428 15.1607 11.6414 14.8637 10.5767 13.9145C9.74645 13.1765 9.18902 12.2716 9.04131 12.0126C8.89364 11.7538 9.0218 11.6114 9.14487 11.4786C9.2533 11.3554 9.38615 11.1642 9.51417 11.0166C9.64215 10.869 9.68071 10.7592 9.77167 10.5825C9.8626 10.4105 9.82404 10.263 9.75304 10.1291C9.68071 9.99515 9.12813 8.62933 8.9076 8.11005C8.69192 7.60549 8.47138 7.67679 8.31885 7.66708C8.17118 7.65737 7.9992 7.65737 7.82727 7.65737C7.65529 7.65737 7.382 7.72866 7.14676 7.98746C6.91149 8.24626 6.19922 8.91724 6.19922 10.2831C6.19922 11.6489 7.16196 12.9722 7.28998 13.1442C7.41795 13.3163 9.12813 15.9467 11.7324 17.1412C12.3516 17.4067 12.8362 17.5647 13.2147 17.6842C13.8484 17.8712 14.425 17.8519 14.8809 17.7809C15.3899 17.6939 16.4739 17.1025 16.6897 16.4992C16.9102 15.8907 16.9102 15.3715 16.8343 15.2323C16.7582 15.0932 16.6106 15.0349 16.3509 14.9058H16.6513Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </motion.div>
      </Box>
    </Box>
  );
}
