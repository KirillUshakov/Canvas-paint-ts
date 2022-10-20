<template>
  <div class="home">
    <div class="container">
      <paint/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Paint from '@/components/paint/Paint.vue';

@Component({
  components: {
    Paint
  }
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
  .home {
    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
