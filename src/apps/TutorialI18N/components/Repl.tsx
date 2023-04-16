/** @jsxImportSource @emotion/react */
import type { FileSystemTree } from '@webcontainer/api'
import highlightJs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import React, { useEffect } from 'react'

// import 'animate.css'
import 'highlight.js/styles/github-dark.css'

import { useTerminal } from '../hooks/useTerminal'
import { useWebContainer } from '../hooks/useWebContainer'
import { styles } from '../styles'

type Props = {
  fileSystemTree: FileSystemTree
}

const Repl: React.FC<Props> = ({ fileSystemTree }) => {
  const { ref: terminalRef, terminal } = useTerminal()
  const { containerUrl } = useWebContainer(fileSystemTree, terminal)

  // Highlight init
  useEffect(() => {
    highlightJs.registerLanguage('typescript', typescript)
    highlightJs.highlightAll()
  })

  return (
    <div css={styles.app.container}>
      <div css={styles.app.editor}>
        <pre>
          <code css={styles.codeblock} className="language-typescript">
            {!!fileSystemTree && fileSystemTree?.src?.directory?.['App.jsx'].contents}
          </code>
        </pre>
      </div>

      <iframe css={styles.app.webContainer} title="Repl" allow="cross-origin-isolated" src={containerUrl ?? ''} />
      <div css={styles.app.terminal} ref={terminalRef}></div>
    </div>
  )
}

export default Repl
