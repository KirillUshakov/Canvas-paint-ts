<template>
  <div class="option-item-row radio-input option-item__controll-row">
    <label class="radio-label active">
      <span>No border</span>
      <input type="radio" name="value" value="1">
    </label>
    <label class="radio-label">
      <span>Solid</span>
      <input type="radio" name="value" value="1">
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

@Component
export default class RadioSelector extends Vue {
  @Prop({ default: 'solid' }) value: string;
  @Prop({ default: () => [] }) options: string[];

  @Emit('input')
  onChange () {
    return this.value;
  }
}
</script>

<style lang="scss" scroped>
.radio-input {
  display: flex;
  flex-wrap: wrap;

  margin: -4px -8px;
}

.radio-label {
  cursor: pointer;

  margin: 4px 8px;
  padding: 0.9em 1.666em;

  font-size: 13px;
  font-weight: 400;
  color: $white;
  opacity: 0.6;

  background-color: $dark;
  border: 1px solid $dark;
  transition: .3s;

  &:hover,
  &:focus,
  &.active {
    opacity: 1;
  }

  &.active {
    border-color: $primary;
  }

  input[type="radio"] {
    position: absolute;
    left: 0;
    top: 0;

    opacity: 0;
    height: 0;
    width: 0;
    padding: 0;
    margin: 0;

    pointer-events: none;
  }
}
</style>
