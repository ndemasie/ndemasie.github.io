export class Singleton {
  static instance: Singleton
  id: number

  constructor(id: number) {
    this.id = id
    if (Singleton.instance) {
      return Singleton.instance
    }
    Singleton.instance = this
  }
}
