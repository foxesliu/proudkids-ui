<template>
  <div class="ruserClassInfo">
    <name></name>
    <tabs></tabs>
  </div>
</template>

<script>
  import name from './component/name'
  import tabs from './component/tabs'

  export default {
    components: {
      name,
      tabs
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import '../../../aom/index.scss';
  .ruserClassInfo {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
  }

</style>
