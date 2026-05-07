function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function color(value, fallback) {
  const sanitized = String(value || fallback).replace(/[^a-fA-F0-9]/g, '').slice(0, 6)
  return sanitized.length === 6 ? sanitized : fallback
}

function textColor(hex) {
  const r = Number.parseInt(hex.slice(0, 2), 16)
  const g = Number.parseInt(hex.slice(2, 4), 16)
  const b = Number.parseInt(hex.slice(4, 6), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.5 ? '#333' : '#fff'
}

function buildBadge({ label, message, labelColor, messageColor, style }) {
  const isBig = style === 'for-the-badge'
  const fontSize = 11
  const height = isBig ? 28 : 20
  const rx = style === 'flat-square' || style === 'for-the-badge' ? 0 : 3
  const padding = isBig ? 10 : 6
  const charW = isBig ? 7.2 : 6.5
  const labelText = isBig ? label.toUpperCase() : label
  const messageText = isBig ? message.toUpperCase() : message
  const labelW = Math.ceil(labelText.length * charW + padding * 2)
  const messageW = messageText ? Math.ceil(messageText.length * charW + padding * 2) : 0
  const totalW = labelW + messageW
  const textY = Math.round(height / 2 + fontSize * 0.37)

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${height}" role="img" aria-label="${esc(label)}">
  <rect width="${totalW}" height="${height}" rx="${rx}" fill="#${labelColor}"/>
  ${messageW ? `<rect x="${labelW}" width="${messageW}" height="${height}" rx="${rx}" fill="#${messageColor}"/>` : ''}
  ${rx > 0 && messageW ? `<rect x="${labelW}" width="4" height="${height}" fill="#${messageColor}"/>` : ''}
  <g fill="${textColor(labelColor)}" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${fontSize}">
    <text x="${Math.round(labelW / 2)}" y="${textY}" text-anchor="middle">${esc(labelText)}</text>
  </g>
  ${messageW ? `<g fill="${textColor(messageColor)}" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${fontSize}">
    <text x="${Math.round(labelW + messageW / 2)}" y="${textY}" text-anchor="middle">${esc(messageText)}</text>
  </g>` : ''}
</svg>`
}

export default function handler(req, res) {
  const query = req.query || {}
  const style = ['flat', 'flat-square', 'for-the-badge', 'plastic'].includes(query.style) ? query.style : 'for-the-badge'
  const svg = buildBadge({
    label: String(query.label || 'Badge').slice(0, 40),
    message: String(query.message || '').slice(0, 40),
    labelColor: color(query.labelColor, '555555'),
    messageColor: color(query.messageColor, '58a6ff'),
    style,
  })

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.status(200).send(svg)
}
