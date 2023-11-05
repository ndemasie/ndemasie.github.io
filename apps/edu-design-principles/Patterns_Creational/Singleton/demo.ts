import kleur from 'kleur'

import prompts from './prompts.ts'
import { Singleton } from './Singleton.ts'

const { ids } = await prompts.run()

console.log(
  `Trying to creating %s Singleton instances with ids %s`,
  ids?.length,
  ids,
)

ids.map((id) => {
  console.log(
    `Creating Singleton instance with id %s ended up returning instance %s`,
    kleur.blue(id),
    kleur.green(new Singleton(id).id),
  )
})
