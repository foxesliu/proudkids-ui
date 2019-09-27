<template>
  <div :class="{question:questionTextType,answer:!questionTextType}">
    <div class="question-tip">
      <img src="../../../../../assets/replay/replayzi.png" alt="">
    </div>
    <div class="question-cont">
      <span>
      {{cont}}
      </span>
    </div>

  </div>
</template>

<script>

  export default {
    props: {
      questionTextType: {
        type: Boolean,
        required: true
      },
      cont: {
        type: String,
        required: true
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../common.scss';

  .question, .answer {
    box-sizing: border-box;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    width: 693px;
    min-height: 86px;
    background-color: #fff200;
    box-shadow: 0px 6px 0px 0px #ffc900;
    border-radius: 8px;
    padding: 9px;
    display: flex;

    .question-tip {
      width: 37px;
      display: flex;
      background-color: #ffa100;
      box-shadow: inset 0px 1px 13px 0px rgba(255, 0, 0, 0.16);
      border-radius: 8px 0 0 8px;
      margin: 0 8px 0 0;
      display: flex;
      justify-content: center;

      img {
        width: 18px;
        height: 46px;
        margin-top: 8px;
      }
    }

    .question-cont {
      width: 630px;
      background-color: #ffffff;
      box-shadow: inset 7px 7px 9px 0px rgba(255, 147, 0, 0.26),
      inset 7px 7px 0px 0px #ffd800;
      padding: 23px 15px 15px 15px;

      span {
        display: inline-block;
        text-align: justify;
        height: 24px;
        line-height: 24px;
        font-size: 16px;
        color: #444444;
      }
    }
  }

  .answer {
    /*background: url("./../../../../../assets/workDetail/bg-text-question.png") no-repeat center center;*/
  }

</style>
