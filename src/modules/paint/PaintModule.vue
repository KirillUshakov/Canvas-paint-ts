<template>
  <div class="paint">
    <paint-sidebar
      @clear-board="clearBoard"
      :board="board"
      :toolList="toolList"
    />

    <paint-board
      :board-data="boardData"

      @mousedown="mousedown"
      @mouseup="mouseup"
      @mousemove="mousemove"
      @mouseover ="mouseover"
      @mouseleave="mouseout"
    />

    <paint-options />
  </div>

</template>

<script lang="ts">
import { Component, Vue, Ref, Watch } from 'vue-property-decorator';
import PaintSidebar from '@/components/paint/Sidebar.vue';
import PaintBoard from '@/components/paint/Board.vue';
import PaintOptions from '@/components/paint/Options.vue';

// Classes / Types
import Board from '@/classes/board/board';
import Tool from '@/classes/tools/tool';
import Pen from '@/classes/tools/brushes/pen';
import Eraser from '@/classes/tools/brushes/eraser';
import Line from '@/classes/tools/shapes/line';
import Circle from '@/classes/tools/shapes/circle';
import Rectangle from '@/classes/tools/shapes/rectangle';
import Fill from '@/classes/tools/pointTools/fill';
import { Mouse } from '@/types/mouse';

@Component({
  components: {
    PaintSidebar,
    PaintBoard,
    PaintOptions
  }
})
export default class Paint extends Vue {
  @Ref('canvas') readonly boardRef: HTMLCanvasElement

  // Data
  // -- Board
  boardData: {
    board: Board,
    resolution: number,
    size: number,
    style: any
  } = {
    board: new Board('Default', document.createElement('canvas')),
    resolution: 1,
    size: 800,
    style: {
      width: '800px',
      height: '800px'
    }
  }

  // -- Tools
  toolList: Tool[] = [];
  activeTool: Tool = new Tool('default', 'default', this.boardData.board);

  mousePosition: Mouse = { x: 0, y: 0 };

  beforeMount () {
    this.initMouseWindowListeners();
  }

  beforeUnmount () {
    this.removeMouseWindowListeners();
  }

  mounted () {
    this.boardData.board = new Board('Default', this.boardRef);

    this.setupTools();
    this.selectTool(0);
  }

  // Methods
  setupTools () {
    const board = this.boardData.board;

    if (!board) {
      return;
    }

    const pen = new Pen('Pen', 'pen', board);
    const line = new Line('Line', 'line', board);
    const circle = new Circle('Circle', 'circle', board);
    const rectangle = new Rectangle('Rectangle', 'rectangle', board);
    const eraser = new Eraser('Eraser', 'eraser', board);
    const fill = new Fill('Fill', 'fill', board);

    this.toolList = [
      pen,
      line,
      circle,
      rectangle,
      eraser,
      fill
    ];
  }

  selectTool (index: number) {
    this.activeTool = this.toolList[index];
  }

  getBoardMousePosition (e: MouseEvent) {
    const canvas = this.boardData.board.canvas;
    const xValue = e.pageX - canvas.getBoundingClientRect().left;
    const yValue = e.pageY - canvas.getBoundingClientRect().top;

    this.mousePosition.x = Math.round(xValue * this.boardData.resolution) || 1;
    this.mousePosition.y = Math.round(yValue * this.boardData.resolution) || 1;
  }

  clearBoard () {
    this.boardData.board.reset();
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

  @Watch('board')
  onBoardChange (val: Board) {
    this.setupTools();
    this.selectTool(0);
  }
}
</script>

<style lang="scss" >
.paint {
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;

  &__sidebar {
    display: flex;
    flex-direction: column;

    width: 50px;
    height: 100%;

    background-color: $black;

    .paint {
      &__tools {
        &--global {
          margin-bottom: 60px;
        }
      }

      &__tool {
        &--clear {
          margin-top: auto;
          margin-bottom: 0;
        }
      }
    }
  }

  &__tools {
    width: 100%;

    display: flex;
    flex-direction: column;
  }

  &__tool {
    cursor: pointer;

    position: relative;
    width: 50px;
    height: 50px;

    padding-top: 1px;
    opacity: 0.6;

    background-color: transparent;
    border:0;
    border-bottom: 1px solid $white;

    transition: all .3s;

    &::before {
      content: '';

      position: absolute;
      left: 50%;
      top: 50%;

      width: calc(100% - 20px);
      height: calc(100% - 19px);

      background-size: contain;
      background-position: center;
      background-image: url('../../assets/images/tools/circle.svg');

      transform: translate(-50%, -50%);
      transition: all ease-in-out cubic-bezier(0.215, 0.610, 0.355, 1);
    }

    &:hover {
      opacity: 1;
    }

    &.active {
      pointer-events: none;
      opacity: 1;

      background: $dark;
      border-color: $primary;
    }

    // icon modificators
    &--pen {
      &::before {
        background-image: url('../../assets/images/tools/pencil.svg');
      }
    }

    &--line {
      &::before {
        background-image: url('../../assets/images/tools/line.svg');
      }
    }

    &--circle {
      &::before {
        background-image: url('../../assets/images/tools/circle.svg');
      }
    }

    &--rectangle {
      &::before {
        background-image: url('../../assets/images/tools/rectangle.svg');
      }
    }

    &--eraser {
      &::before {
        background-image: url('../../assets/images/tools/eraser.svg');
      }
    }

    &--fill {
      &::before {
        background-image: url('../../assets/images/tools/floodfill.svg');
      }
    }

    &--clear {
      border-color: transparent;

      &::before {
        background-image: url('../../assets/images/global_tools/reset.svg');
      }

      &:hover {
        background: #f46969;

        &::before {
          transform: translate(-50%, -50%) rotate(-360deg) ;
        }
      }
    }

    &--settings {
      background-color: $primary;
      border-color: $primary;

      &::before {
        background-image: url('../../assets/images/global_tools/settings.svg');
      }

      &:hover {
        background: $black;
      }
    }

    &--undo {
      &::before {
        background-image: url('../../assets/images/global_tools/undo.svg');
      }
    }

    &--redo {
      &::before {
        background-image: url('../../assets/images/global_tools/redo.svg');
      }
    }
  }

  &__board {
    position: relative;

    flex-grow: 1;
    height: 100%;
    overflow: auto;
  }

  &__canvas {
    display: block;

    width: 100%;
    height: 100%;

    border: 0;
    background-color: $white;
  }
}
</style>
