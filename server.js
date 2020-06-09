// https://www.raygesualdo.com/posts/2017/05/09/301-redirects-with-nextjs/
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const redirects = [
  { from: '/posts/2009-12-02-about-crows', to: 'https://steveklabnik.com/writing/about-crows' },
  { from: '/old-link-2', to: 'https://externalsite.com/new-link-2' },
]

app.prepare().then(() => {
  const server = express()

  redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
    server[method](from, (req, res) => {
      res.redirect(type, to)
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})