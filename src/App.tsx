import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AccessibilityMenu } from './components/ui/AccessibilityMenu';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import '@radix-ui/themes/styles.css';
import './styles/styles.css';
import { Box } from '@radix-ui/themes';
import { motion } from 'framer-motion';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router basename="/diamond_construct/">
          <div
            style={{
              minHeight: '100vh',
              // display: 'flex',
              // flexDirection: 'column',
            }}
          >
            <Header />
            <main style={{ position: 'relative', flexGrow: 1 }}>
              <div
                style={{
                  position: 'fixed',
                  bottom: '-15%',
                  left: '-16%',
                  height: '40vh',

                  width: '40vw',
                  zIndex: 0,
                  borderRadius: '40%',
                  filter: 'blur(80px)',
                  background:
                    'linear-gradient(to right, rgb(195 83 3 / 20%), rgb(210 92 49 / 20%))',
                  opacity: 0.8,
                }}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Box
              left={{ initial: '1rem', md: '2rem' }}
              style={{
                position: 'fixed',
                bottom: '1.5rem',
                left: '1rem',
                zIndex: 100,
              }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 40,
                }}
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
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    color: 'white',
                    boxShadow: 'var(--shadow-4)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'scale(1.1) rotate(25deg)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-6)';
                    e.currentTarget.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-4)';
                  }}
                >
                  <svg
                    width="24"
                    height="24"
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
            <Footer />
            <AccessibilityMenu position={{ bottom: '2rem', right: '2rem' }} />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
