const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // Css
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/main.scss";`
      }
    }
  }
})
