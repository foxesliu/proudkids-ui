<template>
  <div :class="{questionProgressContainer:questionType,answerProgressContainer:!questionType}">
    <div class="progressItem" :style="{width:barwidth+'%'}">
      <!--<span class="triangle"></span>-->
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
    width: 300px;
    height: 52px;
    background-color: #91e224;
    border-radius: 8px;

    .progressItem {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: orange;
      background-image: linear-gradient(90deg, #ffffff 0%, #ff7600 100%);
      opacity: 0.19;
      margin-left: -20px;
      border-right: 1px solid red;
    }
  }

  .answerProgressContainer {
    .progressItem {
      opacity: 1;
      background-image: linear-gradient(90deg,
        #ffffff 0%,
        pink 100%);
      border-right: 1px solid #93d142;
      position: relative;
    }


  }

</style>
