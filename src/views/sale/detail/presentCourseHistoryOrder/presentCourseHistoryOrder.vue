<template>
  <div class="presentCourseHistory">
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
            <!--{{scope.row.billFlowHistoryVo.billSn}}-->
          <!--</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="赠送课时" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{JSON.parse(scope.row.billFlowHistoryVo.billJson).periods}}
          </span>
        </template>
      </el-table-column>

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

      <el-table-column align="center" label="提交时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{scope.row.billFlowHistoryVo.createTime || '/'}}
          </span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="用户详情页" show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<span>-->
            <!--{{scope.row.originChannel || '/'}}-->
          <!--</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

    </el-table>

    <div class="order-container mt15">
      <h4 class="pl30 pb30" style="border-bottom: 1px solid #eaeaea;">
        <span class="org">赠课理由：</span>
        <span style="color: #8e8e8e">{{billJson.reason}}</span>
      </h4>
      <div class="operatorDetail">
        <h4 class="pt30 pb30">
          <span class="org">销售备注：</span>
          <span style="color: #8e8e8e">{{billFlowHistoryVo.reqRemark}}</span>
        </h4>
        <el-table :key='tableKey' :data="billsAuditHistoryVo" element-loading-text="正在加载中"
                  border fit
                  highlight-current-row style="width: 100%">
          <el-table-column align="center" label="角色" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.role}}</span>
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
              {{scope.row.optTime || '/'}}
            </template>
          </el-table-column>
        </el-table>
        <h4 class="pt30 pb30" v-if="billStat">
          <span class="org">工单已结束！</span>
        </h4>
      </div>
    </div>
    <div class="historyOrder-card mt30" v-if="resRemark">
      <span class="org">工单异常</span>:{{resRemark}}
    </div>
  </div>

</template>

<script>
  import {ruserOrdersHistoryDetail} from '@/api/detail' // 历史工单
  export default {
    name: 'createForm',
    data() {
      return {
        userInfo: {},
        tableData: [],
        tableKey: 0,
        listLoading: true,
        phone: '',
        flowId: '',
        detailVo: [],
        ruserOrdersVo: [],
        payInfo: [],
        billsAuditHistoryVo: [],
        billFlowHistoryVo:'',
        resRemark:'',
        billJson:'',
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
    methods: {
      getList() {
        ruserOrdersHistoryDetail(this.phone, this.flowId).then((res) => {
          this.listLoading = false
          this.tableData.push(res.data.data)
          const {ruserOrdersVo, billFlowHistoryVo, flowOrderDetailVo, classesVo, billsAuditHistories} = res.data.data
          this.billsAuditHistoryVo = billsAuditHistories
          this.billFlowHistoryVo = billFlowHistoryVo
          this.billJson=JSON.parse(billFlowHistoryVo.billJson) //订单解析
          if(this.billFlowHistoryVo.stat=='-2'){
            this.resRemark=this.billFlowHistoryVo.resRemark
          }
          if(this.billFlowHistoryVo.stat==1||this.billFlowHistoryVo.stat==-2||this.billFlowHistoryVo.stat==-1){
            this.billStat = true
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

  .presentCourseHistory { //@include调用
    @include detail-container();
    color: #707070;
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
