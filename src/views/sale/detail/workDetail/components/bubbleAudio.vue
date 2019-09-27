<template>
  <div class="audio" :class="[type ? 'audio--' + type : '']">

    <audio
      id="audio"
      ref="audio"
      :src="url"
      :preload="audio.preload"
      class="dn"
      @play="onPlay"
      @error="onError"
      @pause="onPause"
      @ended="onEnded()"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    />

    <!--时间-->
    <div class="progress fl">
      <div class="time">
        <img :src="audio.sound" alt="">
        <span>{{ audio.totalTime + `”`}}</span>
      </div>
    </div>

    <!--回复-->
    <span v-if="type=='student'" class="replay fr" @click="replay">回复</span>

    <!--播放按钮-->
    <div class="play-btn btn fr" @click="startPlay" v-if="!audio.playing">
      <span>点击播放</span>
      <img :src="currentImg" alt="">
    </div>

    <!--暂停按钮-->
    <div class="pause-btn btn fr" @click="pausePlay" v-if="audio.playing">
      <img :src="currentImg" alt="">
    </div>

    <!--三角-->
    <span class="triangle">
    </span>

    <!--选择一种回复方式-->
    <replay v-model="material" :type="replayType" title="" v-on:cancel="clickCancel()"></replay>
  </div>
</template>

<script>
  import questionPlay from '@/assets/workDetail/questionPlay.png'
  import questionStop from '@/assets/workDetail/questionStop.png'

  import answerPlay from '@/assets/workDetail/answerPlay.png'
  import answerStop from '@/assets/workDetail/answerStop.png'

  import sound from '@/assets/workDetail/sound.png'
  import replay from './replay'


  export default {
    components: {
      replay
    },
    props: {
      theUrl: {
        type: String
      },
      theControlList: {
        type: String,
      },
      type: {
        type: String
      },
      record: {
        type: Object
      }
    },
    data() {
      return {
        material: false,
        replayType: '',
        url: this.theUrl || 'https://files.proudkids.cn/proudkids-ems/20190308/60f910ece7044cae979eb7427321a1f8.mp3',
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
      //设置question或者answer的播放暂停图片
      const config = {
        'teacher': this.questionImg,
        'student': this.answerImg
      }
      this.audio.playImg = config[this.type]
      this.currentImg = this.audio.playImg[0]
    },

    // watch: {
    //   type(newVal, oldVal) {
    //     if (newVal != oldVal) {
    //       this.type = newVal
    //     }
    //   }
    // },
    methods: {
      replay() {
        this.replayType = this.record.filesType
        sessionStorage.setItem('qaPic', this.record.value)
        sessionStorage.setItem('currentQaId', this.record.qaId)
        sessionStorage.setItem('qaType', this.record.type)
        sessionStorage.setItem('qaRuserId', this.$route.query.ruserId)
        sessionStorage.setItem('qaLessSecCid', this.record.id)
        sessionStorage.setItem('qaLessSecId', this.record.lessSecId)
        sessionStorage.setItem('isCurrentPage', '')

        sessionStorage.setItem('qaSwiperId', this.$parent.$parent.swiperId)
        sessionStorage.setItem('qaTabsStatus', this.tabsStatus)
        this.material = true
      },
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
        this.audio.currentTime = res.target.currentTime
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
        setTimeout(()=>{
          this.audio.totalTime = parseInt(res.target.duration)
        },500)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../common.scss';

  .audio {
    width: 588px;
    height: 52px;
    border-radius: 8px;
    position: relative;
    padding-left: 14px;
    margin-left: 20px;

    .triangle {
      position: absolute;
      border-left: 20px solid transparent;
      display: block;
      width: 0;
      height: 0;
      top: 20px;
      left: -20px;
      overflow: hidden;
    }

    .time {
      font-family: SFUIDisplay-Regular;
      font-size: 26px;
      color: #444444;
      margin-top: 11px;

      img {
        width: 22px;
        height: 24px;
      }
    }

    .btn {
      width: 102px;
      height: 30px;
      border-radius: 35px;
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      margin: 11px 11px 0 0;
    }

    .play-btn {
      padding-left: 15px;
      margin-right: 11px;

      span {
        margin-right: 5px;
      }
    }

    .pause-btn {
      margin-right: 11px;
      justify-content: center;
    }


  }

  .audio--student {
    background-color: #91e224;
    box-shadow: 0px 6px 0px 0px #77d10b;

    .triangle {
      border-bottom: 20px solid #91e224;
      box-shadow: 0px 6px 0px 0px #77d10b;
    }

    .btn {
      background-image: linear-gradient(0deg,
        #ceff7c 0%,
        #f8fff0 100%);
      box-shadow: 0px 3px 0px 0px #5ca900;
      color: #548e05;
    }


    .replay {
      width: 77px;
      height: 52px;
      text-align: center;
      line-height: 52px;
      font-size: 16px;
      color: #444444;
      cursor: pointer;
      border-radius: 0 8px 8px 0;
      background-color: #77d10b;
    }

  }

  .audio--teacher {
    background-color: #fff200;
    box-shadow: 0px 2px 0px 0px #ffc900;

    .triangle {
      border-bottom: 20px solid #fff200;
      box-shadow: 0px 2px 0px 0px #ffc900;
    }

    .btn {
      background-image: linear-gradient(0deg,
        #ff6800 0%,
        #ff8d00 100%);
      box-shadow: 0px 3px 0px 0px #e04b00;
      color: #ffffff;
    }
  }

</style>
