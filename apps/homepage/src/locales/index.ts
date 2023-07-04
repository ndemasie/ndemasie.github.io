import $RefParser from '@apidevtools/json-schema-ref-parser'
import _ from 'lodash'
import { Language } from 'src/types/Language'

import deSchema from './de/schema.json'
import deStrings from './de/strings.json'
import enSchema from './en/schema.json'
import enStrings from './en/strings.json'

const language = Object.values(Language ?? {}).reduce((acc, lang) => {
  acc[lang] = new Intl.DisplayNames([lang], { type: 'language' }).of(lang)
  return acc
}, {})

const strings = {
  intl: { language, langCode: Language },
  en: _.merge({}, enStrings),
  de: _.merge({}, enStrings, deStrings),
}

const parsedENSchema = await $RefParser.dereference(enSchema)
const parsedDESchema = await $RefParser.dereference(deSchema)
const schema = {
  en: _.merge({}, parsedENSchema),
  de: _.merge({}, parsedENSchema, parsedDESchema),
}

function t(key: string | string[], lang: Language) {
  return (
    [key]
      .flat(Infinity)
      .map((key) => {
        return _.get(strings?.[lang], key) || _.get(strings?.[Language.EN], key)
      })
      .filter(Boolean)
      .at(0) || key
  )
}

export { strings, schema, t }
