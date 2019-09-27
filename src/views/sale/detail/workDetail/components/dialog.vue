<template>
  <transition name="fade">
    <div class="dialog" v-show="showMask">
      <div class="dialog-container">
        <img :src="imgSrc" alt="">
        <div class="content" v-html="content"></div>
        <div class="btns">
          <el-button type="primary" class="btn-default" @click="enter">进入</el-button>
        </div>
        <div class="close-btn" @click="closeMask"><i class="el-icon-close"></i></div>
      </div>


    </div>
  </transition>

</template>
<script>
  import addSuccess from '@/assets/workDetail/addSuccess.png'

  export default {
    props: {
      value: {},
      type: {
        type: String,
        default: 'default'
      },
      content: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showMask: false,
        imgSrc: addSuccess,

      }
    },
    methods: {
      closeMask() {
        this.showMask = false;
      },
      enter() {
        this.showMask = false;
        this.$parent.addLibrary()
      }
    },
    mounted() {
      this.showMask = this.value;
    },
    watch: {
      value(newVal, oldVal) {
        this.showMask = newVal;
      },
      showMask(val) {
        this.$emit('input', val);
      }
    },
  }
</script>
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;

    .dialog-container {
      width: 648px;
      height: 253px;
      box-shadow: 0px 2px 35px 0px rgba(88, 93, 107, 0.11);
      border-radius: 8px;
      border: solid 1px #dcdfe6;
      background: #ffffff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
      font-size: 28px;
      color: #666666;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 144px;
        height: 143px;
        margin-top: -43px;
        z-index: 100;
      }

      .content {
        color: #797979;
        margin-top: 48px;
      }

      .btns {
        width: 100%;
        height: 60px;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 16px;
        box-sizing: border-box;

        .btn-default {
          width: 141px;
          height: 37px;
          background-color: #449cfc;
          border-radius: 4px;

          &:hover {
            background: #66b1ff;
            cursor: pointer;
          }
        }
      }

      .close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;

        &:hover {
          font-weight: 600;
        }
      }
    }
  }
</style>
