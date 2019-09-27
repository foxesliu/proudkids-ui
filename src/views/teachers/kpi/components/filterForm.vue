<template>
  <div class="filterForm">
    <el-form :inline="true" :model="formInline" class="filterForm-header">
      <el-row>
        <el-col :span="3">
          <el-form-item>
            <el-input type="primary" placeholder="班级名称" v-model="obj.className">班级名称</el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item>
            <el-date-picker
              v-model="dateTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              :start-placeholder=kpiStartTime
              :end-placeholder=kpiEndTime
              value-format="yyyy-MM-dd"
              @change="getDate"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-row>
            <el-col :span="2"><span class="tip-info">中教：</span></el-col>
            <el-col :span="22">
              <DepthTree :message1="userId"
                         @getDeptData="getDeptData"
                         ref='deptTree'
              >
              </DepthTree>
            </el-col>
          </el-row>
        </el-col>

        <el-form-item class="fr">
          <el-button type="danger" @click="reset()">empty</el-button>
          <el-button type="primary" @click="search()">Search</el-button>
        </el-form-item>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  import DepthTree from "@/views/sale/depthTree/index4.vue";
  import {mapGetters} from 'vuex'

  export default {
    name: 'filterForm',
    props: ['showDeptTree', 'chooseExperienceClass', 'classTypeList', 'numSearchFlag'],
    components: {
      DepthTree
    },
    data() {
      return {
        type: null,
        experienceList: false,
        dateTime: null,
        obj: {
          className: null,
          startTime: null,
          endTime: null,
        },

        formInline: {
          user: '',
          region: ''
        },
        // startDetePick: '2019-02-06',
        kpiStartTime: '开始日期',
        kpiEndTime: '结束日期',

        pickerOptions: {
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
        },
      }
    },
    computed: {
      ...mapGetters(['depthTree', 'userId'])
    },
    created() {
      if (sessionStorage.getItem('kpiClassName')) { //班级名称
        this.obj.className = sessionStorage.getItem('kpiClassName')
      }
      if (sessionStorage.getItem('kpiDateTime')) {  //日期
        this.dateTime = sessionStorage.getItem('kpiDateTime')
        const time = sessionStorage.getItem('kpiDateTime').split(',');
        this.kpiStartTime = time[0]  //开始时间
        this.kpiEndTime = time[1] //结束时间

        this.obj.startTime = this.kpiStartTime
        this.obj.endTime = this.kpiEndTime
        // if (sessionStorage.getItem('kpiDateTime')) {
        //
        // }
      }
    },
    methods: {
      getDeptData(data) {
        this.$emit('getDeptData', data)
      },
      getDate() {
        if (this.dateTime) {
          this.obj.startTime = this.dateTime[0]
          this.obj.endTime = this.dateTime[1]
        }
      },
      reset() {
        sessionStorage.removeItem('page')
        this.obj = {
          className: null,
          startTime: null,
          endTime: null,
        }
        this.dateTime = null
        sessionStorage.setItem('kpiDateTime', '')
        sessionStorage.setItem('kpiClassName', '')
        this.kpiStartTime = '开始日期'
        this.kpiEndTime = '结束日期'
        // this.$emit('getSearchList', this.obj)
      },

      search() {
        this.obj.page =1
        sessionStorage.setItem('page', 1)
        if (this.obj.className) {
          sessionStorage.setItem('kpiClassName', this.obj.className)
        }
        if (this.dateTime) {
          sessionStorage.setItem('kpiDateTime', this.dateTime)
        }
        this.$emit('getSearchList', this.obj)
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
        display: block;
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
