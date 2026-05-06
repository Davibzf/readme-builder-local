// ============================================================
//  data/icons.ts — Icon database (all local)
// ============================================================
import type { IconDef, CategoryKey } from '../types'

export const ICON_CATEGORIES: Record<CategoryKey, { labelPt: string; labelEn: string; emoji: string }> = {
  backend:  { labelPt: 'Backend',     labelEn: 'Backend',   emoji: '🔧' },
  frontend: { labelPt: 'Frontend',    labelEn: 'Frontend',  emoji: '🎨' },
  devops:   { labelPt: 'DevOps',      labelEn: 'DevOps',    emoji: '⚙️' },
  database: { labelPt: 'Database',    labelEn: 'Database',  emoji: '🗄' },
  mobile:   { labelPt: 'Mobile',      labelEn: 'Mobile',    emoji: '📱' },
  tools:    { labelPt: 'Ferramentas', labelEn: 'Tools',     emoji: '🛠' },
  ai:       { labelPt: 'AI / ML',     labelEn: 'AI / ML',   emoji: '🤖' },
  cloud:    { labelPt: 'Cloud',       labelEn: 'Cloud',     emoji: '☁️' },
  design:   { labelPt: 'Design',      labelEn: 'Design',    emoji: '✏️' },
  gamedev:  { labelPt: 'Game Dev',    labelEn: 'Game Dev',  emoji: '🎮' },
  testing:  { labelPt: 'Testing',     labelEn: 'Testing',   emoji: '🧪' },
}

