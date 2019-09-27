<template>
  <div class="payCourseHistory">
    <el-table :key='tableKey' :data="tableData" v-loading="listLoading" element-loading-text="正在加载中" border fit
              highlight-current-row style="width: 100%">
      <el-table-column align="center" label="订单发起人" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <span>{{scope.row.orderSubmitor }}</span>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">
                {{scope.row.orderSubmitor | nameFilter}}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="工单号" show-overflow-tooltip>-->
      <!--<template slot-scope="scope">-->
      <!--<span>-->
      <!--{{scope.row.ruserOrdersVo.orderSn}}-->
      <!--</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="中文名字" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.chiName}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="英文名字" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.engName}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="绑定手机" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.phone}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买课时" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.ruserOrdersVo.periods}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="课程类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.ruserOrdersVo.courseName}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="班级类型名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.ruserOrdersVo.classType || '/'}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上课时间" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.ruserOrdersVo.schedulePoint || '/'}}
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="每周意向上课时间" show-overflow-tooltip>-->
      <!--<template slot-scope="scope">-->
      <!--{{JSON.parse(scope.row.ruserOrdersVo.jsonStr).desc || '/'}}-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="提交时间" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.ruserOrdersVo.submitTime}}
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="用户详情页" show-overflow-tooltip>-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.ruserNo || '/'}}-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <div class="order-container mt15">
      <div class="clearfix" style="border-bottom: 1px solid #eaeaea;">
        <div class="fl mr30">
          <p class="org">支付订单号：</p>
        </div>
        <div class="fl orderDetail">
          <p v-for="item in billJson">
            <span class="mr30">{{item.orderSn}} ( {{item.type}} )</span>
            <span class="fr"><i class="org">￥</i>{{item.money}}</span>
          </p>
        </div>
      </div>

      <div class="operatorDetail">
        <h4 class="pt30 pb30">
          <span class="org">销售备注：</span>
          <span style="color: #8e8e8e">{{billFlowHistoryVo.reqRemark}}</span>
        </h4>
        <el-table :key='tableKey' :data="billsAuditHistoryVo" element-loading-text="正在加载中"
                  border
                  fit
                  highlight-current-row style="width: 100%">
          <el-table-column align="center" label="角色" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.role || '/'}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="员工" show-overflow-tooltip>
            <template slot-scope="scope">
          <span>
            {{scope.row.username}}
          </span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.stat==1">
                通过
              </span>
              <span v-else-if="scope.row.stat==2">
                审批中
              </span>
              <span v-else-if="scope.row.stat==0">
                发起
              </span>
              <span v-else-if="scope.row.stat==-2">
                系统异常，工单操作失败
              </span>
              <span v-else="scope.row.stat==-1">
                拒绝
              </span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作时间" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.optTime}}
            </template>
          </el-table-column>
        </el-table>
        <h4 class="pt30 pb30" v-if="billStat">
          <span class="org">工单已结束！</span>
        </h4>
      </div>
    </div>

    <h3 class="pt30 pl30 pb30 b" v-if="isClassShow">加入了班级：</h3>
    <el-table :key='tableKey' :data="classesVo" element-loading-text="正在加载中" border fit v-if="isClassShow"
              highlight-current-row style="width: 100%">
      <el-table-column align="center" label="课程类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.name || '/'}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="班级创建时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.createTime}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="中教老师" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.chineseTeacherName || '/'}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="外教老师" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.foreignTeacherName || '/'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="班级类型名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.classTypeName || '/'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="上课时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.classTime || '/'}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="班级开始日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.startTime | subStringTime}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="班级结束日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.endTime | subStringTime}}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="班级人数" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.classNumber || '/'}}
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="每周上课时间" show-overflow-tooltip>-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.weekPointDesc || '/'}}-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div class="historyOrder-card" v-if="resRemark&&isClassShow">
      <el-row>
        <el-col :span="3">课程开始时间:</el-col>
        <el-col :span="21"><span>{{resRemark.startTime}}</span></el-col>
      </el-row>
    </div>
    <div class="historyOrder-card" v-if="resRemark&&isClassShow">
      <el-row>
        <el-col :span="3">备注给中教:</el-col>
        <el-col :span="21"><span>{{resRemark.toTeacher}}</span></el-col>
      </el-row>
    </div>
    <div class="historyOrder-card" v-if="resRemark&&isClassShow">
      <el-row>
        <el-col :span="3">备注给外教:</el-col>
        <el-col :span="21"><span>{{resRemark.toTutor}}</span></el-col>
      </el-row>
    </div>
    <div class="historyOrder-card mt30" v-if="!isClassShow">
      <span class="org">工单异常</span>:{{resRemark}}
    </div>
  </div>

