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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
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
    this.pen = new Pen('Pen', 'pen', this.board);

    this.toolList = [
      this.pen,
      this.pen
    ];

    this.selectTool(0);
  }

  @Emit()
  selectTool (index: number) {
    this.activeToolIndex = index;
    return this.toolList[this.activeToolIndex];
  }
}
</script>

<style lang="scss" scoped>

</style>
