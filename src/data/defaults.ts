// ============================================================
//  data/defaults.ts — Default state + Templates
// ============================================================
import type { AppState, Template, PluginId } from '../types'

export const STATS_THEMES = [
  'dark', 'radical', 'tokyonight', 'merko', 'gruvbox',
  'dracula', 'nord', 'catppuccin_mocha', 'onedark', 'cobalt',
  'material-palenight', 'aura', 'github_dark',
]

export const PLUGIN_IDS: PluginId[] = [
  'snake', 'stats', 'streak', 'langs', 'trophy',
  'activitygraph', 'views', 'wakatime', 'spotify',
  'leetcode', 'codewars', 'hackerrank', 'wave',
]

function defaultPlugins(): AppState['plugins'] {
  const result = {} as AppState['plugins']
  for (const id of PLUGIN_IDS) {
    result[id] = { id, enabled: id === 'stats' || id === 'snake', fields: {} }
  }
  return result
}

export const DEFAULT_STATE: AppState = {
  version: '2.0.0',
  lang: 'pt',
  previewTheme: 'light',
  view: 'preview',
  statsTheme: 'dark',

  profile: {
    username: 'seu-username',
    displayName: 'Olá, sou Dev! 👋',
    bio: 'Construindo o futuro, um commit por vez.',
    location: '',
    focus: 'backend',
    website: '',
    openToWork: false,
  },

  typing: {
    mode: 'local',
    texts: ['Backend Developer 🚀', 'Apaixonado por código limpo', '', '', '', '', '', '', '', ''],
    color: '58a6ff',
    speed: 50,
    pause: 900,
    font: 'jetbrains',
    fontSize: 22,
    width: 500,
    height: 60,
    align: 'center',
    repeat: true,
  },

  icons: {
    selected: [],
    perRow: 12,
    align: 'center',
    search: '',
    activeCategories: ['backend'],
  },

  social: {
    linkedin: '',
    twitter: '',
    website: '',
    email: '',
    discord: '',
    youtube: '',
    devto: '',
  },

  badges: [],

  plugins: defaultPlugins(),

  about: {
    enabled: false,
    paragraphs: [''],
    facts: [
      { id: '1', emoji: '🌍', text: '' },
      { id: '2', emoji: '💼', text: '' },
      { id: '3', emoji: '🚀', text: '' },
    ],
  },

  projects: [],

  sectionOrder: [
    { id: 'header',   enabled: true },
    { id: 'about',    enabled: true },
    { id: 'icons',    enabled: true },
    { id: 'stats',    enabled: true },
    { id: 'projects', enabled: true },
    { id: 'snake',    enabled: true },
    { id: 'plugins',  enabled: true },
    { id: 'footer',   enabled: true },
  ],
}

// ── TEMPLATES ─────────────────────────────────────────────────
export const TEMPLATES: Template[] = [
  {
    id: 'backend',
    name: 'Backend Dev',
    nameEn: 'Backend Dev',
    description: 'Foco em APIs, servidores e bancos de dados',
    descriptionEn: 'APIs, servers and databases focused',
    emoji: '🔧',
    config: {
      profile: { ...DEFAULT_STATE.profile, focus: 'backend', displayName: 'Backend Developer' },
      typing: { ...DEFAULT_STATE.typing, texts: ['Backend Developer 🚀', 'APIs & Microservices', 'Clean Code Enthusiast', '', '', '', '', '', '', ''] },
      icons: { ...DEFAULT_STATE.icons, activeCategories: ['backend', 'database', 'devops'], selected: ['nodejs-dark', 'python-dark', 'postgresql-dark', 'docker', 'redis-dark'] },
    },
  },
  {
    id: 'frontend',
    name: 'Frontend Dev',
    nameEn: 'Frontend Dev',
    description: 'Interfaces, UX e experiência do usuário',
    descriptionEn: 'Interfaces, UX and user experience',
    emoji: '🎨',
    config: {
      profile: { ...DEFAULT_STATE.profile, focus: 'frontend', displayName: 'Frontend Developer' },
      typing: { ...DEFAULT_STATE.typing, texts: ['Frontend Developer 🎨', 'UI/UX Enthusiast', 'Pixel Perfect 💅', '', '', '', '', '', '', ''] },
      icons: { ...DEFAULT_STATE.icons, activeCategories: ['frontend', 'tools'], selected: ['react-dark', 'typescript', 'tailwindcss-dark', 'vite-dark', 'figma-dark'] },
    },
  },
  {
    id: 'fullstack',
    name: 'Full Stack',
    nameEn: 'Full Stack',
    description: 'Do banco ao navegador, full stack completo',
    descriptionEn: 'From database to browser, full stack',
    emoji: '⚡',
    config: {
      profile: { ...DEFAULT_STATE.profile, focus: 'fullstack', displayName: 'Full Stack Developer' },
      typing: { ...DEFAULT_STATE.typing, texts: ['Full Stack Developer ⚡', 'Backend & Frontend', 'Building complete products', '', '', '', '', '', '', ''] },
      icons: { ...DEFAULT_STATE.icons, activeCategories: ['backend', 'frontend', 'database'], selected: ['react-dark', 'nodejs-dark', 'typescript', 'postgresql-dark', 'docker'] },
    },
  },
  {
    id: 'devops',
    name: 'DevOps / SRE',
    nameEn: 'DevOps / SRE',
    description: 'Infraestrutura, CI/CD e confiabilidade',
    descriptionEn: 'Infrastructure, CI/CD and reliability',
    emoji: '⚙️',
    config: {
      profile: { ...DEFAULT_STATE.profile, focus: 'devops', displayName: 'DevOps Engineer' },
      typing: { ...DEFAULT_STATE.typing, texts: ['DevOps Engineer ⚙️', 'Infrastructure as Code', 'Reliability & Automation', '', '', '', '', '', '', ''] },
      icons: { ...DEFAULT_STATE.icons, activeCategories: ['devops', 'cloud', 'tools'], selected: ['docker', 'kubernetes', 'aws-dark', 'linux-dark', 'githubactions-dark'] },
    },
  },
  {
    id: 'mobile',
    name: 'Mobile Dev',
    nameEn: 'Mobile Dev',
    description: 'Apps iOS e Android nativos e cross-platform',
    descriptionEn: 'Native and cross-platform iOS and Android apps',
    emoji: '📱',
    config: {
      profile: { ...DEFAULT_STATE.profile, focus: 'mobile', displayName: 'Mobile Developer' },
      typing: { ...DEFAULT_STATE.typing, texts: ['Mobile Developer 📱', 'iOS & Android', 'Flutter & Kotlin', '', '', '', '', '', '', ''] },
      icons: { ...DEFAULT_STATE.icons, activeCategories: ['mobile', 'tools'], selected: ['flutter-dark', 'kotlin-dark', 'swift', 'androidstudio-dark', 'git'] },
    },
  },
  {
    id: 'student',
    name: 'Estudante',
    nameEn: 'Student',
    description: 'Aprendendo e crescendo na área de tech',
    descriptionEn: 'Learning and growing in tech',
    emoji: '🎓',
    config: {
      profile: { ...DEFAULT_STATE.profile, focus: 'student', displayName: 'Dev em Construção 🎓', openToWork: true },
      typing: { ...DEFAULT_STATE.typing, texts: ['Estudante de Programação 🎓', 'Sempre aprendendo algo novo', 'Open to opportunities!', '', '', '', '', '', '', ''] },
      icons: { ...DEFAULT_STATE.icons, activeCategories: ['backend', 'frontend'], selected: ['python-dark', 'javascript', 'html', 'css', 'git'] },
    },
  },
]
