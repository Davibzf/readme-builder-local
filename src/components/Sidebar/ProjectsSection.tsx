import React from 'react'
import type { AppState, PinnedProject } from '../../types'
import { t } from '../../data/i18n'

interface Props {
  state: AppState
  addProject: () => void
  updateProject: (id: string, p: Partial<PinnedProject>) => void
  removeProject: (id: string) => void
}

const LANG_COLORS: Record<string, string> = {
  JavaScript:'f1e05a', TypeScript:'3178c6', Python:'3572A5', Go:'00ADD8',
  Rust:'dea584', Java:'b07219', 'C#':'178600', 'C++':'f34b7d',
  PHP:'4F5D95', Ruby:'701516', Swift:'F05138', Kotlin:'A97BFF',
  Dart:'00B4AB', HTML:'e34c26', CSS:'563d7c', Vue:'41b883',
}

export default function ProjectsSection({ state, addProject, updateProject, removeProject }: Props) {
  const tr = (k: string) => t(state.lang, k)

  return (
    <div className="sec-body">
      {state.projects.map(proj => (
        <div key={proj.id} className="project-card">
          <div className="project-header">
            <input className="field-input" value={proj.name} placeholder="repo-name"
              onChange={e => updateProject(proj.id, { name: e.target.value })} />
            <button className="remove-btn" onClick={() => removeProject(proj.id)}>✕</button>
          </div>
          <input className="field-input mt4" value={proj.description}
            placeholder={state.lang === 'pt' ? 'Descrição do projeto' : 'Project description'}
            onChange={e => updateProject(proj.id, { description: e.target.value })} />
          <div className="project-row mt4">
            <div>
              <label className="field-label">Linguagem</label>
              <select className="field-input" value={proj.language}
                onChange={e => updateProject(proj.id, { language: e.target.value, languageColor: LANG_COLORS[e.target.value] || '555' })}>
                <option value="">Nenhuma</option>
                {Object.keys(LANG_COLORS).map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">⭐</label>
              <input className="field-input" type="number" min={0} value={proj.stars}
                onChange={e => updateProject(proj.id, { stars: +e.target.value })} />
            </div>
            <div>
              <label className="field-label">🍴</label>
              <input className="field-input" type="number" min={0} value={proj.forks}
                onChange={e => updateProject(proj.id, { forks: +e.target.value })} />
            </div>
          </div>
          <input className="field-input mt4" value={proj.url} placeholder="https://github.com/..."
            onChange={e => updateProject(proj.id, { url: e.target.value })} />
        </div>
      ))}
      <div className="field-group">
        <button className="add-btn" onClick={addProject}>+ {tr('btn_add')} projeto</button>
      </div>
    </div>
  )
}
