<template>
  <div class="app-container calendar-list-container">
    <el-form :inline="true" :model="formInline">
      <div style="float:left;height:36px;line-height:36px;font-size:20px;">渠道学生统计页</div>
      <div style="float:right;">
        <el-form-item>
          <el-date-picker v-model="value7" type="daterange" align="left"
                          unlink-panels value-format="yyyy-MM-dd" range-separator="-"
                          start-placeholder="注册开始日期"
                          end-placeholder="注册结束日期"
                          @change="timeRange()"
                          :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData()">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="clearfix"></div>
    <div class="o-hidden ull">
      <div class="pull-left width20">
        <div class="top">渠道名称</div>
        <div class="bottom">{{data0.channelName}}</div>
      </div>
      <div class="pull-left width20">
        <div class="top">网址</div>
        <div class="bottom">
          <a :href="data0.accessURL">
            <el-button type="primary" size="mini">查看</el-button>
          </a>
        </div>
      </div>
      <div class="pull-left width20">
        <div class="top">注册数</div>
        <div class="bottom">{{data0.totalTxx}}</div>
      </div>
      <div class="pull-left width20">
        <div class="top">新例子/注册数</div>
        <div class="bottom">{{data0.flags1}}</div>
      </div>
      <div class="pull-left width20">
        <div class="top">旧例子/注册数</div>
        <div class="bottom">{{data0.flags2}}</div>
      </div>
    </div>

    <div class="o-hidden ull mt-30">
      <div class="pull-left width16">
        <div class="top">首次付费排课人数</div>
        <div class="bottom">{{data1.a}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">首次付费排课人次</div>
        <div class="bottom">{{data1.b}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">首次付费排课总额</div>
        <div class="bottom">{{data1.c}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">首次退费人数</div>
        <div class="bottom">{{data2.a}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">首次退费人次</div>
        <div class="bottom">{{data2.b}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">首次退费总额</div>
        <!--<div class="bottom">{{data2.c}}</div>-->
        <div class="bottom">-</div>
      </div>
    </div>

    <div class="o-hidden ull mt-10">
      <div class="pull-left width16">
        <div class="top">2次付费排课人数</div>
        <div class="bottom">{{data3.a}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">2次付费排课人次</div>
        <div class="bottom">{{data3.b}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">2次付费排课总额</div>
        <div class="bottom">{{data3.c}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">2次退费人数</div>
        <div class="bottom">{{data4.a}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">2次退费人次</div>
        <div class="bottom">{{data4.b}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">2次退费总额</div>
        <!--<div class="bottom">{{data4.c}}</div>-->
        <div class="bottom">-</div>
      </div>
    </div>

    <div class="o-hidden ull mt-10">
      <div class="pull-left width16">
        <div class="top">>2次付费排课人数</div>
        <div class="bottom">{{data5.a}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">>2次付费排课人次</div>
        <div class="bottom">{{data5.b}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">>2次付费排课总额</div>
        <div class="bottom">{{data5.c}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">>2次退费人数</div>
        <div class="bottom">{{data6.a}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">>2次退费人次</div>
        <div class="bottom">{{data6.b}}</div>
      </div>
      <div class="pull-left width16">
        <div class="top">>2次退费总额</div>
        <!--<div class="bottom">{{data6.c}}</div>-->
        <div class="bottom">-</div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import {parseTime} from '@/utils/index';
  import {validatePhone} from '@/utils/validate';
  import {channelDetail, qianliaoChannelStatistics, channelStatistics, channelOfBillsCount} from '@/api/channel'
  import {arrObjAdd} from '@/utils/index';
  import ElCol from "element-ui/packages/col/src/col";
  import ElOption from "element-ui/packages/select/src/option"

  export default {
    data() {
      return {
        loading: true,
        listQuery: {
          startSelectDate: null,
          endSelectDate: null,
          channelId: 0,
          userId: 0
        },
        queryList: {
          userId: 0,
          channelId: 0,
          startDate: null,
          endDate: null
        },
        formInline: {
          phone: '',
          phoneData: [],
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
        value7: '',
        //提醒联系例子
        pickerOptions2: {
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
        data0: {
          channelName: '',
          accessURL: '',
          totalTxx: '',
          flags1: '',
          flags2: ''
        },
        data1: {a: 0, b: 0, c: 0},
        data2: {a: 0, b: 0, c: 0},
        data3: {a: 0, b: 0, c: 0},
        data4: {a: 0, b: 0, c: 0},
        data5: {a: 0, b: 0, c: 0},
        data6: {a: 0, b: 0, c: 0},

      }
    },
    created() {
      this.listQuery.channelId = this.$route.query.channelId;
      this.listQuery.userId = this.$route.query.userId;
      this.queryList.channelId = this.$route.query.channelId;
      this.queryList.userId = this.$route.query.userId;
      this.getData();
    },
    methods: {
      timeRange() {
        console.log(this.value7);
        this.listQuery.startSelectDate = this.value7[0];
        this.listQuery.endSelectDate = this.value7[1];
        this.queryList.startDate = this.value7[0];
        this.queryList.endDate = this.value7[1];
        console.log(this.queryList);
      },
      getData(){
        this.channelData();
        this._channelOfBillsCount();
      },
      channelData(){
        qianliaoChannelStatistics(this.listQuery.userId, this.listQuery.channelId, this.listQuery).then((res) => {
          this.data0 = res.data.data;
          this.data0.flags1 = this.data0.txx.split(',')[1];
          this.data0.flags2 = this.data0.txx.split(',')[0];
          //console.log(this.data1);
        })
      },
      _channelOfBillsCount(){
        channelOfBillsCount(this.listQuery.channelId, this.value7[0], this.value7[1]).then((res) => {
          let d = res.data.data;
          console.log(d);
          //第一行->0-1首次退费 2-1首次付费
          //第二行->0-2二次付费 2-2二次退费
          //第三行->0>2大于两次退费 2->2大于两次付费
          if (d[0][0].serzia === '2-1') {
            this.data1.a = d[0][0].peopleCount;
            this.data1.b = d[0][0].peopleNum;
            this.data1.c = d[0][0].fee;
            this.data2.a = d[0][1].peopleCount;
            this.data2.b = d[0][1].peopleNum;
            this.data2.c = d[0][1].fee;
          } else {
            this.data1.a = d[0][1].peopleCount;
            this.data1.b = d[0][1].peopleNum;
            this.data1.c = d[0][1].fee;
            this.data2.a = d[0][0].peopleCount;
            this.data2.b = d[0][0].peopleNum;
            this.data2.c = d[0][0].fee;
          }

          if (d[1][0].serzia === '2-2') {
            this.data3.a = d[1][0].peopleCount;
            this.data3.b = d[1][0].peopleNum;
            this.data3.c = d[1][0].fee;
            this.data4.a = d[1][1].peopleCount;
            this.data4.b = d[1][1].peopleNum;
            this.data4.c = d[1][1].fee;
          } else {
            this.data3.a = d[1][1].peopleCount;
            this.data3.b = d[1][1].peopleNum;
            this.data3.c = d[1][1].fee;
            this.data4.a = d[1][0].peopleCount;
            this.data4.b = d[1][0].peopleNum;
            this.data4.c = d[1][0].fee;
          }

          if(d[2][0].serzia!=='0->2'){
            this.data5.a = d[2][0].peopleCount;
            this.data5.b = d[2][0].peopleNum;
            this.data5.c = d[2][0].fee;
            this.data6.a = d[2][1].peopleCount;
            this.data6.b = d[2][1].peopleNum;
            this.data6.c = d[2][1].fee;
          }else{
            this.data5.a = d[2][1].peopleCount;
            this.data5.b = d[2][1].peopleNum;
            this.data5.c = d[2][1].fee;
            this.data6.a = d[2][0].peopleCount;
            this.data6.b = d[2][0].peopleNum;
            this.data6.c = d[2][0].fee;
          }



        })
      },
      _channelStatistics(){
        channelStatistics(this.queryList).then((res) => {
          console.log(res.data);
        })
      }
    },
    components: {ElCol, ElOption},
    computed: {...mapGetters(['userId'])}
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import "../channel.scss";
  @import "../../aom/index.scss";

  .calendar-list-container {
    .ull {
      & > * {
        border: 1px solid #eceef5;
        &.width20 {
          &:nth-child(5n+1), &:nth-child(5n+2), &:nth-child(5n+3), &:nth-child(5n+4) {
            border-right: 0;
          }
        }
        &.width16 {
          &:nth-child(6n+1), &:nth-child(6n+2), &:nth-child(6n+3), &:nth-child(6n+4), &:nth-child(6n+5) {
            border-right: 0;
          }
        }
        .top {
          height: 44px;
          line-height: 44px;
          text-align: center;
          background: #f2f5fa;
        }
        .bottom {
          height: 48px;
          line-height: 48px;
          text-align: center;
        }
      }
    }
  }
</style>
