<template>
  <div class="paint__sidebar">
    <div class="paint__sidebar-general">
      <button
        class="paint__tool paint__tool--settings btn"
        aria-label="Open global settings"
        title="Open global settings"

        @click="generalAction"
      >
      </button>
      <button
        class="paint__tool paint__tool--undo btn"
        aria-label="Undo"
        title="Undo"

        @click="undoAction"
      >
      </button>
      <button
        class="paint__tool paint__tool--redo btn"
        aria-label="Redo"
        title="Redo"

        @click="redoAction"
      >
      </button>
    </div>

    <paint-tools
      :toolList="toolList"
    />

    <button
      class="paint__tool paint__tool--clear btn"
      aria-label="Clear all"
      title="Clear all"

      @click="clearBoard"
    >
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'

// Components
import PaintTools from '@/components/paint/Tools.vue';

// Classes
import Tool from '@/classes/tools/tool';

@Component({
  components: {
    PaintTools
  }
})
export default class PaintSidebar extends Vue {
  @Prop({ required: true }) toolList: Tool[];

  @Emit()
  clearBoard () {}

  @Emit()
  generalAction () {}

  @Emit()
  undoAction () {}

  @Emit()
  redoAction () {}
}
</script>

<style lang="scss" scoped>

</style>
