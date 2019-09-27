<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle :title="title"></v-pagetitle>
      <div class="con pt-20">

        <div class="search-box o-hidden">
          <div class="pull-left">
            <el-select v-model="obj.classTypeId" class="width-150" placeholder="Type">
              <el-option v-for="item in classTypeList"
                         :key="item.classTypeId" :label="item.name"
                         :value="item.classTypeId"></el-option>
            </el-select>
            <el-select class="width-150" v-model="obj.grade" placeholder="Level">
              <el-option v-for="item in gradeArray" :key="item" :label="item"
                         :value="item"></el-option>
            </el-select>

            <el-select class="width-150" v-model="obj.currentNumber" placeholder="Students">
              <el-option v-for="item in classNumberArray" :key="item" :label="item"
                         :value="item"></el-option>
            </el-select>
            <el-select class="width-150" v-show="weekTimeItems.length>0"
                       v-model="obj.weektimeId"
                       placeholder="Time">
              <el-option v-for="item in weekTimeItems" :key="item.id"
                         :label="(item.jsonStr)|getDescByJson"
                         :value="item.id"></el-option>
            </el-select>

            <el-select class="width-150" v-model="obj.classTime" placeholder="School Time">
              <el-option v-for="item in classTimeArray" :key="item" :label="item"
                         :value="item"></el-option>
            </el-select>

            <el-date-picker value-format="yyyy-MM-dd"
                            style="width:180px;"
                            v-model="obj.startTime" type="date"
                            placeholder="体验课开课时间">
            </el-date-picker>

            <!--<el-input v-model="input" style="width:200px;" placeholder="班级号（暂无）"></el-input>-->
          </div>
        </div>

        <div class="search-box111 o-hidden pt-15">
          <div class="pull-left width80">
            <div class="pull-left">
              <div class="o-hidden">
                <span class="pull-left display-block h-40" style="width:50px;">CT</span>
                <div class="pull-left">
                  <v-teacherchinese ref="teacherchinese" @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>
                </div>
              </div>
              <div class="o-hidden mt-10">
                <span class="pull-left display-block h-40" style="width:50px;">FT</span>
                <div class="pull-left">
                  <v-teacherforeign ref="teacherforeign" @childChooseTeacher="chooseForeignTeacher"></v-teacherforeign>
                </div>
              </div>
            </div>
          </div>
          <div class="pull-right width20 t-right mt-15">
            <div>
              <el-button type="danger" class="width-100" @click="clear">Reset</el-button>
            </div>
            <div class="mt-15">
              <el-button type="success" class="width-100" @click="searchClasses">Search</el-button>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>

        <div class="search-box o-hidden">
          <div class="mt-15">
            <el-input v-model="obj.name"
                      style="width:150px;" placeholder="Class Name"></el-input>
            <el-input v-model="obj.chineseTeacherName"
                      style="width:150px;" placeholder="CT Name"></el-input>
            <el-input v-model="obj.foreignTeacherName"
                      style="width:150px;" placeholder="FT Name"></el-input>

          </div>

          <!--<div class="pull-left">-->
          <!--<div>-->
          <!--<el-select class="width-150" v-model="formInline1.getTime" placeholder="班级创建时间">-->
          <!--<el-option label="由近到远" value="由近到远"></el-option>-->
          <!--<el-option label="由远到近" value="由远到近"></el-option>-->
          <!--<el-date-picker v-model="formInline1.getTime"-->
          <!--align="left" type="date" placeholder="选择具体日期"-->
          <!--value-format="yyyy-MM-dd" :picker-options="pickerOptions1">-->
          <!--</el-date-picker>-->
          <!--</el-select>-->
          <!--<el-select class="width-150" v-model="formInline2.getTime" placeholder="班级开始日期">-->
          <!--<el-option label="由近到远" value="由近到远"></el-option>-->
          <!--<el-option label="由远到近" value="由远到近"></el-option>-->
          <!--<el-date-picker v-model="formInline2.getTime" align="left" type="date" placeholder="选择具体日期"-->
          <!--value-format="yyyy-MM-dd" :picker-options="pickerOptions1">-->
          <!--</el-date-picker>-->
          <!--</el-select>-->
          <!--<el-select class="width-150" v-model="formInline3.getTime" placeholder="班级结束日期">-->
          <!--<el-option label="由近到远" value="由近到远"></el-option>-->
          <!--<el-option label="由远到近" value="由远到近"></el-option>-->
          <!--<el-date-picker v-model="formInline3.getTime"-->
          <!--align="left" type="date" placeholder="选择具体日期"-->
          <!--value-format="yyyy-MM-dd" :picker-options="pickerOptions1">-->
          <!--</el-date-picker>-->
          <!--</el-select>-->
          <!--</div>-->
          <!---->
          <!--</div>-->
          <!--<div class="pull-right">-->

          <!--</div>-->
        </div>

        <div class="table mt-20 border-top pt-20">
          <el-table :data="list" border style="width: 100%">
            <el-table-column align="center" prop="name" label="Class Name"></el-table-column>
            <!--<el-table-column label="班级创建时间" width="120">-->
            <!--<template slot-scope="scope">-->
            <!--{{scope.row.createTime | timestampToDate}}-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="CT">
              <template slot-scope="scope">
                <el-popover v-if="scope.row.chineseTeacherRegionName" trigger="hover" placement="top">
                  <span>{{scope.row.chineseTeacherRegionName}} - {{scope.row.chineseTeacherGroupName}} - {{scope.row.chineseTeacherName}}</span>
                  <div slot="reference" class="name-wrapper">
                    <el-button size="mini">{{scope.row.chineseTeacherName}}</el-button>
                    <!--<el-tag size="medium">{{scope.row.ccName | getName}}</el-tag>-->
                  </div>
                </el-popover>
                <span v-if="!scope.row.chineseTeacherRegionName">-</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="FT">
              <template slot-scope="scope">
                <el-popover v-if="scope.row.foreignTeacherRegionName" trigger="hover" placement="top">
                  <span>{{scope.row.foreignTeacherRegionName}} - {{scope.row.foreignTeacherGroupName}} - {{scope.row.foreignTeacherName}}</span>
                  <div slot="reference" class="name-wrapper">
                    <el-button size="mini">{{scope.row.foreignTeacherName}}</el-button>
                    <!--<el-tag size="medium">{{scope.row.ccName | getName}}</el-tag>-->
                  </div>
                </el-popover>
                <span v-if="!scope.row.foreignTeacherRegionName">-</span>
              </template>
            </el-table-column>
            <!--<el-table-column label="课程类型" width="80">-->
            <!--<template slot-scope="scope">-->
            <!--{{scope.row.itermType == '1' ? '长期' : '短期'}}-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" prop="courseName" label="Course Name"></el-table-column>
            <!--<el-table-column prop="classTypeName" label="班级类型名称" width="150"></el-table-column>-->
            <!--<el-table-column align="center" prop="classTime" label="Class Time"></el-table-column>-->
            <el-table-column v-if="itermType!=3" align="center" prop="classTime" label="Class Time"></el-table-column>
            <el-table-column v-if="itermType==3" align="center" label="Class Time">
              <template slot-scope="scope">
                {{scope.row.startTime|sub10}}<br/>{{scope.row.classTime}}
              </template>
            </el-table-column>
            <!--<el-table-column label="班级开始日期" width="120">-->
            <!--<template slot-scope="scope">-->
            <!--{{scope.row.startTime | timestampToDate}}-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="班级结束日期" width="120">-->
            <!--<template slot-scope="scope">-->
            <!--{{scope.row.endTime | timestampToDate}}-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="Students">
              <template slot-scope="scope">{{scope.row.currentNumber}}/4</template>
            </el-table-column>
            <!--<el-table-column label="每周上课时间" width="120">-->
            <!--<template slot-scope="scope">-->
            <!--<span class="mr-10 pull-left"-->
            <!--v-for="c in scope.row.teacherWeektime">{{c.week | replaceWeek}} {{c.teacherType == '0' ? '中教' : '外教'}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" prop="address" label="More">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="gotoDetail(scope.row.classId)">More</el-button>
              </template>
            </el-table-column>
            <!--<el-table-column label="课件">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button size="mini" type="primary" @click="gotoCourse(scope.row.classId)">查看</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="Link">
              <template slot-scope="scope">
                <a :href="scope.row.liveAddr" target="_blank">
                  <el-button size="mini" type="success">Click</el-button>
                </a>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" v-if="isclosed==false">
              <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="close(scope.row.classId,'1')">Close</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="mt-10" v-if="pagination.size>0">
          <el-pagination background
                         layout="prev,pager,next,sizes"
                         :page-size="pagination.size"
                         :page-sizes="[10,20,30,50]"
                         :current-page.sync="pagination.page"
                         :total="pagination.total"
                         @size-change="handleSizeChange"
                         @current-change="currentChange">
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {getClasses, getClassTypeItems, getWeekTimeItems, editOneClass} from '../../../api/aom.js';
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
        pagination: {
          page: 1,
          size: 10,
          total: 0
        },
        title: '',
        list: [],
        classTypeList: [],
        weekTimeItems: [],
        classNumberArray: [0, 1, 2, 3, 4],
        gradeArray: [0, 1, 2, 3, 4, 5, 6],
        isclosed: false,  //是否已关闭
        obj: {
          size: 10,
          pages: 1,
          classTypeId: '',
          currentNumber: '',
          weektimeId: '',
          grade: '',
          classTime: '',
          name: '',
          startTime: ''
        },
        formInline1: {
          getTime: null,
        },
        formInline2: {
          getTime: null,
        },
        formInline3: {
          getTime: null,
        }
      }
    },
    created() {
      this.name = this.$route.query.name;
      this.stage = this.$route.query.stage;
      this.status = this.$route.query.status;
      this.itermType = this.$route.query.type;
      console.log(this.itermType)
      this.title = `教务 > 班级管理 > ${this.name}`;
      this._getClasses();
      this._getClassTypeItems();
      this._getWeekTimeItems();
      this.classTimeArray = sfData.classTimes;
      setTimeout(() => {
        if (this.status == 1) {
          this.isclosed = true;
        }
      }, 10)

    },
    methods: {
      clear(){
        this.$refs.teacherforeign.clear();
        this.$refs.teacherchinese.clear();
        this.obj = {
          size: 10,
          pages: 1,
          classTypeId: '',
          currentNumber: '',
          weektimeId: '',
          grade: '',
          classTime: '',
          name: '',
          startTime: ''
        };
        this._getClasses();
      },
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
        console.log(bumenId, daquId, teamId, teacherId);
        this.obj.chineseTeacherRegionId = daquId;
        this.obj.chineseTeacherGroupId = teamId;
        this.obj.chineseTeacherId = teacherId;
        //this.obj.chineseTeacherName = '';
      },
      chooseForeignTeacher(bumenId, daquId, teamId, teacherId){
        console.log(bumenId, daquId, teamId, teacherId);
        this.obj.foreignTeacherRegionId = daquId;
        this.obj.foreignTeacherGroupId = teamId;
        this.obj.foreignTeacherId = teacherId;
        //this.foreignTeacherName = '';
      },
      //编辑班级
      _editOneClass(obj) {
        editOneClass(obj).then((res) => {
          console.log(res);
        });
      },

      //每周上课时间
      _getWeekTimeItems() {
        getWeekTimeItems().then((res) => {
          this.weekTimeItems = res.data;
          //console.log(this.weekTimeItems);
        });
      },

      //班级类型
      _getClassTypeItems() {
        getClassTypeItems().then((res) => {
          this.classTypeList = res.data;
        })
      },

      //搜索班级
      searchClasses() {
        this.pagination.page = 1;
        this.obj.pages = 1;
        this._getClasses();
      },

      handleSizeChange(e){
        this.pagination.size = e;
        console.log(this.obj);
        this._getClasses();
      },

      //获取班级列表
      _getClasses() {
        console.log(this.obj);
        var createTimeOrderByField = '';
        var createTimeAsc = '';
        var createTime = '';
        switch (this.formInline1.getTime) {
          case null:
            createTimeOrderByField = '';
            createTimeAsc = '';
            createTime = '';
            break;
          case '由远到近':
            createTimeOrderByField = 'createTime';
            createTimeAsc = 'false';
            createTime = '';
            break;
          case '由近到远':
            createTimeOrderByField = 'createTime';
            createTimeAsc = 'true';
            createTime = '';
            break;
          default:
            createTimeOrderByField = '';
            createTimeAsc = '';
            createTime = this.formInline1.getTime;
        }
        var startTimeOrderByField = '';
        var startTimeAsc = '';
        var startTime = '';
        switch (this.formInline2.getTime) {
          case null:
            startTimeOrderByField = '';
            startTimeAsc = '';
            startTime = '';
            break;
          case '由远到近':
            startTimeOrderByField = 'startTime';
            startTimeAsc = 'false';
            startTime = '';
            break;
          case '由近到远':
            startTimeOrderByField = 'startTime';
            startTimeAsc = 'true';
            startTime = '';
            break;
          default:
            startTimeOrderByField = '';
            startTimeAsc = '';
            startTime = this.formInline2.getTime;
        }
        var endTimeOrderByField = '';
        var endTimeAsc = '';
        var endTime = '';
        switch (this.formInline3.getTime) {
          case null:
            endTimeOrderByField = '';
            endTimeAsc = '';
            endTime = '';
            break;
          case '由远到近':
            endTimeOrderByField = 'endTime';
            endTimeAsc = 'false';
            endTime = '';
            break;
          case '由近到远':
            endTimeOrderByField = 'endTime';
            endTimeAsc = 'true';
            endTime = '';
            break;
          default:
            endTimeOrderByField = '';
            endTimeAsc = '';
            endTime = this.formInline3.getTime;
        }
        if (createTimeOrderByField) {
          this.obj.orderByField = createTimeOrderByField;
          this.obj.asc = createTimeAsc || 'true';
        } else {
          this.obj.createTime = createTime;
        }
        if (startTimeOrderByField) {
          this.obj.orderByField = startTimeOrderByField;
          this.obj.asc = startTimeAsc || 'true';
        } else {
          //this.obj.startTime = startTime;
        }
        if (endTimeOrderByField) {
          this.obj.orderByField = endTimeOrderByField;
          this.obj.asc = endTimeAsc || 'true';
        } else {
          this.obj.endTime = endTime;
        }
        this.obj.page = this.pagination.page;
        this.obj.rows = this.pagination.size;
        this.obj.current = this.pagination.page;
        this.obj.stage = this.stage;
        this.obj.status = this.status;
        this.obj.itemType = this.itermType;
        //console.log(this.obj);
        getClasses(this.obj).then((res) => {
          this.list = res.data.records;
          //console.log(this.list);
          this.pagination.total = res.data.total;
        });
      },

      currentChange(val) {
        this.list = [];
        this.pagination.page = val;
        this.obj.pages = val;
        console.log(this.obj);
        this._getClasses();
      },

      close(classId, status) {
        this.$confirm('确定要关闭该班级吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          editOneClass({
            classId: classId,
            status: status
          }).then((res) => {
            console.log(res);
            this.searchClasses();
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      edit(id) {
        this.$router.push({path: '/aom/classtype-edit', query: {id: id}});
      },
      gotoCourse(classId) {
        this.$router.push({path: '/aom/classmanage-course', query: {classId: classId, name: this.name}});
      },
      gotoDetail(classId) {
        this.$router.push({path: '/aom/classmanage-detail', query: {classId: classId, name: this.name}});
      },

      pickerOptions1() {
        console.log('123')
      },

    },
    filters: {
      timestampToDate: function (timestamp) {
        return sfTools.getDateFromTimestamp(timestamp);
      },
      getDescByJson: function (json) {
        return JSON.parse(json).desc;
      },
      replaceWeek: function (a) {
        return sfTools.replaceWeek(a);
      },
      sub10: function (a) {
        if (a) {
          return a.substring(0, 10);
        }
      },
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
    }
    .search-box111 {
      & > .pull-left {
        background: #f9fafc;
        border: 1px solid #e2e4ea;
        border-radius: 3px;
        padding: 15px;
      }
    }

  }
</style>
