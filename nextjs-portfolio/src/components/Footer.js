import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.mark}>KS</div>
          <div>
            <div className={styles.name}>Krish Sharma</div>
            <div className={styles.role}>AI / ML Engineer</div>
          </div>
        </div>

        <nav className={styles.links} aria-label="Footer social links">
          <a href="https://github.com/Krishsharmacse" target="_blank" rel="noreferrer" className={styles.icon} aria-label="GitHub">
            <GithubIcon size={16} />
          </a>
          <a href="https://www.linkedin.com/in/krish-sharma-212325282/" target="_blank" rel="noreferrer" className={styles.icon} aria-label="LinkedIn">
            <LinkedinIcon size={16} />
          </a>
          <a href="mailto:krishsharma1062@gmail.com" className={styles.icon} aria-label="Email">
            <Mail size={16} />
          </a>
        </nav>

        <p className={styles.copy}>© {year} Krish Sharma</p>
      </div>
    </footer>
  );
}
