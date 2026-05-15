'use client';
import { useState, useEffect, useCallback } from 'react';
import { NAV_LINKS } from '@/lib/data';
import styles from './Navbar.module.css';

export default function Navbar({ activeSection }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={styles.inner}>
        {/* Logo */}
        <button className={styles.logo} onClick={() => scrollTo('home')} aria-label="Go to home">
          <span className={styles.logoMark}>KS</span>
          <span className={styles.logoText}>
            <span className={styles.logoName}>Krish Sharma</span>
            <span className={styles.logoRole}>AI / ML Engineer</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`${styles.navBtn} ${activeSection === id ? styles.navBtnActive : ''}`}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Hire-me CTA */}
        <button className={`${styles.hireBtn} btn-primary`} onClick={() => scrollTo('contact')}>
          Hire Me
        </button>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className={`${styles.drawer} fade-in`} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`${styles.drawerBtn} ${activeSection === id ? styles.drawerBtnActive : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
