// ============================================================
//  generators/service-cards.ts
//  Local SVG cards for optional profile services.
// ============================================================
import type { AppState, PluginId } from '../types'

type ServiceId = Extract<PluginId, 'wakatime' | 'spotify' | 'leetcode' | 'codewars' | 'hackerrank'>

type Theme = {
  bg: string
  panel: string
  border: string
  title: string
  text: string
  muted: string
  accent: string
}

type ServiceCard = {
  title: string
  subtitle: string
  accent: string
  metricA: string
  metricB: string
  metricC: string
}

const THEMES: Record<string, Theme> = {
  dark: {
    bg: '#0d1117', panel: '#161b22', border: '#30363d', title: '#58a6ff',
    text: '#e6edf3', muted: '#8b949e', accent: '#3fb950',
  },
  github_dark: {
    bg: '#0d1117', panel: '#161b22', border: '#30363d', title: '#58a6ff',
    text: '#c9d1d9', muted: '#8b949e', accent: '#3fb950',
  },
  radical: {
    bg: '#141321', panel: '#1f1b31', border: '#2f2a4a', title: '#fe428e',
    text: '#f8d847', muted: '#a9a6c3', accent: '#a9fef7',
  },
  tokyonight: {
    bg: '#1a1b27', panel: '#222436', border: '#2f334d', title: '#70a5fd',
    text: '#c0caf5', muted: '#7982a9', accent: '#7dcfff',
  },
  dracula: {
    bg: '#282a36', panel: '#343746', border: '#44475a', title: '#ff79c6',
    text: '#f8f8f2', muted: '#bd93f9', accent: '#50fa7b',
  },
  nord: {
    bg: '#2e3440', panel: '#3b4252', border: '#4c566a', title: '#88c0d0',
    text: '#eceff4', muted: '#d8dee9', accent: '#a3be8c',
  },
}

const SERVICE_META: Record<ServiceId, { title: string; icon: string; color: string }> = {
  wakatime: { title: 'WakaTime', icon: 'WT', color: '#7c3aed' },
  spotify: { title: 'Spotify Now Playing', icon: 'SP', color: '#1DB954' },
  leetcode: { title: 'LeetCode Stats', icon: 'LC', color: '#FFA116' },
  codewars: { title: 'Codewars Stats', icon: 'CW', color: '#B1361E' },
  hackerrank: { title: 'HackerRank', icon: 'HR', color: '#00EA64' },
}

export const SERVICE_CARD_IDS: ServiceId[] = ['wakatime', 'spotify', 'leetcode', 'codewars', 'hackerrank']

export function generateServiceCard(state: AppState, id: ServiceId): string {
  const colors = getTheme(state.statsTheme)
  const meta = SERVICE_META[id]
  const data = getCardData(state, id)
  const accent = data.accent || meta.color

  return `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="154" viewBox="0 0 520 154" role="img" aria-label="${esc(data.title)}">
  <rect x="0.5" y="0.5" width="519" height="153" rx="12" fill="${colors.bg}" stroke="${colors.border}"/>
  <rect x="18" y="20" width="54" height="54" rx="12" fill="${accent}" opacity=".16"/>
  <text x="45" y="54" fill="${accent}" font-size="17" font-weight="800" text-anchor="middle" font-family="Arial, sans-serif">${meta.icon}</text>
  <text x="88" y="39" fill="${colors.title}" font-size="18" font-weight="800" font-family="Arial, sans-serif">${esc(data.title)}</text>
  <text x="88" y="61" fill="${colors.muted}" font-size="12" font-family="Arial, sans-serif">${esc(data.subtitle)}</text>
  ${metric(data.metricA, 18, 98, 152, accent, colors)}
  ${metric(data.metricB, 184, 98, 152, colors.accent, colors)}
  ${metric(data.metricC, 350, 98, 152, colors.title, colors)}
</svg>`
}

function getCardData(state: AppState, id: ServiceId): ServiceCard {
  const fields = state.plugins[id]?.fields ?? {}
  const username = state.profile.username || 'username'

  switch (id) {
    case 'wakatime': {
      const user = value(fields.wakaUsername, username)
      return {
        title: 'WakaTime',
        subtitle: `@${user}`,
        accent: '#7c3aed',
        metricA: value(fields.wakaHours, '0h/week'),
        metricB: value(fields.wakaLanguage, 'Coding'),
        metricC: value(fields.wakaEditor, 'Editor'),
      }
    }
    case 'spotify':
      return {
        title: 'Spotify Now Playing',
        subtitle: value(fields.spotifyStatus, 'Not playing right now'),
        accent: '#1DB954',
        metricA: value(fields.spotifyTrack, 'Track'),
        metricB: value(fields.spotifyArtist, 'Artist'),
        metricC: value(fields.spotifyAlbum, 'Album'),
      }
    case 'leetcode': {
      const user = value(fields.leetcodeUser, username)
      return {
        title: 'LeetCode Stats',
        subtitle: `leetcode.com/${user}`,
        accent: '#FFA116',
        metricA: value(fields.leetcodeSolved, '0 solved'),
        metricB: value(fields.leetcodeRank, 'Rank -'),
        metricC: value(fields.leetcodeLanguage, 'Algorithms'),
      }
    }
    case 'codewars': {
      const user = value(fields.codewarsUser, username)
      return {
        title: 'Codewars Stats',
        subtitle: `codewars.com/users/${user}`,
        accent: '#B1361E',
        metricA: value(fields.codewarsRank, '8 kyu'),
        metricB: value(fields.codewarsHonor, '0 honor'),
        metricC: value(fields.codewarsKatas, '0 katas'),
      }
    }
    case 'hackerrank': {
      const user = value(fields.hackerrankUser, username)
      return {
        title: 'HackerRank',
        subtitle: `hackerrank.com/${user}`,
        accent: '#00EA64',
        metricA: value(fields.hackerrankBadge, 'Problem Solving'),
        metricB: value(fields.hackerrankStars, '0 stars'),
        metricC: value(fields.hackerrankLevel, 'Practice'),
      }
    }
  }
}

function metric(label: string, x: number, y: number, width: number, accent: string, colors: Theme): string {
  return `<rect x="${x}" y="${y - 24}" width="${width}" height="44" rx="8" fill="${colors.panel}" stroke="${colors.border}"/>
  <rect x="${x}" y="${y - 24}" width="3" height="44" rx="1.5" fill="${accent}"/>
  <text x="${x + 14}" y="${y + 3}" fill="${colors.text}" font-size="12" font-weight="700" font-family="Arial, sans-serif">${esc(shorten(label, 19))}</text>`
}

function getTheme(theme: string): Theme {
  return THEMES[theme] ?? THEMES.dark
}

function value(value: string | undefined, fallback: string): string {
  return value?.trim() || fallback
}

function shorten(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}...` : value
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
