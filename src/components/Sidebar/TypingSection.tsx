import React, { useRef } from 'react'
import type { AppState } from '../../types'
import { t } from '../../data/i18n'
import { FONTS } from '../../data/fonts'
import { COLOR_PALETTE } from '../../data/palette'
import { generateTypingSVG, downloadSVG, copySVGToClipboard } from '../../generators/typing-svg'

interface Props {
  state: AppState
  setTyping: (p: Partial<AppState['typing']>) => void
  setTypingText: (i: number, v: string) => void
  onToast: (msg: string) => void
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0,2), 16),
    g: parseInt(h.slice(2,4), 16),
    b: parseInt(h.slice(4,6), 16),
  }
}
function rgbToHex(r: number, g: number, b: number) {
  return [r,g,b].map(v => Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('')
}

export default function TypingSection({ state, setTyping, setTypingText, onToast }: Props) {
  const tr = (k: string) => t(state.lang, k)
  const { typing } = state
  const rgb = hexToRgb(typing.color)

  const svgPreview = React.useMemo(() => {
    const lines = typing.texts.filter(s => s.trim())
    if (!lines.length) return ''
    return generateTypingSVG({ ...typing, texts: lines })
  }, [typing])

  function handleHex(val: string) {
    const clean = val.replace('#','')
    if (/^[0-9a-fA-F]{0,6}$/.test(clean)) setTyping({ color: clean.padEnd(6,'0') })
  }
  function handleRgb(field: 'r'|'g'|'b', val: string) {
    const n = Math.max(0, Math.min(255, parseInt(val)||0))
    const updated = { ...rgb, [field]: n }
    setTyping({ color: rgbToHex(updated.r, updated.g, updated.b) })
  }

  return (
    <div className="sec-body">
      {/* Mode toggle */}
      <div className="field-group">
        <label className="field-label">{tr('lbl_mode')}</label>
        <div className="seg-group w-full">
          <button className={`seg-btn${typing.mode==='local'?' active':''}`}
            onClick={() => setTyping({ mode: 'local' })}>{tr('mode_local')}</button>
          <button className={`seg-btn${typing.mode==='external'?' active':''}`}
            onClick={() => setTyping({ mode: 'external' })}>{tr('mode_external')}</button>
        </div>
      </div>

      {/* SVG preview */}
      {svgPreview && (
        <div className="field-group">
          <div className="typing-preview"
            dangerouslySetInnerHTML={{ __html: svgPreview }} />
        </div>
      )}

      {/* SVG actions (local mode) */}
      {typing.mode === 'local' && (
        <div className="field-group svg-actions">
          <button className="svg-btn" onClick={() => downloadSVG(svgPreview, 'typing.svg')}>
            ⬇ {tr('btn_dl_svg')}
          </button>
          <button className="svg-btn" onClick={() => copySVGToClipboard(svgPreview).then(() => onToast(tr('toast_svg_ok')))}>
            📋 {tr('btn_copy_svg')}
          </button>
        </div>
      )}

      {/* Text fields */}
      <div className="field-group">
        <label className="field-label">{tr('lbl_texts')}</label>
        <div className="typing-texts">
          {typing.texts.map((txt, i) => (
            <div key={i} className="typing-row">
              <span className="typing-num">{i+1}</span>
              <input className="field-input" value={txt}
                placeholder={i === 0 ? tr('ph_typing') : ''}
                onChange={e => setTypingText(i, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="field-group">
        <label className="field-label">{tr('lbl_color')}</label>
        <div className="palette-grid">
          {COLOR_PALETTE.map(c => (
            <div key={c.hex}
              className={`color-dot${c.hex === typing.color ? ' active' : ''}`}
              style={{ '--c': '#'+c.hex } as React.CSSProperties}
              title={c.name}
              onClick={() => setTyping({ color: c.hex })} />
          ))}
        </div>
        <div className="color-inputs">
          <div className="color-swatch" style={{ background: '#'+typing.color }} />
          <div className="color-field">
            <span className="mono-prefix">#</span>
            <input className="field-input hex-inp" value={typing.color}
              onChange={e => handleHex(e.target.value)} maxLength={6} />
          </div>
          {(['r','g','b'] as const).map(ch => (
            <div key={ch} className="color-field">
              <label className="field-label">{ch.toUpperCase()}</label>
              <input className="field-input rgb-inp" type="number"
                min={0} max={255} value={rgb[ch]}
                onChange={e => handleRgb(ch, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* Font */}
      <div className="field-group">
        <label className="field-label">{tr('lbl_font')}</label>
        <select className="field-input" value={typing.font}
          onChange={e => setTyping({ font: e.target.value })}>
          {FONTS.map(f => (
            <option key={f.id} value={f.id}>{f.label} — {f.style}</option>
          ))}
        </select>
      </div>

      {/* Size + speed */}
      <div className="field-group two-col">
        <div>
          <label className="field-label">{tr('lbl_fontsize')}</label>
          <input className="field-input" type="number" min={12} max={60}
            value={typing.fontSize} onChange={e => setTyping({ fontSize: +e.target.value })} />
        </div>
        <div>
          <label className="field-label">{tr('lbl_width')}</label>
          <input className="field-input" type="number" min={200} max={900}
            value={typing.width} onChange={e => setTyping({ width: +e.target.value })} />
        </div>
      </div>

      {/* Speed slider */}
      <div className="field-group">
        <label className="field-label">{tr('lbl_speed')}: <strong className="speed-val">{typing.speed}ms</strong></label>
        <input type="range" min={15} max={150} value={typing.speed}
          onChange={e => setTyping({ speed: +e.target.value })} />
      </div>

      {/* Align + repeat */}
      <div className="field-group two-col">
        <div>
          <label className="field-label">{tr('lbl_align')}</label>
          <div className="seg-group">
            <button className={`seg-btn${typing.align==='left'?' active':''}`} onClick={() => setTyping({ align:'left' })}>Left</button>
            <button className={`seg-btn${typing.align==='center'?' active':''}`} onClick={() => setTyping({ align:'center' })}>Center</button>
          </div>
        </div>
        <div>
          <label className="field-label">Repeat</label>
          <div className="seg-group">
            <button className={`seg-btn${typing.repeat?' active':''}`} onClick={() => setTyping({ repeat:true })}>On</button>
            <button className={`seg-btn${!typing.repeat?' active':''}`} onClick={() => setTyping({ repeat:false })}>Off</button>
          </div>
        </div>
      </div>
    </div>
  )
}
