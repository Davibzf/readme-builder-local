function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function int(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}

function oneOf(value, options, fallback) {
  return options.includes(value) ? value : fallback
}

function estimateWidth(text, fontSize) {
  return Math.ceil(text.length * fontSize * 0.6)
}

function fmt(value) {
  return Number(value.toFixed(3)).toString()
}

function buildTypingSvg({ texts, color, speed, pause, width, height, align, repeat, font, fontSize }) {
  const isCenter = align === 'center'
  const textY = Math.round(height / 2 + fontSize * 0.35)
  const cursorH = Math.round(fontSize * 1.1)
  const cursorTop = Math.round((height - cursorH) / 2)
  const repeatCount = repeat && texts.length > 1 ? 'indefinite' : '1'

  const timings = []
  let cursor = 0
  for (const text of texts) {
    const start = cursor
    const typeEnd = start + text.length * speed
    const end = typeEnd + pause
    timings.push({ start, typeEnd, end })
    cursor = end
  }

  const totalMs = Math.max(1, cursor)
  const dur = `${(totalMs / 1000).toFixed(3).replace(/\.?0+$/, '')}s`
  const key = ms => Math.max(0, Math.min(1, ms / totalMs)).toFixed(4)
  const nextKey = value => Math.min(1, Number(value) + 0.0001).toFixed(4)

  function heldAnimation(start, typeEnd, fromValue, toValue) {
    const startK = key(start)
    const typeEndK = key(typeEnd)
    const from = fmt(fromValue)
    const to = fmt(toValue)

    if (startK === '0.0000') {
      if (typeEndK === '1.0000') return { keyTimes: '0;1', values: `${from};${to}` }
      return { keyTimes: `0;${typeEndK};1`, values: `${from};${to};${to}` }
    }

    if (typeEndK === '1.0000') {
      return { keyTimes: `0;${startK};1`, values: `${from};${from};${to}` }
    }

    return {
      keyTimes: `0;${startK};${typeEndK};1`,
      values: `${from};${from};${to};${to}`,
    }
  }

  function opacityAnimation(timing) {
    const start = key(timing.start)
    const end = key(timing.end)
    if (start === '0.0000' && end === '1.0000') return ''

    if (start === '0.0000') {
      const afterEnd = nextKey(end)
      if (afterEnd === end) return ''
      if (afterEnd === '1.0000') {
        return `<animate attributeName="opacity" values="1;1;0" keyTimes="0;${end};1" dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>`
      }
      return `<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;${end};${afterEnd};1" dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>`
    }

    if (end === '1.0000') {
      const afterStart = nextKey(start)
      if (afterStart === '1.0000') {
        return `<animate attributeName="opacity" values="0;0;1" keyTimes="0;${start};1" dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>`
      }
      return `<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${start};${afterStart};1" dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>`
    }

    const afterStart = nextKey(start)
    const afterEnd = nextKey(end)
    if (afterEnd === '1.0000') {
      return `<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;${start};${afterStart};${end};1" dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>`
    }
    return `<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${start};${afterStart};${end};${afterEnd};1" dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>`
  }

  const parts = texts.map((text, index) => {
    const timing = timings[index]
    const textWidth = estimateWidth(text, fontSize)
    const startX = isCenter ? (width - textWidth) / 2 : 14
    const endX = startX + textWidth
    const textX = isCenter ? width / 2 : 14
    const textAnchor = isCenter ? 'middle' : 'start'
    const widthAnim = heldAnimation(timing.start, timing.typeEnd, 0, textWidth)
    const cursorAnim = heldAnimation(timing.start, timing.typeEnd, startX, endX)

    return `
  <g opacity="${timing.start === 0 ? '1' : '0'}">
    ${opacityAnimation(timing)}
    <mask id="m${index}">
      <rect x="${fmt(startX)}" y="0" width="0" height="${height}" fill="white">
        <animate attributeName="width" values="${widthAnim.values}" keyTimes="${widthAnim.keyTimes}" dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>
      </rect>
    </mask>
    <text x="${fmt(textX)}" y="${textY}" font-family="${esc(font)}" font-size="${fontSize}" font-weight="600" fill="#${esc(color)}" text-anchor="${textAnchor}" mask="url(#m${index})">${esc(text)}</text>
    <line x1="${fmt(startX)}" y1="${cursorTop}" x2="${fmt(startX)}" y2="${cursorTop + cursorH}" stroke="#${esc(color)}" stroke-width="2" stroke-linecap="round">
      <animate attributeName="x1" values="${cursorAnim.values}" keyTimes="${cursorAnim.keyTimes}" dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>
      <animate attributeName="x2" values="${cursorAnim.values}" keyTimes="${cursorAnim.keyTimes}" dur="${dur}" begin="0s" repeatCount="${repeatCount}" fill="freeze"/>
    </line>
  </g>`
  }).join('')

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Typing SVG">
  <rect width="100%" height="100%" fill="transparent"/>
  ${parts}
</svg>`
}

export default function handler(req, res) {
  const query = req.query || {}
  const rawTexts = Array.isArray(query.text) ? query.text : [query.text]
  const texts = rawTexts.map(text => String(text || '').trim()).filter(Boolean).slice(0, 10)
  const color = String(query.color || '58a6ff').replace(/[^a-fA-F0-9]/g, '').slice(0, 6) || '58a6ff'

  const svg = buildTypingSvg({
    texts: texts.length ? texts : ['README Builder'],
    color,
    speed: int(query.speed, 55, 15, 150),
    pause: int(query.pause, 1200, 0, 5000),
    width: int(query.width, 520, 120, 1200),
    height: int(query.height, 60, 40, 240),
    align: oneOf(query.align, ['left', 'center'], 'center'),
    repeat: query.repeat !== 'false',
    font: String(query.font || 'Consolas, monospace').slice(0, 160),
    fontSize: int(query.fontSize, 28, 10, 80),
  })

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.status(200).send(svg)
}
