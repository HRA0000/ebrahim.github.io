import './App.css';
import Home from './Home';
import React, { useState } from 'react';

function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <button className="nav-link" onClick={() => scrollToSection('home')}>Home</button>
        <button className="nav-link" onClick={() => scrollToSection('projects')}>My Projects</button>
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
      <Home lang={lang} />
    </div>
  );
}

export default App;
