import { Builder, ProductData } from './Builder'
import { PromptsBuilder } from './PromptsBuilder'

const newProduct = await new PromptsBuilder()
  .title('Builder Pattern')
  .instructions(
    `
  We are going to add a product into a database.
  Answer each question to load the products!
  `,
  )
  .text({ name: 'name', message: 'Product Name: ' })
  .autocomplete({
    name: 'currency',
    message: 'Currency: ',
    choices: [
      { title: 'EUR €', value: 'EUR' },
      { title: 'USD $', value: 'USD' },
    ],
  })
  .number({
    name: 'price',
    float: true,
    message: (prev: ProductData['currency']) => {
      const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: prev,
      })
      const currencySymbol = formatter
        ?.formatToParts(1)
        ?.find((x) => x.type === 'currency')?.value

      return `Price: ${currencySymbol}`
    },
    min: 0,
  })
  .number({ name: 'upc', message: 'UPC Barcode (optional):' })
  .run()

const product = new Builder({})
  .setName(newProduct?.name)
  .setPrice(newProduct?.price)
  .setCurrency(newProduct?.currency)
  .setUpc(newProduct?.upc || null)

if (!product) {
  console.log(`Product creation failed`)
  process.exit(0)
}

console.log(`Product loaded:`)
console.table(Object.assign({}, product))
