'use client';
import { useState } from 'react';
import { Send, MessageSquare, Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import styles from './Contact.module.css';

const FORM_ENDPOINT = '/api/contact';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const e = {};
    if (!data.name.trim())    e.name    = 'Name is required';
    if (!data.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Valid email required';
    if (!data.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd   = new FormData(e.target);
    const data = { name: fd.get('name'), email: fd.get('email'), message: fd.get('message') };
    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('sent');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className={styles.section} aria-label="Contact">
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} animate-on-scroll`}>
          <p className="section-label"><MessageSquare size={12} /> Get In Touch</p>
          <h2 className="section-title">
            Let&apos;s <span className="text-gradient">Build Together</span>
          </h2>
          <p className="section-sub">
            Have a project in mind? Reach out directly — I reply within 24 hours.
          </p>
        </div>

        <div className={styles.twoCol}>
          {/* Direct contact panel */}
          <div className={`${styles.infoPanel} animate-on-scroll`}>
            <h3 className={styles.infoTitle}>Direct Contact</h3>
            <p className={styles.infoSub}>Prefer to reach out directly? Use any of the channels below.</p>

            <div className={styles.contactList}>
              <a href="mailto:krishsharma1062@gmail.com" className={styles.contactRow}>
                <div className={styles.contactIcon}><Mail size={16} /></div>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactVal}>krishsharma1062@gmail.com</div>
                </div>
              </a>
              <a href="tel:+919310967404" className={styles.contactRow}>
                <div className={styles.contactIcon}><Phone size={16} /></div>
                <div>
                  <div className={styles.contactLabel}>Phone</div>
                  <div className={styles.contactVal}>+91 93109 67404</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/krish-sharma-212325282/" target="_blank" rel="noreferrer" className={styles.contactRow}>
                <div className={styles.contactIcon}><LinkedinIcon size={16} /></div>
                <div>
                  <div className={styles.contactLabel}>LinkedIn</div>
                  <div className={styles.contactVal}>krish-sharma-212325282</div>
                </div>
              </a>
              <span className={styles.contactRow}>
                <div className={styles.contactIcon}><MapPin size={16} /></div>
                <div>
                  <div className={styles.contactLabel}>Location</div>
                  <div className={styles.contactVal}>New Delhi, India</div>
                </div>
              </span>
            </div>

            <a href="mailto:krishsharma1062@gmail.com" className={`btn-primary ${styles.mailtoBtn}`}>
              <Mail size={16} /> Send Email Directly
            </a>
          </div>

          {/* Form */}
          <div className={`${styles.card} animate-on-scroll`} style={{ transitionDelay:'0.1s' }}>
            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="c-name">Full Name</label>
                  <input id="c-name" name="name" type="text" className={`input ${errors.name ? styles.inputError : ''}`} placeholder="John Doe" autoComplete="name" />
                  {errors.name && <span className={styles.errMsg}>{errors.name}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="c-email">Email Address</label>
                  <input id="c-email" name="email" type="email" className={`input ${errors.email ? styles.inputError : ''}`} placeholder="john@company.com" autoComplete="email" />
                  {errors.email && <span className={styles.errMsg}>{errors.email}</span>}
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="c-message">Message</label>
                <textarea id="c-message" name="message" rows={5} className={`input ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  placeholder="I'd love to discuss an AI/ML project..." />
                {errors.message && <span className={styles.errMsg}>{errors.message}</span>}
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={status === 'sending' || status === 'sent'}>
                {status === 'idle'    && <><Send size={16} /> Send Message</>}
                {status === 'sending' && <><Spinner /> Sending…</>}
                {status === 'sent'    && <><Check /> Message sent — I&apos;ll reply soon!</>}
                {status === 'error'   && <><X /> Failed — try the direct email above</>}
              </button>

              {status === 'sent' && (
                <p className={styles.successNote}>
                  ✓ Your message has been delivered to my inbox. Expect a reply within 24 hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const Spinner = () => <span className={styles.spinner} />;
const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const X = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
