<script lang="ts">
  export let index: number = 0
  const type = index % 3
</script>

<div class="fish" data-type={type}></div>

<style lang="scss">
  @use '../styles/main.scss';

  .fish {
    @include main.animate-sprite('fish-sprite', 4);
    animation: fish-sprite 1s infinite;
    background-image: url("../static/fish-sprite.png");
    @include main.bg-sprit();

    pointer-events: none;
    position: absolute;

    top: 50%;
    left: 50%;
    height: 50px;
    width: 50px;

    &:nth-of-type(4n) {
      animation-delay: calc(-250ms * 0);
    }
    &:nth-of-type(4n + 1) {
      animation-delay: calc(-250ms * 1);
    }
    &:nth-of-type(4n + 2) {
      animation-delay: calc(-250ms * 2);
    }
    &:nth-of-type(4n + 3) {
      animation-delay: calc(-250ms * 3);
    }
  }

  // &:nth-of-type(3n),
  .fish[data-type='0'] {
    --inc: 45px;
    --x: -19px;
    --y: 25px;
  }

  // &:nth-of-type(3n + 1),
  .fish[data-type='1'] {
    --inc: 50px;
    --x: -2px;
    --y: 125px;
  }

  // &:nth-of-type(3n + 2),
  .fish[data-type='2'] {
    --inc: 44px;
    --x: -18px;
    --y: 222px;
  }
</style>
