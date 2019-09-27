<template>
  <div class="countTable">
    <el-table :data="countTableData" border style="width: 100%">
      <el-table-column align="center" label="中教课代课总数">
        <template slot-scope="scope">
          <span>{{scope.row.tutorLessonCount || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="中教课代课总人次">
        <template slot-scope="scope">
          <span>{{scope.row.tutorStuNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="出席（出席数/中外总数）">
        <template slot-scope="scope">
          <span>{{scope.row.totalAttendNum || 0}} / {{scope.row.totalStuNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预习（完成数/中外总数）">
        <template slot-scope="scope">
          <span>{{scope.row.totalPerviewNum || 0}} / {{scope.row.totalStuNum || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作业（完成数/中外总数）">
        <template slot-scope="scope">
          <span>{{scope.row.totalHomeWorkNum || 0}} / {{scope.row.totalStuNum || 0}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "filterTable",
  props: ["countTableData", "experience"],
  data() {
    return {
      total: null,
      experienceList: false,
      listQuery: {
        page: 1,
        rows: 10
      }
    };
  },
  created() {
    this.type = this.$route.query.status;
    this.experienceList = this.$route.query.experienceList;
  },
  filters: {
    dealTime(time) {
      return time && time.toString().substring(0, 10);
    },
    dealRuserStatus(val) {
      const config = {
        0: "未出席",
        1: "已出席"
      };
      return config[val];
    }
  },
  methods: {
    add(data) {
      const detailParams = JSON.parse(sessionStorage.getItem("detailParams"));
      const { ruserId } = detailParams[0];
      const { classId, startTime } = data;
      const startDate = startTime.toString().substring(0, 10);
      const periodNum = 1;

      this.$emit("postData", {
        classId,
        startDate,
        ruserId,
        periodNum
      });
    },
    gotoDetail(phone) {
      this.$router.push({ path: "/detail/classing", query: { phone } });
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/less" scoped>
.countTable {
  margin-bottom: 20px;
}

.el-table {
  width: 100%;

  .green {
    color: #67c23a;
  }

  .red {
    color: #ff5647;
  }
}
</style>
