<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="教务 > 班级管理 > 学生更换老师 > 结果页"></v-pagetitle>
      <div class="addclass-box">

        <div class="item">
          <div class="pb-20">
            <div class="h-60 font18 border-bottom mb-20">原班级情况</div>
            <el-table :data="oldinfo" border style="width: 100%">
              <el-table-column label="课程类型">
                <template slot-scope="scope">{{scope.row.itermType == '1' ? '长期课程' : '短期课程'}}</template>
              </el-table-column>
              <el-table-column label="班级创建时间">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
              </el-table-column>
              <el-table-column label="中教老师">
                <template slot-scope="scope">{{scope.row.chineseTeacherRegionName}}-{{scope.row.chineseTeacherGroupName}}-{{scope.row.chineseTeacherName}}</template>
              </el-table-column>
              <el-table-column label="外教老师">
                <template slot-scope="scope">{{scope.row.foreignTeacherRegionName}}-{{scope.row.foreignTeacherGroupName}}-{{scope.row.foreignTeacherName}}</template>
              </el-table-column>
              <el-table-column label="班级类型名称">
                <template slot-scope="scope">{{scope.row.classTypeName}}</template>
              </el-table-column>
              <el-table-column label="上课时间">
                <template slot-scope="scope">{{scope.row.classTime}}</template>
              </el-table-column>
              <el-table-column label="班级开始日期">
                <template slot-scope="scope">{{scope.row.startTime | sub10}}</template>
              </el-table-column>
              <el-table-column label="班级结束日期">
                <template slot-scope="scope">{{scope.row.endTime | sub10}}</template>
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

        <div class="item">
          <div class="pb-20">
            <div class="h-60 font18 border-bottom mb-20">现班级情况</div>
            <el-table :data="newinfo" border style="width: 100%">
              <el-table-column label="课程类型">
                <template slot-scope="scope">{{scope.row.itermType == '1' ? '长期课程' : '短期课程'}}</template>
              </el-table-column>
              <el-table-column label="班级创建时间">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
              </el-table-column>
              <el-table-column label="中教老师">
                <template slot-scope="scope">{{scope.row.chineseTeacherRegionName}}-{{scope.row.chineseTeacherGroupName}}-{{scope.row.chineseTeacherName}}</template>
              </el-table-column>
              <el-table-column label="外教老师">
                <template slot-scope="scope">{{scope.row.foreignTeacherRegionName}}-{{scope.row.foreignTeacherGroupName}}-{{scope.row.foreignTeacherName}}</template>
              </el-table-column>
              <el-table-column label="班级类型名称">
                <template slot-scope="scope">{{scope.row.classTypeName}}</template>
              </el-table-column>
              <el-table-column label="上课时间">
                <template slot-scope="scope">{{scope.row.classTime}}</template>
              </el-table-column>
              <el-table-column label="班级开始日期">
                <template slot-scope="scope">{{scope.row.startTime | sub10}}</template>
              </el-table-column>
              <el-table-column label="班级结束日期">
                <template slot-scope="scope">{{scope.row.endTime | sub10}}</template>
              </el-table-column>
              <el-table-column label="班级人数">
                <template slot-scope="scope">{{scope.row.currentNumber}}</template>
              </el-table-column>
              <el-table-column label="每周上课时间">
                <template slot-scope="scope"><span class="mr-10 pull-left"
                                                   v-for="c in scope.row.teacherWeektime">{{c.teacherType == '0' ? '中教' : '外教'}}[{{c.week | replaceWeek}}]</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="item">
          <div class="h-80 border-bottom o-hidden">
            <div class="pull-left width20">
              <span>课程开始时间：</span>
            </div>
            <div class="pull-left">
              {{info.startTime | timestampToDate}}
            </div>
          </div>
          <div class="o-hidden mt-20 pb-20 border-bottom">
            <div class="pull-left width20 lh-30">备注给中教：</div>
            <div class="pull-left width80 lh-30">
              {{info.toChinese}}
            </div>
          </div>
          <div class="o-hidden mt-20 mb-20">
            <div class="pull-left width20 lh-30">备注给外教：</div>
            <div class="pull-left width80 lh-30">
              {{info.toTutor}}
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import {getInfoByStudentReplaceTeacher, getOneClass} from '../../../api/aom.js';
  import PageTitle from '../components/pagetitle.vue';
  import {sfTools} from '../util.js';

  export default {
    data() {
      return {
        oldinfo: [],
        newinfo: [],
        info: {}
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.sourceStr = this.$route.query.sourceStr;  //原班级ID
      this.targetStr = this.$route.query.targetStr;
      this._getOldClass();
      this._getNewClass();
      this._getInfoByStudentReplaceTeacher();
    },
    methods: {
      _getOldClass() {
        getOneClass(this.sourceStr).then((res) => {
          this.oldinfo.push(res.data);
          console.log(this.oldinfo);
        })
      },
      _getNewClass() {
        getOneClass(this.targetStr).then((res) => {
          this.newinfo.push(res.data);
          console.log(this.newinfo);
        })
      },

      _getInfoByStudentReplaceTeacher() {
        getInfoByStudentReplaceTeacher(this.id).then((res) => {
          this.info = res.data;
          console.log(this.info);
        })
      }
    },
    components: {
      'v-pagetitle': PageTitle
    },
    filters: {
      timestampToDate: function (timestamp) {
        return sfTools.getDateFromTimestamp(timestamp);
      },
      sub10: function (a) {
        if (a) {
          return a.substring(0, 10);
        }
      },
      replaceWeek: function (a) {
        return sfTools.replaceWeek(a);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
