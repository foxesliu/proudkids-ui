<template>
  <div class="classing" ref="classingContainer">
    <el-header>
      <h1>当前所在的班级</h1>
    </el-header>
    <el-container>
      <el-table :key='tableKey' :data="classListDataing" v-loading="listLoading" element-loading-text="正在加载中" border fit
                style="width: 100%">
        <el-table-column align="center" label="课程类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.name || '/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="加入班级时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.joinClassTime | filterTime}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="剩余课时" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.restlength || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="中教老师" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.chineseTeacherName || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="外教老师" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.foreignTeacherName || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级类型名称" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.classTypeName || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="上课时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.classTime || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级开始日期" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.startTime | filterTime}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级结束日期" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.endTime | filterTime}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="每周上课时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.weekPointDesc || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级人数" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.currentNumber}}/{{scope.row.classNumber}}
          </span>
          </template>
        </el-table-column>
        <!--<el-table-column align="center" label="班级情况" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
            <!--<el-button size="mini" @click="checkDetail(scope)">查看</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->

      </el-table>
    </el-container>
    <el-footer>
      <h1>曾经待过的班级</h1>
    </el-footer>
    <el-container>
      <el-table :key='tableKey' :data="classListDated" element-loading-text="正在加载中" border fit
                style="width: 100%">
        <el-table-column align="center" label="课程类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.name || '/'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="加入班级时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.joinClassTime | filterTime}}
          </span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="剩余课时" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.restlength || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="中教老师" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.chineseTeacherName || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="外教老师" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.foreignTeacherName || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级类型名称" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.classTypeName || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="上课时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.classTime || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级开始日期" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.startTime | filterTime}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级结束日期" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.endTime | filterTime}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="每周上课时间" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{scope.row.weekPointDesc || '/'}}
          </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班级人数" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            <!--{{scope.row.currentNum}}/{{scope.row.classNumber}}-->
            /
          </span>
          </template>
        </el-table-column>
        <!--<el-table-column align="center" label="班级情况" show-overflow-tooltip>-->
          <!--<template slot-scope="scope">-->
            <!--<el-button size="mini" @click="checkDetail(scope)">查看</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->

      </el-table>
    </el-container>


  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {ruserClassInfoList} from '@/api/detail' // 查询学生的班级信息
  export default {
    data() {
      return {
//        0 进行中  1已过期
        listLoading: true,
        tableKey: 0,
        isCurrent: 0,//0默认当前班级 1所有班级
        phone: '',
        classListDataing: [],//进行中的班级
        classListDated: [],//曾经呆过的班级
      }
    },
    computed: {
      ...mapGetters(['detailPhone', 'detailType', 'detailInfo', 'detailRuserInfo'])
    },
    created() {
      //获取路由参数
//      this.phone = this.detailPhone || this.$route.query.phone
      if (JSON.parse(sessionStorage.getItem('detailParams'))) {
        this.phone = JSON.parse(sessionStorage.getItem('detailParams'))[0].phone
      } else {
        this.phone = this.$route.query.phone
      }
    },
    mounted() {
//      this.phone = this.$route.query.phone;
      this.getList()
    },
    methods: {
      checkDetail(scope) {
        this.$router.push({
          path: 'classDetail', query: {phone: this.phone, classId: scope.row.classId}
        })

      },
      getList() {
        //          status 1是曾经（已关闭）  0是进行中
        ruserClassInfoList(this.phone, 0).then((res) => {//当前
          this.listLoading = false;
          this.classListDataing = res.data.data
        })

        ruserClassInfoList(this.phone, 1).then((res) => {//曾经呆过
          this.listLoading = false;
          this.classListDated = res.data.data
        })
      }
    },
    filters: {
      filterTime(item) {
        if (item) {
          return item.substring(0, 10);
        }
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .classing {
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #fafafa;
  }

  .el-header, .el-footer {
    background: #ffffff;
    border-radius: 10px 10px 0 0;
    height: 69px !important;
    display: flex;
    align-items: center;
    color: #fd802e;
    font-size: 10px;
  }

  .el-footer {
    margin-top: 20px;
    border-radius: 10px 10px 0 0;
  }
</style>
