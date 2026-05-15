'use client';
import { Brain, Sparkles, Database, Terminal } from 'lucide-react';
import { Cpu as CpuIcon } from 'lucide-react';
import styles from './TechOrbit.module.css';

const getTechIcon = (techName) => {
  const key = techName.toLowerCase().replace(/\./g, '').replace(/\s/g, '');
  const iconMap = {
    python:       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    cpp:          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    scikitlearn:  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
    pandas:       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
    numpy:        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
    pytorch:      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
    tensorflow:   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    keras:        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg',
    opencv:       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
    langchain:    'https://avatars.githubusercontent.com/u/126733545?s=200&v=4',
    huggingface:  'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    pinecone:     'https://avatars.githubusercontent.com/u/54333248?s=200&v=4',
    chromadb:     'https://avatars.githubusercontent.com/u/116107277?s=200&v=4',
    expressjs:    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    nodejs:       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    mongodb:      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    postgresql:   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    fastapi:      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    flask:        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
    ollama:       'https://ollama.com/public/ollama.png',
    docker:       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    git:          'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    linux:        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
  };
  return iconMap[key] || null;
};

const TECH_LOGOS = [
  { name: 'LangChain',   icon: getTechIcon('langchain') },
  { name: 'Ollama',      icon: getTechIcon('ollama') },
  { name: 'Python',      icon: getTechIcon('python') },
  { name: 'C++',         icon: getTechIcon('cpp') },
  { name: 'PyTorch',     icon: getTechIcon('pytorch') },
  { name: 'TensorFlow',  icon: getTechIcon('tensorflow') },
  { name: 'Scikit-learn',icon: getTechIcon('scikitlearn') },
  { name: 'Pandas',      icon: getTechIcon('pandas') },
  { name: 'NumPy',       icon: getTechIcon('numpy') },
  { name: 'Pinecone',    icon: getTechIcon('pinecone') },
  { name: 'ChromaDB',    icon: getTechIcon('chromadb') },
  { name: 'MongoDB',     icon: getTechIcon('mongodb') },
  { name: 'PostgreSQL',  icon: getTechIcon('postgresql') },
  { name: 'Node.js',     icon: getTechIcon('nodejs') },
  { name: 'Express.js',  icon: getTechIcon('expressjs') },
  { name: 'FastAPI',     icon: getTechIcon('fastapi') },
  { name: 'Flask',       icon: getTechIcon('flask') },
  { name: 'Docker',      icon: getTechIcon('docker') },
  { name: 'Git',         icon: getTechIcon('git') },
  { name: 'Linux',       icon: getTechIcon('linux') },
];

const RADIUS = 188;

export default function TechOrbit() {
  return (
    <div className={styles.wrapper}>
      {/* Animated background grid */}
      <div className={styles.grid} aria-hidden="true" />

      {/* ── Orbital ring + logos ── */}
      <div className={styles.spinRing}>
        {TECH_LOGOS.map((tech, index) => {
          const angle = (index * 360) / TECH_LOGOS.length;
          const x = RADIUS * Math.cos((angle * Math.PI) / 180);
          const y = RADIUS * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={index}
              className={styles.techAnchor}
              style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
            >
              {/* Counter-rotate so icons stay upright */}
              <div className={styles.techCounterSpin}>
                <div className={styles.techChip} title={tech.name}>
                  {tech.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={tech.icon} alt={tech.name} className={styles.techImg} />
                  ) : (
                    <span className={styles.techFallback}>{tech.name.slice(0, 3)}</span>
                  )}
                  <span className={styles.techTooltip}>{tech.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Orbital rings (decorative) ── */}
      <div className={`${styles.ring} ${styles.ring1}`} aria-hidden="true" />
      <div className={`${styles.ring} ${styles.ring2}`} aria-hidden="true" />
      <div className={`${styles.ring} ${styles.ring3}`} aria-hidden="true" />

      {/* ── Central Brain ── */}
      <div className={styles.centerGlow} aria-hidden="true" />
      <div className={styles.center}>
        <Brain className={styles.brainIcon} />
      </div>

      {/* ── Floating Particles ── */}
      {[...Array(28)].map((_, i) => (
        <div
          key={i}
          className={styles.particle}
          style={{
            left:              `${10 + Math.random() * 80}%`,
            top:               `${10 + Math.random() * 80}%`,
            width:             `${2 + Math.random() * 3}px`,
            height:            `${2 + Math.random() * 3}px`,
            animationDuration: `${3 + Math.random() * 5}s`,
            animationDelay:    `${Math.random() * 3}s`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* ── Corner labels ── */}
      <div className={`${styles.label} ${styles.labelTL}`}>
        <Sparkles size={14} />
        GenAI Tools
      </div>
      <div className={`${styles.label} ${styles.labelTR}`}>
        <CpuIcon size={14} />
        ML Frameworks
      </div>
      <div className={`${styles.label} ${styles.labelBL}`}>
        <Database size={14} />
        Databases
      </div>
      <div className={`${styles.label} ${styles.labelBR}`}>
        <Terminal size={14} />
        Backend
      </div>
    </div>
  );
}
