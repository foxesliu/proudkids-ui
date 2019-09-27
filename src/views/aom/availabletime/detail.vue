<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>
      <div class="addclass-box">
        <!--<div class="h-40">范围：中教一区 - 中教一组</div>-->
        <div class="h-40 mb-20" v-if="weekpoint">时间范围：{{weekpoint | replaceWeeks}} - {{timeslot}}</div>
        <el-table :data="list" border style="width: 100%">
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span class="color-green" v-if="grade==null">未安排</span>
              <span class="color-orange" v-if="grade!=null">已安排</span>
            </template>
          </el-table-column>
          <el-table-column label="老师" width="280">
            <template slot-scope="scope">
              <span>{{scope.row.userDepartment}}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级类型" v-if="grade!=null">
            <template slot-scope="scope">
              <span>{{scope.row.classTypeName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级人数" v-if="grade!=null">
            <template slot-scope="scope">
              <span>{{scope.row.current_number}}/4</span>
            </template>
          </el-table-column>
          <el-table-column label="上课时间">
            <template slot-scope="scope">
              <span>{{scope.row.timeslot}}</span>
            </template>
          </el-table-column>
          <el-table-column label="班级详情" v-if="grade!=null">
            <template slot-scope="scope">
              <el-button size="mini" @click="gotoDetail(scope.row.classId)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {assignedTutors, notAssignedTutors} from '../../../api/aom.js';
  import {sfTools, sfData} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        list: []
      }
    },
    created() {
      this.title = `可用时间 班级查询 > 详情`;
      this.weekpoint = this.$route.query.weekpoint;
      this.timeslot = this.$route.query.timeslot;
      this.grade = this.$route.query.grade;
      if (this.grade !== null) {
        this._assignedTutors();
      } else {
        this._notAssignedTutors();
      }
    },
    methods: {
      _assignedTutors(){
        assignedTutors({
          weekpoint: this.weekpoint, timeslot: this.timeslot, grade: this.grade
        }).then((res) => {
          this.list = res.data;
          console.log(this.list);
        });
      },
      _notAssignedTutors(){
        notAssignedTutors({
          weekpoint: this.weekpoint, timeslot: this.timeslot, grade: this.grade
        }).then((res) => {
          this.list = res.data;
          console.log(this.list);
        });
      },
      gotoDetail(classId) {
        this.$router.push({path: '/aom/classmanage-detail', query: {classId: classId}});
      },
    },
    filters: {
      replaceWeeks: function (a) {
        return sfTools.replaceWeek(a.toString());
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
          padding: 20px;
          border-radius: 10px;
          box-sizing: border-box;
        }
      }
    }
  }

  .aom-week-list {
    .span {
      float: left;
      width: 100px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #ccc;
      border-right: none;
      text-align: center;
      cursor: pointer;
      &.active, &:hover {
        background: #38c546;
        color: white;
      }
      &:last-child {
        border-right: 1px solid #ccc;
      }
    }
  }
</style>
