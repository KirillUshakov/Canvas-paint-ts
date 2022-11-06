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
        :disabled="!isUndoAvailable"
      >
      </button>
      <button
        class="paint__tool paint__tool--redo btn"
        aria-label="Redo"
        title="Redo"

        @click="redoAction"
        :disabled="!isRedoAvailable"
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
import { mapGetters } from 'vuex';

// Components
import PaintTools from '@/components/paint/Tools.vue';

// Classes
import Tool from '@/classes/tools/tool';
import Board from '@/classes/board/board';

@Component({
  components: {
    PaintTools
  },

  computed: {
    ...mapGetters({
      activeBoard: 'getActiveBoard'
    })
  }
})
export default class PaintSidebar extends Vue {
  @Prop({ required: true }) toolList: Tool[];

  protected activeBoard: Board;

  // Computed
  get isUndoAvailable () {
    return this.activeBoard?.undoHistory?.length;
  }

  get isRedoAvailable () {
    return this.activeBoard?.redoHistory?.length;
  }

  // Methods
  undoAction () {
    this.activeBoard?.undoAction();
  }

  redoAction () {
    this.activeBoard?.redoAction();
  }

  clearBoard () {
    this.activeBoard?.reset();
  }

  // Emit
  @Emit()
  generalAction () {}
}
</script>

<style lang="scss" scoped>

</style>
