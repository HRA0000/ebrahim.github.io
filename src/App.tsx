import './App.css';
import Home from './Home';
import { useState, useRef } from 'react';

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
      <nav className="navbar">
        <button className="nav-link" onClick={() => scrollToSection('home')}>Home</button>
        <button className="nav-link" onClick={() => scrollToSection('projects')}>My Projects</button>
        <button className="nav-link" onClick={() => scrollToSection('skills')}>Skills</button>
        <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact Me</button>
        <div style={{ flex: 1 }} />
        <button
          className="lang-switch-btn"
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          style={{ marginLeft: 'auto' }}
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </nav>
      <Home lang={lang} profilePicRef={profilePicRef} />
    </div>
  );
}

export default App;
