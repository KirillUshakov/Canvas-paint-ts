<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss" scopped>
#app {
  background-color: $black;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
}
</style>
