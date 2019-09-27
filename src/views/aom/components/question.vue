<template>
  <div>
    <div class="questionList">
      <div class="flex-box question-box" v-if="questionType==0">
        <div class="question1 flex-box">
          <span class="flex-box">
            <img src="../../../assets/workDetail/question.png" alt="" style="display:block;">
          </span>
          <div class="input">
            <el-input type="textarea" autosize  placeholder="请输入内容" v-model="inputTxt" @change="getInputTxt(rank)"
              :disabled="!isHander" ></el-input>

            <!-- <textarea
              v-model="inputTxt"
              placeholder="请输入内容"
              @change="getInputTxt(rank)"
              :disabled="!isHander"
              style="white-space:normal;word-wrap:break-word;word-break:break-all"
            ></textarea> -->
          </div>
        </div>
        <div class="delete-box" @click="deleteQ(rank)" v-if="isHander">
          <img src="../../../assets/workDetail/delete.png" alt>
        </div>
      </div>
      <div class="flex-box question-box" v-if="questionType==1">
        <div class="question3 flex-box" v-if="!isPaint">
          <span class="flex-box">
            <img src="../../../assets/workDetail/question.png" alt>
          </span>
          <div class="img-box">
            <viewer>
              <img :src="theUrl" alt>
            </viewer>
          </div>
        </div>
        <div v-if="isPaint">
          <div class="isPaint">
            <img :src="theUrl" alt>
          </div>
        </div>
        <div class="delete-box" @click="deleteQ(rank)" v-if="isHander">
          <img src="../../../assets/workDetail/delete.png" alt>
        </div>
      </div>
      <div class="flex-box question-box" v-if="questionType==2">
        <div class="question1 flex-box question2">
          <span class="flex-box">
            <img src="../../../assets/workDetail/question.png" alt>
          </span>
          <div class="main-container-box">
            <div class="flex-box icon-box">
              <span>
                <img src="../../../assets/workDetail/sound.png" alt>
              </span>
              <span>{{ audio.totalTime + `”`}}</span>
            </div>
            <div class="progressbar">
              <progressbar
                :rest="audio.currentTime"
                :total="audio.totalTime"
                :barwidth="audio.barwidth"
                :questionType="true"
              ></progressbar>
            </div>
          </div>
          <div class="playBtn" v-if="!isPlay" @click="startPlay">
            <span>点击播放</span>
            <img src="../../../assets/workDetail/questionPlay.png" alt>
          </div>
          <div class="playBtn" v-if="isPlay" @click="pausePlay">
            <img src="../../../assets/workDetail/questionStop.png" alt>
          </div>
        </div>
        <div class="delete-box" @click="deleteQ(rank)" v-if="isHander">
          <img src="../../../assets/workDetail/delete.png" alt>
        </div>
      </div>

      <div class="flex-box question-box" v-if="questionType==3">
        <div class="question3 flex-box question4">
          <span class="flex-box">
            <img src="../../../assets/workDetail/question.png" alt>
          </span>
          <div class="video-box">
            <myVideo :theUrl="theUrl"></myVideo>
          </div>
        </div>
        <div class="delete-box" @click="deleteQ(rank)" v-if="isHander">
          <img src="../../../assets/workDetail/delete.png" alt>
        </div>
      </div>
    </div>
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
  </div>
</template>

<script>
import progressbar from "./progressbar";
import questionPlay from "@/assets/workDetail/questionPlay.png";
import questionStop from "@/assets/workDetail/questionStop.png";
import answerPlay from "@/assets/workDetail/answerPlay.png";
import answerStop from "@/assets/workDetail/answerStop.png";
import sound from "@/assets/workDetail/sound.png";
// import {videoPlayer} from 'vue-video-player';
import myVideo from "./video.vue";

