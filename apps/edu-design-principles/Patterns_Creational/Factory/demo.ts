import { Factory } from './Factory.ts'
import prompts from './prompts.ts'

const resources = await prompts.run()

const weapon = Factory.make(resources)

if (!weapon) {
  console.log(`You didn't make anything`)
  process.exit(0)
}

console.log(`You made a ${weapon.name} weapon with ${weapon.damage} damage!`)
