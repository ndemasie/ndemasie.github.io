/** @jsxImportSource @emotion/react */
import type { FileSystemTree } from '@webcontainer/api'
import { javascript } from '@codemirror/lang-javascript'
import CodeMirror from '@uiw/react-codemirror'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useHash } from 'react-use'

// import 'animate.css'

import packageJson from '../../../../package.json'
import { lessons } from '../data'
import { useTerminal } from '../hooks/useTerminal'
import { useWebContainer } from '../hooks/useWebContainer'
import { styles } from '../styles'
// import CodeEditor from './CodeEditor'

type Props = {
  fileSystemTree: FileSystemTree
}

const Repl: React.FC<Props> = ({ fileSystemTree }) => {
  const { ref: refTerminal, terminal } = useTerminal()
  const { containerUrl } = useWebContainer(fileSystemTree, terminal)
  const [hash] = useHash()

  const refIframe = useRef<HTMLIFrameElement>()

  const code = useMemo(() => {
    const hashKey = hash.substring(1) // drop leading '#'
    const curLesson = lessons.find((lesson) => lesson.key === hashKey)

    return fileSystemTree?.src?.directory?.components?.directory?.[curLesson?.filename]?.file?.contents
  }, [hash, fileSystemTree?.src?.directory?.components?.directory])

  const postHash = useCallback(() => {
    if (refIframe.current && containerUrl) {
      const message = { source: packageJson.name, payload: { hash } }
      refIframe.current?.contentWindow?.postMessage(message, '*')
    }
  }, [containerUrl, hash])

  const onCodeChange = useCallback((value, viewUpdate) => {
    console.log('value:', value)
  }, [])

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
      <div css={styles.app.editor}>
        <CodeMirror value={code} extensions={[javascript({ jsx: true })]} onChange={onCodeChange} theme="dark" />
      </div>

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
