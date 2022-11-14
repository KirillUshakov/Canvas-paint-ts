<template>
  <div class="paint-option-list" :key="optionListKey">

    <option-item
      v-for="option in availableOptionList"
      :key="option.id"
      :option="option"

      @input="setBoardSettings"
    />

  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';

// Options
import { allOptionList } from '@/components/paint/options/config/optionsConfig'

// Classes / Types
import Tool from '@/classes/tools/tool';
import Board from '@/classes/board/board';
import { OptionListItem } from '@/types/optionTypes';
import { toolAvailableOption } from '@/types/toolTypes';
import { boardOption, customBoardOptions } from '@/types/boardTypes';

// General
import { copy, isContextOption, isCustomOption } from '@/common/general';

// Components
import optionItem from '@/components/paint/options/components/OptionItem.vue'

@Component({
  components: {
    optionItem
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

  allOptionList: OptionListItem[] = allOptionList;
  optionListKey = 1;

  // Computed
  get activeToolOptions (): toolAvailableOption[] {
    return this.activeTool?.availableOptions;
  }

  get availableOptionList (): OptionListItem[] {
    if (!this.activeToolOptions || !this.activeToolOptions.length) {
      return this.getConfiguredOptions(this.allOptionList);
    }

    const availableOptions = this.allOptionList.filter(option => this.activeToolOptions.find(activeOption => activeOption.optionName === option.optionName));

    return this.getConfiguredOptions(availableOptions, this.activeToolOptions);
  }

  // Methods
  getConfiguredOptions (optionListInstance: OptionListItem[] = [], activeToolOptions: toolAvailableOption[] = []): OptionListItem[] {
    const optionList: OptionListItem[] = copy(optionListInstance);
    const boardContext = this.activeBoard.ctx;
    const boardCustomOptions: customBoardOptions = this.activeBoard.customOptions;

    // Setup Option values
    for (const option of optionList) {
      const existedToolOption = activeToolOptions.find(toolOption => toolOption.optionName === option.optionName);
      const customOptions = existedToolOption?.options ? Object.assign(option.options, existedToolOption?.options) : option.options;
      const title = existedToolOption?.title ? existedToolOption.title : option.title;
      let value = option.value;

      if (boardContext && isContextOption(option.optionName) && boardContext[option.optionName]) {
        value = boardContext[option.optionName];
      } else if (boardCustomOptions && isCustomOption(option.optionName) && boardCustomOptions[option.optionName]) {
        value = boardCustomOptions[option.optionName];
      }

      option.title = title;
      option.value = value;
      option.options = customOptions;
    }

    optionList.forEach((el, index) => {
      el.id = index;
    })

    return optionList;
  }

  setBoardSettings () {
    const preparedBoardSettings = this.getPreparedBoardSettings(this.availableOptionList);

    this.activeBoard.setPaintSettings(preparedBoardSettings);
  }

  getPreparedBoardSettings (options: OptionListItem[]): boardOption[] {
    return options.map((el) => {
      return {
        name: el.optionName,
        value: el.value
      }
    })
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
      margin-bottom: 0.9em;
    }

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
