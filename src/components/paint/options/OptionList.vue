<template>
  <div class="paint-option-list">
    <div class="option-item">
      <div class="option-item__title">Line width</div>
      <div class="option-item__controlls">
        <range-input-width-count/>
      </div>
    </div>

    <div class="option-item">
      <div class="option-item__title">Fill color</div>
      <div class="option-item__controlls">
        <color-selector/>
      </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RangeInputWidthCount from '@/components/paint/options/inputs/RangeInputWidthCount.vue';
import ColorSelector from '@/components/paint/options/inputs/ColorSelector.vue';

@Component({
  components: {
    RangeInputWidthCount,
    ColorSelector
  }
})
export default class PaintOptionList extends Vue {}
</script>

<style lang="scss">
  .option-item {
    padding: 1.375rem 1.625rem;

    font-size: 0.875rem;
    color: $white;

    border-bottom: 1px solid $light-grey;

    &__title {
      margin-bottom: 0.7em;
    }

    &__controlls {}

    &__controll-row {
      width: 100%;

      display: flex;
      align-items: center;
      flex-wrap: wrap;

      & > .left {
        flex-grow: 1;
        margin-right: 1.5625rem;
      }

      & > .right {
        flex: 0 0 85px;
      }

      & > .full {
        flex: 1 1 100%;

        margin-top: 0.625rem;
      }
    }
  }
</style>
