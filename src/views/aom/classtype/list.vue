<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>

      <div class="con p-20">
        <!--<div class="title o-hidden border-bottom pb-20 mb-20" v-show="status=='0'">-->
          <!--<div class="pull-right">-->
            <!--<el-button type="primary" class="width-150"-->
                       <!--@click="gotoAdd()">-->
              <!--<i class="el-icon-plus"></i> 新增班级类型-->
            <!--</el-button>-->
          <!--</div>-->
        <!--</div>-->

        <div class="search-box o-hidden">
          <div class="pull-left">
            <el-select v-model="classTypeId" placeholder="班级类型名称">
              <el-option v-for="item in classTypeItems" :key="item.classTypeId" :label="item.name"
                         :value="item.classTypeId"></el-option>
            </el-select>
            <el-select v-show="weekTimeItems.length>0" v-model="weektimeId" placeholder="每周上课时间">
              <el-option v-for="item in weekTimeItems" :key="item.id"
                         :label="(item.jsonStr)|getDescByJson"
                         :value="item.id"></el-option>
            </el-select>
            <el-select v-model="grade" placeholder="级别">
              <el-option v-for="item in gradeList" :key="item.id" :label="item.str" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="pull-right">
            <el-button type="warning" class="width-150" @click="_getClassType">查询</el-button>
          </div>
        </div>
        <div class="table mt-15">
          <el-table :data="list" border style="width: 100%">
            <el-table-column prop="name" label="班级类型名称"></el-table-column>
            <el-table-column label="每周上课时间">
              <template slot-scope="scope">
                <!--{{scope.row.weektime | getDescByJson}}-->
                <span class="display-block"
                      v-for="x in scope.row.weekTimeList">{{x.week | replaceWeek}} {{x.teacherType | replaceTeacherType}} </span>
              </template>
            </el-table-column>
            <el-table-column label="课程类型">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 1">长期课</span>
                <span v-if="scope.row.type == 2">短期课</span>
                <span v-if="scope.row.type == 3">体验课</span>
              </template>
            </el-table-column>
            <el-table-column prop="grade" label="级别"></el-table-column>
            <el-table-column label="班级开始日期">
              <template slot-scope="scope">
                {{scope.row.startTime | timestampToDate}}
              </template>
            </el-table-column>
            <el-table-column label="班级结束日期">
              <template slot-scope="scope">
                {{scope.row.endTime | timestampToDate}}
              </template>
            </el-table-column>
            <el-table-column prop="classNum" label="生成的班级"></el-table-column>
            <el-table-column prop="address" label="课件">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="gotoLessonListPage(scope.row.classTypeId)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary"
                           @click="gotoEdit(scope.row.classTypeId,scope.row.stat,scope.row.type)">编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getClassTypeItems, getWeekTimeItems, getClassType, getLessonSByClassTypeId} from '../../../api/aom.js';
  import {sfTools, sfData} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';

  export default {
    components: {
      'v-pagetitle': PageTitle
    },
    data() {
      return {
        list: [],
        classTypeItems: [],
        classTypeId: '',
        weekTimeItems: [],
        weektimeId: '',
        gradeList: sfData.gradeList,
        grade: ''
      }
    },
    created() {
      this.name = this.$route.query.name;
      this.status = this.$route.query.status;  //status班级类型过期状态 0：未过期 1：已过期
      this.type = this.$route.query.type;  //type班级类型长短期 1：长期 2：短期
      this.title = `班级类型设置 > ${this.name}`;
      this._getClassTypeItems();
      this._getWeekTimeItems();
      this._getClassType();
    },
    methods: {
      //班级类型items，下拉菜单
      _getClassTypeItems() {
        getClassTypeItems().then((res) => {
          this.classTypeItems = res.data;
          //console.log(this.classTypeItems);
        })
      },

      //每周上课时间
      _getWeekTimeItems() {
        getWeekTimeItems().then((res) => {
          this.weekTimeItems = res.data;
          console.log(this.weekTimeItems);
        });
      },

      //班级类型检索
      _getClassType() {
        let obj = {
          status: this.status,  //班级类型过期状态 0：未过期 1：已过期
          type: this.type,  //班级类型长短期 1：长期 2：短期
          classTypeId: this.classTypeId,
          weektimeId: this.weektimeId,
          grade: this.grade
        };
        getClassType(obj).then((res) => {
          this.list = res.data;
          console.log(this.list);
        })
      },
      getData() {
        alert('getData');
      },
      handleClick() {
        alert('button click');
      },
      gotoLessonListPage(classTypeId) {
        this.$router.push({path: '/aom/classtype-course', query: {classTypeId: classTypeId, status: this.status}});
      },
      gotoAdd() {
        this.$router.push({path: '/aom/classtype-add'});
      },
      gotoEdit(classTypeId, stat, type) {
        //alert(classTypeId + "|" + stat + "|" + type);
        this.$router.push({
          path: '/aom/classtype-edit',
          query: {classTypeId: classTypeId, stat: stat, type: type}
        });
      },
      classTypeClick() {
        alert('classTypeClick')
      }
    },
    filters: {
      timestampToDate: function (timestamp) {
        return sfTools.getDateFromTimestamp(timestamp);
      },
      getDescByJson: function (json) {
        return JSON.parse(json).desc;
      },
      replaceWeek: function (a) {
        if (a !== null) {
          return sfTools.replaceWeek(a);
        }
      },
      replaceTeacherType: function (a) {
        if (a !== null) {
          return sfTools.replaceTeacherType(a);
        }
      }
    },
    mounted() {
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
