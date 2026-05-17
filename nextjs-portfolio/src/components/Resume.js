'use client';
import { FileText, Download, ExternalLink } from 'lucide-react';
import styles from './Resume.module.css';

const RESUME_PATH = '/projects/Krish_Sharma_Resume.pdf';

const HIGHLIGHTS = [
  { label: 'B.Tech CSE',          value: 'University School of Information, Communication and Technology · 2024–2027' },
  { label: 'AI Intern',           value: 'Prodigal AI · Jan–Apr 2026' },
  { label: 'AI Research Intern',  value: 'Coding Jr · Jun–Sep 2025' },
  { label: 'Top Skills',          value: 'LangChain · PyTorch · TensorFlow · FastAPI' },
  { label: 'Projects Shipped',    value: '10+ end-to-end AI / full-stack products' },
  { label: 'Certifications',      value: 'Certified Generative AI Professional (Oracle), Data Science Essentials with Python (Cisco)' },
];

export default function Resume() {
  return (
    <section id="resume" className={styles.section} aria-label="Resume">
      <div className={styles.container}>

        {/* ── Section header ── */}
        <div className={`${styles.header} animate-on-scroll`}>
          <p className="section-label"><FileText size={12} /> My Resume</p>
          <h2 className="section-title">
            Download My <span className="text-gradient">CV</span>
          </h2>
          <p className={styles.subtitle}>
            A snapshot of my education, experience, and the projects I&apos;ve shipped.
          </p>
        </div>

        {/* ── Main card ── */}
        <div className={`${styles.card} animate-on-scroll`}>

          {/* Left: decorative PDF thumbnail */}
          <div className={styles.thumbWrap} aria-hidden="true">
            <div className={styles.thumb}>
              <div className={styles.thumbLines}>
                {[80, 60, 90, 50, 70, 40, 85].map((w, i) => (
                  <div key={i} className={styles.thumbLine} style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className={styles.thumbBadge}>
                <FileText size={20} />
                <span>PDF</span>
              </div>
            </div>
          </div>

          {/* Right: info + actions */}
          <div className={styles.info}>
            <h3 className={styles.name}>Krish Sharma</h3>
            <p className={styles.role}>AI / ML Engineer</p>

            <ul className={styles.highlights}>
              {HIGHLIGHTS.map(({ label, value }) => (
                <li key={label} className={styles.highlight}>
                  <span className={styles.hlLabel}>{label}</span>
                  <span className={styles.hlValue}>{value}</span>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className={styles.actions}>
              <a
                href={RESUME_PATH}
                download="Krish_Sharma_Resume.pdf"
                className={`${styles.btnDownload} btn-primary`}
                id="resume-download-btn"
              >
                <Download size={16} />
                Download Resume
              </a>

              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnView}
                id="resume-open-btn"
              >
                <ExternalLink size={15} />
                Open in Tab
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
