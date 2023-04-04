// Create '{ [key]: <path> }' dictionary of existing logos
// e.g. => { astro: '/brands/astro.svg' ...
const brandPathDict = Object
  .keys(import.meta.glob('/public/brands/*.svg'))
  .reduce((acc, path) => {
    const key = path.split('/').pop()?.split('.')[0] as string
    acc[key] = `/brands/${key}.svg`
    return acc
  }, {} as Record<string, string>)

  
export class Tag {

  // enum keys
  static readonly astro = new Tag(
    'astro',
    undefined,
    '--bg-size: 1.8em;--bg-position: center var(--padding-y);'
  )
  static readonly blog_template = new Tag('blog_template')
  static readonly github = new Tag('github')
  static readonly keybind = new Tag('keybind')
  static readonly keyboard_shortcut = new Tag('keyboard_shortcut')
  static readonly oss = new Tag('oss')
  static readonly snippet = new Tag('snippet')
  static readonly vscode = new Tag('vscode', '/brands/visual-studio-code.svg')
  // end enum keys

  public readonly key: keyof Omit<typeof Tag, 'prototype'>
  public readonly logoUrl?: string
  public readonly style?: string

  private constructor(
    key: Tag['key'],
    logoUrl?: Tag['logoUrl'],
    style?: Tag['style']
  ) {
    this.key = key
    this.logoUrl = logoUrl ?? brandPathDict[key]
    this.style = style
  }

  get value() {
    return this.key
  }

  toString() {
    return this.key
  }
}