import prompts from 'prompts'

import { Builder, ProductData } from './Builder'

console.log('Enter the product information')

const newProduct: Partial<ProductData> = await prompts([
  {
    type: 'text',
    name: 'name',
    message: 'Name: ',
  },
  {
    type: 'autocomplete',
    name: 'currency',
    message: 'Currency: ',
    choices: [
      { title: 'EUR €', value: 'EUR' },
      { title: 'USD $', value: 'USD' },
    ],
  },
  {
    type: 'number',
    name: 'price',
    float: true,
    message: (prev: ProductData['currency']) => {
      const symbol = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: prev,
      })
        ?.formatToParts(1)
        ?.find((x) => x.type === 'currency')?.value
      return `Price: ${symbol}`
    },
    min: 0,
  },
  {
    type: 'number',
    name: 'upc',
    message: 'UPC Barcode (optional):',
  },
])

const product = new Builder({})
  .setName(newProduct?.name)
  .setPrice(newProduct?.price)
  .setCurrency(newProduct?.currency)
  .setUpc(newProduct?.upc)

if (!product) {
  console.log(`Product creation failed`)
  process.exit(0)
}

console.log(`Product loaded:`)
console.log(JSON.stringify(product, null, 4))
