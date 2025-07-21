import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const SERVICE_ID = 'your_service_id'; // TODO: Replace with your EmailJS service ID
const TEMPLATE_ID = 'your_template_id'; // TODO: Replace with your EmailJS template ID
const USER_ID = 'your_user_id'; // TODO: Replace with your EmailJS user/public key

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSent(false);
    if (!form.current) return;
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
      .then(() => setSent(true))
      .catch(() => setError('Failed to send message. Please try again.'));
  };

  return (
    <section className="contact-section">
      <h2>Contact Me</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="user_name" placeholder="Your Name" required className="form-input" />
        <input type="email" name="user_email" placeholder="Your Email" required className="form-input" />
        <textarea name="message" placeholder="Your Message" required className="form-textarea" />
        <button type="submit" className="form-button">Send Message</button>
      </form>
      {sent && <p className="success-message">Message sent successfully!</p>}
      {error && <p className="error-message">{error}</p>}
      <ul className="contact-list">
        <li>Email: <a href="mailto:ebrahemaltbeb@gmail.com">ebrahemaltbeb@gmail.com</a></li>
        <li>Phone: <a href="tel:0914540082">0914540082</a></li>
        <li>Location: Tripoli, Libya</li>
      </ul>
    </section>
  );
};

export default Contact; 