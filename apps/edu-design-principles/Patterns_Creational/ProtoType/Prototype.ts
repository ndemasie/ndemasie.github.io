import child_process from 'child_process'

// https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
const formatBytes = (bytes: number, decimals: number) => {
  if (bytes == 0) return '0 Bytes'
  const k = 1024
  const dm = decimals || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export class Prototype {
  public data?: { byteLength: number; size: string; rawData: any }

  constructor(data?: Prototype['data']) {
    if (data) {
      this.data = data
    }
  }

  async load() {
    if (this.data) return

    // Generate random data
    // const process = Bun.spawn(['openssl', 'rand', '-base64', '230179038'])
    const process = child_process.spawn('openssl', [
      'rand',
      '-base64',
      '230179038',
    ])
    const randomData = await new Response(process?.stdout).arrayBuffer()

    this.data = {
      byteLength: randomData.byteLength,
      size: formatBytes(randomData.byteLength, 2),
      rawData: randomData,
    }
  }

  // Classic method of design pattern
  clone() {
    const copy = structuredClone(this.data)
    return new Prototype(copy)
  }
}
