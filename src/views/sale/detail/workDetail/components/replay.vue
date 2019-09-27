<template>
  <transition name="fade">
    <div class="dialog" v-show="showMask">
      <div class="dialog-container">
        <p class="tit">选择一种方式回复</p>
        <div class="close-btn" @click="closeMask"><i class="el-icon-close"></i></div>
        <ul class="list">
          <li v-for="(item,index) in listData" :key="item.imgUrl" @mouseenter="hover(index)" @mouseleave="leave"
              @click="goToReplay(item)">
            <img :src="item.imgUrl" alt="">
            <p>{{item.cont}}</p>
          </li>
        </ul>
      </div>
    </div>
  </transition>

</template>
<script>
  import text from '../../../../../assets/replay/text.png'
  import text2 from '../../../../../assets/replay/text2.png'
  import brush from '../../../../../assets/replay/brush.png'
  import brush2 from '../../../../../assets/replay/brush2.png'
  import micro from '../../../../../assets/replay/micro.png'
  import micro2 from '../../../../../assets/replay/micro2.png'
  import pencil from '../../../../../assets/replay/pencil.png'
  import pencil2 from '../../../../../assets/replay/pencil2.png'

  export default {
    props: ['value', 'type'],
    data() {
      return {
        showMask: false,
        listData: [
          {imgUrl: micro, cont: '留语音', stat: false, path: './correctRecord'},
          {imgUrl: pencil, cont: '画张图', stat: false, path: './draw'},
          {imgUrl: brush, cont: '原图上回复', stat: false, path: './draw'},
          {imgUrl: text, cont: '留文字', stat: false, path: './correctText'}
        ],
        replayType: ''
      }
    },
    methods: {
      //关闭弹出层
      closeMask() {
        this.showMask = false;
      },
      //鼠标移上去状态
      hover(index) {
        var config;
        if (this.replayType == 1 || this.replayType == 5 || this.replayType == 9) {
          config = {
            0: micro2,
            1: pencil2,
            2: brush2,
            3: text2,
          }
        } else {
          config = {
            0: micro2,
            1: pencil2,
            2: text2,
          }
        }
        this.listData[index].imgUrl = config[index]
      },
      //鼠标离开时的状态
      leave() {
        if (this.replayType == 1 || this.replayType == 5 || this.replayType == 9) {
          this.listData = [
            {imgUrl: micro, cont: '留语音', stat: false, path: './correctRecord'},
            {imgUrl: pencil, cont: '画张图', stat: false, path: './draw'},
            {imgUrl: brush, cont: '原图上回复', stat: false, path: './draw'},
            {imgUrl: text, cont: '留文字', stat: false, path: './correctText'}
          ]
        } else {
          this.listData = [
            {imgUrl: micro, cont: '留语音', stat: false, path: './correctRecord'},
            {imgUrl: pencil, cont: '画张图', stat: false, path: './draw'},
            {imgUrl: text, cont: '留文字', stat: false, path: './correctText'}
          ]
        }

      },
      //去回复页面
      goToReplay(item) {
        if (item.cont == '原图上回复') {
          sessionStorage.setItem('originalDrawing', true)
        } else {
          sessionStorage.setItem('originalDrawing', false)
        }
        this.$router.push({
          path: `${item.path}`
        })
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
      },
      type(newVal, oldVal) {
        this.replayType = newVal
        if (newVal != 1 && newVal != 5 && newVal != 9) {
          this.listData = [
            {imgUrl: micro, cont: '留语音', stat: false, path: './correctRecord'},
            {imgUrl: pencil, cont: '画张图', stat: false, path: './draw'},
            {imgUrl: text, cont: '留文字', stat: false, path: './correctText'}
          ]
        } else {
          this.listData = [
            {imgUrl: micro, cont: '留语音', stat: false, path: './correctRecord'},
            {imgUrl: pencil, cont: '画张图', stat: false, path: './draw'},
            {imgUrl: brush, cont: '原图上回复', stat: false, path: './draw'},
            {imgUrl: text, cont: '留文字', stat: false, path: './correctText'}
          ]
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../common.scss';

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

      .tit {
        margin-top: 47px;
        margin-bottom: 40px;
      }

      ul {
        width: 100%;

        li {
          float: left;
          width: 94px;
          height: 94px;
          border-radius: 4px;
          border: solid 1px transparent;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #4a4942;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 40px;
          cursor: pointer;

          img {
            margin: 12px 0 8px 0;
          }
        }

        li:hover {
          background-color: #f9fafc;
          border: solid 1px #dcdfe6;
        }

        li:first-child {
          margin-left: 76px;
        }

        &:first-child {
          img {
            width: 37px;
            height: 46px;
          }
        }

        &:nth-of-type(2) {
          img {
            width: 46px;
            height: 46px;
          }
        }

        &:nth-of-type(3) {
          img {
            width: 40px;
            height: 40px;
          }
        }

        &:nth-of-type(4) {
          img {
            width: 38px;
            height: 40px;
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
