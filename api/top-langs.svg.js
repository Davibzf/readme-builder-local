const { buildTopLangsSvg } = require('./github-card-utils')

module.exports = async function handler(req, res) {
  const query = req.query || {}
  const params = {
    username: String(query.username || 'seu-username').trim(),
    languagesJson: String(query.languagesJson || ''),
    theme: String(query.theme || 'dark').trim(),
  }

  try {
    const svg = buildTopLangsSvg(params)
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.status(200).send(svg)
  } catch (error) {
    res.status(500).send(`Error generating GitHub top languages SVG: ${error.message}`)
  }
}
