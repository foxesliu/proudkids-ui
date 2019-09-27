<template>
    <div class="main-box">
        <div class="title-box">
            <h3>购课工单>待审核</h3>
        </div>
        <div class="search-box border-bottom">
            <span><el-input v-model="searchIphone" placeholder="手机号(查询)" size="small"></el-input></span>
            <div class="search-btn" ><el-button type="danger" size="small" @click="searchUser">查询</el-button></div>               
        </div>  
        <div class="table-box">           
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                
                label="订单发起人" align="center">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <span>{{ scope.row.applyUserAll }}</span>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.applyUser }}</el-tag>
                        </div>
                    </el-popover>

                </template>
                    
                </el-table-column>
                <!-- <el-table-column
                prop="billInfo.billsOrder.billSn"
                label="工单号" align="center">
                </el-table-column> -->
                <el-table-column
                prop="billInfo.billsOrder.name"
                label="中文名字" align="center">
                </el-table-column>
                <el-table-column
                prop="billInfo.billsOrder.enName"
                label="英文名字" align="center">
                </el-table-column>
                <el-table-column
                prop="billInfo.billsOrder.phone"
                label="绑定手机号" align="center">
                </el-table-column>
                <el-table-column
                prop="billInfo.billsOrder.periods"
                label="购买课时" align="center">
                </el-table-column>
                <el-table-column
                prop="billInfo.billsOrder.courseTypeName"
                label="课程类型" align="center">
                </el-table-column>
                <el-table-column
                prop="billInfo.billsOrder.classType"
                label="班级类型" align="center">
                </el-table-column>
                
                <el-table-column
                prop="billInfo.billsOrder.schedulePoint"
                label="上课时间" align="center">
                </el-table-column>
                <!-- <el-table-column
                prop="billInfo.billsOrder.jsonStr.desc"
                label="每周上课时间" align="center">
                </el-table-column> -->
                <el-table-column
                prop="billInfo.billsOrder.applyTime"
                label="提交时间" align="center" width="100">
                </el-table-column>
                <el-table-column
               
                label="工单详情页" align="center" width="100">
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
    import { CheckConfirmBuyOrder} from "@/api/workorders.js";
    import { mapGetters } from 'vuex'
    import index from 'vue';
    //import { buyBills } from '@/api/workorders.js'
    export default {
        data(){
            return{
                obj:{
                    phone:'',
                },
                searchIphone:'',
                //userId:'41',
                billType:'2',
                page:'1',
                limit:'20',
                //分页
                pageSize:[ 20, 50, 100],
                pageLimit:20,
                totalnum:null, //列表总数
                currentPage4: 1,
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
            searchUser(){
                this.obj.phone = this.searchIphone
                this.getlist()
            },
            handleSizeChange(val) {
                //分页 条数限制
                this.limit =   String(val)
                
                this.getlist()
                console.log(val);
            },
            handleCurrentChange(val) {
                //分页 页面
                this.page =   String(val)
               
                this.getlist()
                console.log(`当前页: ${val}`);
            },
            gotoPage(index) { // 点击进入详情页
                console.log(index);
                sessionStorage.setItem('index',JSON.stringify(this.tableData[index])) 
                this.$router.push({
                    path: '/workorder/orderlistdetail',
                    query: {data:this.tableData[index]}
                });
            },
            getlist(){
                //分页查看待审核购课工单
                CheckConfirmBuyOrder(this.userId, this.billType, this.page, this.limit, this.obj)
                    .then(res => {
                        //billInfo.billsOrder
                        console.log(res.data.data);
                        this.totalnum =res.data.data.total
                        let data = res.data.data.records
                        this.tableData = data
                        
                        console.log(data)
                        console.log(data[0].billInfo.billsOrder)
                        sessionStorage.setItem('detailParams', JSON.stringify(this.tableData))//存储详细信息   
                        for(var i=0;i<data.length;i++){
                            data[i].applyUser = data[i].billInfo.auditList[0].username
                            data[i].applyUserAll = data[i].billInfo.billsOrder.applyUser
                        }
                        console.log(data[0])
                    })
                    .catch(res => {
                        console.log(res);
                    });
            }
        },
        computed: {
        ...mapGetters(['userId']),
        
        },
        created() { 
      
            this.tableData = JSON.parse(sessionStorage.getItem("detailParams"));
           // console.log(this.tableData)
            this.getlist()
            
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