function realFormatSecond(second) {
  var secondType = typeof second;
  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);
    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;
    return (
      hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0:00:00";
  }
}
export default {
  components: {
    progressbar,
    myVideo
  },
  props: {
    questionType: {},
    theUrl: {
      type: String
    },
    rank: {},
    isPaint: {},
    isHander: {}
  },
  data() {
    return {
      isPlay: false,
      inputTxt: "",
      url: this.theUrl || "../../../../static/music.mp3",
      audio: {
        currentTime: 0,
        totalTime: 0,
        playing: false,
        waiting: true,
        preload: "auto",
        sound: sound,
        barwidth: 0,
        playImg: ""
      },
      controlList: {
        // 不显示进度条
        noProcess: false,
        // 只能播放一个
        onlyOnePlaying: false
      }
    };
  },
  created() {
    this.inputTxt = this.theUrl;
    // this.playerOptions.sources
  },
  methods: {
    deleteQ(index) {
      this.$parent.fQuestionList.splice(index, 1);
    },
    getInputTxt(rank) {
      // console.log(this.$parent.fQuestionList)
      // console.log(rank)
      this.$parent.fQuestionList[rank].value = this.inputTxt;
    },
    setControlList() {
      const controlList = this.theControlList.split(" ");
      controlList.forEach(item => {
        if (this.controlList[item] !== undefined) {
          this.controlList[item] = true;
        }
      });
    },
    // 播放
    startPlay() {
      this.isPlay = true;
      this.$refs.audio.play();
    },
    // 暂停
    pausePlay() {
      this.isPlay = false;
      this.$refs.audio.pause();
    },
    // 当音频暂停
    onPause() {
      this.currentImg = this.audio.playImg[0];
      this.audio.playing = false;
    },
    // 当发生错误, 就出现loading状态
    onError() {
      this.audio.waiting = true;
    },
    //结束
    onEnded() {
      this.currentImg = this.audio.playImg[0];
    },
    // 当音频开始播放
    onPlay(res) {
      this.audio.playing = true;
      this.audio.loading = false;
      if (!this.controlList.onlyOnePlaying) {
        return;
      }
      const target = res.target;
      const audios = document.getElementsByTagName("audio");
      [...audios].forEach(item => {
        if (item !== target) {
          item.pause();
        }
      });
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime;
      this.currentTime = res.target.currentTime;
      this.audio.barwidth = parseInt(
        (this.audio.currentTime / this.audio.totalTime) * 100
      );
      if (this.audio.barwidth > 100) {
        this.audio.barwidth = 100;
      }
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    onLoadedmetadata(res) {
      this.audio.waiting = false;
      this.audio.totalTime = parseInt(res.target.duration);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";
.questionList {
  .question-box {
    margin-top: 20px;
    align-items: center;
    .delete-box {
      cursor: pointer;
      margin-left: 22px;
    }
  }
  .question1 {
    width: 692px;
    min-height: 79px;
    background-color: #fff200;
    box-shadow: 0px 6px 0px 0px #ffc900;
    border-radius: 8px;
    align-items: center;
    > span {
      align-self:stretch;
      align-items: center;
      justify-content: center;
      width: 37px;
      height: inherit;
      background-color: #ffa100;
      box-shadow: inset 0px 1px 13px 0px rgba(255, 0, 0, 0.16);
      margin: 8px 8px;
      
    }
    .input {
      width: 630px;
      min-height: 62px;
      background-color: #ffffff;
      box-shadow: inset 7px 7px 9px 0px rgba(255, 147, 0, 0.26),
        inset 7px 7px 0px 0px #ffd800;
        padding:  22px 8px 10px 14px;
      // textarea {
      //   display: inline-block;
      //   width: 469px;
      //   height: 27px;
      //   line-height: 27px;
      //   font-size: 14px;
      //   margin: 22px 0 0 14px;
      //   background-color: #f3f3f3;
      //   border: solid 1px #d9d9d9;
      //   // padding-left: 5px;
      // }
    }
  }
  .question2 {
    .main-container-box {
      width: 486px;
      height: 62px;
      background-color: #ffffff;
      box-shadow: inset 7px 7px 9px 0px rgba(255, 147, 0, 0.26),
        inset 7px 7px 0px 0px #ffd800;
      position: relative;
      z-index: 999;
      > .icon-box {
        margin: 21px 0 0 14px;
        align-items: center;
        justify-content: flex-start;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        span:nth-child(1) {
          width: 22px;
          height: 25px;
        }
        span:nth-child(2) {
          margin-left: 9px;
          font-size: 26px;
        }
      }
    }
    .playBtn {
      cursor: pointer;
      margin-left: 11px;
      width: 129px;
      height: 42px;
      background-image: linear-gradient(0deg, #ff6800 0%, #ff8d00 100%);
      box-shadow: 0px 6px 0px 0px #e04b00;
      border-radius: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      > span {
        font-size: 18px;
        color: #ffffff;
        margin-right: 8px;
      }
    }
    .playBtn:active {
      box-shadow: none;
    }
  }
  .question3 {
    width: 692px;
    background-color: #fff200;
    box-shadow: 0px 6px 0px 0px #ffc900;
    border-radius: 8px;
    justify-content: flex-start;
    padding: 8px;
    height: 100%;

    > span {
      justify-content: center;
      align-items: flex-start;
      width: 37px;
      height: 475px;
      background-color: #ffa100;
      box-shadow: inset 0px 1px 13px 0px rgba(255, 0, 0, 0.16);
      padding-top: 18px;
    }
    .img-box {
      width: 631px;
      box-sizing: border-box;
      height: 475px;
      padding: 7px 0 0 7px;
      background: #ffd800;
      margin-left: 8px;
      overflow: hidden;
      img {
        height: 475px;
        width: 631px;
        object-fit: cover;
      }
    }
  }
  .question4 {
    > span {
      width: 37px;
      height: 356px;
    }
    .video-box {
      width: 631px;
      box-sizing: border-box;
      height: 356px;
      padding: 7px 0 0 7px;
      background: #ffd800;
      margin-left: 8px;
      overflow: hidden;
      video {
        width: 627px;
        height: 353px;
        background: red;
      }
    }
  }
}
.progressbar {
  height: 62px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
}
.isPaint {
  width: 750px;
  // height:1080px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>