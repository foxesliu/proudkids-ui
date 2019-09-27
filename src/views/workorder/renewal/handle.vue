<template>
    <div class="main-box">
        <div class="title-box">
            <h3>续课工单>待审核>工单详情</h3>
        </div>       
        <div class="table-box">           
            <el-table :data="table" border style="width: 100%">
                <el-table-column
                prop="billInfo.applyUser"
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
                prop="billInfo.billJson.periods"
                label="购买课时" align="center">
                </el-table-column>
                <el-table-column
                    prop="courseType"
                    label="课程类型" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="billInfo.billJson.clazz.courseName"
                    label="课程名称" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="billInfo.billJson.clazz.classTypeName"
                    label="班级类型" align="center">
                    
                    </el-table-column>
                    <el-table-column
                    prop="billInfo.billJson.clazz.name"
                    label="班级名称" align="center">
                    </el-table-column>
                <el-table-column
                prop="billInfo.billJson.clazz.classTime"
                label="上课时间" align="center">
                </el-table-column>
                <!-- <el-table-column
                prop="weekPoint"
                label="每周上课时间" align="center">
                </el-table-column> -->
                <el-table-column  label="提交时间" align="center" width="100">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.createTime | parseTime}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop=""
                label="用户详情页" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button @click="gotoPageUser(scope)" type="text" size="small">详情</el-button>
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
                <p class="tip2"></p>           
            </div>            
        </div>
        
        <div class="classmes-box"> 
            <h2>续费&续课操作</h2>
            
            <p>目前处在的班级(仅展示现在还存在的班级，不是关闭的班级，包括结束的班级)</p>
                    
                    
            <div class="classmes-table">
                <el-table :data="table" border style="width: 100%">
                    <el-table-column
                    prop="billInfo.applyUser"
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
                    prop="billInfo.billJson.periods"
                    label="购买课时" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="courseType"
                    label="课程类型" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="billInfo.billJson.clazz.courseName"
                    label="课程名称" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="billInfo.billJson.clazz.classTypeName"
                    label="班级类型" align="center">
                    
                    </el-table-column>
                    <el-table-column
                    prop="billInfo.billJson.clazz.name"
                    label="班级名称" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="billInfo.billJson.clazz.classTime"
                    label="上课时间" align="center">
                    </el-table-column>
                    <!-- <el-table-column
                    prop="weekPoint"
                    label="每周上课时间" align="center">
                    </el-table-column> -->
                    <el-table-column
                    
                    label="提交时间" align="center" width="100">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.createTime | parseTime}}
                        </span>
                    </template>
                    </el-table-column>
                    
                    <el-table-column
                    prop="address"
                    label="排班" align="center"  >
                    
                        <template slot-scope="scope" >
                            
                            
                            <el-radio    v-model="radio" :label="scope.$index" @change="chooseThisClass(scope.row)">选择</el-radio>
                        </template>
                    </el-table-column>               
                </el-table>

                <div class="classmes-foot-box">
                    
                    <div class="btns">
                         <el-button type="danger" style="marginRight:50px;width:150px" size="small" @click="open3()" >拒绝</el-button>
                         <el-button type="primary" size="small" style="width:150px" @click="open2()">同意</el-button>
                    </div>
                </div>

            </div>
        </div>       
    </div>
</template>

