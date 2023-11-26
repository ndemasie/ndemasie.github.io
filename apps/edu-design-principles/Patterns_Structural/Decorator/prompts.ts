import { PromptsBuilder } from '../../PromptsBuilder.ts'

export default new PromptsBuilder(import.meta.url)
  .description(
    (kleur) =>
      `The ${kleur.cyan(
        'Decorator Pattern',
      )} attaches additional responsibilities to an object.`,
  )
  .instructions(() => `Let's do some simple math`)
  .number({ name: 'add', message: 'Add a number to 0' })
  .number({ name: 'sub', message: 'Subtract a number' })
