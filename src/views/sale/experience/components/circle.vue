<template>
  <span :class="{green:status ==0,red:status ==1,circle:true}">
  </span>
</template>

<script>

  export default {
    name: 'circle',
    props:['status'],
    data() {
      return {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .circle{
    display:inline-block;
    width: 14px;
    height: 14px;
    border-radius: 100%;
  }
  .green{
    background: #6ac743;
  }
  .red{
    background: #ff5647;
  }

</style>
