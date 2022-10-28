<template>
  <div class="paint__board">
    <canvas
      ref="canvas"
      class="paint__canvas"
      willReadFrequently="true"

      :width="boardSize.width"
      :height="boardSize.height"

      :style="boardData.style"

      @mousedown="mousedown"
      @mouseup="mouseup"
      @mousemove="mousemove"
      @mouseover ="mouseover"
      @mouseleave="mouseleave"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Emit, Vue } from 'vue-property-decorator'

import Board from '@/classes/board/board';
import { BoardData } from '@/types/boardData';

@Component
export default class PaintBoard extends Vue {
  @Ref('canvas') readonly boardRef: HTMLCanvasElement
  @Prop({ required: true }) boardData: BoardData

  // Data
  boardSize: {
    width: number,
    height: number
  } = {
    width: 800,
    height: 800
  }

  // Hooks
  mounted () {
    this.initBoard(this.boardRef);
    this.setCanvasSize();
  }

  // Methods
  setCanvasSize () {
    const width = this.boardRef.clientWidth;
    const height = this.boardRef.clientHeight;

    this.boardSize.width = width;
    this.boardSize.height = height;
    this.boardData.style.width = width + 'px';
    this.boardData.style.height = height + 'px';
  }

  initWindowListeners () {
    window.addEventListener('resize', this.setCanvasSize);
  }

  removeWindowListeners () {
    window.removeEventListener('resize', this.setCanvasSize);
  }

  // Emit
  @Emit()
  initBoard (canvas: HTMLCanvasElement) {
    return new Board('default board', canvas);
  }

  @Emit()
  mousedown (e: MouseEvent) {
    return e
  }

  @Emit()
  mouseup (e: MouseEvent) {
    return e
  }

  @Emit()
  mousemove (e: MouseEvent) {
    return e
  }

  @Emit()
  mouseover (e: MouseEvent) {
    return e
  }

  @Emit()
  mouseleave (e: MouseEvent) {
    return e
  }
}
</script>

<style lang="scss">

</style>
