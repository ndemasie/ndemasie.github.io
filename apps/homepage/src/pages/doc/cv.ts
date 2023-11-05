import { readFileSync } from 'node:fs'
import path from 'node:path'

const CV_NAME = 'Nathan_DeMasie_CV'

// opt out pre-rendering
export const prerender = false

export async function get() {
  const file = path.join(process.cwd(), 'public', 'doc', `${CV_NAME}.pdf`)
  const buffer = Buffer.from(readFileSync(file, 'binary'), 'binary')

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${CV_NAME}.pdf`,
    },
  })
}
