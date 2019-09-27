<template>
  <div class="app-container calendar-list-container">
    <el-form :inline="true" :model="formInline">
      <div style="float:left;height:36px;line-height:36px;font-size:20px;">渠道</div>

      <div style="float:right;">
        <el-select
            v-model="channelVal"
            filterable
            clearable
            placeholder="请选择"
            style="width:193px;"
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.channel_id"
              :label="item.name"
              :value="item.channel_id"
            ></el-option>
          </el-select>

        <el-form-item>
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="left"
            unlink-panels
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="注册开始日期"
            end-placeholder="注册结束日期"
            @change="timeRange()"
            :picker-options="pickerOptions2"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="channelData()">查询</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="channelName" label="渠道名称" align="center"></el-table-column>
      <el-table-column prop="a0" label="新例子" align="center"></el-table-column>
      <el-table-column prop="a1" label="旧例子" align="center"></el-table-column>
      <el-table-column prop="a2" label="报废例子" align="center"></el-table-column>
      <el-table-column prop="a3" label="付费排课学生" align="center"></el-table-column>
      <el-table-column prop="a4" label="不续费学生" align="center"></el-table-column>
      <el-table-column label="学生统计页" align="center">
        <template slot-scope="scope">
          <el-button @click="checkTotal(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="学生列表页" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="学生状态页" align="center">
        <template slot-scope="scope">
          <el-button @click="goToStudentStatusPage(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage1"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { channelStatistics, allChannel } from "@/api/channel";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import ElFormItem from "element-ui/packages/form/src/form-item.vue";

export default {
  data() {
    return {
      channelOptions: [], //渠道列表
      channelVal: "",
      loading: true,
      pickerOptions2: {
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
      value6: "",
      value7: "",
      formInline: {},
      tableData: [],
      queryList: {
        type: null,
        userId: null,
        channelId: 0,
        startDate: null,
        endDate: null,
        pages: 1,
        pageSize: 10
      },
      page: {
        currentPage1: 1,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 1
      },
      total: 0
    };
  },
  created() {
    if (this.roles.indexOf("CHANNEL_USER") >= 0) {
      this.queryList.type = 2;
    } else {
      this.queryList.type = 1;
    }
    this.queryList.userId = this.userId;
    if (this.$route.query.channelId) {
      this.queryList.channelId = this.$route.query.channelId;
    }
    this.getAllChannel();
    this.channelData();
  },
  methods: {
    getAllChannel() {
      allChannel().then(res => {
        console.log(res.data);
        this.channelOptions = res.data.result;
      });
    },
    channelData() {
      this.queryList.channelId = this.channelVal || 0;
      console.log(this.queryList);
      channelStatistics(this.queryList).then(response => {
        var data = response.data.result.records;
        console.log(data);
        this.total = response.data.result.total;
        //数据处理
        this.tableData = [];
        data.forEach(item => {
          item.a0 = 0;
          item.a1 = 0;
          item.a2 = 0;
          item.a3 = 0;
          item.a4 = 0;
          if (
            item.billsTypeCollection !== 0 &&
            item.billsTypeCollection !== null
          ) {
            let b = item.billsCountCollection.split(",");
            let c = item.billsTypeCollection.split(",");
            c.forEach((type, index) => {
              switch (type) {
                case "0":
                  item.a0 = b[index];
                  break;
                case "1":
                  item.a1 = b[index];
                  break;
                case "2":
                  item.a2 = b[index];
                  break;
                case "3":
                  item.a3 = b[index];
                  break;
                case "4":
                  item.a4 = b[index];
                  break;
              }
            });
          }
        });
        this.tableData = data;
        this.loading = false;
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryList.pageSize = val;
      this.channelData();
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryList.pages = val;
      this.channelData();
    },

    timeRange() {
      console.log(this.value7);
      this.queryList.startDate = this.value7[0];
      this.queryList.endDate = this.value7[1];
    },

    //查看详情
    checkDetail() {
      this.$router.push({
        path: "channelDetail",
        query: { channelId: channelId }
      });
    },

    checkTotal(row) {
      //console.log(row);
      this.$router.push({
        path: "channelTotal",
        query: { channelId: row.channelId, userId: row.userId }
      });
    },

    //学生列表页
    handleClick(row) {
      console.log(row);
      this.$router.push({
        path: "channelDetail",
        query: {
          channelId: row.channelId,
          accessUrl: row.accessUrl,
          channelName: row.channelName
        }
      });
    },

    //学生状态页
    goToStudentStatusPage(row) {
      console.log(row);
      this.$router.push({
        path: "studentStatus",
        query: { channelId: row.channelId, channelName: row.channelName }
      });
    }
  },
  components: { ElFormItem },
  computed: { ...mapGetters(["roles", "userId"]) }
};
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
@import "../channel";
</style>
