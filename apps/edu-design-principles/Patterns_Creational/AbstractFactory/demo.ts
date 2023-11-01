import prompts from 'prompts'

import { AbstractFactory } from './AbstractFactory'

console.log('What type of equipment Do you want to make?')

const { factory, ...resources } = await prompts([
  {
    type: 'select',
    name: 'factory',
    message: 'What type of equipment Do you want to make?',
    choices: [
      { title: 'Armor', value: 'Armor' },
      { title: 'Weapon', value: 'Weapon' },
    ],
  },
  {
    type: 'number',
    name: 'LeatherStrips',
    message: 'How many leather strips?',
    initial: 1,
    min: 0,
  },
  {
    type: 'number',
    name: 'IronIngot',
    message: 'How many iron ingots?',
    initial: 1,
    min: 0,
  },
])

const item = AbstractFactory.make(factory)?.make(resources)

if (!item) {
  console.log(`You didn't make anything`)
  process.exit(0)
}

console.log(`You made an ${item.name}!`)
