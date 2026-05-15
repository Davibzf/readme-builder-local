async function fetchSvg(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  return res.text()
}

export default async function handler(req, res) {
  const query = req.query || {}
  const username = String(query.username || 'seu-username').trim()
  const theme = String(query.theme || 'dark').trim()
  const url = `https://github-readme-stats.vercel.app/api/top-langs/?username=${encodeURIComponent(username)}&layout=compact&theme=${encodeURIComponent(theme)}&hide_border=true`

  try {
    const svg = await fetchSvg(url)
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=86400')
    res.status(200).send(svg)
  } catch (error) {
    res.status(502).send(`Error generating GitHub top languages SVG: ${error.message}`)
  }
}
