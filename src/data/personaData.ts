export interface Mission {
  id: string
  title: string
  client: string
  role: string
  tech: string[]
  distortionLevel: number
  status: 'featured' | 'in_prod' | 'shipped'
  date: string
  excerpt: string
  fullDossier: string
  link?: string
  github?: string
  stats: { label: string; value: string }[]
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
    id: 'heist-01',
    title: 'HYPERION CLOUD // Distrubuted Orchestrator',
    client: 'FinTech Syndicate Tokyo',
    role: 'Lead Architect',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    distortionLevel: 94,
    status: 'featured',
    date: 'OCT 2025',
    excerpt: 'High-throughput microservices dashboard handling 45k+ concurrent financial events with real-time WebSocket telemetry and sub-50ms latency.',
    fullDossier: 'Architected and shipped an enterprise-grade cloud event processing cluster. Implemented custom virtualized tables for rendering 100k rows at 60 FPS, end-to-end type safety with tRPC, and distributed lock prevention with Redis.',
    stats: [
      { label: 'THROUGHPUT', value: '45k req/s' },
      { label: 'LATENCY', value: '<48ms' },
      { label: 'UPTIME', value: '99.98%' }
    ]
  },
  {
    id: 'heist-02',
    title: 'CHRONOS AI // Agentic Workflow Engine',
    client: 'Autonomous Labs',
    role: 'Full-Stack Developer',
    tech: ['Next.js 14', 'Python FastAPI', 'Tailwind', 'OpenAI', 'LangChain'],
    distortionLevel: 88,
    status: 'featured',
    date: 'NOV 2025',
    excerpt: 'Multi-agent orchestration platform where users design autonomous workflows with visual DAG canvas and human-in-the-loop approvals.',
    fullDossier: 'Built a visual node graph canvas editor using React Flow and custom Web Workers. Reduced LLM inference latency by 35% through speculative token decoding and aggressive semantic caching.',
    stats: [
      { label: 'EFFICIENCY', value: '+350%' },
      { label: 'WORKFLOWS', value: '1,200+' },
      { label: 'ACCURACY', value: '99.2%' }
    ]
  },
  {
    id: 'heist-03',
    title: 'NEO-SHIBUYA // Interactive 3D Metaverse',
    client: 'Creative Guild Tokyo',
    role: 'Creative Web Technologist',
    tech: ['Three.js', 'WebGL', 'Web Audio API', 'React', 'GLSL'],
    distortionLevel: 82,
    status: 'in_prod',
    date: 'DEC 2025',
    excerpt: 'Cinematic 3D web experience bringing cyberpunk Tokyo streets to life directly inside standard mobile and desktop web browsers.',
    fullDossier: 'Pushed the envelope of modern WebGL rendering with procedural volumetric rain, bloom post-processing, spatial audio nodes, and responsive camera fly-through sequences matching game console fidelity.',
    stats: [
      { label: 'FPS BENCHMARK', value: '60 FPS' },
      { label: 'BUNDLE SIZE', value: '<2.1 MB' },
      { label: 'SHADER PASSES', value: '4 Passes' }
    ]
  },
  {
    id: 'heist-04',
    title: 'OMNI-PULSE // E-Commerce Flagship Store',
    client: 'Vanguard Retail Co.',
    role: 'Frontend Engineer',
    tech: ['React 18', 'Tailwind CSS', 'Stripe', 'Zustand', 'Radix UI'],
    distortionLevel: 75,
    status: 'shipped',
    date: 'JAN 2026',
    excerpt: 'Luxury fashion eCommerce experience with zero-friction checkout, instantaneous catalog filtering, and 100/100 Lighthouse performance.',
    fullDossier: 'Engineered an ultra-fast storefront with server-side generation, progressive image loading, micro-interactions, and secure multi-currency Stripe payment gateway integration.',
    stats: [
      { label: 'LIGHTHOUSE', value: '100 / 100' },
      { label: 'CONVERSION', value: '+28%' },
      { label: 'PAGE LOAD', value: '0.6s' }
    ]
  }
]

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    author: 'Mishima_Admin',
    role: 'PhanSite Founder',
    text: 'Ferrel turned our clunky portal into a cinematic masterpiece. The snappiness and animations stole everyone\'s hearts!',
    time: '2m ago',
    avatarLetter: 'M'
  },
  {
    id: 't-2',
    author: 'Chief_Architect_Ken',
    role: 'Tech Lead @ FinTech',
    text: 'Rare engineer who bridges extreme engineering rigor with game-level UI design. The distributed pipeline never flinched.',
    time: '14m ago',
    avatarLetter: 'K'
  },
  {
    id: 't-3',
    author: 'Futaba_Navi',
    role: 'Security & Intel',
    text: 'Keybindings, zero latency, clean React components... Even my persona Necronomicon is thoroughly impressed!',
    time: '35m ago',
    avatarLetter: 'F'
  }
]

export const SKILLS_DATA = [
  { category: 'FRONTEND ARCHITECTURE', level: 98, stack: 'React 18, Next.js, TypeScript, Tailwind CSS, Radix UI, Vite' },
  { category: 'CREATIVE UI & ANIMATION', level: 95, stack: 'Framer Motion, CSS 3D Transforms, Web Audio API, Canvas 2D/3D' },
  { category: 'BACKEND & CLOUD SYSTEMS', level: 91, stack: 'Node.js, Express, Python FastAPI, PostgreSQL, Redis, REST & GraphQL' },
  { category: 'DEVOPS & OPTIMIZATION', level: 88, stack: 'Docker, Git CI/CD, Lighthouse 100 Performance, Web Vitals, Security' },
]
