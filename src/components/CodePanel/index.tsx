import React, { useMemo, useRef } from 'react'
import type { AppState } from '../../types'
import { generateMarkdown, downloadMarkdown } from '../../generators/markdown'
import { t } from '../../data/i18n'

interface Props { state: AppState; onToast: (msg: string) => void }

export default function CodePanel({ state, onToast }: Props) {
  const tr = (k: string) => t(state.lang, k)
  const md = useMemo(() => generateMarkdown(state), [state])

  function copy() {
    navigator.clipboard.writeText(md).then(() => onToast(tr('toast_copied')))
  }

  return (
    <div className="code-wrap">
      <div className="code-toolbar">
        <span className="code-filename">README.md</span>
        <div className="code-actions">
          <button className="code-btn" onClick={copy}>📋 {tr('btn_copy')}</button>
          <button className="code-btn green" onClick={() => downloadMarkdown(md)}>⬇ {tr('btn_download')}</button>
        </div>
      </div>
      <pre className="code-output">{md}</pre>
    </div>
  )
}
