// All of the page's words live here. App.jsx and the components only lay
// them out. `tags` on an entry are the skills it used — they must match the
// names in `skillGroups` exactly, since the Skills section matches on them.

export const profile = {
  name: 'Elkan Bruha',
  tagline: 'founder · engineer · cu boulder',
  about:
    'Founder and software engineer who likes building the whole thing: the ' +
    'front end people touch, the pipeline behind it, and the hardware it runs ' +
    'on. Computer vision by trade, product design by inclination. Studying ' +
    'computer science at CU Boulder. Dual US/French citizen based between ' +
    'New York and Boulder.',
  email: 'elkanbruha@gmail.com',
  github: 'https://github.com/elkanbruha',
  linkedin: 'https://linkedin.com/in/elkanbruha',
  resume: '/Elkan-Bruha-Resume.pdf',
  // Shown as live local times under the tagline.
  places: [
    { label: 'Boulder', tz: 'America/Denver' },
    { label: 'New York', tz: 'America/New_York' },
  ],
}

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const experience = [
  {
    id: 'cleared',
    title: 'Cleared — Co-Founder & CTO',
    date: 'Aug 2026 - present',
    url: 'https://clearedtoopen.com',
    blurb:
      'The licenses and permits a restaurant needs to open, prepared, filed ' +
      'and tracked in one place. Starting with Denver liquor licensing at a ' +
      'flat fee, with every published deadline on the clock.',
    bullets: [
      'Built the marketing site in Next.js with a scroll-driven 3D intro (three.js via react-three-fiber): a desk buried in paperwork that clears as you scroll, and a laptop that wakes to show the live page.',
      'Building the applicant dashboard and staff console: magic-link sign-in, a document locker, and a stage-by-stage tracker with deadline clocks, on DynamoDB, S3 and SES.',
      'Designed the product around Colorado unauthorized-practice-of-law rules: the client picks their own license class from a neutral table and judgment questions route to a named attorney.',
    ],
    tags: ['TypeScript', 'React', 'Next.js', 'Three.js', 'Tailwind CSS', 'Node.js', 'AWS', 'HTML', 'CSS', 'Git', 'GitHub Actions'],
  },
  {
    id: 'pikkolo',
    title: 'Pikkolo Assembly — Software & Computer Vision Engineering Intern',
    date: 'Sep 2026 - present',
    blurb:
      'Computer-vision automated optical inspection: continuous 360° scanning ' +
      'of manufactured parts, with capture pipelines synced to CNC motion.',
    bullets: [
      'Real-time image capture and processing pipelines synchronized with CNC motion and physical hardware.',
    ],
    tags: ['Python', 'OpenCV', 'Linux', 'Git', 'GitHub Actions'],
  },
  {
    id: 'crowdcount',
    title: 'CrowdCount — Founder & Lead Engineer',
    date: 'May 2024 - Sep 2026',
    url: 'https://crowdcount.tech',
    blurb:
      'B2B computer-vision platform for real-time occupancy analytics, live ' +
      'across 25+ sites and 30+ counters. Sole engineer for the first year; ' +
      'built the whole platform from edge cameras to the iOS app.',
    bullets: [
      'Architected the full platform across iOS, Next.js, Python APIs, databases, AWS, and deployed edge cameras.',
      'Engineered a CUDA-accelerated RTSP server on NVIDIA GPUs that ingests and manages 200+ concurrent streams.',
      'Deployed a real-time people-counting pipeline using custom YOLO models, OpenCV, PyTorch, ONNX, and TensorRT, trained on production footage to handle varied lighting, camera angles, and store layouts.',
      'Built remotely managed Raspberry Pi camera hardware with QR and Bluetooth provisioning for secure customer Wi-Fi setup.',
      'Led a seven-person cross-functional team across engineering, product, and operations through customer pilots.',
    ],
    tags: [
      'Python', 'TypeScript', 'Swift', 'SQL', 'React', 'Next.js', 'Node.js', 'Flask', 'REST',
      'Tailwind CSS', 'PyTorch', 'YOLO', 'OpenCV', 'ONNX', 'TensorRT', 'CUDA', 'AWS', 'Docker',
      'Linux', 'Nginx', 'MySQL', 'SQLite', 'SwiftUI', 'CoreBluetooth', 'Git', 'GitHub Actions', 'HTML', 'CSS',
    ],
  },
  {
    id: 'upstream',
    title: 'Upstream — Co-Founder & Software Engineer',
    date: 'May 2026 - Aug 2026',
    url: 'https://upstreamcv.com',
    blurb:
      'Real-time video infrastructure for computer-vision products: connect ' +
      'cameras, configure detections, and turn live video into API calls, ' +
      'alerts and automations. Consolidated into CrowdCount in August.',
    bullets: [
      'Built encrypted SRT ingest and secure MediaMTX playback for low-latency customer video streams.',
      'Accepted into NVIDIA Inception, receiving $250K+ in cloud-provider credits and technical startup benefits.',
      'Reached Techstars’ second round, placing in the top 10% of applicants.',
    ],
    tags: [
      'Python', 'TypeScript', 'React', 'Next.js', 'Supabase', 'PostgreSQL', 'Docker', 'Linux',
      'AWS', 'Nginx', 'REST', 'OpenAPI', 'FastAPI', 'Tailwind CSS', 'Git', 'GitHub Actions',
      'PyTorch', 'YOLO', 'OpenCV', 'ONNX', 'TensorRT', 'CUDA', 'LLM Evaluation',
    ],
  },
  {
    id: 'rws',
    title: 'RWS Group — Software QA Engineer',
    date: 'Mar 2025 - Dec 2025',
    blurb:
      'Functional and French localization QA on unreleased web and software ' +
      'products, primarily for Google.',
    bullets: [
      'Identified customer-facing defects and completed repeated verification cycles to validate fixes before release.',
    ],
    tags: [],
  },
  {
    id: 'outlier',
    title: 'Outlier — AI Coding Trainer',
    date: 'Nov 2024 - Oct 2025',
    blurb:
      'Wrote CS problem sets and evaluation frameworks used to train and grade ' +
      'LLM code output: correctness, edge cases, hallucinations, logical gaps ' +
      'and unsafe patterns.',
    tags: ['Python', 'LLM Evaluation'],
  },
  {
    id: 'onepoint',
    title: 'Onepoint — Lead Project Developer',
    date: 'Fall 2023',
    blurb:
      'Led and mentored a student engineering team building a full-stack ' +
      'stock-analysis platform with an ML prediction model.',
    bullets: [
      'Built the frontend, backend, and ML workflow and presented the completed product to Onepoint’s C-suite.',
    ],
    tags: ['Python', 'Git', 'GitHub Actions'],
  },
]

