import { merge } from 'lodash'

import base from './base.json'
import de from './de.json'
import en from './en.json'

export default {
  en: merge({}, { base }, en),
  de: merge({}, { base }, en, de)
}