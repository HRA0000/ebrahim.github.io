import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { FaUsers, FaLightbulb, FaHtml5, FaPython, FaMobileAlt, FaHeadphones, FaMusic, FaSlidersH, FaLinkedin, FaFacebook, FaInstagram, FaSoundcloud } from 'react-icons/fa';

const SERVICE_ID = 'service_gaa2g34'; // Your provided Service ID
const TEMPLATE_ID = 'template_7r1akcf'; // <-- Replace with your actual Template ID
const USER_ID = 'EqkZlke0AIT3ktEUE'; // <-- Replace with your actual User ID (public key)

interface HomeProps {
  lang?: 'en' | 'ar';
  profilePicRef?: React.RefObject<HTMLDivElement>;
}

const translations = {
  en: {
    name: 'Ebrahim Altabib',
    role: 'Web Designer & Developer',
    intro1: 'Welcome to my portfolio!',
    intro2: 'I design and develop websites, mobile apps, and produce audio',
    intro3: 'Explore my work and feel free to contact me',
    projects: 'My Projects',
    project1: 'Guesso: An online guessing game website where users can play and challenge friends',
    project2: 'Another innovative project, demonstrating advanced design and development techniques',
    project3: 'Electricity Meter Mobile App: A modern app for monitoring and managing electricity meters, designed and developed by me',
    contact: 'Contact Me',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourMessage: 'Your Message',
    send: 'Send Message',
    sent: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.',
    email: 'Email',
    location: 'Location',
    tripoli: 'Tripoli, Libya',
    skills: 'Skills',
    softSkills: 'Soft Skills',
    techSkills: 'Programming Languages & Technologies',
    teamwork: 'Teamwork',
    creativity: 'Creative Ideas',
    htmlcss: 'HTML & CSS',
    python: 'Learning Python',
    flutter: 'Learning Flutter',
    audioEng: 'Audio Engineering (FL Studio)',
    musicProd: 'Music Production',
    mixing: 'Mixing',
    englishFluent: 'English Fluent',
    phone: 'Phone',
  },
  ar: {
    name: 'أبراهيم الطبيب',
    role: 'مصمم ومطور مواقع وبرامج موبايل',
    intro1: 'مرحباً بك في موقعي الشخصي!',
    intro2: 'أصمم وأطور مواقع إلكترونية وتطبيقات موبايل ومهندس صوتيات',
    intro3: 'تصفح أعمالي ولا تتردد في التواصل معي',
    projects: 'مشاريعي',
    project1: 'جيسو: موقع لعبة تخمين عبر الإنترنت يمكن للمستخدمين فيه اللعب وتحدي الأصدقاء',
    project2: 'مشروع آخر مبتكر يوضح تقنيات التصميم والتطوير المتقدمة',
    project3: 'تطبيق عدادات الكهرباء: تطبيق حديث لمراقبة وإدارة عدادات الكهرباء من تصميمي وتطويري',
    contact: 'تواصل معي',
    yourName: 'اسمك',
    yourEmail: 'بريدك الإلكتروني',
    yourMessage: 'رسالتك',
    send: 'إرسال الرسالة',
    sent: 'تم إرسال الرسالة بنجاح!',
    error: 'فشل في إرسال الرسالة. حاول مرة أخرى.',
    email: 'البريد الإلكتروني',
    location: 'الموقع',
    tripoli: 'طرابلس، ليبيا',
    skills: 'المهارات',
    softSkills: 'المهارات الشخصية',
    techSkills: 'لغات وتقنيات البرمجة',
    teamwork: 'العمل الجماعي',
    creativity: 'أفكار إبداعية',
    htmlcss: 'HTML و CSS',
    python: 'تعلم بايثون',
    flutter: 'تعلم فلاتر',
    audioEng: 'هندسة صوتية (FL Studio)',
    musicProd: 'إنتاج موسيقي',
    mixing: 'مكساج',
    englishFluent: 'إجادة اللغة الإنجليزية',
    phone: 'الهاتف',
  }
};

