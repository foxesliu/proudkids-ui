<template>
  <div class="workDetail">
    <workHeader></workHeader>
    <!--额外机会-->
    <div class="extra-class">
      <el-button type="primary" class="addBtn" @click="addExtraTime">增加一次练习机会</el-button>
      <el-table
        :data="extraData"
        border
        :header-cell-style="{
          background: '#f9fafc',
          fontWeight: 'normal',
          color: '#c1c5cd',
          height: '66px'
        }"
      >
        <el-table-column property="courseName" label="课程" align="center"></el-table-column>
        <el-table-column property="lessonName" label="课节" align="center"></el-table-column>
        <el-table-column property="extraTime" label="额外练习机会" align="center"></el-table-column>
      </el-table>
    </div>
    <!--本节学生-->
    <div class="studentData">
      <p>本节学生数据:</p>
      <el-table
        :data="detailData"
        border
        :header-cell-style="{
          background: '#f9fafc',
          fontWeight: 'normal',
          color: '#c1c5cd',
          height: '52'
        }"
      >
        <el-table-column property="rstartTime" label="开始作答时间" align="center"></el-table-column>
        <el-table-column property="rendTime" label="完成作答时间" align="center"></el-table-column>
        <el-table-column property="answerTime" label="答题用时" align="center"></el-table-column>
        <el-table-column property="finishPercent" label="作业完成率" align="center"></el-table-column>
        <el-table-column property="rightPercent" label="答题正确率" align="center"></el-table-column>
        <el-table-column property="ruserScore" label="奖杯数" align="center"></el-table-column>
      </el-table>
    </div>
    <!--本节老师-->
    <div class="teacherData">
      <p>本节老师数据:</p>
      <el-table
        :data="detailData"
        border
        :header-cell-style="{
          background: '#f9fafc',
          fontWeight: 'normal',
          color: '#c1c5cd',
          height: '52'
        }"
      >
        <el-table-column label="本节状态" align="center">
          <template slot-scope="scope">
            <div>
              <span
                style="display: inline-block;margin-right: 26px;font-size: 14px;color: #606266;"
                v-if="mode == 0"
              >{{ scope.row.stat | lessonStatusFilter }}</span>
              <span
                style="display: inline-block;margin-right: 26px;font-size: 14px;color: #606266;"
                v-if="mode == 1"
              >{{ scope.row.stat | hwStatStatus }}</span>
              <el-button
                v-if="scope.row.stat == 2 || scope.row.stat == 1"
                type="primary"
                @click="startWorking"
              >开始批改</el-button>
              <el-button v-else type="success" @click="enter">进入</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="ustartTime" label="开始批改时间" align="center"></el-table-column>
        <el-table-column property="uendTime" label="批改结束时间" align="center"></el-table-column>
        <el-table-column property="correctTime" label="批改用时" align="center"></el-table-column>
        <el-table-column property="correctPercent" label="批改率" align="center"></el-table-column>
        <el-table-column label align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-download"
              @click="handleScreen"
              v-if="stat == 4"
            >生成报告</el-button>
            <el-button class="disabled" disabled v-else icon="el-icon-download">生成报告</el-button>
            <!--<a :href="imgSrc" download="">-->
            <!--<img :src='imgSrc' class="img-circle" width="35px" style=""/>-->
            <!--</a>-->
          </template>
        </el-table-column>
      </el-table>
      <!--老师批改等操作按钮-->
      <ul class="teacherOperate">
        <li class="send-button">
          <el-button v-if="stat == 1 || stat == 2" class="disabled" disabled>发送批改报告</el-button>
          <el-button type="primary" @click="sendReport" v-else>发送批改报告</el-button>
        </li>
        <li class="send-time" @click="changeCorrectIcon" style="cursor: pointer">
          <span class="pr20">发送时间</span>
          <span>{{ time.correctRecentTime }}</span>
          <el-popover placement="bottom" width="300" trigger="manual" v-model="time.correctPop">
            <div
              style="line-height:40px;height: 300px;overflow-y: scroll"
              class="teacherOperate-detailTime"
            >
              <p v-if="!time.correctTimeList.length">暂无数据</p>
              <p v-for="(item, index) in time.correctTimeList" :key="index">
                <span>第{{ index + 1 }}次发送：</span>
                <span>{{ item.datatime }}</span>
              </p>
            </div>
            <span slot="reference">
              <i class="el-icon-caret-bottom icon-color" v-if="time.correctIconBottom"></i>
              <i class="el-icon-caret-top icon-color" v-else></i>
            </span>
          </el-popover>
        </li>
        <li class="send-button">
          <el-button v-if="stat == 2 || stat == 1" class="disabled" disabled>发送批注回复</el-button>
          <el-button type="primary" @click="sendResponseNotice" v-else>发送批注回复</el-button>
        </li>
        <li class="send-time" @click="changePostilIcon" style="cursor: pointer">
          <span class="pr20">发送时间</span>
          <span>{{ time.postilRecentTime }}</span>
          <el-popover placement="bottom" width="300" trigger="manual" v-model="time.postilPop">
            <div
              style="line-height:40px;height: 300px;overflow-y: scroll"
              class="teacherOperate-detailTime"
            >
              <p v-if="!time.postilTimeList.length">暂无数据</p>
              <p v-for="(item, index) in time.postilTimeList" :key="index">
                <span>第{{ index + 1 }}次发送：</span>
                <span>{{ item.datatime }}</span>
              </p>
            </div>
            <span slot="reference">
              <i class="el-icon-caret-bottom icon-color" v-if="time.postilIconBottom"></i>
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
    </div>

    <div class="studentData">
      <p>本节分享数据:</p>
      <div class="table">
        <ul class="clearfix">
          <li>点开人数</li>
          <li>点开次数</li>
          <li @click="support">
            点赞人数
            <el-popover placement="bottom" width="500" trigger="manual" v-model="supportPop">
              <div
                style="line-height:40px;height: 300px;overflow-y: scroll"
                class="teacherOperate-detailTime"
              >
                <el-table :data="supportList" style="width: 100%">
                  <el-table-column prop="datatime" label="点赞时间" align="center" width="180"></el-table-column>
                  <el-table-column label="点赞人微信昵称" align="center">
                    <template slot-scope="scope">
                      {{
                      JSON.parse(scope.row.sourceJson).nickName
                      }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <span slot="reference">
                <i class="el-icon-caret-bottom icon-color" v-if="supportFlag"></i>
                <i class="el-icon-caret-top icon-color" v-else></i>
              </span>
            </el-popover>
          </li>
          <li @click="signUp">
            通过该页面注册的人数
            <el-popover placement="bottom" width="600" trigger="manual" v-model="signUpPop">
              <div
                style="line-height:40px;height: 300px;overflow-y: scroll"
                class="teacherOperate-detailTime"
              >
                <el-table :data="signUpList" style="width: 100%">
                  <el-table-column prop="createTime" label="参与时间" width="180"></el-table-column>
                  <el-table-column prop="phone" label="参与人手机号"></el-table-column>
                  <el-table-column prop="name" label="中文名称"></el-table-column>
                  <el-table-column prop="enName" label="英文名称"></el-table-column>
                </el-table>
              </div>
              <span slot="reference">
                <i class="el-icon-caret-bottom icon-color" v-if="signUpFlag"></i>
                <i class="el-icon-caret-top icon-color" v-else></i>
              </span>
            </el-popover>
          </li>
        </ul>
        <ul class="clearfix">
          <li>{{ detailData[0] && detailData[0].visitNum }}</li>
          <li>{{ detailData[0] && detailData[0].visitTimes }}</li>
          <li>{{ detailData[0] && detailData[0].supportNum }}</li>
          <li>{{ detailData[0] && detailData[0].signUpNum }}</li>
        </ul>
      </div>
    </div>

    <div class="evaluate">
      <p>写评价:</p>
      <div class="evaluate-cont clearfix">
        <div class="evaluate-cont-header clearfix">
          <el-button type="primary" @click="evaluateTemplate">
            评价模板
            <i class="el-icon-caret-bottom" v-if="!evaluateTemplatePop"></i>
            <i class="el-icon-caret-top" v-else></i>
          </el-button>

          <el-button class="fr mt10 mr10" type="primary" @click="modifyEvaluate">确认修改</el-button>
          <el-popover
            placement="bottom"
            width="1200"
            trigger="manual"
            v-model="evaluateTemplatePop"
          >
            <div style="height: 200px;overflow-y: scroll" class="evaluateTemplatePop">
              <p v-if="!evaluateListData.length">暂无数据</p>
              <p
                v-for="(item, index) in evaluateListData"
                class="clearfix evaluteItem"
                :key="index"
                @click="getCurrentEvaluateTemplate(item)"
              >
                <span class="fl">模板{{ index + 1 }}</span>
                <span class="fl">{{ item.content }}</span>
              </p>
            </div>
          </el-popover>
        </div>
        <div class="evaluate-cont-text">
          <el-input
            class="textarea"
            type="textarea"
            resize="none"
            v-model="textarea"
            :rows="8"
            placeholder="请在这里输入评价"
          ></el-input>
        </div>
        <div class="evaluate-cont-tip">
          <span class="fr">字数限制：93字</span>
        </div>
      </div>
    </div>

    <div class="pic">
      <div class="tit mb10">
        <span>生成报告附带的优秀截图:</span>
        <div class="btn">
          <el-button type="primary" class="mr10" @click="handUpload">添加到素材库</el-button>
          <el-button type="primary" class="mr10" @click="addLibrary">素材库选择</el-button>
        </div>
      </div>
      <div class="pic-container">
        <div class="img">
          <viewer class="view">
            <img :src="screenshots" alt />
          </viewer>
        </div>
      </div>
    </div>

    <div class="position-box" v-if="selectFodder">
      <div class="img-box">
        <img src="../../../../assets/workDetail/positionQuit.png" alt @click="isselectFodder" />
        <materiaLib ref="materiaLib"></materiaLib>
      </div>
    </div>
    <div class="box" style="position: absolute;z-index:-100;left:0;top: 0;opacity: 0;">
      <!--<div class="box">-->
      <!--有评价canvas-->
      <div
        ref="screenBox"
        class="screenBox"
        v-if="screenShotData.evaluate"
        :class="reportPic == true ? 'long' : ''"
      >
        <p class="lessonName">{{ screenShotData.lessonName }}</p>
        <p class="className">{{ screenShotData.courseName }}</p>
        <p
          class="preview"
          :class="screenShotData.mode == 1 ? 'study' : 'preview'"
        >{{ screenShotData.mode | modeFilter }}</p>
        <div class="student">
          <span class="student-name">
            {{
            screenShotData.ruserVo && screenShotData.ruserVo.name
            }}
          </span>
          <img alt class="data-pic studentPic" crossorigin="anonymous" />
          <span class="hour">{{ screenShotData.hours }}</span>
          <span class="minute">{{ screenShotData.minutes }}</span>
          <span class="second">{{ screenShotData.seconds }}</span>
          <span class="rightNum">{{ screenShotData.rightPercent }}</span>
          <span class="sectionNum">{{ screenShotData.ruserScore }}个奖杯</span>
        </div>

        <div class="teacher">
          <img :src="avatar" alt class="teacher-pic" />
          <span class="teacher-name">{{ name }}</span>
          <p class="evaluate" ref="evaluate">{{ screenShotData.evaluate }}</p>
        </div>

        <div class="screenshot">
          <span class="screenshot-name">
            {{
            screenShotData.ruserVo && screenShotData.ruserVo.name
            }}
          </span>
          <img
            alt
            :src="
              screenShotData.screenshots &&
                JSON.parse(screenShotData.screenshots).url
            "
            class="screenshot-answer"
          />
          <img src="../../../../assets/screenshot/award.png" class="screenshot-award" />
        </div>

        <div class="qrcode">
          <img :src="qrImg" alt />
        </div>
      </div>
      <!--没有评价canvas-->
      <div
        ref="screenBox"
        class="noEvaluateBox"
        v-else
        :class="reportPic == true ? 'noEvaluateLong' : ''"
      >
        <p class="lessonName">{{ screenShotData.lessonName }}</p>
        <p class="className">{{ screenShotData.courseName }}</p>
        <p
          class="preview"
          :class="screenShotData.mode == 1 ? 'study' : 'preview'"
        >{{ screenShotData.mode | modeFilter }}</p>
        <div class="student">
          <span class="student-name">
            {{
            screenShotData.ruserVo && screenShotData.ruserVo.name
            }}
          </span>
          <img alt class="data-pic studentPic" crossorigin="anonymous" />
          <span class="hour">{{ screenShotData.hours }}</span>
          <span class="minute">{{ screenShotData.minutes }}</span>
          <span class="second">{{ screenShotData.seconds }}</span>
          <span class="rightNum">{{ screenShotData.rightPercent }}</span>
          <span class="sectionNum">{{ screenShotData.ruserScore }}个奖杯</span>
        </div>

        <!--<div class="teacher">-->
        <!--<img :src="avatar" alt="" class="teacher-pic">-->
        <!--<span class="teacher-name">{{name}}</span>-->
        <!--<p class="evaluate">-->
        <!--{{screenShotData.evaluate}}-->
        <!--</p>-->
        <!--</div>-->

        <div class="screenshot">
          <span class="screenshot-name">
            {{
            screenShotData.ruserVo && screenShotData.ruserVo.name
            }}
          </span>
          <img
            alt
            :src="
              screenShotData.screenshots &&
                JSON.parse(screenShotData.screenshots).url
            "
            class="screenshot-answer"
          />
          <img src="../../../../assets/screenshot/award.png" class="screenshot-award" />
        </div>

        <div class="qrcode">
          <img :src="qrImg" alt />
        </div>
      </div>
    </div>

    <div v-if="isUpLoad" class="position-box">
      <div class="img-box">
        <img src="../../../../assets/workDetail/positionQuit.png" alt @click="handUpload" />
        <Upload></Upload>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth"; // 验权
import { formatDuring, getWorkDate } from "@/utils/index";
import materiaLib from "./components/materialLibrart";
import Upload from "./components/upLoad";
import workHeader from "../ruserClassInfo/component/name";
import { mapGetters } from "vuex";
import html2canvas from "html2canvas";
import {
  modifyStudentInfo,
  extraTime,
  ruserStatistics,
  evaluateTemplate,
  modifyRuserLessonStat,
  correctNotice,
  responseNotice,
  historyList,
  teacherQaCount,
  code,
  registRusers
} from "@/api/teachers.js";

export default {
  components: {
    workHeader,
    materiaLib,
    Upload
  },
  data() {
    return {
      qrImg: "",
      mode: "",
      imgSrc: "",
      isUpLoad: false,
      screenShotData: {},
      //点赞
      supportFlag: true,
      supportPop: false,
      supportList: [],
      //访问
      signUpFlag: true,
      signUpPop: false,
      signUpList: [],
      screenshots: "", //优秀截屏图
      reportPic: "",
      extraCount: 0,
      selectFodder: false,
      search: "",
      textarea: "",
      stat: "", //判断是否可以点击批改报告以及批注回复
      lessonName: "",
      time: {
        correctRecentTime: "",
        correctPop: false,
        correctTimeList: [],
        correctIconBottom: true,

        postilRecentTime: "",
        postilPop: false,
        postilIconBottom: true,
        postilTimeList: []
      },
      teacherQaCount: {
        noteCount: "",
        questionCount: ""
      },
      evaluateTemplatePop: false,
      extraData: [], //额外数据
      detailData: [],
      evaluateListData: [],
      detailTimeData: [{ date: "2018-9-1" }, { date: "2018-9-1" }],
      correctTime: "",
      replyTime: "",
      classTableData: [],
      lessonStatus: 0,
      lesssonButtonStatus: 0,
      reportIconStatus: true
    };
  },
  computed: {
    ...mapGetters(["userId", "avatar", "name", "avatar"])
  },
  created() {
    const { id } = this.$route.query;
    // this.mode = mode
    this.getRuserStatistics(id);
    this.getEvaluateTemplateList();
    this.getTeacherQaCount();
    this.getTimeList();
  },
  methods: {
    handUpload() {
      if (this.isUpLoad) {
        this.isUpLoad = false;
      } else {
        this.isUpLoad = true;
      }
    },
    /**
     * @description 评价内容过多显示省略号
     * @description screenShotData.evaluate 评价内容
     */
    ellipsis() {
      const s = this.screenShotData.evaluate;
      if (!s) {
        return;
      }

      const evaluate = this.$refs.evaluate;
      if (!evaluate) {
        return;
      }
      const n = evaluate.offsetHeight;
      for (let i = 0; i < s.length; i++) {
        evaluate.innerHTML = s.substr(0, i);
        if (n < evaluate.scrollHeight) {
          evaluate.style.overflow = "hidden";
          evaluate.innerHTML = s.substr(0, i - 3) + "...";
          break;
        }
      }
    },

    /**
     * @description 生成报告获取二维码
     */
    handleScreen() {
      this.getCode();
    },

    /**
     * @description 生成二维码图片
     * @param {Number} cid: 渠道id
     * @param {String} scene: 场景值传参  ruserId,id,cid
     * @param {String} page: 跳转小程序页面
     * @param {Number} prlId: 作业id或预习id
     * @param {Number} ruserId: 学生id
     */
    // pages/share/share?ruserId=294096&prlId=252&cid=122693
    async getCode() {
      const { ruserId, id } = this.$route.query;
      const result = await code({
        scene: `${ruserId},${id},122922`,
        // page: "pages/share/share"
        page: "subpackages/pages/index"
      });
      this.qrImg = "data:image/png;base64," + result.data.data;
      if (result) {
        var opts = {
          tainttest: true, //检测每张图片都已经加载完成
          logging: false, //日志开关，发布的时候记得改成false
          useCORS: true
        };
        window.pageYOffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        setTimeout(() => {
          html2canvas(this.$refs.screenBox, opts).then(canvas => {
            var context = canvas.getContext("2d");
            // 关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.webkitImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            this.imgSrc = canvas.toDataURL("image/png"); // 生成Base64码
            this.download(this.imgSrc);
          });
        }, 500);
      }
    },

    /**
     * @description 下载图片
     * @description mode：0预习报告 1作业报告
     */
    download(data) {
      let imgData = data; //填写你的base64
      let reportName;
      this.screenShotData.mode == 0
        ? (reportName = "预习报告")
        : (reportName = "作业报告");
      console.log(reportName);
      this.downloadFile(
        `${this.screenShotData.ruserVo.name}${reportName}${this.lessonName}`,
        imgData
      );
    },
    /**
     * @description 下载
     */
    downloadFile(fileName, content) {
      let aLink = document.createElement("a");
      let blob = this.base64ToBlob(content); //new Blob([content]);
      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);
      aLink.click();
    },
    /**
     * @description base64转blob
     */
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
    /**
     * @description 显示点赞数据
     */
    support() {
      this.supportPop = !this.supportPop;
      this.supportFlag = !this.supportFlag;
    },
    /**
     * @description 显示注册访问数据
     */
    signUp() {
      this.signUpPop = !this.signUpPop;
      this.signUpFlag = !this.signUpFlag;
    },
    /**
     * @description 素材库选择
     */
    addLibrary() {
      this.selectFodder = true;
    },
    isselectFodder() {
      this.selectFodder = false;
    },
    /**
     * @description 获取当前页老师发送批注，提问数量
     */
    async getTeacherQaCount() {
      const result = await teacherQaCount(this.$route.query.id);
      const { questionCount, noteCount } = result.data;
      this.teacherQaCount.questionCount = questionCount;
      this.teacherQaCount.noteCount = noteCount;
    },
    /**
     * @param {Number} action: 3点赞 4参与 6批改 7批注
     */
    async getTimeList() {
      //批改
      const config1 = {
        action: 6
      };
      const result1 = await historyList(this.$route.query.id, config1);
      this.time.correctTimeList = result1.data;
      if (result1.data[result1.data.length - 1]) {
        this.time.correctRecentTime =
          result1.data[result1.data.length - 1].datatime;
      }
      //批注
      const config2 = {
        action: 7
      };
      const result2 = await historyList(this.$route.query.id, config2);
      this.time.postilTimeList = result2.data;
      if (result2.data[result2.data.length - 1]) {
        this.time.postilRecentTime =
          result2.data[result2.data.length - 1].datatime;
      }
      //点赞
      const config3 = {
        action: 3
      };
      const result3 = await historyList(this.$route.query.id, config3);
      this.supportList = result3.data;
      //参与
      const obj = {
        ruserId: this.$route.query.ruserId,
        params: this.$route.query.id
      };
      const result4 = await registRusers(obj);
      this.signUpList = result4.data;
    },

    /**
     * @description 获取评价模板列表数据
     */
    async getEvaluateTemplateList() {
      const obj = { userId: this.userId };
      const result = await evaluateTemplate(obj);
      this.evaluateListData = result.data;
    },

    /**
     * @description 获取学生数据&&老师数据
     * @description ruserCount学生答题数
     * @description sectionCount总数
     * @description correctCount批改数
     * @description ruserRightCount 学生答题正确数
     * @description correctTime 批改用时
     * @description answerTime答题用时
     */
    async getRuserStatistics(id) {
      const result = await ruserStatistics(id);
      //rstartTime开始作答时间
      const {
        ruserCount,
        ruserRightCount,
        correctCount,
        sectionCount,
        rstartTime,
        ustartTime,
        rendTime,
        uendTime,
        screenshots,
        extraCount,
        stat,
        evaluate,
        mode,
        courseName,
        answerCount,
        qustionCount,
        lessonName
      } = result.data;
      this.mode = mode;
      this.stat = stat;
      this.lessonName = lessonName;
      this.textarea = evaluate;
      this.extraCount = extraCount;
      this.extraData = [{ courseName, lessonName, extraTime: this.extraCount }];
      //答题时间
      const answerTime =
        new Date(rendTime).getTime() - new Date(rstartTime).getTime();
      //批改时间
      const correctTime =
        new Date(uendTime).getTime() - new Date(ustartTime).getTime();
      result.data.answerTime =
        rendTime == null ? "--------" : formatDuring(answerTime);
      result.data.correctTime =
        uendTime == null ? "--------" : formatDuring(correctTime);
      result.data.rightPercent =
        sectionCount == 0
          ? 0
          : ((100 * ruserRightCount) / sectionCount).toFixed(1) + "%";
      //答题完成率
      if (answerCount > qustionCount) {
        result.data.finishPercent = "100%";
      } else if (answerCount == 0) {
        result.data.finishPercent = 0;
      } else {
        result.data.finishPercent =
          ((100 * answerCount) / sectionCount).toFixed(1) + "%";
      }
      result.data.correctPercent =
        sectionCount == 0
          ? 0
          : ((100 * correctCount) / sectionCount).toFixed(1) + "%";
      result.data.rendTime == null
        ? (result.data.rendTime = "--------")
        : (result.data.rendTime = rendTime);
      result.data.uendTime == null
        ? (result.data.uendTime = "--------")
        : (result.data.uendTime = uendTime);
      result.data.ustartTime == null
        ? (result.data.ustartTime = "--------")
        : (result.data.ustartTime = ustartTime);
      this.detailData = [result.data];
      this.screenShotData = result.data;
      if (this.screenShotData.ruserVo.pic) {
        document.getElementsByClassName(
          "studentPic"
        )[0].src = this.screenShotData.ruserVo.pic;
      }

      this.screenShotData.correctPercent =
        sectionCount == 0
          ? 0
          : ((100 * correctCount) / sectionCount).toFixed(1) + "%";
      if (JSON.parse(screenshots)) {
        this.screenshots = JSON.parse(screenshots).url;
      }
      this.screenShotData.answerTime =
        rendTime == null ? "--------" : formatDuring(answerTime);

      if (this.screenShotData.answerTime == "--------") {
        this.screenShotData.minutes = "---";
        this.screenShotData.seconds = "---";
        this.screenShotData.hours = "---";
      } else {
        const arr = this.screenShotData.answerTime
          .replace("小时", "/")
          .replace("天", "/")
          .replace("分钟", "/")
          .replace("秒", "/")
          .split("/");
        this.screenShotData.minutes = arr[2];
        this.screenShotData.hours = arr[1];
        this.screenShotData.seconds = arr[3];
      }

      this.ellipsis();
    },

    /**
     * @description 增加额外练习机会
     */
    async getExtraTime() {
      const { ruserId, lessonId, id } = this.$route.query;
      const mode = this.mode;
      let creator = JSON.stringify({
        nickName: this.name,
        avatarUrl: this.avatar
      });
      const result = await extraTime({
        ruserId,
        lessonId,
        mode,
        creator
      });
      this.getRuserStatistics(id);
      if (result.data.code == 0) {
        this.$message({
          message: "恭喜你，成功增加练习机会",
          type: "success"
        });
      }
    },

    /**
     * @description 学生信息修改
     */
    async getModifyStudentInfo(data) {
      const result = await modifyStudentInfo(data);
      const { id } = this.$route.query;

      if (result) {
        this.getRuserStatistics(id);
        this.lessonStatus = 1;
        // this.textarea = ''
        this.$message({
          message: "修改成功",
          type: "success"
        });
      }
    },

    /**
     * @description 发送批改报告
     */
    async postCorrectNotice(data) {
      const result = await correctNotice(data);
      this.getRuserStatistics(data.ruserLessonId);
      this.getTimeList();
      this.$message({
        message: "发送报告成功",
        type: "success"
      });
    },

    /**
     * @description 发送批注
     */
    async postResponseNotice(data) {
      const result = await responseNotice(data);
      this.getTimeList();
      this.$message({
        message: "发送批注回复成功",
        type: "success"
      });
    },

    /**
     * @description 批注时间icon展开收缩
     */
    changePostilIcon() {
      this.time.postilIconBottom = !this.time.postilIconBottom;
      this.time.postilPop = !this.time.postilPop;
    },
    /**
     * @description 批改时间icon展开收缩
     */
    changeCorrectIcon() {
      this.time.correctIconBottom = !this.time.correctIconBottom;
      this.time.correctPop = !this.time.correctPop;
    },

    modifyEvaluate() {
      const { id } = this.$route.query;
      const config = {
        id,
        evaluate: this.textarea
      };
      this.getModifyStudentInfo(config);
    },
    evaluateTemplate() {
      this.evaluateTemplatePop = !this.evaluateTemplatePop;
    },
    getCurrentEvaluateTemplate(item) {
      this.textarea = item.content;
      this.evaluateTemplatePop = false;
    },

    /**
     * @description 增加额外练习机会
     */
    addExtraTime() {
      this.getExtraTime();
    },

    /**
     * @description 修改学生状态
     */
    async putModifyRuserLessonStat(data) {
      const result = await modifyRuserLessonStat(data);
      const id = this.$route.query.id;
      if (result) {
        this.getRuserStatistics(id);
        // this.$router.push({
        //   path: '/detail/currentPage',
        //   query: {id: this.$route.query.id, ruserId: this.$route.query.ruserId}
        // })
        this.$router.push({
          path: "/detail/currentPage",
          query: {
            id: this.$route.query.id,
            ruserId: this.$route.query.ruserId,
            lessonId: this.$route.query.lessonId,
            courseId: this.$route.query.courseId
          }
        });
      }
    },

    /**
     * @description 开始批改
     */
    startWorking() {
      // this.lesssonButtonStatus = 1
      const { id } = this.$route.query;
      const config = {
        ruserLessonId: id,
        stat: 3,
        userId: this.userId
      };
      this.putModifyRuserLessonStat(config);
    },
    /**
     * @description 进入
     */
    enter() {
      this.$router.push({
        path: "/detail/currentPage",
        query: {
          id: this.$route.query.id,
          ruserId: this.$route.query.ruserId,
          lessonId: this.$route.query.lessonId,
          courseId: this.$route.query.courseId
        }
      });
    },

    /**
     * @description 发送批改报告
     */
    async sendReport() {
      // this.lessonStatus = 2
      // this.lesssonButtonStatus = 1
      const { id } = this.$route.query;

      const result = await modifyRuserLessonStat({
        ruserLessonId: id,
        stat: 4,
        userId: this.userId
      });

      this.postCorrectNotice({
        ruserLessonId: id,
        userId: this.userId
      });

      this.correctTime = getWorkDate();
    },
    /**
     * @description 发送批注回复
     */
    sendResponseNotice() {
      const { id } = this.$route.query;
      this.postResponseNotice({
        ruserLessonId: id,
        userId: this.userId
      });
    },
    changeReportIconStatus() {
      this.reportIconStatus = !this.reportIconStatus;
    }
  },
  filters: {
    lessonStatusFilter(status) {
      const config = {
        1: "预习中",
        2: "已预习",
        3: "批改中",
        4: "已批改"
      };
      return config[status];
    },
    modeFilter(val) {
      const config = {
        0: "预习报告",
        1: "作业报告"
      };
      return config[val];
    },
    //做题状态
    hwStatStatus(status) {
      const config = {
        null: "未作答",
        undefined: "未作答",
        "0": "未作答",
        "1": "作答中",
        "2": "已作答",
        "3": "批改中",
        "4": "已批改"
      };
      return config[status];
    }
  }
};
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
@import "../common.scss";
@import "../../../../assets/font/font.css";

