<template>
  <div :class="[type ? 'picture--' + type : '']" class="picture">
    <viewer class="view">
      <img :src="pictureImg" alt="" ref="img">
    </viewer>
  </div>
</template>

<script>
  import test from '@/assets/workDetail/test.png'

  export default {
    props: {
      src: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        pictureImg: test
      }
    },
    created() {
      this.pictureImg = this.src
    },
    watch: {
      src(newVal, oldVal) {
        if (newVal != oldVal) {
          this.pictureImg = newVal
        }
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../common.scss';

  .picture {
    box-sizing: border-box;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    width: 693px;
    height: 384px;
    background-size: 693px 384px;
    padding: 17px 10px 16px 60px;


    .view {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

  }

  .picture--question {
    background: url("./../../../../../assets/workDetail/bg-picture-question.png") no-repeat center center;
  }

  .picture--answer {
    background: url("./../../../../../assets/workDetail/bg-picture-answer.png") no-repeat center center;
  }

</style>
