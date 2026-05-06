import React from 'react'
import type { AppState } from '../../types'
import { t } from '../../data/i18n'

interface Props { state: AppState; setSocial: (p: Partial<AppState['social']>) => void }

const FIELDS: { key: keyof AppState['social']; label: string; ph: string }[] = [
  { key:'linkedin', label:'LinkedIn', ph:'seu-username' },
  { key:'twitter',  label:'Twitter / X', ph:'@username' },
  { key:'website',  label:'Portfolio / Site', ph:'https://seusite.dev' },
  { key:'email',    label:'Email', ph:'seu@email.com' },
  { key:'discord',  label:'Discord', ph:'server-id ou username' },
  { key:'youtube',  label:'YouTube', ph:'@canal' },
  { key:'devto',    label:'Dev.to', ph:'username' },
]

export default function SocialSection({ state, setSocial }: Props) {
  return (
    <div className="sec-body">
      {FIELDS.map(f => (
        <div key={f.key} className="field-group">
          <label className="field-label">{f.label}</label>
          <input className="field-input" placeholder={f.ph}
            value={state.social[f.key]}
            onChange={e => setSocial({ [f.key]: e.target.value })} />
        </div>
      ))}
    </div>
  )
}
