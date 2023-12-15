const confidence = require('confidence')
require('dotenv').config()


const config = {
  port: process.env.PORT,
  client_url: process.env.CLIENT_URI,
  constants: {
    message: {
      send: 'send-message',
      get: 'get-messages'
    }
  }
}


const store = new confidence.Store(config)
module.exports = (key) => store.get(key)