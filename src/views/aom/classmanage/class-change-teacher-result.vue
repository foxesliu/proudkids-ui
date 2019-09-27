<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="教务 > 班级管理 > 班级更换老师 > 结果页"></v-pagetitle>
      <div class="addclass-box">

        <div class="item">
          <div class="pb-20">
            <div class="h-60 font18 border-bottom mb-20">原班级情况</div>
            <el-table :data="info" border style="width: 100%">
              <el-table-column label="课程类型">
                <template slot-scope="scope">{{scope.row.itermType == '1' ? '长期课程' : '短期课程'}}</template>
              </el-table-column>
              <el-table-column label="班级创建时间">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
              </el-table-column>
              <el-table-column label="中教老师">
                <template slot-scope="scope">{{scope.row.oldChinese}}</template>
              </el-table-column>
              <el-table-column label="外教老师">
                <template slot-scope="scope">{{scope.row.oldForeign}}</template>
              </el-table-column>
              <el-table-column label="班级类型名称">
                <template slot-scope="scope">{{scope.row.classTypeName}}</template>
              </el-table-column>
              <el-table-column label="上课时间">
                <template slot-scope="scope">{{scope.row.classtime}}</template>
              </el-table-column>
              <el-table-column label="班级开始日期">
                <template slot-scope="scope">{{scope.row.classStartDate | timestampToDate}}</template>
              </el-table-column>
              <el-table-column label="班级结束日期">
                <template slot-scope="scope">{{scope.row.classEndDate | timestampToDate}}</template>
              </el-table-column>
              <el-table-column label="班级人数">
                <template slot-scope="scope">{{scope.row.currentNumber}}</template>
              </el-table-column>
              <el-table-column label="每周上课时间">
                <template slot-scope="scope">{{scope.row.weektime.desc}}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="item">
          <div class="pb-20">
            <div class="h-60 font18 border-bottom mb-20">现班级情况</div>
            <el-table :data="info" border style="width: 100%">
              <el-table-column label="课程类型">
                <template slot-scope="scope">{{scope.row.itermType == '1' ? '长期课程' : '短期课程'}}</template>
              </el-table-column>
              <el-table-column label="班级创建时间">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
              </el-table-column>
              <el-table-column label="中教老师">
                <template slot-scope="scope">{{scope.row.newChinese}}</template>
              </el-table-column>
              <el-table-column label="外教老师">
                <template slot-scope="scope">{{scope.row.newForeign}}</template>
              </el-table-column>
              <el-table-column label="班级类型名称">
                <template slot-scope="scope">{{scope.row.classTypeName}}</template>
              </el-table-column>
              <el-table-column label="上课时间">
                <template slot-scope="scope">{{scope.row.classtime}}</template>
              </el-table-column>
              <el-table-column label="班级开始日期">
                <template slot-scope="scope">{{scope.row.classStartDate | timestampToDate}}</template>
              </el-table-column>
              <el-table-column label="班级结束日期">
                <template slot-scope="scope">{{scope.row.classEndDate | timestampToDate}}</template>
              </el-table-column>
              <el-table-column label="班级人数">
                <template slot-scope="scope">{{scope.row.currentNumber}}</template>
              </el-table-column>
              <el-table-column label="每周上课时间">
                <template slot-scope="scope">{{scope.row.weektime.desc}}</template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="item">
          <div class="h-80 border-bottom o-hidden">
            <div class="pull-left width20">
              <span>课程开始时间：</span>
            </div>
            <div class="pull-left" v-if="info.length>0">
              {{info[0].classStartDate | timestampToDate}}
            </div>
          </div>
          <div class="o-hidden mt-20 pb-20 border-bottom">
            <div class="pull-left width20 lh-30">备注给中教：</div>
            <div class="pull-left width80 lh-30" v-if="info.length>0">
              {{info[0].toChinese}}
            </div>
          </div>
          <div class="o-hidden mt-20 mb-20">
            <div class="pull-left width20 lh-30">备注给外教：</div>
            <div class="pull-left width80 lh-30" v-if="info.length>0">
              {{info[0].toTutor}}
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import {getInfoByClassReplaceTeacher} from '../../../api/aom.js';
  import PageTitle from '../components/pagetitle.vue';
  import {sfTools} from '../util.js';

  export default {
    data() {
      return {
        info: []
      }
    },
    created() {
      this.id = this.$route.query.id;
      this._getInfoByClassReplaceTeacher();
    },
    methods: {
      _getInfoByClassReplaceTeacher() {
        getInfoByClassReplaceTeacher(this.id).then((res) => {
          this.info.push(res.data);
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
