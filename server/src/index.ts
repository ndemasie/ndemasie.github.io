import WebSocket from 'ws'

const wss = new WebSocket.Server({ port: 3001 })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`)
    ws.send(`Server received your message: ${message}`)
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log('WebSocket server started')
