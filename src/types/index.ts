// ============================================================
//  types/index.ts — README Builder | All TypeScript types
// ============================================================

export type Lang = 'pt' | 'en'
export type PreviewTheme = 'light' | 'dark'
export type TypingMode = 'local' | 'external'
export type IconSource = 'local' | 'external'
export type BadgeStyle = 'flat' | 'flat-square' | 'for-the-badge' | 'plastic'
export type View = 'preview' | 'markdown'

// ── PROFILE ───────────────────────────────────────────────────
export interface Profile {
  username: string
  displayName: string
  bio: string
  location: string
  focus: FocusKey
  pronouns: string
  website: string
  openToWork: boolean
}

export type FocusKey =
  | 'fullstack' | 'backend' | 'frontend' | 'mobile'
  | 'devops' | 'data' | 'security' | 'gamedev' | 'student'

// ── TYPING SVG ────────────────────────────────────────────────
export interface TypingConfig {
  mode: TypingMode
  texts: string[]          // up to 10
  color: string            // hex without #
  speed: number            // ms per char
  pause: number            // ms between lines
  font: string             // font id
  fontSize: number
  width: number
  height: number
  align: 'left' | 'center'
  repeat: boolean
}

// ── ICONS ─────────────────────────────────────────────────────
export interface IconDef {
  id: string
  label: string
  category: CategoryKey
  hasLocal: boolean
}

export type CategoryKey =
  | 'backend' | 'frontend' | 'devops' | 'database'
  | 'mobile' | 'tools' | 'ai' | 'cloud' | 'design'
  | 'gamedev' | 'testing'

export interface IconsConfig {
  source: IconSource
  selected: string[]
  perRow: number
  search: string
  activeCategories: CategoryKey[]
}

// ── SOCIAL ────────────────────────────────────────────────────
export interface SocialLink {
  id: string
  label: string
  url: string
  enabled: boolean
}

export interface Social {
  linkedin: string
  twitter: string
  website: string
  email: string
  discord: string
  youtube: string
  devto: string
}

// ── BADGES ────────────────────────────────────────────────────
export interface BadgeConfig {
  id: string
  label: string
  message: string
  color: string       // hex
  labelColor: string  // hex
  style: BadgeStyle
  logo?: string       // icon id for embedded logo
  link?: string
  enabled: boolean
}

// ── PLUGINS ───────────────────────────────────────────────────
export type PluginId =
  | 'snake' | 'stats' | 'streak' | 'langs' | 'trophy'
  | 'activitygraph' | 'views' | 'wakatime' | 'spotify'
  | 'leetcode' | 'codewars' | 'hackerrank' | 'wave'

export interface PluginConfig {
  id: PluginId
  enabled: boolean
  fields: Record<string, string>
}

// ── ABOUT SECTION ─────────────────────────────────────────────
export interface AboutSection {
  enabled: boolean
  paragraphs: string[]    // up to 3 free-text paragraphs
  facts: FactItem[]       // bullet list facts
}

export interface FactItem {
  id: string
  emoji: string
  text: string
}

// ── PINNED PROJECTS ───────────────────────────────────────────
export interface PinnedProject {
  id: string
  name: string
  description: string
  language: string
  languageColor: string
  stars: number
  forks: number
  url: string
  enabled: boolean
}

// ── SECTION ORDER ─────────────────────────────────────────────
export type SectionId =
  | 'header' | 'about' | 'icons' | 'stats'
  | 'projects' | 'snake' | 'plugins' | 'footer'

export interface SectionOrder {
  id: SectionId
  enabled: boolean
}

// ── TEMPLATE ──────────────────────────────────────────────────
export interface Template {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  emoji: string
  config: Partial<AppState>
}

// ── FULL APP STATE ────────────────────────────────────────────
export interface AppState {
  version: string
  lang: Lang
  previewTheme: PreviewTheme
  view: View
  statsTheme: string

  profile: Profile
  typing: TypingConfig
  icons: IconsConfig
  social: Social
  badges: BadgeConfig[]
  plugins: Record<PluginId, PluginConfig>
  about: AboutSection
  projects: PinnedProject[]
  sectionOrder: SectionOrder[]
}

// ── FONT DEF ──────────────────────────────────────────────────
export interface FontDef {
  id: string
  label: string
  style: string
  stack: string    // CSS font-family fallback stack (local only)
  className: string
}
