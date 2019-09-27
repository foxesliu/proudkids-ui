<template>
  <!--<div :class="{question:questionTextType,answer:!questionTextType}">-->
  <div :class="[type ? 'text--' + type : '']" class="text">
    <div class="tip">
      <img :src="questionImg" alt="">
    </div>
    <div class="cont">
      <span>
      {{content}}
      </span>
    </div>
  </div>
</template>

<script>
  import test from '@/assets/workDetail/bg-text-question.png'
  import question from '@/assets/workDetail/question.png'

  export default {

    props: ['questionTextType', 'content', 'type'],
    data() {
      return {
        pictureImg: test,
        questionImg: question
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../common.scss';

  .text {
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

    .tip {
      width: 37px;
      display: flex;
      background-color: #ffa100;
      box-shadow: inset 0px 1px 13px 0px rgba(255, 0, 0, 0.16);
      border-radius: 8px;
      margin: 0 8px 0 0;
      display: flex;
      justify-content: center;

      img {
        width: 20px;
        height: 27px;
        margin-top: 18px;
      }
    }

    .cont {
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
