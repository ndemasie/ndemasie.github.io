import ws from 'ws'

export interface WebSocket extends ws {
  id: string
  isAlive: boolean
}

export enum CLIENT_MESSGAE_TYPE {
  REQUEST_LEAD = 'REQUEST_LEAD',
  REMOVE_LEAD = 'REMOVE_LEAD',
  UPDATE_STATE = 'UPDATE_STATE',
}

export enum Role {
  Leader = 'leader',
  Participant = 'participant',
}

export type LessonState = {
  leaderId?: string | null
  leaderName?: string | null
  participantCount?: number
  hash?: string
}

export type MessagePayload = {
  type: CLIENT_MESSGAE_TYPE
  data: {
    user?: {
      id?: string
      name?: string
    }
    lessonState?: {
      hash?: string
    }
  }
}
