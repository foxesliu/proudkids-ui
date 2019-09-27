<template>
  <div class="aom-container">
    <div class="p-20">
      <h3>例子情况查询</h3>
      <div class="line o-hidden">
        <div class="pull-left">用户：销售部门-{{obj.zoneName}}-{{obj.teamName}}-{{obj.userName}}</div>
        <div class="pull-right">按照注册时间搜索：{{obj.startDate}} 至 {{obj.endDate}}</div>
      </div>
      <div class="h-80 t-center" v-if="channels.length==0">
        暂无数据
      </div>
      <div v-if="channels.length>0">
        <div class="l mt-20">
          <div class="mb-10">在这段时间内，体验课数据渠道占比：</div>
          <table class="width100 cms-table">
            <tbody>
            <tr>
              <td>查询单个渠道</td>
              <td>渠道名称</td>
              <td>数量</td>
              <td>比例</td>
            </tr>
            <tr v-for="item in channels" :class="radio==item.channelId?'active':''" @click="radio=item.channelId">
              <td>
                <span class="icon"></span>
                <!--<el-radio v-model="radio" :label="item.channelId"></el-radio>-->
              </td>
              <td>{{item.channelName}}</td>
              <td>{{item.num}}</td>
              <td>{{item.rate===0?'-':(item.rate*100).toFixed(2)+'%' }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="l mt-20">
          <div class="mb-10">在这段时间内：</div>
          <table class="width100 cms-table">
            <tbody>
            <tr>
              <td>沟通人数</td>
              <td>沟通人次</td>
              <td>体验课排课率<br>（排课人数/沟通人数）</td>
              <td>付费人数</td>
              <td>付费金额</td>
              <td>付费率<br>（付费人数/排课人数）</td>
            </tr>
            <tr>
              <td>{{info.contactNumber}}</td>
              <td>{{info.contactTimes}}</td>
              <td>
                {{!obj.channelId?'-':(info.contactNumber===0?'-':(((info.assignNumberCH+info.assignNumberEn)/(info.contactNumber))*100).toFixed(2)+'%')}}
              </td>
              <td>{{info.payNumber}}</td>
              <td>{{info.payFee}}</td>
              <td>
                {{!obj.channelId?'-':((info.assignNumberCH+info.assignNumberEn)===0?'-':(((info.payNumber)/(info.assignNumberCH+info.assignNumberEn))*100).toFixed(2)+'%')}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="l mt-20 mb-20">
          <div class="mb-10">体验课统计详情：</div>
          <table class="width100 cms-table">
            <tbody>
            <tr>
              <td>排课人数</td>
              <td>排课人次</td>
              <td>取消次数</td>
              <td>有效排课人次</td>
              <td>取消率<br>（取消次数/排课人次）</td>
              <td>出席次数</td>
              <td>出席率<br>（已出席数/有效排课人次）</td>
            </tr>
            <tr>
              <td>{{!obj.channelId?'-':(info.assignNumberCH+info.assignNumberEn)}}</td>
              <td>{{!obj.channelId?'-':(info.assignTimesCH+info.assignTimesEn)}}</td>
              <td>{{!obj.channelId?'-':(info.cancelTimesCH+info.cancelTimesEn)}}</td>
              <td>{{!obj.channelId?'-':(info.assignTimesCH+info.assignTimesEn-info.cancelTimesCH-info.cancelTimesEn)}}
              </td>
              <td>
                {{!obj.channelId?'-':((info.assignTimesCH+info.assignTimesEn)===0?'-':(((info.cancelTimesCH+info.cancelTimesEn)/(info.assignTimesCH+info.assignTimesEn))*100).toFixed(2)+'%')}}
              </td>
              <td>{{!obj.channelId?'-':(info.attendTimesCH+info.attendTimesEn)}}</td>
              <td>
                {{!obj.channelId?'-':((info.assignTimesCH+info.assignTimesEn-info.cancelTimesCH-info.cancelTimesEn)===0?'-':(((info.attendTimesCH+info.attendTimesEn)/(info.assignTimesCH+info.assignTimesEn-info.cancelTimesCH-info.cancelTimesEn))*100).toFixed(2)+'%')}}
              </td>
            </tr>
            <tr>
              <td>中教课排课人数</td>
              <td>中教课排课人次</td>
              <td>中教课取消次数</td>
              <td>中教课有效排课人次</td>
              <td>中教课取消率</td>
              <td>中教课出席次数</td>
              <td>中教课出席率</td>
            </tr>
            <tr>
              <td>{{info.assignNumberCH}}</td>
              <td>{{info.assignTimesCH}}</td>
              <td>{{info.cancelTimesCH}}</td>
              <td>{{!obj.channelId?'-':(info.assignTimesCH-info.cancelTimesCH)}}</td>
              <td>
                {{!obj.channelId?'-':((info.assignTimesCH)===0?'-':(((info.cancelTimesCH)/(info.assignTimesCH))*100).toFixed(2)+'%')}}
              </td>
              <td>{{info.attendTimesCH}}</td>
              <td>
                {{!obj.channelId?'-':((info.assignTimesCH-info.cancelTimesCH)===0?'-':(((info.attendTimesCH)/(info.assignTimesCH-info.cancelTimesCH))*100).toFixed(2)+'%')}}
              </td>
            </tr>
            <tr>
              <td>外教课排课人数</td>
              <td>外教课排课人次</td>
              <td>外教课取消次数</td>
              <td>外教课有效排课人次</td>
              <td>外教课取消率</td>
              <td>外教课出席次数</td>
              <td>外教课出席率</td>
            </tr>
            <tr>
              <td>{{info.assignNumberEn}}</td>
              <td>{{info.assignTimesEn}}</td>
              <td>{{info.cancelTimesEn}}</td>
              <td>{{!obj.channelId?'-':(info.assignTimesEn-info.cancelTimesEn)}}</td>
              <td>
                {{!obj.channelId?'-':((info.assignTimesEn)===0?'-':(((info.cancelTimesEn)/(info.assignTimesEn))*100).toFixed(2)+'%')}}
              </td>
              <td>{{info.attendTimesEn}}</td>
              <td>
                {{!obj.channelId?'-':((info.assignTimesEn-info.cancelTimesEn)===0?'-':(((info.attendTimesEn)/(info.assignTimesEn-info.cancelTimesEn))*100).toFixed(2)+'%')}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {getActLogsChannels, getActLogsRuserCount} from '../../../api/aom.js';
  export default {
    components: {},
    data(){
      return {
        radio: "1",
        obj: {},
        channels: [],
        info: {}
      }
    },
    computed: {},
    created() {
      //this.radioMethod();
      this.obj = {
        zoneId: this.$route.query.zoneId,
        zoneName: this.$route.query.zoneName,
        teamName: this.$route.query.teamName,
        userName: this.$route.query.userName,
        teamId: this.$route.query.teamId,
        userId: this.$route.query.userId,
        startDate: this.$route.query.startDate,
        endDate: this.$route.query.endDate
      };
      console.log(this.obj);
      getActLogsChannels(this.obj).then((res) => {
        let list = res.data;
        this.channels = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].num > 0) {
            this.channels.push(list[i]);
          }
        }
        if (this.channels[0]) {
          this.radio = this.channels[0].channelId;
          this.obj.channelId = this.channels[0].channelId;
          this._getActLogsRuserCount();
        }
      });

    },
    methods: {
      radioMethod(){
        console.log(this.radio)
      },
      _getActLogsRuserCount(){
        getActLogsRuserCount(this.obj).then((res) => {
          this.info = res.data;
          console.log(this.info);
        })
      }
    },
    watch: {
      radio(){
        console.log(this.radio)
        this.obj.channelId = this.radio;
        this._getActLogsRuserCount();
      }
    }
  }

</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import '../../aom/index.scss';

  .aom-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: white;

    .p-20 {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .line {
      border: 1px solid #e3e6eb;
      background: #f9fafc;
      border-radius: 5px;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
    }
    .l {
      border: 1px solid #e3e6eb;
      border-radius: 5px;
      padding: 20px;
    }
  }

  .cms-table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #e5e5e5;
    border-right: none;
    border-bottom: none;
    border-radius: 5px;
    tr {
      td {
        height: 60px;
        padding: 0 10px;
        border: 1px solid #e5e5e5;
        border-top: none;
        border-left: none;
        text-align: center;
        vertical-align: middle;
      }
      &.active .icon {
        background: url("./active.jpg") no-repeat;
      }
    }
    .icon {
      width: 18px;
      height: 18px;
      display: block;
      background: url("./icon.jpg") no-repeat;
      margin: auto;
    }
  }
</style>
