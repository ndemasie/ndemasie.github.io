import { ArmorFactory } from './ArmorFactory'

import { Factory as WeaponFactory } from '../Factory/Factory'

// PATTERN
export class AbstractFactory {
  static make(type: 'Weapon' | 'Armor') {
    switch (type) {
      case 'Armor':
        return ArmorFactory
      case 'Weapon':
        return WeaponFactory
    }
  }
}
