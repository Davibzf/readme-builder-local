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
  ['flutter-dark',     'Flutter',    'mobile',   true],
  ['flutter-light',     'Flutter',    'mobile',   true],
  ['kotlin-dark',      'Kotlin',     'mobile',   true],
  ['kotlin-light',      'Kotlin',     'mobile',   true],
  ['swift',       'Swift',      'mobile',   true],
  ['dart-dark',        'Dart',       'mobile',   false],
  ['dart-light',        'Dart',       'mobile',   false],
  ['androidstudio-dark','Android',   'mobile',   true],
  ['androidstudio-light','Android',   'mobile',   true],
  ['xcode',       'Xcode',      'mobile',   false],
  ['expo',        'Expo',       'mobile',   false],
  // Tools
  ['git',         'Git',        'tools',    true],
  ['github-dark',      'GitHub',     'tools',    true],
  ['github-light',      'GitHub',     'tools',    true],
  ['gitlab-dark',      'GitLab',     'tools',    false],
  ['gitlab-light',      'GitLab',     'tools',    false],
  ['vscode-dark',      'VS Code',    'tools',    true],
  ['vscode-light',      'VS Code',    'tools',    true],
  ['vim-dark',         'Vim',        'tools',    false],
  ['vim-light',         'Vim',        'tools',    false],
  ['neovim-dark',      'NeoVim',     'tools',    false],
  ['neovim-light',      'NeoVim',     'tools',    false],
  ['postman',     'Postman',    'tools',    true],
  ['electron',    'Electron',   'tools',    false],
  // AI/ML
  ['pytorch-dark',     'PyTorch',    'ai',       true],
  ['pytorch-light',     'PyTorch',    'ai',       true],
  ['tensorflow-dark',  'TensorFlow', 'ai',       true],
  ['tensorflow-light',  'TensorFlow', 'ai',       true],
  ['scikitlearn',     'Sklearn',    'ai',       true],
  ['opencv-dark',      'OpenCV',     'ai',       true],
  ['opencv-light',      'OpenCV',     'ai',       true],
  ['numpy',       'NumPy',      'ai',       false],
  ['pandas',      'Pandas',     'ai',       false],
  ['jupyter',     'Jupyter',    'ai',       false],
  // Cloud
  ['aws-dark',         'AWS',        'cloud',    true],
  ['aws-light',         'AWS',        'cloud',    true],
  ['gcp-dark',         'GCP',        'cloud',    true],
  ['gcp-light',         'GCP',        'cloud',    true],
  ['azure-dark',       'Azure',      'cloud',    true],
  ['azure-light',       'Azure',      'cloud',    true],
  ['vercel-dark',      'Vercel',     'cloud',    true],
  ['vercel-light',      'Vercel',     'cloud',    true],
  ['netlify-dark',     'Netlify',    'cloud',    false],
  ['netlify-light',     'Netlify',    'cloud',    false],
  ['heroku',      'Heroku',     'cloud',    false],
  ['cloudflare-dark',  'Cloudflare', 'cloud',    false],
  ['cloudflare-light',  'Cloudflare', 'cloud',    false],
  // Design
  ['figma-dark',       'Figma',      'design',   true],
  ['figma-light',       'Figma',      'design',   true],
  ['blender-dark',     'Blender',    'design',   false],
  ['blender-light',     'Blender',    'design',   false],
  // Game Dev
  ['unity-dark',       'Unity',      'gamedev',  true],
  ['unity-light',       'Unity',      'gamedev',  true],
  ['unrealengine',      'Unreal',     'gamedev',  true],
  ['godot-dark',       'Godot',      'gamedev',  true],
  ['godot-light',       'Godot',      'gamedev',  true],
  // Testing
  ['jest',        'Jest',       'testing',  true],
  ['vitest-dark',      'Vitest',     'tools',    false],
  ['vitest-light',      'Vitest',     'tools',    false],
  ['cypress-dark',     'Cypress',    'tools',    true],
  ['cypress-light',     'Cypress',    'tools',    true],
  ['selenium',    'Selenium',   'testing',  true],
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
