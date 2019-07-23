require('dotenv').config()
const cote = require('cote')
const request = require('request')

console.log(`Redis: ${process.env.COTE_DISCOVERY_REDIS_HOST}`)
const TRELLO_KEY = process.env.TRELLO_KEY
const TRELLO_TOKEN = process.env.TRELLO_TOKEN

var ignoreNextMove = false

// this subscriber prevents cards from being moved to the other list
const subscriber = new cote.Subscriber({ name: 'Web-hook subscriber' })
subscriber.on('POST hook received', update => {
  const display = update.action.display
  if (display.translationKey !== 'action_move_card_from_list_to_list') return
  console.log(
    display,
    display.translationKey === 'action_move_card_from_list_to_list',
    display.entities.card.id,
    display.entities.listBefore.id,
    display.entities.listAfter.id
  )
  const options = {
    method: 'PUT',
    url: `https://api.trello.com/1/cards/${display.entities.card.id}?key=${TRELLO_KEY}&idList=${display.entities.listBefore.id}&token=${TRELLO_TOKEN}`,
  }
  if (ignoreNextMove) {
    ignoreNextMove = false
  } else {
    ignoreNextMove = true
    request(options, function(error, response, body) {
      if (error) throw new Error(error)
      // console.log(body)
    })
  }
})
