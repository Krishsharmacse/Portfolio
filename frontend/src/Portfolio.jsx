  import React, { useState, useEffect, useRef } from 'react';
  import { initializeApp } from "firebase/app";
  import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
  import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
  import { 
    Github, 
    Linkedin, 
    Mail, 
    Phone, 
    MapPin, 
    Code, 
    Brain, 
    Database, 
    Cpu, 
    Terminal, 
    ExternalLink, 
    ChevronDown,
    Award,
    BookOpen,
    Briefcase,
    Trophy,
    Send,
    MessageSquare,
    Layers,
    Server,
    Globe,
    GitBranch,
    HardDrive,
    Sparkles,
    Zap,
    Target,
    Shield,
    Cloud,
    Cctv,
    FileText,
    Bot,
    Network,
    BarChart3,
    Users,
    Rocket,
    Wand2,
    CircuitBoard,
    Atom,
    Cpu as CpuIcon,
    Shield as ShieldIcon,
    CloudLightning,
    Binary,
    Fingerprint,
    Activity,
    PieChart,
    icons
  } from 'lucide-react';
  import pineconeLogo from './assets/image.png'; // Make sure the path is relative to Portfolio.jsx
  import chromaLogo from './assets/Chroma.png';
  import huggingface from './assets/HuggingFace.png'
  // --- Enhanced Assets & Data Helper ---
  const getTechIcon = (techName) => {
    const normalize = (name) => name.toLowerCase().replace(/\./g, '').replace(/\s/g, '');
    const key = normalize(techName);
    
    const iconMap = {
      // Programming Languages
      python: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
      cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
      c: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
      javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      
      // ML & AI Frameworks
      scikitlearn: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
      pandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
      numpy: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
      matplotlib: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg',
      seaborn: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/seaborn/seaborn-original.svg',
      pytorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
      tensorflow: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
      keras: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg',
      opencv: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
      
      
      // GenAI & LLM Tools
      langchain: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4',
      huggingface: huggingface,
    pinecone: pineconeLogo,
    chromadb: chromaLogo,
      faiss: 'https://production-media.paperswithcode.com/methods/Screen_Shot_2020-05-27_at_2.18.46_PM.png',
    
      
      // Backend & Databases
      expressjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
      nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
      postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
      sql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
      fastapi: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
      flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
      ollama: 'https://ollama.com/public/ollama.png', // Added Ollama
      // DevOps & Tools
      docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
      kubernetes: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg',
      git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
      github: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
      linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
      bash: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
      
      // Additional
      jupyter: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',
      colab: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecolab/googlecolab-original.svg',
      aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg',
      azure: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
      gcp: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
    };

    return iconMap[key] || null;
  };

  // --- Firebase Initialization ---
  let db;
  let auth;
  let appId = 'default-app-id';

  try {
    if (typeof __firebase_config !== 'undefined') {
      const firebaseConfig = JSON.parse(__firebase_config);
      const app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      if (typeof __app_id !== 'undefined') {
        appId = __app_id;
      }
    }
  } catch (e) {
    console.log("Firebase initialized in fallback mode or not available.");
  }

  // Tech Logos Component for Hero Animation

  const TechLogosAnimation = () => {
    const techLogos = [
      // GenAI & LLM Tools
      { name: 'LangChain', icon: getTechIcon('langchain'), category: 'genai' },
      { name: 'Ollama', icon: getTechIcon('ollama'), category: 'lang' },

      // Programming Languages
      { name: 'Python', icon: getTechIcon('python'), category: 'lang' },
      { name: 'C++', icon: getTechIcon('cpp'), category: 'lang' }, 
    
      
      // ML Frameworks
      { name: 'PyTorch', icon: getTechIcon('pytorch'), category: 'ml' },
      { name: 'TensorFlow', icon: getTechIcon('tensorflow'), category: 'ml' },
      { name: 'Scikit-learn', icon: getTechIcon('scikitlearn'), category: 'ml' },
      { name: 'Pandas', icon: getTechIcon('pandas'), category: 'ml' },
      { name: 'NumPy', icon: getTechIcon('numpy'), category: 'ml' },
      
      // Vector Databases
      { name: 'Pinecone', icon: getTechIcon('pinecone'), category: 'database' },
      { name: 'ChromaDB', icon: getTechIcon('chromadb'), category: 'database' },
      
      // Databases
      { name: 'MongoDB', icon: getTechIcon('mongodb'), category: 'database' },
      { name: 'PostgreSQL', icon: getTechIcon('postgresql'), category: 'database' },
      
      // Backend
      { name: 'Node.js', icon: getTechIcon('nodejs'), category: 'backend' },
      { name: 'Express.js', icon: getTechIcon('expressjs'), category: 'backend' },
      { name: 'FastAPI', icon: getTechIcon('fastapi'), category: 'backend' },
      { name: 'Flask', icon: getTechIcon('flask'), category: 'backend' },
      
      // DevOps
      { name: 'Docker', icon: getTechIcon('docker'), category: 'devops' },
      { name: 'Git', icon: getTechIcon('git'), category: 'devops' },
      { name: 'Linux', icon: getTechIcon('linux'), category: 'devops' },
    ];

    return (
      <div className="relative w-full h-[400px] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 p-8">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Orbital System */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          {/* Central Brain Icon */}
          <div className="relative">
            <div className="absolute -inset-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl shadow-2xl shadow-blue-500/30 animate-spin-slow">
              <Brain className="w-12 h-12 text-white" />
            </div>
            
            {/* Orbital Rings - Visual Only */}
            <div className="absolute -inset-24 border-2 border-blue-500/20 rounded-full animate-spin-slow" />
            <div className="absolute -inset-36 border-2 border-purple-500/20 rounded-full animate-spin-reverse-slow" />
            <div className="absolute -inset-48 border-2 border-pink-500/20 rounded-full animate-spin-slower" />
          </div>
        </div>

        {/* Rotating Tech Ring Container */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px]"
            style={{ animation: 'spin-slow 30s linear infinite' }}>
          {techLogos.map((tech, index) => {
            const angle = (index * 360) / techLogos.length;
            // Calculate position on the circle (radius = 180px)
            const radius = 180;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
              >
                {/* Counter-rotate the icon so it stays upright */}
                <div style={{ animation: 'spin-reverse-slow 30s linear infinite' }}>
                  <div className="group relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-3 w-16 h-16 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-300 shadow-lg">
                      {tech.icon ? (
                        <img 
                          src={tech.icon} 
                          alt={tech.name} 
                          className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-xs font-bold text-gray-400">{tech.name.substring(0, 3)}</div>
                      )}
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
                      {tech.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
          />
        ))}

        {/* Category Labels */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-blue-400">GenAI Tools</span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <CpuIcon className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-purple-400">ML Frameworks</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <Database className="w-4 h-4 text-green-400" />
            <span className="text-xs font-medium text-green-400">Databases</span>
          </div>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
            <Terminal className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-medium text-yellow-400">Backend</span>
          </div>
        </div>
      </div>
    );
  };

  const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [formStatus, setFormStatus] = useState('idle');
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
        
        const sections = ['home', 'skills', 'experience', 'projects', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        if (current) setActiveSection(current);
      };
      
      window.addEventListener('scroll', handleScroll);
      
      // Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-visible');
            }
          });
        },
        { threshold: 0.1 }
      );
      
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
      
      // Auth Init
      if (auth) {
        const initAuth = async () => {
          if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
          } else {
            await signInAnonymously(auth);
          }
        };
        initAuth();
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => {
          window.removeEventListener('scroll', handleScroll);
          observer.disconnect();
          unsubscribe();
        };
      }

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const scrollToSection = (id) => {
      setIsMenuOpen(false);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }
    };
  const handleContactSubmit = async (e) => {
      e.preventDefault();
      setFormStatus("sending");

      const formData = new FormData(e.target);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      };

      try {
        // This connects directly to your Node.js server
        const res = await fetch("http://backend:5000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (result.success) {
          setFormStatus("sent");
          e.target.reset();
          setTimeout(() => setFormStatus('idle'), 3000);
        } else {
          setFormStatus("error");
          setTimeout(() => setFormStatus('idle'), 3000);
        }
      } catch (err) {
        console.error("Connection Error:", err);
        setFormStatus("error");
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    };

    const NavLink = ({ id, icon: Icon, label }) => (
      <button
        onClick={() => scrollToSection(id)}
        className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 group ${
          activeSection === id 
            ? 'text-white' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity ${
          activeSection === id ? 'opacity-100' : ''
        }`} />
        <div className="relative z-10 flex items-center gap-2">
          <Icon size={16} />
          <span className="hidden md:inline">{label}</span>
          {activeSection === id && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
          )}
        </div>
      </button>
    );

    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes pulse-glow {
              0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.1), 0 0 40px rgba(59, 130, 246, 0.05); }
              50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1); }
            }
            @keyframes gradient-flow {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes orbit {
              0% { transform: translate(calc(var(--offset-x, 0px) + 0px), calc(var(--offset-y, 0px) + 0px)) rotate(0deg); }
              100% { transform: translate(calc(var(--offset-x, 0px) + 0px), calc(var(--offset-y, 0px) + 0px)) rotate(360deg); }
            }
            @keyframes float-particle {
              0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
              50% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes spin-reverse-slow {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            @keyframes spin-slower {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes typing {
              from { width: 0 }
              to { width: 100% }
            }
            @keyframes blink-caret {
              from, to { border-color: transparent }
              50% { border-color: #60a5fa }
            }
            
            .animate-float { animation: float 8s ease-in-out infinite; }
            .animate-gradient { 
              background-size: 200% 200%;
              animation: gradient-flow 8s ease infinite;
            }
            .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
            .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
            .animate-on-scroll { opacity: 0; transform: translateY(20px); transition: all 0.6s ease-out; }
            .animate-on-scroll.animate-visible { opacity: 1; transform: translateY(0); }
            .animate-spin-slow { animation: spin-slow 20s linear infinite; }
            .animate-spin-reverse-slow { animation: spin-reverse-slow 25s linear infinite; }
            .animate-spin-slower { animation: spin-slower 30s linear infinite; }
            .animate-typing { 
              overflow: hidden;
              white-space: nowrap;
              animation: typing 3.5s steps(40, end);
            }
            .animate-blink { 
              border-right: 3px solid #60a5fa;
              animation: blink-caret 0.75s step-end infinite;
            }
            
            .glass-card { 
              background: linear-gradient(135deg, rgba(17, 24, 39, 0.7) 0%, rgba(17, 24, 39, 0.4) 100%);
              backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .gradient-border {
              position: relative;
              background: linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.7)) padding-box,
                        linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899) border-box;
              border: 2px solid transparent;
            }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .text-gradient {
              background: linear-gradient(135deg, #60a5fa, #8b5cf6, #ec4899);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              background-size: 200% auto;
              animation: gradient-flow 4s ease infinite;
            }
            
            /* Enhanced particle effects */
            .particle {
              position: absolute;
              border-radius: 50%;
              pointer-events: none;
            }
          `}
        </style>

        {/* Animated Background Particles */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '139, 92, 246'}, ${0.2 + Math.random() * 0.3})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particle ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-gray-950/90 backdrop-blur-xl py-3 border-b border-gray-800/50' : 'bg-transparent py-5'
        }`}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="group relative flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-xl group-hover:rotate-12 transition-all duration-300 group-hover:shadow-blue-500/30">
                  KS
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  Krish Sharma
                </div>
                <div className="text-xs text-gray-500 group-hover:text-blue-400 transition-colors">
                  AI/ML Engineer
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-gray-900/50 backdrop-blur-sm rounded-full p-1 border border-gray-800">
              <NavLink id="home" icon={Rocket} label="Home" />
              <NavLink id="skills" icon={Cpu} label="Skills" />
              <NavLink id="experience" icon={Briefcase} label="Experience" />
              <NavLink id="projects" icon={Code} label="Projects" />
              <NavLink id="contact" icon={Mail} label="Contact" />
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-gray-900/50 border border-gray-800"
            >
              <div className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <div className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-xl border-t border-gray-800 animate-fade-in">
              <div className="flex flex-col p-4 gap-2">
                {['home', 'skills', 'experience', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeSection === section
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
                    }`}
                  >
                    {section === 'home' && <Rocket size={20} />}
                    {section === 'skills' && <Brain size={20} />}
                    {section === 'experience' && <Briefcase size={20} />}
                    {section === 'projects' && <Code size={20} />}
                    {section === 'contact' && <Mail size={20} />}
                    <span className="capitalize font-medium">{section}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Enhanced Hero Section */}
        <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950/90 to-blue-950/20 -z-10" />
          
          {/* Animated gradient background */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent -z-10" />
          
          <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <div className="lg:w-1/2 animate-on-scroll">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-slide-up">
                  <Sparkles size={16} />
                  <span className="animate-pulse">AI/ML Engineer & Developer</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="block mb-2">Building The</span>
                  <span className="text-gradient relative">
                    Future With AI
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  </span>
                </h1>
                
                <div className="mb-8">
                  <p className="text-xl text-gray-400 mb-6 leading-relaxed max-w-2xl">
                    Transforming complex problems into intelligent solutions using 
                    <span className="text-blue-400 font-medium"> Generative AI</span>, 
                    <span className="text-purple-400 font-medium"> Machine Learning</span>, and 
                    <span className="text-pink-400 font-medium"> Data Science</span>.
                  </p>
                  
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>Available for projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span>Open to opportunities</span>
                    </div>
                  </div>
                </div>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {['Generative AI', 'Large Language Models', 'Computer Vision', 'MLOps', 'Data Science'].map((tag, i) => (
                    <div 
                      key={i}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-800 text-gray-300 text-sm font-medium hover:border-blue-500/50 hover:text-white transition-all duration-300 hover:scale-105 cursor-default group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      <span className="relative">{tag}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative flex items-center gap-2">
                      <Mail size={20} />
                      Get In Touch
                    </span>
                  </button>
                  <a 
                    href="https://github.com/Krishsharmacse?tab=repositories" 
                    target="_blank" 
                    rel="noreferrer"
                    className="group relative flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all border border-gray-700 hover:border-gray-500 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <Github size={20} />
                    View GitHub
                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              {/* Right Content - Tech Animation */}
              <div className="lg:w-1/2 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                <TechLogosAnimation />
                
                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="glass-card p-4 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-colors">
                    <div className="text-2xl font-bold text-white mb-1">15+</div>
                    <div className="text-xs text-gray-400">Tech Stacks</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-colors">
                    <div className="text-2xl font-bold text-white mb-1">10+</div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </div>
                  <div className="glass-card p-4 rounded-xl border border-gray-800 hover:border-pink-500/30 transition-colors">
                    <div className="text-2xl font-bold text-white mb-1">5+</div>
                    <div className="text-xs text-gray-400">Internships</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap justify-center gap-6 text-gray-400">
                <a href="mailto:krishsharma1062@gmail.com" className="flex items-center gap-3 group hover:text-white transition-colors">
                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Mail size={18} className="text-blue-400" />
                  </div>
                  krishsharma1062@gmail.com
                </a>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Phone size={18} className="text-purple-400" />
                  </div>
                  +91 9310967404
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <MapPin size={18} className="text-green-400" />
                  </div>
                  New Delhi, India
                </div>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="https://github.com/Krishsharmacse" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-800 hover:border-gray-700 transition-all hover:scale-110"
                >
                  <Github size={20} className="text-gray-400 hover:text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/krish-sharma-212325282/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-blue-900/20 hover:border-blue-500/50 transition-all hover:scale-110"
                >
                  <Linkedin size={20} className="text-gray-400 hover:text-blue-400" />
                </a>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-sm text-gray-500">Explore More</span>
              <ChevronDown className="text-gray-600" />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
                <Zap size={16} />
                TECHNICAL EXPERTISE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Skills & <span className="text-gradient">Technologies</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Comprehensive toolkit for building intelligent systems and data-driven solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard 
                title="Machine Learning" 
                skills={['Scikit-learn', 'Linear Regression', 'Decision Trees', 'Random Forest', 'SVM', 'K-Means', 'PCA', 'XGBoost']}
                icon={<Brain className="text-blue-400" size={28} />}
                color="blue"
                delay={0}
              />
              <SkillCard 
                title="Deep Learning" 
                skills={['CNNs', 'RNNs', 'LSTMs', 'Transformers', 'ANNs', 'PyTorch', 'TensorFlow', 'Keras', 'OpenCV']}
                icon={<Cpu className="text-purple-400" size={28} />}
                color="purple"
                delay={100}
              />
              <SkillCard 
                title="Generative AI" 
                skills={['Fine-Tuning', 'PEFT/LoRA', 'RAG', 'LLMs', 'Prompt Engineering', 'LangChain', 'Hugging Face', 'Stable Diffusion','NLP','Ollama']}
                icon={<Bot className="text-pink-400" size={28} />}
                color="pink"
                delay={200}
              />
              <SkillCard 
                title="Data Science" 
                skills={['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Statistics', 'EDA', 'Hypothesis Testing', 'Data Wrangling']}
                icon={<PieChart className="text-teal-400" size={28} />}
                color="teal"
                delay={300}
              />
              <SkillCard 
                title="Backend Development" 
                skills={['Express.js', 'Node.js', 'FastAPI', 'Flask', 'REST API']}
                icon={<Server className="text-orange-400" size={28} />}
                color="orange"
                delay={400}
              />
              <SkillCard 
                title="Databases & Vector Stores" 
                skills={['SQL', 'PostgreSQL', 'MongoDB', 'FAISS', 'ChromaDB', 'Pinecone']}
                icon={<Database className="text-yellow-400" size={28} />}
                color="yellow"
                delay={500}
              />
              <SkillCard 
                title="Programming & Tools" 
                skills={['Python', 'C++', 'Linux', 'Git', 'GitHub', 'Bash', 'Docker']}
                icon={<Terminal className="text-green-400" size={28} />}
                color="green"
                delay={600}
              />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 bg-gray-900/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
                <Briefcase size={16} />
                PROFESSIONAL JOURNEY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Experience & <span className="text-gradient">Timeline</span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent" />
              
              <div className="space-y-8">
                <TimelineItem 
                  role="AI/ML Intern" 
                  company="IBM" 
                  date="July 2025 - August 2025"
                  description="Developed enterprise AI solutions and optimized machine learning pipelines for large-scale applications."
                  icon={<Brain size={20} />}
                  color="blue"
                  side="left"
                />
                <TimelineItem 
                  role="Trainee - AI/ML" 
                  company="Shell" 
                  date="Jun 2025 - Jul 2025"
                  description="Implemented data-driven techniques for industrial energy optimization and predictive maintenance."
                  icon={<BarChart3 size={20} />}
                  color="green"
                  side="right"
                />
                <TimelineItem 
                  role="AI/ML Intern" 
                  company="CodSoft" 
                  date="Jan 2025 - Feb 2025"
                  description="Built core ML models including fake news detection, churn prediction, and recommendation systems."
                  icon={<Code size={20} />}
                  color="purple"
                  side="left"
                />
                <TimelineItem 
                  role="Intern" 
                  company="Delhi Transco Limited" 
                  date="Jun 2023 - Jul 2023"
                  description="Analyzed electrical grid data systems and contributed to operational workflow optimizations."
                  icon={<Cctv size={20} />}
                  color="yellow"
                  side="right"
                />
                <TimelineItem 
                  role="Summer Trainee" 
                  company="Mercedes Benz" 
                  date="Feb 2023 - Apr 2023"
                  description="Gained hands-on experience with automotive systems and engineering best practices."
                  icon={<Target size={20} />}
                  color="pink"
                  side="left"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
                <Code size={16} />
                PORTFOLIO SHOWCASE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Innovative solutions combining AI, ML, and cutting-edge technologies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard 
                title="Deepfake Detection System"
                tags={['Multimodal', 'YOLOv8', 'WaveLM', 'CNN+BiLSTM', 'MTCNN']}
                description="Advanced multimodal architecture using YOLOv8 & MTCNN for visual analysis and WaveLM for audio verification."
                featured={true}
                link="https://github.com/Krishsharmacse/DeepFake-Detection-System"
                icon={<Shield className="text-purple-400" size={24} />}
                delay={0}
              />
              <ProjectCard 
                title="AI Resume Analyzer"
                tags={['LLMs', 'Transformers', 'Cosine Similarity']}
                description="AI-powered career coach that evaluates resumes using embedding-based semantic search and provides personalized feedback."
                link="https://github.com/Krishsharmacse/AI-COACH"
                icon={<FileText className="text-blue-400" size={24} />}
                delay={100}
              />
              <ProjectCard 
                title="Health Chatbot"
                tags={['RAG', 'Pinecone', 'Gemini API', 'NLP']}
                description="Medical assistant using RAG architecture with Pinecone vector DB and Google's Gemini for accurate healthcare insights."
                link="https://github.com/Krishsharmacse/Healthcare-Chatbot"
                icon={<Bot className="text-green-400" size={24} />}
                delay={200}
              />
              <ProjectCard 
                title="Brain Tumor Detection"
                tags={['CNN', 'Deep Learning', 'Healthcare']}
                description="CNN-based MRI scan classifier achieving 92% accuracy in tumor detection for medical diagnostics."
                link="https://github.com/Krishsharmacse/Brain-Tumour-Detector"
                icon={<Target className="text-red-400" size={24} />}
                delay={300}
              />
              <ProjectCard 
                title="Carbon Emission Prediction"
                tags={['ML', 'Regression', 'Environmental']}
                description="Predictive model estimating CO2 emissions from industrial activities using regression algorithms."
                link="https://github.com/Krishsharmacse/EDUNET-ISHELL-INTERNSHIP-MATERIAL"
                icon={<Cloud className="text-teal-400" size={24} />}
                delay={400}
              />
              <ProjectCard 
                title="Fake News Detection"
                tags={['NLP', 'Random Forest', 'Classification']}
                description="Natural language processing system classifying news articles with high accuracy using ensemble methods."
                icon={<Network className="text-orange-400" size={24} />}
                delay={500}
              />
              <ProjectCard 
                title="IoT Home Automation"
                tags={['IoT', 'NodeMCU', 'C++']}
                description="Smart home system enabling remote appliance control through internet connectivity."
                icon={<HardDrive className="text-cyan-400" size={24} />}
                delay={600}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950 to-blue-950/20 -z-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16 animate-on-scroll">
              <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-4">
                <MessageSquare size={16} />
                GET IN TOUCH
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's <span className="text-gradient">Build Together</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Have a project in mind? Let's discuss how we can leverage AI and ML to create innovative solutions.
              </p>
            </div>
            
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl animate-on-scroll">
              <form onSubmit={handleContactSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      Your Name
                    </label>
                    <input 
                      name="name"
                      required 
                      type="text" 
                      className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      Email Address
                    </label>
                    <input 
                      name="email"
                      required 
                      type="email" 
                      className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Your Message
                  </label>
                  <textarea 
                    name="message"
                    required 
                    rows="5" 
                    className="w-full bg-gray-950/50 border border-gray-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none placeholder-gray-600"
                    placeholder="I'd like to discuss a project involving AI/ML..."
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending' || formStatus === 'sent'}
                  className="group relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold py-5 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative flex items-center justify-center gap-3 text-lg">
                    {formStatus === 'idle' && (
                      <>
                        <Send size={22} />
                        Send Message
                      </>
                    )}
                    {formStatus === 'sending' && (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    )}
                    {formStatus === 'sent' && (
                      <div className="flex items-center gap-3 text-green-300">
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        Message Sent Successfully!
                      </div>
                    )}
                    {formStatus === 'error' && (
                      <div className="flex items-center gap-3 text-red-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        Error Sending. Try Again.
                      </div>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="py-12 border-t border-gray-900 bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <div className="text-xl font-bold mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                    KS
                  </div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    Krish Sharma
                  </span>
                </div>
                <p className="text-gray-500 text-sm">AI/ML Engineer & Developer</p>
              </div>
              
              <div className="flex gap-6">
                <a href="mailto:krishsharma1062@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
                <a href="https://github.com/Krishsharmacse" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/krish-sharma-212325282/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-900 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} Krish Sharma. All rights reserved.</p>
              <p className="mt-2 flex items-center justify-center gap-2">
                Built with <span className="text-blue-400">React</span> & 
                <span className="text-cyan-400"> Tailwind CSS</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  // SkillCard Component (unchanged from previous)
  const SkillCard = ({ title, skills, icon, color, delay }) => {
    const colorClasses = {
      blue: { bg: 'from-blue-500/5 to-blue-500/0', border: 'border-blue-500/20', hover: 'hover:border-blue-500/40' },
      purple: { bg: 'from-purple-500/5 to-purple-500/0', border: 'border-purple-500/20', hover: 'hover:border-purple-500/40' },
      pink: { bg: 'from-pink-500/5 to-pink-500/0', border: 'border-pink-500/20', hover: 'hover:border-pink-500/40' },
      green: { bg: 'from-green-500/5 to-green-500/0', border: 'border-green-500/20', hover: 'hover:border-green-500/40' },
      yellow: { bg: 'from-yellow-500/5 to-yellow-500/0', border: 'border-yellow-500/20', hover: 'hover:border-yellow-500/40' },
      cyan: { bg: 'from-cyan-500/5 to-cyan-500/0', border: 'border-cyan-500/20', hover: 'hover:border-cyan-500/40' },
      teal: { bg: 'from-teal-500/5 to-teal-500/0', border: 'border-teal-500/20', hover: 'hover:border-teal-500/40' },
      orange: { bg: 'from-orange-500/5 to-orange-500/0', border: 'border-orange-500/20', hover: 'hover:border-orange-500/40' },
    };

    const tagColorClasses = {
      blue: 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20',
      purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20',
      pink: 'bg-pink-500/10 text-pink-300 border-pink-500/20 hover:bg-pink-500/20',
      green: 'bg-green-500/10 text-green-300 border-green-500/20 hover:bg-green-500/20',
      yellow: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20 hover:bg-yellow-500/20',
      cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20',
      teal: 'bg-teal-500/10 text-teal-300 border-teal-500/20 hover:bg-teal-500/20',
      orange: 'bg-orange-500/10 text-orange-300 border-orange-500/20 hover:bg-orange-500/20',
    };

    return (
      <div 
        className={`glass-card bg-gradient-to-br ${colorClasses[color]?.bg} ${colorClasses[color]?.border} ${colorClasses[color]?.hover} p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] h-full animate-on-scroll`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800">
            {icon}
          </div>
          <div className="text-xs text-gray-500 font-medium px-3 py-1.5 rounded-full bg-gray-900/50 border border-gray-800">
            {skills.length} skills
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => {
            const iconUrl = getTechIcon(skill);
            return (
              <div 
                key={i} 
                className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg border transition-all hover:scale-105 cursor-default ${tagColorClasses[color]}`}
              >
                {iconUrl ? (
                  <img src={iconUrl} alt={skill} className="w-4 h-4 object-contain" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                )}
                {skill}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // TimelineItem Component (unchanged from previous)
  const TimelineItem = ({ role, company, date, description, icon, color, side }) => {
    const colorClasses = {
      blue: 'bg-blue-500/10 border-blue-500/30',
      purple: 'bg-purple-500/10 border-purple-500/30',
      green: 'bg-green-500/10 border-green-500/30',
      yellow: 'bg-yellow-500/10 border-yellow-500/30',
      pink: 'bg-pink-500/10 border-pink-500/30',
    };

    return (
      <div className={`relative flex ${side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-6 animate-on-scroll`}>
        <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-gray-950 z-10" />
        
        <div className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${side === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
          <div className={`glass-card ${colorClasses[color]} p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01]`}>
            <div className={`flex ${side === 'left' ? 'md:flex-row-reverse' : ''} items-start justify-between mb-4`}>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{role}</h3>
                <div className="flex items-center gap-2 text-gray-400">
                  {icon}
                  <span className="font-medium">{company}</span>
                </div>
              </div>
              <span className="text-sm text-gray-400 font-mono bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800">
                {date}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    );
  };

  // ProjectCard Component (unchanged from previous)
  const ProjectCard = ({ title, tags, description, featured, delay, link, icon }) => (
    <div 
      className={`group glass-card border p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] h-full animate-on-scroll ${
        featured 
          ? 'border-purple-500/40 bg-gradient-to-br from-purple-500/5 to-transparent' 
          : 'border-gray-800 hover:border-gray-700'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl ${featured ? 'bg-purple-500/20' : 'bg-blue-500/10'}`}>
          {icon}
        </div>
        {link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 hover:bg-gray-800 rounded-lg"
          >
            <ExternalLink size={20} className="text-gray-400 hover:text-white" />
          </a>
        ) : (
          <div className="p-2 opacity-50 cursor-not-allowed">
            <ExternalLink size={20} className="text-gray-600" />
          </div>
        )}
      </div>
      
      <h3 className={`text-2xl font-bold mb-4 text-white group-hover:text-gradient transition-all duration-300 ${
        featured ? 'text-gradient' : ''
      }`}>
        {title}
      </h3>
      
      <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <span 
            key={i} 
            className={`text-xs px-3 py-1.5 rounded-full font-medium border ${
              featured 
                ? 'text-purple-300 bg-purple-500/10 border-purple-500/20' 
                : 'text-blue-300 bg-blue-500/10 border-blue-500/20'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      
      {link && (
        <div className="mt-6 pt-6 border-t border-gray-800">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`text-sm font-medium flex items-center gap-2 ${
              featured ? 'text-purple-400 hover:text-purple-300' : 'text-blue-400 hover:text-blue-300'
            }`}
          >
            View Project
            <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );

  export default Portfolio;