<script>
    import { typesBills } from "@/api/workorders.js";
    import { mapGetters } from 'vuex'
    import {
        getClasses,
        getClassTypeItems,
        getWeekTimeItems,
        getTeachersByDeptId,
        editOneClass
    } from '../../../api/aom.js';
    export default {
        data(){
            return{
                taskId:'',
                stat:'3',
                formdata:{                    
                },
                remark1:{
                    classId:'',
                    ruserId:'',
                    periodNum:'',                   
                },
                
                formdata1:{},
                remarkVal:{
                    remark1:''
                    },
              
                textarea:'',
                textarea1:'',
                radio:false,
                chooseDate:'',
                table:[], 
                payInfo:[],
                mes:'',//备注信息
                
                input: '',
                tableData: [],
                tableData2:[],

                //查询
                chineseTeachersData: [],
                chineseTeachersDaquID: '',
                chineseTeachersDaquIndex: '',
                chineseTeachersItemArray: [],
                chineseTeacherItemID: '',
                chineseTeachersItemIndex: '',
                chineseTeachers: [],
                chineseTeacher: '',
                foreignTeachersData: [],
                foreignTeachersDaquID: '',
                foreignTeachersDaquIndex: '',
                foreignTeachersItemArray: [],
                foreignTeacherItemID: '',
                foreignTeachersItemIndex: '',
                foreignTeachers: [],
                foreignTeacher: '',
                pagination: {
                    page: 1,
                    size: 10,
                    total: 0
                },
                formInline1: {
                    getTime: null,
                },
                
                classNumberArray: [1, 2, 3, 4, 5, 6],
                gradeArray: [0, 1, 2, 3, 4, 5, 6],
                courseType:[
                    '长期',
                    '短期'
                ],
                classTimeArray: [
                    '18:00-18:25',
                    '18:30-18:55',
                    '19:00-19:25',
                    '19:30-19:55',
                    '20:00-20:25',
                    '20:30-20:55',
                    '21:00-21:25'
                   
                ],
                obj: {
                    size: 10,
                    pages: 1,
                    chineseTeacherName: '',
                    foreignTeacherName: '',
                    classTypeId: '',
                    weektimeId: '',
                    classNumber: '',
                    grady: '',
                    classTime: ''
                },

                classTypeList: [],
                weekTimeItems: [],
                               
                    value7: '',
                    value4:'',
                    options: [{
                        value: '选项1',
                        label: '黄金糕'
                        }, {
                        value: '选项2',
                        label: '双皮奶'
                        }],
                                             
                }
            },
        computed: {
        ...mapGetters(['userId'])
        },    
        methods: {
            gotoPageUser(scope) {
                console.log(scope)
                this.$router.push(
                    {path: '/detail/user',
                     query:{phone:scope.row.phone}
                    });
            },
            checked(scope){
                console.log(scope)
                
            },
            //选中某个班级classId
            chooseThisClass(row) {               
                this.remark1.classId = String(row.billInfo.billJson.clazz.classId)
                this.remark1.ruserId = String(row.billInfo.billJson.ruser.ruserId)
                this.remark1.periodNum = String(row.billInfo.billJson.periods)
                this.formdata.remark = JSON.stringify(this.remark1)
                console.log(row)
                console.log( row.billInfo.billJson.clazz.classId)
                console.log(this.formdata)
            },
            isClassID(){
                if(!this.remark1.classId){
                    this.$message({
                        
                            type: 'error',
                            message: '请选择班级 '
                        });
                }else{
                    
                    this.trueOrder()
                }
            },

            
            //续课审核

            falseOrder(value){
                this.remarkVal.remark1 = value
                this.formdata1.remark = this.remarkVal
                typesBills(this.userId,this.taskId, -1, this.formdata1)
                .then(res => {
                    this.$router.push({
                        path: 'renewal'
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
                //this.formdata.remark = JSON.stringify(this.remark)
                typesBills(this.userId, this.taskId, 1, this.formdata)
                .then(res => {
                    this.$router.push({
                        path: 'renewal'
                    });
                  this.$message({                   
                    type: 'success',
                    message: '成功通过工单!'
                });
                  console.log(res.data);
              })
              .catch(res => {
                  this.$router.push({
                        path: 'renewal'
                    });
                  console.log(res);
              });
            },
            open2() {
                this.$confirm('确认通过工单', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.isClassID()
                
                //console.log(this.formdata)
                
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
            },
            
            pickerOptions1() {
                console.log('123')
            },         
        },
        created(){
            this.userInfo = JSON.parse(sessionStorage.getItem('index'));
            console.log(this.userInfo);
            this.table.push(this.userInfo)
            
            this.payInfo = this.userInfo.billInfo.billJson.payInfo
            this.tableData2 = this.userInfo.billInfo.auditList
            this.taskId = this.userInfo.id
            console.log(this.taskId)
            this.mes = this.userInfo.billInfo.billJson.remark
            
            
        },
        filters: {
            timestampToDate: function (timestamp) {
                return sfTools.getDateFromTimestamp(timestamp);
            },
            getDescByJson: function (json) {
                return JSON.parse(json).desc;
            }
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
            padding-bottom: 20px;
            .tip1{                                  
                
                span{
                    font-weight: bold;
                color: $color-orange;
                }
            }
            .pay-details-table{
                width:90%;
                margin:0 auto;

            }
            
        }
    }   
    .table-box{
        margin:20px;
    }
    .classmes-box{
        margin:20px;
        p{
            color:$color-orange;
            font-weight: bold;
            margin:30px 0;
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
                    span{
                        font-weight: bold;
                        color: $color-orange; 
                    }
                }
                .search-btn{
                    float: right;   
                    margin-right: 5px;
                }
            }
        }
        .classmes-foot-box{
            padding:30px 0;
            span:nth-child(2){
                display: inline-block;
               
                padding:5px;
            }
            .message{
                margin:30px 0;
                span{
                    display: inline-block;
                    margin-bottom: 20px;
                    color: $color-orange;
                }
            }
            .btns{
                display: flex;
                justify-content: center;
            }
        }
    }
}

</style>