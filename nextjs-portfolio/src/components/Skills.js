'use client';
import { SKILL_GROUPS, getTechIconUrl } from '@/lib/data';
import styles from './Skills.module.css';

// Violet/emerald-based palette — no blues
const COLOR_MAP = {
  blue:   { border:'rgba(124,58,237,0.2)',  bg:'rgba(124,58,237,0.04)',  chip:'rgba(124,58,237,0.1)',  text:'#a78bfa' },
  violet: { border:'rgba(109,40,217,0.3)',  bg:'rgba(109,40,217,0.05)',  chip:'rgba(109,40,217,0.12)', text:'#c4b5fd' },
  purple: { border:'rgba(168,85,247,0.2)',  bg:'rgba(168,85,247,0.04)',  chip:'rgba(168,85,247,0.1)',  text:'#c4b5fd' },
  pink:   { border:'rgba(236,72,153,0.2)',  bg:'rgba(236,72,153,0.04)',  chip:'rgba(236,72,153,0.1)',  text:'#f9a8d4' },
  teal:   { border:'rgba(5,150,105,0.2)',   bg:'rgba(5,150,105,0.04)',   chip:'rgba(5,150,105,0.1)',   text:'#34d399' },
  orange: { border:'rgba(234,88,12,0.2)',   bg:'rgba(234,88,12,0.04)',   chip:'rgba(234,88,12,0.1)',   text:'#fb923c' },
  yellow: { border:'rgba(217,119,6,0.2)',   bg:'rgba(217,119,6,0.04)',   chip:'rgba(217,119,6,0.1)',   text:'#fbbf24' },
  green:  { border:'rgba(5,150,105,0.2)',   bg:'rgba(5,150,105,0.04)',   chip:'rgba(5,150,105,0.1)',   text:'#34d399' },
};

function SkillChip({ name, color }) {
  const iconUrl = getTechIconUrl(name);
  const c = COLOR_MAP[color] || COLOR_MAP.purple;
  return (
    <div
      className={styles.chip}
      style={{ background: c.chip, border: `1px solid ${c.border}`, color: c.text }}
      title={name}
    >
      {iconUrl
        ? <img src={iconUrl} alt={name} width={18} height={18} loading="lazy"
            style={{ width:18, height:18, objectFit:'contain', flexShrink:0 }} />
        : <span className={styles.chipDot} style={{ background: c.text }} />
      }
      <span className={styles.chipLabel}>{name}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section} aria-label="Skills">
      <div className={styles.container}>
        <div className={`${styles.header} animate-on-scroll`}>
          <p className="section-label">Technical Expertise</p>
          <h2 className="section-title">
            Skills &amp; <span className="text-gradient">Technologies</span>
          </h2>
          <p className="section-sub">
            A comprehensive toolkit for building production-grade AI systems and data-driven applications.
          </p>
        </div>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group, i) => {
            const c = COLOR_MAP[group.color] || COLOR_MAP.purple;
            return (
              <div
                key={group.title}
                className={`${styles.card} animate-on-scroll`}
                style={{ transitionDelay:`${i * 55}ms`, borderColor: c.border }}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{group.title}</h3>
                  <span className={styles.count} style={{ color: c.text }}>
                    {group.skills.length} skills
                  </span>
                </div>
                <div className={styles.chips}>
                  {group.skills.map(s => (
                    <SkillChip key={s} name={s} color={group.color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
