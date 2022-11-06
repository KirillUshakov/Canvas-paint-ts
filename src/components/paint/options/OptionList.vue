<template>
  <div class="paint-option-list" :key="optionListKey">
    <div
      v-for="option in optionList"
      :key="option.id"

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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import { allOptions } from '@/components/paint/options/config/allOptions'
import { OptionList } from '@/types/optionList';
import RangeInputWidthCount from '@/components/paint/options/inputs/RangeInputWidthCount.vue';
import ColorSelector from '@/components/paint/options/inputs/ColorSelector.vue';
import Tool from '@/classes/tools/tool';
import Board from '@/classes/board/board';
import { boardOption } from '@/types/boardOption';
import { toolOption } from '@/types/toolOption';

@Component({
  components: {
    RangeInputWidthCount,
    ColorSelector
  },

  computed: {
    ...mapGetters({
      activeTool: 'getActiveTool',
      activeBoard: 'getActiveBoard'
    })
  }
})
export default class PaintOptionList extends Vue {
  private activeBoard: Board;
  private activeTool: Tool;
  allOptions: OptionList = allOptions;
  optionListKey = 1;

  // Computed
  get activeToolOptions (): toolOption[] {
    return this.activeTool?.availableOptions;
  }

  get optionList (): OptionList {
    let optionList: OptionList = JSON.parse(JSON.stringify(this.allOptions));

    if (!this.activeToolOptions) return optionList;

    const curContext = this.activeBoard.ctx;
    optionList = optionList.filter(el => this.activeToolOptions.find(option => option.optionName === el.optionName));

    this.activeToolOptions.forEach(option => {
      const findOption = optionList.find(el => el.optionName === option.optionName);
      const curValue = curContext ? curContext[option.optionName] : undefined;

      if (findOption) {
        findOption.title = option.title && option.title.length ? option.title : findOption.title;
        findOption.value = curValue !== undefined && curValue !== findOption.value ? curValue : findOption.value;
      }
    });

    this.optionListKey++;
    return optionList;
  }

  // Methods
  setBoardSettings () {
    this.activeBoard.setupContextSettings(this.prepareBoardSettings(this.optionList));
  }

  prepareBoardSettings (options: OptionList): boardOption[] {
    return options.map((el) => {
      return {
        key: el.optionName,
        value: el.value
      }
    });
  }
}
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
