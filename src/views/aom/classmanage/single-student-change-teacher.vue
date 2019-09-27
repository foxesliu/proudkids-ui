<template>
  <div class="aom-container">
    <div class="p-20">
      <v-pagetitle title="教务 > 班级管理 > 单个学生换老师"></v-pagetitle>
      <div class="addclass-box">
        <div class="item">
          <div class="h-60 font18 border-bottom">当前操作学生</div>
          <div class="h-60">
            <span class="mr-50">中文名：{{ruserInfo.name}}</span>
            <span class="mr-50">英文名：{{ruserInfo.enName}}</span>
            <span class="mr-50">绑定手机：{{ruserInfo.phone}}</span>
            <span class="mr-50">级别：{{ruserInfo.grade}}</span>
          </div>
        </div>

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
                <template slot-scope="scope">{{scope.row.currentNumber}}/4</template>
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
          <div class="h-60 border-bottom font18">教务排班操作</div>
          <div class="search-box o-hidden pt-15">
            <div class="pull-left">
              <div class="o-hidden">
                <span class="pull-left display-block h-40" style="width:100px;">选择中教：</span>
                <div class="pull-left">
                  <v-teacherchinese @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>
                </div>
              </div>
              <div class="o-hidden mt-10">
                <span class="pull-left display-block h-40" style="width:100px;">选择外教：</span>
                <div class="pull-left">
                  <v-teacherforeign @childChooseTeacher="chooseForeignTeacher"></v-teacherforeign>
                </div>
              </div>
            </div>
            <div class="pull-right">
              <el-button type="success" class="width-100" @click="searchClasses">查询</el-button>
            </div>
          </div>

          <div class="search-box o-hidden border-top mt-15 pt-15">
            <div class="pull-left">
              <div>
                <el-select class="width-150"
                           v-model="formInline1.getTime" placeholder="班级创建时间">
                  <el-option label="由近到远" value="由近到远"></el-option>
                  <el-option label="由远到近" value="由远到近"></el-option>
                  <el-date-picker v-model="formInline1.getTime"
                                  align="left" type="date" placeholder="选择具体日期"
                                  value-format="yyyy-MM-dd" :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-select>
                <el-select class="width-150" v-model="formInline2.getTime" placeholder="班级开始日期">
                  <el-option label="由近到远" value="由近到远"></el-option>
                  <el-option label="由远到近" value="由远到近"></el-option>
                  <el-date-picker v-model="formInline2.getTime"
                                  align="left" type="date" placeholder="选择具体日期"
                                  value-format="yyyy-MM-dd"
                                  :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-select>
                <el-select class="width-150" v-model="formInline3.getTime" placeholder="班级结束日期">
                  <el-option label="由近到远" value="由近到远"></el-option>
                  <el-option label="由远到近" value="由远到近"></el-option>
                  <el-date-picker v-model="formInline3.getTime"
                                  align="left" type="date"
                                  placeholder="选择具体日期"
                                  value-format="yyyy-MM-dd" :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-select>
                <el-select v-model="obj.classTypeId"
                           class="width-150"
                           placeholder="班级类型名称">
                  <el-option v-for="item in classTypeList"
                             :key="item.classTypeId"
                             :label="item.name"
                             :value="item.classTypeId"></el-option>
                </el-select>
                <el-input class="width-150" v-model="obj.name" placeholder="班级名称"></el-input>
              </div>
              <div class="mt-10">
                <el-select class="width-150"
                           v-model="obj.currentNumber" placeholder="班级人数">
                  <el-option v-for="item in classNumberArray" :key="item" :label="item"
                             :value="item"></el-option>
                </el-select>
                <el-select class="width-150" v-show="weekTimeItems.length>0"
                           v-model="obj.weektimeId"
                           placeholder="每周上课时间">
                  <el-option v-for="item in weekTimeItems" :key="item.id"
                             :label="(item.jsonStr)|getDescByJson"
                             :value="item.id"></el-option>
                </el-select>
                <el-select class="width-150" v-model="obj.grade" placeholder="级别">
                  <el-option v-for="item in gradeArray" :key="item" :label="item"
                             :value="item"></el-option>
                </el-select>
                <el-select class="width-150" v-model="obj.classTime" placeholder="上课时间">
                  <el-option v-for="item in classTimeArray" :key="item" :label="item"
                             :value="item"></el-option>
                </el-select>
                <el-select class="width-150" v-if="obj.itemType==1||obj.itemType==4" v-model="obj.itemType"
                           placeholder="课程类型">
                  <el-option key="1" label="长期课" value="1"></el-option>
                  <el-option key="4" label="线下课" value="4"></el-option>
                </el-select>
              </div>
            </div>
            <div class="pull-right">
              <el-button type="success" class="width-100" @click="searchClasses">查询</el-button>
            </div>
          </div>

          <div class="table mt-20 border-top pt-20">
            <el-table :data="list" border style="width: 100%">
              <el-table-column prop="name" label="班级名称"></el-table-column>
              <el-table-column label="班级创建时间">
                <template slot-scope="scope">
                  {{scope.row.createTime | timestampToDate}}
                </template>
              </el-table-column>
              <el-table-column prop="chineseTeacherName" label="中教老师"></el-table-column>
              <el-table-column prop="foreignTeacherName" label="外教老师"></el-table-column>
              <el-table-column label="班级人数">
                <template slot-scope="scope">{{scope.row.currentNumber}}/4</template>
              </el-table-column>
              <el-table-column prop="classTypeName" label="班级类型名称"></el-table-column>
              <el-table-column prop="classTime" label="上课时间"></el-table-column>
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
              <el-table-column prop="address" label="选择">
                <template slot-scope="scope">
                  <img :src="scope.row.classId==chooseIndex?chooseImg:noChooseImg"
                       style="width:28px;height:28px;vertical-align:middle;"
                       @click="chooseThisClass(scope.row.classId)"/> 选择
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="mt-10" v-if="pagination.size>0">
            <el-pagination background
                           layout="prev, pager, next"
                           :page-size="pagination.size"
                           :current-page.sync="pagination.page"
                           :total="pagination.total"
                           @current-change="currentChange">
            </el-pagination>
          </div>

          <div class="item">
            <div class="h-80 border-bottom o-hidden">
              <div class="pull-left width-200">
                <span>选择课程开始时间：</span>
              </div>
              <div class="pull-left">
                <el-date-picker class="width-300"
                                value-format="yyyy-MM-dd" v-model="chooseDate" type="date"
                                placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
            <div class="o-hidden mt-20 pb-20 border-bottom">
              <div class="pull-left width-200">备注给中教：</div>
              <div class="pull-left">
                <el-input type="textarea" class="width-500" :rows="8" v-model="toChinese"
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
              <el-button type="default" class="width-150" @click="reload">取消</el-button>
              <el-button type="success" class="width-200" :disabled="btnIsDisabled" @click="submit">确认</el-button>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import {
    getOneClass,
    getClasses,
    getClassTypeItems,
    getWeekTimeItems,
    studentReplaceClassOrTeacher,
    getOneStudentInfoByClassIdRuserId
  } from '../../../api/aom.js';
  import {sfTools, sfData} from '../util.js';
  import PageTitle from '../components/pagetitle.vue';
  import TeacherForeign from '../components/teacher_foreign.vue';
  import TeacherChinese from '../components/teacher_chinese.vue';
  import chooseImg from '../images/icon_choose_full-01.png';
  import noChooseImg from '../images/icon_choose-01.png';

  export default {
    data() {
      return {
        btnIsDisabled: false,
        ruserInfo: {},
        noChooseImg: noChooseImg,
        chooseImg: chooseImg,
        classInfo: [],
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
        classTimeArray: [],
        formInline1: {
          getTime: null,
        },
        formInline2: {
          getTime: null,
        },
        formInline3: {
          getTime: null,
        },
        pickerOptions1: '',
        obj: {
          size: 10,
          pages: 1,
          name: '',
          chineseTeacherName: '',
          foreignTeacherName: '',
          classTypeId: '',
          weektimeId: '',
          currentNumber: '',
          grady: '',
          classTime: '',
          stage: 0,
          status: 0,
          chineseTeacherRegionId: null,
          chineseTeacherGroupId: null,
          chineseTeacherId: null,
          foreignTeacherRegionId: null,
          foreignTeacherGroupId: null,
          foreignTeacherId: null,
          itemType: 0
        },
        chooseIndex: 0,
        newClassId: '',
        chooseDate: '',
        toChinese: '',
        toTutor: '',
        itermType: 1 //班级类型 1：长期 2：短期
      }
    },
    created() {
      this.chooseDate = sfTools.getDateFromTimestamp(new Date().getTime());
      this.ruserId = this.$route.query.ruserId;
      this.classId = this.$route.query.classId;
      this.refId = this.$route.query.refId;
      this._getOneClass();
      this._getClasses();
      this._getClassTypeItems();
      this._getWeekTimeItems();
      this._getOneStudentInfoByClassIdRuserId();
      this.classTimeArray = sfData.classTimes;
    },
    methods: {
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
        this.obj.chineseTeacherRegionId = daquId;
        this.obj.chineseTeacherGroupId = teamId;
        this.obj.chineseTeacherId = teacherId;
      },
      chooseForeignTeacher(bumenId, daquId, teamId, teacherId){
        this.obj.foreignTeacherRegionId = daquId;
        this.obj.foreignTeacherGroupId = teamId;
        this.obj.foreignTeacherId = teacherId;
      },
      submit() {
        var submitObj = {
          refId: this.refId,
          newClassId: this.newClassId,
          fromDate: this.chooseDate,
          toChinese: this.toChinese,
          toTutor: this.toTutor
        };
        if (submitObj.newClassId == '') {
          this.$message({type: 'error', message: '请选择要加入的班级'});
          return false;
        }
        if (submitObj.fromDate == '') {
          this.$message({type: 'error', message: '请选择开始时间'});
          return false;
        }
        var cStartTime = (new Date(submitObj.fromDate)).getTime();
        var timeStamp = (new Date(new Date().setHours(0, 0, 0, 0))).getTime();
        if (cStartTime < timeStamp) {
          this.$message({type: 'error', message: '必须选择今日或以后'});
          return false;
        }
        console.log(submitObj);
        this.btnIsDisabled = true;
        studentReplaceClassOrTeacher(submitObj).then((res) => {
          if (res.data.data.id) {
            console.log(res);
            //sourceStr  原班级ID
            //targetStr  新ID
            var _this = this;
            this.$message({
              type: 'success', message: '操作成功!', onClose: function () {
                _this.$router.push({
                  path: '/aom/single-student-change-teacher-result', query: {
                    id: res.data.data.id,
                    sourceStr: res.data.data.sourceStr,
                    targetStr: res.data.data.targetStr
                  }
                });
              }
            });
          }
          this.btnIsDisabled = false;
        }).catch(() => {
          this.btnIsDisabled = false;
        });
      },

      _getOneStudentInfoByClassIdRuserId(){
        getOneStudentInfoByClassIdRuserId(this.classId, this.ruserId).then((res) => {
          this.ruserInfo = res.data;
        })
      },

      //选中某个班级
      chooseThisClass(id) {
        this.chooseIndex = id;
        this.newClassId = id;
      },

      //单个班级查询
      _getOneClass() {
        getOneClass(this.classId).then((res) => {
          this.classInfo.push(res.data);
          console.log(this.classInfo);
          //this.chooseDate = this.classInfo[0].startTime.substring(0, 10);
          this.itermType = this.classInfo[0]['itermType'];
          console.log(this.itermType);
          this.obj.itemType = this.itermType;
          this._getClasses();
        })
      },

      //每周上课时间
      _getWeekTimeItems() {
        getWeekTimeItems().then((res) => {
          this.weekTimeItems = res.data;
          console.log(this.weekTimeItems);
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
        console.log(this.obj);
        this._getClasses();
      },

      //获取班级列表
      _getClasses() {
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
          this.obj.startTime = startTime;
        }
        if (endTimeOrderByField) {
          this.obj.orderByField = endTimeOrderByField;
          this.obj.asc = endTimeAsc || 'true';
        } else {
          this.obj.endTime = endTime;
        }
        this.obj.page = this.pagination.page;
        this.obj.row = this.pagination.size;
        this.obj.current = this.pagination.page;
        this.obj.status = 0;
        console.log(this.obj);
        getClasses(this.obj).then((res) => {
          this.list = res.data.records;
          console.log(this.list);
          this.pagination.total = res.data.total;
        })
      },

      currentChange(val) {
        this.list = [];
        this.pagination.page = val;
        this.obj.pages = val;
        console.log(this.obj);
        this._getClasses();
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
      getDescByJson: function (json) {
        return JSON.parse(json).desc;
      },
      replaceWeek: function (a) {
        return sfTools.replaceWeek(a);
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
