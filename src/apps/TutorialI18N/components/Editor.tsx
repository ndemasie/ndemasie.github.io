/** @jsxImportSource @emotion/react */
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import CodeMirror from '@uiw/react-codemirror'
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror'
import React, { KeyboardEvent, useCallback, useMemo, useState } from 'react'
import { useMeasure } from 'react-use'

type Props = {
  code: string
  height?: string
  onSave?: (data: string) => void
}

const Editor: React.FC<Props> = ({ code: propCode, onSave, ...other }) => {
  const [code, setCode] = useState(propCode)
  const [refGrid, refGridMeasure] = useMeasure()

  const extensions = useMemo(() => [javascript({ jsx: true })], [])

  const onChange = useCallback<NonNullable<ReactCodeMirrorProps['onChange']>>(
    (value) => {
      setCode(value)
    },
    [],
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        onSave?.(code)
      }
    },
    [code, onSave],
  )

  return (
    <div ref={refGrid} {...other} onKeyDown={onKeyDown}>
      <CodeMirror
        height={refGridMeasure.height ? `${refGridMeasure?.height}px` : '100%'}
        value={code}
        onChange={onChange}
        extensions={extensions}
        theme={vscodeDark}
      />
    </div>
  )
}

export default Editor
