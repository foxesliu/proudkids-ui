<template>
  <div class="classing" id="classing" v-cloak="true">
    <div class="search_header">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="formData.chineseTeacherName"
                    :placeholder="$t('i18nView.classing.chName')"
                    size="small"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="formData.foreignTeacherName"
                    :placeholder="$t('i18nView.classing.foName')"
                    size="small"></el-input>
        </el-col>
        <!-- <el-col :span="6">
          <el-button @click="searchClasses" size="small">{{$t('i18nView.searchBtnName')}}</el-button>
        </el-col> -->
      </el-row>
    </div>
    <div class="search_middle">
      <div class="formData">
        <el-row :gutter="20" v-if="teacherType==1">
          <el-col :span="4">
            <span style="color: #707070;display: inline-block"
                  class="mt5">{{$t('i18nView.classManage.selectTitle')}}</span>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.foreignTeacherRegionId"
                       placeholder="外教大区" size="small"
                       :disabled="foreignTeacherRegionFlag">
              <el-option v-for="item in foreignTeachersData.child"
                         :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.foreignTeacherGroupId"
                       placeholder="外教组" size="small"
                       :disabled="foreignTeacherGroupFlag">
              <el-option
                v-for="item in foreignTeachersGroupData"
                :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="ccData.foreignTeacherId"
                       placeholder="外教" size="small" :disabled="foreignTeacherFlag">
              <el-option
                v-for="item in foreignTeachersMemberData"
                :key="item.userId" :label="item.username" :value="item.userId">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="teacherType==0">
          <el-col :span="4">
            <span style="color: #707070;display: inline-block"
                  class="mt5">{{$t('i18nView.classManage.selectTitle')}}</span>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.chineseTeacherRegionId"
                       placeholder="中教大区" size="small"
                       :disabled="chineseTeacherRegionFlag">
              <el-option
                v-for="item in chineseTeachersData.child"
                :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.chineseTeacherGroupId"
                       placeholder="中教组" size="small" :disabled="chineseTeacherGroupFlag">
              <el-option
                v-for="item in chineseTeachersGroupData"
                :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="ccData.chineseTeacherId"
                       placeholder="中教" size="small" :disabled="chineseTeacherFlag">
              <el-option
                v-for="item in chineseTeachersMemberData"
                :key="item.userId" :label="item.username" :value="item.userId">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="btn mb30">
        <el-col :span="6">
          <el-button @click="searchClasses" size="small">{{$t('i18nView.searchBtnName')}}</el-button>
        </el-col>
      </div> -->
    </div>
    <div class="search_bottom">

      <div class="formData mr30 pb30">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="timeData.createTime"
                       :placeholder="$t('i18nView.classing.createTime')" size="small"
                       @change="holdCreateTime">
              <el-option :label="$t('i18nView.asc')" value="true"></el-option>
              <el-option :label="$t('i18nView.desc')" value="false"></el-option>
              <el-date-picker
                v-model="timeData.createTime"
                type="daterange" align="right" unlink-panels
                :range-separator="$t('i18nView.rangeSeparator')"
                :start-placeholder="$t('i18nView.startPlaceholder')"
                :end-placeholder="$t('i18nView.endPlaceholder')"
                value-format="yyyy-MM-dd" @change="getCreateTime"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.classTypeId" :placeholder="$t('i18nView.classing.classTypeId')" size="small">
              <el-option
                v-for="item in classTypeList"
                :key="item.classTypeId" :label="item.name" :value="item.classTypeId">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="timeData.startTime"
                       :placeholder="$t('i18nView.classing.startTime')" size="small"
                       @change="holdStartTime">
              <el-option :label="$t('i18nView.asc')" value="true"></el-option>
              <el-option :label="$t('i18nView.desc')" value="false"></el-option>

              <el-date-picker
                v-model="timeData.startTime"
                type="daterange" align="right" unlink-panels
                :range-separator="$t('i18nView.rangeSeparator')"
                :start-placeholder="$t('i18nView.startPlaceholder')"
                :end-placeholder="$t('i18nView.endPlaceholder')"
                value-format="yyyy-MM-dd" @change="getStartTime"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="timeData.endTime"
                       :placeholder="$t('i18nView.classing.endTime')" size="small"
                       @change="holdEndTime">
              <el-option :label="$t('i18nView.asc')" value="true"></el-option>
              <el-option :label="$t('i18nView.desc')" value="false"></el-option>

              <el-date-picker
                v-model="timeData.endTime"
                type="daterange" align="right" unlink-panels
                :range-separator="$t('i18nView.rangeSeparator')"
                :start-placeholder="$t('i18nView.startPlaceholder')"
                :end-placeholder="$t('i18nView.endPlaceholder')"
                value-format="yyyy-MM-dd" @change="getEndTime"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </el-select>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-select class="width-200" v-model="formData.currentNumber"
                       :placeholder="$t('i18nView.classing.currentNumber')" size="small">
              <el-option v-for="item in classNumbers"
                         :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.weektimeId" :placeholder="$t('i18nView.classing.weektimeId')" size="small">
              <el-option v-for="item in weekTimeItems"
                         :key="item.id" :label="(item.jsonStr)|getDescByJson"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="formData.grade" :placeholder="$t('i18nView.classing.grade')" size="mini">
              <el-option
                v-for="item in gradeOption"
                :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-if="teacherType==0" v-model="formData.classTime"
                       :placeholder="$t('i18nView.classing.classTime')" size="mini">
              <el-option
                v-for="item in schedulePointOption"
                :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-if="teacherType==1" v-model="formData.classTime"
                       :placeholder="$t('i18nView.classing.classTime')" size="mini">
              <el-option
                v-for="item in schedulePointOption"
                :key="item.value" :label="item.labelSA" :value="item.value">
              </el-option>
            </el-select>
          </el-col>

        </el-row>
      </div>
      <div class="btn">
        <el-button @click="searchClasses" size="small" class="mb30">{{$t('i18nView.searchBtnName')}}</el-button>
      </div>
    </div>
    <el-table :key='tableKey' :data="list"
              v-loading="listLoading" element-loading-text="正在加载中"
              border fit style="width: 100%">
      <el-table-column v-if="false" align="center"
                       :label="$t('i18nView.classing.table.remindClass')"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <h3 v-if="teacherType==1">
            <span v-if="scope.row.classStatus=='classToday'" class="today">{{scope.row.classStatus}}</span>
            <span v-else-if="scope.row.classStatus=='classTomorrow'" class="tomorry">{{scope.row.classStatus}}</span>
            <span v-else-if="scope.row.classStatus=='/'">{{scope.row.classStatus}}</span>
          </h3>
          <h3 v-else>
            <span v-if="scope.row.classStatus=='今日有课'" class="today">{{scope.row.classStatus}}</span>
            <span v-else-if="scope.row.classStatus=='明日有课'" class="tomorry">{{scope.row.classStatus}}</span>
            <span v-else-if="scope.row.classStatus=='/'">{{scope.row.classStatus}}</span>
          </h3>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       :label="$t('i18nView.classing.table.courseName')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.courseName}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       :label="$t('i18nView.classing.table.itermType')"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="teacherType==0">{{scope.row.itermType == 1 ? '长期' : '短期'}}</span>
          <span v-else>{{scope.row.itermType == 1 ? 'longTerm' : 'shortTerm'}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('i18nView.classing.table.className')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('i18nView.classing.table.createTime')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.createTime | filterTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('i18nView.classing.table.chineseTeacherName')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.chineseTeacherName || '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('i18nView.classing.table.foreignTeacherName')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.foreignTeacherName || '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('i18nView.classing.table.classTypeName')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.classTypeName || '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('i18nView.classing.table.startTime')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.startTime | filterTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('i18nView.classing.table.endTime')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.endTime | filterTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('i18nView.classing.table.classTime')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.classTime | classTimesToSA}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('i18nView.classing.table.currentNumber')" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.currentNumber}}/4</span>
        </template>
      </el-table-column>
      <el-table-column v-if="teacherType==0" align="center"
                       :label="$t('i18nView.classing.table.weekPointDesc')"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.weekPointDesc || '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="teacherType==1" align="center"
                       :label="$t('i18nView.classing.table.weekPointDesc')"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.weekPoint == "7,2,4" ? "Sun/Tues/Thur - CFF" : "Mon/Wed/Fri - CFF"}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('i18nView.classing.table.classDetail')" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="classDetail(scope)" rows="mini">{{$t('i18nView.classing.table.detail')}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('i18nView.classing.table.courseware')" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="checkCourseware(scope)" rows="mini">{{$t('i18nView.classing.table.look')}}</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formData.page"
        :page-sizes="[10,20, 50, 100]" :page-size="10" background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import local from '@/views/i18n-demo/local';
  const viewName = 'i18nView';
  import {mapGetters} from 'vuex';
  import Cookies from 'js-cookie';
  import {getTeachersByDeptId, getClassTypeItems, getWeekTimeItems, getClasses} from '@/api/teachers';
  import {sfTools} from '../../aom/util.js';
  let isEnglishSanfeng = false;

  export default {
    data() {
      return {
        isToday: true,
        isTomorrow: false,
        tableKey: 0,
        listLoading: true,
        chineseTeacherRegionFlag: false,
        chineseTeacherGroupFlag: false,
        chineseTeacherFlag: false,
        foreignTeacherRegionFlag: false,
        foreignTeacherGroupFlag: false,
        foreignTeacherFlag: false,
        chineseTeachersData: [],
        chineseTeachersGroupData: [],
        chineseTeachersMemberData: [],
        foreignTeachersData: [],
        foreignTeachersGroupData: [],
        foreignTeachersMemberData: [],
        classTypeList: [],
        weekTimeItems: [],
        classNumbers: [0, 1, 2, 3, 4],
        gradeOption: '',
        schedulePointOption: '',
        list: [],
        arr: [],
        teacherWeektime: '',
        total: null,
        ccData: {
          chineseTeacherId: '',
          foreignTeacherId: ''
        },
        timeData: {
          createTime: null,
          startTime: null,
          endTime: null
        },
        formData: {
          chineseTeacherIdFlag: null,
          page: 1,
          rows: 10,
          current: null,
          stage: null,//班级级别 0：未过期 1：已过期
          classId: null,
          classTypeId: null,  //班级类型ID
          name: null,  //班级类型ID
          status: null,  //班级状态 0:未关闭 1：已关闭
          classTime: null,  //班级上课时间 eg: 18:00-18:30
          currentSchedule: null,  //班级类型ID
          currentNumber: null,  //当前班级人数
          classNumber: null,  //班级预定人数
          liveAddr: null,  //当前班级人数
          chineseTeacherId: null,  //中教ID
          chineseTeacherName: null,  //中教姓名
          chineseTeacherGroupId: null,  //中教所在组ID
          chineseTeacherGroupName: null,  //中教所在组名称
          chineseTeacherRegionId: null,  //中教所在大区ID
          chineseTeacherRegionName: null,  //中教所在大区名称
          foreignTeacherId: null,  //外教ID
          foreignTeacherName: null,  //外教姓名
          foreignTeacherGroupId: null,  //外教所在组ID
          foreignTeacherGroupName: null,  //外教所在组名称
          foreignTeacherRegionId: null,  //外教所在大区ID
          foreignTeacherRegionName: null,  //外教所在大区名称
//          itermType: '',  //班级类型 1：长期 2：短期
          classTypeName: null,  //班级类型名称
          grade: null,  //级别或者年级
          weekPoint: null,  //每周几上课，数据格式为 1,3,5
          weekPointDesc: null,  //级别或者年每周上课时间中文描述
          weektimeId: null,  //级别或者年级
          createTimeGe: null,  //大于等于创建时间
          createTimeLe: null,  //创建时间
          updateTimeGe: null,  //修改时间
          updateTimeLe: null,  //修改时间
          endTimeGe: null,  //班级结束日期
          endTimeLe: null,  //班级结束日期
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    computed: {
      ...mapGetters(['grade', 'schedulePoint', 'roleIds', 'userId']),
    },
    created() {
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }
//      this.formData.status = this.$route.query.status;
//      this.getTeachers();
      this.getTypeItems();
      this.getWeekItems();
      this.getClassList();
      let [roleId] = this.roleIds;
      if (roleId == 20 || roleId == 21 || roleId == 22 || roleId == 31) {
        this.teacherType = 0;
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh')
        this.formData.chineseTeacherId = this.userId
        if (this.$route.query.chineseTeacherId != undefined) {
          this.formData.chineseTeacherId = this.$route.query.chineseTeacherId
          Cookies.set('chineseTeacherId', this.$route.query.chineseTeacherId)
        } else {
          if (Cookies.get('chineseTeacherId')) {
            this.formData.chineseTeacherId = Cookies.get('chineseTeacherId')
          } else {
            this.formData.chineseTeacherId = ''
          }
        }

        getTeachersByDeptId(2).then((res) => {  //中教
          this.chineseTeachersData = res.data.data
          this.initChineseSelectOPtions();
        })
      } else if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.teacherType = 1;
        isEnglishSanfeng = true;
        this.$store.dispatch('setLanguage', 'en')
        this.formData.foreignTeacherId = this.userId
        if (this.$route.query.foreignTeacherId != undefined) {
          this.formData.foreignTeacherId = this.$route.query.foreignTeacherId
          Cookies.set('foreignTeacherId', this.$route.query.foreignTeacherId)
        } else {
          if (Cookies.get('foreignTeacherId')) {
            this.formData.foreignTeacherId = Cookies.get('foreignTeacherId')
          } else {
            this.formData.foreignTeacherId = ''
          }
        }

        getTeachersByDeptId(11).then((res) => {  //外教
          this.foreignTeachersData = res.data.data
          this.initForeignSelectOPtions();
        })
      }
//      if (roleId == 20) {//中教组员

//      } else if (roleId == 23) {//外教组员
//        this.formData.foreignTeacherId = this.userId
//      }


//      this.formData.stage = this.$route.query.stage || Cookies.get('stage');
//      this.formData.status = this.$route.query.status || Cookies.get('status');
//      this.formData.itemType = this.$route.query.itemType || Cookies.get('itemType');
      if (this.$route.query.stage != undefined) {
        this.formData.stage = this.$route.query.stage
        Cookies.set('stage', this.$route.query.stage)
      } else {
        this.formData.stage = Cookies.get('stage')
      }
      if (this.$route.query.status != undefined) {
        this.formData.status = this.$route.query.status
        Cookies.set('status', this.$route.query.status)
      } else {
        this.formData.status = Cookies.get('status')
      }
      if (this.$route.query.itemType != undefined) {
        this.formData.itemType = this.$route.query.itemType
        Cookies.set('itemType', this.$route.query.itemType)
      } else {
        this.formData.itemType = Cookies.get('itemType')
      }
      console.log(this.$route.query.chineseTeacherId)
    },
    mounted() {
      this.gradeOption = this.grade;
      this.schedulePointOption = this.schedulePoint;
    },
    methods: {
      getTypeItems() { //班级类型  下拉菜单
        getClassTypeItems().then((res) => {
          this.classTypeList = res.data;
        })
      },
      getWeekItems() { //每周上课时间
        getWeekTimeItems().then((res) => {
          this.weekTimeItems = res.data;
          console.log(this.weekTimeItems)
        });
      },
      getClassList() { //班级信息检索
        this.formData.current = this.formData.page;
        getClasses(this.formData).then((res) => {
          this.listLoading = false
          this.total = res.data.total
          this.list = res.data.records;

          let teacherWeektimeArr = this.list.map(item => {
            return item.teacherWeektime
          })
          teacherWeektimeArr.forEach((item, index) => { //中教日期提醒处理
            let weekPointArr = item.find(week => {
              return week.teacherType == 0
            })
            let weekday = new Date().getDay()
            if (this.teacherType == 0) {
              if (weekPointArr.week == weekday) {
                weekPointArr.week = '今日有课'
              } else if (weekPointArr.week == (weekday + 1)) {
                weekPointArr.week = '明日有课'
              } else {
                weekPointArr.week = '/'
              }
            } else {
              if (weekPointArr.week == weekday) {
                weekPointArr.week = 'classToday'
              } else if (weekPointArr.week == (weekday + 1)) {
                weekPointArr.week = 'classTomorrow'
              } else {
                weekPointArr.week = '/'
              }
            }

            this.list[index].classStatus = weekPointArr.week
          })
        })
      },
      getChineseGroup() {
        this.formData.chineseTeacherGroupId = ''
        this.formData.chineseTeacherId = ''
        this.chineseTeachersMemberData = ''
        let arr = this.chineseTeachersData.child.filter((item) => {
          return item.id == this.formData.chineseTeacherRegionId
        })
        this.chineseTeachersGroupData = arr[0].child
        console.log(this.chineseTeachersGroupData)
      },
      getChineseMember() {
        this.formData.chineseTeacherId = ''
        let arr = this.chineseTeachersGroupData.filter((item) => {
          return item.id == this.formData.chineseTeacherGroupId
        })
        this.chineseTeachersMemberData = arr[0].users
        console.log(arr[0].users)
      },
      getForeignGroup() {
        this.formData.foreignTeacherGroupId = ''
        this.formData.foreignTeacherId = ''
        this.foreignTeachersMemberData = ''
        let arr = this.foreignTeachersData.filter((item) => {
          return item[0].id == this.formData.foreignTeacherRegionId
        })
        console.log(arr[0][0].child)
        this.foreignTeachersGroupData = arr[0][0].child
      },
      getForeignMember() {
        this.formData.foreignTeacherId = ''
        let arr = this.foreignTeachersGroupData.filter((item) => {
          return item.id == this.formData.foreignTeacherGroupId
        })
        this.foreignTeachersMemberData = arr[0].users
      },
      handleSizeChange(val) {
        this.formData.rows = val
        this.getClassList()
      },
      handleCurrentChange(val) {
        this.formData.page = val
        this.getClassList()
      },
      searchClasses() {  //查询
        this.getClassList();
      },
      checkCourseware(scope) { //查看课件
        this.$router.push({
          path: 'courseware', query: {
            classId: scope.row.classId
          }
        })
      },
      classDetail(scope) {
        this.$router.push({
          path: '/detail/classDetail', query: {
            classId: scope.row.classId
          }
        })
      },
      initChineseSelectOPtions() {
        this.chineseTeachersData.child.forEach((grandparent) => {
          grandparent.users.forEach(item => {
            if (item.userId == this.userId) {
              this.chineseTeacherRegionFlag = true
              this.formData.chineseTeacherRegionId = grandparent.id
            }
          })

          if (grandparent.id == this.userId) {
            console.log('大区' + grandparent.id)
          } else {
            grandparent.child.forEach(parent => {
              if (parent.id == this.userId) {
                console.log('组长' + parent.name)
              } else {
                parent.users.forEach((item) => {
                  if (item.userId == this.userId) {
                    if (item.roleId == 20) {
                      this.chineseTeacherRegionFlag = true
                      this.chineseTeacherGroupFlag = true
                      this.chineseTeacherFlag = true
                    } else if (item.roleId == 21) {
                      this.chineseTeacherRegionFlag = true
                      this.chineseTeacherGroupFlag = true
                    }
                    if (item.roleId == 21) {
                      this.formData.chineseTeacherId = ''
                    } else {
                      this.formData.chineseTeacherId = item.userId
                    }
                    if (item.roleId == 20) {
                      this.ccData.chineseTeacherId = item.userId
                    }

                    this.formData.chineseTeacherGroupId = parent.id
                    this.formData.chineseTeacherRegionId = grandparent.id
                  }
                })
              }
            })
          }
        })
      },
      initForeignSelectOPtions() { //外教初始化
        this.foreignTeachersData.child.forEach((grandparent) => {
          grandparent.users.forEach(item => {
            if (item.userId == this.userId) {
              this.foreignTeacherRegionFlag = true
              this.formData.foreignTeacherRegionId = grandparent.id
            }
          })
          if (grandparent.id == this.userId) {
            console.log('大区' + grandparent.id)
          } else {
            grandparent.child.forEach(parent => {
              if (parent.id == this.userId) {
                console.log('组长' + parent.name)
              } else {
                parent.users.forEach((item) => {
                  if (item.userId == this.userId) {
                    if (item.roleId == 23) {
                      this.foreignTeacherRegionFlag = true
                      this.foreignTeacherGroupFlag = true
                      this.foreignTeacherFlag = true
                    } else if (item.roleId == 24) {
                      this.foreignTeacherRegionFlag = true
                      this.foreignTeacherGroupFlag = true
                    }
                    if (item.roleId == 24) {
                      this.formData.foreignTeacherId = null
                    } else {
                      this.formData.foreignTeacherId = item.userId
                    }

                    if (item.roleId == 23) {
                      this.ccData.foreignTeacherId = item.userId
                    }
                    this.formData.foreignTeacherGroupId = parent.id
                    this.formData.foreignTeacherRegionId = grandparent.id
                  }
                })
              }
            })
          }
        })
      },
      holdCreateTime() {
        let {createTime} = this.timeData
        this.formData.orderByField = 'createTime'
        this.formData.asc = createTime
        this.formData.createTimeGe = null
        this.formData.createTimeLe = null
        this.formData.startTimeGe = null
        this.formData.startTimeLe = null
        this.formData.endTimeGe = null
        this.formData.endTimeLe = null
        this.timeData.startTime = null
        this.timeData.endTime = null
        this.getClassList();
      },
      getCreateTime() {
        let {createTime} = this.timeData
        this.formData.createTimeGe = createTime[0]
        this.formData.createTimeLe = createTime[1]
        this.formData.startTimeGe = null
        this.formData.startTimeLe = null
        this.formData.endTimeGe = null
        this.formData.endTimeLe = null
        this.timeData.startTime = null
        this.timeData.startTime = null
        this.timeData.endTime = null
        this.formData.orderByField = null
        this.formData.asc = null
        this.getClassList();
      },
      holdStartTime() {
        let {startTime} = this.timeData
        this.formData.orderByField = 'startTime'
        this.formData.asc = startTime
        this.formData.startTimeGe = null
        this.formData.startTimeLe = null
        this.formData.createTimeGe = null
        this.formData.createTimeLe = null
        this.formData.endTimeGe = null
        this.formData.endTimeLe = null
        this.timeData.createTime = null
        this.timeData.endTime = null
        this.getClassList();
      },
      getStartTime() {
        let {startTime} = this.timeData
        this.formData.startTimeGe = startTime[0]
        this.formData.startTimeLe = startTime[1]
        this.formData.createTimeGe = null
        this.formData.createTimeLe = null
        this.formData.endTimeGe = null
        this.formData.endTimeLe = null
        this.timeData.createTime = null
        this.timeData.endTime = null
        this.formData.orderByField = null
        this.formData.asc = null
        this.getClassList();
      },
      holdEndTime() {
        let {endTime} = this.timeData
        this.formData.orderByField = 'endTime'
        this.formData.asc = endTime
        this.formData.startTimeGe = null
        this.formData.startTimeLe = null
        this.formData.createTimeGe = null
        this.formData.createTimeLe = null
        this.formData.endTimeGe = null
        this.formData.endTimeLe = null
        this.timeData.createTime = null
        this.timeData.startTime = null
        this.getClassList();
      },
      getEndTime() {
        let {endTime} = this.timeData
        this.formData.endTimeGe = endTime[0]
        this.formData.endTimeLe = endTime[1]
        this.formData.startTimeGe = null
        this.formData.startTimeLe = null
        this.formData.createTimeGe = null
        this.formData.createTimeLe = null
        this.timeData.startTime = null
        this.timeData.createTime = null
        this.formData.orderByField = null
        this.formData.asc = null
        this.getClassList();
      },
      resetData() {
        this.formData.classTypeId = ''
        this.formData.currentNumber = ''
        this.formData.weektimeId = ''
        this.formData.grade = ''
        this.formData.classTime = ''
      }
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
      timestampToDate: function (timestamp) {
        return sfTools.getDateFromTimestamp(timestamp);
      },
      getDescByJson: function (json) {
        //jsonStr:"{"weekPoint": "1,3,5","teacherInfo":[{"week":"1","teacherType":0},{
        // return JSON.parse(json).desc;
        if (isEnglishSanfeng === true) {
          if (JSON.parse(json).weekPoint === "1,3,5") {
            return 'Mon/Wed/Fri - CFF';
          } else {
            return 'Sun/Tues/Thur - CFF';
          }
        } else {
          return JSON.parse(json).desc;
        }

      },
      dateTimesToWeek(item) {
        let weekday = new Date().getDay()
        if (item == weekday) {
          return '今日有课'
        } else if (item == (weekday - 1)) {
          return '明日有课'
        } else {
          return '/'
        }
      },
      filterTime(item) {
        if (item) {
          return item.substring(0, 10);
        }
      }
    },
    watch: {
      'formData.chineseTeacherRegionId'(newVal, oldVal) {
        if (newVal && oldVal) {
          this.formData.chineseTeacherGroupId = ''
          this.formData.chineseTeacherId = ''
        }
        let arr = this.chineseTeachersData.child.filter((item) => {
          return item.id == newVal
        })
        this.chineseTeachersGroupData = arr[0].child
      },
      'formData.foreignTeacherRegionId'(newVal, oldVal) {
        if (newVal && oldVal) {
          this.formData.foreignTeacherGroupId = ''
          this.formData.foreignTeacherId = ''
        }
        let arr = this.foreignTeachersData.child.filter((item) => {
          return item.id == newVal
        })
        this.foreignTeachersGroupData = arr[0].child
      },
      'formData.chineseTeacherGroupId'(newVal, oldVal) {
        if (newVal && oldVal) {
          this.formData.chineseTeacherId = ''
        }
        let arr = this.chineseTeachersGroupData.filter((item) => {
          return item.id == newVal
        })
        if (arr.length) {
          if (arr[0].users) {
            this.chineseTeachersMemberData = arr[0].users.filter(item => {
              return item.roleId != 21
            })
          }
        }
      },
      'formData.foreignTeacherGroupId'(newVal, oldVal) {
        if (newVal && oldVal) {
          this.formData.foreignTeacherId = ''
        }
        let arr = this.foreignTeachersGroupData.filter((item) => {
          return item.id == newVal
        })
        if (arr.length) {
          if (arr[0].users) {
            this.foreignTeachersMemberData = arr[0].users.filter(item => {
              return item.roleId != 21
            })
          }
        }
      },
      'ccData.chineseTeacherId'(newVal, oldVal) {
        this.formData.chineseTeacherId = newVal
      },
      'ccData.foreignTeacherId'(newVal, oldVal) {
        this.formData.foreignTeacherId = newVal
      },
    }

  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import '../../sale/detail/detail.scss';

  .classing { //@include调用
    @include detail-container();
    @include btn();
    .search_header {
      height: 78px;
      line-height: 78px;
      background: #ffffff;
      border-radius: 10px;
      padding-left: 30px;
      margin-bottom: 26px;
      .el-row {
        width: 100%;
      }
    }
    .search_middle, .search_bottom {
      display: flex;
      align-items: center;
      background: #ffffff;
      border-radius: 10px;
      margin-bottom: 26px;
      padding: 24px 0 0 32px;
      .el-row:nth-of-type(1) {
        margin-bottom: 24px;
      }
    }
    .today {
      color: red;
    }
    .tomorry {
      color: orange;
    }
  }
</style>
