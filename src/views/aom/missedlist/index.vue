<template>
  <div class="main-box">
    <div class="selectBox">
      <div class="flex-box">
        <div class="ctselect">
          <span style="width:35px;">CT：</span>
          <div>
            <v-teacherchinese ref="ct" @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>
          </div>
        </div>
        <div class="ctselect margin-top20">
          <span style="width:35px;">FT：</span>
          <div>
            <v-teacherforeign ref="ft" @childChooseTeacher="chooseForeignTeacher"></v-teacherforeign>
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
        >search
        </el-button>
      </div>
    </div>
    <el-input v-model="className" size="small" style="width:200px;margin:0 0 0 20px;"
              placeholder="Class Name"></el-input>

    <div class="container-box">
      <p>Make up:</p>
      <div class="content-box">
        <div class="top-btn">
          <span :class="{clickColor:STactive}" @click="start()">Start Soon({{list.length}})</span>
          <span :class="{clickColor:!STactive}" @click="over()">Already Over({{list2.length}})</span>
        </div>
        <template>
          <el-table
            :data="list"
            border
            style="width: 100%;font-size:13px;"
            :header-cell-style="{background:'#f9fafc'}"
            v-if="STactive"
          >
            <el-table-column prop="className" label="Class Name" align="center"></el-table-column>
            <el-table-column prop="realTime" label="Date" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.realTime.substring(0,10)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="realPoint" label="Class Time" align="center"></el-table-column>
            <el-table-column label="Original" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.originTutorInfo"
                  placement="top"
                >
                  <el-button
                    size="mini"
                  >{{scope.row.originTutorInfo.substring(scope.row.originTutorInfo.indexOf("(") +
                    1,scope.row.originTutorInfo.indexOf(")"))}}
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
                  <el-button
                    size="mini"
                  >{{scope.row.tutorInfo.substring(scope.row.tutorInfo.indexOf("(") +
                    1,scope.row.tutorInfo.indexOf(")"))}}
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="courseName" label="Package" align="center"></el-table-column>
            <el-table-column label="Courseware" align="center">
              <template slot-scope="scope">
                <div class="flex-box1">
                  <span>{{scope.row.lessonName}}</span>
                  <a
                    :href="'/aom/lesson/downloadZip/'+scope.row.lessonId+'?type=1'"
                    target="_blank"
                    style="display:inline-block;margin-top:10px"
                  >
                    <el-button class="CoursewareBtn" type="primary" size="mini">Pre-Courseware</el-button>
                  </a>
                  <a
                    :href="'/aom/lesson/downloadZip/'+scope.row.lessonId+'?type=0'"
                    target="_blank"
                  >
                    <el-button class="CoursewareBtn" type="danger" size="mini">Courseware</el-button>
                  </a>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="Link" align="center">
              <template slot-scope="scope">
                <a :href="scope.row.monitorAddr" target="_blank">
                  <el-button type="primary" size="mini" style="width:80px;">Click</el-button>
                </a>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div style="margin-bottom:10px;">
                  <el-button
                    type="success"
                    size="mini"
                    @click="replace(scope.row.id,scope.row.tutorId)"
                    style="width:80px;"
                  >替换
                  </el-button>
                </div>
                <div>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="_deleteClassLessonReviseHistory(scope.row.id)"
                    style="width:80px;"
                  >删除
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="list2"
            border
            style="width: 100%;font-size:13px;"
            :header-cell-style="{background:'#f9fafc'}"
            v-if="!STactive"
          >
            <el-table-column prop="className" label="Class Name" align="center"></el-table-column>
            <el-table-column prop="realTime" label="Date" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.realTime.substring(0,10)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="realPoint" label="Class Time" align="center"></el-table-column>
            <el-table-column label="Original" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.originTutorInfo"
                  placement="top"
                >
                  <el-button
                    size="mini"
                  >{{scope.row.originTutorInfo.substring(scope.row.originTutorInfo.indexOf("(") +
                    1,scope.row.originTutorInfo.indexOf(")"))}}
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
                  <el-button
                    size="mini"
                  >{{scope.row.tutorInfo.substring(scope.row.tutorInfo.indexOf("(") +
                    1,scope.row.tutorInfo.indexOf(")"))}}
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="courseName" label="Package" align="center"></el-table-column>
            <el-table-column label="Attendance" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.tutorStatus == '0'? 'Absent' :'Attended'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Courseware" align="center">
              <template slot-scope="scope">
                <div class="flex-box1">
                  <span>{{scope.row.lessonName}}</span>
                  <a
                    :href="'/aom/lesson/downloadZip/'+scope.row.lessonId+'?type=1'"
                    target="_blank"
                    style="display:inline-block;margin-top:10px"
                  >
                    <el-button class="CoursewareBtn" type="primary" size="mini">Pre-Courseware</el-button>
                  </a>
                  <a
                    :href="'/aom/lesson/downloadZip/'+scope.row.lessonId+'?type=0'"
                    target="_blank"
                  >
                    <el-button class="CoursewareBtn" type="danger" size="mini">Courseware</el-button>
                  </a>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="Link" align="center">
              <template slot-scope="scope">
                <a :href="scope.row.monitorAddr" target="_blank">
                  <el-button type="primary" size="mini" style="width:80px;">Click</el-button>
                </a>
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
          :total="totalNum">
        </el-pagination>
      </div>
      <div class="item o-hidden fixed-box" v-if="replaceOrMackup!=0">
        <div class="h-40 border-bottom t-center">{{classIngOrEd == true ? '设定替换的老师' : '设定补课的老师'}}</div>
        <div class="search-box o-hidden pt-15 mb-20">
          <div class="o-hidden mb-10" v-if="tutorType==0">
            <div class="pull-left width-150" style="line-height:32px;padding-left:20px;">
              <span class="display-inline-block" style="width:150px;">选择中教：</span>
            </div>
            <div class="pull-left">
              <div class="pull-left">
                <v-teacherchinese @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>
              </div>
              <div class="pull-left">
                <el-button type="default" class="ml-10" size="small" @click="tutorType=1">切换到外教</el-button>
              </div>
            </div>
          </div>
          <div class="o-hidden mb-10" v-if="tutorType==1">
            <div class="o-hidden">
              <div class="pull-left width-150" style="line-height:32px;padding-left:20px;">
                <span class="display-inline-block" style="width:150px;">选择外教：</span>
              </div>
              <div class="pull-left">
                <v-teacherforeign @childChooseTeacher="chooseForeignTeacher"></v-teacherforeign>
              </div>
              <div class="pull-left">
                <el-button type="default" class="ml-10" size="small" @click="tutorType=0">切换到中教</el-button>
              </div>
            </div>
          </div>
          <div class="o-hidden mb-10">
            <div class="pull-left width-150 h-40">选择课程时间：</div>
            <div class="pull-left">
              <el-date-picker
                class="width-300"
                v-model="chooseDate"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
              <el-select class="width-200" v-model="classTime" size="small" placeholder="上课时间">
                <el-option v-for="item in classTimeArray" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </div>
          <div class="o-hidden">
            <div class="pull-left width-150">&nbsp;</div>
            <div class="pull-left">
              <el-button type="success" class="width-150" @click="replaceTeacher()">确定</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getClasses,
    getClassTypeItems,
    getWeekTimeItems,
    editOneClass,
    classLessonDetailSubTutor,
    classLessonReviseHistory,
    deleteClassLessonReviseHistory, //补课记录删除
    historyLessonMake //班级补课教师修改
  } from "../../../api/aom.js";
  import {sfTools, sfData} from "../util.js";
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
        //~~~~~~~~~~~~分页~~~~~~~~~~~~~~~
        totalNum: null,
        currentPage: 1,
        rows: 20,
        page: 1,
        //~~~~~~~~~~~~分页~~~~~~~~~~~~~~~
        STactive: true,
        OVactive: false,
        classIngOrEd: true,
        replaceOrMackup: 0, //切换弹窗的显示：0=>隐藏;1=>替换老师;2=>补课老师
        tutorType: 1, //切换中外教选择条的显示 0=>中教; 1=>外教
        classLessonId: 0, //替换老师时使用
        classTime: "",
        chooseDate: "",
        chooseDate11: "",
        list: [],
        list2: [],
        value7: "",
        value: "",
        input1: "",
        keywords: "",
        value1: "",
        tutorId: "",
        tableData: [],
        chineseTeacher: "",
        foreignTeacher: "",
        className: '',
      };
    },
    created() {
      this.title = `补课名单`;
      this._getEdLessonList();
      this.classTimeArray = sfData.classTimes;
      var _this = this;
      window.onscroll = function () {
        _this.replaceOrMackup = 0;
      }
    },
    methods: {
      handleSizeChange(val) {
        this.rows = val
        if (this.STactive == true) {
          this.start();
        } else {
          this.over();
        }
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.page = val
        if (this.STactive == true) {
          this.start();
        } else {
          this.over();
        }
        console.log(`当前页: ${val}`);
      },
      getlist() {
        this.STactive = true;
        this._getEdLessonList();
      },
      start() {
        this.STactive = true;
        this.OVactive = false;
        classLessonReviseHistory({
          type: 0, //待上课
          classType: 2,
          realTime: this.chooseDate11,
          tutorId: this.tutorId,
          isAsc: true,
          page: this.page,
          rows: this.rows,
          className: this.className,
        }).then(res => {
          this.list = res.data.records;
          this.tableData = res.data.records;
          this.totalNum = res.data.total
          console.log(this.list);
        });
      },
      over() {
        this.STactive = false;
        this.OVactive = true;
        classLessonReviseHistory({
          type: 1, //已上课
          classType: 2,
          realTime: this.chooseDate11,
          isAsc: false,
          tutorId: this.tutorId,
          page: this.page,
          rows: this.rows,
          className: this.className,
        }).then(res => {
          this.list2 = res.data.records;
          this.tableData = res.data.records;
          this.totalNum = res.data.total
          console.log(this.list2);
        });
      },
      change(ee) {
        this.chooseDate11 = ee;
        this._getEdLessonList();
      },
      pClear() {
        this.tutorId = null;
        this.$refs.ct.clear();
        this.$refs.ft.clear();
      },
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId) {
        console.log(bumenId, daquId, teamId, teacherId);
        this.tutorId = teacherId;
        this.chineseTeacher = teacherId;
      },
      chooseForeignTeacher(bumenId, daquId, teamId, teacherId) {
        console.log(bumenId, daquId, teamId, teacherId);
        this.tutorId = teacherId;
        this.foreignTeacher = teacherId;
      },
      replace(id) {
        this.classLessonId = id;
        this.replaceOrMackup = 2;
      },
      //班级补课教师修改
      replaceTeacher() {
        var obj = {
          lessonReviseHistoryId: this.classLessonId,
          timePoint: this.classTime,
          lessonDate: this.chooseDate
        };
        if (this.tutorType == 0) {
          obj.tutorId = this.chineseTeacher;
        } else if (this.tutorType == 1) {
          obj.tutorId = this.foreignTeacher;
        }
        console.log(obj);
        //return;
        for (var i in obj) {
          if (!obj[i]) {
            this.$message({type: "error", message: "请填写完整"});
            return false;
          }
        }
        historyLessonMake(obj).then(res => {
          if (res.data.code === 0) {
            this.$message({type: "success", message: "替换成功"});
            this._getEdLessonList();
            this.replaceOrMackup = 0;
          }
        });
      },

      _deleteClassLessonReviseHistory(id) {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          deleteClassLessonReviseHistory(id).then(() => {
            this._getEdLessonList();
          });
        });
      },

      currentChange(val) {
        //this.list = [];
        this.pagination.page = val;
        console.log("changePage");
      },
      _getEdLessonList() {
        classLessonReviseHistory({
          type: 0, //待上课
          classType: 2,
          realTime: this.chooseDate11,
          isAsc: true,
          tutorId: this.tutorId,
          page: this.page,
          rows: this.rows,
          className: this.className,
        }).then(res => {
          this.list = res.data.records;
          this.tableData = res.data.records;
          this.totalNum = res.data.total
          console.log(this.list);
        });
        classLessonReviseHistory({
          type: 1, //已上课
          classType: 2,
          realTime: this.chooseDate11,
          isAsc: false,
          tutorId: this.tutorId,
          page: this.page,
          rows: this.rows,
        }).then(res => {
          this.list2 = res.data.records;
          //   this.tableData = res.data.records;
          console.log(this.list2);
        });
      },
      gotoClassDetailPage(classId, type) {
        this.$router.push({
          path: "/aom/classmanage-detail",
          query: {classId: classId, name: "进行中的班级"}
        });
      },
      gotoCoursePage(lessonId, courseId, courseName) {
        this.$router.push({
          path: "/aom/coursemanage-lessonlist",
          query: {
            isIng: "进行中的课程",
            lessonId: lessonId,
            courseId: courseId,
            courseName: courseName
          }
        });
      }
    },
    filters: {
      timestampToDate: function (timestamp) {
        return sfTools.getDateFromTimestamp(timestamp);
      }
    }
  };
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
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
    width: 80%;
    height: 205px;
    position: fixed;
    bottom: 10px;
    background: white;
    opacity: 1;
    z-index: 55;
  }
</style>
