// ============================================================
//  hooks/useAppState.ts — Centralized state with localStorage
// ============================================================
import { useState, useCallback, useRef } from 'react'
import type { AppState, Lang, CategoryKey, PluginId, FocusKey } from '../types'
import { DEFAULT_STATE, PLUGIN_IDS } from '../data/defaults'

const STORAGE_KEY = 'rb_v2'

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(DEFAULT_STATE)
    const parsed = JSON.parse(raw) as Partial<AppState>
    // Deep merge: preserve new default fields
    const merged = deepMerge(DEFAULT_STATE, parsed) as AppState
    // Ensure plugin keys exist
    for (const id of PLUGIN_IDS) {
      if (!merged.plugins[id]) merged.plugins[id] = { id, enabled: false, fields: {} }
    }
    // Ensure 10 typing texts
    while (merged.typing.texts.length < 10) merged.typing.texts.push('')
    merged.typing.texts = merged.typing.texts.slice(0, 10)
    return normalizeState(merged)
  } catch {
    return structuredClone(DEFAULT_STATE)
  }
}

function deepMerge(target: unknown, source: unknown): unknown {
  if (Array.isArray(source)) return source
  if (source !== null && typeof source === 'object' && typeof target === 'object' && target !== null) {
    const out = { ...(target as Record<string,unknown>) }
    for (const k of Object.keys(source as Record<string,unknown>)) {
      out[k] = deepMerge(
        (target as Record<string,unknown>)[k],
        (source as Record<string,unknown>)[k]
      )
    }
    return out
  }
  return source ?? target
}

function normalizeState(state: AppState): AppState {
  const active = state.icons.activeCategories
  return {
    ...state,
    typing: { ...state.typing, mode: 'local' },
    icons: {
      ...state.icons,
      activeCategories: active.length
        ? [active[0]]
        : [...DEFAULT_STATE.icons.activeCategories],
    },
  }
}

