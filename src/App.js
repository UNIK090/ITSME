import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import About from './pages/About';
import Home from './pages/Home';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './components/ThemeToggle';
import ParticlesBackground from './components/ParticlesBackground';

// Define themes
const lightTheme = {
  background: '#f5f5f5',
  text: '#333',
  primary: '#ff0066',
  secondary: '#111',
  card: '#fff',
  cardShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  navBackground: 'rgba(255, 255, 255, 0.8)',
};

const darkTheme = {
  background: '#111',
  text: '#f5f5f5',
  primary: '#ff0066',
  secondary: '#f5f5f5',
  card: '#1a1a1a',
  cardShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  navBackground: 'rgba(17, 17, 17, 0.8)',
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentContainer = styled(motion.main)`
  flex: 1;
`;

const PageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [showParticles, setShowParticles] = useState(true);

  // Easter egg - Konami code
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Activate easter egg
          document.body.style.transform = 'rotate(180deg)';
          setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
          }, 3000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleParticles = () => {
    setShowParticles(!showParticles);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          {showParticles && <ParticlesBackground />}
          
          <ThemeToggle toggleTheme={toggleTheme} currentTheme={theme} toggleParticles={toggleParticles} />
          
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={
              <>
                <Navbar />
                <AnimatePresence mode="wait">
                  <ContentContainer
                    key={window.location.pathname}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={PageTransition}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/about" element={<About />} />
                    </Routes>
                  </ContentContainer>
                </AnimatePresence>
                <Footer />
              </>
            } />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
