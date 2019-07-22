require('dotenv').config()
const cote = require('cote')

console.log(`Redis: ${process.env.COTE_DISCOVERY_REDIS_HOST}`)

const subscriber = new cote.Subscriber({ name: 'Web-hook subscriber' })
subscriber.on('POST hook received', update => {
  console.log(update)
})
