import { AbstractFactory } from './AbstractFactory'
import prompts from './prompts'

const { factory, ...resources } = await prompts.run()

const item = AbstractFactory.make(factory)?.make(resources)

if (!item) {
  console.log(`You didn't make anything`)
  process.exit(0)
}

console.log(`You made an ${item.name}!`)
