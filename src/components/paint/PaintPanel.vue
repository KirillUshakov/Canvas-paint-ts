<template>
  <div class="paint__panel">
    <div class="paint__tools">
      <button
        v-for="(tool, index) in toolList"
        :key="index"

        :class="[{ 'active' : activeToolIndex === index }, `paint__tool--${tool.iconClass}`]"
        :aria-label="tool.name"
        :title="tool.name"

        @click="selectTool(index)"

        class="paint__tool btn"
      >
      </button>
      <button
        class="paint__tool paint__tool--clear btn"
        aria-label="Clear all"
        title="Clear all"

        @click="clearBoard"
      >

      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import Board from '@/classes/board/board';

import Tool from '@/classes/tools/tool';
import Pen from '@/classes/tools/brushes/pen';
import Eraser from '@/classes/tools/brushes/eraser';
import Line from '@/classes/tools/shapes/line';
import Circle from '@/classes/tools/shapes/circle';
import Rectangle from '@/classes/tools/shapes/rectangle';
import Fill from '@/classes/tools/pointTools/fill';

@Component
export default class PaintPanel extends Vue {
  @Prop({ required: true }) board: Board;

  toolList: Array<Tool> = [];
  activeToolIndex = 0;

  // Tools
  pen: Pen;
  line: Line;
  circle: Circle;
  rectangle: Rectangle;
  eraser: Eraser;
  fill: Fill;
  // =============

  mounted () {
    this.setupTools();
    this.selectTool(0);
  }

  setupTools () {
    this.pen = new Pen('Pen', 'pen', this.board);
    this.line = new Line('Line', 'line', this.board);
    this.circle = new Circle('Circle', 'circle', this.board);
    this.rectangle = new Rectangle('Rectangle', 'rectangle', this.board);
    this.eraser = new Eraser('Eraser', 'eraser', this.board);
    this.fill = new Fill('Fill', 'fill', this.board);

    this.toolList = [
      this.pen,
      this.line,
      this.circle,
      this.rectangle,
      this.eraser,
      this.fill
    ];
  }

  @Emit()
  selectTool (index: number) {
    this.activeToolIndex = index;
    return this.toolList[this.activeToolIndex];
  }

  @Emit()
  clearBoard () {}

  @Watch('board')
  onBoardChange (val: Board) {
    this.setupTools();
    this.selectTool(0);
  }
}
</script>

<style lang="scss" scoped>

</style>
