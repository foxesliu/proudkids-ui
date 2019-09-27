<template>
  <div class="tabs" v-loading="listLoading">
    <div class="tabs-change">
      <div
        @click="handleChange(0)"
        :class="
          tabsStatus === 0
            ? 'active pull-left c-pointer'
            : 'pull-left c-pointer'
        "
      >
        待上课程（{{ classingLength }}）
      </div>
      <div
        @click="handleChange(1)"
        :class="
          tabsStatus === 1
            ? 'active pull-left c-pointer'
            : 'pull-left c-pointer'
        "
      >
        已上课程（{{ classedLength }}）
      </div>
      <div
        @click="handleChange(2)"
        v-if="this.chFlag"
        :class="
          tabsStatus === 2
            ? 'active pull-left c-pointer'
            : 'pull-left c-pointer'
        "
      >
        额外布置（{{ extraLength }}）
      </div>
    </div>
    <div class="table mt-20">
      <!--额外布置-->
      <el-table
        :data="otherData"
        border
        style="width: 100%"
        align="center"
        v-if="tabsStatus == 2"
        :header-cell-style="{ background: '#f9fafc' }"
      >
        <el-table-column
          prop="createTime"
          label="布置时间"
          align="center"
        ></el-table-column>
        <el-table-column label="布置人" align="center">
          <template slot-scope="scope">
            <!--{{JSON.parse(scope.row.creator)&&JSON.parse(scope.row.creator).nickName||'&#45;&#45;&#45;&#45;&#45;&#45;'}}-->
            {{ scope.row | creatorFilter }}
          </template>
        </el-table-column>
        <el-table-column label="Course" align="center">
          <template slot-scope="scope">{{
            scope.row.lessonName || "------"
          }}</template>
        </el-table-column>
        <el-table-column label="预习&&作业状态" align="center">
          <template slot-scope="scope">{{
            scope.row.stat | extraStatus
          }}</template>
        </el-table-column>
        <el-table-column label="预习&&作业" align="center">
          <template slot-scope="scope">
            <el-button
              class="disabled"
              v-if="scope.row.stat == 0 || scope.row.stat == null"
              disabled
            >
              查看
            </el-button>
            <router-link
              v-else
              :to="{
                path: '/detail/workDetail',
                query: {
                  id: scope.row.id,
                  stat: scope.row.stat,
                  ruserId: scope.row.ruserId,
                  lessonName: scope.row.lessonName,
                  courseName: scope.row.courseName,
                  courseId: scope.row.courseId,
                  lessonId: scope.row.lessonId,
                  mode: 1
                }
              }"
            >
              <el-button type="primary">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="预习&&作业 批注&&提问"
          align="center"
          min-width="100"
        >
          <template slot-scope="scope">{{ scope.row.qaCount }}</template>
        </el-table-column>
        <el-table-column label="预习&&作业更多数据" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              width="1571"
              trigger="manual"
              v-model="scope.row.extraVisible"
            >
              <el-table
                :data="detailData"
                border
                :header-cell-style="{ background: '#f9fafc' }"
                v-loading="listLoading"
              >
                <el-table-column
                  property="answerTime"
                  label="答题用时"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="finishPercent"
                  label="作业完成率"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="rightPercent"
                  label="作业正确率"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="ruserScore"
                  label="奖杯数量"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="correctTime"
                  label="批改用时"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="correctPercent"
                  label="批改率"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="visitNum"
                  label="点开人数"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="supportNum"
                  label="点赞人数"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  property="signUpNum"
                  label="通过该页面点击参与的人"
                  align="center"
                >
                </el-table-column>
              </el-table>

              <el-button
                slot="reference"
                type="primary"
                icon="el-icon-caret-bottom"
                @click="extraExpanded(scope.row)"
                v-if="typeof scope.row.id == 'number'"
                >展开
              </el-button>

              <el-button
                slot="reference"
                type="primary"
                icon="el-icon-caret-top"
                @click="extraPackUp(scope.row)"
                v-if="typeof scope.row.id != 'number'"
              >
                收起
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div v-else>
        <el-table
          :data="listData"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#f9fafc' }"
        >
          <el-table-column
            prop="lessonName"
            align="center"
            label="Course"
          ></el-table-column>
          <el-table-column label="Date" align="center">
            <template slot-scope="scope">{{
              scope.row.originTime | timeFilter
            }}</template>
          </el-table-column>
          <el-table-column label="SS Attendance" align="center">
            <template slot-scope="scope">
              <span v-if="tabsStatus === 0">---------</span>
              <span v-else>{{ scope.row.ruserStatus | ruserStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否评价" align="center" v-if="this.chFlag">
            <template slot-scope="scope">
              <span v-if="tabsStatus === 0">---------</span>
              <div v-else>
                <span v-if="scope.row.evaluateId">已评价</span>
                <span v-else>未评价</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="SS Progress" align="center" min-width="130">
            <template slot-scope="scope">
              <template v-if="tabsStatus === 0">
                ---------
              </template>
              <template v-else slot-scope="scope">
                <!--当前中教角色 查看评价 修改评价-->
                <!--中教 roleId 20 21 22-->
                <!--修改评价-->
                <!-- <template v-if="this.chFlag">userId -->
                <!-- 当前老师 -->
                <template v-if="userId == scope.row.tutorUserId">
                  <router-link
                    :to="{
                      path: '/teachers/editEvaluation',
                      query: {
                        lessonId: scope.row.lessonId,
                        originTime: scope.row.originTime,
                        lessonName: scope.row.lessonName,
                        courseName: scope.row.courseName,
                        phone: $route.query.phone,
                        id: scope.row.id
                      }
                    }"
                    v-if="scope.row.evaluateId"
                  >
                    <el-button type="primary" class="evaluate">Check</el-button>
                  </router-link>
                  <!--去评价-->
                  <router-link
                    :to="{
                      path: '/teachers/evaluation',
                      query: {
                        lessonId: scope.row.lessonId,
                        originTime: scope.row.originTime,
                        lessonName: scope.row.lessonName,
                        courseName: scope.row.courseName,
                        phone: $route.query.phone,
                        id: scope.row.id
                      }
                    }"
                    v-else
                  >
                    <el-button type="primary" class="evaluate">Go</el-button>
                  </router-link>
                </template>
                <template v-else>
                  <!--查看评价-->
                  <router-link
                    :to="{
                      path: 'evaluation',
                      query: {
                        lessonId: scope.row.lessonId,
                        originTime: scope.row.originTime,
                        lessonName: scope.row.lessonName,
                        courseName: scope.row.courseName,
                        phone: $route.query.phone,
                        id: scope.row.id
                      }
                    }"
                    v-if="scope.row.evaluateId"
                  >
                    <el-button type="primary" class="evaluate"
                      >Evaluation</el-button
                    >
                  </router-link>
                  <!--未评价-->
                  <el-button class="disabled evaluate" disabled v-else
                    >No Evaluation</el-button
                  >
                </template>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="Link" align="center" min-width="100">
            <template slot-scope="scope">
              <a :href="scope.row.monitorAddr" target="_blank">
                <el-button type="primary">查看</el-button>
              </a>
            </template>
          </el-table-column>
          <el-table-column label="预习状态" align="center" v-if="this.chFlag">
            <template slot-scope="scope">
              <!--lessonHs预习1上线-->
              <span v-if="scope.row.lessonPs == 1">{{
                scope.row.extendInfo.pvStat | pvStatStatus
              }}</span>
              <span v-else>不可预习</span>
            </template>
          </el-table-column>

          <el-table-column
            label="预习"
            align="center"
            min-width="100"
            v-if="this.chFlag"
          >
            <template slot-scope="scope">
              <!--lessonHs预习1上线-->
              <!--<el-button type="success" v-if="scope.row.extendInfo.pvStat==1">查看</el-button>-->
              <!--<el-button class="disabled" v-else disabled>查看</el-button>-->
              <!--test 有数据干掉-->
              <!--<router-link-->
              <!--:to="{path:'/detail/workDetail',query:{id:scope.row.extendInfo.pvId,stat:scope.row.stat,ruserId:scope.row.ruserId,lessonName:scope.row.lessonName,courseName:scope.row.courseName,courseId:scope.row.courseId,lessonId:scope.row.lessonId,mode:0} }"-->
              <!--&gt;-->
              <!--<el-button type="primary">查看</el-button>-->
              <!--</router-link>-->
              <el-button
                class="disabled"
                v-if="
                  scope.row.extendInfo.pvStat == 0 ||
                    scope.row.extendInfo.pvStat == null
                "
                disabled
              >
                查看
              </el-button>
              <router-link
                v-else
                :to="{
                  path: '/detail/workDetail',
                  query: {
                    id: scope.row.extendInfo.pvId,
                    stat: scope.row.stat,
                    ruserId: scope.row.ruserId,
                    lessonName: scope.row.lessonName,
                    courseName: scope.row.courseName,
                    courseId: scope.row.courseId,
                    lessonId: scope.row.lessonId,
                    mode: 0
                  }
                }"
              >
                <el-button type="primary">查看</el-button>
              </router-link>
            </template>
          </el-table-column>

          <el-table-column
            label="预习批注&&提问"
            align="center"
            min-width="100"
            v-if="this.chFlag"
          >
            <template slot-scope="scope">
              <el-button type="danger" v-if="scope.row.extendInfo.pvQaCount"
                >{{ scope.row.extendInfo.pvQaCount }}
              </el-button>
              <span v-else>-------</span>
            </template>
          </el-table-column>

          <el-table-column
            label="预习更多数据"
            align="center"
            min-width="100"
            v-if="this.chFlag"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="1571"
                trigger="manual"
                v-model="scope.row.preVisible"
              >
                <el-table
                  :data="detailData"
                  border
                  :header-cell-style="{ background: '#f9fafc' }"
                  v-loading="listLoading"
                >
                  <el-table-column
                    property="answerTime"
                    label="答题用时"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="finishPercent"
                    label="作业完成率"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="rightPercent"
                    label="作业正确率"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="ruserScore"
                    label="奖杯数量"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="correctTime"
                    label="批改用时"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="correctPercent"
                    label="批改率"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="visitNum"
                    label="点开人数"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="supportNum"
                    label="点赞人数"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="signUpNum"
                    label="通过该页面点击参与的人"
                    align="center"
                  >
                  </el-table-column>
                </el-table>

                <el-button
                  slot="reference"
                  type="primary"
                  icon="el-icon-caret-bottom"
                  @click="preExpanded(scope.row)"
                  v-if="typeof scope.row.ccId == 'number'"
                  >展开
                </el-button>

                <el-button
                  slot="reference"
                  type="primary"
                  icon="el-icon-caret-top"
                  @click="prePackUp(scope.row)"
                  v-if="typeof scope.row.ccId != 'number'"
                >
                  收起
                </el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="作业状态" align="center" v-if="this.chFlag">
            <!--lessonHs作业1上线-->
            <template slot-scope="scope">
              <span v-if="scope.row.lessonHs == 1">{{
                scope.row.extendInfo.hwStat | hwStatStatus
              }}</span>
              <span v-else>不可作答</span>
            </template>
          </el-table-column>

          <el-table-column
            label="作业"
            align="center"
            min-width="100"
            v-if="this.chFlag"
          >
            <!--<template slot-scope="scope">-->
            <!--&lt;!&ndash;lessonHs作业1上线&ndash;&gt;-->
            <!--<el-button type="primary" v-if="scope.row.extendInfo.hwStat==1">查看</el-button>-->
            <!--<el-button class="disabled" v-else disabled>查看</el-button>-->
            <!--</template>-->

            <template slot-scope="scope">
              <el-button
                class="disabled"
                v-if="
                  scope.row.extendInfo.hwStat == 0 ||
                    scope.row.extendInfo.hwStat == null
                "
                disabled
              >
                查看
              </el-button>
              <router-link
                v-else
                :to="{
                  path: '/detail/workDetail',
                  query: {
                    id: scope.row.extendInfo.hwId,
                    stat: scope.row.stat,
                    ruserId: scope.row.ruserId,
                    lessonName: scope.row.lessonName,
                    courseName: scope.row.courseName,
                    courseId: scope.row.courseId,
                    lessonId: scope.row.lessonId,
                    mode: 1
                  }
                }"
              >
                <el-button type="primary">查看</el-button>
              </router-link>
            </template>
          </el-table-column>

          <el-table-column
            label="作业批注&&提问"
            align="center"
            min-width="100"
            v-if="this.chFlag"
          >
            <template slot-scope="scope">
              <el-button type="danger" v-if="scope.row.extendInfo.hwQaCount"
                >{{ scope.row.extendInfo.pvQaCount }}
              </el-button>
              <span v-else>-------</span>
            </template>
          </el-table-column>
          <el-table-column
            label="作业更多数据"
            align="center"
            min-width="100"
            v-if="this.chFlag"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="1571"
                trigger="manual"
                v-model="scope.row.studyVisible"
              >
                <el-table
                  :data="detailData"
                  border
                  :header-cell-style="{ background: '#f9fafc' }"
                  v-loading="listLoading"
                >
                  <el-table-column
                    property="answerTime"
                    label="答题用时"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="finishPercent"
                    label="作业完成率"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="rightPercent"
                    label="作业正确率"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="ruserScore"
                    label="奖杯数量"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="correctTime"
                    label="批改用时"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="correctPercent"
                    label="批改率"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="visitNum"
                    label="点开人数"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="supportNum"
                    label="点赞人数"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    property="signUpNum"
                    label="通过该页面点击参与的人"
                    align="center"
                  >
                  </el-table-column>
                </el-table>

                <el-button
                  slot="reference"
                  type="primary"
                  icon="el-icon-caret-bottom"
                  @click="studyExpanded(scope.row)"
                  v-if="typeof scope.row.classId == 'number'"
                  >展开
                </el-button>

                <el-button
                  slot="reference"
                  type="primary"
                  icon="el-icon-caret-top"
                  @click="studyPackUp(scope.row)"
                  v-if="typeof scope.row.classId != 'number'"
                >
                  收起
                </el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatDuring } from "@/utils/index";