// Product dashboards, separate from the marketing sites they sit behind.
// Each one opens inside a window on this page, framing the product's own
// /demo route, where the app runs on a fake account and fake data so there
// is no account to create.
//
// `devUrl` is the same demo served from a local checkout. It is used only
// when this site is itself running on localhost (see demoUrl below), so the
// windows can be worked on before the /demo routes are deployed.
export const dashboards = [
  {
    id: 'crowdcount-manager',
    title: 'CrowdCount Counter Manager',
    date: '2024 - 2026',
    blurb:
      'Multi-location occupancy console: live counts, day, week and year ' +
      'history pinned to each location’s timezone, device provisioning and ' +
      'settings, POS integration, and insights.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Radix UI'],
    tags: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'REST', 'HTML', 'CSS', 'Git', 'GitHub Actions'],
    url: 'https://counter.crowdcount.tech/demo',
    devUrl: 'http://localhost:3100/demo',
  },
  {
    id: 'upstream-dashboard',
    title: 'Upstream Dashboard',
    date: '2026',
    blurb:
      'Fleet console for camera intelligence: camera onboarding, stream ' +
      'health and reliability, detection geometry configuration, and model ' +
      'metrics. Runs entirely on fixtures in demo mode.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'SWR'],
    tags: ['TypeScript', 'React', 'Next.js', 'Supabase', 'PostgreSQL', 'REST', 'HTML', 'CSS', 'Git', 'GitHub Actions'],
    url: 'https://dashboard.upstreamcv.com/demo',
    devUrl: 'http://localhost:3200/demo',
  },
  {
    id: 'cleared-dashboard',
    title: 'Cleared Dashboard',
    date: '2026',
    blurb:
      'Applicant dashboard and staff ops console: document locker, ' +
      'stage-by-stage application tracker with deadline clocks, attorney ' +
      'referral log, and audit log.',
    stack: ['Next.js', 'TypeScript', 'next-auth', 'DynamoDB', 'S3', 'SES'],
    tags: ['TypeScript', 'React', 'Next.js', 'Node.js', 'AWS', 'HTML', 'CSS', 'Git', 'GitHub Actions'],
    url: 'https://dashboard.clearedtoopen.com/demo',
    devUrl: 'http://localhost:3300/demo',
  },
]

