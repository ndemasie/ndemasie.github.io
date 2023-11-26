import { PromptsBuilder } from '../../PromptsBuilder.ts'

export default new PromptsBuilder(import.meta.url)
  .description(
    (kleur) =>
      `The ${kleur.cyan(
        'Adapter Pattern',
      )} harmonizes two different interfaces.`,
  )
  .instructions(() => `Enter a user id to fetch`)
  .number({ name: 'id', message: 'User Id: ' })
