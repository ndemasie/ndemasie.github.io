import cfonts from 'cfonts'
import kleur from 'kleur'
import prompts, { PromptObject, PromptType } from 'prompts'

type Kleur = Parameters<NonNullable<PromptObject['onRender']>>[0]

export class PromptsBuilder {
  #title: string = ''
  #instructions: (() => void) | undefined

  #list: PromptObject[] = []

  #cfontsDefaults = {
    align: 'center',
    space: true,
    gradient: 'green,magenta',
    transitionGradient: true,
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
    }
    this.#instructions?.()

    return prompts(this.#list).then((res) => (console.log(), res))
  }

  title(title: string) {
    this.#title = title
    return this
  }

  instructions(input: string | ((kleur: Kleur) => string)): this {
    this.#instructions = () => {
      if (typeof input === 'function') {
        input(kleur)
        return
      }

      console.log(input)
    }
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
