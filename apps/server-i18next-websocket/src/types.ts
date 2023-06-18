import ws from 'ws'

declare module 'ws' {
  export interface WebSocket extends ws {
    id: string
    isAlive: boolean
  }
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
  type: 'updateState' | 'requestLead' | 'removeLead'
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
