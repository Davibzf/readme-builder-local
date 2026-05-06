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
  ['java-dark',        'Java',       'backend',  true],
  ['java-light',        'Java',       'backend',  true],
  ['golang',          'Go',         'backend',  true],
  ['rust',        'Rust',       'backend',  true],
  ['php-dark',         'PHP',        'backend',  true],
  ['php-light',         'PHP',        'backend',  true],
  ['cs',           'C#',         'backend',  false],
  ['cpp',         'C++',        'backend',  false],
  ['c',           'C',          'backend',  false],
  ['ruby',        'Ruby',       'backend',  false],
  ['elixir-dark',      'Elixir',     'backend',  false],
  ['elixir-light',      'Elixir',     'backend',  false],
  ['scala-dark',       'Scala',      'backend',  false],
  ['scala-light',       'Scala',      'backend',  false],
  ['django',      'Django',     'backend',  false],
  ['flask-dark',       'Flask',      'backend',  false],
  ['flask-light',       'Flask',      'backend',  false],
  ['fastapi',     'FastAPI',    'backend',  false],
  ['spring-dark',      'Spring',     'backend',  true],
  ['spring-light',      'Spring',     'backend',  true],
  ['expressjs-dark',     'Express',    'backend',  true],
  ['expressjs-light',     'Express',    'backend',  true],
  ['rails',       'Rails',      'backend',  false],
  ['laravel-dark',     'Laravel',    'backend',  true],
  ['laravel-light',     'Laravel',    'backend',  true],
  ['nestjs-dark',      'NestJS',     'backend',  false],
  ['nestjs-light',      'NestJS',     'backend',  false],
  ['bun-dark',         'Bun',        'backend',  false],
  ['bun-light',         'Bun',        'backend',  false],
  ['deno-dark',        'Deno',       'backend',  false],
  ['deno-light',        'Deno',       'backend',  false],
  ['nginx',       'Nginx',      'backend',  true],
  // Frontend
  ['react-dark',       'React',      'frontend', true],
  ['react-light',       'React',      'frontend', true],
  ['vuejs-dark',         'Vue',        'frontend', true],
  ['vuejs-light',         'Vue',        'frontend', true],
  ['angular-dark',     'Angular',    'frontend', false],
  ['angular-light',     'Angular',    'frontend', false],
  ['nextjs-dark',      'Next.js',    'frontend', false],
  ['nextjs-light',      'Next.js',    'frontend', false],
  ['svelte',      'Svelte',     'frontend', false],
  ['nuxtjs-dark',      'Nuxt',       'frontend', false],
  ['nuxtjs-light',      'Nuxt',       'frontend', false],
  ['astro',       'Astro',      'frontend', false],
  ['typescript',          'TypeScript', 'frontend', true],
  ['javascript',          'JavaScript', 'frontend', true],
  ['html',        'HTML',       'frontend', true],
  ['css',         'CSS',        'frontend', true],
  ['tailwindcss-dark',    'Tailwind',   'frontend', true],
  ['tailwindcss-light',    'Tailwind',   'frontend', true],
  ['sass',        'Sass',       'frontend', true],
  ['figma-dark',       'Figma',      'frontend', true],
  ['figma-light',       'Figma',      'frontend', true],
  ['redux',       'Redux',      'frontend', false],
  ['vite-dark',        'Vite',       'frontend', true],
  ['vite-light',        'Vite',       'frontend', true],
  ['webpack-dark',     'Webpack',    'frontend', false],
  ['webpack-light',     'Webpack',    'frontend', false],
  // DevOps 
  ['docker',      'Docker',     'devops',   true],
  ['kubernetes',  'K8s',        'devops',   true],
  ['linux-dark',       'Linux',      'devops',   true],
  ['linux-light',       'Linux',      'devops',   true],
  ['ubuntu-dark',      'Ubuntu',     'devops',   false],
  ['ubuntu-light',      'Ubuntu',     'devops',   false],
  ['bash-dark',        'Bash',       'devops',   false],
  ['bash-light',        'Bash',       'devops',   false],
  ['terraform-dark',   'Terraform',  'devops',   false],
  ['terraform-light',   'Terraform',  'devops',   false],
  ['ansible',     'Ansible',    'devops',   false],
  ['githubactions-dark','GH Actions','devops',   true],
  ['githubactions-light','GH Actions','devops',   true],
  ['jenkins-dark',     'Jenkins',    'devops',   false],
  ['jenkins-light',     'Jenkins',    'devops',   false],
  ['grafana-dark',     'Grafana',    'devops',   false],
  ['grafana-light',     'Grafana',    'devops',   false],
  ['prometheus',  'Prometheus', 'devops',   false],
  // Database
  ['postgresql-dark',  'PostgreSQL', 'database', true],
  ['postgresql-light',  'PostgreSQL', 'database', true],
  ['mysql-dark',       'MySQL',      'database', true],
  ['mysql-light',       'MySQL',      'database', true],
  ['mongodb',     'MongoDB',    'database', true],
  ['redis-dark',       'Redis',      'database', true],
  ['redis-light',       'Redis',      'database', true],
  ['sqlite',      'SQLite',     'database', true],
  ['firebase',    'Firebase',   'database', false],
  ['supabase-dark',    'Supabase',   'database', false],
  ['supabase-light',    'Supabase',   'database', false],
  ['elasticsearch-dark','Elastic',   'database', false],
  ['elasticsearch-light','Elastic',   'database', false],
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
export function getIconPreviewSrc(id: string): string {
  return `assets/icons/${id}.svg`
}

// Returns the path to embed in the generated Markdown
export function getIconMarkdownSrc(id: string): string {
  // Points to the repo's own assets — works after the user pushes their README repo
  return `./assets/icons/${id}.svg`
}
