import readingTime from 'reading-time'
import { parse } from 'node-html-parser'

import { Language, Tag } from '@t'
import  { BlogPost, BlogPostMarkdown, BlogPostSearchDocument } from '@interfaces'

export class BlogPostManager {
  private static _instance: BlogPostManager
  private _posts: BlogPost[] = []
  private _searchDocuments: BlogPostSearchDocument[] = []

  static get posts() {
    return new BlogPostManager()._posts
  }

  static get searchDocuments() {
    return new BlogPostManager()._searchDocuments
  }

  // Singleton
  constructor () {
    if (BlogPostManager._instance) return BlogPostManager._instance
    BlogPostManager._instance = this

    const files = import.meta.glob<BlogPostMarkdown>('./locals/blog-posts/**/*.{md,mdx}', { eager: true })
    this._posts = Object
      .values(files)
      .map((content) => this._getEnhancedPost(content))
      .filter((post) => post.frontmatter.state === 'live')
      .sort((a, b) => (new Date(a.frontmatter.datePublished).getTime() - new Date(b.frontmatter.datePublished).getTime()) * -1)

    this._searchDocuments = Object
      .values(this._posts)
      .map((content) => this._getSearchDocument(content))
  }

  private _getEnhancedPost(post: BlogPostMarkdown): BlogPost {
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

  private _getSearchDocument(post: BlogPost): BlogPostSearchDocument {
    const { url, lang, title, slug } = post
    return {
      slug,
      url,
      lang,
      title,
      tags: post.frontmatter.tagKeys,
      body: post.rawContent()
    }
  }

}