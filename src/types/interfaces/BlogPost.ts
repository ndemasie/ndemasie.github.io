import { MarkdownInstance } from 'astro'
import { ReadTimeResults } from 'reading-time'
import { Language, Tag } from '@enums'

export enum BlogState {
  live = 'live',
  draft = 'draft',
}

export interface BlogPostFrontmatter {
  author: string
  tagKeys: Tag['key'][]
  lang: Language
  state: BlogState
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
  url: string
  tags: Tag[]
  readTimeResults: ReadTimeResults
  title?: string
  introParagraph?: string
}

export type BlogPostMarkdown = MarkdownInstance<BlogPostFrontmatter>
export type BlogPost = BlogPostMarkdown & BlogPreviewData