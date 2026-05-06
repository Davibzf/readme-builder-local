// ============================================================
//  generators/github-stats.ts
//  Local SVG GitHub stats cards. No external card service.
// ============================================================
import type { AppState, PinnedProject } from '../types'

type LangItem = { label: string; value: number; color: string }

const THEME_COLORS: Record<string, {
  bg: string
  panel: string
  border: string
  title: string
  text: string
  muted: string
  accent: string
  accent2: string
}> = {
  dark: {
    bg: '#0d1117', panel: '#161b22', border: '#30363d', title: '#58a6ff',
    text: '#e6edf3', muted: '#8b949e', accent: '#3fb950', accent2: '#d29922',
  },
  radical: {
    bg: '#141321', panel: '#1f1b31', border: '#2f2a4a', title: '#fe428e',
    text: '#f8d847', muted: '#a9a6c3', accent: '#a9fef7', accent2: '#f8d847',
  },
  tokyonight: {
    bg: '#1a1b27', panel: '#222436', border: '#2f334d', title: '#70a5fd',
    text: '#c0caf5', muted: '#7982a9', accent: '#7dcfff', accent2: '#bb9af7',
  },
  merko: {
    bg: '#0a0f0b', panel: '#111a12', border: '#243324', title: '#abd200',
    text: '#dfedd6', muted: '#8ca184', accent: '#b7d364', accent2: '#68b587',
  },
  gruvbox: {
    bg: '#282828', panel: '#32302f', border: '#504945', title: '#fabd2f',
    text: '#ebdbb2', muted: '#a89984', accent: '#b8bb26', accent2: '#83a598',
  },
  dracula: {
    bg: '#282a36', panel: '#343746', border: '#44475a', title: '#ff79c6',
    text: '#f8f8f2', muted: '#bd93f9', accent: '#50fa7b', accent2: '#8be9fd',
  },
  nord: {
    bg: '#2e3440', panel: '#3b4252', border: '#4c566a', title: '#88c0d0',
    text: '#eceff4', muted: '#d8dee9', accent: '#a3be8c', accent2: '#ebcb8b',
  },
  catppuccin_mocha: {
    bg: '#1e1e2e', panel: '#292a3d', border: '#45475a', title: '#cba6f7',
    text: '#cdd6f4', muted: '#a6adc8', accent: '#a6e3a1', accent2: '#f9e2af',
  },
  onedark: {
    bg: '#282c34', panel: '#323842', border: '#3f4754', title: '#61afef',
    text: '#abb2bf', muted: '#828997', accent: '#98c379', accent2: '#e5c07b',
  },
  cobalt: {
    bg: '#193549', panel: '#224760', border: '#2d5d7c', title: '#ffc600',
    text: '#ffffff', muted: '#9dd3ff', accent: '#3ad900', accent2: '#ff9d00',
  },
  'material-palenight': {
    bg: '#292d3e', panel: '#33384d', border: '#444a63', title: '#c792ea',
    text: '#a6accd', muted: '#676e95', accent: '#c3e88d', accent2: '#ffcb6b',
  },
  aura: {
    bg: '#15141b', panel: '#1f1d2b', border: '#3a3652', title: '#a277ff',
    text: '#edecee', muted: '#8d8aa8', accent: '#61ffca', accent2: '#ffca85',
  },
  github_dark: {
    bg: '#0d1117', panel: '#161b22', border: '#30363d', title: '#58a6ff',
    text: '#c9d1d9', muted: '#8b949e', accent: '#3fb950', accent2: '#f85149',
  },
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Dart: '#00B4AB',
  Shell: '#89e051',
}

const ICON_LANGUAGE_MAP: Record<string, string> = {
  js: 'JavaScript',
  ts: 'TypeScript',
  react: 'TypeScript',
  vue: 'TypeScript',
  angular: 'TypeScript',
  svelte: 'TypeScript',
  python: 'Python',
  'python-dark': 'Python',
  'python-light': 'Python',
  java: 'Java',
  'java-dark': 'Java',
  'java-light': 'Java',
  golang: 'Go',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP',
  'php-dark': 'PHP',
  'php-light': 'PHP',
  html: 'HTML',
  css: 'CSS',
  kotlin: 'Kotlin',
  swift: 'Swift',
  dart: 'Dart',
  bash: 'Shell',
}

