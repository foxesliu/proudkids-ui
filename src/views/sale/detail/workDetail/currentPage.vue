<template>
  <div class="currentPage" v-loading="loading">
    <div class="header">
      <div class="header_btn">
        <el-button @click="back" type="primary" icon="el-icon-arrow-left">返回详情</el-button>
      </div>
      <ul>
        <li class="name-intro leftBorder">Chinese Name :</li>
        <li>{{ chName }}</li>
        <li class="name-intro">English Name :</li>
        <li class="rightBorder">{{ engName }}</li>
      </ul>
    </div>

    <ul class="teacherOperate">
      <li class="send-button">
        <el-button type="primary" @click="sendResponseNotice">发送批注回复</el-button>
      </li>
      <li class="send-time" @click="changeTimeIconStatus" style="cursor: pointer">
        <span class="pr20">发送时间</span>
        <span>{{ recentTime }}</span>
        <el-popover placement="bottom" width="300" trigger="manual" v-model="time.timeVisible">
          <div
            style="line-height:40px;height: 300px;overflow-y: scroll"
            class="teacherOperate-detailTime"
          >
            <p v-if="time.timeData.length == 0">暂无数据</p>
            <p v-for="(item, index) in time.timeData" :key="index">
              <span>第{{ index + 1 }}次发送：</span>
              <span>{{ item.datatime }}</span>
            </p>
          </div>
          <span slot="reference">
            <i class="el-icon-caret-bottom icon-color" v-if="time.iconBottom"></i>
            <i class="el-icon-caret-top icon-color" v-else></i>
          </span>
        </el-popover>
      </li>
      <li class="number-button">
        <el-button type="danger">({{ teacherQaCount.noteCount }})批注</el-button>
      </li>
      <li class="number-button">
        <el-button type="danger">({{ teacherQaCount.questionCount }})提问</el-button>
      </li>
    </ul>

    <swiper
      :swiperList="swiperList"
      @getCurrentSwiperQuestion="getCurrentSwiperQuestion"
      :swiperIndex="swiperIndex"
    ></swiper>

    <div class="choose-question-type">
      <div class="num">
        <span>{{ currentQuestion.currentQuestionNumber }}</span>
        <span>
          <i>/</i>
          {{ totalLength }}
        </span>
      </div>
      <div class="type">
        <span>题型：</span>
        <span>
          {{
          currentQuestion.currentQuestionType | swiperTypeFilter
          }}
        </span>
      </div>
      <div class="choose">
        <span>正误：</span>
        <div class="selected">
          <div
            class="select-choose"
            :class="{ 'select-expand': errorStat, 'select-packUp': !errorStat }"
            style="cursor: pointer"
            @click="expand"
          >
            <img :src="imgSrc" alt />
            <span>{{ !selectedItem ? "待选择" : selectedItem }}</span>
            <i class="el-icon-caret-bottom fr blue bottom-icon"></i>
            <i class="el-icon-caret-top fr blue top-icon"></i>
          </div>

          <ul class="select" :class="{ 'ulSelect-hide': !errorStat }">
            <transition-group name="list" tag="p">
              <li v-for="item in options" @click="getSelected(item)" v-bind:key="item.cont">
                <img :src="item.imgUrl" alt />
                <span>{{ item.cont }}</span>
              </li>
            </transition-group>
          </ul>
        </div>
      </div>
      <div class="award">
        <!-- 两种star -->
        <!-- <star @getScore="getScore"></star> -->

        <!-- <div>
          <template v-if="awardNums.confirmBtnShow != null">
            <star :canStar="false" :score="awardNums.score"></star>
            <el-button type="primary award-btn award-btn-disabled" disabled
              >确定</el-button
            >
          </template>

          <template v-else>
            <star
              :canStar="true"
              @getScore="getScore"
              :score="awardNums.score"
            ></star>
            <el-button type="primary award-btn" @click="scoreConfirm"
              >确定</el-button
            >
          </template>
        </div>-->

        <!-- 已经评价过的星星 -->
        <span>奖励：</span>
        <!--按钮状态-->
        <template v-if="awardNums.confirmBtnShow != null">
          <trophy :event="false" :score="awardNums.score"></trophy>
          <el-button type="primary award-btn award-btn-disabled" disabled>确定</el-button>
        </template>

        <!-- 还没有评价的星星 -->
        <template v-else>
          <trophy :event="true" :score="awardNums.score" @getScore="getScore"></trophy>
          <el-button type="primary award-btn" @click="scoreConfirm">确定</el-button>
        </template>
      </div>
    </div>
    <subjectTabs
      :listData="currentList"
      :qaCount="qaCount"
      @click="changePhRuserLessonQaList"
      :swiperType="currentQuestion.currentQuestionType"
    ></subjectTabs>

    <div>
      <!--<TypeButton type="question" @click="answer">点击播放 <i class="el-icon-caret-right"></i></TypeButton>-->
      <!--<TypeButton type="answer" @click="answer">点击播放 <i class="el-icon-caret-right"></i></TypeButton>-->
      <!--<div class="questionItem">-->
      <!--<audio src=""></audio>-->
      <!--<div class="play" @click="play" v-if="!playStat">点击播放<i class="el-icon-caret-right play-icon"></i></div>-->
      <!--<div class="stop" v-else @click="stop"><img :src="questionStopImg" alt=""></div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import dialogBar from "./components/dialog.vue";
