<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
  html,body{
    width: 100%;
    height: 100%;
    #app{
      width: 100%;
      height: 100%;
    }
  }
</style>
