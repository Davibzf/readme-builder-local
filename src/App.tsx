import React from 'react'
import { useAppState } from './hooks/useAppState'
import { useToast } from './hooks/useToast'
import { fetchGithubStatsSnapshot } from './generators/github-stats'
import Sidebar    from './components/Sidebar'
import Toolbar    from './components/Toolbar'
import Preview    from './components/Preview'
import CodePanel  from './components/CodePanel'
import ToastContainer from './components/Toast'

export default function App() {
  const app    = useAppState()
  const { toasts, show } = useToast()
  const { state } = app
  const lastGithubSync = React.useRef('')

  React.useEffect(() => {
    const username = state.profile.username.trim()
    const hasGithubStats =
      Boolean(state.plugins.stats?.enabled) ||
      Boolean(state.plugins.streak?.enabled) ||
      Boolean(state.plugins.langs?.enabled)

    if (!hasGithubStats || !username || username === 'seu-username') return

    const syncKey = [
      username,
      state.plugins.stats?.enabled ? 'stats' : '',
      state.plugins.streak?.enabled ? 'streak' : '',
      state.plugins.langs?.enabled ? 'langs' : '',
    ].join(':')

    if (lastGithubSync.current === syncKey) return

    const timer = window.setTimeout(async () => {
      lastGithubSync.current = syncKey
      try {
        const snapshot = await fetchGithubStatsSnapshot(username)
        for (const [key, value] of Object.entries(snapshot.stats)) {
          app.setPluginField('stats', key, value)
        }
        for (const [key, value] of Object.entries(snapshot.streak)) {
          app.setPluginField('streak', key, value)
        }
        app.setPluginField('langs', 'languagesJson', JSON.stringify(snapshot.languages))
      } catch {
        lastGithubSync.current = ''
        show(state.lang === 'pt' ? 'Erro ao buscar dados do GitHub.' : 'Error fetching GitHub data.', 'error')
      }
    }, 700)

    return () => window.clearTimeout(timer)
  }, [
    state.profile.username,
    state.lang,
    state.plugins.stats?.enabled,
    state.plugins.streak?.enabled,
    state.plugins.langs?.enabled,
  ])

  return (
    <div className="app">
      <Sidebar
        state={state}
        setLang={app.setLang}
        setPreviewTheme={app.setPreviewTheme}
        setStatsTheme={app.setStatsTheme}
        setProfile={app.setProfile}
        setTyping={app.setTyping}
        setTypingText={app.setTypingText}
        setIcons={app.setIcons}
        toggleIcon={app.toggleIcon}
        toggleCategory={app.toggleCategory}
        setSocial={app.setSocial}
        togglePlugin={app.togglePlugin}
        setPluginField={app.setPluginField}
        setAbout={app.setAbout}
        setAboutParagraph={app.setAboutParagraph}
        setFact={app.setFact}
        addProject={app.addProject}
        updateProject={app.updateProject}
        removeProject={app.removeProject}
        applyTemplate={app.applyTemplate}
        reset={app.reset}
        exportConfig={app.exportConfig}
        importConfig={app.importConfig}
        onToast={(msg, type) => show(msg, type)}
      />

      <div className="main">
        <Toolbar
          state={state}
          setView={app.setView}
          exportConfig={app.exportConfig}
          importConfig={app.importConfig}
          onToast={(msg, type) => show(msg, type)}
        />
        <div className="main-content">
          {state.view === 'preview'
            ? <Preview state={state} />
            : <CodePanel state={state} onToast={msg => show(msg)} />
          }
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  )
}
