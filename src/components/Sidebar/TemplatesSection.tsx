import React from 'react'
import type { AppState } from '../../types'
import { TEMPLATES } from '../../data/defaults'
import { t } from '../../data/i18n'

interface Props {
  state: AppState
  applyTemplate: (partial: Partial<AppState>) => void
  onToast: (msg: string) => void
}

export default function TemplatesSection({ state, applyTemplate, onToast }: Props) {
  const tr = (k: string) => t(state.lang, k)

  return (
    <div className="sec-body">
      <div className="templates-grid">
        {TEMPLATES.map(tpl => (
          <button key={tpl.id} className="tpl-card"
            onClick={() => { applyTemplate(tpl.config); onToast(tr('toast_applied')) }}>
            <span className="tpl-emoji">{tpl.emoji}</span>
            <div className="tpl-name">{state.lang === 'en' ? tpl.nameEn : tpl.name}</div>
            <div className="tpl-desc">{state.lang === 'en' ? tpl.descriptionEn : tpl.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
