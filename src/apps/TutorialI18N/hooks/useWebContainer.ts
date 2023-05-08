import type { FileSystemTree } from '@webcontainer/api'
import { WebContainer } from '@webcontainer/api'
import { useCallback, useState } from 'react'
import { useAsyncRetry } from 'react-use'
import { Terminal } from 'xterm'

export const useWebContainer = (files: FileSystemTree, terminal: Terminal) => {
  const [containerUrl, setContainerUrl] = useState<string>()

  const { value: container } = useAsyncRetry<WebContainer | undefined>(async () => {
    try {
      const container = await WebContainer.boot()
      await container.mount(files)

      const installProcess = await spawn('npm install', container)
      await installProcess?.exit

      await spawn('npm run start', container)

      container.on('server-ready', (port, url) => {
        setContainerUrl(url)
      })

      return container
    } catch (e) {
      console.log(e)
    }
  })

  const spawn = useCallback(
    async (commandString: string, containerInstance?: WebContainer) => {
      const instance = containerInstance ?? container

      if (!instance) return

      const [cmd, ...args] = commandString.split(' ')
      const process = await instance.spawn(cmd, args, { output: true })
      const writeStream = new WritableStream({ write: (data) => terminal.write(data) })

      process.output.pipeTo(writeStream)
      return process
    },
    [container, terminal],
  )

  return {
    containerUrl,
    container,
    spawn,
    fileSystemTree: files,
  }
}
