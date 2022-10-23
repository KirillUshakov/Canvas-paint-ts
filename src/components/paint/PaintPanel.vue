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
import Pen from '@/classes/tools/pen';

@Component
export default class PaintPanel extends Vue {
  @Prop({ required: true }) board: Board;

  toolList: Array<Tool> = [];
  activeToolIndex = 0;
  pen: Pen;

  mounted () {
    this.setupTools();
    this.selectTool(0);
  }

  setupTools () {
    this.pen = new Pen('Pen', 'pen', this.board);

    this.toolList = [
      this.pen
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
