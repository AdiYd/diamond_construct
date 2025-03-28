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

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div
            style={{
              minHeight: '100vh',
              // display: 'flex',
              // flexDirection: 'column',
            }}
          >
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <AccessibilityMenu position={{ bottom: '2rem', right: '2rem' }} />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
