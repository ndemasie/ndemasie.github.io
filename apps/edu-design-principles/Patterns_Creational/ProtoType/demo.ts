import prompts from './prompts.ts'
import { Prototype } from './Prototype.ts'

await prompts.run()

const prototype = new Prototype()

console.table(['size', 'byteLength'])
console.table([prototype.data?.size, prototype.data?.byteLength])

console.time('Loading prototype data')
await prototype.load()
console.timeEnd('Loading prototype data')

console.table(['size', 'byteLength'])
console.table([prototype.data?.size, prototype.data?.byteLength])

const prototypeCopy = prototype.clone()

console.time('Loading prototypeCopy data')
await prototypeCopy.load()
console.timeEnd('Loading prototypeCopy data')

console.table(['size', 'byteLength'])
console.table([prototype.data?.size, prototype.data?.byteLength])
console.table([prototypeCopy.data?.size, prototypeCopy.data?.byteLength])
