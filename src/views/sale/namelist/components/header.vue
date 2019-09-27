<template>
  <div class="header">
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .header {
    h1 {
      height: 24px;
      font-size: 24px;
      font-weight: normal;
      line-height: 24px;
      color: #666666;
    }
  }
</style>

