'use client';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { STATS } from '@/lib/data';
import TechOrbit from './TechOrbit';
import styles from './Hero.module.css';

const TAGS = ['Generative AI', 'LLMs', 'Computer Vision', 'MLOps', 'Data Science'];

export default function Hero({ scrollTo }) {
  return (
    <section id="home" className={styles.section} aria-label="Introduction">
      {/* Canvas cursor effect is now global (layout.js) */}
      <div className={styles.container}>

        {/* ── Left column ── */}
        <div className={`${styles.left} animate-on-scroll`}>

          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for new projects
          </div>

          <h1 className={styles.heading}>
            AI / ML Engineer<br />
            <span className="text-gradient">&amp; Developer</span>
          </h1>

          <p className={styles.sub}>
            I build intelligent systems using Generative AI, Machine Learning, and
            full-stack engineering — turning complex research into production-ready solutions.
          </p>

          {/* Specialisations */}
          <div className={styles.tagRow}>
            {TAGS.map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className={styles.ctaRow}>
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              Get In Touch <ArrowRight size={16} />
            </button>
            <a
              className="btn-ghost"
              href="https://github.com/Krishsharmacse?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon size={16} /> GitHub
            </a>
          </div>

          {/* Contact strip */}
          <div className={styles.contactRow}>
            <a href="mailto:krishsharma1062@gmail.com" className={styles.contactItem}>
              <Mail size={13} /> krishsharma1062@gmail.com
            </a>
            <span className={styles.contactItem}>
              <MapPin size={13} /> New Delhi, India
            </span>
            <a href="https://www.linkedin.com/in/krish-sharma-212325282/" target="_blank" rel="noreferrer" className={styles.contactItem}>
              <LinkedinIcon size={13} /> LinkedIn
            </a>
          </div>
        </div>

        {/* ── Right column — Orbital tech animation ── */}
        <div className={`${styles.right} animate-on-scroll`} style={{ transitionDelay: '0.1s' }}>

          {/* Orbital animation */}
          <TechOrbit />

          {/* Quick Stats */}
          <div className={styles.statsRow}>
            {STATS.map(s => (
              <div key={s.label} className={styles.statCard}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className={`${styles.scrollHint} bounce-y`} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
