<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>
      <div class="addclass-box">

        <div class="item o-hidden">
          <div class="o-hidden border-bottom pb-10 mb-20">
            <!--<div class="color-orange font-bold font18 pull-left h-40">课程情况</div>-->
            <div class="font-bold font18 pull-left h-40" v-if="list[0]">{{list[0]['courseName']}}</div>
          </div>
          <!--<div>-->
          <!--&lt;!&ndash;<el-button :type="classIngOrEd==true?'warning':''" @click="classIngOrEd=true;replaceOrMackup=0;tutorType=0;">待上课程（{{list.length}}）</el-button>&ndash;&gt;-->
          <!--<el-button :type="classIngOrEd==true?'warning':''"-->
          <!--@click="classIngOrEd=true;replaceOrMackup=0;tutorType=0;"><span class="mr-5">Start Soon</span>({{list.length}})-->
          <!--</el-button>-->
          <!--&lt;!&ndash;<el-button :type="classIngOrEd==false?'warning':''" @click="classIngOrEd=false;replaceOrMackup=0;tutorType=0;">已上课程（{{list2.length}}）</el-button>&ndash;&gt;-->
          <!--<el-button :type="classIngOrEd==false?'warning':''"-->
          <!--@click="classIngOrEd=false;replaceOrMackup=0;tutorType=0;"><span class="mr-5">Already Over</span>({{list2.length}})-->
          <!--</el-button>-->
          <!--</div>-->
          <div class="class-situation-lineg">
            <div @click="classIngOrEd=true;replaceOrMackup=0;tutorType=0;"
                 :class="classIngOrEd===true?'active pull-left c-pointer':'pull-left c-pointer'"><span class="mr-5">Start Soon</span>({{list.length}})
            </div>
            <div @click="classIngOrEd=false;replaceOrMackup=0;tutorType=0;"
                 :class="classIngOrEd===false?'active pull-left c-pointer':'pull-left c-pointer'"><span class="mr-5">Already Over</span>({{list2.length}})
            </div>
          </div>
          <div class="mt-15 mb-20" v-show="classIngOrEd==true">
            <!--待上课程-->
            <el-table :data="list" border style="width: 100%">
              <el-table-column label="Course" prop="lessonName"></el-table-column>
              <!--<el-table-column label="课节" prop="lessonName"></el-table-column>-->
              <el-table-column label="Date">
                <template slot-scope="scope">
                  {{scope.row.originTime | substring10}}
                </template>
              </el-table-column>
              <!--<el-table-column label="时间" prop="originPoint"></el-table-column>-->
              <!--<el-table-column label="老师出勤">-->
              <!--<template slot-scope="scope">-->
              <!--{{scope.row.tutorStatus == "1" ? "已出席" : "未出席"}}-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column label="Sub-Teacher">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.isSub=='0'"
                             @click="replaceTeacherBtn(scope.row.tutorType,scope.row.id)"
                             size="mini"
                             :disabled="scope.row.stat=='1'"
                             type="primary">Click
                  </el-button>
                  <span v-if="scope.row.isSub=='1'">{{scope.row.tutorDepartInfo}}</span>
                </template>
              </el-table-column>
              <!--<el-table-column label="删除该节课">-->
              <!--<template slot-scope="scope">-->
              <!--<el-button v-if="scope.row.stat=='0'"-->
              <!--@click="deleteLesson(scope.row.id)"-->
              <!--size="mini"-->
              <!--type="primary">删除-->
              <!--</el-button>-->
              <!--<el-button v-if="scope.row.stat=='1'"-->
              <!--size="mini"-->
              <!--disabled-->
              <!--type="default">已删除-->
              <!--</el-button>-->
              <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
          </div>
          <div class="mt-15 mb-20" v-show="classIngOrEd==false">
            <!--已上课程-->
            <el-table :data="list2" border style="width: 100%">
              <!--<el-table-column label="课程名称" prop="lessonName"></el-table-column>-->
              <el-table-column label="Course" prop="lessonName"></el-table-column>
              <el-table-column label="Data">
                <template slot-scope="scope">
                  {{scope.row.originTime | substring10}}
                </template>
              </el-table-column>
              <!--<el-table-column label="时间" prop="originPoint"></el-table-column>-->
              <el-table-column label="Attendance">
                <template slot-scope="scope">
                  <template v-if="scope.row.isSub==0">
                    <span v-if="scope.row.tutorStatus==1">Yes</span>
                    <span v-if="scope.row.tutorStatus!=1">No</span>
                  </template>
                  <template v-if="scope.row.isSub==1">
                    <span v-if="scope.row.tutorStatus==1">Sub-Teacher(Yes)</span>
                    <span v-if="scope.row.tutorStatus!=1">Sub-Teacher(No)</span>
                  </template>
                  <!--{{scope.row.tutorStatus == "1" ? "Attended" : "Absent"}}-->
                </template>
              </el-table-column>
              <el-table-column label="Sub-Teacher">
                <template slot-scope="scope">{{scope.row.isSub=='0'?'None':scope.row.tutorDepartInfo}}</template>
              </el-table-column>
              <el-table-column label="Make up">
                <template slot-scope="scope">
                  <el-button @click="mackupBtn(scope.row.tutorType,scope.row.id)"
                             size="mini"
                             type="primary">Click
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="Link">
                <template slot-scope="scope">
                  <a :href="scope.row.monitorAddr" target="_blank">
                    <el-button size="mini" type="success">Go</el-button>
                  </a>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->
        </div>

        <el-dialog :title="classIngOrEd == true ? '设定替换的老师' : '设定补课的老师'"
                   :visible="dialogVisible" width="70%"
                   :before-close="handleClose">
          <div class="search-box o-hidden pt-15 mb-20">
            <div class="o-hidden mb-10" v-if="tutorType==0">
              <span class="pull-left display-block h-40" style="width:150px;">选择中教：</span>
              <div class="pull-left">
                <v-teacherchinese @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>
              </div>
            </div>
            <div class="o-hidden mb-10" v-if="tutorType==1">
              <span class="pull-left display-block h-40" style="width:150px;">选择外教：</span>
              <div class="pull-left">
                <v-teacherforeign @childChooseTeacher="chooseForeignTeacher"></v-teacherforeign>
              </div>
            </div>
            <div class="o-hidden mb-10" v-if="!classIngOrEd">
              <div class="pull-left width-150 h-40">选择课程时间：</div>
              <div class="pull-left">
                <el-date-picker class="width-300"
                                v-model="chooseDate"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="选择日期">
                </el-date-picker>
                <el-select class="width-200"
                           v-model="classTime"
                           placeholder="上课时间">
                  <el-option v-for="item in classTimeArray" :key="item" :label="item"
                             :value="item"></el-option>
                </el-select>
              </div>
            </div>
            <div class="o-hidden">
              <div class="pull-left width-150">&nbsp;</div>
              <div class="pull-left">
                <el-button type="success"
                           class="width-150"
                           @click="replaceTeacher()">确定
                </el-button>
              </div>
            </div>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
  import {
    getTeachersByDeptId,
    getLessonList,
    classLessonDetailSubTutor,  //班级替课
    lessonMake,  //班级补课
    deleteEeoClass
  } from '../../../api/aom.js';
  import {sfTools, sfData} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';
  import TeacherForeign from '../components/teacher_foreign.vue';
  import TeacherChinese from '../components/teacher_chinese.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle,
      'v-teacherforeign': TeacherForeign,
      'v-teacherchinese': TeacherChinese
    },
    data() {
      return {
        pagination: {page: 1, size: 1000, total: 0},
        list: [],
        list2: [],
        obj: {size: 10, pages: 1},
        classIngOrEd: true,  //待上课程和已上课程的切换
        replaceOrMackup: 0,  //切换弹窗的显示：0=>隐藏;1=>替换老师;2=>补课老师
        tutorType: 0,  //切换中外教选择条的显示 0=>中教; 1=>外教
        classLessonId: 0,  //替换老师时使用
        classTime: '',
        chooseDate: '',
        dialogVisible: false
      }
    },
    created() {
      this.chooseDate = sfTools.getDateFromTimestamp(new Date().getTime());
      this.name = this.$route.query.name;
      this.classId = this.$route.query.classId;
      //console.log(this.name, this.classId);
      this.title = `班级管理 > 班级详情 > 课程情况`;
      this._getLessonList();
      this.classTimeArray = sfData.classTimes;
    },
    methods: {
      handleClose(done) {
        this.dialogVisible = false;
      },
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
        this.chineseTeacher = teacherId;
      },
      chooseForeignTeacher(bumenId, daquId, teamId, teacherId){
        this.foreignTeacher = teacherId;
      },
      //点击去操作补课按钮
      mackupBtn(tutorType, id){
        //alert(tutorType);
        this.tutorType = tutorType;
        this.replaceOrMackup = 2;
        this.classLessonId = id;
        this.dialogVisible = true;
        console.log(this.dialogVisible);
      },
      //待上课删除课节
      deleteLesson(id){
        this.$confirm('确定要删除吗?', '提示',
          {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}
        ).then(() => {
          deleteEeoClass(id).then((res) => {
            console.log(res);
            this._getLessonList();
          })
        });
      },
      //点击去操作替换老师按钮
      replaceTeacherBtn(type, id){
        this.replaceOrMackup = 1;
        this.tutorType = type;  //0是中教 1是外教
        this.classLessonId = id;
        this.dialogVisible = true;
      },

      //替换老师或补课
      replaceTeacher() {
        if (this.classIngOrEd == true) {  //替换老师
          if (this.tutorType == 0) {
            if (this.chineseTeacher == '') {
              this.$message({type: 'error', message: '请选择老师'});
              return false;
            } else {
              var subTutorId = this.chineseTeacher;
            }
          } else if (this.tutorType == 1) {
            if (this.foreignTeacher == '') {
              this.$message({type: 'error', message: '请选择老师'});
              return false;
            } else {
              var subTutorId = this.foreignTeacher;
            }
          }
          classLessonDetailSubTutor(this.classLessonId, subTutorId).then((res) => {
            console.log(res);
            this._getLessonList();
            this.replaceOrMackup = 0;
            this.dialogVisible = false;
          });
        } else if (this.classIngOrEd == false) {  //补课
          var obj = {
            lessonDetailId: this.classLessonId,
            timePoint: this.classTime,
            lessonDate: this.chooseDate,
            //tutorId: this.chineseTeacher
          };
          if (this.tutorType == 0) {
            obj.tutorId = this.chineseTeacher;
          } else if (this.tutorType == 1) {
            obj.tutorId = this.foreignTeacher;
          }
          for (var i in obj) {
            if (!obj[i]) {
              this.$message({type: 'error', message: '请填写完整'});
              return false;
            }
          }
          lessonMake(obj).then((res) => {
            console.log(res);
            this._getLessonList();
            this.replaceOrMackup = 0;
            this.dialogVisible = false;
          });
        }

      },

      _getLessonList(){
        getLessonList({
          classId: this.classId,
          type: '0', //待上课
          page: 1,
          rows: 1999999
        }).then((res) => {
          this.list = res.data.records;
          console.log(this.list);
        });
        getLessonList({
          classId: this.classId,
          type: '1',
          page: 1,
          rows: 1999999
        }).then((res) => {
          this.list2 = res.data.records;
          console.log(this.list2);
        })
      },

    },
    filters: {
      substring10: function (a) {
        if (a) {
          return a.substring(0, 10);
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import '../index.scss';

  .aom-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: white;

    .p-20 {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .class-situation-lineg {
        border-bottom: 1px solid #ccc;
        height: 40px;
        line-height: 40px;
        div {
          height: 40px;
          line-height: 40px;
          text-align: center;
          width: 180px;
          &.active {
            border-bottom: 2px solid #449cfd;
          }
        }
      }
      .addclass-box {
        height: auto;
        width: 100%;
        padding: 20px 0;

        .item {
          margin-bottom: 20px;
          background: #fbfbfb;
          padding: 10px 20px;
          border-radius: 10px;
          box-sizing: border-box;
        }

      }
    }
  }

</style>
