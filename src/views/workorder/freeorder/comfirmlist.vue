<template>
    <div class="main-box">
        <div class="title-box">
            <h3>赠费工单>待审核</h3>

        </div>
        
        <div class="table-box">           
            <el-table :data="tableData" border style="width: 100%">
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
                prop="billInfo.billJson.periods"
                label="购买课时" align="center">
                </el-table-column>
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
                
                
                <el-table-column  label="提交时间" align="center">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.createTime | parseTime}}
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
    import { CheckConfirmBill } from "@/api/workorders.js";
    import { mapGetters } from 'vuex'
    import index from 'vue';
    //import { buyBills } from '@/api/workorders.js'
    export default {
        data(){
            return{
                
                //userId:'41',
                billType:'',  //0退课 1赠课 2购课 3停课 4续费
                page:'1',
                limit:'10',
                //分页
                pageSize:[10, 20, 50, 100],
                pageLimit:10,
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
             handleSizeChange(val) {
                this.limit =   String(val)
                
                this.getlist()
                console.log(val);
            },
            handleCurrentChange(val) {
                this.page =   String(val)
               
                this.getlist()
                console.log(`当前页: ${val}`);
            },
            gotoPage(index) {
                console.log(index);
                sessionStorage.setItem('index',JSON.stringify(this.tableData[index])) 
                this.$router.push({
                    path: '/workorder/freedetail',
                    query: {data:this.tableData[index]}
                });
            },
            getlist(){
                //分页查看待审核购课工单
            CheckConfirmBill(this.userId, this.billType, this.page, this.limit)
                .then(res => {
                    //billInfo.billsOrder
                    console.log(res.data.data);
                    this.tableData = res.data.data.records
                    this.totalnum = res.data.data.total
                    for(var i=0;i<this.tableData.length;i++){
                        this.tableData[i].applyUser = this.tableData[i].billInfo.applyUser
                        this.tableData[i].applyUserAll = this.tableData[i].applyUser.slice(10)
                        }
                    console.log(typeof this.totalnum)
                    sessionStorage.setItem('detailParams', JSON.stringify(this.tableData))//存储详细信息   
                    
                    console.log(index)
                })
                .catch(res => {
                    console.log(res);
                });
            }
        },
        computed: {
        ...mapGetters(['userId'])
        },
        created() {
            this.billType = this.$route.query.billType
            console.log(this.billType)            
            this.tableData = JSON.parse(sessionStorage.getItem("detailParams"));
            this.getlist()
            },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../index.scss';
  
  .main-box{
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