import { AppState, PluginId } from '../types'

export type ServiceId = Extract<PluginId, 'streak' | 'langs' | 'views' | 'wakatime' | 'spotify' | 'leetcode' | 'codewars' | 'hackerrank'>

export const SERVICE_CARD_IDS: ServiceId[] = [
  'streak',
  'langs',
  'views',
  'wakatime',
  'spotify',
  'leetcode',
  'codewars',
  'hackerrank',
]

export function getServiceHeading(id: ServiceId, tr: (key: string) => string): string {
  switch (id) {
    case 'streak': return tr('rm_streaks')
    case 'langs': return tr('rm_languages')
    case 'views': return tr('rm_profile_views')
    case 'wakatime': return tr('rm_wakatime')
    case 'spotify': return tr('rm_spotify')
    case 'leetcode': return tr('rm_leetcode')
    case 'codewars': return tr('rm_codewars')
    case 'hackerrank': return tr('rm_hackerrank')
    default: return tr('rm_other')
  }
}

export function generateServiceCard(state: AppState, id: ServiceId): string {
  const heading = getServiceHeading(id, () => id)
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="680" height="120" viewBox="0 0 680 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="120" rx="24" fill="#0d1117" />
  <text x="32" y="46" font-family="Inter, sans-serif" font-size="24" fill="#c9d1d9">${heading}</text>
  <text x="32" y="80" font-family="Inter, sans-serif" font-size="16" fill="#8b949e">Service card for ${id}</text>
</svg>`
}
