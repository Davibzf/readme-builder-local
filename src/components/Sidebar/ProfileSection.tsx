import React from 'react'
import type { AppState, FocusKey } from '../../types'
import { t } from '../../data/i18n'
import { STATS_THEMES } from '../../data/defaults'

interface Props {
  state: AppState
  setProfile: (p: Partial<AppState['profile']>) => void
  setStatsTheme: (t: string) => void
}

const FOCUS_OPTIONS: { value: FocusKey; labelPt: string; labelEn: string }[] = [
  { value: 'fullstack', labelPt: 'Full Stack Developer',  labelEn: 'Full Stack Developer' },
  { value: 'backend',   labelPt: 'Backend Developer',     labelEn: 'Backend Developer' },
  { value: 'frontend',  labelPt: 'Frontend Developer',    labelEn: 'Frontend Developer' },
  { value: 'mobile',    labelPt: 'Mobile Developer',      labelEn: 'Mobile Developer' },
  { value: 'devops',    labelPt: 'DevOps / SRE Engineer', labelEn: 'DevOps / SRE Engineer' },
  { value: 'data',      labelPt: 'Data Engineer / AI',    labelEn: 'Data Engineer / AI' },
  { value: 'security',  labelPt: 'Security Engineer',     labelEn: 'Security Engineer' },
  { value: 'gamedev',   labelPt: 'Game Developer',        labelEn: 'Game Developer' },
  { value: 'student',   labelPt: 'Estudante de Dev',      labelEn: 'Dev Student' },
]

export default function ProfileSection({ state, setProfile, setStatsTheme }: Props) {
  const tr = (k: string) => t(state.lang, k)
  const { profile, statsTheme } = state

  return (
    <div className="sec-body">
      <div className="field-group">
        <label className="field-label">{tr('lbl_username')}</label>
        <input className="field-input" value={profile.username}
          onChange={e => setProfile({ username: e.target.value })} placeholder="davibzf" />
      </div>
      <div className="field-group">
        <label className="field-label">{tr('lbl_name')}</label>
        <input className="field-input" value={profile.displayName}
          onChange={e => setProfile({ displayName: e.target.value })} />
      </div>
      <div className="field-group">
        <label className="field-label">{tr('lbl_bio')}</label>
        <input className="field-input" value={profile.bio}
          onChange={e => setProfile({ bio: e.target.value })} />
      </div>
      <div className="field-group">
        <label className="field-label">{tr('lbl_location')}</label>
        <input className="field-input" value={profile.location}
          onChange={e => setProfile({ location: e.target.value })} placeholder="Brasil 🇧🇷" />
      </div>
      <div className="field-group">
        <label className="field-label">{tr('lbl_focus')}</label>
        <select className="field-input" value={profile.focus}
          onChange={e => setProfile({ focus: e.target.value as FocusKey })}>
          {FOCUS_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>
              {state.lang === 'en' ? o.labelEn : o.labelPt}
            </option>
          ))}
        </select>
      </div>
      <div className="field-group">
        <label className="field-label open-work-row">
          <input type="checkbox" checked={profile.openToWork}
            onChange={e => setProfile({ openToWork: e.target.checked })} />
          {tr('lbl_openwork')}
        </label>
      </div>
      <div className="field-group">
        <label className="field-label">{tr('lbl_theme')}</label>
        <div className="theme-grid">
          {STATS_THEMES.map(th => (
            <button key={th}
              className={`theme-btn${th === statsTheme ? ' active' : ''}`}
              onClick={() => setStatsTheme(th)}>{th}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
