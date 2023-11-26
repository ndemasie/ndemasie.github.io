// import kleur from 'kleur'

import { Counter } from './Decorator.ts'
import prompts from './prompts.ts'
const { add, sub } = await prompts.run()

const counter = new Counter()

counter.add(add)
counter.subtract(sub)
