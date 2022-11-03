<template>
  <button
    @click="toggleActive"
    :class="{ 'arrow-btn--down' : arrowDown, 'active' : isActive && doToggle }"
    :disabled="isDisabled"

    type="button"
    aria-label="Toggle recent colors panel"
    class="arrow-btn icon-btn"
  >
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.8345 8.22904L6.50928 3.90382L2.18406 8.22904" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class ArrowBtn extends Vue {
  @Prop({ required: true }) value: boolean;
  @Prop({ default: false }) arrowDown: boolean;
  @Prop({ default: true }) doToggle: boolean;
  @Prop({ default: false }) isDisabled: boolean;

  isActive = false;

  toggleActive () {
    this.isActive = !this.isActive;

    this.onChange();
  }

  @Emit('input')
  onChange () {
    return this.isActive;
  }
}
</script>

<style lang="scss" scoped>
.arrow-btn {
  path {
    stroke: currentColor;
  }

  &.active {
    svg {
      transform: rotate(180deg);
    }
  }

  &--down {
    svg {
      transform: rotate(180deg);
    }

    &.active {
      svg {
        transform: rotate(0);
      }
    }
  }
}
</style>
