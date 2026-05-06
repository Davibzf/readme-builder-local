import React, { useMemo } from 'react'
import type { AppState } from '../../types'
<<<<<<< HEAD
import { generateTypingSVG, generateVisitorBadgeSVG, generateWaveSVG } from '../../generators/typing-svg'
import { generateGithubStatsCard, generateGithubStreakCard, generateTopLangsCard, svgToDataURI } from '../../generators/github-stats'
import { generateSnakePreviewSVG } from '../../generators/snake-game'
=======
import { generateTypingSVG } from '../../generators/typing-svg'
>>>>>>> parent of 7955c93 (implantaçao do github stast)
import { getFontById } from '../../data/fonts'
import { t } from '../../data/i18n'

interface Props { state: AppState }

export default function Preview({ state }: Props) {
  const { profile, typing, icons, social, plugins, about, projects, previewTheme, statsTheme, lang } = state
  const tr = (k: string) => t(lang, k)
  const isDark = previewTheme === 'dark'

  const typingSvg = useMemo(() => {
    const lines = typing.texts.filter(s => s.trim())
    if (!lines.length) return ''
    return generateTypingSVG({ ...typing, texts: lines })
  }, [typing])

  const iconAlign = icons.align === 'left' ? 'left' : 'center'
  const iconRows = useMemo(() => chunkIcons(icons.selected, getSafePerRow(icons.perRow)), [icons.selected, icons.perRow])
<<<<<<< HEAD
  const localStats = useMemo(() => ({
    stats: generateGithubStatsCard(state),
    streak: generateGithubStreakCard(state),
    langs: generateTopLangsCard(state),
  }), [state])
  const snakeSvg = useMemo(() => generateSnakePreviewSVG(state), [state])
  const visitorBadgeSvg = useMemo(
    () => generateVisitorBadgeSVG(lang === 'pt' ? 'VISITANTES' : 'VISITORS'),
    [lang],
  )
  const waveFields = plugins.wave?.fields ?? {}
  const waveColor = normalizeHex(waveFields.color || '58a6ff')
  const waveHeaderText = waveFields.headerText?.trim() ?? ''
  const waveFooterText = waveFields.footerText?.trim() ?? ''
  const waveHeaderSvg = useMemo(
    () => generateWaveSVG('header', waveColor, 104, waveHeaderText),
    [waveColor, waveHeaderText],
  )
  const waveFooterSvg = useMemo(
    () => generateWaveSVG('footer', waveColor, 86, waveFooterText),
    [waveColor, waveFooterText],
  )
=======
>>>>>>> parent of 7955c93 (implantaçao do github stast)

  const user = profile.username || 'seu-username'
  const focus = getFocusLabelLocal(profile.focus, lang)

  return (
    <div className={`preview-wrap ${isDark ? 'bg-dark' : 'bg-light'}`}>
      <div className={`readme-card ${isDark ? 'rm-dark' : 'rm-light'}`}>

        {/* Wave header */}
        {plugins['wave']?.enabled && (
          <div className="wave-preview wave-preview-header" dangerouslySetInnerHTML={{ __html: waveHeaderSvg }} />
        )}

        {/* Header */}
        <div className="rm-center">
          <h1 className="rm-h1">{profile.displayName}</h1>
          <p className="rm-subtitle">{focus}</p>
          {profile.bio && <p className="rm-bio">{profile.bio}</p>}
          {profile.location && <p className="rm-meta">📍 {profile.location}</p>}
          {profile.openToWork && <span className="open-badge">Open to work ✓</span>}

          {/* Typing SVG */}
          {typingSvg && (
            <div className="typing-wrap" dangerouslySetInnerHTML={{ __html: typingSvg }} />
          )}

          {/* Social badges */}
          <div className="social-badges">
            {social.linkedin  && <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener"><SocialBadge label="LinkedIn" color="#0077B5" /></a>}
            {social.twitter   && <a href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noopener"><SocialBadge label="Twitter" color="#1DA1F2" /></a>}
            {social.website   && <a href={social.website} target="_blank" rel="noopener"><SocialBadge label="Portfolio" color="#FF5722" /></a>}
            {social.email     && <a href={`mailto:${social.email}`}><SocialBadge label="Email" color="#D14836" /></a>}
            {social.discord   && <SocialBadge label="Discord" color="#5865F2" />}
            {social.youtube   && <a href={`https://youtube.com/@${social.youtube}`} target="_blank" rel="noopener"><SocialBadge label="YouTube" color="#FF0000" /></a>}
            {social.devto     && <a href={`https://dev.to/${social.devto}`} target="_blank" rel="noopener"><SocialBadge label="Dev.to" color="#0A0A0A" /></a>}
          </div>
        </div>

        {/* About */}
        {about.enabled && (about.paragraphs.some(p => p.trim()) || about.facts.some(f => f.text.trim())) && (
          <>
            <h2 className="rm-h2">{tr('rm_about')}</h2>
            {about.paragraphs.filter(p => p.trim()).map((p, i) => <p key={i} className="rm-p">{p}</p>)}
            <ul className="rm-facts">
              {about.facts.filter(f => f.text.trim()).map(f => (
                <li key={f.id}>{f.emoji} {f.text}</li>
              ))}
            </ul>
          </>
        )}

        {/* Icons */}
        {icons.selected.length > 0 && (
          <>
            <h2 className="rm-h2">{tr('rm_stack')}</h2>
            <div className={`rm-icons ${iconAlign}`}>
              {iconRows.map((row, rowIndex) => (
                <div key={rowIndex} className="rm-icons-row">
                  {row.map(id => (
                    <img key={id} src={`assets/icons/${id}.svg`} width={40} alt={id} title={id} />
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Stats */}
        {(plugins['stats']?.enabled || plugins['streak']?.enabled || plugins['langs']?.enabled) && (
          <>
            <h2 className="rm-h2">{tr('rm_stats')}</h2>
            <div className="rm-stats-row">
              {plugins['stats']?.enabled   && <img src={`https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=${statsTheme}&hide_border=true`} alt="stats" className="stat-img" />}
              {plugins['streak']?.enabled  && <img src={`https://streak-stats.demolab.com?user=${user}&theme=${statsTheme}&hide_border=true`} alt="streak" className="stat-img" />}
              {plugins['langs']?.enabled   && <img src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&theme=${statsTheme}&hide_border=true&layout=compact`} alt="langs" className="stat-img" />}
            </div>
          </>
        )}

        {/* Activity Graph */}
        {plugins['activitygraph']?.enabled && (
          <>
            <h2 className="rm-h2">{tr('rm_activity')}</h2>
            <img src={`https://github-readme-activity-graph.vercel.app/graph?username=${user}&theme=react-dark&hide_border=true`} alt="activity" style={{ maxWidth:'100%', borderRadius:8 }} />
          </>
        )}

        {/* Trophies */}
        {plugins['trophy']?.enabled && (
          <>
            <h2 className="rm-h2">{tr('rm_trophies')}</h2>
            <img src={`https://github-profile-trophy.vercel.app/?username=${user}&theme=${statsTheme}&no-frame=true&row=1&column=7`} alt="trophies" style={{ maxWidth:'100%' }} />
          </>
        )}

        {/* Visitor Count */}
        {plugins['views']?.enabled && (
          <>
            <h2 className="rm-h2">{tr('plugin_views')}</h2>
            <div className="visitor-badge-preview">
              <img src={svgToDataURI(visitorBadgeSvg)} alt={tr('plugin_views')} />
            </div>
          </>
        )}

        {/* Snake */}
        {plugins['snake']?.enabled && (
          <>
            <h2 className="rm-h2">Snake Game</h2>
            <div className="snake-preview" dangerouslySetInnerHTML={{ __html: snakeSvg }} />
          </>
        )}

        {/* Projects */}
        {projects.filter(p => p.enabled).length > 0 && (
          <>
            <h2 className="rm-h2">{tr('rm_projects')}</h2>
            <div className="rm-projects">
              {projects.filter(p => p.enabled).map(p => (
                <div key={p.id} className="project-preview">
                  <div className="proj-name">{p.url ? <a href={p.url} target="_blank" rel="noopener">{p.name}</a> : p.name}</div>
                  {p.description && <div className="proj-desc">{p.description}</div>}
                  <div className="proj-meta">
                    {p.language && <span><span className="lang-dot" style={{ background:'#'+p.languageColor }} />{p.language}</span>}
                    {p.stars > 0 && <span>⭐ {p.stars}</span>}
                    {p.forks > 0 && <span>🍴 {p.forks}</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {plugins['wave']?.enabled && (
          <div className="wave-preview wave-preview-footer" dangerouslySetInnerHTML={{ __html: waveFooterSvg }} />
        )}

        <hr className="rm-hr" />
        <p style={{ textAlign:'center', fontSize:12, opacity:.5 }}>⚡ README Builder v2.0 — 100% local</p>
      </div>
    </div>
  )
}

function getSafePerRow(value: number): number {
  return Number.isFinite(value) ? Math.min(20, Math.max(1, value)) : 12
}

function chunkIcons(ids: string[], perRow: number): string[][] {
  const rows: string[][] = []
  for (let i = 0; i < ids.length; i += perRow) {
    rows.push(ids.slice(i, i + perRow))
  }
  return rows
}

function normalizeHex(value: string): string {
  const hex = value.replace('#', '').trim()
  return /^[0-9a-fA-F]{6}$/.test(hex) ? hex : '58a6ff'
}

function SocialBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className="social-badge" style={{ background: color }}>
      {label}
    </span>
  )
}

function getFocusLabelLocal(focus: string, lang: string): string {
  const map: Record<string, { pt: string; en: string }> = {
    fullstack: { pt:'Full Stack Developer',  en:'Full Stack Developer' },
    backend:   { pt:'Backend Developer',     en:'Backend Developer' },
    frontend:  { pt:'Frontend Developer',    en:'Frontend Developer' },
    mobile:    { pt:'Mobile Developer',      en:'Mobile Developer' },
    devops:    { pt:'DevOps / SRE Engineer', en:'DevOps / SRE Engineer' },
    data:      { pt:'Data Engineer / AI',    en:'Data Engineer / AI' },
    security:  { pt:'Security Engineer',     en:'Security Engineer' },
    gamedev:   { pt:'Game Developer',        en:'Game Developer' },
    student:   { pt:'Estudante de Dev',      en:'Dev Student' },
  }
  const e = map[focus]
  return e ? (lang === 'en' ? e.en : e.pt) : focus
}
