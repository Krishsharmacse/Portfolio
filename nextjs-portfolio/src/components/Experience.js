'use client';
import { EXPERIENCES } from '@/lib/data';
import { Briefcase } from 'lucide-react';
import styles from './Experience.module.css';

const COLOR_MAP = {
  blue:   'var(--violet-l)',
  green:  'var(--emerald-l)',
  purple: '#c4b5fd',
  amber:  'var(--amber-l)',
  pink:   '#f9a8d4',
};

export default function Experience() {
  return (
    <section id="experience" className={styles.section} aria-label="Experience">
      <div className={styles.container}>
        <div className={`${styles.header} animate-on-scroll`}>
          <p className="section-label"><Briefcase size={12} /> Professional Journey</p>
          <h2 className="section-title">
            Work <span className="text-gradient">Experience</span>
          </h2>
        </div>

        <div className={styles.list} role="list">
          {EXPERIENCES.map((exp, i) => {
            const accent = COLOR_MAP[exp.color] || 'var(--violet-l)';
            return (
              <div
                key={i}
                className={`${styles.item} animate-on-scroll`}
                style={{ transitionDelay: `${i * 60}ms` }}
                role="listitem"
              >
                <div className={styles.left}>
                  <div className={styles.dot} style={{ background: accent }} />
                  <div className={styles.lineSegment} aria-hidden="true" />
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <div>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <p className={styles.company} style={{ color: accent }}>{exp.company}</p>
                      {exp.type && (
                        <p className={styles.empType}>{exp.type}</p>
                      )}
                    </div>
                    <span className={styles.period}>{exp.period}</span>
                  </div>
                  <p className={styles.description}>{exp.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
