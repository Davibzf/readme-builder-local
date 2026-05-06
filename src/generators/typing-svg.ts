// ============================================================
//  generators/typing-svg.ts
//  100% local animated typing SVG generator
//  No external dependencies whatsoever.
// ============================================================
import type { TypingConfig } from '../types'
import { getFontById } from '../data/fonts'

interface SvgOptions {
  texts: string[]
  fontStack: string
  fontSize: number
  color: string      // hex with #
  speed: number      // ms per char
  pause: number      // pause ms between lines
  width: number
  height: number
  align: 'left' | 'center'
  repeat: boolean
}

// Estimate text pixel width for a monospace font at a given size
function estimateWidth(text: string, fontSize: number): number {
  // Monospace: ~0.6 ratio is accurate for most mono fonts
  return Math.ceil(text.length * fontSize * 0.6)
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function fmt(n: number): string {
  return Number(n.toFixed(3)).toString()
}

export function generateTypingSVG(config: TypingConfig): string {
  const font  = getFontById(config.font)
  const lines = config.texts.map(t => t.trim()).filter(Boolean)
  if (!lines.length) return ''

  const opts: SvgOptions = {
    texts:     lines,
    fontStack: font.stack,
    fontSize:  Math.max(10, config.fontSize),
    color:     '#' + config.color.replace('#', ''),
    speed:     Math.max(15, config.speed),
    pause:     Math.max(0, config.pause),
    width:     Math.max(120, config.width),
    height:    Math.max(40, config.height),
    align:     config.align,
    repeat:    config.repeat,
  }

  return buildSVG(opts)
}

function buildSVG(o: SvgOptions): string {
  const { texts, fontStack, fontSize, color, speed, pause, width, height, align, repeat } = o

  const isCenter  = align === 'center'
  const textY     = Math.round(height / 2 + fontSize * 0.35)
  const cursorH   = Math.round(fontSize * 1.1)
  const cursorTop = Math.round((height - cursorH) / 2)
  const repeatCount = repeat ? 'indefinite' : '1'

  // Build timeline for all lines
  interface Timing { start: number; typeEnd: number; pauseEnd: number; end: number }
  const timings: Timing[] = []
  let cursor = 0
  for (const text of texts) {
    const typeIn  = text.length * speed
    const typeOut = Math.round(typeIn * 0.65)
    const start   = cursor
    const typeEnd = start + typeIn
    const pauseEnd = typeEnd + pause
    const end     = pauseEnd + typeOut
    timings.push({ start, typeEnd, pauseEnd, end })
    cursor = end
  }
  const totalMs = Math.max(1, cursor + pause)
  const dur     = (totalMs / 1000).toFixed(3).replace(/\.?0+$/, '') + 's'

  function key(ms: number) {
    return Math.max(0, Math.min(1, ms / totalMs)).toFixed(4)
  }

  // Build mask + text + cursor for each line
  let parts = ''
  texts.forEach((text, i) => {
    const tim     = timings[i]
    const tw      = estimateWidth(text, fontSize)
    const startX  = isCenter ? (width - tw) / 2 : 14
    const endX    = startX + tw
    const textX   = isCenter ? width / 2 : 14
    const textAnchor = isCenter ? 'middle' : 'start'

    // keyTimes for mask width animation
    const kT = [
      key(0), key(tim.start), key(tim.typeEnd),
      key(tim.pauseEnd), key(tim.end), key(totalMs)
    ].join(';')

    // width values: 0 → grow during typeIn → full during pause → shrink during typeOut → 0
    const wV = `0;0;${fmt(tw)};${fmt(tw)};0;0`

    // opacity for whole group: invisible outside this line's window
    const gKT = [key(0), key(tim.start), key(tim.start), key(tim.end), key(tim.end), key(totalMs)].join(';')
    const gOp = '0;0;1;1;0;0'

    // cursor x: moves from startX to endX during typeIn, back to startX during typeOut
    const cKT = [
      key(0), key(tim.start), key(tim.typeEnd),
      key(tim.pauseEnd), key(tim.end), key(totalMs)
    ].join(';')
    const cXV = `${fmt(startX)};${fmt(startX)};${fmt(endX)};${fmt(endX)};${fmt(startX)};${fmt(startX)}`

    parts += `
  <g opacity="0">
    <animate attributeName="opacity" values="${gOp}" keyTimes="${gKT}"
      dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>

    <mask id="m${i}">
      <rect x="${fmt(startX)}" y="0" width="0" height="${height}" fill="white">
        <animate attributeName="width" values="${wV}" keyTimes="${kT}"
          dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>
      </rect>
    </mask>

    <text x="${fmt(textX)}" y="${textY}"
      font-family="${esc(fontStack)}"
      font-size="${fontSize}"
      font-weight="600"
      fill="${esc(color)}"
      text-anchor="${textAnchor}"
      mask="url(#m${i})">${esc(text)}</text>

    <line
      x1="${fmt(startX)}" y1="${cursorTop}"
      x2="${fmt(startX)}" y2="${cursorTop + cursorH}"
      stroke="${esc(color)}" stroke-width="2" stroke-linecap="round">
      <animate attributeName="x1" values="${cXV}" keyTimes="${cKT}"
        dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>
      <animate attributeName="x2" values="${cXV}" keyTimes="${cKT}"
        dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>
      <animate attributeName="opacity" values="0;0;1;1;1;0;0"
        keyTimes="0;${key(tim.start)};${key(tim.start + speed)};${key(tim.typeEnd)};${key(tim.pauseEnd)};${key(tim.end)};1"
        dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>
    </line>
  </g>`
  })

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
  fill="none" xmlns="http://www.w3.org/2000/svg"
  role="img" aria-label="Typing SVG">
  <rect width="100%" height="100%" fill="transparent"/>
  ${parts}
</svg>`
}

// ── Badge SVG generator (100% local, no shields.io) ──────────
export interface BadgeOptions {
  label: string
  message: string
  labelColor: string    // hex without #
  messageColor: string  // hex without #
  style: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic'
  logo?: string         // inline SVG path or empty
}

export function generateBadgeSVG(opts: BadgeOptions): string {
  const { label, message, labelColor, messageColor, style } = opts
  const isBig   = style === 'for-the-badge'
  const fontSize = isBig ? 11 : 11
  const height   = isBig ? 28 : 20
  const rx       = style === 'flat-square' || style === 'for-the-badge' ? 0 : 3
  const padding  = isBig ? 10 : 6
  const charW    = isBig ? 7.2 : 6.5

  const labelW   = Math.ceil(label.length * charW + padding * 2)
  const messageW = Math.ceil(message.length * charW + padding * 2)
  const totalW   = labelW + messageW
  const textY    = Math.round(height / 2 + fontSize * 0.37)
  const textYs   = isBig ? Math.round(height / 2 - fontSize * 0.6) : textY // shadow

  const labelColor6  = labelColor.replace('#','').slice(0,6)
  const msgColor6    = messageColor.replace('#','').slice(0,6)
  const labelText    = isBig ? label.toUpperCase() : label
  const messageText  = isBig ? message.toUpperCase() : message

  // Determine text color based on background luminance
  function textColor(hex: string): string {
    const r = parseInt(hex.slice(0,2),16)
    const g = parseInt(hex.slice(2,4),16)
    const b = parseInt(hex.slice(4,6),16)
    const lum = (0.299*r + 0.587*g + 0.114*b) / 255
    return lum > 0.5 ? '#333' : '#fff'
  }

  const labelTxt = textColor(labelColor6)
  const msgTxt   = textColor(msgColor6)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${height}">
  <rect width="${totalW}" height="${height}" rx="${rx}" fill="#${labelColor6}"/>
  <rect x="${labelW}" width="${messageW}" height="${height}" rx="${rx}" fill="#${msgColor6}"/>
  ${rx > 0 ? `<rect x="${labelW}" width="4" height="${height}" fill="#${msgColor6}"/>` : ''}
  <g fill="${labelTxt}" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${fontSize}">
    <text x="${Math.round(labelW/2)}" y="${textY}" text-anchor="middle">${esc(labelText)}</text>
  </g>
  <g fill="${msgTxt}" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${fontSize}">
    <text x="${Math.round(labelW + messageW/2)}" y="${textY}" text-anchor="middle">${esc(messageText)}</text>
  </g>
</svg>`
}

// ── Wave SVG (local replacement for capsule-render) ───────────
export function generateWaveSVG(
  position: 'header' | 'footer',
  color: string = '58a6ff',
  height: number = 120,
  text: string = '',
  width: number = 900,
): string {
  const hex = '#' + color.replace('#', '')
  const isHeader = position === 'header'

  const wavePath = isHeader
    ? `M0,${height} C${width*0.25},${height*0.4} ${width*0.75},${height*0.1} ${width},${height*0.5} L${width},0 L0,0 Z`
    : `M0,0 C${width*0.25},${height*0.6} ${width*0.75},${height*0.9} ${width},${height*0.5} L${width},${height} L0,${height} Z`

  const textEl = text
    ? `<text x="${width/2}" y="${isHeader ? Math.round(height*0.65) : Math.round(height*0.45)}"
        font-family="sans-serif" font-size="28" font-weight="700" fill="#fff"
        text-anchor="middle">${esc(text)}</text>`
    : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%">
  <path d="${wavePath}" fill="${hex}"/>
  ${textEl}
</svg>`
}

// ── Visitor badge SVG (local replacement for komarev) ─────────
export function generateVisitorBadgeSVG(label: string = 'VISITANTES'): string {
  return generateBadgeSVG({
    label,
    message: '0',
    labelColor: '555',
    messageColor: '2196F3',
    style: 'flat',
  })
}

// ── Helpers for download / copy ───────────────────────────────
export function downloadSVG(svg: string, filename: string): void {
  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export function copySVGToClipboard(svg: string): Promise<void> {
  return navigator.clipboard.writeText(svg)
}
