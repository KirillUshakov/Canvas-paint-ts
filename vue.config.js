const { defineConfig } = require('@vue/cli-service');
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,

  // Css
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/main.scss";'
      }
    }
  },

})
