<template>
  <div class="app-container calendar-list-container">
    <div class="permission-content">
      <el-row :gutter="20">
        <el-col :span="8" class="example-div" v-for="(item,index) in examples" :key="index">
          <el-row class="align-center example-new">
            {{item.name}}
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12" class="align-center" v-for="(arg, index) in item.content" :key="index" v-loading="loading">
              <el-button class="permission-button" :class="arg.status==0 ? 'btn-t' : 'btn-b'" @click="exampleCheck(arg.status)">
                <b class="font-b">{{arg.num}}</b>个
              </el-button>
            </el-col>
          </el-row>
        </el-col>

      </el-row>
    </div>

  </div>

</template>
<script>
  import { checkRemindNum } from '@/api/sale'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  // import { parseTime } from '@/utils'
  import { mapGetters } from 'vuex'
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"

  export default {
    components: {
      ElOption,
      ElRadioGroup
    },
    name: 'table_user',
    directives: {
      waves
    },
    data() {
      return {
        loading: true,
        listQuery0:{
          userId: null,
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        examples: [
          {
            name: '提醒联系的例子',
            content: [
              {
                status: 1,
                num: 0
              },
              {
                status: 0,
                num: 0
              }
            ]
          },
        ]
      }
    },
    computed: {
      ...mapGetters([ 'userId',])

    },
    created() {
      this.listQuery0.userId = this.userId
      this.getRemindNum();
    },
    methods: {
      exampleCheck(a) {
        console.log(a)
        this.$router.push({path:'unStart',query:{type:5, status:a}});//类似post传参
      },
      getRemindNum() {
        console.log(this.listQuery0)
        checkRemindNum(this.listQuery0)
          .then(response => {
            console.log(response.data)
            let data = response.data
            for(let i=0;i<data.length;i++){
              if(data[i].remaindType == 1){
                this.examples[0].content[0].num = data[i].countAction
              }else if(data[i].remaindType == 0){
                this.examples[0].content[1].num = data[i].countAction
              }
            }
            this.loading = false
          })
      }
    }
  }
</script>
<style>

  .app-container{
    background: #ffffff;
  }
  .search-top{
    width: 100%;

  }
  .padding-10{
    padding:10px;
    background: #ffffff;
    border:2px solid #f6f6f6;
    border-radius:4px;
  }
  .tip-title{
    font-weight: bold;
    line-height:2;
    color:#8e8e8e;
  }
  .align-center{
    text-align:center;
  }
  .permission-button{
    width: 184px;
    height:184px;
    color:#ff8636;
    border:none;

  }
  .permission-button span{
    font-size:36px;
  }
  .permission-button:hover{
    color:#ff8636;
    background-color: #ffffff;
    box-shadow:0 1px 6px 2px #dcdcdc;
    border:none;
  }

  .btn-t{
    background: url("./images/prepare-no.png") #ffffff top right no-repeat;
  }
  .btn-b{
    background: url("./images/prepare-gone.png") #ffffff top right no-repeat;
  }
  .font-b{
    font-size:36px;
  }
  .example-new{
    height:80px;
    line-height:80px;
    font-size:28px;
  }
  .example-div{
    background: #f6f6f6;
    border:2px solid #f0f0f0;
    border-radius:8px;
    margin-top:32px;
    padding-bottom:18px;
  }
</style>
