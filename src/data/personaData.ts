export interface Mission {
  id: string
  title: string
  category: 'web' | 'ai' | 'game' | 'ecommerce'
  client: string
  role: string
  tech: string[]
  distortionLevel: number
  status: 'featured' | 'in_prod' | 'shipped'
  date: string
  excerpt: string
  fullDossier: string
  liveUrl?: string
  githubUrl: string
  stats: { label: string; value: string }[]
  image?: string
}

export interface Testimonial {
  id: string
  author: string
  role: string
  text: string
  time: string
  avatarLetter: string
}

export const MISSIONS_DATA: Mission[] = [
  {
    id: 'repo-01',
    title: 'GLOBAL SEISMIC TRACKER',
    category: 'web',
    client: 'Open Science / Public Utility',
    role: 'Lead Developer & Architect',
    tech: ['TypeScript', 'Next.js', 'React', 'Tailwind', 'Geo APIs', 'Vercel'],
    distortionLevel: 94,
    status: 'featured',
    date: 'SEP 2026',
    excerpt: 'Real-time global earthquake and seismic activity tracker featuring interactive geographical visualization and live seismic telemetry feeds.',
    fullDossier: 'Architected an interactive globe and map visualization dashboard consuming global seismic APIs in real time. Designed with responsive telemetry charts, magnitude depth filters, and sub-second updates deployed on Vercel.',
    liveUrl: 'https://global-seismic-tracker.vercel.app',
    githubUrl: 'https://github.com/FerrelHD/Global-Seismic-Tracker',
    stats: [
      { label: 'DATA STREAM', value: 'Live USGS API' },
      { label: 'LATENCY', value: '<250ms' },
      { label: 'UPTIME', value: '100%' }
    ]
  },
  {
    id: 'repo-02',
    title: 'LECLERC REDLINE // F1 Experience',
    category: 'web',
    client: 'Scuderia Ferrari Tribute',
    role: 'Creative Web Developer',
    tech: ['JavaScript', 'Creative CSS', 'Keyframe Animations', 'Vercel'],
    distortionLevel: 89,
    status: 'featured',
    date: 'AUG 2026',
    excerpt: 'High-octane interactive automotive web showcase celebrating Scuderia Ferrari Formula 1 driver Charles Leclerc.',
    fullDossier: 'Engineered a cinematic, high-speed visual experience with custom CSS keyframe animations, responsive engine telemetry sound effects, and bold typographic design inspired by motorsport heritage.',
    liveUrl: 'https://leclerc-redline.vercel.app',
    githubUrl: 'https://github.com/FerrelHD/leclerc-redline',
    stats: [
      { label: 'SPEED BENCHMARK', value: '60 FPS' },
      { label: 'THEME', value: 'Ferrari Tifosi' },
      { label: 'TECH', value: 'Vanilla Modern' }
    ]
  },
  {
    id: 'repo-03',
    title: 'PORTFOLIO V2 // Minimalist Interactive',
    category: 'web',
    client: 'Personal Brand',
    role: 'Frontend Engineer',
    tech: ['Vue.js', 'Vite', 'Modern CSS', 'Vercel'],
    distortionLevel: 82,
    status: 'featured',
    date: 'AUG 2026',
    excerpt: 'Sleek, fluid developer portfolio inspired by the minimalist interactive design philosophy of Khanh Nguyen.',
    fullDossier: 'Crafted with Vue and Vite, featuring smooth page transitions, reactive component state, bespoke typography, and ultra-clean interactive layout.',
    liveUrl: 'https://portfolio-v2-finesser.vercel.app',
    githubUrl: 'https://github.com/FerrelHD/portfolio-v2',
    stats: [
      { label: 'FRAMEWORK', value: 'Vue 3 / Vite' },
      { label: 'LIGHTHOUSE', value: '100 / 100' },
      { label: 'BUNDLE', value: '<150 kB' }
    ]
  },
  {
    id: 'repo-04',
    title: 'ROBLOX SENTIMENT // IndoBERT NLP',
    category: 'ai',
    client: 'Academic NLP Research',
    role: 'ML & NLP Engineer',
    tech: ['Python', 'IndoBERT', 'PyTorch', 'Hugging Face', 'Pandas'],
    distortionLevel: 91,
    status: 'in_prod',
    date: 'JUL 2026',
    excerpt: 'NLP sentiment classification system fine-tuning Indonesian BERT transformer models on user review datasets.',
    fullDossier: 'Collected and preprocessed massive Indonesian app reviews. Fine-tuned the IndoBERT transformer model using PyTorch and Hugging Face, achieving high F1-score classification across sentiment classes with temporal trend tracking.',
    githubUrl: 'https://github.com/FerrelHD/Roblox-Sentimen-With-IndoBert',
    stats: [
      { label: 'MODEL', value: 'IndoBERT' },
      { label: 'FRAMEWORK', value: 'PyTorch / HF' },
      { label: 'ACCURACY', value: '92.4%' }
    ]
  },
  {
    id: 'repo-05',
    title: 'STOCK PREDICTION // Financial Forecasting',
    category: 'ai',
    client: 'Financial Tech Lab',
    role: 'Data Scientist',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Time-Series ML'],
    distortionLevel: 85,
    status: 'in_prod',
    date: 'JUN 2026',
    excerpt: 'Machine learning forecasting platform analyzing historical stock market prices and technical momentum indicators.',
    fullDossier: 'Built a predictive pipeline leveraging moving averages, volatility features, and regression/LSTM models to forecast trend reversals and asset price trajectories with data visualization dashboards.',
    githubUrl: 'https://github.com/FerrelHD/Stock-Prediction-System',
    stats: [
      { label: 'ALGORITHM', value: 'Time-Series ML' },
      { label: 'PIPELINE', value: 'Scikit-learn' },
      { label: 'DATASET', value: 'Yahoo Finance' }
    ]
  },
  {
    id: 'repo-06',
    title: 'STREET RUSH // Unity 3D & Shaders',
    category: 'game',
    client: 'Indie Game Project',
    role: 'Game Programmer & Tech Artist',
    tech: ['Unity 3D', 'C#', 'ShaderLab', 'HLSL', 'Physics Controller'],
    distortionLevel: 88,
    status: 'shipped',
    date: 'MAY 2026',
    excerpt: 'High-speed urban 3D arcade racer engineered with custom surface shaders and responsive vehicle physics.',
    fullDossier: 'Developed custom ShaderLab/HLSL lighting and motion blur passes, dynamic camera collision controllers, responsive obstacle generation algorithms, and tight vehicle handling physics in Unity.',
    githubUrl: 'https://github.com/FerrelHD/Street-Rush-Unity',
    stats: [
      { label: 'ENGINE', value: 'Unity 3D' },
      { label: 'SHADERS', value: 'Custom HLSL' },
      { label: 'PHYSICS', value: 'Custom Rig' }
    ]
  },
  {
    id: 'repo-07',
    title: 'ECO-BITE // Sustainable Food Architecture',
    category: 'web',
    client: 'Green Tech Initiative',
    role: 'Full-Stack Developer',
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'Web Architecture'],
    distortionLevel: 76,
    status: 'shipped',
    date: 'SEP 2026',
    excerpt: 'Eco-conscious web platform tracking food waste reduction, sustainable consumption, and ecological footprint metrics.',
    fullDossier: 'Engineered an intuitive interface for monitoring pantry lifecycles and discovering zero-waste recipe recommendations, minimizing food waste through smart categorization.',
    githubUrl: 'https://github.com/FerrelHD/Eco-Bite',
    stats: [
      { label: 'PURPOSE', value: 'Zero Food Waste' },
      { label: 'LANG', value: 'TypeScript' },
      { label: 'IMPACT', value: 'Eco-Friendly' }
    ]
  },
  {
    id: 'repo-08',
    title: 'FERSYA SHOP // Laravel E-Commerce',
    category: 'ecommerce',
    client: 'Retail Merchant Store',
    role: 'Backend & Full-Stack Developer',
    tech: ['PHP', 'Laravel', 'Blade', 'MySQL', 'REST API'],
    distortionLevel: 79,
    status: 'shipped',
    date: 'JUL 2026',
    excerpt: 'Full-featured online retail store equipped with dynamic product catalog, inventory tracking, and transaction order flows.',
    fullDossier: 'Built with PHP Laravel architecture, implementing relational database schemas for orders, user authentication, checkout cart state management, and administrative inventory controls.',
    githubUrl: 'https://github.com/FerrelHD/Fersya-Shop',
    stats: [
      { label: 'BACKEND', value: 'Laravel / PHP' },
      { label: 'DATABASE', value: 'MySQL' },
      { label: 'SECURITY', value: 'CSRF & Auth' }
    ]
  }
]

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    author: 'Mishima_Admin',
    role: 'PhanSite Founder',
    text: 'Ferrel turned real engineering projects into pure art. The Global Seismic Tracker and Leclerc Redline are unbelievable!',
    time: '2m ago',
    avatarLetter: 'M'
  },
  {
    id: 't-2',
    author: 'Chief_Architect_Ken',
    role: 'Tech Lead',
    text: 'A rare developer who bridges deep AI (IndoBERT) with game shaders and slick frontend animations with 60 FPS.',
    time: '14m ago',
    avatarLetter: 'K'
  },
  {
    id: 't-3',
    author: 'Futaba_Navi',
    role: 'Security & Intel',
    text: 'All 8 GitHub heist files verified on the Metaverse grid. Code quality: S-Rank Phantom Thief!',
    time: '35m ago',
    avatarLetter: 'F'
  }
]

export const SKILLS_DATA = [
  { category: 'FRONTEND ARCHITECTURE', level: 98, stack: 'TypeScript, JavaScript, React 18, Vue 3, Tailwind CSS, Vite' },
  { category: 'AI & DATA SCIENCE', level: 94, stack: 'Python, IndoBERT (Hugging Face), PyTorch, NLP Sentiment, Pandas, Scikit-learn' },
  { category: 'GAME & SHADER DEV', level: 90, stack: 'Unity 3D Engine, C#, ShaderLab, HLSL Graphics, Vehicle Physics' },
  { category: 'BACKEND & CLOUD DEPLOY', level: 89, stack: 'PHP Laravel, Node.js, REST APIs, MySQL, Vercel Serverless, Git CI/CD' },
]
