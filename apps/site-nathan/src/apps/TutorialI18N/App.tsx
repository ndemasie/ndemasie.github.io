/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { Suspense, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ReadyState } from 'react-use-websocket'

import '../../components/BaseButton'
import '../../types/global'
import Repl from './components/Repl'
import './i18n'
import { LessonProvider, useLessonContext } from './context/lesson'
import { Role, UserContextProvider, useUserContext } from './context/user'
import { WebSocketProvider, useWebSocketContext } from './context/webSocket'
import { styles } from './styles'

const WEBCONTAINER_EDU_I18NEXT_REACT =
  'webcontainer/edu-i18next-react/fileSystemTree.json'

const Loading: React.FC = () => {
  const { t } = useTranslation()
  return <div>{t('common:loading')}</div>
}

const StyledButton = ({ className, ...props }) => (
  <base-button {...props} class={className} />
)

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const [user] = useUserContext()
  const webSocket = useWebSocketContext()
  const { lessonState, goBack, goForward, curLessonIndex, LESSON_COUNT } =
    useLessonContext()

  const canUserLead = useMemo(() => {
    return (
      lessonState?.leaderId === null &&
      webSocket.readyState === ReadyState.OPEN &&
      user.role === Role.Participant
    )
  }, [lessonState?.leaderId, user.role, webSocket.readyState])

  const isUserLeader = useMemo(() => {
    return lessonState?.leaderId === user?.id
  }, [lessonState?.leaderId, user?.id])

  const getInfoText = useMemo(() => {
    const count = (() => {
      let n = lessonState.participantCount
      --n // Skip self
      if (user.role === Role.Participant) --n // Skip leader
      return Math.max(n, 0)
    })()

    const text = t('infoStatus', {
      context:
        !!lessonState.leaderId && user.role === Role.Participant
          ? 'follow'
          : user.role,
      count,
      replace: {
        name: user.name,
        action: t([
          `role.${user.role}.activeParticiple`,
          `role.${user.role}.label`,
          String(user?.role),
        ]),
        leaderName: lessonState.leaderName,
        count,
      },
    })

    return text
  }, [
    lessonState.leaderId,
    lessonState.leaderName,
    lessonState.participantCount,
    t,
    user.name,
    user.role,
  ])

  return (
    <div css={styles.footer}>
      <div css={css({ flex: 1 })}>
        {getInfoText}
        {canUserLead && (
          <StyledButton
            className="fill"
            onClick={
              isUserLeader ? webSocket.removeLead : webSocket.requestLead
            }
          >
            {isUserLeader ? t('role_lead_cease') : t('role_lead_request')}
          </StyledButton>
        )}
      </div>

      <StyledButton
        className="fill"
        onClick={goBack}
        css={css({ visibility: curLessonIndex ? 'visible' : 'hidden' })}
      >
        {t('common:back')}
      </StyledButton>

      <StyledButton
        className="fill"
        onClick={goForward}
        css={css({
          visibility: curLessonIndex + 1 < LESSON_COUNT ? 'visible' : 'hidden',
        })}
      >
        {t('common:next')}
      </StyledButton>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <LessonProvider>
        <WebSocketProvider>
          <Suspense fallback={<Loading />}>
            <Repl app={WEBCONTAINER_EDU_I18NEXT_REACT} />
            <Footer />
          </Suspense>
        </WebSocketProvider>
      </LessonProvider>
    </UserContextProvider>
  )
}

export default App
