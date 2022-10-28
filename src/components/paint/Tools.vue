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
import { mapGetters } from 'vuex';

import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import Tool from '@/classes/tools/tool';

@Component({
  computed: {
    ...mapGetters({
      activeTool: 'getActiveTool'
    })
  }
})
export default class PaintTools extends Vue {
  @Prop({ required: true }) toolList: Tool[];

  protected activeTool: Tool;

  get activeToolIndex () {
    if (!this.activeTool) {
      return 0;
    }

    return this.toolList.findIndex((tool) => {
      return tool.name === this.activeTool.name &&
      tool.iconClass === this.activeTool.iconClass &&
      tool.constructor.name === this.activeTool.constructor.name;
    })
  }

  @Emit()
  selectTool (index: number) {
    if (!this.toolList[index]) {
      return
    }

    this.$store.dispatch('setActiveTool', this.toolList[index]);
  }
}
</script>

<style lang="scss" scoped>

</style>
