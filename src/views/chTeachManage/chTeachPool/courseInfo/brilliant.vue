<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <el-form :inline="true">
        <el-form-item>
          <span>{{$t('i18nView.improving.name')}}：{{this.$route.query.teacherName}}（{{this.$route.query.teacherDepth}}）</span>
        </el-form-item>
        <el-form-item style="float:right">
          <!--<el-button @click="dialogTableVisible = true" type="primary" icon="el-icon-plus">添加课程</el-button>-->
          <el-button v-if="brilliant_add" @click="addClass0"
                     type="primary"
                     icon="el-icon-plus">{{$t('i18nView.improving.addCourseBtn')}}
          </el-button>
        </el-form-item>
      </el-form>

    </el-row>

    <el-row style="margin-top:30px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="lessonName"
                         :label="$t('i18nView.improving.courseName')" width="180">
          <template slot-scope="scope">
            {{scope.row.courseName}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('i18nView.improving.lessonName')"
                         width="180">
          <template slot-scope="scope">
            {{scope.row.lessonName}}
          </template>
        </el-table-column>
        <el-table-column v-if="this.queryList.teacherType === 0" prop="userDeptTree" label="课节">
        </el-table-column>
        <el-table-column :label="$t('i18nView.improving.commentDate')">
          <template slot-scope="scope">
            {{scope.row.originTime}} {{scope.row.originPoint | classTimesToSA}}
          </template>
        </el-table-column>
        <el-table-column prop="maddr" :label="$t('i18nView.improving.maddr')">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.maddr">
              <el-button size="mini" type="success">{{$t('i18nView.improving.maddrBtn')}}
              </el-button>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="comments" :label="$t('i18nView.improving.comments')">
        </el-table-column>
        <el-table-column prop="evaluatorInfo" :label="$t('i18nView.improving.evaluatorInfo')">
          <template slot-scope="scope">
            {{JSON.parse(scope.row.evaluatorInfo).createUserInfo}}
          </template>
        </el-table-column>

      </el-table>
      <div style="margin-top: 20px">
        <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="1"-->
        <!--:page-sizes="[10, 20, 30, 50]"-->
        <!--:page-size="10"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="total">-->
        <!--</el-pagination>-->

      </div>
    </el-row>
    <el-dialog :title="$t('i18nView.improving.chooseCourseDialog.chooseCourse')" :visible.sync="dialogTableVisible">
      <el-row>
        <el-form :inline="true">
          <el-form-item>
            <el-switch
              style="display: block"
              v-model="queryList0.queryClassType"
              @change="selectClassType"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="0"
              inactive-value="1"
              :active-text="$t('i18nView.courseInfo.classing')"
              :inactive-text="$t('i18nView.courseInfo.classed')">
            </el-switch>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button @click="makeSure"
                       type="primary">{{$t('i18nView.improving.chooseCourseDialog.dChoose')}}
            </el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="margin-top:30px;">
        <el-table :data="tableData0" border style="width: 100%"
                  highlight-current-row
                  @current-change="handleCurrentChange">
          <el-table-column
            prop="date"
            :label="$t('i18nView.courseInfo.classType')">
            <template slot-scope="scope">
              {{scope.row.classType | classTypeFilter()}}课程
            </template>
          </el-table-column>
          <el-table-column v-if="this.queryList.teacherType === 0" prop="userDeptTree" label="中教老师">
          </el-table-column>
          <el-table-column prop="userDeptTree"
                           :label="$t('i18nView.courseInfo.foTeacher')">
          </el-table-column>
          <el-table-column prop="classTypeName"
                           :label="$t('i18nView.courseInfo.classTypeName')">
          </el-table-column>
          <el-table-column
            :label="$t('i18nView.courseInfo.classTime')">
            <template slot-scope="scope">
              {{scope.row.classTime | classTimesToSA}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('i18nView.courseInfo.teacherClassStartTime')">
            <template slot-scope="scope">
              {{scope.row.teacherClassStartTime | sub10}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('i18nView.courseInfo.teacherClassEndTime')">
            <template slot-scope="scope">
              {{scope.row.teacherClassEndTime | sub10}}
            </template>
          </el-table-column>
          <el-table-column prop="jsonStr"
                           :label="$t('i18nView.courseInfo.weekClassTime')">
            <template slot-scope="scope">
              {{scope.row.jsonStr | jsonStrFilter()}}
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('i18nView.courseInfo.classGrade')">
            <template slot-scope="scope">
              {{scope.row.currentNumber}}/{{scope.row.number}}
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('i18nView.courseInfo.showClassView')">
            <template slot-scope="scope">
              <el-button size="small" type="success"
                         @click="checkLesson(scope.row)">{{$t('i18nView.courseInfo.view')}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('i18nView.courseInfo.choose')">
            <template slot-scope="scope">
              <!--classLessionId-->
              <img :src="scope.row.classLessionId==chooseIndex?chooseImg:noChooseImg"
                   style="width:28px;height:28px;vertical-align:middle;"/> 选择
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange0"
            @current-change="handleCurrentChange0"
            :current-page="1"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total0">
          </el-pagination>

        </div>
      </el-row>
    </el-dialog>
    <el-dialog title="选择具体课节" :visible.sync="dialogTableVisible1">
      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column prop="date" label="课程类型">
          <template slot-scope="scope">
            {{scope.row.classType | classTypeFilter()}}课程
          </template>
        </el-table-column>
        <el-table-column v-if="this.queryList.teacherType === 0" prop="userDeptTree" label="中教老师">
        </el-table-column>
        <el-table-column prop="userDeptTree" label="外教老师">
        </el-table-column>
        <el-table-column prop="classTypeName" label="班级类型名称">
        </el-table-column>
        <el-table-column label="上课时间">
          <template slot-scope="scope">
            {{scope.row.classTime | classTimesToSA}}
          </template>
        </el-table-column>
        <el-table-column label="班级开始日期">
          <template slot-scope="scope">
            {{scope.row.teacherClassStartTime | sub10}}
          </template>
        </el-table-column>
        <el-table-column label="班级结束日期">
          <template slot-scope="scope">
            {{scope.row.teacherClassEndTime | sub10}}
          </template>
        </el-table-column>
        <el-table-column prop="jsonStr" label="每周上课时间">
          <template slot-scope="scope">
            {{scope.row.jsonStr | jsonStrFilter()}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="班级">
          <template slot-scope="scope">
            {{scope.row.currentNumber}}/{{scope.row.number}}
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:30px;">
        <el-select @change="chooseLesson" style="width: 100%;" v-model="lessonChoosed" placeholder="请选择具体课节">
          <el-option v-for="item in options" :key="item.lessonId"
                     :label="item.lessonName" :value="item.lessonId">
          </el-option>
        </el-select>
        <el-input v-model="addData.comments" style="margin-top:30px;" type="textarea" :rows="8"
                  placeholder="请输入评语"></el-input>
        <el-button @click="finishAdd" style="margin-top:30px;" class="is-center" type="primary">提交</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

  import {getBrilliantCourses, getTeacherCourses, getCourseLessons, addCourseLessons} from '@/api/aom';
  import {fetchTree} from '@/api/dept'
  //import { getRightDepth, getAllDepth, getAllId } from '@/utils/index';
  import waves from '@/directive/waves/index.js' // 水波纹指令
  // import { parseTime } from '@/utils'
  import {mapGetters} from 'vuex'
  import {parseTime} from '@/utils'
  import ElCol from "element-ui/packages/col/src/col";
  import ElForm from "../../../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElRow from "element-ui/packages/row/src/row";
  import ElInput from "../../../../../node_modules/element-ui/packages/input/src/input.vue";
  /*import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
   import ElOption from "element-ui/packages/select/src/option"*/
  import local from '@/views/i18n-demo/local'
  const viewName = 'i18nView'
  import chooseImg from '../../../aom/images/icon_choose_full-01.png';
  import noChooseImg from '../../../aom/images/icon_choose-01.png';
  import {sfTools} from '../../../aom/util.js';
  let isEnglishSanfeng = false;

  export default {
    components: {
      ElInput,
      ElRow,
      ElButton,
      ElFormItem,
      ElForm,
      ElCol
    },
    name: 'table_user',
    directives: {
      waves
    },
    data() {
      return {
        noChooseImg: noChooseImg,
        chooseImg: chooseImg,
        chooseIndex: 0,
        teaUserId: null,
        type: null,
        queryList0: {
          pages: 1,
          pageSize: 10,
          queryClassType: 1,
          userId: null,
          teacherType: null,
        },
        total0: null,
        queryList: {
          pages: 1,
          pageSize: 1000000,
        },
        total: null,
        tableData0: [],
        tableData1: [
          {}
        ],
        tableData: [],
        dialogTableVisible: false,
        dialogTableVisible1: false,
        currentRow: null,
        addData: {
          "classLessionId": null,
          "comments": null,
          "courseId": null,
          "createId": null,//当前登陆人userid
          "createTime": null,
          //"delFlag": "string",
          "evaluatorInfo": "string",//点评人的信息
          "teacherType": 0,
          "type": 0,//可提高/精彩
          "updateTime": "2018-05-29T03:12:30.749Z",
          "userId": "string"//老师Id
        },
        options: [],
        lessonChoosed: null,
        isEnglish: false
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'userId',
        'deptId',
        'roles',
        'roleIds'
      ])
    },
    filters: {
      classTimesToSA: function (a) {
        if (a) {
          if (isEnglishSanfeng) {
            return sfTools.classTimesToSouthAfrica(a);
          } else {
            return a;
          }
        }
      },
      sub10: function (a) {
        if (a) {
          return a.substring(0, 10);
        }
      },
      sexFilter(sex){
        const sexMap = {
          true: '男',
          false: '女'
        }
        return sexMap[sex]
      },
      dutyFilter(dutyType){
        const dutyMap = {
          0: '兼职',
          1: '全职'
        }
        return dutyMap[dutyType]
      },
      monthToYearFilter(month) {
        return (month >= 12 ? (Math.floor(month / 12) + '年') : '') + month % 12 + '月'
      },
      jsonStrFilter(jsonStr) {
        //console.log(JSON.parse(jsonStr))
        if (jsonStr) {
          return JSON.parse(jsonStr).desc
        } else {
          return null
        }
        //return JSON.parse(jsonStr).desc
      },
      classTypeFilter(classType) {
        return classType === 1 ? '长期' : '短期'
      }
    },
    created() {
      console.log(this.permissions)
      this.brilliant_add = this.permissions['BRILIANT_AAD']
      this.teaUserId = this.$route.query.userId
      this.queryList0.userId = this.$route.query.userId
      this.type = this.$route.query.type
      this.queryList0.teacherType = this.$route.query.teacherType
      this.addData.createId = this.userId
      this.addData.evaluatorInfo = JSON.stringify(this.user)
      this.addData.teacherType = this.$route.query.teacherType
      this.addData.type = this.type
      this.addData.userId = this.teaUserId
      console.log(this.addData.evaluatorInfo)
      console.log(this.userId)
      this.getData();
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }
      let [roleId] = this.roleIds;
      if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.$i18n.locale = 'en'
        this.$store.dispatch('setLanguage', 'en')
        this.isEnglish = true;
        isEnglishSanfeng = true;
      } else {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh');
        this.isEnglish = false;
      }
    },
    watch: {},
    methods: {
      checkLesson(row11){
        this.$router.push({path: '/detail/classDetail', query: {classId: row11.teacherJoinClassId}});
        console.log(row11.teacherJoinClassId);
      },
      //分页操作
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryList.pageSize = val
        this.getData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.queryList.pages = val
        this.getData()
      },
      handleSizeChange0(val) {
        console.log(`每页 ${val} 条`);
        this.queryList0.pageSize = val
        this.getOrData()
      },
      handleCurrentChange0(val) {
        console.log(`当前页: ${val}`);
        this.queryList0.pages = val
        this.getOrData()
      },
      //初始化获取shuju
      getData() {
        getBrilliantCourses(this.teaUserId, this.type, this.queryList).then(response => {
          this.tableData = response.data.result.records
          this.total = response.data.result.total
          console.log(this.tableData)
        })
      },
      getOrData() {
        getTeacherCourses(this.queryList0).then(response => {
          console.log(response.data)
          this.tableData0 = response.data.result.records
          this.total0 = response.data.result.total
          console.log(this.tableData0);
        })
      },
      addClass0() {
        this.dialogTableVisible = true
        this.getOrData();
      },
      selectClassType() {
        //console.log(this.queryList0.queryClassType)
        this.getOrData();
      },
      handleCurrentChange(val) {
        console.log(val);
        this.currentRow = val;
        this.tableData1[0] = this.currentRow
        this.chooseIndex = val.classLessionId;
        console.log(this.tableData1);
        console.log(this.chooseIndex);
      },
      //选择确定课程
      makeSure() {
        if (this.currentRow) {
          this.dialogTableVisible = false
          console.log(this.currentRow)
          this.dialogTableVisible1 = true
          this.addData.classLessionId = this.currentRow.classLessionId
          setTimeout(() => {
            this.getClassLesson()
          }, 10)
        } else {
          this.$message({type: 'error', message: '请点选您要添加的课程！'});
        }

      },
      //获取课节列表
      getClassLesson() {
        let query = {}
        query.userId = this.currentRow.teacherUserId
        //query.classId = this.currentRow.classLessionId
        query.classId = this.currentRow.teacherJoinClassId
        getCourseLessons(query).then(response => {
          console.log(response.data)
          this.options = response.data.result
        })
      },
      //最终提交
      chooseLesson() {
        console.log(this.lessonChoosed)
        this.addData.courseId = this.lessonChoosed
        //this.addData.classLessionId = this.lessonChoosed
      },
      finishAdd(){
        let myDate = new Date()
        console.log(parseTime(myDate))
        this.addData.createTime = parseTime(myDate)
        this.addData.updateTime = parseTime(myDate)
        this.addData.classLessionId = this.lessonChoosed
        this.addData.courseId = this.options[0].courseId;
        console.log(this.addData);
        if (this.addData.courseId === null || this.addData.comments === null) {
          this.$message({type: 'error', message: '请填写完整'});
          return false;
        } else {
          addCourseLessons(this.addData).then(response => {
            console.log(response.data)
            this.getData();
            this.dialogTableVisible1 = false
            this.$message({type: 'success', message: '添加成功!'});
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .el-dialog {
    width: 60%;
  }
</style>
