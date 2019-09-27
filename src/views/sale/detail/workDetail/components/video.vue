<template>
  <div :class="[type ? 'video--' + type : '']" class="video clearfix">
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
  </div>
</template>

<script>
  import test from '@/assets/workDetail/test.png'

  import {videoPlayer} from 'vue-video-player';


  export default {
    components: {
      videoPlayer
    },
    props: ['questionPictureType', 'videoSrc', 'type'],
    data() {
      return {
        pictureImg: test,
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
      this.playerOptions.sources[0].src = this.videoSrc
    },
    methods: {
      fullScreen() {
        const player = this.$refs.videoPlayer.player
        player.requestFullscreen()
        player.isFullscreen(true)
        player.play()
      },
      onPlayerPlay(player) {
        player.play()
      },
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
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../common.scss';

  .video {
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

    img {
      width: 100%;
      height: 100%;
    }
  }

  .video--question {
    background: url("./../../../../../assets/workDetail/bg-picture-question.png") no-repeat center center;
  }

  .video--answer {
    background: url("./../../../../../assets/workDetail/bg-picture-answer.png") no-repeat center center;
  }

</style>
