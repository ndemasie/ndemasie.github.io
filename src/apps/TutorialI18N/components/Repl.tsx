/** @jsxImportSource @emotion/react */
import type { FileSystemTree } from '@webcontainer/api'
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
import { lessons } from '../data'
import { useTerminal } from '../hooks/useTerminal'
import { useWebContainer } from '../hooks/useWebContainer'
import { styles } from '../styles'

type Props = {
  fileSystemTree: FileSystemTree
}

const Repl: React.FC<Props> = ({ fileSystemTree }) => {
  const { ref: refTerminal, terminal } = useTerminal()
  const { containerUrl, container } = useWebContainer(fileSystemTree, terminal)
  const [hash] = useHash()

  const refIframe = useRef<HTMLIFrameElement>()

  const [editorKey, resetEditor] = useReducer(() => Math.random(), 0)

  const curLesson = useMemo(() => {
    const hashKey = hash.substring(1) // drop leading '#'
    const curLesson = lessons.find((lesson) => lesson.key === hashKey)
    resetEditor()
    return curLesson
  }, [hash])

  const code = useMemo(() => {
    return fileSystemTree?.src?.directory?.components?.directory?.[
      curLesson?.filename
    ]?.file?.contents
  }, [fileSystemTree?.src?.directory?.components?.directory, curLesson])

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
  useEffect(() => postHash(), [hash, postHash])

  return (
    <div css={styles.app.container}>
      <Editor
        key={editorKey}
        css={styles.app.editor}
        code={code}
        onSave={onSave}
      />

      <iframe
        id="webcontainer-iframe"
        ref={refIframe}
        css={styles.app.webContainer}
        title="Repl"
        allow="cross-origin-isolated"
        src={containerUrl ?? ''}
      />

      <div css={styles.app.terminal} ref={refTerminal}></div>
    </div>
  )
}

export default Repl
