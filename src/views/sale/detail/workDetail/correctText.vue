<template>
  <div class="replayCorrect" v-loading="loading">
    <div class="replayCorrect-header">
      <span>回复批注</span>
      <el-button type="primary" @click="submit" :disabled="disabled"
        >确定提交</el-button
      >
      <el-button type="danger" class="cancel" @click="cancel">取消</el-button>
    </div>
    <div class="list">
      <ul>
        <li v-for="(item, index) in listData" :key="index">
          <replayText
            :questionTextType="false"
            class="replayText"
            :cont="item.contentValue"
          ></replayText>
          <img
            src="../../../../assets/workDetail/delete.png"
            @click="del(index)"
          />
        </li>
      </ul>
      <div class="box">
        <div class="replay">
          <div class="replay-text">
            <img src="../../../../assets/replay/replayzi.png" alt="" />
          </div>
          <div class="replay-inner">
            <el-input
              type="textarea"
              :rows="1"
              autosize
              placeholder="在这里输入文字"
              v-model="contentValue"
            >
            </el-input>
          </div>
          <div class="replay-btn" @click="send">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import replayText from "./components/replayText";
import { response, addQaResponse } from "@/api/teachers.js";
import { mapGetters } from "vuex";
import { closeTagView } from "@/utils/index";

export default {
  components: {
    replayText
  },
  data() {
    return {
      listData: [],
      arr: [],
      contentValue: "",
      loading: false,
      disabled: false
    };
  },
  methods: {
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
      this.loading = true;
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
          name: "回复批注文本",
          path: "/detail/correctText",
          title: "回复批注文本"
        },
        that,
        query
      );
    },
    //删除
    del(index) {
      this.listData.splice(index, 1);
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
          name: "回复批注文本",
          path: "/detail/correctText",
          title: "回复批注文本"
        },
        that,
        query
      );
    },
    //发送
    send() {
      // TEXT(0, "文本题"),
      //   IMAGE(1, "图片题"),
      //   AUDIO(2, "音频题"),
      //   VIDEO(3, "视频题"),
      //   EVALUATION(4, "评测内容"),
      //   ANSWER_IMAGE(5, "图片作答"),
      //   ANSWER_VIDEO(6, "视频作答"),
      //   ANSWER_AUDIO(7, "音频作答"),
      //   CONTENT_TEXT(8, "文本"),
      //   CONTENT_IMAGE(9, "图片"),
      //   CONTENT_AUDIO(10, "音频"),
      //   CONTENT_VIDEO(11, "视频");
      const type = sessionStorage.getItem("qaType");
      if (!this.contentValue) {
        this.$message({
          message: "请输入文字",
          type: "warning"
        });
        return;
      }
      this.listData.push({ contentValue: this.contentValue, filesType: 8 });
      this.contentValue = "";
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
      }
      //当前页
      if (sessionStorage.getItem("isCurrentPage") == 1) {
        this.postAddQaResponse();
      } else {
        this.postResponse();
      }
    }
  },
  computed: {
    ...mapGetters(["userId"])
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

    .replayText {
      margin-bottom: 20px;
    }
  }

  .box {
    padding: 16px 0 25px 18px;
    background-color: #f9fafc;
    border: solid 1px #dcdfe6;
    border-radius: 0 0 4px 4px;
    border-left: none;
    border-right: none;
    border-bottom: none;

    .replay {
      width: 693px;
      background-color: #fff200;
      box-shadow: 0px 6px 0px 0px #ffc900;
      border-radius: 8px;
      display: flex;
      padding: 8px 14px 8px 10px;

      .replay-text {
        width: 33px;
        background-color: #ffa100;
        box-shadow: inset 0px 1px 13px 0px rgba(255, 0, 0, 0.16);
        border-radius: 8px 0 0 8px;
        display: flex;
        justify-content: center;
        padding-top: 9px;

        img {
          width: 19px;
          height: 46px;
        }
      }

      .replay-inner {
        width: 555px;
        background-color: #ffffff;
        box-shadow: inset 7px 7px 9px 0px rgba(255, 147, 0, 0.26),
          inset 7px 7px 0px 0px #ffd800;
        margin: 0 13px 0 5px;
        padding: 24px 71px 15px 19px;

        .el-input {
        }
      }

      .replay-btn {
        width: 63px;
        height: 61px;
        background-image: linear-gradient(0deg, #ff6800 0%, #ff8d00 100%);
        box-shadow: 0px 3px 0px 0px #e04b00;
        border-radius: 52px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>
