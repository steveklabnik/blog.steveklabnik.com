// https://www.raygesualdo.com/posts/2017/05/09/301-redirects-with-nextjs/
const express = require('express')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = express()

const redirects = [
  { from: '/posts/2009-12-02-about-crows', to: 'https://steveklabnik.com/writing/about-crows' },
  { from: '/old-link-2', to: 'https://externalsite.com/new-link-2' },
]

redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
  app[method](from, (req, res) => {
    res.redirect(type, to)
  })
})

app.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})