// hasLocal = arquivo existe em public/assets/icons/{id}.svg
const ICONS_RAW: Array<[string, string, CategoryKey, boolean]> = [
  // id, label, category, hasLocal
  // Backend
  ['nodejs-light',      'Node.js',    'backend',  true],
  ['nodejs-dark',      'Node.js',    'backend',  true],
  ['python-light',      'Python',     'backend',  true],
  ['python-dark',      'Python',     'backend',  true],
  ['java',        'Java',       'backend',  true],
  ['go',          'Go',         'backend',  true],
  ['rust',        'Rust',       'backend',  true],
  ['php',         'PHP',        'backend',  true],
  ['cs',          'C#',         'backend',  false],
  ['cpp',         'C++',        'backend',  false],
  ['c',           'C',          'backend',  false],
  ['ruby',        'Ruby',       'backend',  false],
  ['elixir',      'Elixir',     'backend',  false],
  ['scala',       'Scala',      'backend',  false],
  ['django',      'Django',     'backend',  false],
  ['flask',       'Flask',      'backend',  false],
  ['fastapi',     'FastAPI',    'backend',  false],
  ['spring',      'Spring',     'backend',  true],
  ['express',     'Express',    'backend',  true],
  ['rails',       'Rails',      'backend',  false],
  ['laravel',     'Laravel',    'backend',  true],
  ['nestjs',      'NestJS',     'backend',  false],
  ['bun',         'Bun',        'backend',  false],
  ['deno',        'Deno',       'backend',  false],
  ['nginx',       'Nginx',      'backend',  true],
  // Frontend
  ['react',       'React',      'frontend', true],
  ['vue',         'Vue',        'frontend', true],
  ['angular',     'Angular',    'frontend', false],
  ['nextjs',      'Next.js',    'frontend', false],
  ['svelte',      'Svelte',     'frontend', false],
  ['nuxtjs',      'Nuxt',       'frontend', false],
  ['astro',       'Astro',      'frontend', false],
  ['ts',          'TypeScript', 'frontend', true],
  ['js',          'JavaScript', 'frontend', true],
  ['html',        'HTML',       'frontend', true],
  ['css',         'CSS',        'frontend', true],
  ['tailwind',    'Tailwind',   'frontend', true],
  ['sass',        'Sass',       'frontend', true],
  ['figma',       'Figma',      'frontend', true],
  ['redux',       'Redux',      'frontend', false],
  ['vite',        'Vite',       'frontend', true],
  ['webpack',     'Webpack',    'frontend', false],
  // DevOps
  ['docker',      'Docker',     'devops',   true],
  ['kubernetes',  'K8s',        'devops',   true],
  ['linux',       'Linux',      'devops',   true],
  ['ubuntu',      'Ubuntu',     'devops',   false],
  ['bash',        'Bash',       'devops',   false],
  ['terraform',   'Terraform',  'devops',   false],
  ['ansible',     'Ansible',    'devops',   false],
  ['githubactions','GH Actions','devops',   true],
  ['jenkins',     'Jenkins',    'devops',   false],
  ['grafana',     'Grafana',    'devops',   false],
  ['prometheus',  'Prometheus', 'devops',   false],
  // Database
  ['postgresql',  'PostgreSQL', 'database', true],
  ['mysql',       'MySQL',      'database', true],
  ['mongodb',     'MongoDB',    'database', true],
  ['redis',       'Redis',      'database', true],
  ['sqlite',      'SQLite',     'database', true],
  ['firebase',    'Firebase',   'database', false],
  ['supabase',    'Supabase',   'database', false],
  ['elasticsearch','Elastic',   'database', false],
  ['neo4j',       'Neo4j',      'database', false],
  ['prisma',      'Prisma',     'database', false],
  // Mobile
  ['flutter',     'Flutter',    'mobile',   true],
  ['kotlin',      'Kotlin',     'mobile',   true],
  ['swift',       'Swift',      'mobile',   true],
  ['dart',        'Dart',       'mobile',   false],
  ['androidstudio','Android',   'mobile',   true],
  ['xcode',       'Xcode',      'mobile',   false],
  ['expo',        'Expo',       'mobile',   false],
  // Tools
  ['git',         'Git',        'tools',    true],
  ['github',      'GitHub',     'tools',    true],
  ['gitlab',      'GitLab',     'tools',    false],
  ['vscode',      'VS Code',    'tools',    true],
  ['vim',         'Vim',        'tools',    false],
  ['neovim',      'NeoVim',     'tools',    false],
  ['postman',     'Postman',    'tools',    true],
  ['jest',        'Jest',       'tools',    true],
  ['vitest',      'Vitest',     'tools',    false],
  ['cypress',     'Cypress',    'tools',    true],
  ['selenium',    'Selenium',   'tools',    true],
  ['electron',    'Electron',   'tools',    false],
  // AI/ML
  ['pytorch',     'PyTorch',    'ai',       true],
  ['tensorflow',  'TensorFlow', 'ai',       true],
  ['sklearn',     'Sklearn',    'ai',       true],
  ['opencv',      'OpenCV',     'ai',       true],
  ['numpy',       'NumPy',      'ai',       false],
  ['pandas',      'Pandas',     'ai',       false],
  ['jupyter',     'Jupyter',    'ai',       false],
  // Cloud
  ['aws',         'AWS',        'cloud',    true],
  ['gcp',         'GCP',        'cloud',    true],
  ['azure',       'Azure',      'cloud',    true],
  ['vercel',      'Vercel',     'cloud',    true],
  ['netlify',     'Netlify',    'cloud',    false],
  ['heroku',      'Heroku',     'cloud',    false],
  ['cloudflare',  'Cloudflare', 'cloud',    false],
  // Design
  ['figma',       'Figma',      'design',   true],
  ['blender',     'Blender',    'design',   false],
  // Game Dev
  ['unity',       'Unity',      'gamedev',  true],
  ['unreal',      'Unreal',     'gamedev',  true],
  ['godot',       'Godot',      'gamedev',  true],
  // Testing
  ['jest',        'Jest',       'testing',  true],
  ['vitest',      'Vitest',     'testing',  false],
  ['cypress',     'Cypress',    'testing',  true],
  ['selenium',    'Selenium',   'testing',  true],
  ['postman',     'Postman',    'testing',  true],
]

// Deduplicate by id
const seen = new Set<string>()
export const ALL_ICONS: IconDef[] = ICONS_RAW
  .filter(([id]) => { if(seen.has(id)) return false; seen.add(id); return true })
  .map(([id, label, category, hasLocal]) => ({ id, label, category, hasLocal }))

export function getIconsByCategory(cat: CategoryKey): IconDef[] {
  return ALL_ICONS.filter(ic => ic.category === cat)
}

export function searchIcons(query: string): IconDef[] {
  const q = query.toLowerCase()
  return ALL_ICONS.filter(ic =>
    ic.id.includes(q) || ic.label.toLowerCase().includes(q)
  )
}

// Returns the path to use in <img src> for preview
export function getIconPreviewSrc(id: string, source: 'local' | 'external'): string {
  if (source === 'local') return `assets/icons/${id}.svg`
  return `assets/icons/${id}.svg` // always local in offline-first mode
}

// Returns the path to embed in the generated Markdown
export function getIconMarkdownSrc(id: string): string {
  // Points to the repo's own assets — works after the user pushes their README repo
  return `./assets/icons/${id}.svg`
}
