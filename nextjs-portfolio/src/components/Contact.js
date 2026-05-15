'use client';
import { useState } from 'react';
import { Send, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';
import styles from './Contact.module.css';

const MAX_MSG = 3000;

export default function Contact() {
  const [status,  setStatus]  = useState('idle');
  const [errors,  setErrors]  = useState({});
  const [msgLen,  setMsgLen]  = useState(0);

  const validate = (data) => {
    const e = {};
    if (!data.name.trim() || data.name.trim().length < 2)
      e.name = 'Name must be at least 2 characters';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = 'Please enter a valid email address';
    if (!data.message.trim() || data.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters';
    if (data.message.length > MAX_MSG)
      e.message = `Message is too long (max ${MAX_MSG} characters)`;
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      name:      fd.get('name')     || '',
      email:     fd.get('email')    || '',
      message:   fd.get('message')  || '',
      honeypot:  fd.get('website')  || '', // hidden anti-spam field
    };

    const errs = validate(data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('sent');
        e.target.reset();
        setMsgLen(0);
        setTimeout(() => setStatus('idle'), 7000);
      } else {
        setStatus('error');
        // Show server validation error if present
        if (json.error) setErrors({ _server: json.error });
        setTimeout(() => { setStatus('idle'); setErrors({}); }, 5000);
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

              {/* ── Honeypot — hidden from real users, bots fill it ── */}
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ display: 'none' }}
              />

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="c-name">Full Name</label>
                  <input
                    id="c-name" name="name" type="text"
                    className={`input ${errors.name ? styles.inputError : ''}`}
                    placeholder="John Doe" autoComplete="name"
                    maxLength={100}
                  />
                  {errors.name && <span className={styles.errMsg}>{errors.name}</span>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="c-email">Email Address</label>
                  <input
                    id="c-email" name="email" type="email"
                    className={`input ${errors.email ? styles.inputError : ''}`}
                    placeholder="john@company.com" autoComplete="email"
                    maxLength={254}
                  />
                  {errors.email && <span className={styles.errMsg}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.labelRow}>
                  <label className={styles.label} htmlFor="c-message">Message</label>
                  <span className={`${styles.charCount} ${msgLen > MAX_MSG * 0.9 ? styles.charCountWarn : ''}`}>
                    {msgLen}/{MAX_MSG}
                  </span>
                </div>
                <textarea
                  id="c-message" name="message" rows={5}
                  className={`input ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  placeholder="I'd love to discuss an AI/ML project..."
                  maxLength={MAX_MSG}
                  onChange={e => setMsgLen(e.target.value.length)}
                />
                {errors.message && <span className={styles.errMsg}>{errors.message}</span>}
              </div>

              {/* Server-side error */}
              {errors._server && (
                <p className={styles.errMsg} style={{ marginBottom: 10 }}>⚠ {errors._server}</p>
              )}

              <button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
                disabled={status === 'sending' || status === 'sent'}
              >
                {status === 'idle'    && <><Send size={16} /> Send Message</>}
                {status === 'sending' && <><Spinner /> Sending…</>}
                {status === 'sent'    && <><Check /> Message sent — I&apos;ll reply soon!</>}
                {status === 'error'   && <><X /> Failed — try the direct email above</>}
              </button>

              {status === 'sent' && (
                <p className={styles.successNote}>
                  ✓ Your message has been delivered. Expect a reply within 24 hours.
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
const Check   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const X       = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
