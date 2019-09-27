<template>
    <div class="main-box">
        <div class="title-box">
            <h3>{{title}}</h3>
        </div>      
        <div class="header-box">
            <span>姓名：{{username}}</span>
            <span>用户角色：{{roleName}}</span>
            <span>总数：{{allnum}}个大区</span>
            <span>已管理：{{num}}个大区</span>
        </div>
        <div class="table-box">

            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="deptName" label="工单大区"  align="center"></el-table-column>
               
                <el-table-column label="是否管理" width="300" align="center" >   
                                  
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.isM" :label="radio" 
                        @change.native="_addAuthority(scope)"
                        >是</el-radio>
                        <el-radio v-model="scope.row.isM" :label="radio1" 
                        @change.native="_removeAuthority(scope.row.confId)"
                        >否</el-radio>
                        
                    </template>                  
                </el-table-column>               
            </el-table>
        </div>

    </div>
</template>

<script>
//import { mapGetters } from "vuex";
import { UserIdSearchList,removeAuthority,addAutority} from "@/api/workorders.js";
import PageTitle from "../components/pagetitle.vue";
export default {
  components: {
    "v-pagetitle": PageTitle
  },
  data() {
    return {
      title:'教务工单详情> 详情',
      allnum: "",
      userId: "",
      isM: '',
      id:'',
      radio: 1,
      radio1: 0,
      num:'',
      tableData: [{
          
      }],
      billsAuditConfig:{
        "createTime": "2018-04-20T06:52:04.310Z",
        "creatorId": 0,
        "delFlag": "0",
        "deptId": '',   //必填 大区ID
        "id": 0,       //不必填
        "type": "0", //必填 工单类型：0财务，1教务
        "updateTime": "2018-04-20T06:52:04.310Z",
        "userId": ''   //必填 用户ID,
      }
    };
  },
  // computed: {
  //   ...mapGetters(["deptId"])
  // },
  created() {
    this.username = this.$route.query.username;
    this.roleName = this.$route.query.roleName;
    
    this.userId = this.$route.query.userId;
    console.log();
    UserIdSearchList(this.userId)
      .then(res => {
        console.log(res.data.data);
        console.log(res.data.data.detail.confId)
        this.allnum = res.data.data.all;
        this.num = res.data.data.mn
        this.tableData = res.data.data.detail;
        this.billsAuditConfig.deptId = res.data.data.user.deptId

      })
      .catch(res => {
        console.log(res);
      });
     this.billsAuditConfig.userId = this.$route.query.userId;
     
     
    console.log(this.billsAuditConfig)
    
  },

  methods: {
      _removeAuthority(id){
        
        console.log()
          removeAuthority(id)
        .then(res => {
          console.log('删除成功');
          
        })
        .catch(res => {
          console.log(res);
        });
      },
      _addAuthority(scope){
        this.billsAuditConfig.deptId=scope.row.deptId
        
        addAutority(this.billsAuditConfig)
          
        .then(res => {
          console.log(res.data.data);
          console.log(this.billsAuditConfig)
        })
        .catch(res => {
          console.log(res);
        });
      }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";

.main-box {
  .title-box {
    font-size: 18px;
    color: $color-orange;
    height: 60px;

    border: 1px solid #ccc;
    padding-left: 20px;
  }
  .header-box {
    height: 60px;
    line-height: 60px;
    border: 1px solid #ccc;
    margin: 20px;
    span {
      margin-left: 55px;
    }
  }
  .table-box {
    margin: 20px;
  }
}
</style>
