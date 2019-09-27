<template>
    <div class="main-box">
        <div class="title-box">
            <h3>教务工单详情</h3>
        </div>      
        
        <div class="table-box">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
                <el-table-column prop="roleName" label="用户角色" width="180" align="center"></el-table-column>
                <el-table-column prop="num" label="工单管理大区" align="center"></el-table-column>
                <el-table-column  label="工单详情" align="center">
                    <template slot-scope="scope">
                        <el-button @click="gotoPage(scope.row.username,scope.row.roleName,scope.row.userId)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { UserTypeSearchList } from "@/api/workorders.js";
import PageTitle from "../components/pagetitle.vue";
export default {
  components: {
    "v-pagetitle": PageTitle
  },
  data() {
    return {
      type: "1",
      testData: "课程管理",
      dialogVisible: false,
      addClassName: "",
      phone: "12345566666",
      tableData: [
        {
          username: "",
          roleName: "",
          num: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },

  created() {
    console.log(UserTypeSearchList);
    UserTypeSearchList(this.type)
      .then(res => {
        console.log(res.data.data);
        this.tableData = res.data.data;
        
      })
      .catch(res => {
        console.log(res);
      });
  },
  mounted() {},
  methods: {
    gotoPage(username, roleName, userId) {
      console.log(userId)
      this.$router.push({
        path: "/workorder/educationdetail",
        query: { username: username, roleName: roleName,userId:userId}
        
      });
    }
    // ruserDetailTe(){
    //     ruserDetail(this.phone).then(res=>{
    //         console.log(res)
    //     })
    // }
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
  .table-box {
    margin: 20px;
  }
}
</style>