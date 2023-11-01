// DEMO
import prompts from 'prompts'

import { Factory } from './Factory.ts'

console.log('Try making a weapon!')
const resources = await prompts([
  {
    type: 'number',
    name: 'LeatherStrips',
    message: 'How many leather strips?',
    initial: 1,
  },
  {
    type: 'number',
    name: 'IronIngot',
    message: 'How many iron ingots?',
    initial: 1,
  },
])
const weapon = Factory.make(resources)

if (!weapon) {
  console.log(`You didn't make anything`)
  process.exit(0)
}

console.log(`You made a ${weapon.name} weapon with ${weapon.damage} damage!`)
