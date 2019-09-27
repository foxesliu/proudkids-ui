<template>
  <div class="tit">
    {{appTitle}}
  </div>
</template>

<script>
  export default {
    props: ['appTitle']
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../detail.scss';

  .tit {
    height: 78px;
    background: #fff;
    font-size: 18px;
    color: #8e8e8e;
    display: flex;
    align-items: center;
    border: 2px solid #f6f6f6;
    border-radius: 10px;
    padding-left: 38px;
    margin-bottom: 18px;
  }

</style>

