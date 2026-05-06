// ============================================================
//  data/fonts.ts — Local font definitions
//  All fonts loaded via @font-face from /assets/fonts/
// ============================================================
import type { FontDef } from '../types'

export const FONTS: FontDef[] = [
  {
    id: 'jetbrains',
    label: 'JetBrains Mono',
    style: 'developer / terminal',
    stack: '"JetBrains Mono", "Courier New", monospace',
    className: 'font-jetbrains',
  },
  {
    id: 'firacode',
    label: 'Fira Code',
    style: 'programação / ligatures',
    stack: '"Fira Code", "Courier New", monospace',
    className: 'font-firacode',
  },
  {
    id: 'robotomono',
    label: 'Roboto Mono',
    style: 'clean / legível',
    stack: '"Roboto Mono", "Courier New", monospace',
    className: 'font-robotomono',
  },
  {
    id: 'spacemono',
    label: 'Space Mono',
    style: 'futurista',
    stack: '"Space Mono", "Courier New", monospace',
    className: 'font-spacemono',
  },
  {
    id: 'inconsolata',
    label: 'Inconsolata',
    style: 'minimalista',
    stack: '"Inconsolata", "Courier New", monospace',
    className: 'font-inconsolata',
  },
  {
    id: 'system-mono',
    label: 'System Mono',
    style: 'padrão do sistema (sem download)',
    stack: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    className: 'font-system',
  },
]

export const getFontById = (id: string): FontDef =>
  FONTS.find(f => f.id === id) ?? FONTS[0]
