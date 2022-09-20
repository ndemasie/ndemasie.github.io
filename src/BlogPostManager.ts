import readingTime from 'reading-time'
import { parse } from 'node-html-parser'

import { Language } from '@enums'
import  { BlogPost, BlogPostMarkdown } from '@interfaces'

export class BlogPostManager {
  static instance: BlogPostManager

  static async getInstance() {
    if (BlogPostManager.instance) return BlogPostManager.instance
    BlogPostManager.instance = new BlogPostManager()
    await BlogPostManager.instance.setup()
    return BlogPostManager.instance
  }

  public posts: BlogPost[] = []

  private async setup() {
    this.posts = await Promise.all(
      Object
        .values(import.meta.glob<BlogPostMarkdown>('./locals/blog-posts/**/*.md'))
        .map(async (importFn) => this.enhancePost(await importFn()))
    )
  }

  private enhancePost(post: BlogPostMarkdown): BlogPost {
    const assertLang = (lang: string): Language => {
      const val = Object.values(Language).find((language) => language === lang)
      if (!val) throw new Error(`Unsupported language "${lang}"`)
      return val
    }

    const [filename, slug] = post.file.split('/').reverse()
    const html = parse(post.compiledContent())

    return {
      ...post,
      lang: assertLang(filename.substring(0, 2)),
      filename,
      slug,
      readTimeResults: readingTime(post.rawContent()),
      title: html.querySelector('h1:first-of-type')?.innerText,
      description: html.querySelector('p:first-of-type')?.innerText.substring(77) + '...',
    }
  }
}