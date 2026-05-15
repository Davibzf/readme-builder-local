const { buildGithubStatsSvg } = require('./github-card-utils')

function parseQueryValue(value, fallback) {
  if (value == null) return fallback
  const parsed = Number(String(value).trim())
  return Number.isFinite(parsed) ? String(parsed) : fallback
}

module.exports = async function handler(req, res) {
  const query = req.query || {}
  const params = {
    username: String(query.username || 'seu-username').trim(),
    stars: parseQueryValue(query.stars, '0'),
    commits: parseQueryValue(query.commits, '0'),
    prs: parseQueryValue(query.prs, '0'),
    issues: parseQueryValue(query.issues, '0'),
    contributed: parseQueryValue(query.contributed, '0'),
    theme: String(query.theme || 'dark').trim(),
  }

  try {
    const svg = buildGithubStatsSvg(params)
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.status(200).send(svg)
  } catch (error) {
    res.status(500).send(`Error generating GitHub stats SVG: ${error.message}`)
  }
}
