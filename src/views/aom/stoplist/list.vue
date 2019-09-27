<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>
      <div class="search-box o-hidden pb-15 mt-20">
        <div class="pull-left">
          <el-input v-model="obj.phone" style="width:200px;" placeholder="绑定手机号"></el-input>
          <el-input v-model="obj.sname" style="width:200px;" placeholder="中文名字"></el-input>
          <el-input v-model="obj.sename" style="width:200px;" placeholder="英文名字"></el-input>
        </div>
        <div class="pull-right">
          <!--<el-button type="success" class="width-100" @click="searchClasses">查询</el-button>-->
        </div>
      </div>
      <div class="search-box o-hidden pb-20 border-bottom">
        <div class="pull-left">
          <el-select class="width-200" v-model="obj.grade" placeholder="级别">
            <el-option v-for="item in gradeArray" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
          <el-select class="width-200" v-model="startTime" placeholder="停课开始时间">
            <el-option label="由近到远" value="由近到远"></el-option>
            <el-option label="由远到近" value="由远到近"></el-option>
            <el-date-picker v-model="startTime"
                            align="left" type="date"
                            placeholder="选择具体日期"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-select>
          <el-select class="width-200" v-model="endTime" placeholder="停课结束时间">
            <el-option label="由近到远" value="由近到远"></el-option>
            <el-option label="由远到近" value="由远到近"></el-option>
            <el-date-picker v-model="endTime"
                            align="left" type="date"
                            placeholder="选择具体日期"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-select>
        </div>
        <div class="pull-right">
          <el-button type="success" class="width-100" @click="search">查询</el-button>
        </div>
      </div>

      <div class="mt-20">
        <el-table :data="list" border style="width: 100%">
          <el-table-column label="原归属人">
            <template slot-scope="scope">{{scope.row.udept}} - {{scope.row.uname}}</template>
          </el-table-column>
          <el-table-column label="现归属人" v-if="stage==2&&stat==0">
            <template slot-scope="scope">{{scope.row.currentUserInfo}}</template>
          </el-table-column>
          <el-table-column label="中文名字">
            <template slot-scope="scope">{{scope.row.sname}}</template>
          </el-table-column>
          <el-table-column label="英文名字">
            <template slot-scope="scope">{{scope.row.sename}}</template>
          </el-table-column>
          <el-table-column label="绑定手机">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="剩余课时">
            <template slot-scope="scope">{{scope.row.periods}}</template>
          </el-table-column>
          <el-table-column label="级别">
            <template slot-scope="scope">{{scope.row.grade}}</template>
          </el-table-column>
          <el-table-column label="停课开始时间">
            <template slot-scope="scope">{{scope.row.startTime | sub10}}</template>
          </el-table-column>
          <el-table-column label="停课结束时间">
            <template slot-scope="scope">{{scope.row.endTime | sub10}}</template>
          </el-table-column>
          <el-table-column label="恢复上课的操作时间" v-if="stat==1">
            <template slot-scope="scope">{{scope.row.updateTime | sub10}}</template>
          </el-table-column>
          <el-table-column label="排课" v-if="stage==2&&stat==0">
            <template slot-scope="scope">
              <el-button type="success"
                         size="mini"
                         @click="gotoArrangeClassPage(scope.row.periods,scope.row.id,scope.row.ruserId)">确定
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="list.length>0" class="mt-20 mb-20 t-center">
          <el-pagination background
                         layout="prev,pager,next,sizes"
                         :page-size="obj.rows"
                         :page-sizes="[10,20,30,50]"
                         :current-page.sync="obj.page"
                         :total="total"
                         @size-change="handleSizeChange"
                         @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PageTitle from '../components/pagetitle.vue';
  import {sfTools, sfData} from '../util.js';
  import {getClassRuserSuspend} from '../../../api/aom.js';
  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        obj: {
          phone: '',
          sname: '',
          sename: '',
          grade: '',
          page: 1,
          rows: 10,
        },
        gradeArray: [0, 1, 2, 3, 4, 5, 6],
        startTime: '',
        endTime: '',
        list: [],
        total: 0
      }
    },
    created() {
      this.name = this.$route.query.name;
      this.stage = this.$route.query.stage;
      this.stat = this.$route.query.stat;
      console.log(this.name);
      console.log(this.stage);
      console.log(this.stat);
      this.title = `停课名单 > ${this.name}`;
      this.search();
    },
    methods: {
      currentChange(val) {
        this.obj.page = val;
        this.search();
      },
      handleSizeChange(e){
        this.obj.rows = e;
        this.search();
      },
      gotoArrangeClassPage(periodNum, classRuserSuspendId, ruserId){
        this.$router.push({
          path: '/aom/arrangeclass',
          query: {
            periodNum: periodNum,
            classRuserSuspendId: classRuserSuspendId,
            ruserId: ruserId
          }
        });
      },
      search(){
        this.obj.stage = this.stage;
        this.obj.stat = this.stat;
        if (this.startTime) {
          if (this.startTime == '由近到远') {
          } else if (this.startTime == '由远到近') {
          } else {
            this.obj.startTime = this.startTime;
          }
        }
        if (this.endTime) {
          if (this.endTime == '由近到远') {
          } else if (this.endTime == '由远到近') {
          } else {
            this.obj.endTime = this.endTime;
          }
        }
        console.log(this.obj);
        getClassRuserSuspend(this.obj).then((res) => {
          this.list = res.data.records;
          this.total = res.data.total;
          console.log(this.total);
        });
      }
    },
    filters: {
      sub10: function (a) {
        if (a) {
          return a.substring(0, 10);
        }
      }
    }
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
        li {
          width: 150px;
          height: 150px;
          border-radius: 10px;
          background: #f6f6f6;
          margin: 0 20px 20px 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          align-content: center;
          div {
            width: 100%;
            padding: 0 20px;
          }
          .i {
            font-style: normal;
            color: $color-orange;
            width: 100%;
            display: block;
          }
        }
      }
    }
  }
</style>
