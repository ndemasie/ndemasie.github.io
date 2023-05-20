import type { FileSystemTree } from '@webcontainer/api'
import { WebContainer } from '@webcontainer/api'
import { useCallback, useEffect, useState } from 'react'
import { useAsync, useAsyncFn } from 'react-use'
import { Terminal } from 'xterm'

export const useWebContainer = (path: string, terminal: Terminal) => {
  const [containerUrl, setContainerUrl] = useState<string>()

  const { value: fileSystemTree, ...fileSystemTreeAsync } = useAsync(
    async () => {
      const response = await fetch(path)
      if (!response.ok) {
        throw new Error('not loaded')
      }
      return response.json() as Promise<FileSystemTree>
    },
  )

  const [{ value: container, ...containerAsync }, loadContainer] =
    useAsyncFn(async () => {
      try {
        if (!fileSystemTree) {
          return
        }

        const container = await WebContainer.boot()
        await container.mount(fileSystemTree)

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
    }, [fileSystemTree])

  const spawn = useCallback(
    async (commandString: string, containerInstance?: WebContainer) => {
      const instance = containerInstance ?? container

      if (!instance) return

      const [cmd, ...args] = commandString.split(' ')
      const process = await instance.spawn(cmd, args, { output: true })
      const writeStream = new WritableStream({
        write: (data) => terminal.write(data),
      })

      process.output.pipeTo(writeStream)
      return process
    },
    [container, terminal],
  )

  // Load
  useEffect(() => {
    if (
      !fileSystemTreeAsync.loading &&
      !fileSystemTreeAsync.error &&
      !containerAsync.loading &&
      !containerAsync.error &&
      !container
    ) {
      loadContainer()
    }
  }, [container, containerAsync, fileSystemTreeAsync, loadContainer])

  return {
    containerUrl,
    container,
    spawn,
    fileSystemTree,
  }
}
