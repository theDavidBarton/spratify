'use strict'

const express = require('express')
const request = require('request')
const compression = require('compression')
const path = require('path')

// https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
const options = {
  method: 'POST',
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${process.env.BASE64_ENDODED_CLIENTID_COLON_CLIENTSECRET}`
  },
  qs: { grant_type: 'client_credentials' }
}

let parsedResult

async function getAccessToken(options) {
  // (I.) promise to return the parsedResult for processing
  function spotifyRequest() {
    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        try {
          resolve(JSON.parse(body).access_token)
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

    // Liam Neeson reference: Taken (token)
    app.get('/api/liamNeeson', async (req, res) => {
      res.set('Cache-Control', 'no-cache')
      const accessToken = await getAccessToken(options)
      res.json(accessToken)
      console.log(`/api/liamNeeson endpoint has been called! ${accessToken}`)
    })

    app.listen(port)

    console.log(`API is listening on ${port}`)
  } catch (e) {
    console.error(e)
  }
}
endpointCreation()
