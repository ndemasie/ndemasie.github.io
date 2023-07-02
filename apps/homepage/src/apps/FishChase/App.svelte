<script lang="ts">
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

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
<div class="shark" />
{#each { length: count } as _, i}
  <div class="fish" />
{/each}

<style lang="scss">
  @import 'src/styles/abstracts/_mixins/_animations.scss';

  .shark {
    --inc: 32px;
    --x: 1px;
    --y: 1px;

    @include animate-sprite('shark-sprite', 8);
    animation: shark-sprite 2s infinite;
    background-image: url('/apps/fish-chase/shark-sprite.png');
    @include bg-sprit();

    position: absolute;
    pointer-events: none;

    top: 50%;
    left: 50%;
    height: 30px;
    width: 30px;
    scale: 2.8;
  }

  .fish {
    @include animate-sprite('fish-sprite', 4);
    animation: fish-sprite 1s infinite;
    background-image: url('/apps/fish-chase/fish-sprite.png');
    @include bg-sprit();

    pointer-events: none;
    position: absolute;

    top: 50%;
    left: 50%;
    height: 50px;
    width: 50px;

    &:nth-of-type(odd) {
      animation-delay: -0.5s;
    }
    &:nth-of-type(3n) {
      --inc: 45px;
      --x: -19px;
      --y: 25px;
    }
    &:nth-of-type(3n + 1) {
      --inc: 50px;
      --x: -2px;
      --y: 125px;
    }
    &:nth-of-type(3n + 2) {
      --inc: 44px;
      --x: -18px;
      --y: 222px;
    }
  }
</style>
