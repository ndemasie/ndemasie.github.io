export type Resources = {
  LeatherStrips?: number
  IronIngot?: number
}

export class Resource {
  static readonly makeResources: Resources

  static canMake(resources: Resources) {
    type List = [keyof Resource, number][]
    const list = Object.entries(this.makeResources) as List
    return list.every(([key, value]) => resources?.[key] >= value)
  }
}
