<template>
  <div class="index" v-loading="listLoading">
    <kpi-header>KPI</kpi-header>
    <div class="filter-container">
      <el-input
        v-model="className"
        placeholder="班级名称"
        class="filter-item"
        style="width: 200px;"
        clearable
      ></el-input>

      <el-date-picker
        v-model="dateTime"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="-"
        :start-placeholder="kpiStartTime"
        :end-placeholder="kpiEndTime"
        value-format="yyyy-MM-dd"
        @change="getDate"
        :picker-options="pickerOptions"
        style="vertical-align: middle;marginBottom:10px"
      >
      </el-date-picker>

      <span class="filter-item">中教：</span>

      <arealink
        :deptId="2"
        :userId="userId"
        :roleId="getRoleId"
        areaName="销售大区"
        groupName="销售组"
        memberName="销售个人"
        :disabledMemberId="20"
        :disabledGroupId="21"
        :disabledAreaId="22"
        ref="arealink"
        class="arealink"
        @handleParent="handleParent"
      ></arealink>

      <el-button class="filter-item" type="danger" @click="handleClear"
        >Empty</el-button
      >
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        @click="handleSearch"
        type="primary"
        >Search</el-button
      >
    </div>

    <!-- <FilterForm
      ref="filterForm"
      :showDeptTree="showDeptTree"
      :numSearchFlag="numSearchFlag"
      @getDeptData="getDeptData"
      @getSearchList="getSearchList"
    ></FilterForm> -->
    <countTable :countTableData="countTableData"></countTable>
    <listTable :listTableData="listTableData"></listTable>
    <div style="margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[20, 50, 100]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { studentAttendCount, studentAttendInfo } from "@/api/teachers";
import countTable from "./components/countTable";
import listTable from "./components/listTable";
import FilterForm from "./components/filterForm";
import kpiHeader from "./components/header.vue";

import arealink from "@/components/arealink";

export default {
  name: "kpi",
  components: {
    countTable,
    listTable,
    FilterForm,
    kpiHeader,
    arealink
  },
  data() {
    return {
      kpiStartTime: "开始日期",
      kpiEndTime: "结束日期",
      startTime: "",
      endTime: "",
      className: "",
      dateTime: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      listLoading: false,
      listQuery: {
        page: 1,
        rows: 20
      },
      tutorId: "",
      total: 0,
      countTableData: [],
      listTableData: [],

      timer: null,
      showDeptTree: true,
      numSearchFlag: true,
      chooseExperienceClass: true,
      searchData: []
    };
  },

  async created() {
    
    const kpiQuery = sessionStorage.getItem("kpiQuery");
    if (!kpiQuery) {
      return;
    }
    const { tutorId, className, page, rows, startTime, endTime } = JSON.parse(
      kpiQuery
    );

    if (!tutorId) {
      return;
    }

    if (tutorId) {
      let query = {
        className,
        startTime,
        page,
        rows,
        endTime,
        tutorId
      };

      this.listQuery.page = page
      this.listQuery.rows = rows

      this.className = className;
      this.startTime = startTime;
      this.endTime = endTime;

      if (startTime) {
        this.kpiStartTime = startTime;
        this.kpiEndTime = endTime;
      }
      this.listLoading = true;
      const count = await studentAttendCount(query);
      const result = await studentAttendInfo(query);
      this.listLoading = false;

      this.countTableData = [count.data];
      this.listTableData = result.data.records;
      this.total = result.data.total;
    }
  },
  computed: {
    ...mapGetters(["depthTree", "permissions", "userId", "roleIds"]),
    //获取当前的roleId
    getRoleId() {
      return this.roleIds[0];
    },

    /**
     * @description 初始化参数处理
     */
    query() {
      const roleId = this.getRoleId;
      const { area, group, member } = this.$refs.arealink;
      let params = {};
      if (roleId == 20) {
        //组员
        params.tutorId = member;
      } else {
        //其他情况
      }
      return params;
    },
    /**
     * @description 获取查询参数
     */
    mergeParams() {
      const { member } = this.$refs.arealink;
      const query = {
        className: this.className,
        startTime: this.startTime,
        endTime: this.endTime,
        ...this.listQuery,
        tutorId: member
      };
      console.log(query)
      //保存查询参数
      sessionStorage.setItem("kpiQuery", JSON.stringify(query));
      return query;
    }
  },
  methods: {
    /**
     * @description 对获取的日期处理
     */
    getDate(dateTime) {
      this.startTime = dateTime[0] || "";
      this.endTime = dateTime[1] || "";
      return {
        startTime: this.startTime,
        endTime: this.endTime
      };
    },
    /**
     * @description empty清除select显示
     */
    clearQuery() {
      const roleId = this.getRoleId;
      if (roleId == 20) {
        //组员
      } else if (roleId == 21) {
        //组长
        this.$refs.arealink.member = "";
      } else if (roleId == 22) {
        //大区经理
        this.$refs.arealink.member = "";
        this.$refs.arealink.group = "";
      } else {
        //其他情况
        this.$refs.arealink.member = "";
        this.$refs.arealink.group = "";
        this.$refs.arealink.area = "";
      }
    },

    /**
     * @description 监听子组件传过来数据
     */
    handleParent() {
      const kpiQuery = sessionStorage.getItem("kpiQuery");
      if (kpiQuery) {
        var { tutorId } = JSON.parse(kpiQuery);
      }

      const { member } = this.$refs.arealink;
      if (!member) {
        this.total = 0;
        this.countTableData = [];
        this.listTableData = [];
        return;
      }
      if (!tutorId) {
        this.getList(this.mergeParams);
      }
    },

    /**
     * @description 清空
     */
    handleClear() {
      const roleId = this.getRoleId;
      this.className = "";
      this.dateTime = "";
      this.clearQuery();
      const { member } = this.$refs.arealink;
      const params = {
        ...this.query,
        ...this.listQuery
      };
      if (!member) {
        this.total = 0;
        this.countTableData = [];
        this.listTableData = [];
        return;
      }
      this.getList(this.query);
    },

    /**
     * @description 查询
     */
    handleSearch() {
      this.getList(this.mergeParams);
    },

    /**
     * @description 获取数据
     */
    async getList(params) {
      const { member } = this.$refs.arealink;
      if (!member) {
        this.$message({
          message: "请选择中教组员",
          type: "error"
        });
        return;
      }
      this.listLoading = true;
      const count = await studentAttendCount(params);
      const result = await studentAttendInfo(params);
      this.listLoading = false;

      this.countTableData = [count.data];
      this.listTableData = result.data.records;
      this.total = result.data.total;
    },
    handleSizeChange(val) {
      this.listQuery.rows = val;
      this.getList(this.mergeParams);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList(this.mergeParams);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  padding: 18px 18px 0 18px;
  background: #fafafa;
  margin-bottom: 20px;
  .filter-container {
    height: 57px;
    background-color: #f9fafc;
    border-radius: 4px;
    border: solid 1px #dcdfe6;
    padding: 10px 10px 0 10px;
    margin-bottom: 20px;
    .filter-item,
    .arealink {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
}
</style>
