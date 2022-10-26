<template>
  <div class="paint__options">

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PaintOptions extends Vue {}
</script>

<style lang="scss">
  .paint__options {
    width: 100%;
    max-width: 335px;
    height: 100%;
    background-color: $black;
  }
</style>
