import prompts from './prompts.ts'
import { Singleton } from './Singleton.ts'

const { ids } = await prompts.run()

console.log(
  `Trying to creating ${ids?.length} Singleton instances with ids ${ids}`,
)

ids.map((id) => {
  console.log(
    `Creating Singleton instance with ${id} resulted in id ${
      new Singleton(ids[0]).id
    }`,
  )
})
