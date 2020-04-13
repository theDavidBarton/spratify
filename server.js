'use strict'

const express = require('express')
const request = require('request')
const compression = require('compression')
const path = require('path')

const options = {
  method: 'GET',
  url: 'https://accounts.spotify.com/en/authorize',
  qs: {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'token',
    redirect_uri: 'http://localhost:5000/api'
  }
}

let parsedResult

async function apiCall(options) {
  // (I.) promise to return the parsedResult for processing
  function spotifyRequest() {
    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        try {
          resolve(JSON.parse(body))
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  // (II.)
  try {
    parsedResult = await spotifyRequest()
  } catch (e) {
    console.error(e)
  }
  return parsedResult
}

function endpointCreation() {
  try {
    const app = express()
    const port = process.env.PORT || 5000

    app.use(compression())

    /*
    app.use(express.static(path.join(__dirname, 'client/build')))
    // required to serve SPA on heroku production without routing problems; it will skip only 'api' calls
    if (process.env.NODE_ENV === 'production') {
      app.get(/^((?!(api)).)*$/, function(req, res) {
        res.set('Cache-Control', 'public, max-age=31536001')
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
      })
    }
    */

    app.get('/api/', async (req, res) => {
      res.set('Cache-Control', 'no-cache')
      res.json(await apiCall(options))
      // res.json({ say: 'my name' })
      console.log('/api/ endpoint has been called!')
    })

    app.listen(port)

    console.log(`API is listening on ${port}`)
  } catch (e) {
    console.error(e)
  }
}
endpointCreation()
