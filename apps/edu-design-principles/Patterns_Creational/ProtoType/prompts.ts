import { PromptsBuilder } from '../../PromptsBuilder'

export default new PromptsBuilder(import.meta.dir).description(
  (kleur) =>
    `The ${kleur.cyan(
      'ProtoType Pattern',
    )} saves memory or other resources when creating new copies.`,
)
