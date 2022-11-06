<template>
  <div class="paint">
    <paint-sidebar
      :toolList="toolList"
    />

    <paint-board
      :board-data="boardData"

      @init-board="initBoard"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mousemove="mousemove"
      @mouseover ="mouseover"
      @mouseleave="mouseleave"
    />

    <paint-options />
  </div>

</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue, Watch } from 'vue-property-decorator';
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
import { BoardData } from '@/types/boardData';

@Component({
  components: {
    PaintSidebar,
    PaintBoard,
    PaintOptions
  },

  computed: {
    ...mapGetters({
      activeTool: 'getActiveTool',
      activeBoard: 'getActiveBoard'
    })
  }
})
export default class Paint extends Vue {
  protected activeTool: Tool;
  protected activeBoard: Board;

  // Data
  boardData: BoardData = {
    board: new Board('Default', document.createElement('canvas')),
    resMultiplier: 1,
    size: {
      width: 800,
      height: 800
    },
    style: {}
  }

  toolList: Tool[] = [];
  mousePosition: Mouse = { x: 0, y: 0 };

  // Hooks
  beforeMount () {
    this.initMouseWindowListeners();
  }

  beforeUnmount () {
    this.removeMouseWindowListeners();
  }

  mounted () {
    this.setupTools();
    this.selectTool(0);
  }

  // Methods
  initBoard (board: Board) {
    this.boardData.board = board;

    this.initTools();
  }

  initTools (selectToolIndex = 0) {
    this.setupTools();
    this.selectTool(selectToolIndex);
  }

  setupTools () {
    const board = this.boardData.board;

    if (!board) {
      return;
    }

    this.$store.dispatch('setActiveBoard', board);
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
    if (!this.toolList[index]) { return }
    this.$store.dispatch('setActiveTool', this.toolList[index]);
  }

  getBoardMousePosition (e: MouseEvent) {
    const canvas = this.boardData.board.canvas;
    const xValue = e.pageX - canvas.getBoundingClientRect().left;
    const yValue = e.pageY - canvas.getBoundingClientRect().top;

    this.mousePosition.x = Math.round(xValue * this.boardData.resMultiplier) || 1;
    this.mousePosition.y = Math.round(yValue * this.boardData.resMultiplier) || 1;
  }

  clearBoard () {
    this.boardData.board.reset();
  }

  initMouseWindowListeners () {
    window.addEventListener('mouseup', this.mouseup);
    window.addEventListener('mousemove', this.mousemove);
    window.addEventListener('keyup', this.keyupHandler);
  }

  removeMouseWindowListeners () {
    window.removeEventListener('mouseup', this.mouseup);
    window.removeEventListener('mousemove', this.mousemove);
    window.addEventListener('keyup', this.keyupHandler);
  }

  // -- Board Mouse events
  mousedown (e: MouseEvent) {
    this.activeBoard.saveView();
    this.getBoardMousePosition(e);
    this.activeTool.mousedown(this.mousePosition.x, this.mousePosition.y);
  }

  mouseup (e: MouseEvent) {
    this.getBoardMousePosition(e);
    this.activeTool.mouseup(this.mousePosition.x, this.mousePosition.y);
  }

  mousemove (e: MouseEvent) {
    this.getBoardMousePosition(e);
    this.activeTool.mousemove(this.mousePosition.x, this.mousePosition.y, e);
  }

  mouseover (e: MouseEvent) {
    this.getBoardMousePosition(e);
    this.activeTool.mouseover(this.mousePosition.x, this.mousePosition.y);
  }

  mouseleave (e: MouseEvent) {
    this.getBoardMousePosition(e);
    this.activeTool.mouseleave(this.mousePosition.x, this.mousePosition.y);
  }

  keyupHandler (e: KeyboardEvent) {
    if (e.ctrlKey && e.key === 'z') {
      this.undoAction();
      return;
    }

    if (e.ctrlKey && e.key === 'y') {
      this.redoAction();
    }
  }

  undoAction () {
    this.activeBoard.undoAction();
  }

  redoAction () {
    this.activeBoard.redoAction();
  }
}
</script>

<style lang="scss" >
.paint {
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;

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

  &__sidebar-general {
    margin-bottom: 50px;
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
      opacity: 1;
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
