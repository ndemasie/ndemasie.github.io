// PATTERN
import { Resource, Resources } from './Resource'

class IronDagger extends Resource {
  static readonly makeResources = { LeatherStrips: 1, IronIngot: 1 }
  name = 'Iron Dagger'
  damage = 4
}

class IronSword extends Resource {
  static readonly makeResources = { LeatherStrips: 1, IronIngot: 2 }
  name = 'Iron Sword'
  damage = 7
}

export class Factory {
  static make(resources: Resources) {
    if (IronSword.canMake(resources)) return new IronSword()
    if (IronDagger.canMake(resources)) return new IronDagger()
  }
}
