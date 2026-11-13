export type Accent = 'pink' | 'purple' | 'teal' | 'amber' | 'indigo'
export type ProjectType = 'ui-ux' | 'web' | 'photo'
export type Filter = 'all' | ProjectType

export const profile = {
  name: 'elya',
  email: 'helooelyauiux@gmail.com',
  // Replace public/resume.pdf with your own file (keep the name) or point this at another URL.
  resume: '/resume.pdf',
  roles: ['Web Developer', 'UI/UX Designer', 'Product Thinker', 'Photographer'],
  // Add profile URLs here and the matching icon appears in the hero automatically.
  socials: { figma: '', github: '', linkedin: '' } as Record<'figma' | 'github' | 'linkedin', string>,
}

export const navLinks = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'services', label: 'SERVICES' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'toolkit', label: 'TOOLKIT' },
  { id: 'resume', label: 'RESUME' },
  { id: 'contact', label: 'CONTACT' },
]

export const services: { n: string; title: string; text: string; filter: Filter; accent: Accent; icon: 'code' | 'layout' | 'layers' | 'camera' }[] = [
  { n: '01', title: 'Web Development', text: 'Responsive, accessible sites and apps built with modern code.', filter: 'web', accent: 'teal', icon: 'code' },
  { n: '02', title: 'UI/UX Design', text: 'Interfaces rooted in clarity, empathy and a little delight.', filter: 'ui-ux', accent: 'purple', icon: 'layout' },
  { n: '03', title: 'Product Design', text: 'From early flows to polished systems ready to scale.', filter: 'all', accent: 'pink', icon: 'layers' },
  { n: '04', title: 'Photography', text: 'Honest images, visual stories and considered art direction.', filter: 'photo', accent: 'amber', icon: 'camera' },
]

export const education = [
  { tag: 'DEGREE', title: 'BSIT Web Development', text: 'Holy Angel University · Angeles City' },
  { tag: 'UI/UX DESIGN', title: 'App interfaces and Wireframing', text: 'Exploring app layouts, screen organization, and user-friendly interface design.' },
  { tag: 'INTEREST', title: 'Photography', text: 'Documenting moments and telling stories through the lens.' },
]

export const skills: [string, string[]][] = [
  ['Design', ['FIGMA', 'WIREFRAMING', 'PROTOTYPING']],
  ['Frontend', ['HTML', 'CSS', 'JAVASCRIPT', 'REACT']],
  ['Backend & Tools', ['NODEJS', 'EXPRESS', 'MONGODB', 'PYTHON']],
]

export type Project = {
  id: string
  type: ProjectType
  title: string
  category: string
  accent: Accent
  tags: string[]
  overview: string
  role: string
  tools: string[]
  process: string[]
  result: string
  live?: string
  github?: string
}

// Starter case studies: swap the copy, add `live` / `github` URLs, and they update everywhere.
export const projects: Project[] = [
  {
    id: 'instudy', type: 'ui-ux', title: 'InStudy Workspace', category: 'Product Design · UX', accent: 'pink',
    tags: ['Figma', 'Prototype', 'Research'],
    overview: 'A calm study workspace that brings notes, tasks and focus sessions into one place, so students spend less time switching apps and more time learning.',
    role: 'UI/UX designer: research, flows, wireframes, visual design and interactive prototype.',
    tools: ['Figma', 'FigJam', 'Notion'],
    process: ['Interviewed classmates about how they plan and revise.', 'Mapped the core flows: capture, plan, focus, review.', 'Wireframed low-fidelity screens and tested them on paper.', 'Built a high-fidelity prototype with a reusable component library.'],
    result: 'A tested, clickable prototype with a documented design system, ready for development hand-off.',
  },
  {
    id: 'bloom', type: 'web', title: 'Bloom Booking', category: 'Web App · Full-stack', accent: 'purple',
    tags: ['React', 'Node', 'MongoDB'],
    overview: 'A booking web app for small studios: pick a service, choose a slot and get a confirmation, with a simple dashboard to manage appointments.',
    role: 'Full-stack developer: UI build, REST API and database schema.',
    tools: ['React', 'Node.js', 'Express', 'MongoDB'],
    process: ['Defined the booking model and availability rules.', 'Built the API and validation layer.', 'Implemented a responsive, keyboard-friendly interface.', 'Tested the flow end to end on mobile and desktop.'],
    result: 'A working booking flow with clear states for loading, errors and confirmation.',
  },
  {
    id: 'pocket', type: 'ui-ux', title: 'Pocket Wallet', category: 'Mobile App · UI Design', accent: 'teal',
    tags: ['Figma', 'Mobile', 'UI Kit'],
    overview: 'A friendly money-tracking app concept that turns spending into small, readable moments instead of spreadsheets.',
    role: 'UI designer: visual language, components and screen design.',
    tools: ['Figma', 'Auto Layout', 'Variables'],
    process: ['Collected references and defined a playful but trustworthy tone.', 'Designed a token-based colour and type system.', 'Composed key screens: overview, add expense, insights.', 'Prepared states and dark mode variants.'],
    result: 'A cohesive mobile UI kit with light and dark themes.',
  },
  {
    id: 'golden', type: 'photo', title: 'Golden Hour Series', category: 'Photography · Light & Street', accent: 'amber',
    tags: ['Lightroom', 'Street', 'Editorial'],
    overview: 'A personal photo series on how late afternoon light changes ordinary streets, shot over several weekends.',
    role: 'Photographer and editor: concept, shooting, selection and grading.',
    tools: ['Camera', 'Lightroom'],
    process: ['Scouted locations and tracked sunset times.', 'Shot in short windows to catch the best light.', 'Selected a cohesive set from hundreds of frames.', 'Graded for a consistent warm tone.'],
    result: 'A curated series that informs the warmth and mood of my interface work.',
  },
  {
    id: 'campus', type: 'web', title: 'Campus Hub', category: 'Web · React', accent: 'indigo',
    tags: ['React', 'Tailwind', 'A11y'],
    overview: 'A student-life portal concept that gathers events, announcements and resources into one searchable, accessible interface.',
    role: 'Front-end developer and designer.',
    tools: ['React', 'Tailwind CSS', 'Vite'],
    process: ['Audited existing campus sites for friction.', 'Designed a card-based information architecture.', 'Built reusable components with keyboard and screen reader support.', 'Optimised for performance on slow connections.'],
    result: 'A fast, accessible front end with consistent components across every page.',
  },
]
