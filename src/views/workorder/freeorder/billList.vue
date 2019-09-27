<template>
    <div class="main-box">
        <div class="title-box">
            <h3>{{title1}}>{{title}}</h3>
        </div>
        <div class="search-box border-bottom">
            <span><el-input v-model="searchIphone" placeholder="手机号绑定(批量)" size="small" clearable @change="getIphone"></el-input></span>
            
            <span><el-input v-model="searchName" placeholder="中文名字" size="small" clearable></el-input></span>
            <span><el-input v-model="searchEnName" placeholder="英文名字" size="small" clearable></el-input></span>
            <p >工单发起时间：</p>
            <div class="block">
                <el-date-picker
                size="small"
                v-model="searchTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2"
                value-format="yyyy-MM-dd"
                @change="inputTime">
                </el-date-picker>
            </div>
            <div class="search-btn" ><el-button type="danger" size="small"  @click="searchUser">查询</el-button></div>
            
                
                
        </div>  
        <div class="table-box">           
            <el-table :data="tableData" border style="width: 100%">
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
                            {{scope.row.optTime | parseTime }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
               
                label="工单详情页" align="center">
                    <template slot-scope="scope">
                        <el-button @click="gotoPage(scope.$index)" type="text" size="small">详情</el-button>
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
    import { CheckWorkOrder } from "@/api/workorders.js";
    import { mapGetters } from 'vuex'
    //import { buyBills } from '@/api/workorders.js'
    export default {
        data(){
            return{
                title1:'',
                title:'',
                //分页查看工单列表
                searchIphone:null,
                searchName:null,
                searchEnName:null,
                searchStartTime:null,
                searchEndTime:null,
                searchTime:[],
                title1:'',
                title:'',
                //分页查看工单列表
                checkWorkList:{
                    //userId:'41',
                    type:'',
                    stat:'1',
                    name:null,
                    enName:null,
                    phones:null,
                    startTime:null,
                    endTime:null,
                    page:'1',
                    limit:'20',
                    orderByField:null,
                    isAsc:null

                },
                //分页
                pageSize:[ 20, 50, 100],
                pageLimit:20,
                totalnum:null, //列表总数
                currentPage4: 1,
                toBeConfirmNum:'1',
                input: '',
                tableData: [
                    
                ],
                pickerOptions2: {
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
                    value7: ''
                }
        },
        methods: {
            handleSizeChange(val) {
                this.checkWorkList.limit =   String(val)
                
                this.searchUser()
                console.log(val);
            },
            handleCurrentChange(val) {
                this.checkWorkList.page =   String(val)
               
                this.searchUser()
                console.log(`当前页: ${val}`);
            },
            gotoPage(index) {
                console.log(index);
                sessionStorage.setItem('index',JSON.stringify(this.tableData[index])) 
                this.$router.push({
                    path: '/workorder/freebillsdetail',
                    query: {data:this.tableData[index]}
                });
            },
            pagetitle(){
                if(this.checkWorkList.stat == 2){
                    this.title = '流程中'
                }
                if(this.checkWorkList.stat == 3){
                    this.title = '待审核'
                }
                if(this.checkWorkList.stat == -1){
                    this.title = '未通过'
                }
                if(this.checkWorkList.stat == 1){
                    this.title = '已通过'
                }
            },
            inputTime(){
                if(this.searchTime){
                    this.searchStartTime = this.searchTime[0]
                    this.searchEndTime = this.searchTime[1]
                }else{
                    this.searchStartTime = null
                    this.searchEndTime = null
                }
                
                //console.log(typeof(this.searchStartTime))
                //console.log(this.searchEndTime)
            },
            getIphone(){
                if(this.searchIphone){
                    this.checkWorkList.phones = this.searchIphone
                }else{
                    this.checkWorkList.phones =null
                }
            },

            searchUser(){
                //检索学生
                
                this.checkWorkList.name = this.searchName
                this.checkWorkList.enName = this.searchEnName
                this.checkWorkList.startTime = this.searchStartTime
                this.checkWorkList.endTime = this.searchEndTime
                
                
                console.log(this.checkWorkList)
                
                CheckWorkOrder(this.checkWorkList)
                .then(res=>{
                    
                    //console.log(res.data.data)
                    this.totalnum =res.data.data.total
                    sessionStorage.setItem('detailParams', JSON.stringify(this.tableData))//存储详细信息 
                    let data = res.data.data.records
                    //console.log(data)
                    //console.log(data.reverse())
                    this.tableData = data
                    //console.log(this.tableData)
                    for(var i=0;i<data.length;i++){
                        data[i].jsonObj.newDesc = JSON.parse(data[i].jsonObj.jsonStr).desc
                    }                 
                })
                .catch(res=>{
                    console.log(res);
                })
            }

        },
        computed: {
        ...mapGetters(['userId'])
        },
        created() { 
            this.checkWorkList.type = this.$route.query.type
            
            this.title1 = this.$route.query.title
            
            this.checkWorkList.stat = this.$route.query.stat
            this.pagetitle()
            
            this.checkWorkList.userId=this.userId
            this.tableData = JSON.parse(sessionStorage.getItem("detailParams"));
            //分页查看工单列表
            
            this.searchUser()
        },
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
      .search-box{
          height: 60px;
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
          margin:20px;
      }
      .pages-box{
          margin: 20px;
      }
  }

</style>