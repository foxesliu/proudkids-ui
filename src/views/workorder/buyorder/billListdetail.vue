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
                <el-table-column
                prop="jsonObj.periods"
                label="购买课时" align="center">
                </el-table-column>
                <el-table-column
                prop="courseName"
                label="课程名称" align="center">
                    

                </el-table-column>
                <el-table-column
                prop="courseTypeName"
                label="课程类型" align="center">
                    

                </el-table-column>
                
                <el-table-column
                prop="jsonObj.classType"
                label="班级类型" align="center">
                </el-table-column>
                <el-table-column
                prop="jsonObj.schedulePoint"
                label="上课时间" align="center">
                </el-table-column>
                <!-- JSON.parse(JSON.parse(jsonObj.jsonStr)).desc -->
                <!-- <el-table-column
               
                prop="jsonObj.newDesc"
                label="每周上课时间" align="center">
                </el-table-column> -->
                <el-table-column  label="提交时间" align="center" width="100">
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.optTime | parseTime}}
                                </span>
                            </template>
                        </el-table-column>
                <el-table-column
                prop=""
                label="用户详情页" align="center"  width="100">
                    <template slot-scope="scope">
                        <el-button @click="gotoPage(scope)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>               
            </el-table>
            
        </div>
        <div class="pay-details border">
            <div class="pay-details-head">               
                <i>支付订单号：</i>
                <div v-for="(item,index) in payInfo" :key="index" class="mes-box">
                    
                    <span class="pay-mes1">
                        <span>{{item.orderSn}}</span>
                        <span>({{item.type}}支付)</span>
                    </span>
                    <span class="pay-mes2"><span>￥</span>{{item.money}}</span>
                </div>                                                 
            </div>
            <div class="pay-details-table-box">
                <p class="tip1"><span>销售备注：</span>{{mes}}</p>
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
                <p class="tip2" v-if="!show3"><span>异常原因：</span>{{resRemark}}</p>       
            </div>
            
            

        </div>
        <div class="classmes-box" v-if="!show1"> 
            <h2 class="border">加入班级</h2>
            
            <div class="classmes-table">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                    prop="name"
                    label="班级名称" align="center">
                   
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="班级创建" align="center" width="170">
                    </el-table-column>
                    <el-table-column
                    prop="chineseTeacherName"
                    label="中教老师" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="foreignTeacherName"
                    label="外教老师" align="center">
                    </el-table-column>
                    <el-table-column                   
                    label="课程类型" align="center">
                        <template slot-scope="scope" >                            
                           <span>{{scope.row.itermType == '1' ? '长期课程' : '短期课程'}}</span>                           
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="courseName"
                    label="课程名称" align="center">
                    </el-table-column>
                    
                    <el-table-column
                    prop="classTypeName"
                    label="班级类型" align="center">
                    </el-table-column>
                    
                    <el-table-column
                    prop="classTime"
                    label="上课时间" align="center" >
                    </el-table-column>
                    <el-table-column
                    
                    label="班级开始日期" align="center" width="170">
                        <template slot-scope="scope" >
                            
                           <span>{{scope.row.startTime.substring(0,10)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                   
                    label="班级结束日期" align="center" width="170">
                        <template slot-scope="scope" >
                            
                           <span>{{scope.row.endTime.substring(0,10)}}</span>
                        </template>
                    </el-table-column>
                    
                    
                                   
                </el-table>

                <div class="classmes-foot-box">                   
                    <p class="message"><span>课程开课时间：</span>{{startTime}}</p>                                      
                    <p class="message"><span>备注给中教：</span>{{toTeacher}}</p>                                                                             
                    <p class="message"><span>备注给外教：</span>{{toTutor}}</p>                                        
                </div>

            </div>
        </div>
        
            
              
    </div>
</template>

<script>
    import { BillsDetails } from "@/api/workorders.js";
    import { mapGetters } from 'vuex';
    //import { formatDate } from '@/utils/index.js'
    //import { buyBills } from "@/api/workorders.js";
    export default {
        data(){
            return{
                table:[], 
                payInfo:[],
                mes:'',
                // userId: "42",
                show:true,
                show1:true,
                show2:true,
                show3:true,
                reqRemark:'',
                reson:'',
                taskId:'',
                stat:'',
                params:'',
                title: '',
                toBeConfirmNum:'1',
                input: '',
                tableData2:[],
                tableData:[], //加入班级数据
                textarea:'',
                textarea1:'',
                startTime:'',
                toTeacher:'',
                toTutor:''

              }
            },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            gotoPage(scope) {
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
            
            BillsDetails(this.userInfo.billsFlowId)
            .then(res => {
                
                console.log(res.data.data)
                this.data = res.data.data
                this.userInfo.courseTypeName = this.data.billJson.courseTypeName
                this.userInfo.classType = this.data.billJson.classType
                this.userInfo.courseName = this.data.billJson.courseName
                this.table.push(this.userInfo)
                console.log(this.table) 
                if(this.data.stat == -1){
                    this.show = false
                    this.reson = JSON.parse(this.data.resRemark).remark1
                }
                if(this.data.stat == 2){
                    this.title = '购课工单>流程中>工单详情'
                    this.show2 = false
                }
                if(this.data.stat == 3){
                    this.title = '购课工单>待审核>工单详情'
                }
                if(this.data.stat == -1){
                    this.title = '购课工单>未通过>工单详情'
                }
                if(this.data.stat == 1){
                    this.title = '购课工单>已通过>工单详情'
                    this.show1 = false
                 }
                 if(this.data.stat == -2){
                    this.title = '购课工单>异常工单>工单详情'
                    this.show3 = false
                    
                    
                 }
                
                this.tableData2 = this.data.auditList
                this.payInfo = JSON.parse(this.data.billJson.payInfo)
                console.log(this.tableData2)
                this.resRemark = this.data.resRemark
                this.mes = this.data.reqRemark
                this.startTime = JSON.parse(this.data.resRemark).startTime
                this.toTeacher = JSON.parse(this.data.resRemark).toTeacher
                this.toTutor = JSON.parse(this.data.resRemark).toTutor
                
                this.tableData.push(this.data.clazzJson)
                             
                
            })
            .catch(res => {
                console.log()
            })           
        },
        // filters: {
        // formatDate(time) {
        //     var date = new Date(time);
        //     return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        //     }
        // }
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
            margin-top: 50px;
            padding-bottom: 15px;
            i{
                font-style: normal;
                font-weight: bold;
                color: $color-orange; 
            }
            .mes-box{
                display: inline-block;  
                width: 600px;
            }
            
            .pay-mes1{
                span{
                    display: inline-block;
                    margin-right: 15px;
                }
            }     
            .pay-mes2{
                float: right;
                span{
                    font-weight: bold;
                    color: $color-orange; 
                }
            }          
            
        }
        .pay-details-table-box{
            .tip1{ 
                color: #606266;                                
                
                span{
                color: $color-orange;
                font-weight: bold; 
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
    
    .classmes-box{
        margin:20px;
        h2{
            color:$color-orange;
            border-radius: 4px;
            height: 60px;
            line-height: 60px;
            margin-top:60px;
            margin-bottom:30px;
            padding-left: 10px;
        }
        .classmes-table{
            .checkBox{
                cursor: pointer;
                 .checkspan{
                margin-bottom: -2px;
                display: inline-block;
                width: 15px;
                height: 15px;
                background: red;
            }
            }
           
            p{
                height: 50px;
                line-height: 50px;
                padding-left: 15px;
                border-bottom:1px solid #ccc;
            }
        }
        .classmes-search-box{
            .search1-box{
                border-bottom: 1px solid #ccc;
                padding:20px 0;
                .tip1{
                    display: inline-block;
                    width:250px;
                    color: $color-orange;
                    
                }
                .tip2{
                    margin-left: 15px;
                    margin-right: 5px;
                }
                .search-btn{
                    float: right;
                    
                    margin-right: 5px;
                }
            }
        }
        .classmes-foot-box{
            padding:30px 0;
            
            .message{
                height:70px;
                line-height:70px;
                margin:0;
                color: #606266;
                span{
                    
                    color: $color-orange;
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