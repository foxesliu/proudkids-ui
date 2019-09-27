<template>
  <div>
    <!--带音频-->
    <div :class="{question:questionRecordType,answer:!questionRecordType}" class="clearfix" v-if="recordStat">
      <audio
        ref="audio"
        :src="theUrl"
        :preload="audio.preload"
        class="dn"
        @play="onPlay"
        @error="onError"
        @pause="onPause"
        @ended="onEnded()"
        @timeupdate="onTimeupdate"
        @loadedmetadata="onLoadedmetadata"
      />
      <!--播放按钮-->
      <div class="play-btn btn fr" @click="startPlay" v-if="!audio.playing">
        <span>点击播放</span>
        <img :src="currentImg" alt="">
      </div>

      <!--暂停按钮-->
      <div class="pause-btn btn fr" @click="pausePlay" v-if="audio.playing">
        <img :src="currentImg" alt="">
      </div>
      <div class="progress fl">
        <div class="score">
          <span>{{answerScore}}</span>
          <span>分</span>
        </div>
        <div class="time">
          <img :src="audio.sound" alt="">
          <span>{{ audio.totalTime + `”`}}</span>
        </div>
        <progressbar :rest="audio.currentTime" :total="audio.totalTime" :barwidth="audio.barwidth" class="progressbar"
                     :questionType="questionAudioType"></progressbar>

      </div>

    </div>
    <!--没有音频-->
    <div class="no-record" v-else>
      <div class="no-record-cont">
        <span>请上传录音</span>
      </div>
      <div class="no-record-micro">
        <img :src="mikeImg" alt="">
      </div>
    </div>
    <div class="text-tip">
      <div class="text-tip-header">
        <span>请跟读以下内容</span>
      </div>
      <div class="text-tip-cont">
        <span></span>
        <p>
          {{content}}
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import test from '@/assets/workDetail/bg-text-question.png'
  import question from '@/assets/workDetail/question.png'
  import progressbar from './progressbar'
  import sound from '@/assets/workDetail/sound.png'

  import questionPlay from '@/assets/workDetail/questionPlay.png'
  import questionStop from '@/assets/workDetail/questionStop.png'

  import answerPlay from '@/assets/workDetail/answerPlay.png'
  import answerStop from '@/assets/workDetail/answerStop.png'

  import mike from '@/assets/workDetail/mike.png'

  export default {
    components: {
      progressbar
    },
    props: ['content', 'recordStat', 'questionRecordType', 'questionAudioType', 'theUrl', 'theControlList', 'answerScore'],
    data() {
      return {
        mikeImg: mike,
        pictureImg: test,
        url: this.theUrl,
        currentImg: '',
        questionImg: [
          questionPlay,
          questionStop
        ],
        answerImg: [
          answerPlay,
          answerStop
        ],
        audio: {
          currentTime: 0,
          totalTime: 0,
          playing: false,
          waiting: true,
          preload: 'auto',
          sound: sound,
          barwidth: 0,
          playImg: ''
        },
        controlList: {
          // 不显示进度条
          noProcess: false,
          // 只能播放一个
          onlyOnePlaying: false,
        }
      }
    },
    created() {
      this.setControlList()
      /*
      * 设置question或者answer的播放暂停图片
      * questionAudioType:true使用questionImg  false使用answerImg
      *
      * */
      const config = {
        true: this.questionImg,
        false: this.answerImg
      }
      this.audio.playImg = config[this.questionAudioType]
      this.currentImg = this.audio.playImg[0]
    },
    methods: {
      setControlList() {
        const controlList = this.theControlList.split(' ')
        controlList.forEach((item) => {
          if (this.controlList[item] !== undefined) {
            this.controlList[item] = true
          }
        })
      },
      // 播放
      startPlay() {
        this.currentImg = this.audio.playImg[1]
        this.$refs.audio.play();
      },
      // 暂停
      pausePlay() {
        this.currentImg = this.audio.playImg[0]
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause() {
        this.currentImg = this.audio.playImg[0]
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError() {
        this.audio.waiting = true
      },
      //结束
      onEnded() {
        this.currentImg = this.audio.playImg[0]
      },
      // 当音频开始播放
      onPlay(res) {
        this.audio.playing = true
        this.audio.loading = false
        if (!this.controlList.onlyOnePlaying) {
          return
        }
        const target = res.target
        const audios = document.getElementsByTagName('audio');
        [...audios].forEach((item) => {
          if (item !== target) {
            item.pause()
          }
        })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        this.audio.currentTime = res.target.currentTime
        this.currentTime = res.target.currentTime
        this.audio.barwidth = parseInt(this.audio.currentTime / this.audio.totalTime * 100)
        if (this.audio.barwidth > 100) {
          this.audio.barwidth = 100
        }
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      onLoadedmetadata(res) {
        this.audio.waiting = false
        this.audio.totalTime = parseInt(res.target.duration)
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../common.scss';
  /*带音频*/
  .question, .answer {
    box-sizing: border-box;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    width: 693px;
    height: 86px;
    background: url("./../../../../../assets/workDetail/bg-answer-record-text-audio.png") no-repeat center center;

    .btn {
      width: 129px;
      height: 42px;
      margin: 16px 14px 0 0;
      background-image: linear-gradient(0deg,
        #ff6800 0%,
        #ff8d00 100%);
      box-shadow: 0px 6px 0px 0px #e04b00;
      border-radius: 35px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .play-btn {
      span {
        font-size: 18px;
        letter-spacing: 0.1px;
        color: #ffffff;
        margin: 0 8px 0 18px;
      }

      img {
        width: 14px;
        height: 17px;
      }
    }

    .pause-btn {
      justify-content: center;
    }

    .progress {
      /*margin: 9px 0 0 53px;*/
      width: 479px;
      height: 53px;
      position: relative;

      .score {
        width: 127px;
        height: 39px;
        position: absolute;
        z-index: 100;
        left: 60px;
        top: 23px;
        background-image: linear-gradient(90deg,
          #d4e603 0%,
          #fffc8e 12%,
          #fff500 25%,
          #fff73f 100%);
        box-shadow: 5px 1px 4px 0px rgba(255, 135, 57, 0.2);
        border-radius: 4px 20px 20px 4px;

        span:first-child {
          padding-left: 30px;
          line-height: 39px;
          padding-right: 6px;
          font-size: 30px;
          letter-spacing: 0.1px;
          color: #427102;
        }

        span:last-child {
          font-size: 12px;
          letter-spacing: 0.1px;
          color: #444444;
        }
      }

      .time {
        position: absolute;
        z-index: 100;
        left: 195px;
        top: 30px;
        display: flex;
        align-items: center;

        img {
          width: 22px;
          height: 25px;
          margin-right: 9px;
        }

        span {
          font-size: 20px;
          color: #444444;
        }
      }
    }

  }

  .answer {
    background: url("./../../../../../assets/workDetail/bg-answer-record-text-audio.png") no-repeat center center;

    .btn {
      background-image: linear-gradient(0deg,
        #ceff7c 0%,
        #f8fff0 100%);
      box-shadow: 0px 6px 0px 0px #5ca900;
    }

    .play-btn {
      span {
        color: #548e05;
      }
    }

    .progressbar {
      margin: 17px 0 0 58px;
      height: 53px;
    }
  }

  /*没有音频*/
  .no-record {
    box-sizing: border-box;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    width: 693px;
    height: 86px;
    background: url("./../../../../../assets/workDetail/bg-answer-record-text-record-without.png") no-repeat center center;

    .no-record-cont {
      float: left;
      margin: 33px 0 0 66px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #444444;
    }

    .no-record-micro {
      float: right;
      margin: 10px 16px 0 0;
      width: 63px;
      height: 61px;
      background-image: linear-gradient(0deg,
        #ceff7c 0%,
        #f8fff0 100%);
      box-shadow: 0px 3px 0px 0px #5ca900;
      border-radius: 52px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 28px;
        height: 36px;
      }
    }
  }

  .text-tip {
    width: 660px;
    background-image: linear-gradient(180deg,
      #c1e600 0%,
      #fffa72 8%,
      #fff949 16%,
      #fff42a 100%);
    margin: 0 0 0 17px;
    padding: 0.1px;

    .text-tip-header {
      width: 113px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #ff7a00;
      border-radius: 8px;
      margin: 23px 0 0 20px;
      color: #fff;
      font-size: 14px;
    }

    .text-tip-cont {
      display: flex;
      justify-items: flex-start;
      align-items: flex-start;
      margin-left: 14px;
      margin-top: 7px;
      margin-bottom: 21px;

      span {
        margin-top: 4px;
        display: inline-block;
        border: 9px solid #ff7a00;
        border-right: transparent;
        border-bottom: 9px solid transparent;
        border-top: 9px solid transparent;
      }

      p {
        width: 600px;
        margin-left: 4px;
        margin-right: 8px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 23px;
        letter-spacing: 0.1px;
        word-break: break-all;
        color: #444444;
      }
    }
  }

</style>
