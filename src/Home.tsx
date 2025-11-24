import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { FaUsers, FaLightbulb, FaHtml5, FaPython, FaMobileAlt, FaHeadphones, FaMusic, FaSlidersH, FaLinkedin, FaFacebook, FaInstagram, FaSoundcloud } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SERVICE_ID = 'service_gaa2g34'; // Your provided Service ID
const TEMPLATE_ID = 'template_7r1akcf'; // <-- Replace with your actual Template ID
const USER_ID = 'EqkZlke0AIT3ktEUE'; // <-- Replace with your actual User ID (public key)

interface HomeProps {
  lang?: 'en' | 'ar';
  profilePicRef?: React.RefObject<HTMLDivElement | null>;
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
  const localProfilePicRef = useRef<HTMLDivElement>(null);
  const profilePicRefDiv = profilePicRef || localProfilePicRef;
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

  // Prevent image downloading
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        return false;
      }
    };

    const preventDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        return false;
      }
    };

    const preventSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDragStart);
    document.addEventListener('selectstart', preventSelectStart);
    document.addEventListener('mousedown', (e) => {
      if (e.button === 2) { // Right mouse button
        const target = e.target as HTMLElement;
        if (target.tagName === 'IMG' || target.closest('img')) {
          e.preventDefault();
        }
      }
    });

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDragStart);
      document.removeEventListener('selectstart', preventSelectStart);
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
    <div>
      <motion.div 
        className="profile-pic-container slide-fade-in" 
        ref={profilePicRefDiv}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.05, rotate: 5 }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}profile-pic.jpg`} 
          alt={t.name} 
          className="profile-pic" 
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </motion.div>
      <motion.header 
        className="header fade-in" 
        id="home" 
        ref={homeRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <motion.h1 
          className="name"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t.name}
        </motion.h1>
        <motion.div 
          className="animated-roles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="typewriter">{t.role}</span>
        </motion.div>
        <motion.p 
          className="intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {t.intro1}<br />
          {t.intro2}<br />
          {t.intro3}
        </motion.p>
      </motion.header>
      <motion.section 
        className="projects-section fade-in" 
        id="projects" 
        ref={projectsRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.projects}
        </motion.h2>
        <div className="project-gallery">
          <motion.div 
            className="project-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="guesso-images">
              <motion.img 
                src={`${import.meta.env.BASE_URL}guesso.png`} 
                alt="Guesso 1" 
                className="project-image"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              <motion.img 
                src={`${import.meta.env.BASE_URL}guesso2.png`} 
                alt="Guesso 2" 
                className="project-image"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
            <h3>Guesso</h3>
            <p>{t.project1}</p>
          </motion.div>
          <motion.div 
            className="project-item"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <motion.img 
              src={`${import.meta.env.BASE_URL}My_Meter.png`} 
              alt="Electricity Meter App" 
              className="project-image"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <h3>Electricity Meter App</h3>
            <p>{t.project3}</p>
          </motion.div>
        </div>
      </motion.section>
      <motion.section 
        className="skills-section fade-in" 
        id="skills" 
        ref={skillsRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.skills}
        </motion.h2>
        <div className="skills-lists">
          <motion.div 
            className="skills-list"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>{t.softSkills}</h3>
            <ul>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <FaUsers style={{ marginRight: 8 }} />{t.teamwork}
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <FaLightbulb style={{ marginRight: 8 }} />{t.creativity}
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <FaUsers style={{ marginRight: 8 }} />{t.englishFluent}
              </motion.li>
            </ul>
          </motion.div>
          <motion.div 
            className="skills-list"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>{t.techSkills}</h3>
            <ul>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.05, x: -10 }}
              >
                <FaHtml5 style={{ marginRight: 8 }} />{t.htmlcss}
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ scale: 1.05, x: -10 }}
              >
                <FaPython style={{ marginRight: 8 }} />{t.python}
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ scale: 1.05, x: -10 }}
              >
                <FaMobileAlt style={{ marginRight: 8 }} />{t.flutter}
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                whileHover={{ scale: 1.05, x: -10 }}
              >
                <FaHeadphones style={{ marginRight: 8 }} />{t.audioEng}
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ scale: 1.05, x: -10 }}
              >
                <FaMusic style={{ marginRight: 8 }} />{t.musicProd}
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                whileHover={{ scale: 1.05, x: -10 }}
              >
                <FaSlidersH style={{ marginRight: 8 }} />{t.mixing}
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </motion.section>
      <motion.section 
        className="contact-section fade-in" 
        id="contact" 
        ref={contactRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t.contact}
        </motion.h2>
        <motion.form 
          ref={formRef} 
          onSubmit={sendEmail} 
          className="contact-form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.input 
            type="text" 
            name="user_name" 
            placeholder={t.yourName} 
            required 
            className="form-input"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <motion.input 
            type="email" 
            name="user_email" 
            placeholder={t.yourEmail} 
            required 
            className="form-input"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <motion.textarea 
            name="message" 
            placeholder={t.yourMessage} 
            required 
            className="form-textarea"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <motion.button 
            type="submit" 
            className="form-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.send}
          </motion.button>
        </motion.form>
        {sent && (
          <motion.p 
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {t.sent}
          </motion.p>
        )}
        {error && (
          <motion.p 
            className="error-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
        <motion.ul 
          className="contact-list"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {t.email}: <a href="mailto:ebrahemaltbeb@gmail.com">ebrahemaltbeb@gmail.com</a>
          </motion.li>
          {lang === 'en' ? (
            window.innerWidth < 800 ? (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                {t.phone}: <a href="tel:+218914540082">+218 914540082</a>
              </motion.li>
            ) : (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                {t.phone}: +218 914540082
              </motion.li>
            )
          ) : (
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {t.phone}: <span dir="ltr">+218 914540082</span>
            </motion.li>
          )}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            {t.location}: {t.tripoli}
          </motion.li>
        </motion.ul>
      </motion.section>
      <motion.footer 
        className="footer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-socials">
          <motion.a 
            href="https://linkedin.com/in/ebrahim-altbeb-a4b7b0230" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            whileHover={{ scale: 1.3, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a 
            href="https://www.facebook.com/Hemoxmusic" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook"
            whileHover={{ scale: 1.3, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FaFacebook />
          </motion.a>
          <motion.a 
            href="https://www.instagram.com/hraa.wav/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram"
            whileHover={{ scale: 1.3, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FaInstagram />
          </motion.a>
          <motion.a 
            href="https://soundcloud.com/hemoxmusic" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="SoundCloud"
            whileHover={{ scale: 1.3, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FaSoundcloud />
          </motion.a>
        </div>
        <motion.div 
          className="footer-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          &copy; 2025 Ebrahim Altabib All rights reserved.
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default Home; 