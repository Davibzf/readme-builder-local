// ============================================================
//  utils/index.ts — Utility functions
// ============================================================

export function chunkIcons(icons: string[], perRow: number): string[][] {
  const chunks: string[][] = []
  for (let i = 0; i < icons.length; i += perRow) {
    chunks.push(icons.slice(i, i + perRow))
  }
  return chunks
}

export function getSafePerRow(perRow: number): number {
  return Math.max(1, Math.min(10, perRow))
}

export function normalizeHex(color: string): string {
  const hex = color.replace('#', '')
  return hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex
}

export function getFocusLabelLocal(focus: string, lang: string): string {
  // Placeholder
  return focus
}