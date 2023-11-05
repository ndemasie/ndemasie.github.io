#!/usr/bin/env ts-node

// DESCRIPTION
// Script generates the necessary webcontainer FileSystemTree for webcontainers
// Read more here: https://webcontainers.io/guides/working-with-the-file-system

import type { FileSystemTree } from '@webcontainer/api'

import * as fs from 'fs'
import * as path from 'path'

const SKIP_FILES = ['.DS_Store']
const SKIP_DIRS = ['node_modules']

function readDirectory(dirname: string): FileSystemTree {
  const result: FileSystemTree = {}

  const entries = fs.readdirSync(dirname, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirname, entry.name)

    if (entry.isFile() && !SKIP_FILES.includes(entry.name)) {
      const contents = fs.readFileSync(fullPath, { encoding: 'utf-8' })
      result[entry.name] = { file: { contents } }
      continue
    }

    if (entry.isDirectory() && !SKIP_DIRS.includes(entry.name)) {
      const directory = readDirectory(fullPath)
      result[entry.name] = { directory }
      continue
    }
  }

  return result
}

// SCRIPT
const tree = readDirectory(`./apps/webcontainer-i18next`)
const content = JSON.stringify(tree)

fs.mkdirSync(`./apps/site-homepage/public/webcontainer-i18next`, {
  recursive: true,
})
fs.writeFileSync(
  `./apps/site-homepage/public/webcontainer-i18next/fileSystemTree.json`,
  content,
)
