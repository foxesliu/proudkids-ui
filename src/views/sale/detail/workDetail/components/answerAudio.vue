<template>
  <div :class="[type ? 'audio--' + type : '']" class="audio clearfix">
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
      <div class="time">
        <img :src="audio.sound" alt="">
        <span>{{ audio.totalTime + `”`}}</span>
      </div>
      <progressbar :rest="audio.currentTime" :total="audio.totalTime" :barwidth="audio.barwidth"
                   :type="type"></progressbar>

    </div>
  </div>
</template>

<script>
  import progressbar from './progressbar'
  import questionPlay from '@/assets/workDetail/questionPlay.png'
  import questionStop from '@/assets/workDetail/questionStop.png'

  import answerPlay from '@/assets/workDetail/answerPlay.png'
  import answerStop from '@/assets/workDetail/answerStop.png'

  import sound from '@/assets/workDetail/sound.png'

  export default {
    components: {
      progressbar
    },
    filters: {
      changeImgUrl(value) {
        const config = {}
      },
    },
    props: ['theUrl', 'theControlList', 'type'],
    data() {
      return {
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
      this.audio.playImg = this.answerImg
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

  .audio {
    box-sizing: border-box;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    width: 693px;
    height: 86px;
    background-size: 693px 86px;

    .btn {
      width: 129px;
      height: 42px;
      margin: 16px 14px 0 0;
      border-radius: 35px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .play-btn {
      span {
        font-size: 18px;
        letter-spacing: 0.1px;

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
      margin: 9px 0 0 53px;
      width: 479px;
      height: 53px;
      position: relative;

      .time {
        position: absolute;
        z-index: 100;
        left: 14px;
        top: 21px;
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

  .audio--question {
    background: url("./../../../../../assets/workDetail/bg-question.png") no-repeat center center;

    .btn {
      background-image: linear-gradient(0deg,
        #ff6800 0%,
        #ff8d00 100%);
      box-shadow: 0px 6px 0px 0px #e04b00;
    }

    .play-btn {
      span {
        color: #ffffff;
      }
    }
  }

  .audio--answer {
    background: url("./../../../../../assets/workDetail/bg-answer.png") no-repeat center center;

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
  }

</style>
