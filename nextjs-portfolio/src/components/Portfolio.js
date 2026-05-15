'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar     from './Navbar';
import Hero       from './Hero';
import Skills     from './Skills';
import Experience from './Experience';
import Projects   from './Projects';
import Contact    from './Contact';
import Footer     from './Footer';

const SECTIONS = ['home', 'skills', 'experience', 'projects', 'contact'];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const observerRef = useRef(null);

  // Scroll-spy
  useEffect(() => {
    const onScroll = () => {
      const current = SECTIONS.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 120 && bottom >= 120;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate-on-scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar activeSection={activeSection} />
      <main id="main-content">
        <Hero        scrollTo={scrollTo} />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
