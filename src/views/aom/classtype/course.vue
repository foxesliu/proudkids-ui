<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>
      <div class="h-50 border-bottom pl-20 pr-20">查看课件</div>
      <div class="con p-20">
        <div class="table">
          <el-table :data="list" border style="width: 100%">
            <el-table-column label="授课老师" width="200">
              <template slot-scope="scope">
                {{scope.row.teacherType == 1 ? '外教' : '中教'}}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="课节名称" width="150"></el-table-column>
            <el-table-column label="课件">
              <template slot-scope="scope">
                <div class="o-hidden">
                  <div class="pull-left" style="max-width:70%">
                    <p class="m-0 p-0">
                      <span>上课课件：</span>
                      <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='0'">{{it.name}}</span>
                    </p>
                    <p class="m-0 p-0">
                      <span>预习资料：</span>
                      <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='1'">{{it.name}}</span>
                    </p>
                    <p class="m-0 p-0">
                      <span>复习资料：</span>
                      <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='2'">{{it.name}}</span>
                    </p>
                    <p class="m-0 p-0">
                      <span>读本：</span>
                      <span class="mr-20" v-for="it in scope.row.coursewares" v-if="it.type=='3'">{{it.name}}</span>
                    </p>
                  </div>
                  <div class="pull-left" style="width:28%;margin-left:2%;">
                    <div class="h-80">
                      <a v-if="scope.row.coursewares"
                         :href="'/aom/lesson/downloadZip/'+scope.row.lessonId"
                         target="_blank">
                        <el-button type="success" size="mini"><i class="el-icon-download"></i> 打包下载</el-button>
                      </a>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="day" label="对应日期" width="200">
              <template slot-scope="scope">
                {{scope.row.day}}（{{scope.row.week | replaceWeek}}）
              </template>
            </el-table-column>
            <!--<el-table-column label="对应日期" width="420">-->
            <!--<template slot-scope="scope">-->
            <!--<div class="o-hidden">-->
            <!--<div class="pull-left" style="max-width:52%">-->
            <!--<el-date-picker v-model="dateList[scope.$index]" type="date"-->
            <!--placeholder="选择日期">-->
            <!--</el-date-picker>-->
            <!--</div>-->
            <!--<div class="pull-left" style="width:40%;margin-left:5%;">-->
            <!--<el-button type="success" @click="changeDate(scope.$index)"><i class="el-icon-plus"></i> 修改日期-->
            <!--</el-button>-->
            <!--</div>-->
            <!--</div>-->
            <!--</template>-->
            <!--</el-table-column>-->
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getLessonSByClassTypeId, downloadLessonZip} from '../../../api/aom.js';
  import {sfTools} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        list: [],
        dateList: []
      }
    },
    created() {
      this.classTypeId = this.$route.query.classTypeId;
      this.status = this.$route.query.status;  //status班级类型过期状态 0：未过期 1：已过期
      this.pTitle = this.status == '0' ? '进行中' : '过期';
      this.title = `班级类型设置 > ${this.pTitle}的班级类型 > 查看课件`;
      this._getLessonSByClassTypeId();
    },
    methods: {
      _getLessonSByClassTypeId() {
        getLessonSByClassTypeId(this.classTypeId).then((res) => {
          this.list = res.data.records;
          console.log(this.list);
          var tmpDate = [];
          for (var i = 0; i < this.list.length; i++) {
            tmpDate.push(this.list[i]['day']);
          }
          this.dateList = tmpDate;
          //console.log(this.dateList);
        });
      }
    },
    filters: {
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
      .course-container {
        span {
          display: block;
        }
        padding-top: 20px;
        .el-table .warning-row {
          background: oldlace;
        }
        .el-table .success-row {
          background: #f0f9eb;
        }
      }
    }
  }
</style>
