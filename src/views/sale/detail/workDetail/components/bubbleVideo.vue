<template>
  <div class="video" :class="[type ? 'text--' + type : '']">

    <div class="player">
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    style="object-fit:fill"
                    :options="playerOptions"
                    :x5-video-player-fullscreen="true"
                    @play="onPlayerPlay($event)"
                    @fullscreenchange="onFullscreenChange($event)"
                    @click="fullScreen"
      >
      </video-player>

      <div class="play-img" @click="fullScreen">
      </div>
    </div>

    <!--回复-->
    <span v-if="type=='student'" class="replay" @click="replay">回复</span>
    <span class="triangle">

    </span>

    <!--选择一种回复方式-->
    <replay v-model="material" :type="replayType" title="" v-on:cancel="clickCancel()"></replay>
  </div>
</template>

<script>
  import replay from './replay'
  import {videoPlayer} from 'vue-video-player';

  export default {
    components: {
      replay,
      videoPlayer
    },
    props: {
      type: {
        type: String
      },
      src: {
        type: String
      },
      record: {
        type: Object
      }
    },
    // props: ['questionPictureType', 'videoSrc', 'type'],
    data() {
      return {
        material: false,
        replayType: '',
        playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
          }],
          poster: "poster.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '未获取到视频地址，请联系管理员', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            // timeDivider: true,
            // durationDisplay: true,
            // remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    created() {
      this.playerOptions.sources[0].src = this.src
      console.log(this.type)
      console.log(this.src)
      console.log(this.record)
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    watch: {
      videoSrc(newVal, oldVal) {
        if (newVal != oldVal) {
          this.playerOptions.sources.src = newVal
        }
      }
    },
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
      fullScreen() {
        const player = this.$refs.videoPlayer.player
        player.requestFullscreen()
        player.isFullscreen(true)
        player.play()
      },
      onPlayerPlay(player) {
        player.play()
      }
    }

  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../common.scss';

  .video {
    width: 470px;
    height: 244px;
    border-radius: 8px;
    position: relative;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 18px;
    color: #444444;
    display: flex;
    justify-content: space-between;
    margin-left: 20px;

    .player {
      .viewer {
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .triangle {
      position: absolute;
      border-left: 20px solid transparent;
      display: block;
      width: 0;
      height: 0;
      bottom: 20px;
      left: -20px;
      overflow: hidden;
    }
  }

  .text--student {
    background-color: #91e224;
    box-shadow: 0px 6px 0px 0px #77d10b;

    .player {
      padding: 7px 5px 5px 8px;
      width: 100%;
      height: 100%;

      .video-player, .video-js.vjs-fluid, .video-js.vjs-16-9, .video-js.vjs-4-3 {
        width: 100%;
        height: 100% !important;
      }
    }

    .triangle {
      border-bottom: 20px solid #91e224;
      box-shadow: 0px 6px 0px 0px #77d10b;
    }

    .replay {
      width: 77px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #444444;
      cursor: pointer;
      border-radius: 0 8px 8px 0;
      background-color: #77d10b;
    }
  }

  .text--teacher {
    padding: 8px;
    background-color: #fff200;
    box-shadow: 0px 2px 0px 0px #ffc900;

    .player {
      width: 100%;
      height: 100%;
    }

    p {
      text-align: justify;
    }

    .triangle {
      border-bottom: 20px solid #fff200;
      box-shadow: 0px 2px 0px 0px #ffc900;
    }
  }

</style>
