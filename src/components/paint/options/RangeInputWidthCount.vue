<template>
  <div class="option-item__controll-row">
    <div class="left">
      <input
        v-model="curValue"
        :min="minVal"
        :max="maxVal"

        type="range"
        class="input-range"
      >
    </div>
    <div class="right">
      <counter v-model="curValue" :minVal="minVal" :maxVal="maxVal"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import Counter from '@/components/common/counter.vue';

@Component({
  components: {
    Counter
  }
})
export default class RangeInputWidthCount extends Vue {
  @Prop({ default: 15 }) defaultValue: number;
  @Prop({ default: 0 }) minVal : number;
  @Prop({ default: 1000 }) maxVal : number;

  curValue = 15;

  mounted () {
    this.curValue = this.defaultValue;
  }

  @Emit('input')
  onChange () {
    return this.curValue;
  }
}
</script>

<style lang="scss">

</style>