import subjectTabs from "./components/currentTabs.vue";
// import name from '../ruserClassInfo/component/name'
import right from "@/assets/workDetail/right.png";
import wrong from "@/assets/workDetail/wrong.png";

import halfRight from "@/assets/workDetail/halfRight.png";
import noanswer from "@/assets/workDetail/noanswer.png";

import question from "@/assets/workDetail/question.png";
import questionStop from "@/assets/workDetail/questionStop.png";

import swiper from "./components/swiper";

import TypeButton from "./components/TypeButton.vue";
import BaseButton from "./components/BaseButton.vue";
import trophy from "./components/trophy";
import star from "./components/star";

import {
  qaCount,
  historyList,
  responseNotice,
  ruserLessonSectionList,
  ruserLessonCorrect,
  ruserLessonScore,
  currentRuserLessonList,
  teacherQaCount,
  phRuserLessonQaList
} from "@/api/teachers.js";
import { mapGetters } from "vuex";

export default {
  components: {
    // name,
    dialogBar,
    TypeButton,
    BaseButton,
    trophy,
    swiper,
    subjectTabs,
    star
  },
  data() {
    return {
      chName: "",
      engName: "",
      time: {
        timeVisible: false,
        iconBottom: true,
        timeData: []
      },
      recentTime: "",
      teacherQaCount: {
        noteCount: "",
        questionCount: ""
      },

      errorStat: false, //展开状态
      editStat: true, //编辑icon状态
      options: [
        { cont: "恭喜你，全做对了呢！", imgUrl: right, type: 1 },
        { cont: "做的非常棒呢！", imgUrl: right, type: 1 },
        { cont: "全对了，继续努力！", imgUrl: right, type: 1 },
        { cont: "非常好，比上次有进步！", imgUrl: right, type: 1 },
        { cont: "为什么没有答完毕呢？", imgUrl: halfRight, type: 2 },
        { cont: "有一点点粗心哦~", imgUrl: halfRight, type: 2 },
        { cont: "想想哪里做错了呢？", imgUrl: halfRight, type: 2 },
        { cont: "还差一点点就能全对了！", imgUrl: halfRight, type: 2 },
        { cont: "为什么没有作答呢？", imgUrl: wrong, type: 0 },
        { cont: "这个题你粗心了呢~", imgUrl: wrong, type: 0 },
        { cont: "看清楚题目要求哦~", imgUrl: wrong, type: 0 },
        { cont: "这道题你可以作对的~", imgUrl: wrong, type: 0 },
        { cont: "重点词汇掌握不到位噢~", imgUrl: wrong, type: 0 },
        { cont: "重点句型还没有掌握熟练呀~", imgUrl: wrong, type: 0 },
        { cont: "这道题是不应该出错的~", imgUrl: wrong, type: 0 },
        { cont: "又是因为马虎犯的错~", imgUrl: wrong, type: 0 },
        { cont: "相同的错误再次出现~", imgUrl: wrong, type: 0 },
        { cont: "认真审题再做题！", imgUrl: wrong, type: 0 },
        { cont: "与其乱做，不如不做~", imgUrl: wrong, type: 0 }
      ],

      questionImg: question,

      questionStopImg: questionStop,

      // sendVal: false,
      // playStat: false,
      //swiper数据
      swiperList: [],
      totalLength: 0,
      currentQuestion: {
        currentQuestionNumber: 1,
        currentQuestionType: 1
      },
      imgSrc: noanswer, //select图片地址
      selectedItem: "", //select选中项
      awardNums: {
        confirmBtnShow: true,
        score: ""
      },
      ruserSectionId: "",
      swiperId: "",
      currentList: [],
      qaCount: {
        stuReadCount: 0,
        stuUnReadCount: 0,
        teacherReadCount: 0,
        teacherUnReadCount: 0
      },
      swiperIndex: "",
      loading: false
    };
  },
  computed: {
    ...mapGetters(["userId", "qaType", "readStat", "swiperItem"])
  },
  created() {
    //获取批注提问数量
    this.getTeacherQaCount();
    //获取发送时间列表
    this.getTimeList();

    var {
      id,
      ruserId,
      lessonId,
      courseId,
      lessSecId,
      qaSwiperId,
      tabsStatus
    } = this.$route.query;

    /**
     * @description: 1.消息中心跳转，通过lessSecId判断是否是消息中心跳转
     * @description: 2.回复中心跳转，通过qaSwiperId判断是否是回复页面跳转过来
     * @description: 3.kpi/作业详情跳转（正常跳转）
     * @description: tabsStatus判断是否是当前页
     */

    if (qaSwiperId) {
      //回复页面跳转过来
      let flag;
      // tabsStatus ：0 当前页
      // tabsStatus：undefined 当前页

      tabsStatus == 0 || tabsStatus == undefined
        ? (flag = true)
        : (flag = false);
      this.ruserLessonSectionList(true, qaSwiperId, flag);
    } else {
      //非回复页面
      this.$store.commit("SET_QATYPE", 2);
      this.$store.commit("SET_READSTAT", 2);
      if (!lessSecId) {
        this.ruserLessonSectionList(true); //默认请求
      } else {
        this.ruserLessonSectionList(true, lessSecId); //消息跳转请求
      }
    }

    this.chName =
      sessionStorage.getItem("chName") == "null"
        ? "--------"
        : sessionStorage.getItem("chName");
    this.engName =
      sessionStorage.getItem("engName") == "null"
        ? "--------"
        : sessionStorage.getItem("engName");

    sessionStorage.setItem("correctId", id);
    sessionStorage.setItem("correctRuserId", ruserId);
    sessionStorage.setItem("correctLessonId", lessonId);
    sessionStorage.setItem("correctCourseId", courseId);
    sessionStorage.setItem("qaRuserLessid", this.$route.query.id);
  },
  methods: {
    /**
     * @description  跳转至详情页
     */
    back() {
      this.$router.push({
        path: "/detail/workDetail",
        query: {
          id: this.$route.query.id,
          ruserId: this.$route.query.ruserId,
          lessonId: this.$route.query.lessonId,
          courseId: this.$route.query.courseId
        }
      });
    },

    /**
     * @description  获取时间列表数据
     */
    async getTimeList() {
      const config = {
        action: 7
      };
      const result = await historyList(this.$route.query.id, config);
      this.time.timeData = result.data;
      if (result.data[result.data.length - 1]) {
        this.recentTime = result.data[result.data.length - 1].datatime;
      }
    },

    /**
     * @description  发送批注回复
     * @description  ruserLessonId 作业id或者预习id
     */
    async sendResponseNotice() {
      const obj = {
        userId: this.userId,
        ruserLessonId: this.$route.query.id
      };
      const result = await responseNotice(obj);
      if (result.data.msg == "success") {
        this.$message({
          message: "发送批注回复成功",
          type: "success"
        });
        this.getTimeList();
      } else {
        this.$message({
          message: "发送批注回复失败",
          type: "error"
        });
      }
    },

    /**
     * @description  点击发送时间显示或者隐藏
     */
    changeTimeIconStatus() {
      this.time.iconBottom = !this.time.iconBottom;
      this.time.timeVisible = !this.time.timeVisible;
    },

    /**
     * @description  获取当前页老师发送批注，提问数量
     */
    async getTeacherQaCount() {
      const result = await teacherQaCount(this.$route.query.id);
      const { questionCount, noteCount } = result.data;
      this.teacherQaCount.questionCount = questionCount;
      this.teacherQaCount.noteCount = noteCount;
    },

    /**
     * @description  swiper相关
     * @description  获取swiper列表数据并对数据处理
     * @param {Boolean} isGetCurrentData: 是否获取当前页数据
     */

    async ruserLessonSectionList(
      flag,
      lessSecId = "",
      isGetCurrentData = true
    ) {
      const result = await ruserLessonSectionList(this.$route.query.id);
      const config = {
        0: wrong,
        1: right,
        2: halfRight,
        null: noanswer,
        "": noanswer,
        undefined: noanswer
      };
      this.swiperList = await result.data;
      this.totalLength = this.swiperList.length;
      //设置正误下拉选择的图片
      this.swiperList.forEach(item => {
        if (!item.ret) {
          return (item.img = noanswer);
        }
        item.img = config[JSON.parse(item.ret).type];
      });
      //判断是否存在
      let isExist = this.swiperList.find(item => {
        return item.id == lessSecId;
      });
      // if (flag) {
      if (!lessSecId || !isExist) {
        //非消息中心跳转swiperList[0]初始化题型显示
        var { type, ret, score, ruserSectionId, id } = this.swiperList[0];
        this.$store.dispatch("SETSWIPERITEM", this.swiperList[0]);
      } else {
        //消息中心跳转过来
        const arr = this.swiperList.filter(item => {
          return item.id == lessSecId;
        });

        //获取提问批注的index
        this.currentQuestion.currentQuestionNumber =
          this.swiperList.findIndex(v => {
            return v.id == lessSecId;
          }) + 1;

        this.swiperIndex = this.swiperList.findIndex(item => {
          return item.id == lessSecId;
        });

        var { type, ret, score, ruserSectionId, id } = arr[0];
        this.$store.dispatch("SETSWIPERITEM", arr[0]);
      }
      //题型
      this.currentQuestion.currentQuestionType = type;

      this.swiperId = id;
      this.ruserSectionId = ruserSectionId;
      if (ret) {
        const { type, content } = JSON.parse(ret);
        this.selectedItem = content;
        this.imgSrc = config[type];
      }
      this.awardNums.score = score;
      this.awardNums.confirmBtnShow = score;
      //当前页详细数据
      if (isGetCurrentData) {
        this.getCurrentRuserLessonList();
      }
      //获取老师的批注以及学生的批注数量
      this.getQaCount();
      // }
    },

    /**
     * @description  获取当前问题相关数据信息
     */
    getCurrentSwiperQuestion(data) {
      const {
        serialNum,
        type,
        content,
        imgType,
        score,
        ruserSectionId,
        id,
        serialIndex
      } = data;
      this.$store.dispatch("SETSWIPERITEM", data);

      this.swiperId = id;
      this.serialNum = serialNum;
      this.ruserSectionId = ruserSectionId;

      this.getQaCount();
      //qaType:2 readStat:2当前页
      if (this.qaType == 2 && this.readStat == 2) {
        this.getCurrentRuserLessonList(); //当前页详细数据
      } else {
        const ruserLessonId = this.$route.query.id;
        const sectionId = this.swiperItem.id;
        const config = {
          ruserLessonId,
          readStat: this.readStat,
          qaType: this.qaType,
          sectionId
        };
        this.getPhRuserLessonQaList(config);
      }

      const config = {
        0: wrong,
        1: right,
        2: halfRight,
        null: noanswer,
        "": noanswer,
        undefined: noanswer
      };
      this.currentQuestion.currentQuestionNumber = serialIndex;
      this.currentQuestion.currentQuestionType = type;
      this.awardNums.score = score;
      this.awardNums.confirmBtnShow = score;
      this.selectedItem = content;
      this.imgSrc = config[imgType];
      this.errorStat = false;
    },

    /*
     * swiper结束
     * */
    /**
     * @description  重新设置奖杯数
     */
    getScore(data) {
      const { score } = data;
      this.awardNums.score = score;
    },

    async sendRuserLessonScore(obj) {
      const result = await ruserLessonScore(obj);
      // this.ruserLessonSectionList(true, this.swiperId)
      this.ruserLessonSectionList(true, this.swiperId, false);
    },

    /**
     * @description  奖杯确定
     */
    scoreConfirm() {
      if (!this.ruserSectionId) {
        this.$message({ type: "info", message: "该学生未答题,不能评分!" });
        return;
      }
      let score;
      this.awardNums.score == null
        ? (score = 0)
        : (score = this.awardNums.score);
      const obj = {
        userId: this.userId,
        ruserSectionId: this.ruserSectionId,
        score
      };
      this.sendRuserLessonScore(obj);
    },

    /**
     * @description  展开
     */
    expand() {
      this.errorStat = !this.errorStat;
    },

    /**
     * @description  学生答题正误批改
     */
    async sendRuserLessonCorrect(obj) {
      var {
        id,
        ruserId,
        lessonId,
        courseId,
        lessSecId,
        qaSwiperId,
        tabsStatus
      } = this.$route.query;
      /**
       * @description  通过lessSecId判断是否是消息中心跳转过来
       * @description  tabsStatus判断是否是当前页
       * @description  flag true 当前页 false不是当前页
       * @param {Number} qaSwiperId: 判断是否是回复跳转过来
       */

      if (!this.ruserSectionId) {
        this.$message({ type: "info", message: "该学生未答题,不能评价!" });
        return;
      }
      const result = await ruserLessonCorrect(obj);

      if (result) {
        this.$message({
          message: "恭喜你，批改成功",
          type: "success"
        });

        this.loading = false;

        const tabsStatus = sessionStorage.getItem("tabsStatus");
        let flag;
        tabsStatus == 0 || tabsStatus == undefined
          ? (flag = true)
          : (flag = false);
        this.ruserLessonSectionList(true, this.swiperId, flag); //消息跳转请求
      }
    },

    /**
     * @description  获取选中项
     */
    getSelected(item) {
      //ruserSectionId调试数据接口
      const { type, cont, imgUrl, score } = item;
      const obj = {
        ruserSectionId: this.ruserSectionId,
        userId: this.userId,
        retType: type,
        retContent: cont
      };
      this.selectedItem = cont;
      this.imgSrc = imgUrl;
      this.editStat = false;
      this.errorStat = false;
      this.loading = true;
      this.sendRuserLessonCorrect(obj);
    },

    /**
     * @description  获取当前页不同批注，提问数量
     */
    async getQaCount() {
      const result = await qaCount(this.$route.query.id, this.swiperId);
      const {
        stuReadCount,
        stuUnReadCount,
        teacherReadCount,
        teacherUnReadCount
      } = result.data;
      this.qaCount.stuReadCount = stuReadCount;
      this.qaCount.stuUnReadCount = stuUnReadCount;
      this.qaCount.teacherReadCount = teacherReadCount;
      this.qaCount.teacherUnReadCount = teacherUnReadCount;
    },

    /**
     * @description  获取当前页列表
     */
    async getCurrentRuserLessonList(obj) {
      // ruserLessId, sectionId
      const result = await currentRuserLessonList(
        this.$route.query.id,
        this.swiperId
      );
      result.data.forEach(item => {
        if (item.qaSerialNum == null) {
          item.qaSerialNum = 0;
        }
      });
      this.currentList = result.data;
    },

    /**
     * @description  获取老师的批注学生的提问列表
     */
    async getPhRuserLessonQaList(parmas) {
      const result = await phRuserLessonQaList(parmas);
      result.data.forEach(item => {
        item.rankDate = new Date(item.createTime).getTime();
        item.flag = false;
      });

      this.currentList = result.data.sort((a, b) => {
        return b.rankDate - a.rankDate;
      });
    },
    changePhRuserLessonQaList(readStat, qaType) {
      //当前页数据
      if (readStat == 2 && qaType == 2) {
        this.getCurrentRuserLessonList();
        return;
      }
      const ruserLessonId = this.$route.query.id;
      const sectionId = this.swiperId || this.$route.query.qaSwiperId;
      const config = {
        ruserLessonId,
        readStat,
        qaType,
        sectionId
      };
      this.getPhRuserLessonQaList(config);
    }
  },
  filters: {
    //   TEXT (0,"文本题"),
    //   IMAGE (1,"图片题"),
    //   AUDIO(2,"音频题"),
    //   VIDEO(3,"视频题"),
    //   EVALUATION(4,"评测内容"),
    //   ANSWER_IMAGE(5,"图片作答"),
    //   ANSWER_VIDEO(6,"视频作答"),
    //   ANSWER_AUDIO(7,"音频作答"),
    //   CONTENT_TEXT (8,"文本"),
    //   CONTENT_IMAGE (9,"图片"),
    //   CONTENT_AUDIO(10,"音频"),
    //   CONTENT_VIDEO(11,"视频");
    //   0文本题,1图片题,2音频题,3视频题,4评测内容,5图片作答,6视频作答,7音频作答 ,
    typeFilter(stat) {
      const config = {
        0: "文本题",
        1: "图片题",
        2: "音频题",
        3: "视频题",
        4: "评测内容",
        5: "图片作答",
        6: "视频作答",
        7: "音频作答"
      };
      return config[stat];
    },
    swiperTypeFilter(stat) {
      // -1:未设置类型,0:画图题,1:语音提,2:拍照题,3:视频题
      const config = {
        0: "画图题",
        1: "语音题",
        2: "拍照题",
        3: "视频题",
        "-1": "未设置类型"
      };
      return config[stat];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../common.scss";

* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
}

.currentPage {
  width: 100%;
  height: 100%;
  margin-bottom: 214px;
  box-sizing: border-box;
  background: #fff;

  .header {
    padding: 0;
    border: 1px solid #dcdfe6;
    color: #606266;
    font-size: 20px;
    height: 66px;
    display: flex;
    margin: 15px;
    border-radius: 8px;

    .header_btn {
      border-radius: 8px 0 0 8px;
      border-right: 1px solid #dcdfe6;
      padding: 0 17px;
      display: flex;
      align-items: center;
    }

    ul {
      width: 100%;
      display: flex;

      li {
        flex: 1;
        line-height: 66px;
        text-align: center;
      }
    }

    /*li:first-child {*/
    /*border-radius: 8px 0 0 8px;*/
    /*width: 142px;*/
    /*border-right: 1px solid #DCDFE6;*/
    /*}*/

    .name-intro {
      background: #f9fafc;
      color: #c1c5cd;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
    }

    .leftBorder {
      border-left: none;
    }
  }

  .teacherOperate {
    margin: 10px 15px 0 15px;
    height: 52px;
    line-height: 52px;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 1px #dcdfe6;
    display: flex;
    color: #c1c5cd;

    .send-button {
      padding: 0 18px 0 16px;
    }

    .number-button {
      padding: 0 97px;
    }

    li:last-child {
      border-left: solid 1px #dcdfe6;
    }

    .send-time {
      padding-left: 17px;
      width: 900px;
      border-left: solid 1px #dcdfe6;
      border-right: solid 1px #dcdfe6;

      span {
        display: inline-block;
      }
    }
  }

  .choose-question-type {
    margin: 10px 15px 0 15px;
    height: 66px;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 1px #dcdfe6;
    display: flex;

    .num {
      padding: 0 18px;
      line-height: 66px;
      border-radius: 8px 0 0 8px;
      background: #f9fafc;
      color: #666666;

      span:first-child {
        font-size: 36px;
      }

      span:nth-of-type(2) {
        font-size: 18px;

        i {
          font-size: 36px;
          color: #979797;
        }
      }
    }

    .type {
      line-height: 66px;
      padding: 0 65px 0 34px;
      font-size: 14px;
      border-left: solid 1px #dcdfe6;
      border-right: solid 1px #dcdfe6;

      span:first-child {
        color: #666666;
      }

      span:last-child {
        padding: 3px 8px;
        width: 59px;
        height: 24px;
        background-image: linear-gradient(125deg, #ffc800 0%, #f76b1c 100%);
        border-radius: 2px;
        color: #ffffff;
      }
    }

    .choose {
      padding: 0 73px 0 58px;
      display: flex;
      align-items: center;

      span {
        font-size: 14px;
        color: #666666;
      }

      .selected {
        position: relative;

        .select-choose {
          width: 235px;
          height: 32px;
          line-height: 32px;
          background-color: #ffffff;
          border-radius: 3px;
          border: solid 1px #dcdfe6;
          display: table-cell;
          vertical-align: middle;
          padding: 0 6px 0 6px;
          font-size: 14px;
          color: #c6c6c6;

          i {
            margin-top: 8px;
          }

          .blue {
            color: #449cfc;
          }
        }

        /*展开*/
        .select-expand {
          .bottom-icon {
            display: none;
          }
        }

        /*收缩*/
        .select-packUp {
          .top-icon {
            display: none;
          }
        }
      }

      .select {
        position: absolute;
        z-index: 100;
        width: 235px;
        height: 400px;
        overflow: scroll;
        background-color: #ffffff;
        box-shadow: 0px 2px 35px 0px rgba(88, 93, 107, 0.11);
        border-radius: 4px;
        border: solid 1px #dcdfe6;

        li {
          text-align: left;
          padding-left: 9px;
          line-height: 3;
          cursor: pointer;
        }

        li:hover {
          background: #f5f7fa;
        }
      }

      .ulSelect-hide {
        display: none;
        transition: all 1s ease;
      }
    }

    .award {
      padding: 0 29px 0 37px;
      border-left: solid 1px #dcdfe6;
      border-right: solid 1px #dcdfe6;
      display: flex;
      align-items: center;

      span:first-child {
        font-size: 14px;
        color: #666666;
      }

      .award-btn {
        margin-left: 32px;
        width: 91px;
        height: 37px;
        border-radius: 4px;
      }

      .award-btn-disabled {
        background: #cbcbcb;
      }

      .is-disabled {
        border: 1px solid #cbcbcb;
      }
    }
  }

  /*.questionItem {*/
  /*width: 693px;*/
  /*height: 85px;*/
  /*background-size: 693px 85px;*/
  /*background: url("./../../../../assets/workDetail/question.png") no-repeat center center;*/

  /*.play {*/
  /*float: right;*/
  /*margin: 19px 14px 0 0;*/
  /*width: 129px;*/
  /*height: 42px;*/
  /*text-align: center;*/
  /*line-height: 42px;*/
  /*background-image: linear-gradient(0deg,*/
  /*#ff6800 0%,*/
  /*#ff8d00 100%);*/
  /*border-radius: 35px;*/
  /*font-size: 18px;*/
  /*letter-spacing: 0.1px;*/
  /*color: #ffffff;*/
  /*cursor: pointer;*/

  /*.play-icon {*/
  /*width: 12px;*/
  /*height: 16px;*/
  /*color: #fff200;*/
  /*}*/
  /*}*/

  /*.stop {*/
  /*float: right;*/
  /*margin: 19px 14px 0 0;*/
  /*width: 129px;*/
  /*height: 42px;*/
  /*text-align: center;*/
  /*line-height: 42px;*/
  /*background-image: linear-gradient(0deg,*/
  /*#ff6800 0%,*/
  /*#ff8d00 100%);*/
  /*border-radius: 35px;*/
  /*cursor: pointer;*/
  /*!*img{*!*/
  /*!*width: 16px;*!*/
  /*!*height: 19px;*!*/
  /*!*background-color: #fff200;*!*/
  /*!*box-shadow: 0px 3px 0px 0px*!*/
  /*!*#ffb600;*!*/
  /*!*border-radius: 10px;*!*/
  /*!*}*!*/
  /*}*/
  /*}*/
}
</style>

