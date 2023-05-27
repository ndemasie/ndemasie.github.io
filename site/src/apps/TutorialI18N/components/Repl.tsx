/** @jsxImportSource @emotion/react */
import _ from 'lodash'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { useHash } from 'react-use'

import Editor from './Editor'

import packageJson from '../../../../package.json'
import { useTerminal } from '../hooks/useTerminal'
import { useWebContainer } from '../hooks/useWebContainer'
import { styles } from '../styles'
import { useLessonContext } from '../context/lesson'

const getterPath = (path: string) => {
  const dirs = path.split('/').slice(0, -1)
  const file = path.split('/').at(-1)
  return [dirs?.flatMap((d) => [d, 'directory']), file, 'file', 'contents']
    .flat(1)
    .filter(Boolean)
}

type Props = {
  app: string
}

const Repl: React.FC<Props> = ({ app }) => {
  const { ref: refTerminal, terminal } = useTerminal()
  const { fileSystemTree, containerUrl, container } = useWebContainer(
    app,
    terminal,
  )
  const [hash] = useHash()
  const refIframe = useRef<HTMLIFrameElement>()
  const [editorKey, resetEditor] = useReducer(() => Math.random(), 0)
  const { curLesson } = useLessonContext()

  const code = useMemo(() => {
    resetEditor()
    const file = _.get(
      fileSystemTree,
      getterPath(`src/components/${curLesson?.filename}`),
    )
    return file
  }, [fileSystemTree, curLesson?.filename])

  const postHash = useCallback(() => {
    if (refIframe.current && containerUrl) {
      const message = { source: packageJson.name, payload: { hash } }
      refIframe.current?.contentWindow?.postMessage(message, '*')
    }
  }, [containerUrl, hash])

  const onSave = useCallback(
    async (data: string) => {
      const path = `/src/components/${curLesson?.filename}`
      await container?.fs.writeFile(path, data)
      postHash()
    },
    [container?.fs, curLesson?.filename, postHash],
  )

  // Message listener
  useEffect(() => {
    const onMessageEvent = (event: MessageEvent) => {
      if (event.data?.payload?.type === 'webpackOk') postHash()
    }
    window.addEventListener('message', onMessageEvent, false)
    return () => window.removeEventListener('message', onMessageEvent, false)
  })

  // Post hash change to iframe
  useEffect(() => {
    postHash()
  }, [hash, postHash])

  return (
    <div css={styles.container}>
      <Editor key={editorKey} css={styles.editor} code={code} onSave={onSave} />

      <iframe
        id="webcontainer-iframe"
        ref={refIframe}
        css={styles.webContainer}
        title="Repl"
        allow="cross-origin-isolated"
        src={containerUrl ?? ''}
      />

      <div css={styles.terminal} ref={refTerminal}></div>
    </div>
  )
}

export default Repl
