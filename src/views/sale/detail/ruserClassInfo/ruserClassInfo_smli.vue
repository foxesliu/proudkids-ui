<template>
  <div class="ruserClassInfo">
    <header-box :userInfo="userInfo"></header-box>
    <div class="ruserCourse">
      <h1 class="org fs26 b">{{$t('i18nView.ruserClassInfo.title')}}</h1>
      <div class="btn">
        <el-button size="mini" @click="getAvailableClass" class="ml15 mr30"
                   :class="{ 'selected' : !isSelected, 'notSelected': isSelected}">
          {{$t('i18nView.ruserClassInfo.availableClass')}}({{availableTotal}})
        </el-button>
        <el-button size="mini" @click="getNoAvailableClass"
                   :class="{ 'selected' : isSelected, 'notSelected': !isSelected}">
          {{$t('i18nView.ruserClassInfo.noAvailableClass')}}({{noavailableTotal}})
        </el-button>
      </div>

    </div>
    <el-container>
      <el-table :key='tableKey' :data="availableClass" v-loading="listLoading" element-loading-text="正在加载中" border fit
                style="width: 100%" v-if="availableClassFlag">
        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.courseName')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.courseName || '/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.lessonName')" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.lessonName || '/'}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.originTime')" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.originTime | substring10}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.ruserStatus')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="teacherType==1">{{scope.row.ruserStatus == 1 ? 'Attended' : 'Not Attended'}}</span>
            <span v-else>{{scope.row.ruserStatus == 1 ? '已上课' : '待上课'}}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="teacherType==0" align="center" label="预习材料" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button v-if="scope.row.isPerview==1" size="mini" @click="gotoBeforeClassPage(scope.row)">查看</el-button>
            <span v-if="scope.row.isPerview!=1">未预习</span>
            <!--<el-button @click="gotoBeforeClassPage(scope.row)">进入</el-button>-->
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.monitorAddr')" show-overflow-tooltip>
          <template slot-scope="scope">
            <a :href="scope.row.monitorAddr" target="_blank">{{$t('i18nView.ruserClassInfo.look')}}</a>
          </template>
        </el-table-column>
      </el-table>
      <el-table :key='tableKey' :data="noAvailableClass" v-loading="listLoading" element-loading-text="正在加载中" border fit
                style="width: 100%" v-if="!availableClassFlag">
        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.courseName')" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.courseName || '/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.lessonName')" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.lessonName || '/'}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.originTime')" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.originTime | substring10}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.ruserStatus')" show-overflow-tooltip>
          <template slot-scope="scope">
            <!--<span v-if="teacherType==1">{{scope.row.ruserStatus == 1 ? 'presented' : 'presenting'}}</span>-->
            <!--<span v-else>{{scope.row.ruserStatus == 1 ? '已出席' : '未出席'}}</span>-->
            <span v-if="teacherType==1">{{scope.row.ruserStatus == 1 ? 'Attended' : 'Not Attended'}}</span>
            <span v-else>{{scope.row.ruserStatus == 1 ? '已上课' : '待上课'}}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="teacherType==0" align="center" label="预习材料" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button v-if="scope.row.isPerview==1" size="mini" @click="gotoBeforeClassPage(scope.row)">查看</el-button>
            <span v-if="scope.row.isPerview!=1">未预习</span>
            <!--<el-button @click="gotoBeforeClassPage(scope.row)">进入</el-button>-->
          </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.evaluation')" show-overflow-tooltip>
          <template slot-scope="scope">
            <template v-if="scope.row.evaluateId">
              <router-link :to="{path:'/teachers/editEvaluation',query: {lessonId: scope.row.lessonId
            ,originTime:scope.row.originTime,lessonName:scope.row.lessonName,courseName:scope.row.courseName,
            phone:$route.query.phone,id:scope.row.id}}" v-if="evaluatiButton&&userId==scope.row.tutorUserId">
                <el-button @click="getParams(scope)">{{$t('i18nView.ruserClassInfo.editEvaluation')}}</el-button>
              </router-link>

              <router-link
                :to="{path:'evaluation',query: {lessonId: scope.row.lessonId,originTime:scope.row.originTime,lessonName:scope.row.lessonName,courseName:scope.row.courseName, phone:$route.query.phone,id:scope.row.id}}"
                v-if="!evaluatiButton&&userId!=scope.row.tutorUserId">
                <el-button @click="getParams(scope)">{{$t('i18nView.ruserClassInfo.checkEvaluation')}}</el-button>
              </router-link>

              <router-link :to="{path:'evaluation',query: {lessonId: scope.row.lessonId
          ,originTime:scope.row.originTime,lessonName:scope.row.lessonName,courseName:scope.row.courseName,
           phone:$route.query.phone,id:scope.row.id}}" v-if="userId!=scope.row.tutorUserId">
                <el-button @click="getParams(scope)">{{$t('i18nView.ruserClassInfo.checkEvaluation')}}</el-button>
              </router-link>
            </template>
            <template v-else-if="!scope.row.evaluateId">
              <span>{{$t('i18nView.ruserClassInfo.noEvaluation')}}</span>
              <router-link :to="{path:'/teachers/evaluation',query: {lessonId: scope.row.lessonId
              ,originTime:scope.row.originTime,lessonName:scope.row.lessonName,courseName:scope.row.courseName,phone:$route.query.phone,id:scope.row.id}}"
                           v-if="evaluatiButton&&userId==scope.row.tutorUserId">
                <el-button @click="getParams(scope)">{{$t('i18nView.ruserClassInfo.evaluate')}}</el-button>
              </router-link>
            </template>
          </template>
        </el-table-column>


        <el-table-column align="center" :label="$t('i18nView.ruserClassInfo.monitorAddr')" show-overflow-tooltip>
          <template slot-scope="scope">
            <a :href="scope.row.monitorAddr" target="_blank">{{$t('i18nView.ruserClassInfo.look')}}</a>
          </template>
        </el-table-column>
      </el-table>

      <div v-show="!listLoading" class="pagination-container mt30">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-sizes="[10, 20, 30, 50,60]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-container>


  </div>
