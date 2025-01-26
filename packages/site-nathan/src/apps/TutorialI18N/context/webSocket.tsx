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
      ? 'wss://server-i18next-websocket.demasie.com'
      : 'ws://localhost:10200',
    {
      onOpen: () => console.log('opened websocket'),
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
      type: 'REQUEST_LEAD',
      data: { user, lessonState: { hash } },
    })
    setUser({ role: Role.Leader })
  }, [context, hash, setUser, user])

  const removeLead = useCallback(() => {
    context.sendMessage({ type: 'REMOVE_LEAD' })
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
      type: 'UPDATE_STATE',
      data: { lessonState: { hash } },
    })
  }, [user, hash, context, lessonState.leaderId])

  return <WebSocketContext.Provider value={context} children={children} />
}
