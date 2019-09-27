<template>
    <div class="main-box">
        <div class="title-box">
            <h3>{{title}}</h3>
        </div>
        <div class="detali-box"> 
            <el-input placeholder="请输入内容" v-model="input3">
                <div slot="prepend"  class="name">商品名称</div>
            </el-input>
            
                <div>
                    <el-select v-model="value4" clearable placeholder="--选择课程类型--" name="abc" >
                       
                    <el-option 
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        align = center>
                        </el-option>
                    </el-select>
                </div>
                
             
            
            
            <el-input placeholder="请输入" v-model="input3">
                <div slot="prepend"  class="name">课程时长</div>
            </el-input>
            <el-input placeholder="请输入" v-model="input3">
                <div slot="prepend"  class="name">输入原价</div>
            </el-input>
            <el-input placeholder="只能填写整数" v-model="input3">
                <div slot="prepend"  class="name">输入折扣</div>
            </el-input>
            <el-input placeholder="请输入" v-model="input3">
                <div slot="prepend"  class="name">输入折扣价格</div>
            </el-input>
        </div>
        <div class="submitbtn">
            <el-button type="primary">确定</el-button>
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
                input3:'',
                value3:'',
                options: [{
                    value: '选项1',
                    label: '长期课程'
                    }, {
                    value: '选项2',
                    label: '短期课程'
                    }, ],
                    value4: ''
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

<style rel="stylesheet/scss" lang="scss" >
  @import './index.scss';
  .el-select{
     text-align: center !important;
  }
  .main-box{
      color: #606266;
      
      .title-box{

        font-size: 18px;
        color: $color-orange;
        height: 60px;
        
        border: 1px solid #ccc;
        padding-left: 20px;
      }
    .detali-box{
        padding: 5px 20px;
        display: flex;
        flex-direction:column;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        .name{
            width: 130px;
            text-align: center;
        }
        .el-input,.el-select{
          margin: 10px 0;
          width: 600px;
            
            }   
        }
  
       .el-input__inner{
           text-align: center
       }
        
    .submitbtn{
        
       display: flex;
       justify-content: center;
        margin-top: 20px;
        .el-button{
            margin: 0 auto;
            width: 100px;

        }

    }
    
      
      
  }

</style>