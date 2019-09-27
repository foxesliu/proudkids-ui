<template>
  <div class="classing" ref="classingContainer">

    <div class="table mb18">
      <h3 class="pt30 pl30 pb30 org">
        {{$t('i18nView.classDetail.currentNumber')}}   <span>{{currentNumber}}</span>/<span>{{classNumber}}</span>
      </h3>
      <el-table :key='tableKey' :data="listData" v-loading="listLoading" element-loading-text="正在加载中" border fit
                style="width: 100%">
        <el-table-column align="center" :label="$t('i18nView.classDetail.table.phone')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.phone || '/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.name')" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.name || '/'}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.enName')" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.enName || '/'}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.periods')" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.periods}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.createTime')" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.createTime || '/'}}
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.userDetail')" show-overflow-tooltip class="ruserDetail"
                         v-if="sale_classing_button">
          <template slot-scope="scope">
            <el-button size="mini" @click="ruserDetail(scope)">{{$t('i18nView.classDetail.table.detail')}}</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.ruserDetail')" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" @click="checkRuserDetail(scope)">{{$t('i18nView.classDetail.table.look')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="classInfo mb18">
      <p>
        <span>{{$t('i18nView.classDetail.classStatus')}}</span>
        <span v-if="classInfoData.status==1&&teacherType==0" style="color: red;font-weight: bold;">已关闭</span>
        <span v-if="classInfoData.status==1&&teacherType==1" style="color: red;font-weight: bold;">already closed</span>
        <template v-if="classInfoData.status==0&&teacherType==0">
          <span v-if="classInfoData.endTimeStatus=='正常进行中'"
                style="color: green;font-weight: bold;">{{classInfoData.endTimeStatus}}</span>
          <span v-if="classInfoData.endTimeStatus=='已经结束'"
                style="color: #fc7f35;font-weight: bold;">{{classInfoData.endTimeStatus}}</span>
        </template>
        <template v-if="classInfoData.status==0&&teacherType==1">
          <span v-if="classInfoData.endTimeStatus=='normal class'"
                style="color: green;font-weight: bold;">{{classInfoData.endTimeStatus}}</span>
          <span v-if="classInfoData.endTimeStatus=='already over'"
                style="color: #fc7f35;font-weight: bold;">{{classInfoData.endTimeStatus}}</span>
        </template>
        <!--<span style="color: #15bc9a;" >未关闭</span>-->

      </p>
      <p>
        <span>{{$t('i18nView.classDetail.classTypeName')}}{{classInfoData.classTypeName}}</span>
      </p>
      <p>
        <span>{{$t('i18nView.classDetail.grade')}}{{classInfoData.grade }}</span>
      </p>
      <p>
        <span v-if="teacherType==0">{{$t('i18nView.classDetail.itermType')}}{{classInfoData.itermType == 1 ? '长期' : '短期'}}</span>
        <span v-else>{{$t('i18nView.classDetail.itermType')}}{{classInfoData.itermType == 1 ? 'longTerm' : 'shortTerm'}}</span>
      </p>
      <p>
        <span>{{$t('i18nView.classDetail.classTime')}}{{classInfoData.classTime|classTimesToSA }}</span>
      </p>

      <p>
        {{$t('i18nView.classDetail.teacherWeektime')}}
        <template v-for="item in classInfoData.teacherWeektime">
          <span>{{item.week}}</span>
        </template>
        -
        <template v-for="item in classInfoData.teacherWeektime">
          <span>{{item.teacher}}</span>
        </template>
      </p>

      <p>
        <span>{{$t('i18nView.classDetail.courseName')}}{{classInfoData.courseName}}</span>
      </p>

      <p>
        <span>{{$t('i18nView.classDetail.startTime')}}{{classInfoData.startTime | filterTime}}</span>
      </p>
      <p>
        <span>{{$t('i18nView.classDetail.endTime')}}{{classInfoData.endTime | filterTime}}</span>
      </p>
    </div>

    <div class="classInfo mb18">
      <p>
        <span>{{$t('i18nView.classDetail.name')}}<b class="org">{{classInfoData.name }}</b></span>
      </p>
      <p>
        <span>{{$t('i18nView.classDetail.liveAddr')}} <a target="blank" class="href" :href="classInfoData.liveAddr">{{$t('i18nView.classDetail.enterHref')}}</a></span>
      </p>
    </div>

    <div class="classInfo mb18">
      <p>
        <span>{{$t('i18nView.classDetail.chineseTeacherRegionName')}}{{classInfoData.chineseTeacherRegionName + '-' + classInfoData.chineseTeacherGroupName + '-' + '中教 (' + classInfoData.chineseTeacherName + ')'
          }}</span>
      </p>
    </div>

    <div class="classInfo mb18">
      <p>
        <span>{{$t('i18nView.classDetail.foreignTeacherRegionName')}}{{classInfoData.foreignTeacherRegionName + '-' + classInfoData.foreignTeacherGroupName + '-' + '外教 (' + classInfoData.foreignTeacherName + ')'
          }}</span>
      </p>
    </div>

    <div class="table" v-if="sale_classing_button">
      <h3 class="pt30 pl30 pb30 org mt30">
        {{$t('i18nView.classDetail.table.lastRuserNum')}}   <span>{{lastRuserNum}}</span>
      </h3>
      <el-table :key='tableKey' :data="lastListData" v-loading="listLoading" element-loading-text="正在加载中" border fit
                style="width: 100%">
        <el-table-column align="center" :label="$t('i18nView.classDetail.table.phone')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.phone || '/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.name')" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.name || '/'}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.enName')" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.enName || '/'}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.periods')" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.periods || '/'}}
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.createTime')" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.createTime || '/'}}
          </template>
        </el-table-column>


        <el-table-column align="center" :label="$t('i18nView.classDetail.table.userDetail')" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" @click="ruserDetail(scope)">{{$t('i18nView.classDetail.table.detail')}}</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.classDetail.table.ruserDetail')" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" @click="checkRuserDetail(scope)">{{$t('i18nView.classDetail.table.look')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
  import local from '@/views/i18n-demo/local'
  import {sfTools} from '@/views/aom/util.js';
  let isEnglishSanfeng = false;

  const viewName = 'i18nView'
  import {mapGetters} from 'vuex'
  import {classInfo, classRuserList} from '@/api/detail' // 班级详情,班级学生列表
  export default {
    data() {
      return {
        teacherType: null,
        listLoading: false,
        tableKey: 0,
        lastRuserNum: '',
        classId: '',//班级id
        currentNumber: '',//当前人数
        classNumber: '',//总人数
        classInfoData: {},
        listData: [],
        lastListData: [],
        sale_classing_button: '',  //禁用用户详情

      }
    },
    computed: {
      ...mapGetters(['detailPhone', 'detailType', 'detailInfo', 'ruserInfo', 'roleIds', 'permissions'])
    },
    created() {
      console.log(this.permissions)
      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }
      let [roleId] = this.roleIds;
      if (roleId == 20 || roleId == 21 || roleId == 22 || roleId == 31) {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh')
        this.teacherType = 0
      } else if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.$i18n.locale = 'en'
        isEnglishSanfeng = true;
        this.$store.dispatch('setLanguage', 'en')
        this.teacherType = 1
      }

      this.sale_classing_button = this.permissions.sale_classing_button  //按钮权限
      //获取路由参数
      const {phone, classId} = this.$route.query