export function generateGithubStatsCard(state: AppState): string {
  const fields = state.plugins.stats?.fields ?? {}
  const username = state.profile.username || 'seu-username'
  const colors = getTheme(state.statsTheme)
  const stars = field(fields, 'stars', String(sumProjects(state.projects, 'stars')))
  const commits = field(fields, 'commits', '0')
  const prs = field(fields, 'prs', '0')
  const issues = field(fields, 'issues', '0')
  const contributed = field(fields, 'contributed', '0')
  const rank = calcRank([stars, commits, prs, issues, contributed])

  return card(515, 250, colors, `
    ${title('GitHub Stats', 26, 38, colors)}
    ${subtitle(username, 26, 60, colors)}
    ${rankBadge(rank, 432, 30, colors)}
    ${statBlock('Total Stars', stars, 26, 94, 218, colors.accent, colors)}
    ${statBlock('Total Commits', commits, 276, 94, 218, colors.accent2, colors)}
    ${statBlock('Pull Requests', prs, 26, 148, 218, colors.title, colors)}
    ${statBlock('Issues', issues, 276, 148, 218, '#f85149', colors)}
    ${statBlock('Public Repos', contributed, 26, 202, 468, '#a371f7', colors)}
  `)
}

export function generateGithubStreakCard(state: AppState): string {
  const fields = state.plugins.streak?.fields ?? {}
  const username = state.profile.username || 'seu-username'
  const colors = getTheme(state.statsTheme)
  const current = field(fields, 'currentStreak', '0')
  const longest = field(fields, 'longestStreak', '0')
  const total = field(fields, 'totalContribs', '0')

  return card(520, 220, colors, `
    ${title('Contribution Streak', 26, 38, colors)}
    ${subtitle(username, 26, 60, colors)}
    ${numberBlock(current, 'Current streak', 26, 112, 140, colors.accent, colors)}
    ${numberBlock(longest, 'Longest streak', 190, 112, 140, colors.accent2, colors)}
    ${numberBlock(total, 'Contributions', 354, 112, 140, colors.title, colors)}
    <text x="26" y="190" fill="${colors.muted}" font-size="11" font-family="Arial, sans-serif">Based on public GitHub activity available to the API</text>
  `)
}

export function generateTopLangsCard(state: AppState): string {
  const colors = getTheme(state.statsTheme)
  const langs = getTopLanguages(state)
  const rows = langs.map((lang, index) => {
    const y = 99 + index * 32
    return `
      <circle cx="32" cy="${y - 4}" r="5" fill="${esc(lang.color)}"/>
      <text x="48" y="${y}" fill="${colors.text}" font-size="13" font-family="Arial, sans-serif">${esc(lang.label)}</text>
      <text x="228" y="${y}" fill="${colors.muted}" font-size="12" text-anchor="end" font-family="Arial, sans-serif">${lang.value}%</text>
      <rect x="250" y="${y - 12}" width="230" height="9" rx="4.5" fill="${colors.panel}" stroke="${colors.border}"/>
      <rect x="250" y="${y - 12}" width="${Math.round(lang.value * 2.3)}" height="9" rx="4.5" fill="${esc(lang.color)}"/>
    `
  }).join('')

  return card(520, 250, colors, `
    ${title('Top Languages', 26, 35, colors)}
    ${subtitle('Repository language breakdown', 26, 58, colors)}
    ${rows}
  `)
}

