'use client';
import { PROJECTS } from '@/lib/data';
import { Code, ExternalLink } from 'lucide-react';
import styles from './Projects.module.css';

const COLOR_MAP = {
  violet: { border:'rgba(124,58,237,0.3)',  tag:'rgba(124,58,237,0.1)',  text:'#a78bfa' },
  purple: { border:'rgba(124,58,237,0.25)',  tag:'rgba(124,58,237,0.1)',  text:'#a78bfa' },
  blue:   { border:'rgba(124,58,237,0.2)',   tag:'rgba(124,58,237,0.08)', text:'#a78bfa' },
  green:  { border:'rgba(5,150,105,0.25)',   tag:'rgba(5,150,105,0.1)',   text:'#34d399' },
  red:    { border:'rgba(225,29,72,0.2)',    tag:'rgba(225,29,72,0.08)',  text:'#fda4af' },
  teal:   { border:'rgba(5,150,105,0.2)',    tag:'rgba(5,150,105,0.08)',  text:'#34d399' },
  orange: { border:'rgba(234,88,12,0.2)',    tag:'rgba(234,88,12,0.08)',  text:'#fb923c' },
  amber:  { border:'rgba(217,119,6,0.2)',    tag:'rgba(217,119,6,0.08)',  text:'#fbbf24' },
  cyan:   { border:'rgba(5,150,105,0.18)',   tag:'rgba(5,150,105,0.07)',  text:'#6ee7b7' },
};

export default function Projects() {
  return (
    <section id="projects" className={styles.section} aria-label="Projects">
      <div className={styles.container}>
        <div className={`${styles.header} animate-on-scroll`}>
          <p className="section-label"><Code size={12} /> Portfolio Showcase</p>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-sub">
            Production-ready solutions across AI, ML, and systems engineering.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => {
            const c = COLOR_MAP[project.color] || COLOR_MAP.purple;
            return (
              <article
                key={i}
                className={`${styles.card} ${project.featured ? styles.featured : ''} animate-on-scroll`}
                style={{ transitionDelay:`${i * 55}ms`, borderColor: c.border }}
              >
                {/* Screenshot preview */}
                {project.image && (
                  <div className={styles.imgWrap}>
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className={styles.img}
                      loading="lazy"
                      onError={e => { e.target.style.display='none'; e.target.parentNode.style.display='none'; }}
                    />
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.imgOverlay}
                        aria-label={`Open ${project.title}`}
                        style={{ '--accent-col': c.text }}
                      >
                        <ExternalLink size={18} />
                        <span>Visit Live Site</span>
                      </a>
                    )}
                  </div>
                )}

                <div className={styles.body}>
                  {project.featured && (
                    <div className={styles.featuredBadge}
                      style={{ color: c.text, border:`1px solid ${c.border}`, background: c.tag }}>
                      Featured
                    </div>
                  )}

                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>

                  <div className={styles.footer}>
                    <div className={styles.tags}>
                      {project.tags.map(t => (
                        <span key={t} className={styles.tag}
                          style={{ background: c.tag, color: c.text, border:`1px solid ${c.border}` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.link && !project.image && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className={styles.extLink} aria-label={`View ${project.title}`}>
                        <ExternalLink size={15} />
                      </a>
                    )}
                    {project.link && project.image && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className={styles.liveLink} style={{ color: c.text }}>
                        Live <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
