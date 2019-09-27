<template>
    <div class="main-box">
        
        <div class="selectBox">
            <div class="flex-box">
                <div class="ctselect" v-if="this.propid == 20 || this.propid == 21 || this.propid == 31 || this.propid == 27 || this.propid == 22">
                    <span style="width:35px;">CT：</span>
                    <div>
                        <v-teacherchinese ref="ct" :roleId = propid :fdaquId = this.daquId :tcherArry = this.teachersArray @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>
                    </div>
                </div>
                <div class="ctselect margin-top20" v-if="this.propid == 23 || this.propid == 24 || this.propid == 32 || this.propid == 27 || this.propid == 25">
                    <span style="width:35px;">FT：</span>
                    <div >
                        <v-teacherforeign ref="ft" :roleId = propid :fdaquId = this.daquId :tcherArry = this.teachersArray @childChooseTeacher="chooseForeignTeacher"></v-teacherforeign>
                    </div>
                </div>
            </div>
             
            <div class="flex-btn">
                <!-- <el-button  type="danger" size="small" style="display:block;margin-left:10px;width:100px" @click="pClear">empty</el-button> -->
                <el-button  type="success" size="small" style="display:block;width:100px" @click="getlist()">search</el-button>
            </div>
        </div>
        <el-input
            clearable
            size="small"
            style="width:200px;margin:0 20px"
            placeholder="Class Name"
            v-model="classLesson.className">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <div class="aom-teacher-components">
           
            <div class="title-box">
                <h3>Today's</h3>
                <span class="btn-make">
                    <el-button  type="info" size="small" v-if="this.mknum == 0" >(0)Make up</el-button>
                    <el-button  type="primary" size="small" v-if="this.mknum != 0" @click="toMake">({{mknum}})Make up</el-button>
                </span>
            </div> 
            
            
        </div>
          
        <div class="table-box">           
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#f9fafc'}" >
                <el-table-column
                prop="createTime"
                label="Term" align="center" >
                <template slot-scope="scope">
                        <span v-if="scope.row.itemType != 3">
                            {{scope.row.isSub == 0 ? 'Regular' : 'Sub'}}
                        </span>
                        <span v-if="scope.row.itemType == 3">
                            Free-trial
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="className"
                label="Class Name" align="center">
                
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="Class Time" align="center">
                <template slot-scope="scope">
                        <span>
                            {{scope.row.newStartTime.substring(11,16)}}-{{scope.row.newEndTime.substring(11,16)}}
                        </span>
                    </template>
                </el-table-column>


                <el-table-column
                prop="lastName"
                label="Date" align="center">
                    <template slot-scope="scope" >
                        <span>
                            {{scope.row.newStartTime.substring(0,10)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="teacherName"
                label="Teacher" align="center">
                    <template slot-scope="scope">
                        <el-tooltip
                        class="item"
                        effect="dark"
                        :content="scope.row.teacherDepartInfo"
                        placement="top"
                        >
                        <el-button
                            size="mini"
                        >{{scope.row.teacherDepartInfo.substring(scope.row.teacherDepartInfo.indexOf("(") + 1,scope.row.teacherDepartInfo.indexOf(")"))}}</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                prop="courseName"
                label="Package" align="center">
                </el-table-column>       
                <el-table-column
                prop="lessonName"
                label="Courseware" align="center">
                     <template slot-scope="scope">
                        <span>{{scope.row.lessonName}}</span>
                        <a
                        :href="'/aom/lesson/downloadZip/'+scope.row.lessonId+'?type=1'"
                        target="_blank"
                        style="display:inline-block;margin-top:10px;margin-bottom:10px;"
                        >
                        <el-button class="CoursewareBtn" type="primary" size="mini">Pre-Courseware</el-button>
                        </a>
                        <a :href="'/aom/lesson/downloadZip/'+scope.row.lessonId+'?type=0'" target="_blank">
                        <el-button class="CoursewareBtn" type="danger" size="mini">Courseware</el-button>
                        </a>
                    </template>               
                </el-table-column>
                <el-table-column
                prop="monitorAddr"
                label="Link" align="center">
                <template slot-scope="scope">                       
                        <a
                           :href="scope.row.monitorAddr"
                           target="_blank">
                            <el-button  type="primary" size="small">Click</el-button>
                        </a>                    
                    </template> 
                   
                </el-table-column>
                <el-table-column               
                label="Evaluate Students" align="center" width="300">
                    <template slot-scope="scope">
                        <ul class="students">
                            <li  v-for="(item,index) in scope.row.studentList" :key="index">
                                <span>{{item.ruserEnName}}</span>
                                <span>
                                     <el-button type="success" size="small" v-if="item.evaluateId == null" @click="toEval(scope.$index,item.phone,item.id)">Evaluate</el-button>
                                     <el-button type="warning" size="small" v-if="item.evaluateId != null" @click="editEval(scope.$index,item.phone,item.id,item.evaluateId)">Edit</el-button>
                                </span>                         
                            </li>                          
                        </ul>                   
                    </template>                  
                </el-table-column>                       
            </el-table>

        </div>
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
    </div>
</template>

<script>
    import local from '@/views/i18n-demo/local'
    const viewName = 'i18nView'
    import {mapGetters} from 'vuex'
    import Cookies from 'js-cookie'
    import { TclassLesson ,makeUpCount } from '@/api/applylist.js'

    import { getTeachersByDeptId } from '@/api/aom.js';
    import TeacherForeign from './teacher_foreign.vue';
    import TeacherChinese from './teacher_chinese.vue';

    export default {
         components: {

      'v-teacherforeign': TeacherForeign,
      'v-teacherchinese': TeacherChinese,
    },
        data(){
            return{
                //外教
                
                 obj: {
                    size: 10,
                    pages: 1,
                    classTypeId: '',
                    currentNumber: '',
                    weektimeId: '',
                    grade: '',
                    classTime: ''
                    },
                teachersArray:[],
                propid:'',
                fpropid:'',
                fteacherType:true,
                chteacherType:true,
                chineseTeacherRegionFlag: false,
                chineseTeacherGroupFlag: false,
                chineseTeacherFlag: false,
                foreignTeacherRegionFlag: false,
                foreignTeacherGroupFlag: false,
                foreignTeacherFlag: false,
                chineseTeachersData: [],
                daquArray: [],
                teamArray: [],
                foreignTeachersData: [],
                teamArray: [],
                teacherArray: [],
                bumenArray: [],
                daquArray: [],
                teamArray: [],
                teacherArray: [],
                bumenId: '',
                daquId: '',
                teamId: '',
                teacherId: '',
                TeacherGroupFlag:true,
                TeacherRegionFlag:true,
                TeacherFlag:true,
                title1:'',
                title:'',
                //获取列表
                classLesson:{
                    //userId:'49',
                    startTimeStamp:'',  // 获取当前时间
                    regionId:null,
                    groupId:null,
                    teacherId:null,
                    page:'1',
                    rows:'10',
                    className:'',
                },
                makeUpCountDate:{
                    //userId:'49',
                    startTimeStamp:'',  // 获取当前时间
                    regionId:null,
                    groupId:null,
                    teacherId:null,
                },
                mknum:'',
                //分页
                pageSize:[10, 20, 50],
                pageLimit:10,
                totalnum:null, //列表总数
                currentPage4: 1,
                toBeConfirmNum:'1',
                input: '',
                tableData: [
                ],
                studentsData:[

                ],
                ccData: {
                    chineseTeacherId: '',
                    foreignTeacherId: ''
                },
                formData: {
                    chineseTeacherIdFlag: null,
                    page: 1,
                    rows: 10,
                    current: null,
                    stage: null,//班级级别 0：未过期 1：已过期
                    classId: null,
                    classTypeId: null,  //班级类型ID
                    name: null,  //班级类型ID
                    status: null,  //班级状态 0:未关闭 1：已关闭
                    classTime: null,  //班级上课时间 eg: 18:00-18:30
                    currentSchedule: null,  //班级类型ID
                    currentNumber: null,  //当前班级人数
                    classNumber: null,  //班级预定人数
                    liveAddr: null,  //当前班级人数
                    chineseTeacherId: null,  //中教ID
                    chineseTeacherName: null,  //中教姓名
                    chineseTeacherGroupId: null,  //中教所在组ID
                    chineseTeacherGroupName: null,  //中教所在组名称
                    chineseTeacherRegionId: null,  //中教所在大区ID
                    chineseTeacherRegionName: null,  //中教所在大区名称
                    foreignTeacherId: null,  //外教ID
                    foreignTeacherName: null,  //外教姓名
                    foreignTeacherGroupId: null,  //外教所在组ID
                    foreignTeacherGroupName: null,  //外教所在组名称
                    foreignTeacherRegionId: null,  //外教所在大区ID
                    foreignTeacherRegionName: null,  //外教所在大区名称
            //          itermType: '',  //班级类型 1：长期 2：短期
                    classTypeName: null,  //班级类型名称
                    grade: null,  //级别或者年级
                    weekPoint: null,  //每周几上课，数据格式为 1,3,5
                    weekPointDesc: null,  //级别或者年每周上课时间中文描述
                    weektimeId: null,  //级别或者年级
                    createTimeGe: null,  //大于等于创建时间
                    createTimeLe: null,  //创建时间
                    updateTimeGe: null,  //修改时间
                    updateTimeLe: null,  //修改时间
                    endTimeGe: null,  //班级结束日期
                    endTimeLe: null,  //班级结束日期
                    },
            }
        },
        methods: {
            pClear(){
                console.log(this.$refs.ct);
                this.$refs.ct.clear()
                this.$refs.ft.clear()
            },
            chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
                console.log(bumenId, daquId, teamId, teacherId);
                this.classLesson.regionId = daquId;
                this.classLesson.groupId = teamId;
                this.classLesson.teacherId = teacherId;
                this.makeUpCountDate.regionId = daquId;
                this.makeUpCountDate.groupId = teamId;
                this.makeUpCountDate.teacherId = teacherId;
                // this.totallist()
            //this.obj.chineseTeacherName = '';
            },
            chooseForeignTeacher(bumenId, daquId, teamId, teacherId){
                console.log(1);
                console.log(bumenId, daquId, teamId, teacherId);
                this.classLesson.regionId = daquId;
                this.classLesson.groupId = teamId;
                this.classLesson.teacherId = teacherId;
                this.makeUpCountDate.regionId = daquId;
                this.makeUpCountDate.groupId = teamId;
                this.makeUpCountDate.teacherId = teacherId;
                // this.totallist()
                //this.foreignTeacherName = '';
            },
            Download(lessonId){
                window.location.href = ''/aom/lesson/downloadZip/'+lessonId'
            },
             dateFormat(millionsTime, pattern){
                var d = new Date();
                d.setTime(millionsTime);
                var date = {
                    "M+": d.getMonth() + 1,
                    "d+": d.getDate(),
                    "h+": d.getHours(),
                    "m+": d.getMinutes(),
                    "s+": d.getSeconds(),
                    "q+": Math.floor((d.getMonth() + 3) / 3),
                    "S+": d.getMilliseconds()
                };
                if (/(y+)/i.test(pattern)) {
                    pattern = pattern.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in date) {
                    if (new RegExp("(" + k + ")").test(pattern)) {
                        pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                    }
                }
                return pattern;
            },



            handleSizeChange(val) {
                this.classLesson.rows =   String(val)

                this.getlist()
                console.log(val);
            },
            handleCurrentChange(val) {
                this.classLesson.page =   String(val)

                this.getlist()
                console.log(`当前页: ${val}`);
            },
            gotoPage(index) {
                console.log(index);
                sessionStorage.setItem('index',JSON.stringify(this.tableData[index]))
                this.$router.push({
                    path: 'applydetail',
                    query: {data:this.tableData[index]}
                });
            },
            toEval(index,phone,id){
            //     query: {lessonId: scope.row.lessonId
            // ,originTime:scope.row.originTime,lessonName:scope.row.lessonName,courseName:scope.row.courseName,
            // phone:$route.query.phone,id:scope.row.id}
                this.$router.push({
                    path:'evaluation1',
                    query: {
                            lessonId: this.tableData[index].lessonId,
                            originTime:this.tableData[index].originTime,
                            lessonName:this.tableData[index].lessonName,
                            courseName:this.tableData[index].courseName,
                            phone:phone,
                            id:id,
                    }
                });
                console.log(this.tableData[index])
            },
            toMake(){
                let [roleId] = this.roleIds;
                if(roleId == 27){
                    this.$router.push({
                        path:'/aom/missedlist',
                    })
                }else{
                    this.$router.push({
                        path:'/teachers/cramClass',
                    });
                }

            },
            editEval(index,phone,id,evaluateId){
            //     query: {lessonId: scope.row.lessonId
            // ,originTime:scope.row.originTime,lessonName:scope.row.lessonName,courseName:scope.row.courseName,
            // phone:$route.query.phone,id:scope.row.id}
                this.$router.push({
                    path:'editEvaluation1',
                    query: {lessonId: this.tableData[index].lessonId,
                            originTime:this.tableData[index].originTime,
                            lessonName:this.tableData[index].lessonName,
                            courseName:this.tableData[index].courseName,
                            phone:phone,
                            id:id,
                            evaluateId:evaluateId
                    }
                });
                console.log(this.tableData[index])
            },
            changeDaqu(){

                console.log('大区'+ this.daquId)
                for (let i = 0; i < this.daquArray.length; i++) {
                    console.log('大区'+ this.daquId)

                if (this.daquId == this.daquArray[i]['id']) {
                    console.log(this.teamArray)
                    this.teamArray = this.daquArray[i]['child'];
                    this.daquArray = this.daquArray[i]['child'];
                    break;
                }
                }
                this.classLesson.regionId =this.daquId
                this.makeUpCountDate.regionId =this.daquId
                console.log(this.daquArray);
                this.totallist()
                this.teamId = '';
                this.teacherId = '';

            },
            changeTeam(){

                //alert();
                for (let i = 0; i < this.teamArray.length; i++) {
                if (this.teamId == this.teamArray[i]['id']) {
                    this.teacherArray = this.teamArray[i]['users'];
                    break;
                }
                }
                this.classLesson.groupId = this.teamId
                this.makeUpCountDate.groupId = this.teamId
                 this.totallist()
                console.log(this.teacherArray);
                this.teacherId = '';

            },
            chooseTeacher(){
                this.classLesson.teacherId = this.teacherId
                this.makeUpCountDate.teacherId = this.teacherId
                this.totallist()
                console.log(this.teacherId);
                console.log(this.classLesson)
            },
            getlist(){
                this.getTime();
                console.log( this.classLesson)
                TclassLesson(this.classLesson)
                .then(res=>{
                    // console.log(res.data.records)
                    this.totalnum =res.data.total
                    sessionStorage.setItem('detailParams', JSON.stringify(this.tableData))//存储详细信息
                    let data = res.data.records
                    this.tableData = data
                    for(var i = 0;i < data.length;i++){
                        this.tableData[i].newEndTime =  this.dateFormat(this.tableData[i].endTime,"yyyy-MM-dd hh:mm:ss")
                        this.tableData[i].newStartTime = this.dateFormat(this.tableData[i].startTime,"yyyy-MM-dd hh:mm:ss")
                        this.tableData[i].originTime = this.dateFormat(this.tableData[i].startTime,"yyyy-MM-dd hh:mm:ss")
                    }
                })
                .catch(res=>{
                    console.log(res);
                })
            },
            getTime(){
                let date=new Date();
                let y = date.getFullYear();
                let m = date.getMonth();
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let date2 = new Date(y,m,d)
                var todayTimestamp = (new Date(new Date().setHours(0, 0, 0, 0))).getTime();
                this.classLesson.startTimeStamp =Date.parse(date2)/1000
                this.makeUpCountDate.startTimeStamp =Date.parse(date2)/1000
            },
            getMakeUpCount(){
                this.getTime()
                makeUpCount(this.makeUpCountDate).then(res=>{
                    this.mknum = res.data
                })
                .catch(res=>{
                    console.log(res);
                })
            },

            initForeignSelectOPtions() { //外教初始化
                this.foreignTeachersData.child.forEach((grandparent) => {
                grandparent.users.forEach(item => {
                    if (item.userId == this.userId) {
                    this.foreignTeacherRegionFlag = true
                    this.daquId = grandparent.id
                    }
                })
                if (grandparent.id == this.userId) {
                    console.log('大区' + grandparent.id)
                } else {
                    grandparent.child.forEach(parent => {
                    if (parent.id == this.userId) {
                        console.log('组长' + parent.name)
                    } else {
                        parent.users.forEach((item) => {
                        if (item.userId == this.userId) {
                            if (item.roleId == 23) {
                            this.foreignTeacherRegionFlag = true
                            this.foreignTeacherGroupFlag = true
                            this.foreignTeacherFlag = true
                            } else if (item.roleId == 24) {
                            this.foreignTeacherRegionFlag = true
                            this.foreignTeacherGroupFlag = true
                            }
                            if (item.roleId == 24) {
                            this.formData.foreignTeacherId = null
                            } else {
                            this.formData.foreignTeacherId = item.userId
                            }

                            if (item.roleId == 23) {
                            this.teacherId = item.userId
                            }
                            this.teamId = parent.id
                            this.daquId = grandparent.id
                        }
                        })
                    }
                    })
                }
                })
            },

            totallist(){
                let [roleId] = this.roleIds;
                console.log('角色'+roleId)
                if (roleId == 20 ) { //中教
                    this.propid = 20
                    this.fteacherType = false,
                    this.teacherType = 0;
                    this.$i18n.locale = 'zh'
                    this.$store.dispatch('setLanguage', 'zh')
                    this.formData.chineseTeacherId = this.userId
                    this.classLesson.teacherId = this.userId
                    this.makeUpCountDate.teacherId = this.userId
                    this.chineseTeacherRegionFlag = true
                    this.chineseTeacherGroupFlag = true
                    this.chineseTeacherFlag = true
                    getTeachersByDeptId(2).then((res) => {  //中教
                    this.chineseTeachersData = res.data.data
                    console.log(this.chineseTeachersData)
                    //this.initChineseSelectOPtions();
                    this.chineseTeachersData.child.forEach((groupparent) => {//中教大区
                        groupparent.child.forEach(item => {// 中教组
                            item.users.forEach(group => { // 组员/ 组长
                                if(group.userId == this.userId) {
                                    this.daquId = groupparent.id
                                    this.makeUpCountDate.regionId = groupparent.id
                                    this.makeUpCountDate.groupId = item.id
                                    console.log(this.daquId)
                                    console.log('找到对应的人')
                                    this.classLesson.regionId =   groupparent.id
                                    this.classLesson.groupId =   item.id
                                    this.getlist()
                                    this.getMakeUpCount()
                                }
                            })
                        })
                    })
                    console.log(this.classLesson.regionId)
                    console.log(this.classLesson.groupId)
                    })
                    console.log(this.classLesson)

                }
                if (roleId == 21 ) { //中教组长
                    this.propid = 21
                    this.fteacherType = false,
                    this.teacherType = 0;
                    this.$i18n.locale = 'zh'
                    this.$store.dispatch('setLanguage', 'zh')
                    this.formData.chineseTeacherId = this.userId


                    getTeachersByDeptId(2).then((res) => {  //中教
                        this.chineseTeachersData = res.data.data
                        console.log(this.chineseTeachersData)
                    //this.initChineseSelectOPtions();
                        this.chineseTeachersData.child.forEach((groupparent) => {//中教大区
                            groupparent.child.forEach(item => {// 中教组
                                item.users.forEach(group => { // 组员/ 组长
                                    if(group.userId == this.userId) {
                                        this.daquId = groupparent.id
                                        this.teachersArray = item.users
                                        console.log(this.daquId)
                                        console.log('找到对应的人')
                                        this.makeUpCountDate.regionId = groupparent.id
                                        this.makeUpCountDate.groupId = item.id
                                        this.classLesson.regionId = groupparent.id
                                        this.classLesson.groupId = item.id
                                        this.getlist()
                                        this.getMakeUpCount()
                                    }
                                })
                            })
                        })

                    })

                }
                if (roleId == 23 ) { //外教
                this.chteacherType = false
                this.propid = 23
                    this.teacherType = 1;
                    this.$i18n.locale = 'en'
                    this.$store.dispatch('setLanguage', 'en')
                    //this.formData.chineseTeacherId = this.userId
                    this.classLesson.teacherId = this.userId
                    this.makeUpCountDate.teacherId = this.userId
                    this.foreignTeacherRegionFlag = true
                    this.foreignTeacherGroupFlag = true
                    this.foreignTeacherFlag = true
                    getTeachersByDeptId(11).then((res) => {  //中教
                        this.foreignTeachersData = res.data.data
                        console.log(this.foreignTeachersData)
                    //this.initChineseSelectOPtions();
                        this.foreignTeachersData.child.forEach((groupparent) => {//中教大区
                            groupparent.child.forEach(item => {// 中教组
                                item.users.forEach(group => { // 组员/ 组长
                                    if(group.userId == this.userId) {
                                        this.daquId = groupparent.id
                                        this.teamId = item.name
                                        console.log(this.daquId)
                                        console.log('找到对应的人')
                                        this.makeUpCountDate.regionId = groupparent.id
                                        this.makeUpCountDate.groupId = item.id
                                        this.classLesson.regionId =   groupparent.id
                                        this.classLesson.groupId =   item.id
                                        this.getlist()
                                        this.getMakeUpCount()
                                    }
                                })
                            })
                        })

                    })


                }
                if (roleId == 24 ) { //外教组长
                this.propid = 24
                this.chteacherType = false
                    this.teacherType = 1;
                    this.$i18n.locale = 'en'
                    this.$store.dispatch('setLanguage', 'en')
                    //this.formData.chineseTeacherId = this.userId
                    this.foreignTeacherRegionFlag = true
                    this.foreignTeacherGroupFlag = true
                    this.foreignTeacherFlag = false
                    getTeachersByDeptId(11).then((res) => {  //中教
                    this.foreignTeachersData = res.data.data
                    console.log(this.foreignTeachersData)
                    //this.initChineseSelectOPtions();
                    this.foreignTeachersData.child.forEach((groupparent) => {//中教大区
                        groupparent.child.forEach(item => {// 中教组
                            item.users.forEach(group => { // 组员/ 组长
                                if(group.userId == this.userId) {
                                    this.daquId = groupparent.id
                                    this.teamId = item.name
                                    console.log(this.daquId)
                                    console.log('找到对应的人')
                                    this.teachersArray = item.users
                                    console.log( this.teachersArray)
                                    this.makeUpCountDate.regionId = groupparent.id
                                    this.makeUpCountDate.groupId = item.id
                                    this.classLesson.regionId =   groupparent.id
                                    this.classLesson.groupId =   item.id
                                    this.getlist()
                                    this.getMakeUpCount()
                                }
                            })
                        })
                    })

                    })

                }

                if(roleId == 22){ //中教经理
                this.propid = 22
                    this.fteacherType = false,
                    this.teacherType = 0;
                    this.$i18n.locale = 'zh'
                    this.$store.dispatch('setLanguage', 'zh')
                    this.formData.chineseTeacherId = this.userId
                    this.chineseTeacherRegionFlag = true
                    this.chineseTeacherGroupFlag = false
                    this.chineseTeacherFlag = false

                    getTeachersByDeptId(2).then((res) => {  //中教
                            this.chineseTeachersData = res.data.data
                            console.log(this.chineseTeachersData)
                        //this.initChineseSelectOPtions();
                            this.chineseTeachersData.child.forEach((groupparent) => {//中教大区
                                groupparent.users.forEach(item => {// 中教组
                                    if(item.userId == this.userId) {
                                            this.daquId = groupparent.id
                                            this.teamArray = groupparent.child
                                            console.log(this.daquId)
                                            console.log('找到对应的人')
                                            this.makeUpCountDate.regionId = groupparent.id
                                            this.classLesson.regionId = groupparent.id
                                            this.getlist()
                                            this.getMakeUpCount()
                                        }
                                })
                            })
                        console.log(this.classLesson)
                    })
                }
                if(roleId == 25){ //外教大区经理
                this.propid = 25
                this.chteacherType = false
                    this.teacherType = 0;
                    this.$i18n.locale = 'en'
                    this.$store.dispatch('setLanguage', 'en')
                    this.formData.chineseTeacherId = this.userId
                    this.foreignTeacherRegionFlag = true
                    this.foreignTeacherGroupFlag = false
                    this.foreignTeacherFlag = false

                    getTeachersByDeptId(11).then((res) => {  //外教大区经理
                            this.foreignTeachersData = res.data.data
                            console.log(this.chineseTeachersData)
                        //this.initChineseSelectOPtions();
                            this.foreignTeachersData.child.forEach((groupparent) => {//外教大区
                                groupparent.users.forEach(item => {// 外教大区
                                console.log(groupparent)
                                    if(item.userId == this.userId) {

                                            this.daquId = groupparent.id
                                            this.teamArray = groupparent.child
                                            console.log('找到对应的人')                                        
                                            console.log(this.daquId)
                                            this.makeUpCountDate.regionId = groupparent.id
                                            this.classLesson.regionId = groupparent.id
                                            this.getlist()
                                            this.getMakeUpCount()
                                        }
                                })
                            })
                        console.log(this.classLesson)
                        })
                    }
                    if(roleId == 31 || roleId == 27){ //中教经理
                        if(roleId == 31){
                            this.propid = 31
                            this.$i18n.locale = 'zh'
                            this.$store.dispatch('setLanguage', 'zh')
                        }
                        if(roleId == 27){
                            this.propid = 27
                            this.$i18n.locale = 'en'
                            this.$store.dispatch('setLanguage', 'en')
                        }
                        this.fteacherType = false
                        this.teacherType = 0;
                        this.aomType = 1

                        this.formData.chineseTeacherId = this.userId
                        this.chineseTeacherRegionFlag = false
                        this.chineseTeacherGroupFlag = false
                        this.chineseTeacherFlag = false
                        console.log('AOM')
                        getTeachersByDeptId(2).then((res) => {
                            var a = [];
                            a.push(res.data.data);
                            this.bumenArray = a;
                            this.daquArray = res.data.data.child;
                            this.chineseTeachersData = res.data.data
                            console.log(this.daquArray)
                            //this.changeDaqu();
                            this.bumenId = 2;
                        });
                        this.getlist()
                        this.getMakeUpCount()
                    }
                    if(roleId == 32 || roleId == 27){ //外教总经理 && 教务
                        if(roleId == 32){
                                this.propid = 32

                            }
                            if(roleId == 27){
                                this.propid = 27

                            }
                        this.fteacherType = false
                        this.chteacherType = false
                        this.teacherType = 1;
                        this.aomType = 1
                        this.$i18n.locale = 'en'
                        this.$store.dispatch('setLanguage', 'en')
                        this.formData.chineseTeacherId = this.userId
                        this.foreignTeacherRegionFlag = false
                        this.foreignTeacherGroupFlag = false
                        this.foreignTeacherFlag = false
                        console.log('AOM')
                        getTeachersByDeptId(11).then((res) => {
                            var a = [];
                            a.push(res.data.data);
                            this.bumenArray = a;
                            this.daquArray = res.data.data.child;
                            this.foreignTeachersData = res.data.data
                            console.log(this.daquArray)
                            //this.changeDaqu();
                            this.bumenId = 11;
                        });
                        this.getlist()
                        this.getMakeUpCount()
                    }

                }


        },
        computed: {
        ...mapGetters(['grade', 'schedulePoint', 'roleIds', 'userId','regionId','detailPhone', 'detailType','permissions']),

        },
        created() {
            this.totallist()
            if (!this.$i18n.getLocaleMessage('en')[viewName]) {
                this.$i18n.mergeLocaleMessage('en', local.en)
                this.$i18n.mergeLocaleMessage('zh', local.zh)
            }
            let [roleId] = this.roleIds;
            if (roleId == 23 || roleId == 24 || roleId == 25 || roleId == 32 || roleId == 27) {
                this.$i18n.locale = 'zh'
                this.$store.dispatch('setLanguage', 'zh')
                this.isEnglish = true;
            } else {
                this.$i18n.locale = 'en'
                this.$store.dispatch('setLanguage', 'en')
                this.isEnglish = true;
            }
        },
        watch: {

         }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';

  .main-box{
      color: #606266;
      .title-box{
          display: flex;
        font-size: 18px;

        height: 60px;
        
        //border: 1px solid #ccc;
        padding-left: 20px;
        justify-content: space-between;
        align-items: center;
      }
      .search-box{

          margin: 20px;
          span{
              display: inline-block;
              width:180px;
              margin-right: 10px;
          }
          .block{
              display: inline-block;
          }
          p{
              display: inline;
          }
          .search-btn{
              float: right;
              margin-right: 5px;
          }

      }

      .table-box{
          margin:0 20px;
          .students{
            list-style: none;
            padding-left: 0;
            margin: 0 auto;
            li{
                display: flex;
                width: 100%;
                justify-content: space-around;
                border: 1px solid #ebeef5;
                border-top: none;
                span{
                    display: inline-block;
                    height: 38px;
                    line-height: 38px;
                    button{
                        width: 98px;
                    }
                }
                span:first-child{
                    border-right: 1px solid #ebeef5;
                    width: 60%;
                }
            }
            li:nth-child(1){
                border-top:1px solid #ebeef5;
            }

        }
      }
      .pages-box{
          display: flex;
          justify-content: center;
          margin: 20px;
      }
  }
    .search-btn{
        float: right;                   
        margin-right: 5px;
    }
    .tip2{
        margin-left: 20px;
    }
    .selectBox{
        margin: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #f9fafc;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px 10px;
            
        .flex-box{
            
        }
    }
  .btn-make{
    margin-right: 20px;
      span{
          display: inline-block;
          width: 108px;
            height: 35px;
            background-color: #69c242;
            border-radius: 3px;
            text-align: center;
            line-height: 35px;
            color: #ffffff;
      }
  }

  .ctselect{
        display: flex;
        align-items: center;
        span{
            font-size: 13px;
        }
    }

    .margin-top20{
        margin-top: 10px;
    }
</style>
