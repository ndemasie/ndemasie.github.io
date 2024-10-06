#!/usr/bin/env ts-node

import prompts from 'prompts'

import child_process from 'child_process'
import fs from 'fs'
import path from 'path'

const getFiles = (dir: string, fileName: string): string[] => {
  const results: Set<string> = new Set()

  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file)

    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileName).forEach((_) => results.add(_))
    }

    if (file.endsWith(fileName)) {
      results.add(filePath)
    }
  }

  return Array.from(results)
}

async function main() {
  const response = await prompts({
    type: 'autocomplete',
    name: 'demo',
    message: 'Select a demo to run:',
    suggest: (input, choices) =>
      Promise.resolve(
        choices.filter((_) =>
          _.value.toLowerCase().includes(input?.toLowerCase()),
        ),
      ),
    choices: getFiles('./', 'demo.ts')?.map((file) => {
      const [, parent, grand] = file.split('/').reverse()
      const group = grand.replace('Patterns_', '')
      const title = parent.replaceAll(/([A-Z])/g, ' $1').trim()
      return {
        value: file,
        title: `${group}: ${title}`,
      }
    }),
  })

  if (!response.demo) {
    console.log('No demo selected. Exiting.')
    process.exit(0)
  }

  console.clear()

  // NODE
  const child = child_process.spawn(
    'npx',
    ['ts-node', '--esm', `./${response.demo}`],
    {
      detached: false,
      stdio: 'inherit',
    },
  )

  child.on('exit', () => {
    console.log()
    console.log('Try a new demo')
    main()
  })

  // BUN
  // Bun.spawn(['bun', 'run', response.demo], {
  //   stdin: 'inherit',
  //   stdout: 'inherit',
  //   onExit: onExit,
  // })
}

main()
