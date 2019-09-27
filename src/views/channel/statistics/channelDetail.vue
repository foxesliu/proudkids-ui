<template>
  <div class="app-container calendar-list-container">
    <div>
      <div class="flex-box" style="justify-content: space-between;">
        <div class="channel-box flex-box">
          <div class="item flex-box">
            <span>渠道名称：</span>
            <span>{{channelName}}</span>
          </div>
          <div class="item flex-box">
            <span>跳转网址</span>
            <span >
              <a :href="accessUrl" style="display:flex;justify-content: center;align-items:center;height:100%">
                <el-button type="primary" style="width:130px;">查看</el-button>
              </a>
            </span>
          </div>
        </div>
        <div class="flex-box right-item " v-if="roleIds[0]==26">
            <a href="https://files.proudkids.cn/default/BatchChannel.xlsx" target="_blank" style="margin-right:15px;">
              <el-button  type="danger">模板下载</el-button>
            </a>
            <el-upload
              class="upload-demo"
              :action="'/ruser/v1/ruserChannel/importRuser/channelId?cid='+listQuery.channelId"
              :headers="{'Authorization':'Bearer '+token}"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :on-success="fileSuccessCallback"
            >
              <el-button type="primary">批量导入学生</el-button>
            </el-upload>
          </div>
      </div>

      <div class="search-box flex-box">
        <div class>
          <el-select v-model="billType" style="width:130px;" placeholder="例子类型">
            <el-option label="不选择" value></el-option>
            <el-option label="新例子" value="0"></el-option>
            <el-option label="旧例子" value="1"></el-option>
            <el-option label="报废例子" value="2"></el-option>
            <el-option label="付费排课例子" value="3"></el-option>
            <el-option label="不续费例子" value="4"></el-option>
          </el-select>
          <el-select v-model="flag" style="width:130px;" placeholder="渠道例子类型">
            <el-option label="不选择" value></el-option>
            <el-option label="新" value="1"></el-option>
            <el-option label="旧" value="0"></el-option>
          </el-select>
          <el-select v-model="buyType" style="width:130px;" placeholder="付费类型">
            <el-option label="不选择" value></el-option>
            <el-option label="没有付费" value="-2"></el-option>
            <el-option label="首次付费" value="1"></el-option>
            <el-option label="2次付费" value="2"></el-option>
            <el-option label=">2次付费" value="3"></el-option>
          </el-select>
          <el-select v-model="refundType" style="width:130px;" placeholder="退费类型">
            <el-option label="不选择" value></el-option>
            <el-option label="没有退费" value="-2"></el-option>
            <el-option label="首次退费" value="1"></el-option>
            <el-option label="2次退费" value="2"></el-option>
            <el-option label=">2次退费" value="3"></el-option>
          </el-select>
          <el-input
            v-model="phone"
            style="width:130px;"
            @blur="changePhone"
            @keyup.enter.native="changePhone"
            placeholder="注册手机号"
          ></el-input>
          <el-input
            v-model="enName"
            style="width:130px;"
            @blur="changeEnname"
            @keyup.enter.native="changeEnname"
            placeholder="注册英文名"
          ></el-input>
          <el-input
            v-model="name"
            style="width:130px;"
            @blur="changeName"
            @keyup.enter.native="changeName"
            placeholder="注册中文名"
          ></el-input>
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
        </div>
        <div>
          <el-button type="danger" @click="reset()">Empty</el-button>
          <el-button type="primary" @click="search()">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="channel-list-box">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="{background:'#f9fafc',color:'#96999f'}"
      >
        <el-table-column prop="ccName" label="CC" align="center"></el-table-column>
        <el-table-column label="例子类型" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.billType|billTypeFilter}}</template>
        </el-table-column>
        <el-table-column prop="buyState" label="付费类型" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="refundState" label="退费类型" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="渠道例子类型" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{scope.row.flag|flagFilter}}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="phone" label="注册手机号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="enName" label="注册英语名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="name" label="注册中文名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column
          prop="firstInstallChannel"
          label="首次注册渠道"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column label="更改首次注册渠道" align="center" v-if="roleIds[0]==26">
          <template slot-scope="scope">
            <el-button @click="DialogVisible(scope.row)" type="primary" size="small">更改</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="学生列表页" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
        </el-table-column>-->
        <el-table-column label="详情" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="success" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog
        title="更改首次注册渠道"
        :visible.sync="centerDialogVisible"
        width="331px"
        height="253px"
        center
        style="font-weight:bold;"
      >
        <div style="width:193px;margin:0 auto;">
          <el-select v-model="channelVal" filterable placeholder="请选择" style="width:193px;">
            <el-option
              v-for="item in channelOptions"
              :key="item.channel_id"
              :label="item.name"
              :value="item.channel_id"
            ></el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="centerDialogVisible = false;channelVal=null">取 消</el-button>
          <el-button type="primary" @click="_changeChannel()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
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
import { parseTime } from "@/utils/index";
import { validatePhone } from "@/utils/validate";
import {
  channelDetail,
  ruserChannelQueryStudentList,
  allChannel,
  changeChannel
} from "@/api/channel";
import { arrObjAdd } from "@/utils/index";
import ElCol from "element-ui/packages/col/src/col";
import ElOption from "element-ui/packages/select/src/option";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      channelOptions: [], //渠道列表
      channelVal: "",
      centerDialogVisible: false,
      courseFiles2: [],
      billType: null, //例子类型
      flag: null, //渠道例子类型
      buyType: null, //付费类型
      refundType: null, //退费类型
      phone: null,
      enName: null,
      name: null,
      value7: "",
      queryList: {
        type: null,
        userId: null,
        channelId: 0,
        startDate: null,
        endDate: null,
        pages: 1,
        size: 10
      },
      loading: true,
      listQuery: {
        channelId: null,
        partakeTime: null,
        cnName: null,
        enName: null,
        billType: null,
        isTrack: null,
        page: 1,
        pageSize: 10,
        dataType: null
      },
      formInline: {
        phone: "",
        phoneData: []
      },
      page: {
        currentPage1: 1,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 1
      },
      total: 0,
      tableData: [],
      multipleSelection: [],
      //提醒联系例子
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
      }
    };
  },
  created() {
    this.listQuery.channelId = this.$route.query.channelId;
    this.accessUrl = this.$route.query.accessUrl;
    this.channelName = this.$route.query.channelName;
    console.log(this.listQuery);
    this.getData(this.listQuery.channelId, this.listQuery);
    this.token = getToken();
    this.getAllChannel();
    console.log(this.roleIds[0]);
  },
  methods: {
    handleRemove(file, files) {
      this.courseFiles = files;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },


    getAllChannel() {
      allChannel().then(res => {
        console.log(res.data);
        this.channelOptions = res.data.result;
      });
    },
    DialogVisible(row) {
      console.log(row);
      
      this.centerDialogVisible = true;
      this.ruserId = row.ruserId;
    },
    _changeChannel() {
      changeChannel({
        ruserId: this.ruserId,
        newChannelId: this.channelVal
      }).then(res => {
        console.log(res.data);
        this.centerDialogVisible = false;
        this.getData(this.listQuery.channelId, this.listQuery);
        this.$message({
          message: "修改成功",
          type: "success"
        });
      });
    },
    fileSuccessCallback(e) {
      console.log(e.info);
      this.$message.success(
        "成功导入" +
          e.info.success +
          "条，重复" +
          e.info.repeat +
          "条，其他错误" +
          e.info.other +
          "条。"
      );
    },
    //获取数据
    getData(channelId, query) {
      ruserChannelQueryStudentList(channelId, query).then(response => {
        console.log(response);
        this.tableData = response.data.data.records;
        console.log(this.tableData);
        this.total = response.data.data.total;
        this.loading = false;
      });
    },
    reset() {
      this.billType = null;
      this.flag = null;
      this.buyType = null;
      this.refundType = null;
      this.phone = null;
      this.enName = null;
      this.name = null;
      this.value7 = null;
      this.listQuery.billType = null;
      this.listQuery.flag = null;
      this.listQuery.buyType = null;
      this.listQuery.refundType = null;
      this.listQuery.phone = null;
      this.listQuery.enName = null;
      this.listQuery.name = null;
      this.listQuery.startSelectDate = null;
      this.queryList.endSelectDate = null;
      this.getData(this.listQuery.channelId, this.listQuery);
    },
    search() {
      this.getData(this.listQuery.channelId, this.listQuery);
    },
    changePhone() {
      console.log(this.phone);
      this.listQuery.phone = this.phone;
      // if (this.phone) {
      //   this.getData(this.listQuery.channelId, { phone: this.phone });
      // } else {
      //   this.getData(this.listQuery.channelId);
      // }
    },
    changeName() {
      console.log(this.name);
      this.listQuery.name = this.name;
      // if (this.name) {
      //   this.getData(this.listQuery.channelId, { name: this.name });
      // } else {
      //   this.getData(this.listQuery.channelId);
      // }
    },
    changeEnname() {
      console.log(this.enName);
      this.listQuery.enName = this.enName;
      // if (this.enName) {
      //   this.getData(this.listQuery.channelId, { enName: this.enName });
      // } else {
      //   this.getData(this.listQuery.channelId);
      // }
    },
    timeRange() {
      console.log(this.value7);
      this.queryList.startSelectDate = this.value7[0];
      this.queryList.endSelectDate = this.value7[1];
      // this.getData(this.listQuery.channelId, {
      //   startSelectDate: this.value7[0],
      //   endSelectDate: this.value7[1]
      // });
    },

    pickerOptions1() {},

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.listQuery.pageSize = val;
      this.getData(this.listQuery.channelId, this.listQuery);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.listQuery.page = val;
      this.getData(this.listQuery.channelId, this.listQuery);
    },

    currentPage4() {
      console.log("369s");
    },

    //查看详情
    handleClick(arg) {
      console.log(arg);
      this.$router.push({
        path: "/detail/user",
        query: { phone: arg.phone, type: arg.type }
      });
    },

    //添加电话
    addPhone(e) {
      if (validatePhone(this.formInline.phone)) {
        let data = Object.assign(
          {},
          JSON.parse(
            JSON.stringify({
              id: this.formInline.phoneData.length,
              phone: this.formInline.phone
            })
          )
        );
        //arrObjAdd(this.formInline.phoneData, data, 'phone');
        if (arrObjAdd(this.formInline.phoneData, data)) {
          this.$message.error("手机号码已存在！");
        } else {
          this.formInline.phoneData.push(data);
          this.formInline.phone = "";
        }
        console.log(this.formInline.phoneData);
      } else {
        this.$message.error("手机号码格式不正确！");
      }
      this.phoneFormat(this.formInline.phoneData);
    },

    //删除电话
    deletePhone(index, rows) {
      rows.splice(index, 1);
      console.log(this.formInline.phoneData);
      this.phoneFormat(this.formInline.phoneData);
    },

    //电话汇总
    phoneFormat(arr) {
      if (arr.length < 1) {
        this.listQuery.phone = null;
      } else {
        this.listQuery.phone = "";
        for (let i = 0; i < arr.length; i++) {
          if (i == 0) {
            this.listQuery.phone += arr[i].phone;
          } else {
            this.listQuery.phone += ",";
            this.listQuery.phone += arr[i].phone;
          }
        }
      }
      console.log(this.listQuery.phone);
    },

    onSearch() {
      this.getData();
    },

    handleSelectionChange(val) {
      console.log(val);
    }
  },
  components: { ElCol, ElOption },
  computed: { ...mapGetters(["userId", "roleIds"]) },
  watch: {
    billType: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.getData(this.listQuery.channelId, { billType: newValue });
    },
    flag: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.getData(this.listQuery.channelId, { flag: newValue });
    },
    buyType: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.getData(this.listQuery.channelId, { buyType: newValue });
    },
    refundType: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.getData(this.listQuery.channelId, { refundType: newValue });
    }
  },
  filters: {
    billTypeFilter(a) {
      switch (a) {
        case 0:
          return "新例子";
          break;
        case 1:
          return "旧例子";
          break;
        case 2:
          return "报废例子";
          break;
        case 3:
          return "付费排课例子";
          break;
        case 4:
          return "不续费例子";
          break;
      }
    },
    flagFilter(a) {
      if (a === 0) {
        return "旧";
      } else {
        return "新";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
@import "../../aom/index.scss";

.el-form--inline .el-form-item {
  margin-right: 0;
}

.channel-title-div {
  & > * {
    height: 60px;
    line-height: 60px;
    display: flex;
    border: 1px solid #ebeef5;
    .left {
      width: 100px;
      padding: 0 10px;
      background: #f6f7fa;
    }
    .right {
      padding: 0 10px;
      flex: 1;
    }
  }
}

.el-upload-list--text {
  display: none;
  opacity: 0 !important;
}
.flex-box {
  display: flex;
}
.channel-box {
  height: 66px;
  background-color: #f9fafc;
  text-align: center;
  line-height: 66px;
  flex: 1;
  border: solid 1px #dcdfe6;
  border-right: none;
  .item {
    width: 50%;
    span {
      display: inline-block;
      width: 50%;
      color: #c1c5cd;
      font-size: 20px;
    }
    span:nth-child(2) {
      background: #ffffff;
      color: #606266;
      border-left: solid 1px #dcdfe6;
      border-right: solid 1px #dcdfe6;
    }
  }
  .item3 {
    width: 20%;
  }
}
.search-box {
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  height: 66px;
  width: 100%;
  background-color: #f9fafc;
  border: solid 1px #dcdfe6;
  padding: 0 15px;
}
.right-item{
  width: 274px;
	height: 66px;
  background-color: #ffffff;
	border: solid 1px #dcdfe6;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
</style>
