<template>
  <div class="counter">
    <input
      :value="value"
      :min="minVal"
      :max="maxVal"

      @change="change"

      type="number"
      class="input-number"
    >
    <div class="counter__btns">
      <button @click="increase" class="counter__btn increase" aria-label="increase" title="increase"></button>
      <button @click="decrease" class="counter__btn decrease" aria-label="Decrease" title="Decrease"></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

@Component
export default class Counter extends Vue {
  @Prop({ default: 0 }) value : number;
  @Prop({ default: 0 }) minVal : number;
  @Prop({ default: 1000 }) maxVal : number;

  // Methods
  increase () {
    const value = Number(this.value);

    if (value + 1 > this.maxVal) {
      return;
    }

    this.onInput(value + 1);
  }

  decrease () {
    const value = Number(this.value);

    if (value - 1 < this.minVal) {
      return
    }

    this.onInput(value - 1);
  }

  change (e: any) {
    if (!e.target.value) { return }

    let value = Number(e.target.value);

    if (value > this.maxVal) {
      value = this.maxVal;
    }

    if (value < this.minVal) {
      value = this.minVal;
    }

    this.onInput(value);
  }

  // Emit
  @Emit('input')
  onInput (value: number):number {
    return value;
  }
}
</script>

<style lang="scss" scopped>
  .counter {
    width: 100%;
    max-width: 85px;
    height: 37px;

    display: flex;
    color: $white;

    .input-number {
      width: 54px;
      height: 100%;

      padding: 0 8px;

      text-align: center;
      font-size: 12px;
      font-family: inherit;
      color: inherit;

      margin-right: 1px;

      background-color: $dark;
      border:1px solid transparent;

      transition: .3s ease-in-out;

      &:focus {
        outline: 0;
        border-color: $primary;
      }
    }

    .input-number::-webkit-outer-spin-button,
    .input-number::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &__btns {
      display: flex;
      flex-direction: column;

      flex-grow: 1;

      height: 100%;
    }

    &__btn {
      cursor: pointer;
      position: relative;

      width: 100%;
      height: 50%;
      padding: 0;

      background-color: $dark;
      border:1px solid transparent;

      transition: .3s ease-in-out;

      &::before {
        content: '';

        position: absolute;
        left: 50%;
        top: 50%;

        width: 13px;
        height: 13px;

        background-image: url('../../assets/images/icons/arrow-top.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;

        transform: translate(-50%, -50%);
      }

      &.decrease {
        &::before {
          transform: translate(-50%, -50%) scaleY(-1);
        }
      }

      &:hover {
        opacity: 0.5;
      }
    }
  }
</style>
