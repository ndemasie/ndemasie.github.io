import _ from 'lodash'
import { useEffect, useMemo, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

export const useTerminal = () => {
  const xtermRef = useRef<HTMLElement>()
  const terminal = useMemo(() => new Terminal({ convertEol: true }), [])
  const fitAddon = useMemo(() => new FitAddon(), [])
  const debouncedFit = useMemo(() => _.debounce(() => fitAddon.fit(), 100), [fitAddon])
  const resizeObserver = useMemo(() => new ResizeObserver(() => debouncedFit()), [debouncedFit])

  // Setup and teardown
  useEffect(() => {
    if (xtermRef.current) {
      terminal.loadAddon(fitAddon)
      terminal.open(xtermRef.current)
      fitAddon.fit()
      resizeObserver.observe(xtermRef.current)
    }

    return () => {
      resizeObserver.disconnect()
      fitAddon.dispose()
      terminal.dispose()
    }
  }, [fitAddon, resizeObserver, terminal])

  return {
    terminal,
    ref: xtermRef,
  }
}
