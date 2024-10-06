import { PromptsBuilder } from '../../PromptsBuilder.ts'

export default new PromptsBuilder(import.meta.url)
  .description(
    (kleur) =>
      `The ${kleur.cyan(
        'Singleton Pattern',
      )} ensures only 1 instance ever exists.`,
  )
  .instructions(
    `Write a list of ids, comma separated, to try to create a new instances for each id.`,
  )
  .list({
    name: 'ids',
    message: 'Enter in a list of Ids:',
  })
