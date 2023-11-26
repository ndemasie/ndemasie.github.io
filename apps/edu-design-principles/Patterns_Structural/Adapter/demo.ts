// import kleur from 'kleur'

import { Adapter } from './Adapter.ts'
import prompts from './prompts.ts'
const { id } = await prompts.run()

console.log('User returned:', new Adapter().fetch(id))