.workDetail {
  width: 100%;
  height: 100%;
  margin-bottom: 214px;
  box-sizing: border-box;
  background: #fff;

  .disabled,
  .disabled:hover {
    background-color: #cbcbcb;
    color: #ffffff;
  }

  .evaluateTemplatePop {
    .evaluteItem {
      width: 100%;
      margin-bottom: 15px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background: #f7f7f7;
      }

      span:first-child {
        background-color: #449cfc;
        border-radius: 4px;
        padding: 0 15px;
        color: #fff;
        margin-right: 14px;
      }

      span:last-child {
        width: 1000px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .pcont {
    color: yellow !important;
  }

  .icon-color {
    color: #449cfc;
  }

  .el-table {
    border-radius: 8px;
  }

  .extra-class {
    position: relative;
    margin: 10px 15px 0 15px;

    .addBtn {
      position: absolute;
      z-index: 100;
      width: 159px;
      height: 37px;
      right: 17px;
      top: 15px;
    }
  }

  .studentData,
  .teacherData,
  .evaluate,
  .pic {
    margin: 30px 15px 0 15px;

    p {
      height: 25px;
      font-family: MicrosoftYaHeiUI-Bold;
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      margin-bottom: 10px;
      color: #666666;
    }
  }

  .studentData {
    .table {
      border: solid 1px #dcdfe6;

      ul {
        color: #606266;

        li {
          float: left;
          width: 25%;
          line-height: 52px;
          border-right: solid 1px #dcdfe6;
          text-align: center;

          i {
            cursor: pointer;
          }
        }

        li:last-child {
          border-right: none;
        }
      }

      ul:nth-of-type(1) {
        background-color: #f9fafc;
        border-bottom: solid 1px #dcdfe6;
        color: #c1c5cd;
      }
    }
  }

  .teacherOperate {
    padding: 0;
    height: 52px;
    line-height: 52px;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 1px #dcdfe6;
    margin-top: 10px;
    display: flex;
    color: #c1c5cd;

    .send-button {
      padding: 0 18px 0 16px;
    }

    .number-button {
      width: 16.6%;
      text-align: center;
      margin: 0 auto;
    }

    li:last-child {
      border-left: solid 1px #dcdfe6;
    }

    .send-time {
      padding-left: 17px;
      width: 25%;
      border-left: solid 1px #dcdfe6;
      border-right: solid 1px #dcdfe6;

      span {
        display: inline-block;
      }
    }
  }

  .evaluate-cont {
    padding: 0 10px;
    background-color: #ffffff;
    box-shadow: 0px 2px 35px 0px rgba(88, 93, 107, 0.11);
    border-radius: 8px;
    border: solid 1px #dcdfe6;

    .evaluate-cont-header {
      height: 57px;
      line-height: 57px;
    }

    .confirmBtn {
      margin-top: 10px;
    }

    .evaluate-cont-tip {
      span {
        font-size: 14px;
        margin: 7px 19px 10px 0;
        color: #b5b6b8;
      }
    }

    .el-textarea__inner {
      border: none;
      font-size: 14px;
      color: #b5b6b8;
      background-color: #f2f2f2;
      border-radius: 8px;
    }

    .el-textarea__inner:focus {
      border: none;
    }
  }

  .pic {
    .tit {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .pic-container {
      box-sizing: border-box;
      width: 100%;
      min-height: 340px;
      background-color: #ffffff;
      border-radius: 8px;
      border: solid 1px #dcdfe6;

      .img {
        width: 541px;
        height: 340px;
        border-radius: 8px;
        background-color: #449cfc;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          object-fit: cover;
        }

        .del {
          width: 27px;
          height: 27px;
          text-align: center;
          line-height: 27px;
          background-color: rgba(0, 0, 0, 0.32);
          right: 0;
          top: 0;
          position: absolute;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
      }

      .view {
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .position-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 150px;
    align-items: center;

    .img-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        align-self: flex-end;
        margin-bottom: 10px;
        margin-right: 8px;
        cursor: pointer;
      }
    }
  }
}

.screenBox,
.noEvaluateBox {
  background: url("../../../../assets/screenshot/bg1.jpg");
  width: 750px;
  height: 2053px;
  padding-top: 0.1px;

  p {
    margin: 0;
    padding: 0;
  }

  .lessonName {
    font-family: PangMenZhengDao;
    font-size: 90px;
    letter-spacing: 0px;
    margin-top: 183px;
    padding-left: 40px;
    color: #56160e;
    height: 121px;
  }

  .className {
    font-family: SourceHanSansCN-Bold;
    font-size: 22.5px;
    line-height: 28px;
    letter-spacing: 0px;
    color: #8e461f;
    margin: 22px 0 14px 50px;
  }

  .preview {
    width: 180px;
    height: 59px;
    background-color: #74a022;
    border-radius: 10px;
    text-align: center;
    line-height: 59px;
    font-family: SourceHanSansCN-Bold;
    font-size: 38px;
    letter-spacing: 0px;
    color: #ffffff;
    margin-left: 36px;
  }

  .study {
    background-color: #f87019;
  }

  .student {
    position: relative;
    height: 181px;
    width: 710px;
    margin: 20px 0 0 20px;
    font-size: 28px;

    span {
      display: inline-block;
    }

    .student-name {
      position: absolute;
      left: 143px;
      top: 28px;
      text-align: center;
      height: 40px;
      font-family: SourceHanSansCN-Bold;
      font-size: 40px;
      line-height: 40px;
      color: #74a022;
    }

    .data-pic {
      width: 101px;
      height: 101px;
      position: absolute;
      left: 20px;
      top: 40px;
      border-radius: 100%;
      box-shadow: 0px 4px 8px 0px rgba(255, 133, 51, 0.3);
    }

    .hour {
      position: absolute;
      top: 80px;
      left: 200px;
      width: 69px;
      height: 39px;
      text-align: center;
      line-height: 39px;
    }

    .minute {
      position: absolute;
      top: 80px;
      left: 322px;
      width: 69px;
      height: 39px;
      text-align: center;
      line-height: 39px;
    }

    .second {
      position: absolute;
      top: 80px;
      left: 460px;
      width: 48px;
      height: 39px;
      text-align: center;
      line-height: 39px;
    }

    .rightNum {
      position: absolute;
      top: 123px;
      left: 236px;
      width: 89px;
      height: 37px;
      text-align: center;
      line-height: 37px;
    }

    .sectionNum {
      position: absolute;
      top: 123px;
      left: 546px;
      width: 133px;
      height: 37px;
      text-align: center;
      line-height: 37px;
    }
  }

  .teacher {
    margin: 18px 0 0 20px;
    width: 710px;
    height: 411px;
    position: relative;

    .teacher-pic {
      width: 92px;
      height: 92px;
      position: absolute;
      top: 20px;
      left: 17px;
    }

    .teacher-name {
      position: absolute;
      font-size: 28px;
      color: #7fa737;
      top: 40px;
      left: 171px;
      width: 241px;
      height: 26px;
      text-align: center;
      line-height: 26px;
    }

    .evaluate {
      position: absolute;
      top: 85px;
      left: 17px;
      padding: 16px 16px 12px 19px;
      width: 676px;
      height: 284px;
      overflow: scroll;
      font-family: SentyMARUKO;
      font-size: 30px;
      line-height: 44px;
      letter-spacing: -0.6px;
      color: #18011b;
    }
  }

  .screenshot {
    position: relative;
    width: 710px;
    height: 696px;
    margin: 17px 0 0 20px;

    .screenshot-name {
      position: absolute;
      top: 67px;
      left: 99px;
      font-family: SourceHanSansCN-Bold;
      font-size: 40px;
      color: #ffffff;
    }

    .screenshot-answer {
      position: absolute;
      top: 168px;
      left: 10px;
      width: 690px;
      height: 517px;
    }

    .screenshot-award {
      position: absolute;
      top: 169px;
      left: 431px;
      width: 299px;
      height: 217px;
    }
  }

  .qrcode {
    position: relative;
    width: 750px;
    height: 238px;
    margin-top: 35px;

    img {
      position: absolute;
      border-radius: 10px;
      top: 26px;
      left: 529px;
      width: 188px;
      height: 190px;
    }
  }
}

.noEvaluateBox {
  background: url("../../../../assets/screenshot/bg3.jpg");
  height: 1622px;
}

.long {
  height: 2762px;
  background: url("../../../../assets/screenshot/bg2.jpg");

  .screenshot {
    height: 1410px;

    .screenshot-answer {
      height: 1231px;
    }
  }
}

.noEvaluateLong {
  height: 2329px;
  background: url("../../../../assets/screenshot/bg4.jpg");

  .screenshot {
    height: 1410px;

    .screenshot-answer {
      height: 1231px;
    }
  }
}

.position-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 150px;
  align-items: center;

  .img-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      align-self: flex-end;
      margin-bottom: 10px;
      margin-right: 8px;
      cursor: pointer;
    }
  }
}
</style>


