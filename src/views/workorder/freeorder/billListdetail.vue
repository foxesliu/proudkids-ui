<template>
    <!-- 流程中工单详情 -->
    <div class="main-box">
        <div class="title-box">
            <h3>{{title}}</h3>
        </div>       
        <div class="table-box">           
            <el-table :data="table" border style="width: 100%">
               <el-table-column
               
                label="订单发起人" align="center">
                <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <span>{{ scope.row.deptName }}-{{ scope.row.userName }}</span>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.userName }}</el-tag>
                            </div>
                        </el-popover>

                    </template>
                </el-table-column>
                <!-- <el-table-column
                prop="billSn"
                label="工单号" align="center">
                </el-table-column> -->
                <el-table-column
                prop="jsonObj.periods"
                label="赠送课时" align="center">
                </el-table-column>
                <el-table-column
                prop="name"
                label="中文名字" align="center">
                </el-table-column>
                <el-table-column
                prop="enName"
                label="英文名字" align="center">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="绑定手机号" align="center">
                </el-table-column>               
                <el-table-column  label="提交时间" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.optTime | parseTime}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="用户详情页" align="center">
                    <template slot-scope="scope">
                        <el-button @click="gotoPageUser(scope)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>               
            </el-table>
            
        </div>
        <div class="pay-details border">
            <p class="reson"><span>赠课理由：</span>转介绍</p>
            <div class="pay-details-table-box">
                
                <p class="tip1"><span>销售备注：</span>{{remark}}</p>
                <div class="pay-details-table">
                    <el-table
                        :data="tableData2"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="role"
                        label="角色"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="username"
                        label="员工"
                        align="center">
                        </el-table-column>
                        <el-table-column  label="操作" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.stat==1">
                                    通过
                                </span>
                                    <span v-if="scope.row.stat==2">
                                    审批中
                                </span>
                                    <span v-if="scope.row.stat==0">
                                    发起
                                </span>
                                    <span v-if="scope.row.stat==-1">
                                    拒绝
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="操作时间" align="center">
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.optTime | parseTime}}
                                </span>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                   
                </div>
                <p class="tip2" v-if="show2"><span>工单已结束</span></p> 
                <p class="tip2" v-if="!show"><span>拒绝理由：</span>{{reson}}</p>      
            </div>            
        </div>
        
        
            
              
    </div>
</template>

<script>
    import { BillsDetails } from "@/api/workorders.js";
    import { mapGetters } from 'vuex';
    //import { buyBills } from "@/api/workorders.js";
    export default {
        data(){
            return{
                table:[], 
                payInfo:[],
                mes:'',
                // userId: "42",
                remark:'',
                taskId:'',
                stat:'',
                params:'',
                title: "购课工单>流程中>工单详情",
                toBeConfirmNum:'1',
                input: '',
                tableData2:[],
                 show:true,
                 show2:true,
                reson:'',
              }
            },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            gotoPageUser(scope) {
                console.log(scope)
                this.$router.push(
                    {path: '/detail/user',
                     query:{phone:scope.row.phone}
                    });
            },
            
            
        },
        computed: {
        ...mapGetters(['userId'])
        },
        created(){
            
            this.userInfo = JSON.parse(sessionStorage.getItem('index'));
            console.log(this.userInfo);
            this.table.push(this.userInfo)
            BillsDetails(this.userInfo.billsFlowId)
            .then(res => {
                console.log(res.data.data)
                this.data = res.data.data
                this.mes = this.data.reqRemark
                this.remark = this.data.auditList[0].remark
                console.log(this.data.auditList[0].remark)
                this.tableData2 = this.data.auditList
                if(this.data.stat == -1){
                    this.show = false
                    this.reson = JSON.parse(this.data.resRemark).remark1
                }
                if(this.data.stat == 2){
                    this.show2 = false
                    this.title = '赠课工单>流程中>工单详情'
                }
                if(this.data.stat == 3){
                    this.title = '赠课工单>待审核>工单详情'
                }
                if(this.data.stat == -1){
                    
                    this.title = '赠课工单>未通过>工单详情'
                }
                if(this.data.stat == 1){
                   
                    this.title = '赠课工单>已通过>工单详情'
                 }
               
            })
            .catch(res => {
                console.log()
            })
            
            // this.table.push(this.userInfo)
            // console.log(this.table)
            
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';
  
  .main-box{
      color: #606266;
    .title-box{
        font-size: 18px;
        color: $color-orange;
        height: 60px;
        
        border: 1px solid #ccc;
        padding-left: 20px;
    }
    
    .pay-details{
        padding:0 80px;      
        margin:20px;
        .reson{
            border-bottom: 1px solid #ccc;
            
            height: 80px;
            line-height: 80px;
            margin: 0;
            span{
                font-weight: bold;
                color:$color-orange;
            }
        }
        .pay-details-table-box{
            .tip1{                                  
                height: 80px;
                line-height: 80px;                                   
                
                margin: 0;
                span{
                  font-weight: bold;  
                color: $color-orange;
                }
            }
            .pay-details-table{
                width:90%;
                margin:0 auto;
                margin-bottom: 40px;
            }
            .tip2{
                
                span{
                color: $color-orange;
                font-weight: bold;
                }
            }
        }
    }
    
    
     
      
    .table-box{
        margin:20px;
    }
    .btns{
        display: flex;
        justify-content: center;
    }
}

</style>