export type ProductData = {
  [K in keyof Product]: Product[K]
}

class Product {
  public name: string | undefined
  public price: string | undefined
  public currency?: 'USD' | 'EUR' = 'EUR'
  public upc?: string

  constructor(data: Partial<ProductData>) {
    this.name = data?.name
    this.price = data?.price
    this.currency = data?.currency ?? this.currency
    this.upc = data?.upc
  }
}

export class Builder extends Product {
  setName(value: ProductData['name']) {
    this.name = value
    return this
  }
  setPrice(value: ProductData['price']) {
    this.price = value
    return this
  }
  setCurrency(value: ProductData['currency']) {
    this.currency = value
    return this
  }
  setUpc(value: ProductData['upc']) {
    this.upc = value
    return this
  }
}
