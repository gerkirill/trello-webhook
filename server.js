require('dotenv').config()
const http = require('http')
const debug = require('util').debuglog('server')
const cote = require('cote')

const PORT = 2018
const EVENT_NAME = 'POST hook received'

const publisher = new cote.Publisher({ name: 'Web-hook publisher' })
const server = http.createServer(requestHandler)

server.listen(PORT, err => {
  if (err) {
    return errorHandler(err)
  }
  console.log(`server is listening on :${PORT}`)
})
server.on('error', errorHandler)

function requestHandler(request, response) {
  let requestBody = ''
  request.on('data', chunk => (requestBody += chunk))
  request.on('end', () => {
    debug('%s %s %s', request.method, request.url, requestBody)
    if (request.method === 'POST') {
      publisher.publish(EVENT_NAME, JSON.parse(requestBody))
    }
  })
  response.end('Web-hook server is up and running!')
}

function errorHandler(err) {
  console.error('ERROR HAPPENED', err)
}