export function useAppState() {
  const [state, setStateRaw] = useState<AppState>(loadState)

  // Debounce save to localStorage
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const setState = useCallback((updater: AppState | ((prev: AppState) => AppState)) => {
    setStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      }, 300)
      return next
    })
  }, [])

  // ── Typed updaters ────────────────────────────────────────

  const setLang = useCallback((lang: Lang) => setState(s => ({ ...s, lang })), [setState])
  const setView = useCallback((view: AppState['view']) => setState(s => ({ ...s, view })), [setState])
  const setPreviewTheme = useCallback((t: AppState['previewTheme']) => setState(s => ({ ...s, previewTheme: t })), [setState])
  const setStatsTheme = useCallback((t: string) => setState(s => ({ ...s, statsTheme: t })), [setState])

  // Profile
  const setProfile = useCallback(
    (patch: Partial<AppState['profile']>) =>
      setState(s => ({ ...s, profile: { ...s.profile, ...patch } })),
    [setState]
  )

  // Typing
  const setTyping = useCallback(
    (patch: Partial<AppState['typing']>) =>
      setState(s => ({ ...s, typing: { ...s.typing, ...patch } })),
    [setState]
  )
  const setTypingText = useCallback((idx: number, val: string) =>
    setState(s => {
      const texts = [...s.typing.texts]
      texts[idx] = val
      return { ...s, typing: { ...s.typing, texts } }
    }), [setState]
  )

  // Icons
  const setIcons = useCallback(
    (patch: Partial<AppState['icons']>) =>
      setState(s => ({ ...s, icons: { ...s.icons, ...patch } })),
    [setState]
  )
  const toggleIcon = useCallback((id: string) =>
    setState(s => {
      const sel = s.icons.selected
      const next = sel.includes(id) ? sel.filter(x => x !== id) : [...sel, id]
      return { ...s, icons: { ...s.icons, selected: next } }
    }), [setState]
  )
  const toggleCategory = useCallback((cat: CategoryKey) =>
    setState(s => {
      return { ...s, icons: { ...s.icons, activeCategories: [cat] } }
    }), [setState]
  )

  // Social
  const setSocial = useCallback(
    (patch: Partial<AppState['social']>) =>
      setState(s => ({ ...s, social: { ...s.social, ...patch } })),
    [setState]
  )

  // Plugins
  const togglePlugin = useCallback((id: PluginId) =>
    setState(s => ({
      ...s,
      plugins: {
        ...s.plugins,
        [id]: { ...s.plugins[id], enabled: !s.plugins[id].enabled }
      }
    })), [setState]
  )
  const setPluginField = useCallback((id: PluginId, key: string, val: string) =>
    setState(s => ({
      ...s,
      plugins: {
        ...s.plugins,
        [id]: { ...s.plugins[id], fields: { ...s.plugins[id].fields, [key]: val } }
      }
    })), [setState]
  )

  // About
  const setAbout = useCallback(
    (patch: Partial<AppState['about']>) =>
      setState(s => ({ ...s, about: { ...s.about, ...patch } })),
    [setState]
  )
  const setAboutParagraph = useCallback((idx: number, val: string) =>
    setState(s => {
      const paragraphs = [...s.about.paragraphs]
      paragraphs[idx] = val
      return { ...s, about: { ...s.about, paragraphs } }
    }), [setState]
  )
  const setFact = useCallback((idx: number, patch: Partial<AppState['about']['facts'][0]>) =>
    setState(s => {
      const facts = s.about.facts.map((f, i) => i === idx ? { ...f, ...patch } : f)
      return { ...s, about: { ...s.about, facts } }
    }), [setState]
  )

  // Projects
  const addProject = useCallback(() =>
    setState(s => ({
      ...s,
      projects: [...s.projects, {
        id: Date.now().toString(),
        name: '', description: '', language: '',
        languageColor: '3572A5', stars: 0, forks: 0, url: '', enabled: true,
      }]
    })), [setState]
  )
  const updateProject = useCallback((id: string, patch: Partial<AppState['projects'][0]>) =>
    setState(s => ({
      ...s,
      projects: s.projects.map(p => p.id === id ? { ...p, ...patch } : p)
    })), [setState]
  )
  const removeProject = useCallback((id: string) =>
    setState(s => ({ ...s, projects: s.projects.filter(p => p.id !== id) })),
    [setState]
  )

  // Section order
  const moveSectionUp = useCallback((idx: number) =>
    setState(s => {
      if (idx === 0) return s
      const arr = [...s.sectionOrder]
      ;[arr[idx-1], arr[idx]] = [arr[idx], arr[idx-1]]
      return { ...s, sectionOrder: arr }
    }), [setState]
  )
  const moveSectionDown = useCallback((idx: number) =>
    setState(s => {
      if (idx >= s.sectionOrder.length - 1) return s
      const arr = [...s.sectionOrder]
      ;[arr[idx], arr[idx+1]] = [arr[idx+1], arr[idx]]
      return { ...s, sectionOrder: arr }
    }), [setState]
  )
  const toggleSection = useCallback((id: string) =>
    setState(s => ({
      ...s,
      sectionOrder: s.sectionOrder.map(sec =>
        sec.id === id ? { ...sec, enabled: !sec.enabled } : sec
      )
    })), [setState]
  )

  // Template apply
  const applyTemplate = useCallback((partial: Partial<AppState>) =>
    setState(s => normalizeState(deepMerge(s, partial) as AppState)), [setState]
  )

  // Reset
  const reset = useCallback(() => {
    const fresh = structuredClone(DEFAULT_STATE)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
    setStateRaw(fresh)
  }, [])

  // Import / Export
  const exportConfig = useCallback(() => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'readme-builder-config.json'; a.click()
    URL.revokeObjectURL(url)
  }, [state])

  const importConfig = useCallback((file: File): Promise<void> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const parsed = JSON.parse(e.target?.result as string)
          const merged = normalizeState(deepMerge(DEFAULT_STATE, parsed) as AppState)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
          setStateRaw(merged)
          resolve()
        } catch { reject(new Error('Invalid JSON')) }
      }
      reader.readAsText(file)
    }), [])

  return {
    state,
    setLang, setView, setPreviewTheme, setStatsTheme,
    setProfile, setTyping, setTypingText,
    setIcons, toggleIcon, toggleCategory,
    setSocial,
    togglePlugin, setPluginField,
    setAbout, setAboutParagraph, setFact,
    addProject, updateProject, removeProject,
    moveSectionUp, moveSectionDown, toggleSection,
    applyTemplate, reset, exportConfig, importConfig,
  }
}
