<template>
  <div class="app-container calendar-list-container">
    <el-row class="block-row">
      <el-form :inline="true" class="demo-form-inline">
        <el-col :span="12">
          <el-form-item style="margin-bottom:0">
            用户：<span>销售部门</span><span v-if="user.area">--{{user.area}}</span><span
            v-if="user.group">--{{user.group}}</span>
            <span v-if="user.member">--{{user.member}}</span><span>--{{user.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12" align="right">
          <el-form-item :inline="true" label="按照数据接收的时间搜索" style="margin-bottom:0">
            <el-date-picker
              v-model="value7"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-bottom:0">
            <el-button type="primary" @click="getDatas1">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row class="table-row">
      <div class="table-title">
        例子类型
      </div>
      <el-table
        v-loading="loading1"
        :data="tableData1"
        border
        style="width: 100%">
        <el-table-column
          prop="新例子"
          label="新例子">
        </el-table-column>
        <el-table-column
          prop="旧例子"
          label="旧例子">
        </el-table-column>
        <el-table-column
          prop="报废例子"
          label="报废例子">
        </el-table-column>
        <el-table-column
          prop="付费排课例子"
          label="付费排课学生">
        </el-table-column>
        <el-table-column
          prop="不续费例子"
          label="不续费学生">
        </el-table-column>
      </el-table>
    </el-row>
    <!--<el-row class="table-row">-->
    <!--<div class="table-title">-->
    <!--这些数据今天的类型-->
    <!--</div>-->
    <!--<el-table-->
    <!--v-loading="loading1"-->
    <!--:data="tableData2"-->
    <!--border-->
    <!--style="width: 100%">-->
    <!--<el-table-column-->
    <!--prop="新例子"-->
    <!--label="新例子"-->
    <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="旧例子"-->
    <!--label="旧例子"-->
    <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="报废例子"-->
    <!--label="报废例子">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="付费排课例子"-->
    <!--label="付费排课学生">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
    <!--prop="不续费例子"-->
    <!--label="不续费学生">-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</el-row>-->

    <el-row class="table-row">
      <el-row>
        <el-col :span="6">
          <p>截至今日（这些数据的用户状态）</p>
        </el-col>
        <el-col
          :span="6"
          :offset="12">
          <el-form>
            <el-form-item
              style="text-align: right"
              label="选择数据类型:">
              <el-select v-model="queryListType" placeholder="请选择活动区域">
                <el-option label="新例子" value="0"></el-option>
                <el-option label="旧例子" value="1"></el-option>
                <el-option label="报废例子" value="2"></el-option>
                <el-option label="付费排课学生" value="3"></el-option>
                <el-option label="不续费学生" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>

      </el-row>

      <el-table
        v-loading="loading2"
        :data="tableData3"
        border
        style="width: 100%">
        <el-table-column
          prop="billsType"
          label="数据类型"
        >
          <template slot-scope="scope">{{ scope.row.billsType | dataTypeFilter() }}</template>
        </el-table-column>

        <el-table-column
          prop="currentStage"
          label="用户级别"
        >
          <template slot-scope="scope">{{ scope.row.currentStage | oldExamFilter(scope.row, queryListType, 0) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="currentStatus"
          label="用户状态"
        >
          <template slot-scope="scope">{{ scope.row.currentStatus | oldExamFilter(scope.row, queryListType, 1) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="billsCount"
          label="数量"
        >
        </el-table-column>
        <el-table-column
          prop="percent"
          label="比例"
        >
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="table-row">
      <div class="table-title">
        渠道来源
      </div>
      <el-table
        v-loading="loading3"
        :data="tableData4"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="渠道名称">
        </el-table-column>
        <el-table-column
          prop="billsBillsCount"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="percent"
          label="比例">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col :span="4">
        <p>付费数量</p>
      </el-col>
      <el-col :span="6" :offset="14">
        <el-date-picker
          style="float: right"
          v-model="value1"
          align="right"
          type="date"
          placeholder="按成交时间搜索"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row class="table-row">
      <el-table
        v-loading="loading4"
        :data="tableData5"
        border
        style="width: 100%">
        <el-table-column
          prop="course3"
          label="3课时"
          width="180">
        </el-table-column>
        <el-table-column
          prop="course9"
          label="9课时"
          width="180">
        </el-table-column>
        <el-table-column
          prop="course12"
          label="12课时">
        </el-table-column>
        <el-table-column
          prop="course60"
          label="60课时">
        </el-table-column>
        <el-table-column
          prop="course120"
          label="120课时">
        </el-table-column>
        <el-table-column
          prop="courseTotal"
          label="总金额">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {exaStatistics1, exaStatistics2, exaStatistics3, exaStatistics4} from '@/api/sale'
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"
  import ElCol from "element-ui/packages/col/src/col";
  import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      ElFormItem,
      ElCol,
      ElRadioGroup,
      ElOption
    },
    data() {
      return {
        loading1: true,
        loading2: true,
        loading3: true,
        loading4: true,
        user: {
          area: '销售一区',
          group: '销售一组',
          member: 'CC李小龙',
          name: null
        },
        names: null,
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
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
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
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
        value1: '',
        value2: '',
        value7: '',
        queryList: {
          userIdLists: null,
          startDate: null,
          endDate: null
        },
        queryListType: '0',
        queryList1: {
          type: 0
        },
        queryList2: {
          userIdLists: null,
          updateTime: null,
          flowbillType: 1,
        },
        tableData1: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        tableData5: [
          {
            course3: 0,
            course9: 0,
            course12: 0,
            course60: 0,
            course120: 0,
            courseTotal: 0,
          }
        ],
      }
    },
    created() {
      console.log(this.name)
      this.queryList.userIdLists = this.$route.query.userId
      this.queryList2.userIdLists = this.$route.query.userId
      this.user.name = this.name
      console.log(this.user.name)
      this.user.area = this.$route.query.area
      this.user.group = this.$route.query.group
      this.user.member = this.$route.query.member
      console.log(this.user.member)
      console.log(this.queryList.userIdLists)
      this.getDatas1()
      this.getDatas2()
      this.getDatas3()
      this.getDatas4()
    },
    watch: {
      value7: function (val) {
        console.log(val)
        this.queryList.startDate = val[0]
        this.queryList.endDate = val[1]
      },
      queryListType: function (val) {
        console.log(val)
        this.queryList1.type = val
        this.getDatas2();
      },
      value1: function (val) {
        this.queryList2.updateTime = val
        this.getDatas4()
      }
    },
    computed: {
      ...mapGetters(['name']),
    },
    methods: {
      onSubmit() {

      },
      getDatas1() {
        exaStatistics1(this.queryList)
          .then(response => {

              this.tableData1 = response.data.result.acceptData
              this.tableData2 = response.data.result.todayData
              this.loading1 = false
            }
          )
      },
      getDatas2() {
        Object.assign(this.queryList1, this.queryList)
        exaStatistics2(this.queryList1)
          .then(response => {
              this.tableData3 = response.data.result
              this.loading2 = false
            }
          )
      },
      getDatas3() {
        exaStatistics3(this.queryList)
          .then(response => {
              console.log(response.data)
              this.tableData4 = response.data.result
              this.loading3 = false
            }
          )
      },
      getDatas4() {
        exaStatistics4(this.queryList2)
          .then(response => {
              let data = response.data.result

              //处理返回数据
              for (let i = 0; i < data.length; i++) {
                this.tableData5[0].courseTotal += data[i].moneySum
                if (data[i].periods == 3) {
                  this.tableData5[0].course3 = data[i].periodsCount
                } else if (data[i].periods == 9) {
                  this.tableData5[0].course9 = data[i].periodsCount
                } else if (data[i].periods == 12) {
                  this.tableData5[0].course12 = data[i].periodsCount
                } else if (data[i].periods == 60) {
                  this.tableData5[0].course60 = data[i].periodsCount
                } else if (data[i].periods == 120) {
                  this.tableData5[0].course120 = data[i].periodsCount
                } else {
                  return
                }

              }
              this.loading4 = false
            }
          )
      }
    }
  }
</script>

<style>
  .block-row {
    display: block;
    width: 100%;
    background: #ffffff;
    padding: 18px 20px;
    border: 2px solid #f6f6f6;
    border-radius: 6px;
    margin: 0 0 22px 0;
  }

  .table-title {
    padding: 10px 5px;
    background: #ffffff;
  }

  .table-row {
    margin-bottom: 50px;
  }
</style>
