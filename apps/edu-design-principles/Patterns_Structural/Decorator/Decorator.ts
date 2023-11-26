function LogOperation(operationName: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      const prev = (this as Counter)['count']
      const result = original.apply(this, args)

      // New responsibility: Log output
      console.log(
        'We performed %s to turn %d into %d',
        operationName.toLowerCase(),
        prev,
        result,
      )
      return result
    }

    return descriptor
  }
}

export class Counter {
  public count: number = 0

  @LogOperation('Addition')
  add(a: number): number {
    this.count += a
    return this.count
  }

  @LogOperation('Subtraction')
  subtract(a: number): number {
    this.count -= a
    return this.count
  }
}
