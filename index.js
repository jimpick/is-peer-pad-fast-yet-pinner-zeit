#!/usr/bin/env node
'use strict'

const http = require('http')

/*
if (!process.env.DEBUG) {
  process.env.DEBUG = 'peer-star:pinner'
}
*/

let id

const Pinner = require('@jimpick/peer-star-app/src/pinner')

const appName = process.argv[2]
if (!appName) {
  return console.error('need app name')
}

const options = {}

const swarm = process.argv[3]
if (swarm) {
  console.log('using swarm address', swarm)
  options.ipfs = {
    swarm: [swarm],
    bootstrap: [
      '/dns4/ipfs.jimpick.com/tcp/9092/wss/ipfs/QmScdku7gc3VvfZZvT8kHU77bt6bnH3PnGXkyFRZ17g9EG'
    ],
    transport: {
      maxThrottleDelayMS: 10 * 1000 // 10 seconds
    }
  }
}

setTimeout(() => {
  console.log('Shutting down', id, process.env['NOW_DC'])
  process.exit(0)
}, (20 + Math.random(2)) * 60 * 1000)

console.log('pinning app %s', appName)

process.on('unhandledRejection', (err) => {
  console.error(err)
})

const pinner = Pinner(appName, options)
pinner.start().then(() => {
  pinner.ipfs.id().then((peerInfo) => {
    id = peerInfo.id
    console.log('Peer Id:', peerInfo.id)
    if (process.env['NOW_DC']) {
      console.log('Zeit now datacenter:', process.env['NOW_DC'])
    }
  })
})

// From: https://nodejs.org/en/docs/guides/getting-started-guide/
// Just to keep Zeit now from complaining

const hostname = '127.0.0.1'
const port = 3010

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
