<template>
  <div class="replayCorrect">
    <div class="replayCorrect-header">
      <span>回复批注</span>
      <el-button type="primary" @click="submit" :disabled="disabled"
        >确定提交</el-button
      >
      <el-button type="danger" class="cancel" @click="cancel">取消</el-button>
    </div>
    <div class="list">
      <ul>
        <li v-for="(item, index) of listData" :key="item.contentValue">
          <replayAudio
            :theUrl="item.contentValue"
            :theControlList="item.controlList"
            :questionAudioType="true"
            class="replayAudio"
          />
          <img
            src="../../../../assets/workDetail/delete.png"
            @click="del(item, index)"
          />
        </li>
      </ul>
      <div class="replayCorrect-text">
        <div class="replayCorrect-text-box">
          <div class="replayCorrect-text-box-img">
            <img src="../../../../assets/replay/replayzi.png" alt="" />
          </div>
          <div class="replayCorrect-text-box-inner">
            <img src="../../../../assets/workDetail/sound.png" alt="" />
            <span>{{ count }} {{ `”` }}</span>
          </div>
          <div class="replayCorrect-text-box-inner-btn" @click="chagePlayStat">
            <img
              src="../../../../assets/replay/yellowMicro.png"
              alt=""
              v-if="!recordStat"
            />
            <img src="../../../../assets/replay/yellowStop.png" alt="" v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/utils/auth"; // 验权
import replayAudio from "./components/replayAudio";
import questionRecord from "./components/record";
import Record from "./common/record-sdk";
import { response, addQaResponse, upload } from "@/api/teachers.js";
import { closeTagView } from "@/utils/index";

import { mapGetters } from "vuex";

