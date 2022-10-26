<template>
  <div class="home">
    <paint-module/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PaintModule from '@/modules/paint/PaintModule.vue';

@Component({
  components: {
    PaintModule
  }
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  max-width: 1920px;
  height: 100vh;

  overflow: hidden;
}
</style>
