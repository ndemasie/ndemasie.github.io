import { PromptsBuilder } from '../../PromptsBuilder.ts'

export default new PromptsBuilder(import.meta.url).description(
  (kleur) =>
    `The ${kleur.cyan(
      'ProtoType Pattern',
    )} saves memory or other resources when creating new copies.`,
)
