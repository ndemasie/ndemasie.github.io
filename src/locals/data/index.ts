import $RefParser from '@apidevtools/json-schema-ref-parser'
import { merge } from 'lodash'

import schema from './schema.json'

const parsedSchema = await $RefParser.dereference(schema)

export default {
  en: merge({}, parsedSchema),
  de: merge({}, parsedSchema)
}