</template>

<script>
  import {ruserOrdersHistoryDetail} from '@/api/detail' // 历史工单
  export default {
    data() {
      return {
        userInfo: {},
        tableKey: 0,
        tableData: [],
        listLoading: true,
        phone: '',
        flowId: '',
        payInfo: [],
        billsAuditHistoryVo: [],
        billFlowHistoryVo: '',
        classesVo: [],
        resRemark: '',
        billJson: '',
        isClassShow: true,
        billStat: null
      }
    },
    created() {
      this.phone = sessionStorage.getItem('detailPhone');
      this.flowId = this.$route.query.flowId;  //工单id
    },
    mounted() {
      this.getList()
    },
    filters: {
      subStringTime(item) {
        return item.substring(0, 10)
      }
    },
    methods: {
//      购课审批remark内容: {"classId":"1122","startTime":"2018-05-01","toTeacher":"小花老师","toTutor":"Jessin Tutor"}
      getList() {
        ruserOrdersHistoryDetail(this.phone, this.flowId).then((res) => {
          this.listLoading = false
          this.tableData.push(res.data.data)
          const {billFlowHistoryVo, classesVo, billsAuditHistories} = res.data.data
          this.billsAuditHistoryVo = billsAuditHistories
          if (classesVo.classId != null) { //学生班级信息
            this.classesVo.push(classesVo)
          }

          this.billFlowHistoryVo = billFlowHistoryVo
          if(this.billFlowHistoryVo.stat==1||this.billFlowHistoryVo.stat==-2||this.billFlowHistoryVo.stat==-1){
            this.billStat = true
          }

          console.log(this.stat)
          this.billJson = JSON.parse(this.billFlowHistoryVo.billJson).payInfo //订单解析
          if (this.billFlowHistoryVo.resRemark == null) {  //备注给中外教
            this.resRemark = ''
          } else if (this.billFlowHistoryVo.stat == '-2') {
            this.resRemark = this.billFlowHistoryVo.resRemark
            this.isClassShow = false
          } else if (JSON.parse(this.billFlowHistoryVo.resRemark).classId != undefined) {
            this.resRemark = JSON.parse(this.billFlowHistoryVo.resRemark)
          }
        }).catch((res) => {
          console.log(res)
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../detail.scss';

  .payCourseHistory { //@include调用
    @include detail-container();
    color: #707070;
    .el-table__body-wrapper {
      margin-top: 1px !important;
      overflow: hidden !important;
    }
    .header {
      height: 78px;
      background: #fff;
      font-size: 18px;
      color: #8e8e8e;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 2px solid #f6f6f6;
      border-radius: 10px;
      padding-left: 78px;
    }
    .tit {
      text-align: center;
      color: #fc823b;
    }
    .order-container {
      .orderDetail {
        width: 80%;
      }
      border-radius: 10px;
      background: #fff;
      padding: 52px 137px 76px 70px;
      p {
        line-height: 42px;
      }
    }
    .historyOrder-card {
      color: #707070;
      background: #fff;
      /*margin: 18px 0;*/
      /*border-radius: 10px;*/
      border-bottom: 2px solid #f6f6f6;
      padding: 28px 0 28px 36px;
      span {
        color: #fe8333;
      }
    }
  }
</style>
