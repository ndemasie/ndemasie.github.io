import readingTime from 'reading-time'
import { parse } from 'node-html-parser'

import { Language, Tag } from '@enums'
import  { BlogPost, BlogPostMarkdown } from '@interfaces'

export class BlogPostManager {
  static #instance: BlogPostManager
  #posts: BlogPost[] = []

  static get posts(): BlogPost[] {
    return new BlogPostManager().#posts
  }

  // Singleton
  constructor () {
    if (BlogPostManager.#instance) return BlogPostManager.#instance
    BlogPostManager.#instance = this

    const modules = import.meta.glob<BlogPostMarkdown>('./locals/blog-posts/**/*.md', { eager: true })
    this.#posts = Object.values(modules)
      .map((content) => this.#enhancePost(content))
      .filter((post) => post.frontmatter.state === 'live')
      .sort((a, b) => (new Date(a.frontmatter.datePublished).getTime() - new Date(b.frontmatter.datePublished).getTime()) * -1)
  }

  #enhancePost(post: BlogPostMarkdown): BlogPost {
    const assertLang = (lang: string): Language => {
      const val = Object.values(Language).find((language) => language === lang)
      if (!val) throw new Error(`Unsupported language "${lang}"`)
      return val
    }

    const [filename, dirname] = post.file.split('/').reverse()
    const concatDate = dirname.substring(2, 10).replaceAll('-', '') // '2022-02-02' => '220202'
    const slug = Number(concatDate).toString(36) + dirname.substring(10) // '220202' => '4pwq' + ...
    const lang = assertLang(filename.substring(0, 2))
    const html = parse(post.compiledContent())

    return {
      ...post,
      lang,
      filename,
      slug,
      tags: post.frontmatter.tagKeys.map((t) => Tag[t]),
      readTimeResults: readingTime(post.rawContent()),
      title: html.querySelector('h1:first-of-type')?.innerText,
      introParagraph: html.querySelector('p:first-of-type')?.innerText,
      url: `/${lang}/blog/${slug}`,
    }
  }
}