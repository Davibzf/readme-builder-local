import React, { useMemo } from 'react'
import type { AppState, CategoryKey } from '../../types'
import { t } from '../../data/i18n'
import { ICON_CATEGORIES, ALL_ICONS, searchIcons } from '../../data/icons'

interface Props {
  state: AppState
  setIcons: (p: Partial<AppState['icons']>) => void
  toggleIcon: (id: string) => void
  toggleCategory: (cat: CategoryKey) => void
}

export default function IconsSection({ state, setIcons, toggleIcon, toggleCategory }: Props) {
  const tr = (k: string) => t(state.lang, k)
  const { icons } = state

  const visible = useMemo(() => {
    if (icons.search.trim()) return searchIcons(icons.search)
    const seen = new Set<string>()
    return ALL_ICONS.filter(ic => {
      if (!icons.activeCategories.includes(ic.category)) return false
      if (seen.has(ic.id)) return false
      seen.add(ic.id)
      return true
    })
  }, [icons.search, icons.activeCategories])

  return (
    <div className="sec-body">
      {/* Source toggle */}
      <div className="field-group">
        <label className="field-label">{tr('lbl_source')}</label>
        <div className="seg-group w-full">
          <button className={`seg-btn${icons.source==='local'?' active':''}`}
            onClick={() => setIcons({ source: 'local' })}>
            Local (assets/icons/)
          </button>
          <button className={`seg-btn${icons.source==='external'?' active':''}`}
            onClick={() => setIcons({ source: 'external' })}>
            CDN (skillicons.dev)
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div className="cat-pills">
        {(Object.keys(ICON_CATEGORIES) as CategoryKey[]).map(cat => {
          const meta = ICON_CATEGORIES[cat]
          const label = state.lang === 'en' ? meta.labelEn : meta.labelPt
          return (
            <button key={cat}
              className={`cat-pill${icons.activeCategories.includes(cat)?' active':''}`}
              onClick={() => toggleCategory(cat)}>
              {meta.emoji} {label}
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="field-group">
        <input className="field-input" placeholder={tr('lbl_search')} value={icons.search}
          onChange={e => setIcons({ search: e.target.value })} />
      </div>

      {/* Icons grid */}
      <div className="icons-grid">
        {visible.length === 0 && (
          <div className="icons-empty">Nenhum ícone encontrado</div>
        )}
        {visible.map(ic => {
          const src = `assets/icons/${ic.id}.svg`
          const sel = icons.selected.includes(ic.id)
          return (
            <div key={ic.id} className={`icon-item${sel?' selected':''}`}
              title={ic.label} onClick={() => toggleIcon(ic.id)}>
              <img src={src} alt={ic.label} loading="lazy"
                onError={e => {
                  // fallback: generate a placeholder letter
                  const el = e.currentTarget
                  el.style.display = 'none'
                  const sibling = el.nextElementSibling as HTMLElement
                  if (sibling) sibling.style.fontSize = '18px'
                }} />
              <span>{ic.label}</span>
            </div>
          )
        })}
      </div>

      {/* Meta */}
      <div className="icon-meta">
        <span>{tr('lbl_selected')}: <strong>{icons.selected.length}</strong></span>
        <button className="clear-btn" onClick={() => setIcons({ selected: [] })}>
          {tr('btn_clear')}
        </button>
      </div>

      {/* Per row */}
      <div className="field-group">
        <label className="field-label">{tr('lbl_perrow')}: <strong>{icons.perRow}</strong></label>
        <input type="range" min={1} max={20} value={icons.perRow}
          onChange={e => setIcons({ perRow: +e.target.value })} />
      </div>
    </div>
  )
}
