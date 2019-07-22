require('dotenv').config()
const cote = require('cote')

const subscriber = new cote.Subscriber({ name: 'Web-hook subscriber' })
subscriber.on('POST hook received', update => {
  console.log(update)
})
