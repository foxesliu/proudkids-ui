<template>
  <div class="app-container calendar-list-container" v-loading="loadingFirst">
    <div class="search-top">
      <el-row class="margin-top padding-10" :gutter="20">
        <el-col :span="2" class="tip-title">
          归属CC
        </el-col>

        <el-col :span="13">
          <depth-tree :message="parentMsg" :message1="userId" v-on:listenToChildEvent="showMsgFromChild">
          </depth-tree>
        </el-col>
        <el-col :span="4" :push="5" align="right">
          <el-button type="primary" @click="reset()" v-if="sale_reset_button">重置</el-button>
          <!--<el-button type="primary" @click="getStatics()">查询</el-button>-->
        </el-col>
      </el-row>
    </div>
    <div class="permission-content">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(item,index) in examples" :key="index" v-loading="loading">
          <div class="example-div">
            <el-row class="align-center example-new">
              {{item.name}}
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12" class="align-center" v-for="(arg, index) in item.content" :key="index">
                <el-button class="permission-button" :class="arg.status==0 ? 'btn-l' : 'btn-r'"
                           @click="exampleCheck(item.type,arg.status)">
                  <b class="font-b">{{arg.num}}</b>个
                </el-button>
              </el-col>

            </el-row>
          </div>

        </el-col>

      </el-row>
    </div>

  </div>
</template>
<style>
  .app-container {
    background: #ffffff;
  }

  .search-top {
    width: 100%;

  }

  .padding-10 {
    padding: 10px;
    background: #ffffff;
    border: 2px solid #f6f6f6;
    border-radius: 4px;
  }

  .tip-title {
    font-weight: bold;
    line-height: 2;
    color: #8e8e8e;
    text-align: left;
  }

  .align-center {
    text-align: center;
  }

  .permission-button {
    width: 184px;
    height: 184px;
    color: #ff8636;
    border: none;

  }

  .permission-button span {
    font-size: 36px;
  }

  .permission-button:hover {
    color: #ff8636;
    background-color: #ffffff;
    box-shadow: 0 1px 6px 2px #dcdcdc;
    border: none;
  }

  .btn-l {
    background: url("./images/1.png") #ffffff;
  }

  .btn-r {
    background: url("./images/2.png") #ffffff;
  }

  .font-b {
    font-size: 36px;
  }

  .example-new {
    height: 80px;
    line-height: 80px;
    font-size: 28px;
  }

  .example-div {
    background: #f6f6f6;
    border: 2px solid #f0f0f0;
    border-radius: 8px;
    margin: 32px 0px 0 0px;
    padding: 0 0 18px 0;
  }
