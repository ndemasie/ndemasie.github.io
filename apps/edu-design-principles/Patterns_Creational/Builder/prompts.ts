import { ProductData } from './Builder.ts'

import { PromptsBuilder } from '../../PromptsBuilder.ts'

export default new PromptsBuilder(import.meta.url)
  .description(
    (kleur) =>
      `The ${kleur.cyan(
        'Builder Pattern',
      )} separates the construction of a complex object into smaller parts.`,
  )
  .instructions(
    () => `We are going to add a product into a database.
Answer each question to load the products!`,
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
