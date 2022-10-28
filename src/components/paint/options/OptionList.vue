<template>
  <div class="option-item">
    <div class="option-item__title">Line width</div>
    <div class="option-item__controlls">
      <range-input-width-count/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Counter from '@/components/common/counter.vue';
import RangeInputWidthCount from '@/components/paint/options/RangeInputWidthCount.vue';

@Component({
  components: {
    Counter,
    RangeInputWidthCount
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

      & > .left {
        flex-grow: 1;
        margin-right: 1.5625rem;
      }

      & > .right {
        flex: 0 0 85px;
      }
    }
  }
</style>
