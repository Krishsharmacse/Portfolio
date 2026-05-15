// ─── All static data for the portfolio ───────────────────────────────────────

export const NAV_LINKS = [
  { id: 'home',       label: 'Home' },
  { id: 'skills',     label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'contact',    label: 'Contact' },
];

export const SKILL_GROUPS = [
  {
    title: 'Machine Learning',
    color: 'blue',
    skills: ['Scikit-learn','XGBoost','Linear Regression','Decision Trees','Random Forest','SVM','K-Means','PCA'],
  },
  {
    title: 'Deep Learning',
    color: 'purple',
    skills: ['PyTorch','TensorFlow','Keras','OpenCV','CNNs','RNNs','LSTMs','Transformers','ANNs'],
  },
  {
    title: 'Generative AI',
    color: 'pink',
    skills: ['LangChain','Hugging Face','Ollama','Fine-Tuning','PEFT/LoRA','RAG','LLMs','Prompt Engineering','NLP'],
  },
  {
    title: 'Agentic AI',
    color: 'violet',
    skills: ['LangGraph','CrewAI','AutoGen','LangChain Agents','Tool Use','Multi-Agent Systems','ReAct','Memory Systems','Function Calling'],
  },
  {
    title: 'Data Science',
    color: 'teal',
    skills: ['Pandas','NumPy','Matplotlib','Seaborn','Statistics','EDA','Hypothesis Testing','Data Wrangling'],
  },
  {
    title: 'Backend & APIs',
    color: 'orange',
    skills: ['FastAPI','Flask','Express.js','Node.js','REST API'],
  },
  {
    title: 'Databases & Vector Stores',
    color: 'yellow',
    skills: ['PostgreSQL','MongoDB','SQL','FAISS','ChromaDB','Pinecone'],
  },
  {
    title: 'Programming & DevOps',
    color: 'green',
    skills: ['Python','C++','Linux','Git','GitHub','Bash','Docker'],
  },
];

export const EXPERIENCES = [
  {
    role: 'AI Intern',
    company: 'Prodigal AI',
    period: 'Jan 2026 – Apr 2026 · 4 months',
    description: 'Developed AI-driven automation solutions and machine learning pipelines as part of a remote internship programme, working on production AI systems.',
    color: 'purple',
    type: 'Internship · Remote',
  },
  {
    role: 'AI Research Intern',
    company: 'Coding Jr',
    period: 'Jun 2025 – Sep 2025 · 4 months',
    description: 'Conducted applied AI research with a focus on Transformers, Generative AI, and large language models in a full-time remote capacity.',
    color: 'teal',
    type: 'Full-time · Remote',
  },
  {
    role: 'AI/ML Intern',
    company: 'CodSoft',
    period: 'Jan 2025 – Feb 2025',
    description: 'Built core ML models including fake news detection, churn prediction, and recommendation systems.',
    color: 'blue',
  },
  {
    role: 'Intern',
    company: 'Delhi Transco Limited',
    period: 'Jun 2023 – Jul 2023',
    description: 'Analysed electrical grid data systems and contributed to operational workflow optimisations.',
    color: 'amber',
  },
  {
    role: 'Summer Trainee',
    company: 'Mercedes-Benz',
    period: 'Feb 2023 – Apr 2023',
    description: 'Gained hands-on experience with automotive engineering systems and manufacturing best practices.',
    color: 'pink',
  },
];

