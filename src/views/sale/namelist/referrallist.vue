<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <referral-header>转介绍名单</referral-header>
      <el-input
        v-model="phone"
        placeholder="被介绍人手机号"
        class="filter-item"
        style="width: 200px;"
        clearable
      ></el-input>
      <el-input
        v-model="name"
        placeholder="被介绍人中文名字"
        class="filter-item"
        style="width: 200px;"
        clearable
      ></el-input>
      <el-input
        v-model="ename"
        placeholder="被介绍人英文名字"
        class="filter-item"
        style="width: 200px;"
        clearable
      ></el-input>

      <el-select
        v-model="cid"
        placeholder="渠道"
        clearable
        style="vertical-align: middle;margin-bottom:10px;"
      >
        <el-option
          v-for="item in options"
          :key="item.channel_id"
          :label="item.name"
          :value="item.channel_id"
        ></el-option>
      </el-select>

      <el-button class="filter-item" type="danger" @click="handleClear"
        >Empty</el-button
      >
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        @click="handleSearch"
        type="primary"
        >搜索</el-button
      >
    </div>

    <div
      class="filter-dept"
      style="display:flex;align-items: center;
      background: #f9fafc;
      border: 1px solid #dcdfe6;
      border-radius: 4px;padding: 10px 18px 10px 18px;"
    >
      <div class="title" style="marginRight:20px;">归属CC</div>
      <arealink
        :deptId="1"
        :userId="userId"
        :roleId="getRoleId"
        areaName="销售大区"
        groupName="销售组"
        memberName="销售个人"
        :disabledMemberId="17"
        :disabledGroupId="18"
        :disabledAreaId="19"
        ref="arealink"
        @handleParent="handleParent"
      ></arealink>
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 100%;marginTop:20px;"
    >
      <el-table-column align="center" label="归属CC">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="mergeCCParams(scope.row.ccDepartVo)"
            placement="top"
          >
            <el-button size="mini">
              {{ scope.row.ccDepartVo.userName }}
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="渠道">
        <template slot-scope="scope">
          <span>
            {{ scope.row.channelName || "-------" }}
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="被介绍人注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="被介绍人中文名字">
        <template slot-scope="scope">
          <span>{{ scope.row.name || "-------" }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="被介绍人英文名字">
        <template slot-scope="scope">
          <span>{{ scope.row.enName || "-------" }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="被介绍人手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="被介绍人用户详情页">
        <template slot-scope="scope">
          <el-button type="primary" @click="detail(scope)">用户详情</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="转介绍人中文名字">
        <template slot-scope="scope">
          <span>{{ scope.row.introducer.name | filterEmpty }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="转介绍人英文名字">
        <template slot-scope="scope">
          <span>{{ scope.row.introducer.enName | filterEmpty }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="转介绍人手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.introducer.phone | filterEmpty }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="转介绍用户详情页">
        <template slot-scope="scope">
          <el-button type="primary" @click="introducerDetail(scope)"
            >用户详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.pageIndex"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { queryRuserChannel, getAllChannel } from "@/api/sale";
import arealink from "./components/arealink";
import referralHeader from "./components/header";
export default {
  components: {
    referralHeader,
    arealink
  },

  data() {
    return {
      name: "",
      ename: "",
      phone: "",
      cid: "",
      memberId: "",
      listLoading: true,
      listQuery: {
        pageIndex: 1,
        pageSize: 20
      },
      tableKey: 0,
      list: null,
      total: null,
      options: []
    };
  },
  computed: {
    ...mapGetters(["roleIds", "userId", "depthTree"]),
    //获取当前的roleId
    getRoleId() {
      return this.roleIds[0];
    },
    //获取查询参数
    parmas() {
      const { area, group, member } = this.$refs.arealink;
      return {
        name: this.name,
        ename: this.ename,
        phone: this.phone,
        cid: this.cid,
        zoneId: area,
        teamId: group,
        userId: member
      };
    },
    //初始化参数处理
    query() {
      const roleId = this.getRoleId;
      const { area, group, member } = this.$refs.arealink;
      let params = {};
      if (roleId == 17) {
        //组员
        params.userId = member;
      } else if (roleId == 18) {
        //组长
        params.teamId = group;
      } else if (roleId == 19) {
        //大区经理
        params.zoneId = area;
      } else {
        //其他情况
      }
      return params;
    }
  },

  filters: {
    //處理參數爲空報錯情況
    filterEmpty(val) {
      if (!val) {
        return "------";
      } else {
        return val;
      }
    }
  },

  mounted() {
    this.getChannel();
  },
  methods: {
    /**
     * @description empty清除select显示
     */
    clearQuery() {
      const roleId = this.getRoleId;
      if (roleId == 17) {
        //组员
      } else if (roleId == 18) {
        //组长
        this.$refs.arealink.member = "";
      } else if (roleId == 19) {
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
     * @description 对归属cc处理
     */
    mergeCCParams(val) {
      return `${val.teamName}-${val.info}`;
    },
    /**
     * @description 轉介紹人詳情
     */
    introducerDetail(scope) {
      this.$router.push({
        path: "/detail/user",
        query: {
          phone: scope.row.introducer.phone
        }
      });
    },
    /**
     * @description 查看詳情
     */
    detail(scope) {
      this.$router.push({
        path: "/detail/user",
        query: {
          phone: scope.row.phone
        }
      });
    },
    /**
     * @description 监听子组件传过来数据
     */
    handleParent() {
      this.getList(this.query);
    },
    /**
     * @description 清空
     */
    handleClear() {
      const roleId = this.getRoleId;
      this.name = "";
      this.ename = "";
      this.phone = "";
      this.cid = "";
      this.clearQuery();
      this.getList(this.query);
    },
    /**
     * @description 查询
     */
    handleSearch() {
      this.getList(this.parmas);
    },
    /**
     * @description 获取列表数据
     */
    async getList(parmas = {}) {
      const query = {
        ...this.listQuery,
        ...parmas
      };
      const result = await queryRuserChannel(query);
      this.listLoading = false;
      this.total = result.data.total;
      this.list = result.data.records;
    },
    /**
     * @description 获取所有的渠道
     */
    async getChannel() {
      const data = await getAllChannel();
      this.options = data.data.result;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList(this.parmas);
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList(this.parmas);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.referrallist {
  width: 100%;
  height: 100%;
  padding: 18px 18px 0 18px;
  background: #fafafa;
  margin-bottom: 20px;

  .filter-container {
    padding-bottom: 10px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }

  .choose {
    width: 100%;

    display: inline-block;
    box-sizing: border-box;
    margin-top: 15px;
    padding: 10px 18px 10px 18px;
  }
}
</style>



