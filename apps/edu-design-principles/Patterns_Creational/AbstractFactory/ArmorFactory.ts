import { Resource, Resources } from '../Factory/Resource.ts'

class BandedIronShield extends Resource {
  static readonly makeResources = { LeatherStrips: 1, IronIngot: 4 }
  name = 'Banded Iron Shield'
  armor = 22
}

export class ArmorFactory {
  static make(resources: Resources) {
    if (BandedIronShield.canMake(resources)) return new BandedIronShield()
  }
}
