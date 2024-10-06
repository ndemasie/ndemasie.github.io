import kleur from 'kleur'

import { AbstractFactory } from './AbstractFactory.ts'
import prompts from './prompts.ts'
const { factory, ...resources } = await prompts.run()

const item = AbstractFactory.make(factory)?.make(resources)

if (!item) {
  console.log(`You didn't make anything`)
  process.exit(0)
}

console.log(`You made an %s!`, kleur.cyan(item.name))
