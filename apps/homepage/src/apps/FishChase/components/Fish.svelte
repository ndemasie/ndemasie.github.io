<div class="fish" />

<style lang="scss">
  @import 'src/styles/abstracts/_mixins/_animations.scss';

  :global(.fish) {
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
  :global(.fish[data-group='0']) {
    --inc: 45px;
    --x: -19px;
    --y: 25px;
  }

  // &:nth-of-type(3n + 1),
  :global(.fish[data-group='1']) {
    --inc: 50px;
    --x: -2px;
    --y: 125px;
  }

  // &:nth-of-type(3n + 2),
  :global(.fish[data-group='2']) {
    --inc: 44px;
    --x: -18px;
    --y: 222px;
  }
</style>
