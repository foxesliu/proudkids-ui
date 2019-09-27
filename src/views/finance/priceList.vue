<template>
    <div class="main-box">
        <div class="title-box">
            <h3>{{title}}</h3>
        </div>
        <div class="addgood-box">
            <p>课程类型设置</p>
            <div class="addbtn">
                <el-button type="primary" size="medium" @click="goToAddPage()">增加商品<i class="el-icon-plus el-icon--right"></i></el-button>
            </div>
            
            
        </div>
        <div class="table-box">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="商品名称"
                width="180"
                align="center">
            </el-table-column>
            <el-table-column
                prop="name"
                label="课程类型"
                width="180"
                align="center">
            </el-table-column>
            <el-table-column
                prop="address"
                label="课程详情"
                align="center">
            </el-table-column>
            <el-table-column
                prop=""
                label="设置"
                width="300"
                align="center">
                 <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="primary" size="small">删除</el-button>
                 </template>
            </el-table-column>
            </el-table>
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
                title:'课程价格',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            goToAddPage(){
                
                this.$router.push({
                    path: '/finance/addGoods',
                   
                })
            },
            // goToAddPage(){
            //     console.log(index);
            //     sessionStorage.setItem('index',JSON.stringify(this.tableData[index])) 
            //     this.$router.push({
            //         path: '/workorder/freebillsdetail',
            //         query: {data:this.tableData[index]}
            //     })
            // }
        },
        computed: {
        ...mapGetters(['userId'])
        },
        created() { 
            
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import './index.scss';
  
  .main-box{
      color: #606266;
      .addgood-box{
          padding:10px 20px;
          font-size: 1.17em;
          display: flex;
          justify-content:space-between;
          align-items: center;
          border-bottom: 1px solid #eeeeee;
          .addbtn{
             
            margin-right: 100px;
          }
      }
      .title-box{

        font-size: 18px;
        color: $color-orange;
        height: 60px;
        
        border: 1px solid #ccc;
        padding-left: 20px;
      }
      
      
      .table-box{
          margin:20px;
      }
      .pages-box{
          margin: 20px;
      }
  }

</style>