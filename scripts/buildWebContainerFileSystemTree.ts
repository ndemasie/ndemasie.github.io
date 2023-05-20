#!/usr/bin/env ts-node

// Script generates the necessary webcontainer FileSystemTree for webcontainers
// Read more here: https://webcontainers.io/guides/working-with-the-file-system

import type { FileSystemTree } from '@webcontainer/api'

import * as fs from 'fs'
import * as path from 'path'

const DIRECTORY_PATH = 'src/webcontainers/i18next' // FIXME: Make generic
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
const tree = readDirectory(DIRECTORY_PATH)
const content = JSON.stringify(tree)

fs.mkdirSync(`./public/${DIRECTORY_PATH}`, { recursive: true })
fs.writeFileSync(`./public/${DIRECTORY_PATH}/fileSystemTree.json`, content)
