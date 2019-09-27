<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <el-form :inline="true">
        <el-form-item>
          <span>{{$t('i18nView.courseInfo.name')}}：{{this.$route.query.teacherName}}（{{this.$route.query.teacherDepth}}）</span>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="warning" @click="brilliant(2)">{{$t('i18nView.courseInfo.jc')}}</el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="danger" @click="brilliant(1)">{{$t('i18nView.courseInfo.ktg')}}</el-button>
        </el-form-item>
      </el-form>

    </el-row>
    <!--<el-row>-->
    <!--<el-switch style="display: block" v-model="queryList.queryClassType"-->
    <!--@change="selectClassType"-->
    <!--active-color="#13ce66"-->
    <!--inactive-color="#ff4949"-->
    <!--active-value="0"-->
    <!--inactive-value="1"-->
    <!--:active-text="$t('i18nView.courseInfo.classing')"-->
    <!--:inactive-text="$t('i18nView.courseInfo.classed')">-->
    <!--</el-switch>-->
    <!--</el-row>-->
    <el-row>
      <div class="div1">
        <span>My current classes:</span>
        <el-button size="mini" :type="toggleIndex==0?'success':''"
                   @click="toggleIndex=0">On-going
        </el-button>
        <el-button size="mini" :type="toggleIndex==1?'success':''"
                   @click="toggleIndex=1">On-Break
        </el-button>
        <el-button size="mini" :type="toggleIndex==2?'success':''"
                   @click="toggleIndex=2">Ended
        </el-button>
      </div>
      <div class="div2">
        <span>Other classes:</span>
        <el-button size="mini" :type="toggleIndex==3?'success':''"
                   @click="toggleIndex=3">On-going
        </el-button>
        <el-button size="mini" :type="toggleIndex==4?'success':''"
                   @click="toggleIndex=4">On-Break
        </el-button>
        <el-button size="mini" :type="toggleIndex==5?'success':''"
                   @click="toggleIndex=5">Ended
        </el-button>
      </div>

    </el-row>
    <el-row style="margin-top:30px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" :label="$t('i18nView.courseInfo.classType')" width="180">
          <template slot-scope="scope">
            {{scope.row.classType | classTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="$t('i18nView.courseInfo.className')" width="180">
          <template slot-scope="scope">
            {{scope.row.className}}
          </template>
        </el-table-column>
        <!--<el-table-column v-if="this.queryList.teacherType === 0" prop="userDeptTree" label="中教老师">-->
        <el-table-column prop="userDeptTree" :label="$t('i18nView.courseInfo.foTeacher')">
        </el-table-column>
        <!--<el-table-column prop="userDeptTree" :label="$t('i18nView.courseInfo.foTeacher')">-->
        <!--</el-table-column>-->
        <el-table-column prop="classTypeName" :label="$t('i18nView.courseInfo.classTypeName')">
        </el-table-column>
        <el-table-column :label="$t('i18nView.courseInfo.classTime')">
          <template slot-scope="scope">
            <span>{{scope.row.classTime | classTimesToSA}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="teacherClassStartTime" :label="$t('i18nView.courseInfo.teacherClassStartTime')">
          <template slot-scope="scope">
            <span>
                {{scope.row.teacherClassStartTime.substring(0, 10)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="teacherClassEndTime" :label="$t('i18nView.courseInfo.teacherClassEndTime')">
          <template slot-scope="scope">
            <span>
                {{scope.row.teacherClassEndTime.substring(0, 10)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="jsonStr" :label="$t('i18nView.courseInfo.weekClassTime')">
          <template slot-scope="scope">
          <span>
            {{(JSON.parse(scope.row.jsonStr)).weekPoint == "7,2,4" ? "Sun/Tues/Thur - CFF" : "Mon/Wed/Fri - CFF"}}
          </span>
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
                       @click="checkLesson(scope.row)">{{$t('i18nView.courseInfo.showClassView')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

      </div>
    </el-row>
  </div>
</template>

<script>

  import {getTeacherCourses} from '@/api/aom';
  import {fetchTree} from '@/api/dept'
  //import { getRightDepth, getAllDepth, getAllId } from '@/utils/index';
  import waves from '@/directive/waves/index.js' // 水波纹指令
  // import { parseTime } from '@/utils'
  import {mapGetters} from 'vuex'
  import ElCol from "element-ui/packages/col/src/col";
  import ElForm from "../../../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElRow from "element-ui/packages/row/src/row";
  import local from '@/views/i18n-demo/local'
  const viewName = 'i18nView'
  /*import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
   import ElOption from "element-ui/packages/select/src/option"*/
  import {sfTools} from '../../../aom/util.js';
  let isEnglishSanfeng = false;

  export default {
    components: {
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
        toggleIndex: 0,
        queryList: {
          pages: 1,
          pageSize: 10,
          queryClassType: 0,  // 0正在上课 1已上课
          queryType: 1,  // 1:进行中班级、2:已结束的班级、0:已关闭的
          userId: null,
          teacherType: null
        },
        total: null,
        tableData: [],
        value1: 0,
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
      sexFilter(sex){
        const sexMap = {'true': '男', 'false': '女'}
        return sexMap[sex]
      },
      dutyFilter(dutyType){
        const dutyMap = {0: '兼职', 1: '全职'};
        return dutyMap[dutyType]
      },
      monthToYearFilter(month) {
        return (month >= 12 ? (Math.floor(month / 12) + '年') : '') + month % 12 + '月'
      },
      jsonStrFilter(jsonStr) {
        return JSON.parse(jsonStr).desc
      },
      classTypeFilter(classType) {
          switch(classType){
            case 1:
                return 'long-term';
                break;
            case 2:
                return 'short-term';
                break;
            case 3:
                return 'free-trial';
            break;
          }
      }
    },
    created() {
      this.queryList.userId = this.$route.query.userId
      this.queryList.teacherType = this.$route.query.teacherType
      console.log(this.queryList.userId)
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
    watch: {
      toggleIndex: function (val) {
        if (val === 0) {
          this.queryList.queryClassType = 0;  // 0正在上课 1已上课
          this.queryList.queryType = 1;  // 1:进行中班级、2:已结束的班级、0:已关闭的
        } else if (val === 1) {
          this.queryList.queryClassType = 0;
          this.queryList.queryType = 2;
        } else if (val === 2) {
          this.queryList.queryClassType = 0;
          this.queryList.queryType = 0;
        } else if (val === 3) {
          this.queryList.queryClassType = 1;
          this.queryList.queryType = 1;
        } else if (val === 4) {
          this.queryList.queryClassType = 1;
          this.queryList.queryType = 2;
        } else if (val === 5) {
          this.queryList.queryClassType = 1;
          this.queryList.queryType = 0;
        }
        console.log(this.queryList);
        this.getData();
      }
    },
    methods: {
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
      //初始化获取shuju
      getData() {
        getTeacherCourses(this.queryList).then(response => {
          console.log(response.data)
          this.tableData = response.data.result.records
          console.log(this.tableData)
          this.total = response.data.result.total
        })
      },
      selectClassType() {
        console.log(this.queryList.queryClassType)
        this.getData();
      },

      brilliant(arg) {
        if (arg === 1) {
          this.$router.push({
            path: 'improving',
            query: {
              userId: this.queryList.userId,
              type: arg,
              teacherType: this.queryList.teacherType,
              teacherName: this.$route.query.teacherName,
              teacherDepth: this.$route.query.teacherDepth
            }
          });
        } else {
          this.$router.push({
            path: 'brilliant',
            query: {
              userId: this.queryList.userId,
              type: arg,
              teacherType: this.queryList.teacherType,
              teacherName: this.$route.query.teacherName,
              teacherDepth: this.$route.query.teacherDepth
            }
          });
        }
      },

      //查看班级（外联）
      checkLesson(row) {
        console.log(row.teacherJoinClassId);
        this.$router.push({
          path: '/detail/classDetail', query: {
            classId: row.teacherJoinClassId
          }
        })
      }

    }
  }
</script>
<style lang="scss">
  .calendar-list-container {
    .div1, .div2 {
      /*width: 300px;*/
      float: left;
      height: 52px;
      line-height: 52px;
      background: #e3e3e3;
      padding: 0 10px;
      margin-right: 20px;
    }
  }
</style>
