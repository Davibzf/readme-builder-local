// ============================================================
//  generators/snake-game.ts
//  GitHub contribution snake support.
// ============================================================
import type { AppState, Lang } from '../types'

type Point = { col: number; row: number }

type Theme = {
  bg: string
  border: string
  empty: string
  levels: string[]
  snake: string
  snakeHead: string
  eye: string
}

const THEMES: Record<string, Theme> = {
  dark: {
    bg: '#0d1117',
    border: '#30363d',
    empty: '#161b22',
    levels: ['#0e4429', '#006d32', '#26a641', '#39d353'],
    snake: '#39d353',
    snakeHead: '#7ee787',
    eye: '#0d1117',
  },
  github_dark: {
    bg: '#0d1117',
    border: '#30363d',
    empty: '#161b22',
    levels: ['#0e4429', '#006d32', '#26a641', '#39d353'],
    snake: '#39d353',
    snakeHead: '#7ee787',
    eye: '#0d1117',
  },
  radical: {
    bg: '#141321',
    border: '#2f2a4a',
    empty: '#1f1b31',
    levels: ['#3a244a', '#6f3e78', '#b84e8a', '#fe428e'],
    snake: '#a9fef7',
    snakeHead: '#f8d847',
    eye: '#141321',
  },
  tokyonight: {
    bg: '#1a1b27',
    border: '#2f334d',
    empty: '#222436',
    levels: ['#213d5b', '#2b5b84', '#3d7eb3', '#7dcfff'],
    snake: '#9ece6a',
    snakeHead: '#73daca',
    eye: '#1a1b27',
  },
  dracula: {
    bg: '#282a36',
    border: '#44475a',
    empty: '#343746',
    levels: ['#3f5f44', '#4e7d55', '#50fa7b', '#8be9fd'],
    snake: '#50fa7b',
    snakeHead: '#8be9fd',
    eye: '#282a36',
  },
  nord: {
    bg: '#2e3440',
    border: '#4c566a',
    empty: '#3b4252',
    levels: ['#4d6650', '#64805e', '#8fbc8f', '#a3be8c'],
    snake: '#a3be8c',
    snakeHead: '#88c0d0',
    eye: '#2e3440',
  },
}

const WIDTH = 760
const HEIGHT = 130
const COLS = 52
const ROWS = 7
const CELL = 10
const GAP = 3
const GRID_X = 42
const GRID_Y = 20
const SEGMENTS = 22
const DURATION = '9s'

export function generateSnakePreviewSVG(state: AppState): string {
  const theme = THEMES[state.statsTheme] ?? THEMES.dark
  const username = state.profile.username?.trim() || 'seu-username'
  const seed = hash(`${username}:${state.profile.displayName}:${state.icons.selected.join(',')}`)
  const grid = buildContributionGrid(seed, theme)
  const path = buildPath()

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="GitHub contribution snake preview">
  <rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}" rx="10" fill="${theme.bg}" stroke="${theme.border}"/>
  <g>${grid}</g>
  <g>${buildSnake(path, theme)}</g>
</svg>`
}

export function generateSnakeReadmeSection(username: string, lang: Lang): string {
  const user = sanitizeUsername(username) || 'seu-username'
  const base = `https://raw.githubusercontent.com/${user}/${user}/output`
  const light = `${base}/github-contribution-grid-snake.svg`
  const dark = `${base}/github-contribution-grid-snake-dark.svg`
  const summary = lang === 'pt' ? 'Configurar Snake Game' : 'Configure Snake Game'
  const note = lang === 'pt'
    ? 'Crie este arquivo no seu repositório de perfil: `.github/workflows/snake.yml`'
    : 'Create this file in your profile repository: `.github/workflows/snake.yml`'

  return `## Snake Game

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="${dark}" />
  <source media="(prefers-color-scheme: light)" srcset="${light}" />
  <img alt="github contribution grid snake animation" src="${light}" />
</picture>

</div>

<details>
<summary>${summary}</summary>

${note}

\`\`\`yaml
name: Generate Snake

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Generate snake SVG
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: Push snake SVG to output branch
        uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
\`\`\`

</details>`
}

