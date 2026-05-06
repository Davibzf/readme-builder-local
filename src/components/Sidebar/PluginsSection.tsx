import React from 'react'
import type { AppState, PluginId } from '../../types'
import { t } from '../../data/i18n'

interface PluginMeta {
  id: PluginId
  emoji: string
  nameKey: string
  descPt: string
  descEn: string
  fields?: { key: string; labelKey: string; ph: string }[]
}

const PLUGIN_META: PluginMeta[] = [
  { id:'snake',        emoji:'🐍', nameKey:'plugin_snake',   descPt:'Cobrinha animada nos commits',         descEn:'Animated snake on commits' },
  { id:'stats',        emoji:'📊', nameKey:'plugin_stats',   descPt:'Card de estatísticas GitHub',          descEn:'GitHub Stats card' },
  { id:'streak',       emoji:'🔥', nameKey:'plugin_streak',  descPt:'Sequência de commits diários',         descEn:'Daily commit streak' },
  { id:'langs',        emoji:'💬', nameKey:'plugin_langs',   descPt:'Linguagens mais usadas',               descEn:'Most used languages' },
  { id:'trophy',       emoji:'🏆', nameKey:'plugin_trophy',  descPt:'Conquistas do perfil',                 descEn:'Profile trophies' },
  { id:'activitygraph',emoji:'📈', nameKey:'plugin_graph',   descPt:'Gráfico de atividade anual',           descEn:'Annual activity graph' },
  { id:'views',        emoji:'👁', nameKey:'plugin_views',   descPt:'Contador de visitantes',               descEn:'Visitor counter' },
  { id:'wakatime',     emoji:'⏱', nameKey:'plugin_waka',    descPt:'Horas de código por semana',           descEn:'Weekly coding hours',
    fields:[{ key:'wakaUsername', labelKey:'lbl_waka_user', ph:'username' }] },
  { id:'spotify',      emoji:'🎵', nameKey:'plugin_spotify', descPt:'Música tocando agora',                 descEn:'Currently playing' },
  { id:'leetcode',     emoji:'🧩', nameKey:'plugin_leet',    descPt:'Estatísticas LeetCode',                descEn:'LeetCode stats',
    fields:[{ key:'leetcodeUser', labelKey:'lbl_leet_user', ph:'username' }] },
  { id:'codewars',     emoji:'⚔️', nameKey:'plugin_cw',      descPt:'Rank e katas Codewars',               descEn:'Codewars rank and katas',
    fields:[{ key:'codewarsUser', labelKey:'lbl_cw_user', ph:'username' }] },
  { id:'hackerrank',   emoji:'💚', nameKey:'plugin_hr',      descPt:'Badge HackerRank',                     descEn:'HackerRank badge',
    fields:[{ key:'hackerrankUser', labelKey:'lbl_hr_user', ph:'username' }] },
  { id:'wave',         emoji:'🌊', nameKey:'plugin_wave',    descPt:'Cabeçalho e rodapé em onda SVG (local)',descEn:'Local wave header/footer' },
]

interface Props {
  state: AppState
  togglePlugin: (id: PluginId) => void
  setPluginField: (id: PluginId, key: string, val: string) => void
}

export default function PluginsSection({ state, togglePlugin, setPluginField }: Props) {
  const tr = (k: string) => t(state.lang, k)

  return (
    <div className="sec-body plugins-list">
      {PLUGIN_META.map(pm => {
        const plug = state.plugins[pm.id]
        const on   = plug?.enabled ?? false
        const desc = state.lang === 'en' ? pm.descEn : pm.descPt
<<<<<<< HEAD
        const fields = getPluginFields(pm.id, pm.fields)
=======
>>>>>>> parent of 7955c93 (implantaçao do github stast)
        return (
          <div key={pm.id} className={`plugin-card${on?' active':''}`}>
            <div className="plugin-header">
              <div className="plugin-info">
                <span className="plugin-emoji">{pm.emoji}</span>
                <div>
                  <div className="plugin-name">{tr(pm.nameKey)}</div>
                  <div className="plugin-desc">{desc}</div>
                </div>
              </div>
              <button className={`toggle${on?' on':''}`} onClick={() => togglePlugin(pm.id)}>
                <span className="knob" />
              </button>
            </div>
            {on && pm.fields?.map(f => (
              <div key={f.key} className="plugin-field">
                <input className="field-input" placeholder={tr(f.labelKey)}
                  value={plug?.fields[f.key] ?? ''}
                  onChange={e => setPluginField(pm.id, f.key, e.target.value)} />
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function getPluginFields(id: PluginId, fields?: PluginMeta['fields']): PluginMeta['fields'] {
  if (id === 'wakatime') return [
    { key:'wakaUsername', labelKey:'lbl_waka_user', ph:'username' },
    { key:'wakaHours', labelKey:'lbl_waka_hours', ph:'12h/week' },
    { key:'wakaLanguage', labelKey:'lbl_waka_lang', ph:'TypeScript' },
    { key:'wakaEditor', labelKey:'lbl_waka_editor', ph:'VS Code' },
  ]
  if (id === 'spotify') return [
    { key:'spotifyStatus', labelKey:'lbl_spotify_status', ph:'Now playing' },
    { key:'spotifyTrack', labelKey:'lbl_spotify_track', ph:'Song name' },
    { key:'spotifyArtist', labelKey:'lbl_spotify_artist', ph:'Artist' },
    { key:'spotifyAlbum', labelKey:'lbl_spotify_album', ph:'Album' },
  ]
  if (id === 'leetcode') return [
    { key:'leetcodeUser', labelKey:'lbl_leet_user', ph:'username' },
    { key:'leetcodeSolved', labelKey:'lbl_leet_solved', ph:'128 solved' },
    { key:'leetcodeRank', labelKey:'lbl_leet_rank', ph:'Rank 250000' },
    { key:'leetcodeLanguage', labelKey:'lbl_leet_lang', ph:'Algorithms' },
  ]
  if (id === 'codewars') return [
    { key:'codewarsUser', labelKey:'lbl_cw_user', ph:'username' },
    { key:'codewarsRank', labelKey:'lbl_cw_rank', ph:'5 kyu' },
    { key:'codewarsHonor', labelKey:'lbl_cw_honor', ph:'1200 honor' },
    { key:'codewarsKatas', labelKey:'lbl_cw_katas', ph:'80 katas' },
  ]
  if (id === 'hackerrank') return [
    { key:'hackerrankUser', labelKey:'lbl_hr_user', ph:'username' },
    { key:'hackerrankBadge', labelKey:'lbl_hr_badge', ph:'Problem Solving' },
    { key:'hackerrankStars', labelKey:'lbl_hr_stars', ph:'5 stars' },
    { key:'hackerrankLevel', labelKey:'lbl_hr_level', ph:'Intermediate' },
  ]
  if (id === 'wave') return [
    { key:'headerText', labelKey:'lbl_wave_header', ph:'README Builder' },
    { key:'footerText', labelKey:'lbl_wave_footer', ph:'github.com/seu-username' },
    { key:'color', labelKey:'lbl_wave_color', ph:'58a6ff' },
  ]
  return fields
}
