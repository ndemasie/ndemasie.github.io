import { WebContainer } from '@webcontainer/api'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Terminal } from 'xterm'

import 'xterm/css/xterm.css'
import { files } from '../replFiles'

const Repl: React.FC = () => {
  const xtermRef = useRef<HTMLElement>()
  const [magicURL, setMagicURL] = useState<string | null>(null)

  const terminal = useMemo(() => new Terminal({ convertEol: true }), [])

  // Load Terminal
  useEffect(() => {
    if (xtermRef.current) {
      terminal.open(xtermRef.current)
    }

    // Unmount and cleanup
    return () => {
      terminal.dispose()
      terminal
    }
  }, [terminal])

  // const runCommand = useCallback(
  //   async (commandString: string) => {
  //     const [command, ...args] = commandString.split(' ')

  //     if (container) {
  //       const process = await container.spawn(command, args, {
  //         output: true,
  //       })

  //       process.output.pipeTo(
  //         new WritableStream({
  //           write(data) {
  //             terminal.current.write(data)
  //           },
  //         }),
  //       )

  //       return process
  //     }
  //   },
  //   [container, terminal],
  // )

  const loadWebContainer = useCallback(async () => {
    const container = await WebContainer.boot()

    await container.mount(files)
    const installProcess = await container.spawn('npm', ['install'])

    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data)
        },
      }),
    )

    const installExitCode = await installProcess.exit
    if (installExitCode !== 0) {
      throw new Error('Install failed')
    }
    console.log('Running start')
    const runProcess = await container.spawn('npm', ['run', 'start'])

    runProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data)
        },
      }),
    )

    container.on('server-ready', (port, url) => {
      setMagicURL(url)
    })
  }, [terminal])

  // Boot and setup WebContainer
  useEffect(() => {
    loadWebContainer()
  }, [loadWebContainer])

  return <div></div>
}

export default Repl
