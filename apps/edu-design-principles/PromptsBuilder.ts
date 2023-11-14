import cfonts from 'cfonts'
import kleur from 'kleur'
import prompts, { PromptObject, PromptType } from 'prompts'

import path from 'path'

type Kleur = Parameters<NonNullable<PromptObject['onRender']>>[0]

export class PromptsBuilder {
  #fileDir?: string
  #title?: string
  #instructions?: string
  #description?: string

  #list: PromptObject[] = []

  #cfontsDefaults = {
    align: 'center',
    space: true,
    gradient: 'green,magenta',
    transitionGradient: true,
  }

  constructor(url?: string) {
    const dir = url && path.dirname(new URL(url).pathname)

    const title = dir?.split('/')?.at(-1)?.trim()
    this.#title = title?.replaceAll(/([A-Z])/g, ' $1')
    this.#fileDir = dir
  }

  #methodFactory = (type: PromptType) => {
    return (input: Omit<PromptObject, 'type'>) => {
      this.#list.push({ ...input, type })
      return this
    }
  }

  run() {
    if (this.#title) {
      cfonts.say(this.#title, this.#cfontsDefaults)
      const path = `${this.#fileDir}/${this.#title.replaceAll(' ', '')}.ts`
      console.log('%s\n', path)
    }
    this.#description && console.log('%s\n', this.#description)
    this.#instructions && console.log('%s\n', this.#instructions)
    return prompts(this.#list).then((res) => (console.log(), res))
  }

  title(title: string) {
    this.#title = title.trim()
    return this
  }

  description(input: string | ((kleur: Kleur) => string)): this {
    this.#description =
      typeof input === 'function' ? input?.(kleur) : input.trim()
    return this
  }

  instructions(input: string | ((kleur?: Kleur) => string)): this {
    this.#instructions =
      typeof input === 'function' ? input?.(kleur) : input.trim()
    return this
  }

  autocomplete = this.#methodFactory('autocomplete')
  confirm = this.#methodFactory('confirm')
  date = this.#methodFactory('date')
  invisible = this.#methodFactory('invisible')
  list = this.#methodFactory('list')
  multiselect = this.#methodFactory('multiselect')
  number = this.#methodFactory('number')
  password = this.#methodFactory('password')
  select = this.#methodFactory('select')
  text = this.#methodFactory('text')
  toggle = this.#methodFactory('toggle')
}
