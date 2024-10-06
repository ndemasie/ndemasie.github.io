<div class="shark" />

<style lang="scss">
  @import 'src/styles/abstracts/_mixins/_animations.scss';

  .shark {
    --inc: 32px;
    --x: 1px;
    --y: 1px;

    @include animate-sprite('shark-sprite', 8);
    animation: shark-sprite 2s infinite;
    background-image: url('/app/fish-chase/shark-sprite.png');
    @include bg-sprit();

    position: absolute;
    pointer-events: none;

    top: 50%;
    left: 50%;
    height: 30px;
    width: 30px;
    scale: 2.8;
  }
</style>
