import React, { useRef } from 'react'
import type { AppState } from '../../types'
import { generateMarkdown, downloadMarkdown } from '../../generators/markdown'
import { t } from '../../data/i18n'

interface Props {
  state: AppState
  setView: (v: AppState['view']) => void
  exportConfig: () => void
  importConfig: (f: File) => Promise<void>
  onToast: (msg: string, type?: 'success'|'error') => void
}

export default function Toolbar({ state, setView, exportConfig, importConfig, onToast }: Props) {
  const tr  = (k: string) => t(state.lang, k)
  const ref = useRef<HTMLInputElement>(null)

  const md = () => generateMarkdown(state)

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <img className="toolbar-logo" src="/logo.png" alt="" />
        <span className="file-path">
          // github.com/<strong>{state.profile.username || 'username'}</strong>/README.md
        </span>
      </div>
      <div className="toolbar-right">
        <button className={`view-btn${state.view==='preview'?' active':''}`} onClick={() => setView('preview')}>
          {tr('btn_preview')}
        </button>
        <button className={`view-btn${state.view==='markdown'?' active':''}`} onClick={() => setView('markdown')}>
          {tr('btn_markdown')}
        </button>
        <div className="tb-divider" />
        <button className="tb-btn" onClick={() => navigator.clipboard.writeText(md()).then(() => onToast(tr('toast_copied')))}>
          📋 {tr('btn_copy')}
        </button>
        <button className="tb-btn green" onClick={() => downloadMarkdown(md())}>
          ⬇ {tr('btn_download')}
        </button>
        <div className="tb-divider" />
        <button className="tb-btn" onClick={exportConfig}>{tr('btn_export')}</button>
        <button className="tb-btn" onClick={() => ref.current?.click()}>{tr('btn_import')}</button>
        <input ref={ref} type="file" accept=".json" style={{display:'none'}}
          onChange={e => {
            const f = e.target.files?.[0]; if(!f) return
            importConfig(f).then(() => onToast(tr('toast_imported'))).catch(() => onToast(tr('toast_error'),'error'))
            e.target.value = ''
          }} />
      </div>
    </div>
  )
}
