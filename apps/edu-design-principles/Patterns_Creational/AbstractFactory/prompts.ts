import { PromptsBuilder } from '../../PromptsBuilder'

export default new PromptsBuilder(import.meta.dir)
  .description(
    (kleur) =>
      `The ${kleur.cyan(
        'Abstract Factory Pattern',
      )} is like a Factory of Factories.`,
  )
  .instructions(
    `
We are crafting new equipment in a game.
Answer each question to make a new item.`,
  )
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
