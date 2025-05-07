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
import { Accessibility } from './pages/Accessibility';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import '@radix-ui/themes/styles.css';
import './styles/styles.css';
import { ScrollToTop } from './components/ScrollToTop';
// import FontSelector from './components/FontSelector';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          {/* <FontSelector /> */}
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
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </main>
            <Footer />
            {/* <AccessibilityMenu position={{ bottom: '2rem', right: '2rem' }} /> */}
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
