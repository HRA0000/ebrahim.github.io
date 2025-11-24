import './App.css';
import Home from './Home';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const profilePicRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      if (profilePicRef.current) {
        profilePicRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="portfolio-container">
      <motion.nav 
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button 
          className="nav-link" 
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.button>
        <motion.button 
          className="nav-link" 
          onClick={() => scrollToSection('projects')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          My Projects
        </motion.button>
        <motion.button 
          className="nav-link" 
          onClick={() => scrollToSection('skills')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Skills
        </motion.button>
        <motion.button 
          className="nav-link" 
          onClick={() => scrollToSection('contact')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
        </motion.button>
        <div style={{ flex: 1 }} />
        <motion.button
          className="lang-switch-btn"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          style={{ marginLeft: 'auto' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </motion.button>
      </motion.nav>
      <Home lang={lang} profilePicRef={profilePicRef} />
    </div>
  );
}

export default App;
