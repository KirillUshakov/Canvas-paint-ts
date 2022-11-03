<template>
  <div class="option-item__controll-row">
    <div class="left">
      <input
        ref="colorInput"
        v-model="color"
        @change="inputChange"

        type="color"
        class="input-color"
      >
    </div>
    <div class="right row">
      <div class="col">
        <arrow-btn v-model="showPreviousColors" :arrowDown="true" :is-disabled="!previousColors.length"/>
      </div>
      <div class="col">
        <button
          @click="eyeDropperAction"
          :class="{ 'active' : isEyeDropperMode }"
          type="button"
          class="eyedropper-btn icon-btn"
          aria-label="eyedropper tool"
        >
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.6">
            <path d="M3.00002 9.85L2.37502 12.35C2.35272 12.4317 2.34726 12.5171 2.35897 12.601C2.37069 12.6849 2.39934 12.7655 2.44318 12.838C2.48702 12.9105 2.54514 12.9733 2.614 13.0227C2.68287 13.072 2.76104 13.1068 2.84377 13.125C2.94428 13.1504 3.04952 13.1504 3.15002 13.125L5.65002 12.5C5.76093 12.4736 5.86251 12.4174 5.94377 12.3375L11.125 7.13125L11.9313 7.94375L12.8188 7.05625L12.0063 6.25L13.625 4.63125C13.8578 4.39704 13.9885 4.08023 13.9885 3.75C13.9885 3.41976 13.8578 3.10295 13.625 2.86875L12.6313 1.875C12.3971 1.64218 12.0803 1.51151 11.75 1.51151C11.4198 1.51151 11.103 1.64218 10.8688 1.875L9.25002 3.49375L8.43752 2.68125L7.55002 3.56875L8.36252 4.375L3.18127 9.55625C3.09448 9.63521 3.03167 9.73701 3.00002 9.85ZM4.16877 10.3187L9.25002 5.2625L10.2375 6.25L5.18127 11.3125L3.85627 11.6437L4.16877 10.3187Z" fill="white"/>
            </g>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="previousColors.length && showPreviousColors" class="full bg-dark">
      <div class="previous-colors">
        <button
          v-for="(prevColor, index) in previousColors"
          :key="index"

          @click="selectColor(prevColor, index)"

          :class="{ 'active' : prevColor === color }"
          :style="`background-color: ${ prevColor };`"
          :title="`select color - ${ prevColor }`"

          type="button"
          class="previous-colors__item"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import ArrowBtn from '@/components/common/ArrowBtn.vue';
import EyeDropper from '@/classes/tools/brushes/eyeDropper';
import Board from '@/classes/board/board';
import Tool from '@/classes/tools/tool';

@Component({
  components: {
    ArrowBtn
  },

  computed: {
    ...mapGetters({
      board: 'getActiveBoard'
    })
  }
})
export default class ColorSelector extends Vue {
  @Prop({ default: '#212121' }) value: string;

  protected board: Board;

  resetTool: Tool = new Tool('default', 'default', new Board('default', document.createElement('canvas')));
  eyeDropper: EyeDropper;
  previousColors: String[] = [];
  showPreviousColors = false;
  isEyeDropperMode = false
  maxPreviousColors = 20;
  color = '#212121';

  mounted () {
    this.color = this.value;
    this.setupEyeDropper();
  }

  @Watch('board')
  onBoardChange () {
    this.setupEyeDropper();
  }

  setupEyeDropper () {
    this.eyeDropper = new EyeDropper('EyeDropper', 'eyedropper', this.board, (selectedColor) => {
      this.eyeDropperAction();
      this.color = selectedColor;
      this.inputChange();
    });
  }

  inputChange () {
    this.addPreviousColor(this.color, this.previousColors.findIndex(prevClr => prevClr === this.color));
    this.onChange();
  }

  selectColor (selectedColor: string, index: number) {
    this.color = selectedColor;
    this.addPreviousColor(this.color, index);
    this.onChange();
  }

  addPreviousColor (color: string, index: number) {
    if (this.previousColors[0] === color) return;

    if (index !== -1) {
      this.previousColors.splice(index, 1);
    }

    this.previousColors.unshift(color);

    this.filterPreviousColors();
  }

  filterPreviousColors () {
    let result = Array.from(new Set(this.previousColors.map(el => el)));
    const length = result.length;

    if (length > this.maxPreviousColors) {
      result = result.slice(0, this.maxPreviousColors - 1);
    }

    this.previousColors = result;
  }

  eyeDropperAction () {
    this.isEyeDropperMode = !this.isEyeDropperMode;

    if (this.isEyeDropperMode) {
      this.$store.dispatch('setActiveTool', this.eyeDropper);
      return;
    }

    this.$store.dispatch('resetActiveTool', this.resetTool);
  }

  @Emit('input')
  onChange () {
    return this.color;
  }
}
</script>

<style lang="scss" scroped>
.previous-colors {
  display: flex;
  flex-wrap: wrap;

  margin: -5px -4.5px;
  padding: 10px 18px;

  &__item {
    cursor: pointer;

    width: 20px;
    height: 20px;

    margin: 5px 4.5px;

    will-change: transform;
    border: 0.2px solid $white;
    transition: transform .3s ease;

    &:hover,
    &:focus {
      border-width: 0.5px;
      transform: scale(1.1);
    }

    &.active {
      border-width: 1px;
      transform: scale(1.17);
    }
  }
}
</style>
