import { AbstractFactory } from './AbstractFactory'

import { PromptsBuilder } from '../Builder/PromptsBuilder'

const { factory, ...resources } = await new PromptsBuilder()
  .autocomplete({
    name: 'factory',
    message: 'What type of equipment Do you want to make?',
    choices: [
      { title: 'Armor', value: 'Armor' },
      { title: 'Weapon', value: 'Weapon' },
    ],
  })
  .number({
    name: 'LeatherStrips',
    message: 'How many leather strips?',
    initial: 1,
    min: 0,
  })
  .number({
    name: 'IronIngot',
    message: 'How many iron ingots?',
    initial: 1,
    min: 0,
  })
  .run()

const item = AbstractFactory.make(factory)?.make(resources)

if (!item) {
  console.log(`You didn't make anything`)
  process.exit(0)
}

console.log(`You made an ${item.name}!`)