//      this.phone = phone;
      this.classId = classId;
    },
    mounted() {
      this.getList()
    },
    methods: {
      checkRuserDetail(scope) {
        console.log(scope.row)
        this.$router.push({
          path: 'ruserClassInfo',
          query: {classId: scope.row.classId, ruserId: scope.row.ruserId, phone: scope.row.phone}
        })
        console.log(scope.row)
        this.$store.commit('SET_DETAIL_RUSERINFO', scope.row)
        console.log(this.ruserInfo)
      },
      ruserDetail(scope) {
        console.log(scope.row.phone)
        this.$router.push({path: 'user', query: {phone: scope.row.phone}})
      },
      getList() {
        classInfo(this.classId).then((res) => { //班级详情
          this.classInfoData = res.data;
          var endTime = new Date(this.classInfoData.endTime).getTime()
          var nowTime = new Date().getTime()
          if (this.teacherType == 0) {//中教
            if (endTime - nowTime > 0) {
              this.classInfoData.endTimeStatus = '正常进行中'
            } else {
              this.classInfoData.endTimeStatus = '已经结束'
            }
          } else {
            if (endTime - nowTime > 0) {
              this.classInfoData.endTimeStatus = 'normal class'
            } else {
              this.classInfoData.endTimeStatus = 'already over'
            }
          }


          this.classInfoData.teacherWeektime.forEach(item => {
            if(this.teacherType==0){
              if (item.teacherType == 0) {
                item.teacher = '中教'
              }else{
                item.teacher = '外教'
              }
              if (item.week == 1) {
                item.week = '周一'
              } else if (item.week == 2) {
                item.week = '周二'
              } else if (item.week == 3) {
                item.week = '周三'
              } else if (item.week == 4) {
                item.week = '周四'
              } else if (item.week == 5) {
                item.week = '周五'
              } else if (item.week == 6) {
                item.week = '周六'
              } else if (item.week == 7) {
                item.week = '周日'
              }
            }else{
              if (item.teacherType == 0) {
                item.teacher = 'chineseTeacher  '
              }else{
                item.teacher = 'foreignTeacher  '
              }
              if (item.week == 1) {
                item.week = 'Monday'
              } else if (item.week == 2) {
                item.week = 'Tuesday'
              } else if (item.week == 3) {
                item.week = 'Wednesday'
              } else if (item.week == 4) {
                item.week = 'Thursday'
              } else if (item.week == 5) {
                item.week = 'Friday'
              } else if (item.week == 6) {
                item.week = 'Saturday'
              } else if (item.week == 7) {
                item.week = 'Sunday'
              }
            }
          })
          const {currentNumber, classNumber} = res.data
          this.currentNumber = currentNumber
          this.classNumber = classNumber

        }).catch((res) => {
          console.log(res)
        })

        classRuserList(this.classId).then((res) => { //班级学生列表
          let [roleId] = this.roleIds;
          if (roleId == 17 || roleId == 18 || roleId == 19) {//销售
            let {ruserId} = JSON.parse(sessionStorage.getItem('detailParams'))[0]
            this.listData = res.data.filter((res) => {  //当前学生信息
              return res.ruserId == ruserId
            })
          } else {

            this.listData = res.data.filter((res) => {  //正在上课的学生
              return res.periods > 0
            })

            this.lastListData = res.data.filter((res) => {  //曾经呆过的学生列表
              return res.periods == 0
            })

            this.lastRuserNum = this.lastListData.length;
          }


        }).catch((res) => {
          console.log(res)
        })

      },
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
      classEndTime: function (time) {
        var endTime = new Date(time).getTime()
        var nowTime = new Date().getTime()
        if (endTime - nowTime > 0) {
          return '正常进行中'
        } else {
          return '已经结束'
        }
      },
      filterTime(item) {
        if (item) {
          return item.substring(0, 10);
        }
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../detail.scss';

  .classing {
    @include detail-container();
    @include btn();
    p {
      line-height: 42px;
    }
    .classInfo {
      padding: 20px 0 25px 66px;
      background: #fff;
      border-radius: 10px;
      border: 2px solid #f6f6f6;
    }
    .table {
      padding-bottom: 40px;
      background: #fff;
    }
    .ruserDetail {
      .el-buttton {
        background: pink;
        color: blue
      }
    }
    .href{
      text-decoration:underline;
      color: blue
    }
  }
  
</style>
