<script lang="ts">
</script>

<div class="shark"></div>

<style lang="scss">
  @use '../styles/main.scss';

  .shark {
    --inc: 32px;
    --x: 1px;
    --y: 1px;

    @include main.animate-sprite('shark-sprite', 8);
    animation: shark-sprite 2s infinite;
    background-image: url("../static/shark-sprite.png");
    @include main.bg-sprit();

    position: absolute;
    pointer-events: none;

    top: 50%;
    left: 50%;
    height: 30px;
    width: 30px;
    scale: 2.8;
  }
</style>
