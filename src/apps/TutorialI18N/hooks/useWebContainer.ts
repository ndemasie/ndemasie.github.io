import type { FileSystemTree } from '@webcontainer/api'
import { WebContainer } from '@webcontainer/api'
import { useCallback, useState } from 'react'
import { useAsyncRetry } from 'react-use'
import { Terminal } from 'xterm'

export const useWebContainer = (files: FileSystemTree, terminal: Terminal) => {
  const [containerUrl, setContainerUrl] = useState<string>()

  const container = useAsyncRetry<WebContainer>(async () => {
    const container = await WebContainer.boot()
    await container.mount(files)

    await run('npm install', container)
    await run('npm run start', container)

    container.on('server-ready', (port, url) => {
      setContainerUrl(url)
    })

    return container
  })

  const run = useCallback(
    async (commandString: string, containerInstance?: WebContainer) => {
      const instance = containerInstance ?? container?.value

      if (!instance) {
        return
      }

      const [cmd, ...args] = commandString.split(' ')
      const process = await instance.spawn(cmd, args, {
        output: true,
      })

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data)
          },
        }),
      )

      return process
    },
    [container.value, terminal],
  )

  return {
    containerUrl,
    container,
    run,
    fileSystemTree: files,
  }
}
