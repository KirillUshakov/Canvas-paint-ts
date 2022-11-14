<template>
  <div
    class="option-item"
  >
    <div class="option-item__title">{{ option.title }}</div>
    <div class="option-item__controlls">
      <range-input-width-count
        v-if="option.type === 'number'"
        v-model="option.value"

        :minVal="option.options.min"
        :maxVal="option.options.max"

        @input="setBoardSettings"
      />
      <color-selector
        v-else-if="option.type === 'color'"
        v-model="option.value"
        @input="setBoardSettings"
      />
      <radio-selector
        v-else-if="option.type === 'radio'"
        v-model="option.value"
        :options="option.optionList"
        @input="setBoardSettings"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

// Inputs
import RangeInputWidthCount from '@/components/paint/options/inputs/RangeInputWidthCount.vue';
import ColorSelector from '@/components/paint/options/inputs/ColorSelector.vue';
import RadioSelector from '@/components/paint/options/inputs/RadioSelector.vue';
import { CustomOptionListItem, OptionListItem } from '@/types/optionTypes';

@Component({
  components: {
    RangeInputWidthCount,
    ColorSelector,
    RadioSelector
  }
})
export default class optionItem extends Vue {
  @Prop({ default: () => [] }) option: OptionListItem | CustomOptionListItem;

  @Emit('input')
  setBoardSettings () {}
}
</script>

<style lang="scss">

</style>
