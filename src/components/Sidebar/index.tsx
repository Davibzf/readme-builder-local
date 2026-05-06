import React, { useState } from 'react'
import type { AppState, CategoryKey, FocusKey, PluginId, PinnedProject } from '../../types'
import { t } from '../../data/i18n'
import ProfileSection  from './ProfileSection'
import TypingSection   from './TypingSection'
import IconsSection    from './IconsSection'
import PluginsSection  from './PluginsSection'
import SocialSection   from './SocialSection'
import AboutSection    from './AboutSection'
import ProjectsSection from './ProjectsSection'
import TemplatesSection from './TemplatesSection'

interface Props {
  state: AppState
  setLang: (l: AppState['lang']) => void
  setPreviewTheme: (t: AppState['previewTheme']) => void
  setStatsTheme: (t: string) => void
  setProfile: (p: Partial<AppState['profile']>) => void
  setTyping: (p: Partial<AppState['typing']>) => void
  setTypingText: (i: number, v: string) => void
  setIcons: (p: Partial<AppState['icons']>) => void
  toggleIcon: (id: string) => void
  toggleCategory: (c: CategoryKey) => void
  setSocial: (p: Partial<AppState['social']>) => void
  togglePlugin: (id: PluginId) => void
  setPluginField: (id: PluginId, key: string, val: string) => void
  setAbout: (p: Partial<AppState['about']>) => void
  setAboutParagraph: (i: number, v: string) => void
  setFact: (i: number, p: Partial<AppState['about']['facts'][0]>) => void
  addProject: () => void
  updateProject: (id: string, p: Partial<PinnedProject>) => void
  removeProject: (id: string) => void
  applyTemplate: (partial: Partial<AppState>) => void
  reset: () => void
  exportConfig: () => void
  importConfig: (f: File) => Promise<void>
  onToast: (msg: string, type?: 'success'|'error') => void
}

interface Section { id: string; icon: string; labelKey: string }

const SECTIONS: Section[] = [
  { id:'templates', icon:'🎯', labelKey:'templates'     },
  { id:'profile',   icon:'👤', labelKey:'sec_profile'   },
  { id:'typing',    icon:'⌨️', labelKey:'sec_typing'    },
  { id:'icons',     icon:'⚡', labelKey:'sec_icons'     },
  { id:'about',     icon:'👋', labelKey:'sec_about'     },
  { id:'projects',  icon:'📌', labelKey:'sec_projects'  },
  { id:'plugins',   icon:'✨', labelKey:'sec_plugins'   },
  { id:'social',    icon:'🔗', labelKey:'sec_social'    },
]

export default function Sidebar(props: Props) {
  const { state, setLang, setPreviewTheme, onToast, reset, exportConfig, importConfig } = props
  const tr = (k: string) => t(state.lang, k)
  const [open, setOpen] = useState<Record<string,boolean>>({ profile: true })
  const importRef = React.useRef<HTMLInputElement>(null)

  const toggle = (id: string) => setOpen(p => ({ ...p, [id]: !p[id] }))

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo-row">
          <div className="logo">
            <span className="logo-pulse" />
            README Builder
            <span className="logo-badge">v2</span>
          </div>
          <div className="seg-group">
            <button className={`seg-btn${state.lang==='pt'?' active':''}`} onClick={() => setLang('pt')}>PT</button>
            <button className={`seg-btn${state.lang==='en'?' active':''}`} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
        <div className="header-controls">
          <span className="ctrl-label">Preview:</span>
          <div className="seg-group">
            <button className={`seg-btn${state.previewTheme==='light'?' active':''}`} onClick={() => setPreviewTheme('light')}>{tr('btn_light')}</button>
            <button className={`seg-btn${state.previewTheme==='dark'?' active':''}`}  onClick={() => setPreviewTheme('dark')}>{tr('btn_dark')}</button>
          </div>
          <button className="icon-btn danger" title={tr('btn_reset')} onClick={() => { if(confirm(tr('confirm_reset'))){ reset(); onToast(tr('toast_reset')) } }}>↺</button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="sidebar-scroll">
        {SECTIONS.map(sec => (
          <div key={sec.id} className="section">
            <button className={`sec-toggle${open[sec.id]?'':' collapsed'}`} onClick={() => toggle(sec.id)}>
              <span className="sec-label">{sec.icon} {tr(sec.labelKey)}</span>
              <span className="sec-chevron">▾</span>
            </button>
            {open[sec.id] && (
              <div>
                {sec.id === 'templates' && <TemplatesSection state={state} applyTemplate={props.applyTemplate} onToast={onToast} />}
                {sec.id === 'profile'   && <ProfileSection  state={state} setProfile={props.setProfile} setStatsTheme={props.setStatsTheme} />}
                {sec.id === 'typing'    && <TypingSection   state={state} setTyping={props.setTyping} setTypingText={props.setTypingText} onToast={msg => onToast(msg)} />}
                {sec.id === 'icons'     && <IconsSection    state={state} setIcons={props.setIcons} toggleIcon={props.toggleIcon} toggleCategory={props.toggleCategory} />}
                {sec.id === 'about'     && <AboutSection    state={state} setAbout={props.setAbout} setAboutParagraph={props.setAboutParagraph} setFact={props.setFact} />}
                {sec.id === 'projects'  && <ProjectsSection state={state} addProject={props.addProject} updateProject={props.updateProject} removeProject={props.removeProject} />}
                {sec.id === 'plugins'   && <PluginsSection  state={state} togglePlugin={props.togglePlugin} setPluginField={props.setPluginField} />}
                {sec.id === 'social'    && <SocialSection   state={state} setSocial={props.setSocial} />}
              </div>
            )}
          </div>
        ))}
        <div style={{ height: 60 }} />
      </div>

      {/* Footer autoria */}
      <div className="sidebar-footer">
        <a className="footer-link" href="https://github.com/Davibzf" target="_blank" rel="noopener">
          <GhIcon /> Davibzf
        </a>
        <div className="footer-sep" />
        <a className="footer-link" href="https://github.com/Davibzf/Readme-Builder" target="_blank" rel="noopener">
          <GhIcon /> Readme-Builder
        </a>
        <input ref={importRef} type="file" accept=".json" style={{display:'none'}}
          onChange={e => {
            const f = e.target.files?.[0]; if (!f) return
            importConfig(f).then(() => onToast(tr('toast_imported'))).catch(() => onToast(tr('toast_error'),'error'))
            e.target.value = ''
          }} />
      </div>
    </aside>
  )
}

function GhIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}