const Home: React.FC<HomeProps> = ({ lang = 'en', profilePicRef }) => {
  const t = translations[lang];
  const homeRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const profilePicRefDiv = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = [homeRef.current, projectsRef.current, contactRef.current, profilePicRefDiv.current, skillsRef.current];
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSent(false);
    if (!formRef.current) return;
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID)
      .then(() => setSent(true))
      .catch(() => setError(t.error));
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="profile-pic-container slide-fade-in" ref={profilePicRefDiv}>
        <img src={`${import.meta.env.BASE_URL}profile-pic.jpg`} alt={t.name} className="profile-pic" />
      </div>
      <header className="header fade-in" id="home" ref={homeRef}>
        <h1 className="name">{t.name}</h1>
        <div className="animated-roles">
          <span className="typewriter">{t.role}</span>
        </div>
        <p className="intro">
          {t.intro1}<br />
          {t.intro2}<br />
          {t.intro3}
        </p>
      </header>
      <section className="projects-section fade-in" id="projects" ref={projectsRef}>
        <h2>{t.projects}</h2>
        <div className="project-gallery">
          <div className="project-item">
            <div className="guesso-images">
              <img src={`${import.meta.env.BASE_URL}guesso.png`} alt="Guesso 1" className="project-image" />
              <img src={`${import.meta.env.BASE_URL}guesso2.png`} alt="Guesso 2" className="project-image" />
            </div>
            <h3>Guesso</h3>
            <p>{t.project1}</p>
          </div>
          <div className="project-item">
            <img src={`${import.meta.env.BASE_URL}My_Meter.png`} alt="Electricity Meter App" className="project-image" />
            <h3>Electricity Meter App</h3>
            <p>{t.project3}</p>
          </div>
        </div>
      </section>
      <section className="skills-section fade-in" id="skills" ref={skillsRef}>
        <h2>{t.skills}</h2>
        <div className="skills-lists">
          <div className="skills-list">
            <h3>{t.softSkills}</h3>
            <ul>
              <li><FaUsers style={{ marginRight: 8 }} />{t.teamwork}</li>
              <li><FaLightbulb style={{ marginRight: 8 }} />{t.creativity}</li>
              <li><FaUsers style={{ marginRight: 8 }} />{t.englishFluent}</li>
            </ul>
          </div>
          <div className="skills-list">
            <h3>{t.techSkills}</h3>
            <ul>
              <li><FaHtml5 style={{ marginRight: 8 }} />{t.htmlcss}</li>
              <li><FaPython style={{ marginRight: 8 }} />{t.python}</li>
              <li><FaMobileAlt style={{ marginRight: 8 }} />{t.flutter}</li>
              <li><FaHeadphones style={{ marginRight: 8 }} />{t.audioEng}</li>
              <li><FaMusic style={{ marginRight: 8 }} />{t.musicProd}</li>
              <li><FaSlidersH style={{ marginRight: 8 }} />{t.mixing}</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="contact-section fade-in" id="contact" ref={contactRef}>
        <h2>{t.contact}</h2>
        <form ref={formRef} onSubmit={sendEmail} className="contact-form">
          <input type="text" name="user_name" placeholder={t.yourName} required className="form-input" />
          <input type="email" name="user_email" placeholder={t.yourEmail} required className="form-input" />
          <textarea name="message" placeholder={t.yourMessage} required className="form-textarea" />
          <button type="submit" className="form-button">{t.send}</button>
        </form>
        {sent && <p className="success-message">{t.sent}</p>}
        {error && <p className="error-message">{error}</p>}
        <ul className="contact-list">
          <li>{t.email}: <a href="mailto:ebrahemaltbeb@gmail.com">ebrahemaltbeb@gmail.com</a></li>
          {window.innerWidth < 800 ? (
            <li>{t.phone}: <a href="tel:+218914540082">+218 914540082</a></li>
          ) : (
            <li>{t.phone}: +218 914540082</li>
          )}
          <li>{t.location}: {t.tripoli}</li>
        </ul>
      </section>
      <footer className="footer">
        <div className="footer-socials">
          <a href="https://linkedin.com/in/ebrahim-altbeb-a4b7b0230" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://www.facebook.com/Hemoxmusic" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
          <a href="https://www.instagram.com/hraa.wav/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://soundcloud.com/hemoxmusic" target="_blank" rel="noopener noreferrer" aria-label="SoundCloud"><FaSoundcloud /></a>
        </div>
        <div className="footer-copy">&copy; 2025 Ebrahim Altabib All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Home; 