export default {
  components: {
    replayAudio,
    questionRecord
  },
  data() {
    return {
      listData: [],
      recorder: new Record(),
      recordStat: false,
      count: 0,
      timer: null,
      disabled: false
    };
  },
  computed: {
    ...mapGetters(["userId", "qaType", "readStat"])
  },
  methods: {
    async responseContent(obj) {
      const result = await response(obj);
    },

    //新增批注，当前页的时候调用
    async postAddQaResponse() {
      const ruserId = sessionStorage.getItem("qaRuserId");
      const lessSecCid = sessionStorage.getItem("qaLessSecCid");
      const type = 1;
      const sourceType = 1;
      const lessSecId = sessionStorage.getItem("qaLessSecId");
      const ruserLessid = sessionStorage.getItem("qaRuserLessid");
      const serialNum = sessionStorage.getItem("serialNum");
      const obj = {
        ruserId,
        lessSecCid,
        userId: this.userId,
        type,
        sourceType,
        lessSecId,
        ruserLessid,
        serialNum
      };
      const result = await addQaResponse(obj);
      this.postResponse(result.data.data.id);
    },

    //提交提问批注内容回复
    async postResponse(qaId) {
      let obj;
      if (sessionStorage.getItem("isCurrentPage") == 1) {
        obj = {
          qaId,
          contents: this.listData,
          userId: this.userId
        };
      } else {
        const qaContentId = sessionStorage.getItem("qaLessSecCid");
        const qaId = sessionStorage.getItem("qaId");
        obj = {
          qaId,
          qaContentId,
          contents: this.listData,
          userId: this.userId
        };
      }
      const result = await response(obj);
      this.disabled = true;
      if (result) {
        this.loading = false;
        this.$message({
          message: "恭喜你，提交批注成功",
          type: "success"
        });
      }
      const id = sessionStorage.getItem("correctId");
      const ruserId = sessionStorage.getItem("correctRuserId");
      const lessonId = sessionStorage.getItem("correctLessonId");
      const courseId = sessionStorage.getItem("correctCourseId");
      const qaSwiperId = sessionStorage.getItem("qaSwiperId");
      const tabsStatus = sessionStorage.getItem("tabsStatus");
      const qaType = sessionStorage.getItem("qaType");
      const readStat = sessionStorage.getItem("readStat");
      const qaFlag = sessionStorage.getItem("qaFlag");
      let that = this;
      const query = {
        path: "./currentPage",
        query: {
          id,
          ruserId,
          lessonId,
          courseId,
          qaSwiperId,
          tabsStatus,
          qaType,
          readStat,
          qaFlag
        }
      };
      /**
       * @description: 关闭标签，跳转
       */
      closeTagView(
        {
          name: "回复批注语音",
          path: "/detail/correctRecord",
          title: "回复批注语音"
        },
        that,
        query
      );
    },
    cancel() {
      const id = sessionStorage.getItem("correctId");
      const ruserId = sessionStorage.getItem("correctRuserId");
      const lessonId = sessionStorage.getItem("correctLessonId");
      const courseId = sessionStorage.getItem("correctCourseId");
      const qaSwiperId = sessionStorage.getItem("qaSwiperId");
      const tabsStatus = sessionStorage.getItem("tabsStatus");
      const qaType = sessionStorage.getItem("qaType");
      const readStat = sessionStorage.getItem("readStat");
      const qaFlag = sessionStorage.getItem("qaFlag");
      let that = this;
      const query = {
        path: "./currentPage",
        query: {
          id,
          ruserId,
          lessonId,
          courseId,
          qaSwiperId,
          tabsStatus,
          qaType,
          readStat,
          qaFlag
        }
      };
      closeTagView(
        {
          name: "回复批注语音",
          path: "/detail/correctRecord",
          title: "回复批注语音"
        },
        that,
        query
      );
    },

    /**
     * @description: 提交：禁用提交按钮，拿到数据之后放开
     */
    submit() {
      this.disabled = true;
      if (!this.listData.length) {
        this.$message({
          message: "当前没有可以提交的内容",
          type: "warning"
        });
        this.disabled = false;
        return;
      } else {
      }
      //当前页
      if (sessionStorage.getItem("isCurrentPage") == 1) {
        this.postAddQaResponse();
      } else {
        this.postResponse();
      }
    },

    //计时
    coutTime() {
      const TIME_COUNT = 0;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          this.count++;
        }, 1000);
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    //删除
    del(item, index) {
      this.listData.splice(index, 1);
    },
    //开始录音
    startRecord() {
      this.coutTime();
      this.recorder.startRecord({
        success: res => {
          // console.log("start record successfully.");
        },
        error: res => {
          // console.log("start record failed.");
        }
      });
    },
    //结束录音
    stopRecord() {
      clearInterval(this.timer);
      this.timer = null;
      this.count = 0;
      this.recorder.stopRecord({
        success: blob => {
          //此处可以获取音频源文件(res)，用于上传等操作
          const files = new File([blob], new Date().toISOString() + ".wav", {
            type: "audio/wav"
          });
          const formData = new FormData();
          formData.append("file", files);
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          config.headers["Authorization"] = "Bearer " + getToken();
          //文件上传
          axios.post("apps/file/upload", formData, config).then(async res => {
            const url = await `https://files.proudkids.cn${
              res.data.data.fileUrl
            }`;
            this.listData.push({
              contentValue: url,
              filesType: 10,
              controlList: "onlyOnePlaying"
            });
          });
        },
        error: res => {
          // console.log("stop record failed.");
        }
      });
    },
    //改变播放状态
    chagePlayStat() {
      this.recordStat = !this.recordStat;
      const stat = this.recordStat;
      if (!stat) {
        this.stopRecord();
      } else {
        this.startRecord();
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../common.scss";

.replayCorrect {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fff;

  .replayCorrect-header {
    margin: 10px 15px 0 15px;
    line-height: 66px;
    height: 66px;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 1px #dcdfe6;
    padding-left: 20px;
    padding-right: 18px;

    span {
      font-family: MicrosoftYaHeiUI-Bold;
      font-size: 20px;
      color: #666666;
    }

    .el-button {
      float: right;
      margin-top: 16px;
    }

    .cancel {
      margin-right: 10px;
    }
  }

  .list {
    margin: 10px 15px 0 15px;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 1px #dcdfe6;

    ul {
      padding-left: 18px;
      padding-top: 21px;
      min-height: 500px;

      li {
        width: 720px;
        position: relative;

        img {
          position: absolute;
          top: 50%;
          margin-top: -6px;
          right: 0;
          cursor: pointer;
        }
      }
    }

    .replayAudio {
      margin-bottom: 20px;
    }

    .replayCorrect-text {
      background-color: #f9fafc;
      border-radius: 0 0 4px 4px;
      border: solid 1px #dcdfe6;
      border-left: none;
      border-right: none;
      padding-left: 18px;
      padding-top: 16px;
      padding-bottom: 25px;
      display: flex;
      align-items: center;

      .replayCorrect-text-box {
        width: 693px;
        height: 79px;
        background-color: #fff200;
        box-shadow: 0px 6px 0px 0px #ffc900;
        border-radius: 8px;
        display: flex;
        align-items: center;

        .replayCorrect-text-box-img {
          width: 33px;
          height: 62px;
          background-color: #ffa100;
          box-shadow: inset 0px 1px 13px 0px rgba(255, 0, 0, 0.16);
          margin: 0 5px 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .replayCorrect-text-box-inner {
          width: 555px;
          height: 63px;
          background-color: #ffffff;
          box-shadow: inset 7px 7px 9px 0px rgba(255, 147, 0, 0.26),
            inset 7px 7px 0px 0px #ffd800;
          display: flex;
          align-items: center;
          padding-left: 19px;
          padding-top: 5px;

          img {
            width: 22px;
            height: 25px;
            margin-right: 9px;
          }

          span {
            font-family: SFUIDisplay-Regular;
            font-size: 26px;
            color: #444444;
          }
        }

        .replayCorrect-text-box-inner-btn {
          width: 63px;
          height: 61px;
          line-height: 61px;
          background-image: linear-gradient(0deg, #ff6800 0%, #ff8d00 100%);
          box-shadow: 0px 3px 0px 0px #e04b00;
          border-radius: 52px;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 18px;
          color: #ffffff;
          cursor: pointer;
          margin-left: 13px;
        }
      }
    }
  }
}
</style>
