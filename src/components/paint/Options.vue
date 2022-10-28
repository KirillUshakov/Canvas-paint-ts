<template>
  <div class="paint-options">
    <div class="paint-options__actions">
      <button class="paint-options__action-btn active">Tool settings</button>
      <button class="paint-options__action-btn">Global settings</button>
    </div>
    <div class="paint-options__tabs">
      <div class="paint-options__tab active">
        <paint-option-list />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PaintOptionList from '@/components/paint/options/OptionList.vue';

@Component({
  components: {
    PaintOptionList
  }
})
export default class PaintOptions extends Vue {}
</script>

<style lang="scss">
  .paint-options {
    width: 100%;
    max-width: 335px;
    height: 100%;

    background-color: $black;

    &__actions {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      padding: 1.685rem 1.375rem;

      border-bottom: 1px solid $light-grey;
    }

    &__action-btn {
      cursor: pointer;

      padding: 0.625rem;

      opacity: 0.6;

      font-family: inherit;
      font-size: 1rem;
      color: $white;

      border: 0;
      background-color: transparent;

      transition: .3s ease-in-out;

      &:hover {
        opacity: 0.8;
      }

      &.active {
        opacity: 1;
        pointer-events: none;
      }
    }
  }
</style>
