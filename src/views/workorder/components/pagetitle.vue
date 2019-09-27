<template>
  <div class="page-title">{{title}}</div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  .page-title {
    font-size: 18px;
    /*font-weight: bold;*/
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    margin-top: -20px;
  }
</style>
<script>
  export default {
    props: ['title']
  }
</script>
