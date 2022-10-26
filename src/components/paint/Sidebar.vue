<template>
  <div class="paint__sidebar">
    <button
      class="paint__tool paint__tool--clear btn"
      aria-label="Clear all"
      title="Clear all"

      @click="clearBoard"
    >
    </button>

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
}
</script>

<style lang="scss" scoped>

</style>
