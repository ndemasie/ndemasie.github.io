import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { useHash } from 'react-use'
import useLibWebSocket, { Options } from 'react-use-websocket'

import { LessonState, useLessonContext } from './lesson'
import { Role, UserState, useUserContext } from './user'

type MessagePayload = {
  type: string
  data?: {
    user?: Partial<UserState>
    lessonState?: Partial<LessonState>
  }
}

// Context
const WebSocketContext = createContext<ReturnType<typeof Context> | null>(null)
const Context = () => {
  const [user, setUser] = useUserContext()
  const { setLessonState } = useLessonContext()

  const onMessage: Options['onMessage'] = (event) => {
    try {
      const data = JSON.parse(event.data?.toString()) as LessonState
      if (!data) return
      setLessonState(data)

      if (data?.leaderId !== user.id && user.role === Role.Leader)
        setUser({ role: Role.Participant })
    } catch (error) {
      /* empty */
    }
  }

  const { sendMessage, lastMessage, readyState } = useLibWebSocket(
    import.meta.env?.PROD
      ? 'ws://ec2-3-75-85-223.eu-central-1.compute.amazonaws.com/'
      : 'ws://localhost:3001/',
    {
      onOpen: () => console.log('opened'),
      onMessage,
      onError: console.error,
      onClose: console.warn,
      shouldReconnect: () => true,
    },
  )

  const sendStringifiedMessage = useCallback(
    (message: MessagePayload) => sendMessage(JSON.stringify(message)),
    [sendMessage],
  )

  return { sendMessage: sendStringifiedMessage, lastMessage, readyState }
}

// Hook
export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)
  if (!context) throw new Error('Context used before provider')

  const [user, setUser] = useUserContext()
  const [hash] = useHash()

  const requestLead = useCallback(() => {
    context.sendMessage({
      type: 'requestLead',
      data: { user, lessonState: { hash } },
    })
    setUser({ role: Role.Leader })
  }, [context, hash, setUser, user])

  const removeLead = useCallback(() => {
    context.sendMessage({ type: 'removeLead' })
    setUser({ role: Role.Participant })
  }, [context, setUser])

  return {
    requestLead,
    removeLead,
    ...context,
  }
}

// Provider
export const WebSocketProvider: React.FC<any> = ({ children }) => {
  const context = Context()

  const [user] = useUserContext()
  const { lessonState } = useLessonContext()

  const [hash] = useHash()
  const refHash = useRef(hash)

  // Leader sends ws messages
  useEffect(() => {
    if (user.id !== lessonState.leaderId) return
    if (hash === refHash.current) return

    refHash.current = hash

    context.sendMessage({
      type: 'updateState',
      data: { lessonState: { hash } },
    })
  }, [user, hash, context, lessonState.leaderId])

  return <WebSocketContext.Provider value={context} children={children} />
}
