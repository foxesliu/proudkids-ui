<template>
  <div class="search-online-order-container">
    <div class="p-20">
      <v-pagetitle title="在线订单查询"></v-pagetitle>
      <div class="mt-20">
        <div class="pull-left">
          <el-select v-model="query.channelId" placeholder="渠道" style="width:150px;">
            <el-option v-for="item in channelItems" :key="item.channelId"
                       :label="item.name"
                       :value="item.channelId"></el-option>
          </el-select>
          <el-input style="width:150px;" v-model="query.name" placeholder="学生中文名字"></el-input>
          <el-input style="width:150px;" v-model="query.enName" placeholder="学生英文名字"></el-input>
          <el-input style="width:150px;" v-model="query.phone" placeholder="手机号"></el-input>
        </div>
        <div class="pull-right">
          <el-button type="danger" @click="reset()">empty</el-button>
          <el-button type="success" @click="getData()">Search</el-button>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="mt-10">
        <div class="pull-left">
          <el-select v-model="query.goodsId" placeholder="商品名称" style="width:150px;">
            <el-option v-for="item in goodsIds" :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
          <el-select v-model="query.orderStat" placeholder="订单状态" style="width:150px;">
            <el-option key="1" label="已支付" value="1"></el-option>
            <el-option key="0" label="未支付" value="0"></el-option>
            <el-option key="-1" label="支付失败" value="-1"></el-option>
          </el-select>
          <el-select v-model="query.goodsType" placeholder="长短期" style="width:150px;">
            <el-option key="1" label="长期" value="1"></el-option>
            <el-option key="0" label="短期" value="0"></el-option>
          </el-select>
          <el-select v-model="query.isFirst" placeholder="是否首次" style="width:150px;">
            <el-option key="1" label="是" value="1"></el-option>
            <el-option key="0" label="否" value="0"></el-option>
          </el-select>
        </div>
        <div class="pull-right">
          <el-button v-if="query.roleId==27" type="warning" @click="download()">导出在线订单</el-button>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="mt-10">
        <el-date-picker
          v-model="datePickerTime" type="daterange"
          align="right" unlink-panels range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="getChooseTime"
          :picker-options="pickerOptions"
          size="small">
        </el-date-picker>
      </div>
      <!--<div class="mt-10">-->
      <!--<v-teacherchinese @childChooseTeacher="chooseChineseTeacher" ref="child"></v-teacherchinese>-->
      <!--</div>-->
      <div class="mt-10" v-if="query.roleId!=34&&query.roleId!=26&&query.roleId!=27">
        <depth-tree :message="parentMsg"
                    :message1="userId"
                    ref="depthtreeRef"
                    @listenToChildEvent="showMsgFromChild">
        </depth-tree>
      </div>
      <div class="mt-20">
        <el-table :data="list" border style="width: 100%">
          <el-table-column label="负责CC">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <span>{{scope.row.ccName}}</span>
                <div slot="reference" class="name-wrapper">
                  <el-button size="mini">{{scope.row.ccName | getName}}</el-button>
                  <!--<el-tag size="medium">{{scope.row.ccName | getName}}</el-tag>-->
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="channelName" label="例子渠道"></el-table-column>
          <el-table-column prop="ruserName" label="中文名字"></el-table-column>
          <el-table-column prop="enName" label="英文名字"></el-table-column>
          <el-table-column prop="phone" label="绑定手机号"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column label="长短期">
            <template slot-scope="scope">
              <span>{{scope.row.goodsType=='1'?'长期':'短期'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否首次">
            <template slot-scope="scope">
              <span>{{scope.row.isFirst=='1'?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderFee" label="支付金额"></el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <span v-if="scope.row.orderStat=='0'">未支付</span>
              <span v-if="scope.row.orderStat=='1'">已支付</span>
              <span v-if="scope.row.orderStat=='-1'">支付失败</span>
            </template>
          </el-table-column>
          <el-table-column label="订单成交时间">
            <template slot-scope="scope">
              <span>{{scope.row.orderCreateTime|time10}}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单号" width="120">
            <template slot-scope="scope">
              <p class="wxpay" v-if="scope.row.payChannelName=='微信公众号支付'"><b>微信</b><span>{{scope.row.orderSn}}</span>
              </p>
              <p class="wxpay alipay" v-else><b>支付宝</b><span>{{scope.row.orderSn}}</span></p>
            </template>
          </el-table-column>
          <el-table-column label="用户详情页">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="gotoDetail(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination class="mt-20"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="query.page"
                       :page-sizes="[10,20,30, 50]" :page-size="query.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import PageTitle from '../../../aom/components/pagetitle.vue';
  import TeacherChinese from '../../../aom/components/sale.vue';
  import DepthTree from "../../depthTree3/index2.vue";
  import {payOrdersQueryOrder, getChannelByAuthor, payGoodsList} from '../../../../api/sale.js';
  import {mapGetters} from 'vuex'
  import {getAllDepth} from '@/utils/index';
  import {sfTools} from '../../../aom/util.js';

  export default {
    components: {
      'v-pagetitle': PageTitle,
      'v-teacherchinese': TeacherChinese,
      DepthTree: DepthTree
    },
    data() {
      return {
        channelItems: [],
        query: {
          phone: null,
          name: null,
          enName: null,
          channelId: null,
          userId: null,  //渠道负责人Id
          orderStat: null,
          startSelectDate: null,
          endSelectDate: null,
          page: 1,
          pageSize: 10,
          roleId: 0,
          deptId: null, //部门ID
          goodsId: null,
          userIds: null,
          goodsType: null,
          isFirst: null,
        },
        list: [],
        total: 100,
        goodsIds: [],
        datePickerTime: null,
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
        parentMsg: '55555',
        userIdss: null,
        firstJoin: 0
      }
    },
    created() {
      //总经理30 大区19 组长18 组员17
      //渠道管理员26 渠道负责人34 财务28
      this.query.roleId = this.roleIds[0];
      this.query.userId = this.userId;
      //this.query.deptId = this.deptId;
      //console.log('userId:' + this.userId);
      //console.log('deptId:' + this.deptId);
      console.log('roleIds:' + this.roleIds);
      setTimeout(() => {
        if (this.query.roleId === 28) {
          this.query.userIds = null;
        }
        this.getData();
      }, 500);
      getChannelByAuthor(this.query.roleId, this.userId).then((res) => {
        this.channelItems = res.data.data;
        console.log(this.channelItems);
      });
      payGoodsList().then((res) => {
        this.goodsIds = (res.data.data);
      })
    },
    methods: {
      download(){
        let a = `/pay/v1/payOrders/query/order/exportExcel`;
        window.open(a, "_blank");
      },
      getData(){
        console.log(this.query);
        payOrdersQueryOrder(this.query).then((res) => {
          this.list = res.data.data.records;
          this.total = res.data.data.total;
          console.log(this.list);
        });
      },
      reset(){
        this.query = {
          phone: null,
          name: null,
          enName: null,
          channelId: null,
          userId: null,  //渠道负责人Id
          orderStat: null,
          startSelectDate: null,
          endSelectDate: null,
          goodsType: null,
          isFirst: null,
          page: 1,
          pageSize: 10
        };
        this.query.roleId = this.roleIds[0];
        this.query.userId = this.userId;
        this.query.userIds = this.userIdss;
        this.datePickerTime = null;
        this.$refs.depthtreeRef.reset();
        console.log(this.query);
        //return;
        //this.$refs.child.reset();
        setTimeout(() => {
          this.getData();
        }, 500);
      },
      getChooseTime() {
        this.query.startSelectDate = this.datePickerTime[0];
        this.query.endSelectDate = this.datePickerTime[1];
        console.log(this.query);
      },
      chooseChineseTeacher(bumenId, daquId, teamId, teacherId){
        this.query.userIds = teacherId || null;
      },
      handleSizeChange(val) {
        this.query.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.query.page = val;
        this.getData();
      },
      gotoDetail(arg){
        let phone = arg.stuPhone || arg.bindPhone || arg.phone;
        this.$router.push({path: '/detail/user', query: {phone: phone, type: 0}});
      },
      showMsgFromChild: function (data) {
        console.log(data)
        this.query1 = {'userIds': data[0]};
        this.area = getAllDepth(this.depthTree, data[1].name1).name;
        this.group = getAllDepth(this.depthTree, data[1].name2).name;
        this.member = data[1].name3;
        console.log(this.area);
        console.log(this.group);
        console.log('member:' + JSON.stringify(data[0]));
        //this.userIdss = (JSON.stringify(data[0])).replace(/"/img, '') || null;
        //console.log(this.userIdss);
        this.query.userIds = JSON.stringify(data[0]).replace(/"/img, '') || null;
        if (this.firstJoin < 3) {
          this.userIdss = (JSON.stringify(data[0])).replace(/"/img, '') || null;
          this.firstJoin++;
        }
        console.log(11)
      },
    },
    filters: {
      time10: function (a) {
        if (a) {
          return a.substring(0, 19);
        }
      },
      getName: function (a) {
        if (a) {
          //var a = '销售部门-销售一区-销售一组-销售CC(smli--CC)';
          var regex1 = /\((.+?)\)/g;
          return ((a.match(regex1))[0].replace('(', '').replace(')', ''))
        }
      }
    },
    mounted() {
    },
    computed: {
      ...mapGetters(['roleIds', 'deptId', 'userId', 'depthTree'])
    },
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import '../../../aom/index.scss';

  .search-online-order-container {
    .wxpay {
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
    }
  }
</style>
