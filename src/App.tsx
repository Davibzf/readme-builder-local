import React from 'react'
import { useAppState } from './hooks/useAppState'
import { useToast } from './hooks/useToast'
import Sidebar    from './components/Sidebar'
import Toolbar    from './components/Toolbar'
import Preview    from './components/Preview'
import CodePanel  from './components/CodePanel'
import ToastContainer from './components/Toast'

export default function App() {
  const app    = useAppState()
  const { toasts, show } = useToast()
  const { state } = app

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