export function svgToDataURI(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function card(width: number, height: number, colors: ReturnType<typeof getTheme>, body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="${colors.bg}" stroke="${colors.border}"/>
  <line x1="26" y1="70" x2="${width - 26}" y2="70" stroke="${colors.border}" stroke-width="1"/>
  ${body}
</svg>`
}

function title(text: string, x: number, y: number, colors: ReturnType<typeof getTheme>): string {
  return `<text x="${x}" y="${y}" fill="${colors.title}" font-size="18" font-weight="700" font-family="Arial, sans-serif">${esc(text)}</text>`
}

function subtitle(text: string, x: number, y: number, colors: ReturnType<typeof getTheme>): string {
  return `<text x="${x}" y="${y}" fill="${colors.muted}" font-size="12" font-family="Arial, sans-serif">${esc(text)}</text>`
}

function statBlock(label: string, value: string, x: number, y: number, width: number, accent: string, colors: ReturnType<typeof getTheme>): string {
  return `
    <rect x="${x}" y="${y - 25}" width="${width}" height="50" rx="8" fill="${colors.panel}" stroke="${colors.border}"/>
    <rect x="${x}" y="${y - 25}" width="3" height="50" rx="1.5" fill="${accent}"/>
    <text x="${x + 18}" y="${y - 4}" fill="${colors.muted}" font-size="11" font-family="Arial, sans-serif">${esc(label)}</text>
    <text x="${x + 18}" y="${y + 17}" fill="${colors.text}" font-size="18" font-weight="700" font-family="Arial, sans-serif">${esc(value)}</text>
  `
}

function numberBlock(value: string, label: string, x: number, y: number, width: number, color: string, colors: ReturnType<typeof getTheme>): string {
  return `
    <rect x="${x}" y="${y - 23}" width="${width}" height="78" rx="10" fill="${colors.panel}" stroke="${colors.border}"/>
    <text x="${x + width / 2}" y="${y + 14}" fill="${color}" font-size="32" font-weight="800" text-anchor="middle" font-family="Arial, sans-serif">${esc(value)}</text>
    <text x="${x + width / 2}" y="${y + 39}" fill="${colors.muted}" font-size="12" text-anchor="middle" font-family="Arial, sans-serif">${esc(label)}</text>
  `
}

function rankBadge(rank: string, x: number, y: number, colors: ReturnType<typeof getTheme>): string {
  return `
    <rect x="${x}" y="${y - 18}" width="62" height="28" rx="14" fill="${colors.panel}" stroke="${colors.border}"/>
    <text x="${x + 31}" y="${y}" fill="${colors.accent}" font-size="13" font-weight="700" text-anchor="middle" font-family="Arial, sans-serif">${esc(rank)}</text>
  `
}

function getTheme(theme: string) {
  return THEME_COLORS[theme] ?? THEME_COLORS.dark
}

function field(fields: Record<string, string>, key: string, fallback: string): string {
  const value = fields[key]?.trim()
  return value || fallback
}

function sumProjects(projects: PinnedProject[], key: 'stars' | 'forks'): number {
  return projects.filter(p => p.enabled).reduce((sum, p) => sum + (Number(p[key]) || 0), 0)
}

function calcRank(values: string[]): string {
  const [stars, commits, prs, issues, contributed] = values.map(toNum)
  const score = stars * 2 + commits / 20 + prs * 4 + issues * 2 + contributed * 3
  if (score >= 900) return 'S+'
  if (score >= 600) return 'S'
  if (score >= 350) return 'A+'
  if (score >= 180) return 'A'
  if (score >= 80) return 'B+'
  return 'Builder'
}

function toNum(value: string): number {
  return Number(value.replace(/[^\d.-]/g, '')) || 0
}

function getTopLanguages(state: AppState): LangItem[] {
  const counts = new Map<string, { value: number; color: string }>()

  // Count from projects
  for (const project of state.projects.filter(p => p.enabled && p.language.trim())) {
    const label = project.language.trim()
    const current = counts.get(label)
    counts.set(label, {
      value: (current?.value ?? 0) + 1 + Math.min(5, Number(project.stars) || 0),
      color: project.languageColor ? `#${project.languageColor.replace('#', '')}` : LANGUAGE_COLORS[label] ?? '#58a6ff',
    })
  }

  // If no projects, count from selected icons
  if (!counts.size) {
    for (const icon of state.icons.selected) {
      const label = ICON_LANGUAGE_MAP[icon]
      if (!label) continue
      const current = counts.get(label)
      counts.set(label, {
        value: (current?.value ?? 0) + 1,
        color: current?.color ?? LANGUAGE_COLORS[label] ?? '#58a6ff',
      })
    }
  }

  // Default if nothing
  if (!counts.size) {
    counts.set('TypeScript', { value: 45, color: LANGUAGE_COLORS.TypeScript })
    counts.set('JavaScript', { value: 30, color: LANGUAGE_COLORS.JavaScript })
    counts.set('CSS', { value: 15, color: LANGUAGE_COLORS.CSS })
    counts.set('HTML', { value: 10, color: LANGUAGE_COLORS.HTML })
  }

  const total = Array.from(counts.values()).reduce((sum, item) => sum + item.value, 0) || 1
  return Array.from(counts.entries())
    .map(([label, item]) => ({
      label,
      color: item.color,
      value: Math.max(1, Math.round((item.value / total) * 100)),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}