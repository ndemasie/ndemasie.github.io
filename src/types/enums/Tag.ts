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
  static readonly astro = new Tag('astro')
  static readonly blog_template = new Tag('blog_template')
  static readonly github = new Tag('github')
  static readonly oss = new Tag('oss')


  public readonly key: keyof Omit<typeof Tag, 'prototype'>
  public readonly logoUrl?: string

  private constructor(
    key: Tag['key'],
    logoUrl?: Tag['logoUrl'],
  ) {
    this.key = key
    this.logoUrl = logoUrl ?? brandPathDict[key]
  }

  get value() {
    return this.key
  }

  toString() {
    return this.key
  }
}