import { MarkdownInstance } from 'astro'
import { ReadTimeResults } from 'reading-time'
import { Language, Tag } from '@enums'

export interface BlogPostFrontmatter {
  author: string
  tags: Tag[]
  datePublished: string
  dateUpdated?: string
  heroImage?: {
    alt: string
    url: string
  }
  urls?: {
    github?: string
  }
}

export interface BlogPreviewData {
  slug: string
  lang: Language
  filename: string
  readTimeResults: ReadTimeResults
  title?: string
  description?: string
}

export type BlogPostMarkdown = MarkdownInstance<BlogPostFrontmatter>
export type BlogPost = BlogPostMarkdown & BlogPreviewData