function buildContributionGrid(seed: number, theme: Theme): string {
  const cells: string[] = []
  for (let col = 0; col < COLS; col += 1) {
    for (let row = 0; row < ROWS; row += 1) {
      const level = contributionLevel(seed, col, row)
      cells.push(`<rect x="${cellX(col)}" y="${cellY(row)}" width="${CELL}" height="${CELL}" rx="2" fill="${level ? theme.levels[level - 1] : theme.empty}"/>`)
    }
  }
  return cells.join('')
}

function buildSnake(path: Point[], theme: Theme): string {
  const keyTimes = path.map((_, index) => (index / (path.length - 1)).toFixed(4)).join(';')
  const body: string[] = []

  for (let offset = SEGMENTS - 1; offset >= 0; offset -= 1) {
    const shifted = shiftPath(path, offset)
    const xs = shifted.map(point => cellX(point.col)).join(';')
    const ys = shifted.map(point => cellY(point.row)).join(';')
    const opacity = (0.28 + (SEGMENTS - offset) / SEGMENTS * 0.7).toFixed(2)
    body.push(`<rect x="${cellX(shifted[0].col)}" y="${cellY(shifted[0].row)}" width="${CELL}" height="${CELL}" rx="3" fill="${offset === 0 ? theme.snakeHead : theme.snake}" opacity="${opacity}">
      <animate attributeName="x" values="${xs}" keyTimes="${keyTimes}" dur="${DURATION}" repeatCount="indefinite" calcMode="discrete"/>
      <animate attributeName="y" values="${ys}" keyTimes="${keyTimes}" dur="${DURATION}" repeatCount="indefinite" calcMode="discrete"/>
    </rect>`)
  }

  return `${body.join('')}
  ${eye(path, 7, 3, theme)}
  ${eye(path, 7, 7, theme)}`
}

function eye(path: Point[], dx: number, dy: number, theme: Theme): string {
  const keyTimes = path.map((_, index) => (index / (path.length - 1)).toFixed(4)).join(';')
  return `<circle cx="${cellX(path[0].col) + dx}" cy="${cellY(path[0].row) + dy}" r="1.35" fill="${theme.eye}">
    <animate attributeName="cx" values="${path.map(point => cellX(point.col) + dx).join(';')}" keyTimes="${keyTimes}" dur="${DURATION}" repeatCount="indefinite" calcMode="discrete"/>
    <animate attributeName="cy" values="${path.map(point => cellY(point.row) + dy).join(';')}" keyTimes="${keyTimes}" dur="${DURATION}" repeatCount="indefinite" calcMode="discrete"/>
  </circle>`
}

function buildPath(): Point[] {
  const points: Point[] = []
  for (let col = 0; col < COLS; col += 1) points.push({ col, row: 0 })
  for (let row = 1; row < ROWS; row += 1) points.push({ col: COLS - 1, row })
  for (let col = COLS - 2; col >= 0; col -= 1) points.push({ col, row: ROWS - 1 })
  for (let row = ROWS - 2; row > 0; row -= 1) points.push({ col: 0, row })
  points.push({ col: 0, row: 0 })
  return points
}

function shiftPath(path: Point[], offset: number): Point[] {
  return path.map((_, index) => path[(index - offset + path.length) % path.length])
}

function contributionLevel(seed: number, col: number, row: number): number {
  const value = pseudo(seed + col * 73 + row * 193)
  if (value > 94) return 4
  if (value > 82) return 3
  if (value > 63) return 2
  if (value > 38) return 1
  return 0
}

function cellX(col: number): number {
  return GRID_X + col * (CELL + GAP)
}

function cellY(row: number): number {
  return GRID_Y + row * (CELL + GAP)
}

function hash(value: string): number {
  let result = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index)
    result = Math.imul(result, 16777619)
  }
  return result >>> 0
}

function pseudo(seed: number): number {
  let value = seed >>> 0
  value ^= value << 13
  value ^= value >>> 17
  value ^= value << 5
  return Math.abs(value) % 100
}

function sanitizeUsername(username: string): string {
  return username.trim().replace(/[^a-zA-Z0-9-]/g, '')
}
