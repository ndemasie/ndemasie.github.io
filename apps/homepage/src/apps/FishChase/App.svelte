<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'
  import Shark from './components/Shark.svelte'
  import Fish from './components/Fish.svelte'

  export let count: number = 100
  const id: string = 'app'
  const K: number = 3 // Clusters

  onMount(() => {
    const main = document.querySelector('main')!
    const canvas = document.getElementById(id)! as HTMLCanvasElement
    const context = canvas.getContext('2d')
    const fish = d3.selectAll('.shark, .fish')

    const width = main.clientWidth
    const height = main.clientHeight
    canvas.width = width
    canvas.height = height
    const isNarrow = width < 500

    const randomUniform = d3.randomUniform(6, 6 * K)

    const nodes = [].concat(
      { r: randomUniform() },
      Array.from(Array(count), (_, i) => {
        return { r: randomUniform(), group: i % K }
      }),
    )

    const move = (event) => {
      const [x, y] = d3.pointer(event)
      nodes[0].fx = x - width / 2
      nodes[0].fy = y - height / 2
    }

    const tick = () => {
      fish.data(nodes).each((d, i, nodes) => {
        d3.select(nodes[i]).style('translate', `${d.x - d.r}px ${d.y - d.r}px`)

        if (i === 0) {
          return // skip shark
        }

        const shark = nodes[0]?.__data__
        const distance = Math.hypot(d.x - shark.x, d.y - shark.y)
        const minDistance = d.r + shark.r

        if (distance < minDistance) {
          d3.select(nodes[i]).remove()
        }
      })
    }

    const simulation = d3
      .forceSimulation(nodes)
      .alphaTarget(0.3)
      .velocityDecay(0.1)
      .force('x', d3.forceX().strength(0.012))
      .force('y', d3.forceY().strength(0.01))
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((d) => d.r + 2)
          .iterations(3),
      )
      .force(
        'charge',
        d3
          .forceManyBody()
          .strength((_, i) => (i ? 0 : width * (isNarrow ? 1.3 : 1) * -1)),
      )
      .on('tick', tick)

    d3.select(context.canvas)
      .on('touchstart', (event) => event.preventDefault())
      .on('pointermove', move)

    simulation.nodes(nodes)
  })
</script>

<canvas {id} />
<Shark />
{#each { length: count } as _, i}
  <Fish index={i} />
{/each}
