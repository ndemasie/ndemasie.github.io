import base from './base.json'
import de from './de.json'
import en from './en.json'

export default {
  en: Object.assign({}, { base }, en),
  de: Object.assign({}, { base }, en, de)
}