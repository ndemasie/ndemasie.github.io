import type { APIContext } from 'astro'

const CV_NAME = 'Nathan_DeMasie_CV'

export async function get(ctx: APIContext) {
  const url = new URL(`doc/${CV_NAME}.pdf`, ctx.site)
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${CV_NAME}.pdf"`,
    },
  })
}