export const PROJECTS = [
  {
    title: 'PrintX — Campus Print Service',
    description: 'Full-stack campus printing platform enabling students to upload documents, configure print settings, and get fast high-quality prints. Features secure file upload, order history, and real-time status.',
    tags: ['Next.js','Node.js','MongoDB','PDF Processing','Full-Stack'],
    link: 'https://printx.qskip.in/',
    color: 'violet',
    image: '/projects/printx-new.png',
  },
  {
    title: 'JalShakti — Rainwater Harvesting AI',
    description: 'AI-powered water conservation platform that transforms rooftops into rainwater harvesting systems. Provides intelligent potential estimates, AI-powered recommendations, and connects users to sustainable water solutions.',
    tags: ['AI','Next.js','Environmental Tech','Vercel'],
    link: 'https://rtrwh-mu.vercel.app',
    color: 'green',
    image: '/projects/jalshakti-new.png',
  },
  {
    title: 'Deepfake Detection System',
    description: 'Advanced multimodal architecture using YOLOv8 & MTCNN for visual analysis and WaveLM for audio verification — achieving state-of-the-art detection accuracy.',
    tags: ['Multimodal','YOLOv8','WaveLM','CNN+BiLSTM','MTCNN'],
    link: 'https://github.com/Krishsharmacse/DeepFake-Detection-System',
    color: 'purple',
    image: '/projects/deepfake.png',
    imgStyle: 'square',
  },
  {
    title: 'AI Resume Analyzer',
    description: 'AI-powered career coach (CareerPrep Pro) that evaluates resumes using embedding-based semantic search and ATS scoring, providing personalised feedback with actionable insights.',
    tags: ['LLMs','Transformers','Cosine Similarity','ATS'],
    link: 'https://github.com/Krishsharmacse/AI-COACH',
    color: 'blue',
    image: '/projects/resume.png',
    imgStyle: 'square',
  },
  {
    title: 'Brain Tumour Detection',
    description: 'CNN-based MRI scan classifier (NeuroscanAI) achieving 92% accuracy in tumour detection with nearby hospital location finder — supporting medical diagnostics with deep learning.',
    tags: ['CNN','Deep Learning','Healthcare AI'],
    link: 'https://github.com/Krishsharmacse/Brain-Tumour-Detector',
    color: 'red',
    image: '/projects/brain-tumour.png',
    imgStyle: 'square',
  },
  {
    title: 'Healthcare Chatbot',
    description: 'Medical assistant using RAG architecture with Pinecone vector DB and Google Gemini for accurate, context-aware healthcare insights.',
    tags: ['RAG','Pinecone','Gemini API','NLP'],
    link: 'https://github.com/Krishsharmacse/Healthcare-Chatbot',
    color: 'teal',
  },
  {
    title: 'Fake News Detection',
    description: 'Multi-agent LangGraph pipeline using NLP and ensemble classifiers to verify news claims across text, audio, and video modalities with real-time analysis.',
    tags: ['LangGraph','NLP','Agents','Multi-modal'],
    link: null,
    color: 'orange',
    image: '/projects/fakenews.png',
  },
];

export const STATS = [
  { value: '15+', label: 'Tech Stacks' },
  { value: '10+', label: 'Projects' },
  { value: '5+',  label: 'Internships' },
];

// Icon URLs helper — covers every skill in SKILL_GROUPS
export function getTechIconUrl(name) {
  const SK = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg';
  const PT = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg';
  const TF = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg';
  const HF = 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg';
  const PD = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg';
  const FP = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg';
  const LC = 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4';

  const map = {
    // ── Programming languages
    'python':             'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'c++':                'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    // ── Deep Learning frameworks
    'pytorch':            PT,
    'tensorflow':         TF,
    'keras':              'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg',
    'opencv':             'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
    // ── DL architectures → map to framework icons
    'cnns':               PT,
    'rnns':               PT,
    'lstms':              PT,
    'anns':               TF,
    'transformers':       HF,
    // ── ML (scikit-learn family)
    'scikit-learn':       SK,
    'xgboost':            'https://upload.wikimedia.org/wikipedia/commons/6/69/XGBoost_logo.png',
    'linear regression':  SK,
    'decision trees':     SK,
    'random forest':      SK,
    'svm':                SK,
    'k-means':            SK,
    'pca':                SK,
    // ── Generative AI
    'langchain':          LC,
    'langgraph':          LC,
    'crewai':             'https://avatars.githubusercontent.com/u/144200068?s=200&v=4',
    'autogen':            'https://avatars.githubusercontent.com/u/124377179?s=200&v=4',
    'langchain agents':   LC,
    'tool use':           'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'multi-agent systems':LC,
    'react':              LC,
    'memory systems':     HF,
    'function calling':   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openal/openal-plain.svg',
    'hugging face':       HF,
    'ollama':             'https://ollama.com/public/ollama.png',
    'fine-tuning':        HF,
    'peft/lora':          HF,
    'rag':                LC,
    'llms':               HF,
    'prompt engineering': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openal/openal-plain.svg',
    'nlp':                HF,
    // ── Data Science
    'pandas':             PD,
    'numpy':              'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
    'matplotlib':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg',
    'seaborn':            'https://seaborn.pydata.org/_images/logo-mark-lightbg.svg',
    'statistics':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg',
    'eda':                PD,
    'hypothesis testing': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg',
    'data wrangling':     PD,
    // ── Backend & APIs
    'fastapi':            FP,
    'flask':              'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
    'express.js':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    'node.js':            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    'rest api':           FP,
    // ── Databases & Vector Stores
    'postgresql':         'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    'mongodb':            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    'sql':                'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    'faiss':              'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-plain.svg',
    'chromadb':           'https://avatars.githubusercontent.com/u/116107277?s=200&v=4',
    'pinecone':           'https://avatars.githubusercontent.com/u/54333248?s=200&v=4',
    // ── DevOps
    'linux':              'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    'git':                'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'github':             'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    'bash':               'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
    'docker':             'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  };
  return map[name.toLowerCase()] || null;
}
