import { AppState } from '../types'

export function generateSnakePreviewSVG(state: AppState): string {
  const username = state.profile.username || 'user'
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="680" height="240" viewBox="0 0 680 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="240" rx="24" fill="#0d1117" />
  <text x="50%" y="40" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" fill="#c9d1d9">Snake Preview</text>
  <text x="50%" y="120" text-anchor="middle" font-family="Inter, sans-serif" font-size="18" fill="#8b949e">${username}</text>
  <rect x="80" y="150" width="520" height="50" rx="12" fill="#238636" />
  <text x="50%" y="184" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" fill="white">100% local game preview</text>
</svg>`
}

export function generateSnakeReadmeSection(user: string, lang: string): string {
  const title = lang === 'pt' ? 'Jogo de Snake' : 'Snake Game'
  const description = lang === 'pt'
    ? 'Brinque com o serpentinho localmente e personalize seu README com um preview de jogo.'
    : 'Play a local snake game preview and add a fun section to your README.'

  return `## 🐍 ${title}

${description}

<div align="center">
  <img src="https://via.placeholder.com/680x240?text=Snake+Preview" alt="Snake preview" />
</div>`
}
