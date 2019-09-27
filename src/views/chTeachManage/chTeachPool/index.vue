<template>
  <div class="app-container calendar-list-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input clearable=""
                  v-model="queryList.teacherName"
                  :placeholder="$t('i18nView.ehTeachPool.searchTeacherName')"
                  @keyup.native.13="nameTest"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input clearable=""
                  v-model="queryList.classInPhone"
                  :placeholder="$t('i18nView.ehTeachPool.searchClassInPhone')"
                  @keyup.native.13="phoneTest()">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-select :disabled="areaDisable"
                   :placeholder="$t('i18nView.ehTeachPool.searchDaqu')"
                   v-model="area">
          <el-option
            v-for="item in areas"
            :label="item.name" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select :disabled="groupDisable"
                   :placeholder="$t('i18nView.ehTeachPool.searchZubie')"
                   v-model="group">
          <el-option
            v-for="item in groups"
            :label="item.name" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryList.sex" v-if="!isEnglish"
                   :placeholder="$t('i18nView.ehTeachPool.sex')"
                   @change="dutyTypeChange">
          <el-option
            v-for="item in sexs"
            :label="item.name" :value="item.id" :key="item.id">

          </el-option>
        </el-select>
        <el-select v-model="queryList.sex" v-if="isEnglish"
                   :placeholder="$t('i18nView.ehTeachPool.sex')"
                   @change="dutyTypeChange">
          <el-option
            v-for="item in sexs2"
            :label="item.name" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryList.language"
                   :placeholder="$t('i18nView.ehTeachPool.language')"
                   @change="dutyTypeChange">
          <el-option
            v-for="item in languages"
            :label="item.name" :value="item.name" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryList.dutyType" v-if="!isEnglish"
                   :placeholder="$t('i18nView.ehTeachPool.property')"
                   @change="dutyTypeChange">
          <el-option
            v-for="item in dutyTypes"
            :label="item.name" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
        <el-select v-model="queryList.dutyType" v-if="isEnglish"
                   :placeholder="$t('i18nView.ehTeachPool.property')"
                   @change="dutyTypeChange">
          <el-option
            v-for="item in dutyTypes2"
            :label="item.name" :value="item.id" :key="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>-->
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" :label="$t('i18nView.ehTeachPool.name')">
      </el-table-column>
      <el-table-column prop="phone"
                       :label="$t('i18nView.ehTeachPool.searchClassInPhone')"
                       width="180">
      </el-table-column>
      <el-table-column prop="depts" :label="$t('i18nView.ehTeachPool.searchDaqu')">
        <template slot-scope="scope">
          {{scope.row.depts | areaFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="depts" :label="$t('i18nView.ehTeachPool.searchZubie')">
        <template slot-scope="scope">
          {{scope.row.depts | groupFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="sex" :label="$t('i18nView.ehTeachPool.sex')">
        <template slot-scope="scope">
          <span v-show="scope.row.sex==true&&isEnglish==false">男</span>
          <span v-show="scope.row.sex==false&&isEnglish==false">女</span>
          <span v-show="scope.row.sex==true&&isEnglish==true">Male</span>
          <span v-show="scope.row.sex==false&&isEnglish==true">Female</span>
          <!--{{scope.row.sex==false?'女':'男'}}-->
        </template>
      </el-table-column>
      <el-table-column prop="language" :label="$t('i18nView.ehTeachPool.language')">
        <template slot-scope="scope">
          <span v-show="scope.row.language=='英语'&&isEnglish==true">English</span>
          <span v-show="scope.row.language=='英语'&&isEnglish==false">英语</span>
        </template>
      </el-table-column>
      <el-table-column prop="dutyType" :label="$t('i18nView.ehTeachPool.property')">
        <template slot-scope="scope">
          <span v-show="scope.row.dutyType==0&&isEnglish==false">兼职</span>
          <span v-show="scope.row.dutyType==1&&isEnglish==false">全职</span>
          <span v-show="scope.row.dutyType==0&&isEnglish==true">Part Time</span>
          <span v-show="scope.row.dutyType==1&&isEnglish==true">Full Time</span>
          <!--{{scope.row.dutyType | dutyFilter}}-->
        </template>
      </el-table-column>
      <el-table-column prop="teachAge" :label="$t('i18nView.ehTeachPool.serviceLength')">
        <template slot-scope="scope">
          <!--{{scope.row.teachAge | monthToYearFilter}}-->
          <span v-if="scope.row.teachAge >= 12">{{scope.row.teachAge | monthToYearFilter}}</span><span v-if="scope.row.teachAge >= 12">{{$t('i18nView.ehTeachPool.year')}}</span>{{scope.row.teachAge | monthToMonthFilter}}{{$t('i18nView.ehTeachPool.month')}}
        </template>
      </el-table-column>
      <el-table-column prop="pk" :label="$t('i18nView.ehTeachPool.pkTime')">
        <template slot-scope="scope">
          <!--{{scope.row.pk | monthToYearFilter}}-->
          <span v-if="scope.row.pk >= 12">{{scope.row.pk | monthToYearFilter}}</span><span v-if="scope.row.pk >= 12">{{$t('i18nView.ehTeachPool.year')}}</span>{{scope.row.pk | monthToMonthFilter}}{{$t('i18nView.ehTeachPool.month')}}

          <!-- {{scope.row.pk == null ? 0 : scope.row.pk}} {{$t('i18nView.ehTeachPool.month')}} -->
        </template>
      </el-table-column>
      <el-table-column prop="address" :label="$t('i18nView.ehTeachPool.teacherInfo')">
        <template slot-scope="scope">
          <el-button size="small" type="success"
                     @click="checkTeach(scope.row)">{{$t('i18nView.ehTeachPool.btnView')}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" :label="$t('i18nView.ehTeachPool.availableTime')">
        <template slot-scope="scope">
          <el-button size="small" type="success"
                     @click="checkTime(scope.row,'1')">{{$t('i18nView.ehTeachPool.btnView')}}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="线下可用时间" v-if="!isEnglish">
        <template slot-scope="scope">
          <el-button size="small" type="success"
                     @click="checkTime(scope.row,'-1')">{{$t('i18nView.ehTeachPool.btnView')}}
          </el-button>
        </template>
      </el-table-column>
      
      <el-table-column prop="address" :label="$t('i18nView.ehTeachPool.course')">
        <template slot-scope="scope">
          <el-button size="small" type="success"
                     @click="checkLesson(scope.row)">{{$t('i18nView.ehTeachPool.btnView')}}
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
  </div>
</template>

<script>
  //import { roleList, deptRoleList, fetchDeptTree } from '@/api/role'
  //import { getParentDepthId, circleTop } from '@/utils/index';
  import { getChTeacherLesson } from '@/api/aom';
  import { fetchTree } from '@/api/dept'
  import { validatePhone } from '@/utils/validate';
  import { getRightDepth, getAllDepth, getAllId } from '@/utils/index';
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'
  import local from '@/views/i18n-demo/local'
  const viewName = 'i18nView'

  export default {
    components: {},
    name: 'table_user',
    directives: {
      waves
    },
    data() {
      return {
        depthTree: null,
        areas0: null,
        areas: null,
        groups0: null,
        groups: null,
        area: null,
        group: null,
        areaDisable: false,
        groupDisable: false,
        depthList: null,
        formInline: {
          user: null,
          region: null
        },
        initDepthId: null,
        initCreat: false,
        queryList: {
          pages: 1,
          pageSize: 10,
          deptIds: null,
          roleType: null,    //0组织，1个人
          userId: null,
          teacherType: null, //0中教，1外教
          teacherName: null,
          classInPhone: null,
          sex: null,
          language: null,
          dutyType: null
        },
        total: null,
        tableData: [],
        dutyTypes: [
          {id: 1, name: '全职',},
          {id: 0, name: '兼职',}
        ],
        dutyTypes2: [
          {id: 1, name: 'Full Time',},
          {id: 0, name: 'Part Time',}
        ],
        languages: [
          {id: 1, name: 'English'},
          {id: 0, name: '中文'}
        ],
        sexs: [
          {id: 0, name: '女'},
          {id: 1, name: '男'},
        ],
        sexs2: [
          {id: 0, name: 'Female'},
          {id: 1, name: 'Male'},
        ],
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
      sexFilter(sex){
        const sexMap = {'true': '男', 'false': '女'};
        return sexMap[sex]
      },
      dutyFilter(dutyType){
        const dutyMap = {0: '兼职', 1: '全职'};
        return dutyMap[dutyType]
      },
      monthToYearFilter(month) {
        if(month<12){
          return 0
        }else{
          return (Math.floor(month / 12) )
        }

      },
      monthToMonthFilter(month) {
        return  month % 12
      },
      areaFilter(depts) {
        return depts.split('-')[1]
      },
      groupFilter(depts) {
        return depts.split('-')[2]
      }
    },
    created() {
      /*this.sys_user_del = this.permissions['sys_user_del']*/
      if (JSON.stringify(this.$route.params).charAt(2) == 2) {
        this.queryList.teacherType = 0;
      } else {
        this.queryList.teacherType = 1;
      }
      this.queryList.userId = this.$store.getters.userId
      for (var i in this.$route.params) {
        //获取中外教池子选择
        this.initDepthId = i
      }
//      if (this.initDepthId === 2) {
//        this.queryList.teacherType = 0
//      } else {
//        this.queryList.teacherType = 1
//      }
      //获取登陆用户部门(组织或个人)
      this.queryList.roleType = this.roles.some(v => v === 'TEACHER' || v === 'TUTOR') ? 1 : 0;
      this.sfRoleType = this.roles[0].toLowerCase();
      this.getDepthTree();
      //部门级联权限判断
      //this.getUserPermission()

      if (!this.$i18n.getLocaleMessage('en')[viewName]) {
        this.$i18n.mergeLocaleMessage('en', local.en)
        this.$i18n.mergeLocaleMessage('zh', local.zh)
      }
      let [roleId] = this.roleIds;
      if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.$i18n.locale = 'en'
        this.$store.dispatch('setLanguage', 'en')
        this.isEnglish = true;
      } else {
        this.$i18n.locale = 'zh'
        this.$store.dispatch('setLanguage', 'zh');
        this.isEnglish = false;
      }
    },
    watch: {
      area: function (val) {
        this.groups0 = getAllDepth(this.depthTree, val)
        this.groups = this.groups0.children
        //滞空组别
        //预加载否定
        if (this.initCreat) {
          this.initCreat = false
          //大区下部门Ids
          this.depthList = getAllId(val, this.groups)
          this.queryList.deptIds = this.depthList
          this.getList()
          return
        } else {
          this.group = null
          //大区下部门Ids
          this.depthList = getAllId(val, this.groups)
          this.queryList.deptIds = this.depthList
          this.getList()
        }

      },
      group: function (val) {
        if (val) {
          this.depthList = val
        } else {
          return
        }
        this.queryList.deptIds = this.depthList
        this.getList()
      }
    },
    methods: {
      //分页操作
      handleSizeChange(val) {
        this.queryList.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.queryList.pages = val
        this.getList()
      },
      //初始化获取部门树
      getDepthTree(){
        fetchTree().then(response => {
          this.depthTree = response.data
          //根据中外交部门，查询该部门下所有部门id
          this.areas0 = getAllDepth(this.depthTree, this.initDepthId)
          this.areas = this.areas0.children
          //加载否定
          this.initCreat = true
          //禁用上级部门
          var deep = getRightDepth(this.depthTree, this.deptId)
          let allDepth = getAllDepth(this.depthTree, this.deptId)
          if (deep == 1) {
            this.area = allDepth.id
            this.areaDisable = true
          } else if (deep == 2) {
            this.area = allDepth.parentId
            //拉去区下小组信息
            this.group = allDepth.id
            //判断组员组长
            if (this.roles[0] == 'SALE') {
              this.member = this.userId
              deep = 3
            }
            this.areaDisable = true
            this.groupDisable = true
          } else if (deep == 0) {
            this.depthList = getAllId(this.deptId, this.areas)
            this.queryList.deptIds = this.depthList
            this.getList()
          }
        })
      },

      getList() {
        getChTeacherLesson(this.queryList).then(response => {
          let data = response.data
          if (data.code === 0) {
            this.tableData = data.result.records
            this.total = data.result.total
          }
        })
      },
      checkTeach(row) {
        this.$router.push({path: 'teacherInfo', query: {userId: row.userId, teacherType: this.queryList.teacherType}});
      },
      checkTime(row,timeType) {
        let isChinese = row.depts.search('外教') > -1 ? '外' : '中';
        let type
        if(timeType=='-1'){
          type = timeType
        }else{
          if(isChinese =='外'){
            type = '1'
          }else{
            type = '0'
          }
        }
       
        //return;
        let area = row.depts.split('-')[1];
        let group = row.depts.split('-')[2];
        let name = row.name;
        if (this.sfRoleType === 'aom') {
          this.$router.push({
            path: '/aom/availabletime-usable',
            query: {
              teacherId: row.userId, isChinese: isChinese,
              area: area, group: group, name: name, type:type
            }
          });
        } else {
          this.$router.push({
            path: '/teachers/tutorUptime',
            query: {
              teacherId: row.userId, isChinese: isChinese,
              area: area, group: group, name: name, type:type
            }
          });
        }
      },
      checkLesson(row) {
        this.$router.push({
          path: 'courseInfo',
          query: {
            userId: row.userId,
            teacherType: this.queryList.teacherType,
            teacherName: row.name,
            teacherDepth: row.depts
          }
        });
      },
      dutyTypeChange() {
        this.getList()
      },
      phoneTest(){
        if (validatePhone(this.queryList.classInPhone)) {
          this.getList()
        } else {
          this.$message.error('手机号码格式不正确！');
        }
      },
      nameTest() {
        if (this.queryList.teacherName) {
          this.getList()
        } else {
          return
        }
      }
    }
  }
</script>
<style lang="scss">
  .app-container {
    .demo-form-inline {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .el-form--inline .el-form-item {

    }
  }
</style>
