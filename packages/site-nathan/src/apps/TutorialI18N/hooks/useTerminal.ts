import _ from 'lodash'
import { useEffect, useMemo, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

export const useTerminal = () => {
  const xtermRef = useRef<HTMLElement>(null)

  const { terminal, fitAddon, debouncedFit, resizeObserver } = useMemo(() => {
    const fitAddon = new FitAddon()
    return {
      terminal: new Terminal({ convertEol: true }),
      fitAddon,
      debouncedFit: _.debounce(() => fitAddon.fit(), 100),
      resizeObserver: new ResizeObserver(() => debouncedFit()),
    }
  }, [])

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
