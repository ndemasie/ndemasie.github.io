import { RawData, WebSocketServer, WebSocket, ServerOptions } from 'ws'

import crypto from 'crypto'

import { LessonState, MessagePayload } from './types'

export class WebSocketManager {
  private static _INSTANCE: WebSocketManager
  static get(serverOptions?: ServerOptions) {
    return WebSocketManager._INSTANCE ?? new WebSocketManager(serverOptions)
  }

  private _UPDATE_DELAY = 10 * 1000
  private _UPDATE_TIMER: NodeJS.Timer

  private _POLL_DELAY = 30 * 1000
  private _POLL_TIMER: NodeJS.Timer

  private _wss: WebSocketServer
  private _client_leader?: string

  public lessonState: LessonState = {}

  private constructor(serverOptions?: ServerOptions) {
    WebSocketManager._INSTANCE = this

    const wss = new WebSocketServer({
      ...(serverOptions || {}),
      port: parseInt(process.env?.WEBSOCKET_PORT ?? '3001', 10),
    })

    this._POLL_TIMER = setInterval(() => {
      this._log('Polling clients')
      this._wss.clients.forEach((ws) => this.ping(ws))
    }, this._POLL_DELAY)

    this._UPDATE_TIMER = setInterval(() => {
      this._log('Broadcasting state')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, ...other } = this.lessonState
      this.broadcast(other)
    }, this._UPDATE_DELAY)

    wss.on('connection', this._onConnection)
    wss.on('close', this._onClose)

    this._wss = wss
    return this
  }

  public deserialize(data: RawData) {
    try {
      return JSON.parse(data?.toString())
    } catch {
      /* empty */
    }
  }

  public serialize(payload: any) {
    return JSON.stringify(payload)
  }

  public send(client: WebSocket, payload: any) {
    client.send(this.serialize(payload))
  }

  public broadcast(payload: Record<string, any>) {
    const message = this.serialize(payload)
    this._wss.clients.forEach((client) => {
      if (!client.isAlive) return
      client.send(message)
    })
  }

  public ping(client: WebSocket) {
    if (client.isAlive === false) {
      if (client.id === this._client_leader) {
        this._unassignLeader()
        this.lessonState.participantCount = this._wss.clients.size
      }
      return client.terminate()
    }
    client.isAlive = false
    client.ping()
  }

  private _onClientError = () => console.error

  private _onClientMessage = (data: RawData, client: WebSocket) => {
    const { type, data: message } =
      (this.deserialize(data) as MessagePayload) ?? {}

    switch (type) {
      case 'requestLead': {
        if (this._client_leader) break
        this._client_leader = client.id
        this.lessonState.hash = message?.lessonState?.hash
        this.lessonState.leaderId = message.user?.id
        this.lessonState.leaderName = message.user?.name
        break
      }

      case 'removeLead': {
        if (client.id !== this._client_leader) break
        this._log('Updating lead', message)
        this._unassignLeader()
        break
      }

      case 'updateState': {
        if (client.id !== this._client_leader) break
        this._log('Updating state')
        this.lessonState.hash = message.lessonState?.hash
        break
      }

      default:
    }

    this.lessonState.participantCount = this._wss.clients.size
    this.broadcast(this.lessonState)
  }

  private _onConnection = (ws: WebSocket) => {
    ws.id = crypto.randomUUID()
    ws.isAlive = true

    this.lessonState.participantCount = this._wss.clients.size

    ws.on('open', () => this.send(ws, this.lessonState))
    ws.on('error', this._onClientError)
    ws.on('pong', () => (ws.isAlive = true))
    ws.on('message', (data) => this._onClientMessage(data, ws))
    ws.on('close', () => {
      this._log(`Closing ${ws.id} connection`)
      if (ws.id === this._client_leader) this._unassignLeader()
      ws.terminate()

      this.lessonState.participantCount = this._wss.clients.size
      this.broadcast(this.lessonState)
    })
  }

  private _onClose() {
    clearInterval(this._POLL_TIMER)
    clearInterval(this._UPDATE_TIMER)
  }

  private _unassignLeader() {
    this._client_leader = undefined
    this.lessonState.leaderId = null
    this.lessonState.leaderName = null
  }

  private _log(message: string, payload?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, {
        internal: {
          _client_leader: this._client_leader,
          clients: this._wss.clients.size,
        },
        lessonState: this.lessonState,
        ...(payload && { payload }),
      })
    }
  }
}
