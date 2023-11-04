import { PromptsBuilder } from '../Builder/PromptsBuilder'

export default new PromptsBuilder('Singleton', import.meta.dir)
  .description(
    (kleur) =>
      `The ${kleur.cyan(
        'Singleton Pattern',
      )} ensures only 1 instance ever exists.`,
  )
  .instructions(
    `List numeric ids comma separated to try to create a new instances for each id.`,
  )
  .list({
    name: 'ids',
    message: 'Enter in a list of Ids:',
  })
