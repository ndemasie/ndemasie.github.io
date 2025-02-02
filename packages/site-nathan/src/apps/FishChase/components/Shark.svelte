<div class="shark"></div>

<style lang="scss">
  @use 'src/styles/abstracts/mixins/animations.scss';

  .shark {
    --inc: 32px;
    --x: 1px;
    --y: 1px;

    @include animations.animate-sprite('shark-sprite', 8);
    animation: shark-sprite 2s infinite;
    background-image: url('/app/fish-chase/shark-sprite.png');
    @include animations.bg-sprit();

    position: absolute;
    pointer-events: none;

    top: 50%;
    left: 50%;
    height: 30px;
    width: 30px;
    scale: 2.8;
  }
</style>
