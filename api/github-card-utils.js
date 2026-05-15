function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function getTheme(theme) {
  const themes = {
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
  return themes[theme] || themes.dark
}

function card(width, height, colors, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="${colors.bg}" stroke="${colors.border}"/>
  <line x1="26" y1="70" x2="${width - 26}" y2="70" stroke="${colors.border}" stroke-width="1"/>
  ${body}
</svg>`
}

function title(text, x, y, colors) {
  return `<text x="${x}" y="${y}" fill="${colors.title}" font-size="18" font-weight="700" font-family="Arial, sans-serif">${esc(text)}</text>`
}

function subtitle(text, x, y, colors) {
  return `<text x="${x}" y="${y}" fill="${colors.muted}" font-size="12" font-family="Arial, sans-serif">${esc(text)}</text>`
}

function statBlock(label, value, x, y, width, accent, colors) {
  return `
    <rect x="${x}" y="${y - 25}" width="${width}" height="50" rx="8" fill="${colors.panel}" stroke="${colors.border}"/>
    <rect x="${x}" y="${y - 25}" width="3" height="50" rx="1.5" fill="${accent}"/>
    <text x="${x + 18}" y="${y - 4}" fill="${colors.muted}" font-size="11" font-family="Arial, sans-serif">${esc(label)}</text>
    <text x="${x + 18}" y="${y + 17}" fill="${colors.text}" font-size="18" font-weight="700" font-family="Arial, sans-serif">${esc(value)}</text>
  `
}

function numberBlock(value, label, x, y, width, color, colors) {
  return `
    <rect x="${x}" y="${y - 23}" width="${width}" height="78" rx="10" fill="${colors.panel}" stroke="${colors.border}"/>
    <text x="${x + width / 2}" y="${y + 14}" fill="${color}" font-size="32" font-weight="800" text-anchor="middle" font-family="Arial, sans-serif">${esc(value)}</text>
    <text x="${x + width / 2}" y="${y + 39}" fill="${colors.muted}" font-size="12" text-anchor="middle" font-family="Arial, sans-serif">${esc(label)}</text>
  `
}

function rankBadge(rank, x, y, colors) {
  return `
    <rect x="${x}" y="${y - 18}" width="62" height="28" rx="14" fill="${colors.panel}" stroke="${colors.border}"/>
    <text x="${x + 31}" y="${y}" fill="${colors.accent}" font-size="13" font-weight="700" text-anchor="middle" font-family="Arial, sans-serif">${esc(rank)}</text>
  `
}

function parseNumber(value, fallback) {
  const parsed = Number(String(value || '').trim())
  return Number.isFinite(parsed) ? parsed : fallback
}

function parseLanguages(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(item => item && item.label && Number.isFinite(Number(item.value)) && item.color)
      .slice(0, 5)
  } catch {
    return []
  }
}

function buildGithubStatsSvg(params) {
  const colors = getTheme(params.theme)
  return card(520, 255, colors, `
    ${title(`GitHub Stats`, 24, 30, colors)}
    ${subtitle(params.username, 26, 48, colors)}
    ${rankBadge(calcRank([params.stars, params.commits, params.prs, params.issues, params.contributed]), 420, 40, colors)}
    ${statBlock('Total Stars', params.stars, 26, 105, 218, colors.accent, colors)}
    ${statBlock('Total Commits', params.commits, 276, 105, 218, colors.accent2, colors)}
    ${statBlock('Pull Requests', params.prs, 26, 160, 218, colors.title, colors)}
    ${statBlock('Issues', params.issues, 276, 160, 218, '#f85149', colors)}
    ${statBlock('Public Repos', params.contributed, 26, 215, 468, '#a371f7', colors)}
  `)
}

function buildGithubStreakSvg(params) {
  const colors = getTheme(params.theme)
  return card(520, 200, colors, `
    ${title('Contribution Streak', 24, 38, colors)}
    ${subtitle(params.username, 26, 60, colors)}
    ${numberBlock(params.currentStreak, 'Current streak', 26, 105, 140, colors.accent, colors)}
    ${numberBlock(params.longestStreak, 'Longest streak', 190, 105, 140, colors.accent2, colors)}
    ${numberBlock(params.totalContribs, 'Contributions', 354, 105, 140, colors.title, colors)}
    <text x="26" y="185" fill="${colors.muted}" font-size="11" font-family="Arial, sans-serif">Based on public GitHub activity available to the API</text>
  `)
}

function buildTopLangsSvg(params) {
  const colors = getTheme(params.theme)
  const langs = parseLanguages(params.languagesJson)
  const rows = langs.length ? langs : [
    { label: 'TypeScript', value: 45, color: '#3178c6' },
    { label: 'JavaScript', value: 30, color: '#f1e05a' },
    { label: 'CSS', value: 15, color: '#563d7c' },
    { label: 'HTML', value: 10, color: '#e34c26' },
  ]
  const rowsSvg = rows.map((lang, index) => {
    const y = 97 + index * 31
    return `
      <circle cx="32" cy="${y - 4}" r="5" fill="${esc(lang.color)}"/>
      <text x="48" y="${y}" fill="${colors.text}" font-size="13" font-family="Arial, sans-serif">${esc(lang.label)}</text>
      <text x="228" y="${y}" fill="${colors.muted}" font-size="12" text-anchor="end" font-family="Arial, sans-serif">${lang.value}%</text>
      <rect x="250" y="${y - 12}" width="230" height="9" rx="4.5" fill="${colors.panel}" stroke="${colors.border}"/>
      <rect x="250" y="${y - 12}" width="${Math.round(lang.value * 2.3)}" height="9" rx="4.5" fill="${esc(lang.color)}"/>
    `
  }).join('')

  return card(520, 250, colors, `
    ${title('Top Languages', 24, 32, colors)}
    ${subtitle('Repository language breakdown', 26, 55, colors)}
    ${rowsSvg}
  `)
}

function calcRank(values) {
  const [stars, commits, prs, issues, contributed] = values.map(toNum)
  const score = stars * 2 + commits / 20 + prs * 4 + issues * 2 + contributed * 3
  if (score >= 900) return 'S+'
  if (score >= 600) return 'S'
  if (score >= 350) return 'A+'
  if (score >= 180) return 'A'
  if (score >= 80) return 'B+'
  return 'README'
}

function toNum(value) {
  return Number(String(value).replace(/[^\d.-]/g, '')) || 0
}

module.exports = {
  buildGithubStatsSvg,
  buildGithubStreakSvg,
  buildTopLangsSvg,
}
