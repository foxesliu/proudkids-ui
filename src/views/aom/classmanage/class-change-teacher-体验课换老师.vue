<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="教务 > 班级管理 > 班级更换老师"></v-pagetitle>
      <div class="addclass-box">
        <div class="item">
          <div class="pb-20">
            <div class="h-60 font18 border-bottom mb-20">当前班级情况</div>
            <el-table :data="classInfo" border style="width: 100%">
              <el-table-column label="课程类型">
                <template slot-scope="scope">{{scope.row.name}}</template>
              </el-table-column>
              <el-table-column label="班级创建时间">
                <template slot-scope="scope">{{scope.row.createTime | substring10}}</template>
              </el-table-column>
              <el-table-column label="中教老师">
                <template slot-scope="scope">{{scope.row.chineseTeacherName}}</template>
              </el-table-column>
              <el-table-column label="外教老师">
                <template slot-scope="scope">{{scope.row.foreignTeacherName}}</template>
              </el-table-column>
              <el-table-column label="班级类型名称">
                <template slot-scope="scope">{{scope.row.classTypeName}}</template>
              </el-table-column>
              <el-table-column label="上课时间">
                <template slot-scope="scope">{{scope.row.classTime}}</template>
              </el-table-column>
              <el-table-column label="班级开始日期">
                <template slot-scope="scope">{{scope.row.startTime | substring10}}</template>
              </el-table-column>
              <el-table-column label="班级结束日期">
                <template slot-scope="scope">{{scope.row.endTime | substring10}}</template>
              </el-table-column>
              <el-table-column label="班级人数">
                <template slot-scope="scope">{{scope.row.currentNumber}}</template>
              </el-table-column>
              <el-table-column label="每周上课时间">
                <template slot-scope="scope">
                  <span class="mr-10 pull-left"
                        v-for="c in scope.row.teacherWeektime">{{c.teacherType == '0' ? '中教' : '外教'}}[{{c.week | replaceWeek}}]</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="item pb-20">
          <div class="h-60 border-bottom font18">设定新的中教、外教</div>
          <div class="search-box o-hidden pt-15 pb-20">
            <div class="pull-left h-40 width-200">
              按照中教、外教查询
            </div>
            <div class="pull-left">
              <div class="o-hidden mb-10"
                   v-show="itermType!=3||(itermType==3&&chooseChineseTeacher==true)">
                <span class="pull-left display-block h-40" style="width:100px;">选择中教：</span>
                <div class="pull-left" v-show="classInfo.length>0">
                  <v-teacherchinese
                    getDefault="true"
                    @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>
                </div>
                <div class="pull-left ml-20" v-show="itermType==3&&chooseChineseTeacher==true">
                  <el-button type="success" @click="chooseChineseTeacher=false">切换到外教</el-button>
                </div>
              </div>
              <div class="o-hidden"
                   v-show="itermType!=3||(itermType==3&&chooseChineseTeacher==false)">
                <span class="pull-left display-block h-40" style="width:100px;">选择外教：</span>
                <div class="pull-left">
                  <v-teacherforeign
                    getDefault="true"
                    @childChooseTeacher="chooseForeignTeacher"></v-teacherforeign>
                </div>
                <div class="pull-left ml-20" v-show="itermType==3&&chooseChineseTeacher==false">
                  <el-button type="success" @click="chooseChineseTeacher=true">切换到中教</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="h-80 border-bottom o-hidden">
            <div class="pull-left width-200">
              <span>选择课程开始时间：</span>
            </div>
            <div class="pull-left">
              <el-date-picker class="width-300"
                              v-model="startTime"
                              value-format="yyyy-MM-dd"
                              type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
          <div class="o-hidden mt-20 pb-20 border-bottom">
            <div class="pull-left width-200">备注给中教：</div>
            <div class="pull-left">
              <el-input type="textarea" class="width-500"
                        :rows="8" v-model="toChinese"
                        placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="o-hidden mt-20 mb-20">
            <div class="pull-left width-200">备注给外教：</div>
            <div class="pull-left">
              <el-input type="textarea" class="width-500"
                        :rows="8" v-model="toTutor"
                        placeholder="请输入内容"></el-input>
            </div>
          </div>
        </div>

        <div class="item o-hidden t-center">
          <div class="pt-10 pb-10">
            <el-button type="success" class="width-200" @click="_classChangeTutor">确认</el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {getOneClass, classChangeTutor} from '../../../api/aom.js';
  import {sfTools} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';
  import TeacherForeign from '../components/teacher_foreign.vue';
  import TeacherChinese from '../components/teacher_chinese.vue';

  export default {
    data() {
      return {
        classInfo: [],
        startTime: '',
        toChinese: '',
        toTutor: '',
        obj: {},
        chineseTeacherInfoIds: [],
        chineseTeacherInfoNames: [],
        foreignTeacherInfoIds: [],
        foreignTeacherInfoNames: [],
        itermType: 0,
        chooseChineseTeacher: true
      }
    },
    created() {
      this.startTime = sfTools.getDateFromTimestamp(new Date().getTime());
      this.classId = this.$route.query.classId;
      this._getOneClass();
    },
    methods: {
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
        this.chineseTeacher = teacherId;
      },
      chooseForeignTeacher(bumenId, daquId, teamId, teacherId){
        this.foreignTeacher = teacherId;
      },
      //单个班级查询
      _getOneClass() {
        getOneClass(this.classId).then((res) => {
          this.classInfo.push(res.data);
          console.log(this.classInfo);
          this.itermType = this.classInfo[0].itermType
          //alert(this.itermType)
          //this.startTime = this.classInfo[0].startTime.substring(0, 10);
          let a = [];
          a.push(this.classInfo[0].chineseTeacherRegionId);
          a.push(this.classInfo[0].chineseTeacherGroupId);
          a.push(this.classInfo[0].chineseTeacherId);
          this.chineseTeacherInfoIds = a;
          let b = [];
          b.push(this.classInfo[0].chineseTeacherRegionName);
          b.push(this.classInfo[0].chineseTeacherGroupName);
          b.push(this.classInfo[0].chineseTeacherName);
          this.chineseTeacherInfoNames = b;
          let c = [];
          c.push(this.classInfo[0].foreignTeacherRegionId);
          c.push(this.classInfo[0].foreignTeacherGroupId);
          c.push(this.classInfo[0].foreignTeacherId);
          this.foreignTeacherInfoIds = c;
          let d = [];
          d.push(this.classInfo[0].foreignTeacherRegionName);
          d.push(this.classInfo[0].foreignTeacherGroupName);
          d.push(this.classInfo[0].foreignTeacherName);
          this.foreignTeacherInfoNames = d;
          console.log(a, b, c, d);
          console.log(this.chineseTeacherInfoIds, this.chineseTeacherInfoNames, this.foreignTeacherInfoIds, this.foreignTeacherInfoNames);
        });
      },

      //班级换老师
      _classChangeTutor() {
        var obj = {
          classId: parseInt(this.classId),
//          chineseTutor: this.chineseTeacher,
//          foreignTutor: this.foreignTeacher,
          fromDate: this.startTime,
          toChinese: this.toChinese,
          toTutor: this.toTutor
        };
        console.log(this.classInfo);
        console.log(obj)
        if (this.itermType == 3) {
          if (this.chooseChineseTeacher) {
            if (obj.chineseTutor == null) {
              this.$message({type: 'error', message: '请完整填写信息'});
              return false;
            }
            obj.chineseTutor = this.chineseTeacher
          } else {
            if (obj.foreignTutor === null) {
              this.$message({type: 'error', message: '请完整填写信息'});
              return false;
            }
            obj.foreignTutor = this.foreignTeacher
          }
//          this.$message({type: 'error', message: '体验课只能选择一个中教或者一个外教'});
//          return false;
        } else {
          obj.chineseTutor = this.chineseTeacher
          obj.foreignTutor = this.foreignTeacher
          if (obj.chineseTutor === null || obj.foreignTutor === null) {
            this.$message({type: 'error', message: '请完整填写信息'});
            return false;
          }
        }
        if (obj.chineseTutor === this.classInfo[0].chineseTeacherId && obj.foreignTutor === this.classInfo[0].foreignTeacherId) {
          this.$message({type: 'error', message: '请选择更换的老师'});
          return false;
        } else if (obj.fromDate === null) {
          this.$message({type: 'error', message: '请完整填写信息'});
          return false;
        } else {
          console.log(obj);
          classChangeTutor(obj).then((res) => {
            console.log(res);
            //return;
            var _this = this;
            this.$message({
              type: 'success', message: '操作成功!', onClose: function () {
                _this.$router.push({path: '/aom/class-change-teacher-result', query: {id: res.data.data.id}});
              }
            });
          });
        }
      },

      reload() {
        this.$router.go(0);
      }

    },
    components: {
      'v-pagetitle': PageTitle,
      'v-teacherforeign': TeacherForeign,
      'v-teacherchinese': TeacherChinese
    },
    filters: {
      timestampToDate: function (timestamp) {
        return sfTools.getDateFromTimestamp(timestamp);
      },
      substring10: function (a) {
        if (a) {
          return a.substring(0, 10);
        }
      },
      replaceWeek: function (a) {
        return sfTools.replaceWeek(a);
      }
    },
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
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
