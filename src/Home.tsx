import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_gaa2g34'; // Your provided Service ID
const TEMPLATE_ID = 'template_7r1akcf'; // <-- Replace with your actual Template ID
const USER_ID = 'EqkZlke0AIT3ktEUE'; // <-- Replace with your actual User ID (public key)

interface HomeProps {
  lang?: 'en' | 'ar';
}

const translations = {
  en: {
    name: 'Ebrahim Altabib',
    role: 'Web Designer & Developer',
    intro1: 'Welcome to my portfolio!',
    intro2: 'I design and develop websites, mobile apps, and produce audio.',
    intro3: 'Explore my work and feel free to contact me.',
    projects: 'My Projects',
    project1: 'A creative project showcasing my skills in web and mobile development.',
    project2: 'Another innovative project, demonstrating advanced design and development techniques.',
    contact: 'Contact Me',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    yourMessage: 'Your Message',
    send: 'Send Message',
    sent: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    tripoli: 'Tripoli, Libya',
  },
  ar: {
    name: 'إبراهيم الطيبب',
    role: 'مصمم ومطور مواقع وبرامج موبايل',
    intro1: 'مرحباً بك في موقعي الشخصي!',
    intro2: 'أصمم وأطور مواقع إلكترونية وتطبيقات موبايل وأنتج الصوتيات.',
    intro3: 'تصفح أعمالي ولا تتردد في التواصل معي.',
    projects: 'مشاريعي',
    project1: 'مشروع إبداعي يبرز مهاراتي في تطوير الويب والموبايل.',
    project2: 'مشروع آخر مبتكر يوضح تقنيات التصميم والتطوير المتقدمة.',
    contact: 'تواصل معي',
    yourName: 'اسمك',
    yourEmail: 'بريدك الإلكتروني',
    yourMessage: 'رسالتك',
    send: 'إرسال الرسالة',
    sent: 'تم إرسال الرسالة بنجاح!',
    error: 'فشل في إرسال الرسالة. حاول مرة أخرى.',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    location: 'الموقع',
    tripoli: 'طرابلس، ليبيا',
  }
};

const Home: React.FC<HomeProps> = ({ lang = 'en' }) => {
  const t = translations[lang];
  const homeRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const profilePicRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const sections = [homeRef.current, projectsRef.current, contactRef.current, profilePicRef.current];
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
      <div className="profile-pic-container slide-fade-in" ref={profilePicRef}>
        <img src="/profile-pic.jpg" alt={t.name} className="profile-pic" />
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
            <img src="/guesso.png" alt="Project Guesso" className="project-image" />
            <h3>Guesso</h3>
            <p>{t.project1}</p>
          </div>
          <div className="project-item">
            <img src="/guesso2.png" alt="Project Guesso 2" className="project-image" />
            <h3>Guesso 2</h3>
            <p>{t.project2}</p>
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
          <li>{t.phone}: <a href="tel:0914540082">0914540082</a></li>
          <li>{t.location}: {t.tripoli}</li>
        </ul>
      </section>
    </div>
  );
};

export default Home; 