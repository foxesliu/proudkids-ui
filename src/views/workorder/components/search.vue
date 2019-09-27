<template>
    <div class="search-box border-bottom">
        <span><el-input v-model="searchIphone" placeholder="手机号绑定(批量)" size="small"></el-input></span>
        
        <span><el-input v-model="searchName" placeholder="中文名字" size="small"></el-input></span>
        <span><el-input v-model="searchEnName" placeholder="英文名字" size="small"></el-input></span>
        <p >提交时间搜索</p>
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
        <div class="search-btn" ><el-button type="danger" size="small" @click="searchUser">查询</el-button></div>               
    </div>
</template>

<script>
    import { CheckWorkOrder } from "@/api/workorders.js";
    import { mapGetters } from 'vuex'
    export default {
        data(){
            return{
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
            }
        },
        methods:{
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
                CheckWorkOrder(this.checkWorkList)
                .then(res=>{
                    this.totalnum =res.data.data.total
                    sessionStorage.setItem('detailParams', JSON.stringify(this.tableData))//存储详细信息 
                    let data = res.data.data.records                   
                    this.tableData = data
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
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';
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
</style>