</template>

<script>
  import local from "@/views/i18n-demo/local";

  const viewName = "i18nView";
  import {mapGetters} from "vuex";
  import header from "../components/header";
  import {ruserAvailableClass, ruserDetail} from "@/api/detail";
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button"; // 待上课程
  export default {
    components: {
      ElButton,
      "header-box": header
    },
    data() {
      return {
        teacherType: "",
        listLoading: false,
        tableKey: 0,
        listQuery: {
          page: 1,
          rows: 20
        },
        initData: {
          type: null,
          page: 1,
          rows: 20
        },
        availableTotal: 0,
        noavailableTotal: 0,
        evaluatiButton: false,
        total: null,
        userInfo: {},
        availableClassFlag: true,
        availableClass: [],
        noAvailableClass: [],
        isSelected: true, //上课按钮是否选中
        classId: "",
        ruserId: "",
        type: "", //0：待上课 1：已上课
        isTeacher: "",
        formData: {
          phone: ""
        }
      };
    },
    computed: {
      ...mapGetters([
        "detailPhone",
        "detailType",
        "detailInfo",
        "ruserInfo",
        "roleIds",
        "userId"
      ])
    },
    created() {
      if (!this.$i18n.getLocaleMessage("en")[viewName]) {
        this.$i18n.mergeLocaleMessage("en", local.en);
        this.$i18n.mergeLocaleMessage("zh", local.zh);
      }
      let [roleId] = this.roleIds;

      if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32) {
        this.$i18n.locale = "en";
        this.$store.dispatch("setLanguage", "en");
        this.teacherType = 1;
      } else {
        this.$i18n.locale = "zh";
        this.$store.dispatch("setLanguage", "zh");
        this.teacherType = 0;
      }

      if (roleId == 17 || roleId == 18 || roleId == 19) {
        //销售
        this.evaluatiButton = false; //评价按钮
      } else {
        this.evaluatiButton = true;
      }

      if (this.$route.query.phone) {
        this.formData.phone = this.$route.query.phone;
        this.getList();
      } else {
        this.userInfo = JSON.parse(sessionStorage.getItem("detailParams"))[0];
      }

      //      this.userInfo = this.ruserInfo;
      //获取路由参数
      this.listQuery.classId = this.$route.query.classId;
      this.listQuery.ruserId = this.$route.query.ruserId;

      this.getInitNoAvailableClass(); //已上课
      this.getAvailableClass(); //待上课
    },
    methods: {
      gotoBeforeClassPage(row){
        console.log(row);
        this.$router.push({
          path: '/detail/ruserClassInfo-beforeclass', query: {
            lessonId: row.lessonId,
            ruserId: row.ruserId,
            lessonName: row.lessonName,
            courseName: row.courseName
          }
        });
      },
      checkDetail() {
        this.$router.push({
          path: "classDetail",
          query: {phone: this.$route.query.phone}
        });
      },
      getAvailableClass() {
        //0：待上课
        this.listQuery.type = 0;
        this.isSelected = false;
        ruserAvailableClass(this.listQuery).then(res => {
          console.log(res.data.total);
          this.total = res.data.total;
          this.availableTotal = res.data.total;
          this.availableClass = res.data.records;
          this.availableClassFlag = true;
        });
      },
      getNoAvailableClass() {
        //0：已上课
        this.listQuery.type = 1;
        this.isSelected = true;
        ruserAvailableClass(this.listQuery).then(res => {
          console.log(res.data);
          this.total = res.data.total;
          this.noAvailableClass = res.data.records;
          this.availableClassFlag = false;
        });
      },
      getInitNoAvailableClass() {
        this.initData.type = 1;
        this.initData.classId = this.$route.query.classId;
        this.initData.ruserId = this.$route.query.ruserId;
        ruserAvailableClass(this.initData).then(res => {
          this.noavailableTotal = res.data.total;
        });
      },
      handleSizeChange(val) {
        console.log(val);
        this.listQuery.rows = val;
        if (this.isSelected) {
          this.getNoAvailableClass();
        } else {
          this.getAvailableClass();
        }
      },
      handleCurrentChange(val) {
        console.log(val);
        this.listQuery.page = val;
        if (this.isSelected) {
          this.getNoAvailableClass();
        } else {
          this.getAvailableClass();
        }
      },
      getParams(scope) {
        console.log(scope);
      },
      getList() {
        ruserDetail(this.formData).then(res => {
          //学生详情
          console.log(res.data.data);
          this.userInfo = res.data.data;
        });
      }
    },
    filters: {
      substring10: function (a) {
        if (a) {
          return a.substring(0, 10);
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../detail.scss";

  .ruserClassInfo {
  @include detail-container();
  @include btn();

  .ruserCourse {
    background: #fff;
    border-radius: 10px;

  h1 {
    padding: 30px 0 30px 30px;
    border-bottom: 1px solid #e0dfe0;
  }

  }
  .btn {
    height: 86px;
    border-bottom: 1px solid #e0dfe0;
    display: flex;
    align-items: center;

  .el-button,
  .notSelected {
    color: #7b7b7b;
    background-color: #fbfbfb;
    border: 1px solid #fabd9a;
  }

  .selected {
    color: #ffffff;
    background-color: #fc7f35;
  }

  }
  .el-main {
    margin-top: 20px;
    border: 2px solid #f6f6f6;
    border-radius: 10px;
    height: 564px;
    background: #fff;
  }

  }
</style>