import { ruserLessonList, ruserStatistics, extraList } from "@/api/teachers.js";

export default {
  data() {
    return {
      detailData: [],
      listData: [],
      otherData: [],
      tabsStatus: 0, //待上课程&&已上课程&&额外布置的切换(默认待上课)
      classingLength: null,
      classedLength: null,
      extraLength: null,
      listLoading: false,
      chFlag: false,
      data: {
        //待上课&&已上课
        classId: null,
        ruserId: null
      },
      extraData: {
        //额外布置
        ruserId: null
      },
      listQuery: {
        page: 1,
        rows: 1000
      },
      isInit: false
    };
  },
  created() {
    //获取路由参数
    const { classId, ruserId, courseId } = this.$route.query;
    this.isChTeacher();
    this.data.classId = classId;
    this.data.ruserId = ruserId;
    this.extraData.ruserId = ruserId;
    this.extraData.courseId = courseId;
    this.getExtraList();
    // this.getLength()
    this.getList(0, true);
    this.getList(1, true);
  },
  methods: {
    /**
     * @param {Number} tabsStatus: 2额外布置 1已上课程 0待上课
     * @description 用于点击切换列表数据
     */
    handleChange(tabsStatus) {
      this.tabsStatus = tabsStatus;
      if (tabsStatus == 2) {
        this.getExtraList();
      } else {
        this.getList(tabsStatus);
      }
    },

    /**
     * @param {Number} type: 1已上课程 0待上课  classingLength：待上课长度  classedLength：已上课长度
     * @param {Boolean} isInit: true 初始化 false不是初始化
     * @description 获取列表数据
     */
    async getList(type, isInit = false) {
      const obj = {
        type: type,
        ...this.listQuery,
        ...this.data
      };
      this.listLoading = true;
      const result = await ruserLessonList(obj);
      if (result) {
        this.listLoading = false;
      }
      if (type == 0) {
        this.classingLength = result.data.records.length; //待上课长度
      }
      if (type == 1) {
        this.classedLength = result.data.records.length; //已上课长度
      }
      if (isInit) {
        if (type == 0) {
          this.listData = result.data.records;
        }
      } else {
        this.listData = result.data.records;
      }
    },

    /**
     * @description 获取额外布置列表数据  extraLength 额外上课长度
     */
    async getExtraList() {
      const obj = {
        ...this.listQuery,
        ...this.extraData
      };
      this.listLoading = true;
      const result = await extraList(obj);
      this.otherData = result.data.records;
      this.extraLength = result.data.records.length; //额外上课长度
      if (result) {
        this.listLoading = false;
      }
    },

    /**
     * @description 获取学生作业预习统计数据
     * @description ruserCount学生答题数
     * @description sectionCount总数
     * @description correctCount批改数
     * @description ruserRightCount 学生答题正确数
     * @description correctTime 批改用时
     * @description answerTime答题用时
     */
    async getRuserStatistics(id) {
      this.listLoading = true;
      const result = await ruserStatistics(id);
      const {
        ruserCount,
        ruserRightCount,
        correctCount,
        sectionCount,
        rendTime,
        uendTime,
        ustartTime,
        answerCount,
        qustionCount
      } = result.data;
      const answerTime =
        new Date(result.data.rendTime).getTime() -
        new Date(result.data.rstartTime).getTime();
      const correctTime =
        new Date(result.data.uendTime).getTime() -
        new Date(result.data.ustartTime).getTime();
      result.data.answerTime =
        result.data.rendTime == null ? "--------" : formatDuring(answerTime);
      result.data.correctTime =
        result.data.uendTime == null ? "--------" : formatDuring(correctTime);
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
      this.listLoading = false;
    },

    //预习展开
    preExpanded(record) {
      record.preVisible = true;
      record.ccId = record.ccId.toString();
      if (record.extendInfo.pvId) {
        this.getRuserStatistics(record.extendInfo.pvId);
      } else {
        this.detailData = [];
      }
    },

    //预习收起
    prePackUp(record) {
      record.preVisible = false;
      record.ccId = Number(record.ccId);
    },

    //作业展开
    studyExpanded(record) {
      record.studyVisible = true;
      record.classId = record.classId.toString();
      if (record.extendInfo.hwId) {
        this.getRuserStatistics(record.extendInfo.hwId);
      } else {
        this.detailData = [];
      }
    },

    //作业收起
    studyPackUp(record) {
      record.studyVisible = false;
      record.classId = Number(record.classId);
    },

    //额外展开
    extraExpanded(record) {
      record.extraVisible = true;
      record.id = record.id.toString();
      // otherData
      this.getRuserStatistics(record.id);
    },

    //额外收起
    extraPackUp(record) {
      record.extraVisible = false;
      record.id = Number(record.id);
    },
    /**
     * @description 用于判断是否是中教   中教chFlag true  外教chFlag false
     */
    isChTeacher() {
      const [roleId] = this.roleIds;
      const arr = [20, 21, 22]; //中教id
      const ret = arr.find(v => {
        return v == roleId;
      });
      if (ret) {
        this.chFlag = true;
      }
    }
  },
  filters: {
    //操作人处理
    creatorFilter(val) {
      if (val.creator && val.creator.length == "1") {
        return "-----------";
      } else {
        return JSON.parse(val.creator).nickName;
      }
    },
    //时间处理
    timeFilter(str) {
      return str.substring(0, 10);
    },
    //出席状态
    ruserStatus(status) {
      const config = {
        "0": "Absent",
        "1": "Attendance"
      };
      return config[status];
    },
    //评价状态
    evalStatus(status) {
      const config = {
        "0": "未评价",
        "1": "已评价"
      };
      return config[status];
    },
    //预习状态
    pvStatStatus(status) {
      const config = {
        null: "未预习",
        undefined: "未预习",
        "0": "未预习",
        "1": "预习中",
        "2": "已预习",
        "3": "批改中",
        "4": "已批改"
      };
      return config[status];
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
    },
    //额外状态
    extraStatus(status) {
      const config = {
        "-1": "不可预习",
        null: "未预习",
        undefined: "未预习",
        "0": "未预习",
        "1": "预习中",
        "2": "已预习",
        "3": "批改中",
        "4": "已批改"
      };
      return config[status];
    }
  },
  computed: {
    ...mapGetters(["roleIds", "userId"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tabs {
  border: 1px solid #dcdfe6;
  color: #606266;
  margin: 15px;
  border-radius: 8px;
  padding: 20px;

  .el-button {
    width: 91px;
    height: 37px;
    border-radius: 4px;
  }

  .disabled {
    background-color: #cbcbcb;
    color: #ffffff;
  }

  .evaluate {
    width: 125px;
  }

  .tabs-change {
    border-bottom: 1px solid #ccc;
    height: 40px;
    line-height: 40px;

    div {
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 180px;
      font-size: 20px;

      &.active {
        border-bottom: 2px solid #449cfd;
        color: #449cfc;
      }
    }
  }
}
</style>