// Which demo URL a window should frame. Production always, unless this site
// is being served from localhost and a local copy is configured.
export function demoUrl(dashboard) {
  const onLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  return onLocalhost && dashboard.devUrl ? dashboard.devUrl : dashboard.url
}

export const projects = [
  {
    id: 'getgreen',
    title: 'GetGreen — iOS App',
    date: 'Apr 2026',
    url: 'https://elkanbruha.com/getgreen',
    urlLabel: 'elkanbruha.com/getgreen',
    blurb:
      'Simple and free iOS app that converts your screen time into an ' +
      'estimated carbon footprint. (Awaiting App Store approval)',
    tags: ['Swift', 'SwiftUI'],
  },
  {
    id: 'cubuffs',
    title: 'CU Buffs Advising Portal — Web Redesign',
    date: 'Mar 2026 - Apr 2026',
    url: 'https://cubuffsadvising.netlify.app',
    urlLabel: 'cubuffsadvising.netlify.app',
    blurb:
      'Redesigned my university’s advising portal front end in Next.js. ' +
      'Presented to a senior UX designer on the CU Boulder Portal team and ' +
      'received positive feedback.',
    tags: ['React', 'Next.js', 'JavaScript', 'HTML', 'CSS'],
  },
]

export const skillGroups = [
  { label: 'Languages', skills: ['Python', 'TypeScript', 'JavaScript', 'C', 'C++', 'Swift', 'SQL'] },
  { label: 'Web & APIs', skills: ['HTML', 'CSS', 'Tailwind CSS', 'React', 'Next.js', 'Three.js', 'Node.js', 'Flask', 'FastAPI', 'REST', 'OpenAPI'] },
  { label: 'AI, ML & computer vision', skills: ['PyTorch', 'YOLO', 'OpenCV', 'ONNX', 'TensorRT', 'CUDA', 'LLM Evaluation'] },
  { label: 'Infrastructure', skills: ['AWS', 'Docker', 'Linux', 'Nginx', 'MySQL', 'SQLite', 'PostgreSQL', 'Supabase'] },
  { label: 'Mobile & tools', skills: ['SwiftUI', 'React Native', 'CoreBluetooth', 'Git', 'GitHub Actions'] },
]

// Where a skill was used when it is not tied to an entry above.
export const skillNotes = {
  'React Native': 'used in side projects',
  'C': 'coursework and systems projects at CU Boulder',
  'C++': 'coursework and systems projects at CU Boulder',
}

export const education = [
  {
    id: 'cu',
    title: 'University of Colorado Boulder — BS Computer Science',
    date: 'Fall 2024 - May 2027 (expected)',
    lines: [
      'Dean’s List · entered via transfer.',
      'Seeking full-time roles; prepared to adjust course load or take leave to commit fully.',
    ],
  },
  {
    id: 'nyu',
    title: 'New York University — Visiting Student',
    date: 'Spring 2024',
    lines: ['GPA 3.8 · Computer science coursework.'],
  },
  {
    id: 'saclay',
    title: 'Université Paris-Saclay (CentraleSupélec) — Global Engineering',
    date: 'Fall 2023',
    lines: [
      'GPA 3.2 · exited via transfer.',
      'First cohort of the CentraleSupélec / McGill dual-degree program.',
    ],
  },
  {
    id: 'lfny',
    title: 'Lycée Français de New York — High School',
    date: 'Fall 2013 - Spring 2023',
    lines: [
      'GPA 4.0 · French Baccalaureate (Mention Très Bien).',
      'Majored in Mathematics, Physics, Chemistry and Computer Science at a bilingual international school.',
    ],
  },
]

// Every entry that can light up when a skill is selected, in page order.
export const taggedEntries = [
  ...experience.map((e) => ({ id: e.id, label: e.title.split(' — ')[0], tags: e.tags })),
  ...dashboards.map((d) => ({ id: d.id, label: d.title, tags: d.tags })),
  ...projects.map((p) => ({ id: p.id, label: p.title.split(' — ')[0], tags: p.tags })),
]
