<template>
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
                            <span>{{ scope.row.applyUser }}</span>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.applyUserAll }}</el-tag>
                            </div>
                        </el-popover>

                    </template>
                </el-table-column>
                <!-- <el-table-column
                prop="billInfo.billSn"
                label="工单号" align="center">
                </el-table-column> -->
                <el-table-column
                prop="billInfo.billJson.ruser.name"
                label="中文名字" align="center">
                </el-table-column>
                <el-table-column
                prop="billInfo.billJson.ruser.enName"
                label="英文名字" align="center">
                </el-table-column>
                <el-table-column
                prop="billInfo.billJson.ruser.phone"
                label="绑定手机号" align="center">
                </el-table-column>
                <el-table-column
               
                label="停课开始时间" align="center">
                <template slot-scope="scope">
                        <span>
                            {{scope.row.billInfo.billJson.startTime | parseTime('{y}-{m}-{d}')}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                
                label="停课结束时间" align="center">
                <template slot-scope="scope">
                        <span>
                            {{scope.row.billInfo.billJson.endTime | parseTime('{y}-{m}-{d}')}}
                        </span>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                prop="billInfo.billJson.periods"
                label="剩余课时" align="center">
                </el-table-column> -->
                
                <el-table-column
                
                label="提交时间" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.createTime | parseTime}}
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
            
            <div class="pay-details-table-box">
                <p class="tip1"><span>备注：</span>{{mes}}</p>
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
                        
            </div>            
        </div>
        
        <div class="btns">
            <el-button type="danger" style="marginRight:50px;width:150px" size="small" @click=" open3()" v-if="show">拒绝</el-button>
            <el-button type="primary" size="small" style="width:150px" @click=" open2()" v-if="show">同意</el-button>
            <el-button type="primary" size="small" style="width:150px"  @click="gotoPage()" v-if="!show">续课操作</el-button>
        </div>
            
              
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { isStopBills } from "@/api/workorders.js";
    export default {
        data(){
            return{
                show:'ture',
                
                table:[], 
                payInfo:[],
                //userId: "42",

                taskId:'',
                stat:'',
                params:'',
                title: "停课工单>待审核>工单详情",
                toBeConfirmNum:'1',
                input: '',
                mes:'',
                formdata1:{},
                remarkVal:{
                    remark1:''
                    },
              }
            },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            gotoPage() {
                 
                this.$router.push({
                    path: '/workorder/handle',
                    
                });
            },
            gotoPageUser(scope) {
                console.log(scope.row.billInfo.billJson.ruser.phone)
                this.$router.push(
                    {path: '/detail/user',
                     query:{phone:scope.row.billInfo.billJson.ruser.phone}
                    });
            },
            falseOrder(value){
                this.remarkVal.remark1 = value
                this.formdata1.remark = this.remarkVal
              isStopBills(this.userId,this.taskId, -1, this.formdata1)
              .then(res => {
                  this.$router.push({
                        path: 'stoporder'
                    });
                    this.$message({
                    
                        type: 'success',
                        message: '成功拒绝 '
                    });
                  console.log(res.data);
              })
              .catch(res => {
                  console.log(res);
              });
            },
            trueOrder(){
              isStopBills(this.userId, this.taskId, 1, this.params)
              .then(res => {
                  this.$router.push({path: 'stoporder'});
                    this.$message({                   
                    type: 'success',
                    message: '成功通过工单!'
                });
                console.log(res.data);  
              })
              .catch(res => {
                  console.log(res);
              });
            },
            open2() {
                this.$confirm('确认通过工单', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.trueOrder()

                // this.$message({
                    
                //     type: 'success',
                //     message: '成功通过工单!'
                // });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消成功'
                });          
                });
            },
            open3() {
                this.$prompt('请输入拒绝理由', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                
                }).then(({ value }) => {
                    this.falseOrder(value)
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消成功'
                });       
                });
            }
        },
        computed: {
        ...mapGetters(['userId'])
        },
        created(){
            this.userInfo = JSON.parse(sessionStorage.getItem('index'));
            console.log(this.userInfo);
            this.data = this.userInfo
            this.data2 = this.userInfo.billInfo.auditList
            console.log(this.data)
            console.log(this.data2)
            this.data.username = this.data2[0].username
            this.mes = this.data.billInfo.auditList[0].remark
            this.payInfo = this.userInfo.billInfo.billJson.payInfo
            this.table.push(this.data)
            this.tableData2 = this.data2
            this.taskId = this.userInfo.id
            this.params = this.data.remark
            // if(this.userInfo.name == '教务审批'){
            //     this.show =false;
            // }
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
        .pay-details-head{
            border-bottom:1px solid #cccccc;
            table{                
                width: 500px;
                margin:50px auto;
                span{
                    display: inline-block;
                    margin-bottom: 10px;
                }                
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