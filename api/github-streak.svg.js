const { buildGithubStreakSvg } = require('./github-card-utils')

function parseQueryValue(value, fallback) {
  if (value == null) return fallback
  const parsed = Number(String(value).trim())
  return Number.isFinite(parsed) ? String(parsed) : fallback
}

module.exports = async function handler(req, res) {
  const query = req.query || {}
  const params = {
    username: String(query.user || 'seu-username').trim(),
    currentStreak: parseQueryValue(query.currentStreak, '0'),
    longestStreak: parseQueryValue(query.longestStreak, '0'),
    totalContribs: parseQueryValue(query.totalContribs, '0'),
    theme: String(query.theme || 'dark').trim(),
  }

  try {
    const svg = buildGithubStreakSvg(params)
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.status(200).send(svg)
  } catch (error) {
    res.status(500).send(`Error generating GitHub streak SVG: ${error.message}`)
  }
}
