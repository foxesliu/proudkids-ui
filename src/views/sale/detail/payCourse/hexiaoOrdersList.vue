<template>
  <div class="search-online-order-container">
    <div class="p-20">
      <v-pagetitle title="核销订单查询"></v-pagetitle>
      <div class="mt-20">
        <div class="pull-left">
          <el-select
            v-if="roleId !== 34"
            v-model="query.channelId"
            placeholder="渠道"
            style="width:120px;"
          >
            <el-option
              v-for="item in channelItems"
              :key="item.channelId"
              :label="item.name"
              :value="item.channelId"
            ></el-option>
          </el-select>
          <el-input
            style="width:120px;"
            v-model="query.name"
            placeholder="学生中文名字"
          ></el-input>
          <el-input
            style="width:120px;"
            v-model="query.enName"
            placeholder="学生英文名字"
          ></el-input>
          <el-input
            style="width:120px;"
            v-model="query.phones"
            placeholder="手机号"
          ></el-input>
          <el-select
            v-model="query.productName"
            placeholder="商品名称"
            style="width:120px;"
          >
            <el-option
              v-for="item in goodsIds"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <el-select
            v-model="query.type"
            placeholder="订单类型"
            style="width:120px;"
          >
            <el-option key="1" label="手工订单" value="1"></el-option>
            <el-option key="0" label="在线订单" value="0"></el-option>
          </el-select>
          <el-select
            v-model="query.isChecked"
            placeholder="核销状态"
            style="width:120px;"
          >
            <!--0未核销，1已核销-->
            <el-option key="1" label="已核销" value="1"></el-option>
            <el-option key="0" label="未核销" value="0"></el-option>
            <el-option key="2" label="核销失败" value="2"></el-option>
          </el-select>
        </div>
        <div class="pull-right">
          <el-button type="danger" @click="reset()">empty</el-button>
          <el-button type="success" @click="getData()">Search</el-button>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="mt-10">
        <el-date-picker
          v-model="datePickerTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="getChooseTime"
          :picker-options="pickerOptions"
          size="small"
        >
        </el-date-picker>
      </div>
      <div class="mt-10" v-if="roleId != 34 && roleId != 26 && roleId != 28">
        <!--<div class="mt-10">-->
        <depth-tree
          :message="parentMsg"
          :message1="userId"
          ref="depthtreeRef"
          @clickIndex="clickIndex"
          @listenToChildEvent="showMsgFromChild"
        >
        </depth-tree>
      </div>
      <!--<div class="mt-10">-->
      <!--<v-teacherchinese @childChooseTeacher="chooseChineseTeacher"></v-teacherchinese>-->
      <!--</div>-->
      <div class="mt-20">
        <el-table :data="list" border style="width: 100%">
          <!--<el-table-column width="200" prop="oprator" label="负责CC"></el-table-column>-->
          <el-table-column label="负责CC">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <span>{{ scope.row.oprator }}</span>
                <div slot="reference" class="name-wrapper">
                  <el-button size="mini">{{
                    scope.row.oprator | getName
                  }}</el-button>
                  <!--<el-tag size="medium">{{scope.row.oprator | getName}}</el-tag>-->
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="channelName"
            label="例子渠道"
          ></el-table-column>
          <el-table-column prop="name" label="中文名字"></el-table-column>
          <el-table-column prop="enName" label="英文名字"></el-table-column>
          <el-table-column
            width="115"
            prop="phone"
            label="绑定手机号"
          ></el-table-column>
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <span>{{ scope.row.productName || "---" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="money" label="支付金额"></el-table-column>
          <el-table-column label="订单类型">
            <template slot-scope="scope">
              <span>{{ scope.row.type == 1 ? "手工订单" : "在线订单" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="核销状态">
            <template slot-scope="scope">
              <span v-if="scope.row.isChecked == 0">未核销</span>
              <span v-if="scope.row.isChecked == 1">已核销</span>
              <span v-if="scope.row.isChecked == 2">核销失败</span>
            </template>
          </el-table-column>
          <el-table-column
            width="110"
            prop="submitTime"
            label="订单发起时间"
          ></el-table-column>
          <el-table-column
            width="110"
            prop="validTime"
            label="订单核销时间"
          ></el-table-column>
          <el-table-column label="订单号" width="120">
            <template slot-scope="scope">
              <div>
                <div v-if="scope.row.payInfos.length == 1">
                  <div
                    v-for="(iitem, index) in scope.row.payInfos"
                    :key="index"
                  >
                    <div
                      class="wxpay"
                      v-if="iitem.type && iitem.type.indexOf('微信') > -1"
                    >
                      <b>微信</b><span>{{ iitem.orderSn }}</span>
                    </div>
                    <div
                      class="wxpay alipay"
                      v-if="iitem.type && iitem.type.indexOf('支付宝') > -1"
                    >
                      <b>支付宝</b><span>{{ iitem.orderSn }}</span>
                    </div>

                    <div
                      class="wxpay wy"
                      v-if="iitem.type && iitem.type.indexOf('网银') > -1"
                    >
                      <b>网银</b><span>{{ iitem.orderSn }}</span>
                    </div>

                    <div
                      class="wxpay alipay"
                      v-if="iitem.type && iitem.type.indexOf('null') > -1"
                    >
                      <span>{{ iitem.orderSn }}</span>
                    </div>

                    <div v-if="iitem.type == 'null'">
                      <span>{{ iitem.orderSn }}</span>
                    </div>
                  </div>
                </div>
                <div
                  class="wxpay alipay more"
                  v-if="scope.row.payInfos.length > 1"
                  @click="
                    showMorePayList($event, scope.$index, scope.row.payInfos)
                  "
                >
                  <b style="width:100px;">多条支付记录</b>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="用户详情页">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="gotoDetail(scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mt-20" style="padding-bottom:100px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="query.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <div class="div" ref="div" style="display:none;">
        <div class="dl">
          <div class="dt">
            <div class="p1">支付方式</div>
            <div class="p2">支付金额</div>
            <div class="p3">订单号</div>
          </div>
          <div class="dd" v-for="(item, index) in moreOrders" :key="index">
            <div class="p1">{{ item.type }}</div>
            <div class="p2">{{ item.money }}</div>
            <div class="p3">{{ item.orderSn }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../../aom/components/pagetitle.vue";
import TeacherChinese from "../../../aom/components/teacher_chinese.vue";
import DepthTree from "../../depthTree3/index3.vue";
import { getAllDepth } from "@/utils/index";
import { sfTools } from "../../../aom/util.js";
import {
  payOrdersQueryOrder,
  getChannelByAuthor,
  payGoodsList,
  ruserOrdersSelectOrders
} from "../../../../api/sale.js";
import { mapGetters } from "vuex";

export default {
  components: {
    "v-pagetitle": PageTitle,
    "v-teacherchinese": TeacherChinese,
    DepthTree: DepthTree
  },
  data() {
    return {
      parentMsg: "55555",
      moreOrders: [],
      goodsIds: [],
      channelItems: [{ id: 1, name: "name1" }, { id: 2, name: "name2" }],
      query: {
        phones: null,
        name: null,
        startTime: null,
        endTime: null,
        enName: null,
        channelId: null,
        type: null,
        isChecked: null, //核销状态(0未核销，1已核销)
        deptId: null, //部门ID
        userId: null, //销售顾问id
        productName: null, //商品名称
        page: 1,
        rows: 10
      },
      list: [],
      total: 100,
      datePickerTime: null,
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
      }
    };
  },
  created() {
    //总经理30 大区19 组长18 组员17
    //渠道管理员26 渠道负责人34 财务28
    this.roleId = this.roleIds[0];
    //this.query.deptId = this.deptId;
    getChannelByAuthor(this.roleId, this.userId).then(res => {
      this.channelItems = res.data.data;
    });
    payGoodsList().then(res => {
      this.goodsIds = res.data.data;
    });
    setTimeout(() => {
      if (this.roleId == 26 || this.roleId == 28 || this.roleId == 27) {
        this.query.deptId = 1;
        this.query.userId = null;
      } else if (this.roleId == 34) {
        this.query.channelId = sfTools.getCookie("chaaaannelId");
      } else if (this.roleId == 30 || this.roleId == 19 || this.roleId == 18) {
        this.query.deptId = this.deptId;
        this.query.userId = null;
      } else if (this.roleId == 17) {
        this.query.userId = this.userId;
        this.query.deptId = null;
      }
      this.getData();
    }, 500);
  },
  methods: {
    showMorePayList(event, index, array) {
      this.moreOrders = array;
      var toggle = event.currentTarget;
      this.$refs.div.style =
        "left:" +
        (toggle.getBoundingClientRect()["x"] - 340) +
        "px; top:" +
        (toggle.getBoundingClientRect()["y"] + 23) +
        "px;";
      if (!this.list[index]["showMore"]) {
        this.$refs.div.style.display = "block";
        this.list[index]["showMore"] = "show";
        var _this = this;
        window.onscroll = function() {
          _this.$refs.div.style.display = "none";
          _this.list[index]["showMore"] = "";
        };
      } else {
        this.$refs.div.style.display = "none";
        this.list[index]["showMore"] = "";
      }
    },
    getData() {
      ruserOrdersSelectOrders(this.query).then(res => {
        //console.log(res.data.data);
        this.total = res.data.data.total;
        this.list = res.data.data.records;
        //console.log(JSON.parse(this.list[0].payInfo));
        for (let i = 0; i < this.list.length; i++) {
          this.list[i]["payInfos"] = JSON.parse(this.list[i]["payInfo"]);
        }
      });
    },

    getChooseTime() {
      this.query.startTime = this.datePickerTime[0];
      this.query.endTime = this.datePickerTime[1];
    },
    chooseChineseTeacher(bumenId, daquId, teamId, teacherId) {
      this.query.bumenId = bumenId;
      this.query.daquId = daquId;
      this.query.teamId = teamId;
      this.query.teacherId = teacherId;
    },
    handleSizeChange(val) {
      this.query.rows = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.getData();
    },
    showMsgFromChild: function(data) {
      this.abc = data;
      this.query1 = { userIds: data[0] };
      this.area = getAllDepth(this.depthTree, data[1].name1).id;
      this.group = getAllDepth(this.depthTree, data[1].name2).id;
      this.member = data[0];
      //this.userIdss = (JSON.stringify(data[0])).replace(/"/img, '') || null;
      //console.log(this.userIdss);
      //this.query.userIds = JSON.stringify(data[0]).replace(/"/img, '') || null;
      if (this.firstJoin < 3) {
        this.userIdss = JSON.stringify(data[0]).replace(/"/gim, "") || null;
        this.firstJoin++;
      }
      //console.log(data);
    },
    clickIndex(index) {
      setTimeout(() => {
        if (index == 2) {
          this.query.userId = this.member;
          this.query.deptId = null;
        } else if (index == 0) {
          this.query.deptId = this.area;
          this.query.userId = null;
        } else if (index == 1) {
          this.query.userId = null;
          this.query.deptId = this.group;
        }
      }, 200);
    },
    gotoDetail(arg) {
      let phone = arg.stuPhone || arg.bindPhone || arg.phone;
      this.$router.push({
        path: "/detail/user",
        query: { phone: phone, type: 0 }
      });
    },
    reset() {
      this.query = {
        phones: null,
        name: null,
        startTime: null,
        endTime: null,
        enName: null,
        channelId: null,
        type: null,
        status: null, //核销状态(0未核销，1已核销)
        //deptId: null,  //部门ID
        //userId: null,  //销售顾问id
        productName: null, //商品名称
        page: 1,
        rows: 10
      };
      //        this.query.roleId = this.roleIds[0];
      //        this.query.userId = this.userId;
      //        this.query.userIds = this.userIdss;
      this.datePickerTime = null;
      this.$refs.depthtreeRef.reset();
      //this.$refs.child.reset();
      setTimeout(() => {
        //          if (this.roleId == 26 || this.roleId == 34 || this.roleId == 28) {
        //            this.query.deptId = 1;
        //            this.query.userId = null;
        //          } else if (this.roleId == 30 || this.roleId == 19 || this.roleId == 18) {
        //            this.query.deptId = this.deptId;
        //            this.query.userId = null;
        //          } else if (this.roleId == 17) {
        //            this.query.userId = this.userId;
        //            this.query.deptId = null;
        //          }
        if (this.roleId == 26 || this.roleId == 28 || this.roleId == 27) {
          this.query.deptId = 1;
          this.query.userId = null;
        } else if (this.roleId == 34) {
          this.query.channelId = sfTools.getCookie("chaaaannelId");
        } else if (
          this.roleId == 30 ||
          this.roleId == 19 ||
          this.roleId == 18
        ) {
          this.query.deptId = this.deptId;
          this.query.userId = null;
        } else if (this.roleId == 17) {
          this.query.userId = this.userId;
          this.query.deptId = null;
        }
        this.getData();
      }, 500);
    }
  },
  filters: {
    getName: function(a) {
      if (a) {
        //var a = '销售部门-销售一区-销售一组-销售CC(smli--CC)';
        var regex1 = /\((.+?)\)/g;
        return a
          .match(regex1)[0]
          .replace("(", "")
          .replace(")", "");
      }
    }
  },
  computed: {
    ...mapGetters(["roleIds", "deptId", "userId", "depthTree"])
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
@import "../../../aom/index.scss";

.search-online-order-container {
  .wxpay {
    display: block;
    b {
      display: block;
      padding: 0 5px;
      background: #67c23a;
      color: white;
      text-align: center;
      font-size: 12px;
      width: 50px;
      border-radius: 5px;
    }
    span {
      font-size: 12px;
    }
    &.alipay {
      b {
        background: #66b1ff;
      }
    }

    &.wy {
      b {
        background: #ff5a4e;
      }
    }
    &.more {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  .div {
    width: 440px;
    max-height: 200px;
    height: auto;
    overflow-y: auto;
    background: white;
    box-shadow: 0 0 10px #ccc;
    position: fixed;
    z-index: 99999999999999;
    padding: 20px;
    .dl {
      background: white;
      border: 1px solid #f2f4f8;
      width: 100%;
      height: 100%;
      .dt,
      .dd {
        overflow: hidden;
        width: 100%;
        display: flex;
      }
      .dt {
        background: #f9fafc;
      }
      .p1,
      .p2 {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #f2f4f8;
        border-bottom: 1px solid #f2f4f8;
      }
      .p3 {
        height: 40px;
        line-height: 40px;
        text-align: center;
        flex: 1;
        /*width: 180px;*/
        border-bottom: 1px solid #f2f4f8;
      }
    }
  }
}
</style>
