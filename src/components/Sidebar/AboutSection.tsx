import React from 'react'
import type { AppState } from '../../types'
import { t } from '../../data/i18n'

interface Props {
  state: AppState
  setAbout: (p: Partial<AppState['about']>) => void
  setAboutParagraph: (i: number, v: string) => void
  setFact: (i: number, p: Partial<AppState['about']['facts'][0]>) => void
}

const EMOJI_OPTIONS = ['🌍','💼','🚀','🎓','💡','🔭','🎯','⚡','🛠','🎮','📚','🌱']

export default function AboutSection({ state, setAbout, setAboutParagraph, setFact }: Props) {
  const tr = (k: string) => t(state.lang, k)
  const { about } = state

  return (
    <div className="sec-body">
      <div className="field-group">
        <label className="field-label toggle-row">
          <input type="checkbox" checked={about.enabled}
            onChange={e => setAbout({ enabled: e.target.checked })} />
          {state.lang === 'pt' ? 'Ativar seção "Sobre mim"' : 'Enable "About me" section'}
        </label>
      </div>
      {about.enabled && <>
        {about.paragraphs.map((p, i) => (
          <div key={i} className="field-group">
            <label className="field-label">{tr('lbl_paragraph')} {i+1}</label>
            <textarea className="field-input" rows={3} value={p}
              onChange={e => setAboutParagraph(i, e.target.value)}
              placeholder={state.lang === 'pt' ? 'Escreva sobre você...' : 'Write about yourself...'} />
          </div>
        ))}
        <div className="field-group">
          <label className="field-label">{state.lang === 'pt' ? 'Fatos rápidos' : 'Quick facts'}</label>
          {about.facts.map((fact, i) => (
            <div key={fact.id} className="fact-row">
              <select className="fact-emoji" value={fact.emoji}
                onChange={e => setFact(i, { emoji: e.target.value })}>
                {EMOJI_OPTIONS.map(em => <option key={em} value={em}>{em}</option>)}
              </select>
              <input className="field-input" value={fact.text} placeholder={tr('lbl_fact')}
                onChange={e => setFact(i, { text: e.target.value })} />
            </div>
          ))}
        </div>
      </>}
    </div>
  )
}
