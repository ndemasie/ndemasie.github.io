import { ArmorFactory } from './ArmorFactory.ts'

import { Factory as WeaponFactory } from '../Factory/Factory.ts'

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
