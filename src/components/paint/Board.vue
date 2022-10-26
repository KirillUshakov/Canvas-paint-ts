<template>
  <div class="paint__board">
    <canvas
      ref="canvas"
      class="paint__canvas"
      willReadFrequently="true"

      :width="boardSize * boardResolutionVal"
      :height="boardSize * boardResolutionVal"

      :style="boardStyle"

      @mousedown="mousedown"
      @mouseup="mouseup"
      @mousemove="mousemove"
      @mouseover ="mouseover"
      @mouseleave="mouseout"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PaintBoard extends Vue {}
</script>

<style lang="scss">

</style>
