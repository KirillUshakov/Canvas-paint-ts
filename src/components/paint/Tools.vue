<template>
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
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import Tool from '@/classes/tools/tool';

@Component
export default class PaintTools extends Vue {
  @Prop({ required: true }) toolList: Tool[];

  activeToolIndex = 0;

  @Emit()
  selectTool (index: number) {
    this.activeToolIndex = index;
  }
}
</script>

<style lang="scss" scoped>

</style>
