<template>
  <div class="main-box">
    <div class="selectBox">
      <div class="flex-box">
        <div class="ctselect">
          <span style="width:35px;">CT：</span>
          <div>
            <v-teacherchinese
              ref="ct"
              @childChooseTeacher="chooseChineseTeacher"
            ></v-teacherchinese>
          </div>
        </div>
        <div class="ctselect margin-top20">
          <span style="width:35px;">FT：</span>
          <div>
            <v-teacherforeign
              ref="ft"
              @childChooseTeacher="chooseForeignTeacher"
            ></v-teacherforeign>
          </div>
        </div>
      </div>
      <div class="flex-btn">
        <el-button
          type="danger"
          size="small"
          style="display:block;margin-left:10px;width:100px"
          @click="pClear"
          >empty
        </el-button>
        <el-button
          type="success"
          size="small"
          style="display:block;margin-top:10px;width:100px"
          @click="getlist()"
        >
          search
        </el-button>
      </div>
    </div>
    <el-input
      v-model="className"
      size="small"
      style="width:200px;margin:0 0 20px 20px;"
      placeholder="Class Name"
    ></el-input>
    <div style="margin-left:20px;float:left">
      <template>
        <div class="block">
          <el-date-picker
            size="small"
            class="datepicker"
            v-model="dateTime"
            type="daterange"
            align="right"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="getDate"
            :picker-options="pickerOptions"
            style="vertical-align: middle;"
          >
          </el-date-picker>
        </div>
      </template>
    </div>
    <div class="container-box">
      <!--<p>Class Name:</p>-->
      <div class="content-box">
        <div class="top-btn">
          <span :class="{ clickColor: STactive }" @click="start()"
            >Start Soon({{ num1 }})</span
          >
          <span :class="{ clickColor: !STactive }" @click="over()"
            >Already Over({{ num2 }})</span
          >
        </div>
        <template>
          <el-table
            :data="list"
            border
            style="width: 100%;font-size:13px;"
            :header-cell-style="{ background: '#f9fafc' }"
            v-if="STactive"
          >
            <el-table-column
              prop="className"
              label="Class Name"
              align="center"
            ></el-table-column>
            <el-table-column prop="originTime" label="Date" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.originTime.substring(0, 10) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="originPoint"
              label="Class Time"
              align="center"
            ></el-table-column>
            <el-table-column label="Original" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.originTutorInfo"
                  placement="top"
                >
                  <el-button size="mini">
                    {{
                      scope.row.originTutorInfo.substring(
                        scope.row.originTutorInfo.indexOf("(") + 1,
                        scope.row.originTutorInfo.indexOf(")")
                      )
                    }}
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="Sub-Teacher" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.tutorInfo"
                  placement="top"
                >
                  <el-button size="mini">
                    {{
                      scope.row.tutorInfo.substring(
                        scope.row.tutorInfo.indexOf("(") + 1,
                        scope.row.tutorInfo.indexOf(")")
                      )
                    }}
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="courseName"
              label="Package"
              align="center"
            ></el-table-column>

            <el-table-column label="Courseware" align="center">
              <template slot-scope="scope">
                <div class="flex-box1">
                  <span>{{ scope.row.lessonName }}</span>
                  <a
                    :href="
                      '/aom/lesson/downloadZip/' +
                        scope.row.lessonId +
                        '?type=1'
                    "
                    target="_blank"
                    style="display:inline-block;margin-top:10px"
                  >
                    <el-button class="CoursewareBtn" type="primary" size="mini"
                      >Pre-Courseware</el-button
                    >
                  </a>
                  <a
                    :href="
                      '/aom/lesson/downloadZip/' +
                        scope.row.lessonId +
                        '?type=0'
                    "
                    target="_blank"
                  >
                    <el-button class="CoursewareBtn" type="danger" size="mini"
                      >Courseware</el-button
                    >
                  </a>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="Link" align="center">
              <template slot-scope="scope">
                <a :href="scope.row.monitorAddr" target="_blank">
                  <el-button type="primary" size="mini" style="width:80px;"
                    >Click</el-button
                  >
                </a>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="Evaluate Student"
              align="center"
              width="250"
            >
              <template slot-scope="scope">
                <ul
                  class="students"
                  v-for="(item, index) in scope.row.students"
                  :key="index"
                >
                  <li>
                    <span>{{ item.ruserEnName }}</span>
                    <span>
                      <el-button
                        type="success"
                        size="mini"
                        v-if="item.evaluateId == null"
                        @click="toEval(scope.$index, item.phone, item.id)"
                        style="width:90px;"
                        >Evaluate</el-button
                      >
                      <el-button
                        type="danger"
                        size="mini"
                        v-if="item.evaluateId != null"
                        @click="
                          editEval(
                            scope.$index,
                            item.phone,
                            item.id,
                            item.evaluateId
                          )
                        "
                        style="width:90px;"
                        >Edit</el-button
                      >
                    </span>
                  </li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="replace(scope.row.id, scope.row.tutorId)"
                  >Change
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="list2"
            border
            style="width: 100%;font-size:13px;"
            :header-cell-style="{ background: '#f9fafc' }"
            v-if="!STactive"
            :key="1"
          >
            <el-table-column
              prop="className"
              label="Class Name"
              align="center"
            ></el-table-column>
            <el-table-column prop="originTime" label="Date" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.originTime.substring(0, 10) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="originPoint"
              label="Class Time"
              align="center"
            ></el-table-column>
            <el-table-column label="Original" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.originTutorInfo"
                  placement="top"
                >
                  <el-button size="mini">
                    {{
                      scope.row.originTutorInfo.substring(
                        scope.row.originTutorInfo.indexOf("(") + 1,
                        scope.row.originTutorInfo.indexOf(")")
                      )
                    }}
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="Sub-Teacher" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.tutorInfo"
                  placement="top"
                >
                  <el-button size="mini">
                    {{
                      scope.row.tutorInfo.substring(
                        scope.row.tutorInfo.indexOf("(") + 1,
                        scope.row.tutorInfo.indexOf(")")
                      )
                    }}
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              prop="courseName"
              label="Package"
              align="center"
            ></el-table-column>

            <el-table-column label="Attendance" align="center">
              <template slot-scope="scope">
                <span>{{
                  scope.row.tutorStatus == "0" ? "Absent" : "Attended"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Courseware" align="center">
              <template slot-scope="scope">
                <div class="flex-box1">
                  <span>{{ scope.row.lessonName }}</span>
                  <a
                    :href="
                      '/aom/lesson/downloadZip/' +
                        scope.row.lessonId +
                        '?type=1'
                    "
                    target="_blank"
                    style="display:inline-block;margin-top:10px"
                  >
                    <el-button class="CoursewareBtn" type="primary" size="mini"
                      >Pre-Courseware</el-button
                    >
                  </a>
                  <a
                    :href="
                      '/aom/lesson/downloadZip/' +
                        scope.row.lessonId +
                        '?type=0'
                    "
                    target="_blank"
                  >
                    <el-button class="CoursewareBtn" type="danger" size="mini"
                      >Courseware</el-button
                    >
                  </a>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="Link" align="center">
              <template slot-scope="scope">
                <a :href="scope.row.monitorAddr" target="_blank">
                  <el-button type="primary" size="mini" style="width:80px;"
                    >Click</el-button
                  >
                </a>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              label="Evaluate Student"
              align="center"
              width="250"
            >
              <template slot-scope="scope">
                <ul
                  class="students"
                  v-for="(item, index) in scope.row.students"
                  :key="index"
                >
                  <li>
                    <span>{{ item.ruserEnName }}</span>
                    <span>
                      <el-button
                        type="success"
                        size="mini"
                        v-if="item.evaluateId == null"
                        @click="toEval(scope.$index, item.phone, item.id)"
                        style="width:90px;"
                        >Evaluate</el-button
                      >
                      <el-button
                        type="danger"
                        size="mini"
                        v-if="item.evaluateId != null"
                        @click="
                          editEval(
                            scope.$index,
                            item.phone,
                            item.id,
                            item.evaluateId
                          )
                        "
                        style="width:90px;"
                        >Edit</el-button
                      >
                    </span>
                  </li>
                </ul>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="block flex-box-center" style="margin-top:20px">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </div>
    <div class="item o-hidden fixed-box" v-if="replaceOrMackup">
      <div class="h-40 border-bottom pl-20">设定替换的老师</div>
      <div class="search-box o-hidden pt-15 mb-20">
        <div class="o-hidden mb-10" v-if="tutorType == 0">
          <div
            class="pull-left width-150"
            style="line-height:32px;padding-left:20px;"
          >
            <span class="display-inline-block" style="width:150px;"
              >选择中教：</span
            >
          </div>
          <div class="pull-left">
            <div class="pull-left">
              <v-teacherchinese
                @childChooseTeacher="chooseChineseTeacher"
              ></v-teacherchinese>
            </div>
            <div class="pull-left">
              <el-button
                type="default"
                class="ml-10"
                size="small"
                @click="tutorType = 1"
                >切换到外教</el-button
              >
            </div>
          </div>
        </div>
        <div class="o-hidden mb-10" v-if="tutorType == 1">
          <div class="o-hidden">
            <div
              class="pull-left width-150"
              style="line-height:32px;padding-left:20px;"
            >
              <span class="display-inline-block" style="width:150px;"
                >选择外教：</span
              >
            </div>
            <div class="pull-left">
              <v-teacherforeign
                @childChooseTeacher="chooseForeignTeacher"
              ></v-teacherforeign>
            </div>
            <div class="pull-left">
              <el-button
                type="default"
                class="ml-10"
                size="small"
                @click="tutorType = 0"
                >切换到中教</el-button
              >
            </div>
          </div>
        </div>
        <div class="o-hidden">
          <div class="pull-left width-150">&nbsp;</div>
          <div class="pull-left">
            <el-button
              type="success"
              class="width-150"
              @click="_classLessonReviseHistoryReSubTutor()"
              >确定
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  classLessonReviseHistory,
  classLessonReviseHistoryReSubTutor
} from "../../../api/aom.js";
import { sfTools } from "../util.js";
import PageTitle from "../components/pagetitle.vue";
import TeacherForeign from "./teacher_foreign.vue";
import TeacherChinese from "./teacher_chinese.vue";

export default {
  components: {
    "v-pagetitle": PageTitle,
    "v-teacherforeign": TeacherForeign,
    "v-teacherchinese": TeacherChinese
  },
  data() {
    return {
      dateTime: "",
      realTimeGe: "",
      realTimeLe: "",
      //~~~~~~~~~~~~分页~~~~~~~~~~~~~~~
      totalNum: null,
      currentPage: 1,
      rows: 20,
      page: 1,
      //~~~~~~~~~~~~分页~~~~~~~~~~~~~~~
      STactive: true,
      num1: null,
      num2: null,
      tableData: [],
      bumenArray: [],
      daquArray: [],
      teamArray: [],
      teacherArray: [],
      bumenId: "",
      daquId: "",
      teamId: "",
      teacherId: "",
      list: [],
      list2: [],
      classIngOrEd: true, //待上课程和已上课程的切换
      chooseDate11: "",
      replaceOrMackup: false,
      tutorType: 0,
      tutorId: "",
      chineseTeacher: "",
      foreignTeacher: "",
      className: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    this.title = `正式课替换课程`;
    this._getEdLessonList();
    let _this = this;
    window.onscroll = function() {
      _this.replaceOrMackup = false;
    };
  },
  methods: {
    /**
     * @description 对获取的日期处理
     */
    getDate(dateTime) {
      if (!dateTime) {
        this.realTimeGe = "";
        this.realTimeLe = "";
      } else {
        this.realTimeGe = dateTime[0] || "";
        this.realTimeLe = dateTime[1] || "";
      }
    },
    handleSizeChange(val) {
      this.rows = val;
      if (this.STactive == true) {
        this.start();
      } else {
        this.over();
      }
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      if (this.STactive == true) {
        this.start();
      } else {
        this.over();
      }
    },
    toEval(index, phone, id) {
      //     query: {lessonId: scope.row.lessonId
      // ,originTime:scope.row.originTime,lessonName:scope.row.lessonName,courseName:scope.row.courseName,
      // phone:$route.query.phone,id:scope.row.id}
      this.$router.push({
        path: "/chTeachManage/evaluation1",
        query: {
          lessonId: this.tableData[index].lessonId,
          originTime: this.tableData[index].originTime,
          lessonName: this.tableData[index].lessonName,
          courseName: this.tableData[index].courseName,
          phone: phone,
          id: id
        }
      });
    },
    editEval(index, phone, id, evaluateId) {
      //     query: {lessonId: scope.row.lessonId
      // ,originTime:scope.row.originTime,lessonName:scope.row.lessonName,courseName:scope.row.courseName,
      // phone:$route.query.phone,id:scope.row.id}
      this.$router.push({
        path: "/chTeachManage/editEvaluation1",
        query: {
          lessonId: this.tableData[index].lessonId,
          originTime: this.tableData[index].originTime,
          lessonName: this.tableData[index].lessonName,
          courseName: this.tableData[index].courseName,
          phone: phone,
          id: id,
          evaluateId: evaluateId
        }
      });
      console.log(this.tableData[index]);
    },
    getlist() {
      //this.STactive = true;
      this._getEdLessonList();
    },
    start() {
      this.STactive = true;
      this.OVactive = false;
      classLessonReviseHistory({
        type: 0, //待上课
        classType: 1,
        realTime: this.chooseDate11,
        isAsc: true,
        tutorId: this.tutorId,
        page: this.page,
        rows: this.rows,
        className: this.className,
        realTimeGe: this.realTimeGe,
        realTimeLe: this.realTimeLe
      }).then(res => {
        this.tableData = res.data.records;
        console.log(this.tableData);
        this.list = res.data.records;
        this.totalNum = res.data.total;
      });
    },
    over() {
      this.STactive = false;
      this.OVactive = true;
      classLessonReviseHistory({
        type: 1, //已上课
        classType: 1,
        realTime: this.chooseDate11,
        isAsc: true,
        tutorId: this.tutorId,
        page: this.page,
        rows: this.rows,
        className: this.className,
        realTimeGe: this.realTimeGe,
        realTimeLe: this.realTimeLe
      }).then(res => {
        this.list2 = res.data.records;
        this.tableData = res.data.records;
        this.totalNum = res.data.total;
      });
    },
    pClear() {
      this.tutorId = null;
      this.className = null;
      this.dateTime = null;
      this.realTimeGe = null;
      this.realTimeLe = null;
      this.$refs.ct.clear();
      this.$refs.ft.clear();
      this._getEdLessonList();
    },
    chooseChineseTeacher(bumenId, daquId, teamId, teacherId) {
      console.log(bumenId, daquId, teamId, teacherId);
      this.tutorId = teacherId;
      this.chineseTeacher = teacherId;
    },
    chooseForeignTeacher(bumenId, daquId, teamId, teacherId) {
      console.log(1);
      console.log(bumenId, daquId, teamId, teacherId);
      this.tutorId = teacherId;
      this.foreignTeacher = teacherId;
    },
    change(ee) {
      this.chooseDate11 = ee;
      this._getEdLessonList();
    },
    _getEdLessonList() {
      classLessonReviseHistory({
        type: 0, //待上课
        classType: 1,
        realTime: this.chooseDate11,
        isAsc: true,
        tutorId: this.tutorId,
        className: this.className,
        realTimeGe: this.realTimeGe,
        realTimeLe: this.realTimeLe
      }).then(res => {
        this.tableData = res.data.records;
        this.list = res.data.records;
        console.log(this.tableData);
        this.totalNum = res.data.total;
        this.num1 = res.data.total;
      });
      classLessonReviseHistory({
        type: 1, //已上课
        classType: 1,
        realTime: this.chooseDate11,
        isAsc: true,
        tutorId: this.tutorId,
        className: this.className,
        realTimeGe: this.realTimeGe,
        realTimeLe: this.realTimeLe
      }).then(res => {
        this.list2 = res.data.records;
        this.num2 = res.data.total;
        console.log(this.list2);
      });
    },

    //重新替课
    replace(reviseHistoryId, subTutorId) {
      //console.log(reviseHistoryId, subTutorId)
      this.replaceOrMackup = true;
      this.reviseHistoryId = reviseHistoryId;
    },
    _classLessonReviseHistoryReSubTutor() {
      let a = "";
      if (this.tutorType === 0) {
        a = this.chineseTeacher;
      } else if (this.tutorType === 1) {
        a = this.foreignTeacher;
      }
      if (!a) {
        this.$message({ type: "error", message: "请选择老师" });
      } else {
        classLessonReviseHistoryReSubTutor(this.reviseHistoryId, a).then(
          res => {
            if (res.data.code === 0) {
              this.$message({ type: "success", message: "替换成功",
                onClose:()=>{
                  this.tutorId='';
                this._getEdLessonList();
                this.replaceOrMackup = false;
              } });

            }
          }
        );
      }
    },

    gotoClassDetailPage(classId, type) {
      this.$router.push({
        path: "/aom/classmanage-detail",
        query: { classId: classId, name: "进行中的班级" }
      });
    },

    gotoCoursePage(lessonId, courseId, courseName) {
      this.$router.push({
        path: "/aom/coursemanage-lessonlist",
        query: {
          isIng: "进行中的课程",
          courseId: courseId,
          lessonId: lessonId,
          courseName: courseName,
          from: "replaceclass"
        }
      });
    },

    currentChange(val) {
      this.list = [];
      this.pagination.page = val;
      console.log("changePage");
    }
  },

  filters: {
    timestampToDate: function(timestamp) {
      return sfTools.getDateFromTimestamp(timestamp);
    }
  }
};
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
@import "../index.scss";

ul,
li {
  margin: 0;
  padding: 0;
}

.main-box {
  color: #606266;
}

.search-btn {
  float: right;
  margin-right: 5px;
}

.tip2 {
  margin-left: 20px;
}

.selectBox {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafc;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 10px;

  .flex-box {
    flex-direction: column;
  }
}

.ctselect {
  display: flex;
  align-items: center;
  span {
    font-size: 13px;
  }
}

.margin-top20 {
  margin-top: 10px;
}

.container-box {
  margin: 0 20px;
  color: #606266;
  font-size: 13px;
  padding-bottom: 50px;
  p {
    color: #656565;
    font-size: 18px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .content-box {
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 6px;
    padding: 0 25px 20px 25px;
    .top-btn {
      height: 50px;
      line-height: 48px;
      margin-bottom: 15px;
      border-bottom: 1px solid #eeeeee;
      span {
        display: inline-block;
        width: 150px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
}

.clickColor {
  color: #449cfc;
  border-bottom: 2px solid #449cfc;
}

.students {
  li {
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    border-bottom: 1px solid #fbfcff;
  }
}

.CoursewareBtn {
  display: inline-block;
  width: 128px;

  border-radius: 4px;
  margin-bottom: 5px;
}

.flex-box1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fixed-box {
  border: 1px solid #eeeeee;
  width: 100%;
  height: 155px;
  position: fixed;
  bottom: 0;
  background: #ffffff;
  opacity: 1;
  z-index: 55;
}
</style>
