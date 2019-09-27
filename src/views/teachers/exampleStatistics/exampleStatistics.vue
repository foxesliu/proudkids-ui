<template>
  <div class="exampleStatistics">
    <div class="header">
      <span class="ml20 mr30">查找中教：</span>
      <el-select v-model="paramsData.area" clearable placeholder="请选择" @change="getGroup">
        <el-option
          v-for="item in areaList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="paramsData.group" clearable placeholder="请选择" @change="getMembers">
        <el-option
          v-for="item in groupList"
          :key="item.value"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="paramsData.member" clearable placeholder="请选择">
        <el-option
          v-for="item in memberList"
          :key="item.value"
          :label="item.username"
          :value="item.userId">
        </el-option>
      </el-select>
      <el-button @click="getQueryList">查询</el-button>
    </div>
    <div class="main">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(example,index) in examples" :key="index">
          <div class="example-div">
            <p class="fs26">{{example.name}}</p>
            <div>
              <template v-for="item in example.content">
                <el-button class="permission-button" :class="item.status>0?'btn-r':'btn-l'" @click="goToPayedExample(item.status)">
                  <b class="fs26">{{item.num}}</b><span class="fs20">个</span>
                </el-button>
              </template>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  //  import {mapGetters} from 'vuex'
  //  import {ruserDetail} from '@/api/detail' // 編輯學生
//  exampleStatistics
  export default {
    data() {
//      {"msg":"success","code":0,"data":[[{"id":7,"parentId":2,"children":[],"name":"中教一区","userId":0,"username":null,"users":[],"child":[{"id":26,"parentId":7,"children":[],"name":"中教一组","userId":0,"username":null,"users":[{"id":0,"parentId":0,"children":[],"name":null,"userId":44,"username":"ct001","users":null,"child":null},{"id":0,"parentId":0,"children":[],"name":null,"userId":52,"username":"teacher02","users":null,"child":null},{"id":0,"parentId":0,"children":[],"name":null,"userId":56,"username":"teacher03","users":null,"child":null}],"child":null},{"id":31,"parentId":7,"children":[],"name":"中教二组","userId":0,"username":null,"users":[],"child":null}]}],[{"id":30,"parentId":0,"children":[],"name":"中教二区","userId":0,"username":null,"users":[],"child":null}]]}
//      {"msg":"success","code":0,"data":[[{"id":27,"parentId":11,"children":[],"name":"外教一区","userId":0,"username":null,"users":[],"child":[{"id":28,"parentId":27,"children":[],"name":"外教一组","userId":0,"username":null,"users":[{"id":0,"parentId":0,"children":[],"name":null,"userId":45,"username":"cttl001","users":null,"child":null}],"child":null}]}]]}
      return {
        areaList: [],
        groupList: [],
        memberList: [],
        paramsData:{
          area:'',
          group:'',
          member:''
        },
        data: [{
          "id": 7,
          "parentId": 2,
          "children": [],
          "name": "中教一区",
          "userId": 0,
          "username": null,
          "users": [],
          "child": [{
            "id": 26,
            "parentId": 7,
            "children": [],
            "name": "中教一组",
            "userId": 0,
            "username": null,
            "users": [{
              "id": 0,
              "parentId": 0,
              "children": [],
              "name": null,
              "userId": 44,
              "username": "ct001",
              "users": null,
              "child": null
            }, {
              "id": 0,
              "parentId": 0,
              "children": [],
              "name": null,
              "userId": 52,
              "username": "teacher02",
              "users": null,
              "child": null
            }, {
              "id": 0,
              "parentId": 0,
              "children": [],
              "name": null,
              "userId": 56,
              "username": "teacher03",
              "users": null,
              "child": null
            }],
            "child": null
          }, {
            "id": 31,
            "parentId": 7,
            "children": [],
            "name": "中教二组",
            "userId": 5,
            "username": null,
            "users": [],
            "child": null
          }]
        }, {
          "id": 30,
          "parentId": 0,
          "children": [],
          "name": "中教二区",
          "userId": 0,
          "username": null,
          "users": [],
          "child": null
        }],

        examples:
          [
            {
              name: '付费排课学生',
              content: [
                {
                  status: 1,
                  num: 0
                },
                {
                  status: 0,
                  num: 12
                }
              ]
            },
            {
              name: '不续费学生',
              content: [
                {
                  status: 1,
                  num: 2
                },
                {
                  status: 0,
                  num: 0
                }
              ]
            }
          ]
      }
    },
    created() {
      this.areaList = this.data;
    },
    methods:{
      getGroup() {
        this.paramsData.group = ''
        this.paramsData.member = ''
        this.memberList=''
        let arr = this.areaList.filter((x) => {
          return x.id == this.paramsData.area
        })
        console.log(arr)
        this.groupList = arr[0].child
      },
      getMembers() {
        this.paramsData.member = ''
        let arr = this.groupList.filter((item) => {
          return item.id == this.paramsData.group
        })
        this.memberList = arr[0].users

        console.log(this.yuan)
      },
      getQueryList(){
        console.log(this.paramsData)
      },
      goToPayedExample(status){  //
        console.log(status)

        this.$router.push({path:'payedExample',query:{
          status:status
        }})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../sale/detail/detail.scss';

  .exampleStatistics { //@include调用
    @include detail-container();
    width: 100%;
    height: 100%;
    .header {
      height: 78px;
      line-height: 78px;
      border: 2px solid #f6f6f6;
      background: #ffffff;
      border-radius: 10px;
      margin-bottom: 26px;
    }
    .main {
      display: flex;
      .example-div {
        width: 452px;
        height: 288px;
        background: #f6f6f6;
        border: 2px solid #f0f0f0;
        border-radius: 10px;
        padding: 0 0 0 34px;
        p {
          line-height: 80px;
          text-align: center;
          color: #606060;
        }
      }
      .permission-button {
        width: 184px;
        height: 184px;
        color: #ff8636;
        border: none;

      }
      .btn-l {
        background: url("./images/1.png") #ffffff;
      }

      .btn-r {
        background: url("./images/2.png") #ffffff;
      }

      .permission-button:hover{
        box-shadow: 0 0 10px #dfdfdf;
      }
    }
  }


</style>
