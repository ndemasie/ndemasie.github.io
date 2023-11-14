import { Builder } from './Builder.ts'
import prompts from './prompts.ts'
const input = await prompts.run()

const product = new Builder({})
  .setName(input?.name)
  .setPrice(input?.price)
  .setCurrency(input?.currency)
  .setUpc(input?.upc || null)

if (!product) {
  console.log(`Product creation failed`)
  process.exit(0)
}

console.log(`Product loaded:`)
console.table(Object.assign({}, product))
