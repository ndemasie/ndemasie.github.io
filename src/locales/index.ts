import $RefParser from '@apidevtools/json-schema-ref-parser'
import _ from 'lodash'
import { Language } from 'src/types/Language'

import deSchema from './de/schema.json'
import deStrings from './de/strings.json'
import enSchema from './en/schema.json'
import enStrings from './en/strings.json'

const parsedENSchema = await $RefParser.dereference(enSchema)
const parsedDESchema = await $RefParser.dereference(deSchema)

const strings = {
  en: _.merge({}, enStrings),
  de: _.merge({}, enStrings, deStrings),
}

const schema = {
  en: _.merge({}, parsedENSchema),
  de: _.merge({}, parsedENSchema, parsedDESchema),
}

function t(key: string | string[], lng: Language) {
  return (
    [key]
      .flat(Infinity)
      .map(
        (key) =>
          _.get(strings?.[lng], key) || _.get(strings?.[Language.EN], key),
      )
      .filter(Boolean)
      .at(0) || key
  )
}

export { strings, schema, t }
