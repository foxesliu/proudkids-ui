<template>
  <div class="filterForm">
    <!--选择体验课查询-->
    <div class="filterForm-header" v-if="!showDeptTree&&!experienceList">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item v-if="chooseExperienceClass">
          <el-input type="primary" placeholder="Class Name" v-model="obj.name">Class Name</el-input>
        </el-form-item>

        <!--<el-form-item v-if="chooseExperienceClass">-->
          <!--<el-select v-model="obj.tutorType" class="width-150" placeholder="Type">-->
            <!--<el-option v-for="item in classTypeList"-->
                       <!--:key="item.tutorType" :label="item.name"-->
                       <!--:value="item.tutorType"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->

        <!--<el-form-item v-if="chooseExperienceClass">-->
          <!--<el-select v-model="obj.tutorType" class="width-150" placeholder="CT/FT">-->
            <!--<el-option v-for="item in tutorList"-->
                       <!--:key="item.value" :label="item.label"-->
                       <!--:value="item.value">-->

            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->

        <el-form-item v-if="chooseExperienceClass">
          <el-select class="width-150" v-model="obj.grade" placeholder="Level">
            <el-option v-for="item in gradeArray" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="chooseExperienceClass">
          <el-select class="width-150" v-model="obj.currentNumber" placeholder="Students">
            <el-option v-for="item in classNumberArray" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="chooseExperienceClass">
          <el-select class="width-150" v-model="obj.classTime" placeholder="School Time">
            <el-option v-for="item in classTimeArray" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="chooseExperienceClass">
          <!--<el-select-->
          <!--@change="slectConnect()"-->
          <!--style="width: 200px;"-->
          <!--v-model="obj.createTime" placeholder="Class Date">-->
          <!--<el-option label="由近到远" value="DESC"></el-option>-->
          <!--<el-option label="由远到近" value="ASC"></el-option>-->
          <!---->
          <!--</el-select>-->
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="obj.startTime"
            @change="getConnectDate"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="fr">
          <el-button type="danger" @click="reset()">empty</el-button>
          <el-button type="primary" @click="search()">Search</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--未开始&&已结束查询-->
    <div class="filterForm-header" v-if="!chooseExperienceClass&&!numSearchFlag&&!experienceList">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item v-if="!chooseExperienceClass">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="query.originTime"
            @change="getConnectDate"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item v-if="!chooseExperienceClass">
          <el-input type="primary" placeholder="班级名称" v-model="query.className">班级名称</el-input>
        </el-form-item>

        <el-form-item v-if="!chooseExperienceClass">
          <el-input type="primary" placeholder="绑定手机" v-model="query.phone">绑定手机</el-input>
        </el-form-item>

        <el-form-item v-if="!chooseExperienceClass">
          <el-input type="primary" placeholder="学生中文名字" v-model="query.stuName">学生中文名字</el-input>
        </el-form-item>

        <el-form-item v-if="!chooseExperienceClass">
          <el-input type="primary" placeholder="学生英文名字" v-model="query.stuEnName">学生英文名字</el-input>
        </el-form-item>

        <el-form-item v-if="!chooseExperienceClass && type==1">
          <el-select v-model="query.ruserStatus" class="width-150" placeholder="体验课状态">
            <el-option v-for="item in startData"
                       :key="item.type" :label="item.name"
                       :value="item.type"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="!chooseExperienceClass">
          <el-select class="width-150" v-model="query.originPoint" placeholder="School Time">
            <el-option v-for="item in classTimeArray" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item v-if="chooseExperienceClass">
          <el-input type="primary" placeholder="Class Name" v-model="obj.name">Class Name</el-input>
        </el-form-item>

        <el-form-item v-if="chooseExperienceClass">
          <el-select v-model="obj.tutorType" class="width-150" placeholder="Type">
            <el-option v-for="item in classTypeList"
                       :key="item.tutorType" :label="item.name"
                       :value="item.tutorType"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="chooseExperienceClass">
          <el-select class="width-150" v-model="obj.grade" placeholder="Level">
            <el-option v-for="item in gradeArray" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="chooseExperienceClass">
          <el-select class="width-150" v-model="obj.currentNumber" placeholder="Students">
            <el-option v-for="item in classNumberArray" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="chooseExperienceClass">
          <el-select class="width-150" v-model="obj.classTime" placeholder="School Time">
            <el-option v-for="item in classTimeArray" :key="item" :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="chooseExperienceClass">
          <el-select
            @change="slectConnect()"
            style="width: 200px;"
            v-model="obj.createTime" placeholder="Class Date">
            <el-option label="由近到远" value="DESC"></el-option>
            <el-option label="由远到近" value="ASC"></el-option>
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="obj.createTime"
              @change="getConnectDate"
              :picker-options="pickerOptions"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-select>
        </el-form-item>

        <el-form-item class="fr">
          <el-button type="danger" @click="reset()">empty</el-button>
          <el-button type="primary" @click="search()">Search</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--体验课num查询-->
    <div class="filterForm-deptree" v-if="showDeptTree&&numSearchFlag&&!experienceList">
      <el-row :gutter="20">
        <el-col :span="2" class="tip-info">
          归属CC
        </el-col>

        <el-col :span="13">
          <DepthTree :message1="userId"
                     @getNoStart="getNoStart"
                     @getEnded="getEnded"
          >
          </DepthTree>
        </el-col>
      </el-row>
    </div>
    <!--未开始&&已结束-->
    <div :class="['filterForm-deptree',{'hidden':experienceList}]" v-if="showDeptTree&&!numSearchFlag">
      <el-row :gutter="20">
        <el-col :span="2" class="tip-info">
          归属CC
        </el-col>

        <el-col :span="13">
          <DepthTree :message1="userId"
                     @getDeptData="getDeptData"
          >
          </DepthTree>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import DepthTree from "@/views/sale/depthTree/index3.vue";

  export default {
    name: 'filterForm',
    /*
    * showDeptTree 是否显示部门树筛选
    * chooseExperienceClass 是否显示加入班级的筛选及table
    * classTypeList 班级类型列表数据
    * */
    props: ['showDeptTree', 'chooseExperienceClass', 'classTypeList', 'numSearchFlag'],
    components: {
      DepthTree
    },
    data() {
      return {
        type: null,
        experienceList: false,
        //未开始&&已结束&&体验课列表查询条件
        query: {
          className: null,
          phone: null,
          stuName: null,
          stuEnName: null,
          ruserStatus: null,
          type: null,
          originTime: null,
          originPoint: null
        },

        //加入体验课查询条件
        obj: {
          name: null,
          tutorType: null,
          currentNumber: null,
          grade: null,
          classTime: null,
          startTime: null
        },
        tutorList: [{
          value: '0',
          label: 'CT'
        }, {
          value: '1',
          label: 'FT'
        }],
        gradeArray: [0, 1, 2, 3, 4, 5, 6],
        classNumberArray: [0, 1, 2, 3, 4],
        classTimeArray: ['15:00-15:25', '15:30-15:55', '16:00-16:25', '16:30-16:55', '17:00-17:25', '17:30-17:55', '18:00-18:25', '18:30-18:55', '19:00-19:25', '19:30-19:55', '20:00-20:25', '20:30-20:55', '21:00-21:25'],

        unStartData: [
          {name: '未开始', type: 0},
          {name: '已结束', type: 1},
        ],

        startData: [
          {name: '未出席', type: 0},
          {name: '已出席', type: 1},
        ],

        formInline: {
          user: '',
          region: ''
        },
        pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() > Date.now();
          // },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },

      }
    },
    created() {
      this.type = this.$route.query.status
      this.experienceList = this.$route.query.experienceList
      // this.query.type = this.$route.query.status
    },
    computed: {
      ...mapGetters(['depthTree', 'userId'])
    },
    methods: {
      getDeptData(data) {  //未开始&&已结束list
        this.$emit('getDeptData', data)
      },
      getNoStart(data) { //未开始num
        this.$emit('getNoStart', data)
      },
      getEnded(data) { //已结束num
        this.$emit('getEnded', data)
      },
      slectConnect() {

      },
      getConnectDate() {

      },
      reset() {
        this.obj = {
          name: null,
          tutorType: null,
          currentNumber: null,
          // weektimeId: '',
          grade: null,
          classTime: null,
          startTime: null
        }

        this.query = {
          className: null,
          phone: null,
          stuName: null,
          stuEnName: null,
          ruserStatus: null,
          type: this.type,
          originTime: null,
          originPoint: null
        }

        if (this.type == 0 || this.type == 1) {
          this.$emit('getSearchList', this.query)
        } else {
          this.$emit('getSearchList', this.obj)
        }
      },
      search() {
        if (this.type == 0 || this.type == 1) {
          this.$emit('getSearchList', this.query)
        } else {
          this.$emit('getSearchList', this.obj)
        }
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .filterForm {
    width: 100%;

    .filterForm-header, .filterForm-deptree {
      height: 57px;
      background-color: #f9fafc;
      border-radius: 4px;
      border: solid 1px #dcdfe6;
      padding: 10px 10px 0 10px;
      margin-bottom: 20px;
      clear: both;

      .tip-info {
        margin-top: 10px;
      }
    }

    .fr {
      float: right;
    }

    .hidden {
      display: none;
    }
  }

</style>
