<template>
    <div class="main-box">
        <div class="title-box">
            <h3>购课工单>待审核>工单详情</h3>
        </div>       
        <div class="table-box">           
            <el-table :data="table" border style="width: 100%">
                <el-table-column
                prop="applyUser"
                label="订单发起人" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <span>{{ scope.row.applyUser }}</span>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.applyUser.slice(10) }}</el-tag>
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
                prop="periods"
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
                prop="classType"
                label="班级类型" align="center">
                </el-table-column>
                <el-table-column
                prop="schedulePoint"
                label="上课时间" align="center">
                </el-table-column>
                <!-- <el-table-column
                prop="jsonStr.desc"
                label="每周上课时间" align="center">
                </el-table-column> -->
                <el-table-column
                prop="applyTime"
                label="提交时间" align="center"  width="100">
                </el-table-column>
                <el-table-column
               
                label="用户详情页" align="center"  width="100">
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
                
            </div>            
        </div>
        
        <div class="classmes-box"> 
            <h2>教务排班操作</h2>
            <div class="classmes-search-box">
                <div class="search1-box">
                    
                    <div class="search-part">
                        <span class="tip1">条件1：操作中教、外教查询</span>
                        
                        <Teacherchinese @childChooseTeacher="chooseChineseTeacher"></Teacherchinese>
                        <span class="search-btn1"><el-button type="danger" size="small" @click="searchClasses">查询</el-button></span>
                    </div>
                    
                    <div >
                        <span class="tip1"></span>
                        
                        <Teacherforeign @childChooseTeacher="chooseForeignTeacher"></Teacherforeign>
                        
                    </div>
                    
                </div>
                <div class="search1-box" >
                   <div class="search-part1"> 
                        <span class="tip1">条件2：按条件查询</span>
                    
                    <el-select v-model="formInline1.getTime" clearable placeholder="班级创建时间" size="small" style="width:200px;margin:0 10px">
                        <el-option label="由近到远" value="由近到远"></el-option>
                        <el-option label="由远到近" value="由远到近"></el-option>
                        <el-date-picker v-model="formInline1.getTime" align="left" type="date" placeholder="选择具体日期"
                                        value-format="yyyy-MM-dd" :picker-options="pickerOptions1">
                        </el-date-picker>
                    </el-select>
                    <!-- <el-select v-model="value4" clearable placeholder="课程类型" size="small" style="width: 200px;margin:0 10px" @change="itemType">
                        <el-option v-for="item in courseType" :key="item" :label="item"
                           :value="item" align = center></el-option>
                    </el-select> -->
                    <el-select v-model="obj.classTypeId" clearable placeholder="班级类型名称" size="small" style="width: 200px;margin:0 10px">
                        <el-option v-for="item in classTypeList" :key="item.classTypeId" :label="item.name"
                           :value="item.classTypeId" align = center></el-option>
                    </el-select>
                    <el-input
                        clearable
                        size="small"
                        style="width:200px;margin:0 10px"
                        placeholder="请输入Class Name"
                        v-model="className">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                   </div>
                    
                    <div>
                        <span class="tip1"></span>
                        <el-select v-model="obj.classTime" clearable placeholder="上课时间" size="small" style="width: 200px;margin:0 10px">
                        <el-option v-for="item in classTimeArray" :key="item" :label="item"
                           :value="item" align = center></el-option>
              
                        </el-select>
                        <el-select v-model="obj.currentNumber" clearable placeholder="班级人数" size="small" style="width: 200px;margin:0 10px">
                            <el-option v-for="item in classNumberArray" :key="item" :label="item"
                            :value="item" align = center></el-option>
                        </el-select>
                        <!-- <el-select v-show="weekTimeItems.length>0" v-model="obj.weektimeId" clearable placeholder="每周上课时间" size="small" style="width: 220px;margin:0 10px">
                            <el-option v-for="item in weekTimeItems" :key="item.id"
                            :label="(item.jsonStr)|getDescByJson"
                            :value="item.id" align = center></el-option>
                        </el-select> -->
                        <el-select v-model="obj.grade" clearable placeholder="级别" size="small" style="width: 200px;margin:0 10px"  >
                            <el-option v-for="item in gradeArray" :key="item" :label="item"
                            :value="item" align = center></el-option>
                        </el-select>
                        <span class="search-btn"><el-button type="danger" size="small" @click="searchClasses">查询</el-button></span>
                    </div>
                    
                </div>
            </div>
            
            <div class="classmes-table">
                <el-table :data="tableData" border style="width: 100%">
                   <el-table-column
                    prop="name"
                    label="班级名称" align="center">
                    </el-table-column>
                    <el-table-column
                    
                    label="班级创建" align="center" width="170">
                        <template slot-scope="scope" >
                            
                           <span>{{scope.row.createTime.substring(0,19)}}</span>
                        </template>
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
                    label="课程名称" align="center">
                        <template slot-scope="scope" >                           
                           <span>{{scope.row.courseName}}</span>
                        </template>                    
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
                    
                    label="班级开始日期" align="center" width="120">
                        <template slot-scope="scope" >
                            
                           <span>{{scope.row.startTime.substring(0,10)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                   
                    label="班级结束日期" align="center" width="120">
                        <template slot-scope="scope" >
                            
                           <span>{{scope.row.endTime.substring(0,10)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    
                    label="班级人数" align="center" width="100">
                        <template slot-scope="scope" >
                            
                           <span>{{scope.row.currentNumber}}</span>/<span>{{scope.row.classNumber}}</span> 
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="grade"
                    label="级别 " align="center" width="80">
                    </el-table-column>
                    <!-- <el-table-column
                    prop="weekPointDesc"
                    label="每周上课时间" align="center" width="130">
                    </el-table-column> -->
                    
                    <el-table-column
                    prop="address"
                    label="排班" align="center" width="80" >
                    
                        <template slot-scope="scope" >
                            
                            
                            <el-radio    v-model="radio" :label="scope.$index" @change="chooseThisClass(scope.row)">选择</el-radio>
                        </template>
                    </el-table-column>               
                </el-table>
                <!-- 分页 -->
                <div class="pages-box">                
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="pageSize"
                    :page-size="pageLimit"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total='totalnum'>
                    </el-pagination>
                </div>

                <div class="classmes-foot-box">
                    <span>课程开课时间：</span>
                    <span>
                        <el-date-picker class="width-300"
                         v-model="chooseDate" 
                         type="date" 
                         placeholder="选择开课时间(当前时间2周内)"
                         value-format= "yyyy-MM-dd"
                          @change="startDate()">
                    </el-date-picker>
                        
                    </span>
                    <div class="message">
                        <span>备注给中教：</span>
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea" @blur="ToTeacher()">
                        </el-input>
                    </div>
                    <div class="message">
                        <span>For Tutor：</span>
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea1" @blur="ToTutor()">
                        </el-input>
                    </div>
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
    import { buyBills } from "@/api/workorders.js";
    import { mapGetters } from 'vuex';
    import Teacherforeign from '../components/teacher_foreign'
    import Teacherchinese from '../components/teacher_chinese'
    import {
        getClasses,
        getClassTypeItems,
        getWeekTimeItems,        
        editOneClass
    } from '../../../api/aom.js';
    export default {
        components:{
            Teacherforeign,
            Teacherchinese
        },
        data(){
            return{
                sTime:'',
                eTime:'',
                //分页
                pageSize:[10],
                pageLimit:10,
                totalnum:null, //列表总数
                currentPage4: 1,
                

                taskId:'',
                stat:'3',
                formdata:{}, //审核传参remark
                remark1:{
                        classId:'',
                        startTime:'',
                        toTeacher:'',
                        toTutor:''
                        },
                formdata1:{}, //拒绝理由
                resonMes:{
                    resonVal:''
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
                className:'',
                pagination: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                formInline1: {
                    getTime: null,
                },
                
                classNumberArray: [0,1, 2, 3, 4],
                gradeArray: [0, 1, 2, 3, 4, 5, 6],
                courseType:[
                    '长期课程',
                    '短期课程'
                ],
                classTimeArray: [
                    '15:00-15:25',
                    '15:30-15:55',
                    '16:00-16:25',
                    '16:30-16:55',
                    '17:00-17:25',
                    '17:30-17:55',
                    '18:00-18:25',
                    '18:30-18:55',
                    '19:00-19:25',
                    '19:30-19:55',
                    '20:00-20:25',
                    '20:30-20:55',
                    '21:00-21:25'
                   
                ],
                obj: {
                    stage:0,
                    status:0,
                    rows: 10,
                    page: 1,
                    chineseTeacherName: '',
                    foreignTeacherName: '',
                    classTypeId: '',
                    weektimeId: '',
                    currentNumber:'',
                    classNumber: '',
                    grady: '',
                    classTime: '',
                    itemType :'',
                    name:'',
                    // chineseTeacherRegionId:'',
                    // chineseTeacherGroupId:'',
                    // chineseTeacherId:'',
                    // foreignTeacherRegionId:'',
                    // foreignTeacherGroupId:'',
                    // foreignTeacherId:''
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
            chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
                console.log(bumenId, daquId, teamId, teacherId);
                this.obj.chineseTeacherRegionId = daquId;
                this.obj.chineseTeacherGroupId = teamId;
                this.obj.chineseTeacherId = teacherId;
                //this.obj.chineseTeacherName = '';
            },
            chooseForeignTeacher(bumenId, daquId, teamId, teacherId){
                console.log(bumenId, daquId, teamId, teacherId);
                this.obj.foreignTeacherRegionId = daquId;
                this.obj.foreignTeacherGroupId = teamId;
                this.obj.foreignTeacherId = teacherId;
                //this.foreignTeacherName = '';
            },
            itemType(){
                if(this.value4 == '长期课程'){
                    this.obj.itermType  = 1
                } 
                else if(this.value4 == '短期课程'){
                    this.obj.itermType  = 2
                }else{
                    this.obj.itermType = null
                }
                console.log(this.value4)
            },
            //检索班级分页
            handleSizeChange(val) {
                this.list = [];
                this.obj.rows =  val
                console.log(this.obj.rows);
                this._getClasses()
                console.log(`每页: ${val}`);
            },
            handleCurrentChange(val) {
                this.list = [];
                this.obj.page =   val
                console.log(this.obj.page);
                this._getClasses()
                console.log(`当前页: ${val}`);
            },
            gotoPageUser(scope) {
                console.log(scope)
                this.$router.push(
                    {path: '/detail/user',
                     query:{phone:scope.row.phone}
                    });
            },
            startDate(){
                this.remark1.startTime = this.chooseDate
                if(this.sTime == ''){
                    return
                    // this.$message({                        
                    //         type: 'error',
                    //         message: '请先选择班级'
                    //     });
                }else{
                    if(this.chooseDate > this.sTime && this.chooseDate < this.eTime){
                    console.log(1)
                    }else if(this.chooseDate == this.sTime){
                            console.log(3)

                    }else{
                         this.$message({
                            type: 'error',
                            message: '请选择正确的开课时间'
                        })
                    }
                }
                
                
            },
            ToTeacher(){
                this.remark1.toTeacher = this.textarea
                console.log( this.remark1.toTeacher)
            },
            ToTutor(){
                this.remark1.toTutor = this.textarea1
                console.log( this.remark1.toTutor)
            },
            checked(scope){
                console.log(scope)
                
            },
            //选中某个班级
            chooseThisClass(row) {               
                this.remark1.classId = String(row.classId)
                this.sTime = row.startTime.substring(0,10)
                this.eTime = row.endTime.substring(0,10)
                console.log(this.sTime)
                console.log(this.eTime)
                if(this.chooseDate){
                    this.startDate()    
                }
                         
            },
            isClassID(){
                if(!this.remark1.classId){
                    this.$message({
                        
                            type: 'error',
                            message: '请选择班级 '
                        });
                }else if(!this.remark1.startTime){
                    
                    this.$message({
                        
                            type: 'error',
                            message: '请选择开课时间 '
                        });
                    
                }else if(!this.remark1.toTeacher){
                    this.$message({
                        
                            type: 'error',
                            message: '请输入中教备注'
                        });
                }else if(!this.remark1.toTutor){
                    this.$message({
                        
                            type: 'error',
                            message: '请输入外教备注'
                        });
                 } else if(this.chooseDate < this.sTime || this.chooseDate >= this.eTime){
                     console.log(2)
                     this.$message({
                            type: 'error',
                            message: '请选择正确的开课时间'
                        });
                 }
                else {
                    console.log(1)
                    this.trueOrder()
                }
            },

           
            chooesChTeacher(){
                
            },
            //班级类型
            _getClassTypeItems() {
                getClassTypeItems().then((res) => {
                this.classTypeList = res.data;
                })
            },
            // currentChange(val) {
            //     this.list = [];
            //     this.pagination.page = val;
            //     this.obj.pages = val;
            //     console.log(this.obj);
            //     this._getClasses();
            // },
            //搜索班级
            searchClasses() {
                //this.obj.size = 10;
                //this.obj.pages = 1;
                this.obj.name = this.className
                this._getClasses();
            },
            //每周上课时间
            _getWeekTimeItems() {
                getWeekTimeItems().then((res) => {
                this.weekTimeItems = res.data;
                console.log(this.weekTimeItems);
                });
            },
            //获取班级列表
            _getClasses() {
                
                var createTimeOrderByField = '';
                var createTimeAsc = '';
                var createTime = '';

                var createTimeOrderByField = '';
                var createTimeAsc = '';
                var createTime = '';
                switch (this.formInline1.getTime) {
                case null:
                    createTimeOrderByField = '';
                    createTimeAsc = '';
                    createTime = '';
                    break;
                case '由远到近':
                    createTimeOrderByField = 'createTime';
                    createTimeAsc = 'false';
                    createTime = '';
                    break;
                case '由近到远':
                    createTimeOrderByField = 'createTime';
                    createTimeAsc = 'true';
                    createTime = '';
                    break;
                default:
                    createTimeOrderByField = '';
                    createTimeAsc = '';
                    createTime = this.formInline1.getTime;
                }
                
                
                if (createTimeOrderByField) {
                this.obj.orderByField = createTimeOrderByField;
                this.obj.asc = createTimeAsc || 'true';
                } else {
                this.obj.createTime = createTime;
                }
                
                console.log(this.obj.page)
                console.log(this.obj.rows)
                // this.obj.pages = this.obj.page;
                // this.obj.size = this.pagination.size;
                // this.obj.current = this.pagination.page;
                this.obj.status = 0;
                console.log(this.obj);
                getClasses(this.obj).then((res) => {
                this.list = res.data.records;
                this.totalnum =res.data.total
                console.log(this.list);
                this.tableData = this.list
                this.pagination.total = res.data.total;
                })
            },
            //购课审核
            
            falseOrder(value){
                this.resonMes.resonVal = value
                this.formdata1.remark = this.resonMes
                buyBills(this.userId,this.taskId, -1, this.formdata1)
                .then(res => {
                    this.$router.push(
                    {path: 'buyorder',
                     
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
                buyBills(this.userId, this.taskId, 1, this.formdata)
                .then(res => {
                    this.$router.push(
                        {path: 'buyorder'
                     
                        });
                     this.$message({                   
                        type: 'success',
                        message: '成功通过工单!'
                });
                  console.log(res.data);
              })
              .catch(res => {
                  this.$router.push(
                        {path: 'buyorder',
                     
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
                    this.formdata.remark = JSON.stringify(this.remark1)
                    console.log(this.formdata)
                    this.isClassID()

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
            this.data = this.userInfo.billInfo.billsOrder
            this.data2 = this.userInfo.billInfo.auditList
            if(this.data.courseTypeName == "长期课程"){
                this.obj.itemType = 1
            }else{
                this.obj.itemType = 2
            }
            console.log(this.data)
           
            this.data.username = this.data2[0].username
            this.mes = this.data.remark
            this.payInfo = this.data.payInfo
            this.taskId = this.userInfo.id
            this.table.push(this.data)
            this.tableData2 = this.data2
            
            //查询
            this._getClasses();
            this._getClassTypeItems();
            this._getWeekTimeItems();
            
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
            .tip1{ 
                color: #606266;                                 
                
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

                .search-part1{
                    margin-bottom: 10px;
                }
               
                border-bottom: 1px solid #ccc;
                padding:20px 0;
                .tip1{
                    display: inline-block;
                    width:250px;
                    color: $color-orange;
                    
                }
                .search-btn1{
                    float: right;                   
                    margin-right: 5px;
                    margin-top: 20px;
                }
                .search-btn{
                    float: right;                   
                    margin-right: 5px;
                }
            }
        }
        .classmes-foot-box{
            color: #606266;
            padding:30px 0;
            span:nth-child(2){
                display: inline-block;
               
                padding:5px;
            }
            .message{
                color: #606266;
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