</style>
<script>
  //import { deptRoleList, fetchDeptTree } from '@/api/role'
  import {saleStatistics} from '@/api/sale'
  import {fetchDeptTree} from '@/api/role'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  // import { parseTime } from '@/utils'
  import {mapGetters} from 'vuex'
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"
  import depthTree from "../depthTree/index"
  import DepthTree from "../depthTree/index.vue";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      DepthTree,
      ElOption,
      ElRadioGroup
    },
    name: 'table_user',
    directives: {
      waves
    },
    data() {
      return {
        sale_reset_button: false,
        sale_userDo_button: false,
        loadingFirst: true,
        loading: true,
        parentMsg: '55555',
        userId: null,
        query1: {
          'userIds': ''
        },
        treeDeptData: [],
        checkedKeys: [],
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        optionsWithDisabled: [
          //
        ],
        examples: [
          {
            name: '新例子',
            type: 0,
            content: [
              {
                status: 0,
                num: 0
              }
            ]
          },
          {
            name: '旧例子',
            type: 1,
            content: [
              {
                status: 0,
                num: 0
              },
              {
                status: 1,
                num: 0
              }
            ]
          },
          {
            name: '报废例子',
            type: 2,
            content: [
              {
                status: 0,
                num: 0
              },
              {
                status: 1,
                num: 0
              }
            ]
          },
          {
            name: '付费排课学生',
            type: 3,
            content: [
              {
                status: 0,
                num: 0
              },
              {
                status: 1,
                num: 0
              }
            ]
          },
          {
            name: '不续费学生',
            type: 4,
            content: [
              {
                status: 0,
                num: 0
              },
              {
                status: 1,
                num: 0
              }
            ]
          }
        ],
        leftClass: 'btn-l',
        rightClass: 'btn-r'
      }
    },
    computed: {
      ...mapGetters(['depthTree', 'permissions'])
    },
    created() {
//      showMsgFromChild: function (data) {
//        this.$nextTick(()=>{
//          console.log(data)
//          this.query1 = {'userIds': data}
//          this.getStatics()
//        })
//
//
//      },

      this.userId = this.$store.getters.userId
      this.sale_reset_button = this.permissions.sale_reset_button
      this.sale_userDo_button = this.permissions.sale_userDo_button
      console.log(this.permissions.sale_reset_button)
    },
    watch: {},
    mounted(){
//      this.getStatics()
    },
    methods: {
      reset() {
        location.reload()
      },
      //接收子组件
      showMsgFromChild: function (data) {
        this.$nextTick(()=>{
          console.log(data)
          this.query1 = {'userIds': data}
          this.getStatics()
        })


      },
      //查询用户组织树，存store
      getDeptTree() {
        fetchDeptTree()
          .then(response => {
            this.treeDeptData = response.data
            //this.dialogDeptVisible = true
            this.optionsWithDisabled = response.data
          })
      },

      //根据userId查询具体例子统计
      getStatics() {
        setTimeout(()=>{
          if (this.query1.userIds == '') {
            this.$message({
              message: '您选择的部门下还没有人员',
              type: 'warning'
            });
            this.loading = false
            this.loadingFirst = false
          } else {
            saleStatistics(this.query1).then(response => {
              console.log(3333)
              //console.log(response.data.result)
              let data = null
              console.log(response.data.result)
              if (response.data.result) {
                data = response.data.result[0]
              }
              else {
                data = response.data.data[0]
              }

              if (!data.NN && !data.ON && !data.OY && !data.DN && !data.DY && !data.PN && !data.PY && !data.NRBN && !data.NRBY) {
                this.loading = false
                this.loadingFirst = false
                this.$message(response.data.msg)
              } else {
                this.examples[0].content[0].num = data.NN;
                this.examples[1].content[0].num = data.ON;
                this.examples[1].content[1].num = data.OY;
                this.examples[2].content[0].num = data.DN;
                this.examples[2].content[1].num = data.DY;
                this.examples[3].content[0].num = data.PN;
                this.examples[3].content[1].num = data.PY;
                this.examples[4].content[0].num = data.NRBN;
                this.examples[4].content[1].num = data.NRBY;
                this.loading = false
                this.loadingFirst = false
              }
            })
          }
        },500)

      },

      exampleCheck(a, b) {
        /*if(!this.query1.userIds){
          this.query1.userIds = this.userId
        }*/
        if (a == 0) {
          this.$router.push({path: 'salePermissionDo', query: {type: a, status: b, userId: this.query1.userIds}});
        } else if (a == 1) {
          this.$router.push({path: 'salePermissionDo1', query: {type: a, status: b, userId: this.query1.userIds}});
        } else if (a == 2) {
          this.$router.push({path: 'salePermissionDo2', query: {type: a, status: b, userId: this.query1.userIds}});
        } else if (a == 3) {
          this.$router.push({path: 'salePermissionDo3', query: {type: a, status: b, userId: this.query1.userIds}});
        } else if (a == 4) {
          this.$router.push({path: 'salePermissionDo4', query: {type: a, status: b, userId: this.query1.userIds}});
        } else {
          return
        }

      }
    }
  }
</script>
