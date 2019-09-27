<template>
  <div class="aom-container">
    <div class="p-20 con" id="classing" v-cloak="true">
      <div class="search-box o-hidden">
        <el-select v-model="formData.classTypeId" class="width-150"
                   :placeholder="$t('i18nView.classing.classTypeId')">
          <el-option v-for="item in classTypeList"
                     :key="item.classTypeId" :label="item.name" :value="item.classTypeId">
          </el-option>
        </el-select>

        <el-select v-model="formData.grade" class="width-150"
                   :placeholder="$t('i18nView.classing.grade')">
          <el-option v-for="item in gradeOption"
                     :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <el-select class="width-150" v-model="formData.currentNumber"
                   :placeholder="$t('i18nView.classing.currentNumber')">
          <el-option v-for="item in classNumbers"
                     :key="item" :label="item" :value="item"></el-option>
        </el-select>

        <el-select v-model="formData.weektimeId" class="width-150" placeholder="Time">
          <el-option v-for="item in weekTimeItems" :key="item.id"
                     :label="(item.jsonStr)|getDescByJson" :value="item.id">
          </el-option>
        </el-select>

        <el-date-picker value-format="yyyy-MM-dd"
                        style="width:150px;"
                        v-model="formData.startTime" type="date"
                        placeholder="Class Date">
        </el-date-picker>

        <!--<el-select v-if="teacherType==0" v-model="formData.classTime" class="width-150"-->
        <!--:placeholder="$t('i18nView.classing.classTime')">-->
        <!--<el-option v-for="item in schedulePointOption"-->
        <!--:key="item.value" :label="item.label" :value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--<el-select v-if="teacherType==1" v-model="formData.classTime" class="width-150"-->
        <!--:placeholder="$t('i18nView.classing.classTime')">-->
        <!--<el-option v-for="item in schedulePointOption"-->
        <!--:key="item.value" :label="item.labelSA" :value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->


      </div>

      <div class="search-box111 o-hidden pt-15">
        <div class="pull-left width70">
          <div class="pull-left">
            <div class="o-hidden" v-if="teacherType==1">
              <span class="pull-left display-block"
                    style="height:36px;line-height:36px;width:50px;">FT</span>
              <div class="pull-left">
                <el-select v-model="formData.foreignTeacherRegionId"
                           placeholder="外教大区"
                           :disabled="foreignTeacherRegionFlag">
                  <el-option v-for="item in foreignTeachersData.child"
                             :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="formData.foreignTeacherGroupId"
                           placeholder="外教组"
                           :disabled="foreignTeacherGroupFlag">
                  <el-option v-for="item in foreignTeachersGroupData"
                             :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="ccData.foreignTeacherId"
                           placeholder="外教"
                           :disabled="foreignTeacherFlag">
                  <el-option v-for="item in foreignTeachersMemberData"
                             :key="item.userId" :label="item.username" :value="item.userId">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="o-hidden" v-if="teacherType==0">
              <span class="pull-left display-block"
                    style="height:36px;line-height:36px;width:50px;">CT</span>
              <div class="pull-left">
                <el-select v-model="formData.chineseTeacherRegionId"
                           placeholder="中教大区" :disabled="chineseTeacherRegionFlag">
                  <el-option v-for="item in chineseTeachersData.child"
                             :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="formData.chineseTeacherGroupId"
                           placeholder="中教组" :disabled="chineseTeacherGroupFlag">
                  <el-option v-for="item in chineseTeachersGroupData"
                             :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="ccData.chineseTeacherId"
                           placeholder="中教" :disabled="chineseTeacherFlag">
                  <el-option v-for="item in chineseTeachersMemberData"
                             :key="item.userId" :label="item.username" :value="item.userId">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        <div class="pull-right width30 t-right mt-15">
          <el-button type="danger" class="width-100 mr-10" @click="reset">Reset</el-button>
          <el-button type="success" class="width-100" @click="searchClasses">Search</el-button>
        </div>
        <div class="clearfix"></div>
      </div>

      <div class="search-box o-hidden">
        <div class="mt-15">
          <el-input v-model="formData.name" class="width-150" placeholder="Class Name"></el-input>
          <el-input v-model="formData.chineseTeacherName" class="width-150"
                    :placeholder="$t('i18nView.classing.chName')"></el-input>
          <el-input v-model="formData.foreignTeacherName" class="width-150"
                    :placeholder="$t('i18nView.classing.foName')"></el-input>
        </div>
      </div>

      <el-table :key='tableKey' :data="list" border class="mt-20"
                v-loading="listLoading" element-loading-text="正在加载中">
        <el-table-column align="center" :label="$t('i18nView.classing.table.className')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="CT" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <span>{{scope.row.chineseTeacherRegionName}}-{{scope.row.chineseTeacherGroupName}}-{{scope.row.chineseTeacherName}}</span>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{scope.row.chineseTeacherName}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column align="center" label="FT" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" v-if="scope.row.foreignTeacherName">
              <span>{{scope.row.foreignTeacherRegionName}}-{{scope.row.foreignTeacherGroupName}}-{{scope.row.foreignTeacherName}}</span>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{scope.row.foreignTeacherName}}</el-tag>
              </div>
            </el-popover>
            <span v-else>------</span>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="Course Name">
          <template slot-scope="scope">
            <span>{{scope.row.courseName}}</span>
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

        <el-table-column align="center" label="Link" show-overflow-tooltip>
          <template slot-scope="scope">
            <a :href="scope.row.liveAddr" target="_blank">
              <el-button type="primary" size="mini">Click</el-button>
            </a>
          </template>
        </el-table-column>

        <el-table-column align="center" label="More" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="classDetail(scope)" type="success" size="mini">More</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div v-show="!listLoading" class="pagination-container mt-20">
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
          name: null,  //班级名称
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
          //itermType: '',  //班级类型 1：长期 2：短期
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
          startTime: ''
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
      this.createdFun();
    },
    mounted() {
      this.gradeOption = this.grade;
      this.schedulePointOption = this.schedulePoint;
    },
    methods: {
      reset() {
        this.ccData = {
          foreignTeacherId: null,
          chineseTeacherId: null
        };
        this.formData = {
          chineseTeacherIdFlag: null,
          page: 1,
          rows: 10,
          current: null,
          stage: null,//班级级别 0：未过期 1：已过期
          classId: null,
          classTypeId: null,  //班级类型ID
          name: null,  //班级名称
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
          //itermType: '',  //班级类型 1：长期 2：短期
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
        };
        this.createdFun();
      },
      async createdFun() {
        if (!this.$i18n.getLocaleMessage('en')[viewName]) {
          this.$i18n.mergeLocaleMessage('en', local.en)
          this.$i18n.mergeLocaleMessage('zh', local.zh)
        }
        //this.formData.status = this.$route.query.status;
        //this.getTeachers();
        this.getTypeItems();
        this.getWeekItems();

        let [roleId] = this.roleIds;
        if (roleId == 20 || roleId == 21 || roleId == 22 || roleId == 31) { //中教
          this.teacherType = 0;
          this.$i18n.locale = 'zh'
          this.$store.dispatch('setLanguage', 'zh')
          // this.formData.chineseTeacherId = this.userId

          const result = await getTeachersByDeptId(2)  //获取中教
          if (result) {
            this.chineseTeachersData = result.data.data
            this.initChineseSelectOPtions();
            this.getClassList();
            if (this.$route.query.chineseTeacherId) {
              this.formData.chineseTeacherId = this.$route.query.chineseTeacherId
              Cookies.set('chineseTeacherId', this.$route.query.chineseTeacherId)
            } else {
              if (Cookies.get('chineseTeacherId')) {
                this.formData.chineseTeacherId = Cookies.get('chineseTeacherId')
              } else {
                this.formData.chineseTeacherId = ''
              }
            }
          }

        } else if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
          this.teacherType = 1;
          isEnglishSanfeng = true;
          this.$store.dispatch('setLanguage', 'en')
          this.formData.foreignTeacherId = this.userId

          const result = await getTeachersByDeptId(11)  //获取外教
          if (result) {
            this.foreignTeachersData = result.data.data
            this.initForeignSelectOPtions();
            this.getClassList();
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
          }
        }

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

      },
      getTypeItems() { //班级类型  下拉菜单
        getClassTypeItems().then((res) => {
          this.classTypeList = res.data;
        })
      },
      getWeekItems() { //每周上课时间
        getWeekTimeItems().then((res) => {
          this.weekTimeItems = res.data;
        });
      },
      async getClassList() { //班级信息检索
        this.formData.current = this.formData.page;
        let result = await getClasses(this.formData)

        this.listLoading = false
        this.total = result.data.total
        this.list = result.data.records;

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

        console.log(teacherWeektimeArr)
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
          path: scope.row.liveAddr
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
            // console.log('大区' + grandparent.id)
          } else {
            grandparent.child && grandparent.child.forEach(parent => {
              if (parent.id == this.userId) {
                // console.log('组长' + parent.name)
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
                      this.formData.chineseTeacherId = null
                    } else {
                      this.formData.chineseTeacherId = item.userId
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
            // console.log('大区' + grandparent.id)
          } else {
            grandparent.child.forEach(parent => {
              if (parent.id == this.userId) {
                // console.log('组长' + parent.name)
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
        // if (newVal && oldVal) {
        //   this.formData.chineseTeacherGroupId = ''
        //   this.formData.chineseTeacherId = ''
        // }
        let arr = this.chineseTeachersData.child.filter((item) => {
          return item.id == newVal
        })
        this.chineseTeachersGroupData = arr[0].child
      },
      'formData.foreignTeacherRegionId'(newVal, oldVal) {
        // if (newVal && oldVal) {
        //   this.formData.foreignTeacherGroupId = ''
        //   this.formData.foreignTeacherId = ''
        // }
        let arr = this.foreignTeachersData.child.filter((item) => {
          return item.id == newVal
        })
        this.foreignTeachersGroupData = arr[0].child
      },
      'formData.chineseTeacherGroupId'(newVal, oldVal) {
        // if (newVal && oldVal) {
        //   this.formData.chineseTeacherId = ''
        // }
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
        // if (newVal && oldVal) {
        //   this.formData.foreignTeacherId = ''
        // }
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
  @import "../../aom/index.scss";

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
