<template>
  <div :class="{questionProgressContainer:questionType,answerProgressContainer:!questionType}">
    <div class="progressItem" :style="{width:barwidth+'%'}">

    </div>
  </div>
</template>

<script>
  export default {
    props: ['total', 'rest', 'barwidth', 'questionType'],
    data() {
      return {}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .questionProgressContainer, .answerProgressContainer {
    box-sizing: border-box;
    position: relative;
    width: 481px;
    height: 55px;
    margin: 6px 0 0 5px;
    background-color: #fff;

    .progressItem {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: orange;
      background-image: linear-gradient(90deg, #ffffff 0%, #ff7600 100%);
      opacity: 0.19;
      border-right: 1px solid red;
    }
  }

  .answerProgressContainer {
    .progressItem {
      opacity: 1;
      background-image: linear-gradient(90deg,
        #ffffff 0%,
        #c4f386 100%);
      border-right: 1px solid #93d142;
    }
  }

</style>
