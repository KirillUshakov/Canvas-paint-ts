<template>
  <div class="paint">
    <paint-panel :board="board"/>
    <div class="paint__board">
      <canvas ref="canvas" class="paint__canvas"></canvas>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import paintPanel from '@/components/paint/PaintPanel.vue';
import Board from '@/classes/board/board';

@Component({
  components: {
    paintPanel
  }
})
export default class Paint extends Vue {
  @Ref('canvas') readonly boardRef: HTMLCanvasElement = new HTMLCanvasElement();

  get board ():Board {
    return new Board('Default', this.boardRef);
  }

  mounted () {
    console.log(this.boardRef);
  }
}
</script>

<style lang="scss" >
.paint {
  display: flex;
  flex-direction: column;

  &__panel {
    margin-bottom: 2rem;

    display: flex;
    flex-wrap: wrap;
  }

  &__tools {
    display: flex;
    flex-wrap: wrap;

    gap: 0.5rem;
  }

  &__tool {
    cursor: pointer;

    position: relative;
    width: 50px;
    height: 50px;

    background-color: $white;
    border: 1px solid $light-grey;
    border-radius: 1rem;

    transition: all .3s;

    svg {
      position: absolute;
      left: 50%;
      top: 50%;

      width: 60%;
      height: 60%;

      object-fit: contain;
      object-position: center;

      transform: translate(-50%, -50%);
      transition: all .3s;
    }

    &:hover {
      background-color: $primary;

      svg {
        filter: brightness(0) invert(1);
      }
    }
  }

  &__board {
    position: relative;

    width: 100%;
    padding-top: 56.7%;

    border: 1px solid $light-grey;
    border-radius: 1rem;
  }

  &__canvas {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
  }
}
</style>
