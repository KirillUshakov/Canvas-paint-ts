<template>
  <div class="paint">
    <paint-panel
      @select-tool="selectTool"
      @clear-board="clearBoard"

      :board="board"
    />
    <div class="paint__board">
      <canvas
        ref="canvas"
        class="paint__canvas"

        :width="boardSize * boardResolutionVal"
        :height="boardSize * boardResolutionVal"

        :style="boardStyle"

        @mousedown="mousedown"
        @mouseup="mouseup"
        @mousemove="mousemove"
        @mouseover ="mouseover"
        @mouseleave="mouseout"
      ></canvas>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import paintPanel from '@/components/paint/PaintPanel.vue';
import Board from '@/classes/board/board';
import Tool from '@/classes/tools/tool';
import { Mouse } from '@/types/mouse';

@Component({
  components: {
    paintPanel
  }
})
export default class Paint extends Vue {
  @Ref('canvas') readonly boardRef: HTMLCanvasElement

  boardResolutionVal = 3;
  boardSize = 700;
  boardStyle = {
    width: this.boardSize + 'px',
    height: this.boardSize + 'px'
  }

  board: Board = new Board('Default', document.createElement('canvas'));
  activeTool: Tool = new Tool('default', 'default', this.board);

  mousePosition: Mouse = { x: 0, y: 0 };

  beforeMount () {
    this.initMouseWindowListeners();
  }

  beforeUnmount () {
    this.removeMouseWindowListeners();
  }

  mounted () {
    this.board = new Board('Default', this.boardRef);
  }

  // Methods
  selectTool (selectedTool: Tool) {
    this.activeTool = selectedTool;
  }

  getBoardMousePosition (e: MouseEvent) {
    const canvas = this.board.canvas;
    const xValue = e.pageX - canvas.getBoundingClientRect().left;
    const yValue = e.pageY - canvas.getBoundingClientRect().top;

    this.mousePosition.x = xValue * this.boardResolutionVal || 1;
    this.mousePosition.y = yValue * this.boardResolutionVal || 1;
  }

  clearBoard () {
    this.board.reset();
  }

  initMouseWindowListeners () {
    window.addEventListener('mouseup', this.mouseup);
    window.addEventListener('mousemove', this.mousemove);
  }

  removeMouseWindowListeners () {
    window.removeEventListener('mouseup', this.mouseup);
    window.removeEventListener('mousemove', this.mousemove);
  }

  // -- Board Mouse events
  mousedown (e: MouseEvent) {
    this.getBoardMousePosition(e);
    this.activeTool.mousedown(this.mousePosition.x, this.mousePosition.y);
  }

  mouseup (e: MouseEvent) {
    this.getBoardMousePosition(e);
    this.activeTool.mouseup(this.mousePosition.x, this.mousePosition.y);
  }

  mousemove (e: MouseEvent) {
    this.getBoardMousePosition(e);
    this.activeTool.mousemove(this.mousePosition.x, this.mousePosition.y);
  }

  mouseover (e: MouseEvent) {
    this.getBoardMousePosition(e);
    this.activeTool.mouseover(this.mousePosition.x, this.mousePosition.y);
  }

  mouseout (e: MouseEvent) {
    this.getBoardMousePosition(e);
    this.activeTool.mouseout(this.mousePosition.x, this.mousePosition.y);
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
    width: 100%;
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

    &::before {
      content: '';

      position: absolute;
      left: 50%;
      top: 50%;

      width: 60%;
      height: 60%;

      background-size: contain;
      background-position: center;
      background-image: url('../../assets/images/tools/circle.svg');

      transform: translate(-50%, -50%);
      transition: all .3s;
    }

    &:hover,
    &.active {
      background-color: $primary;

      svg {
        filter: brightness(0) invert(1);
      }
    }

    &.active {
      pointer-events: none;
    }

    // icon modificators
    &--pen {
      &::before {
        background-image: url('../../assets/images/tools/pen.svg');
      }
    }

    &--line {
      &::before {
        background-image: url('../../assets/images/tools/line.svg');
      }
    }

    &--clear {
      margin-right: 0;
      margin-left: auto;

      &::before {
        background-image: url('../../assets/images/tools/reset.svg');
      }

      &:hover {
        background: #f46969;

        &::before {
          transform: translate(-50%, -50%) rotate(-360deg) ;
        }
      }
    }
  }

  &__board {
    position: relative;

    margin: auto;

    border: 1px solid $light-grey;
    border-radius: 1rem;
  }

  &__canvas {
    width: 100%;
    height: 100%;

    border: 0;
  }
}
</style>
