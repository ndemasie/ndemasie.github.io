import { PromptsBuilder } from '../../PromptsBuilder.ts'

export default new PromptsBuilder(import.meta.url)
  .description(
    (kleur) =>
      `The ${kleur.cyan(
        'Factory Pattern',
      )} is the first abstraction from direct instantiation.`,
  )
  .instructions(
    `
We are crafting new weapon in a game.
Try making something new!`,
  )
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
