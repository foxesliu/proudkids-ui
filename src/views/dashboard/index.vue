<template>
  <div class="dashboard-container">
    <div class="home" v-if="showHomeOrPage">
      <div class="top-line">
        <div class="pull-left">
          <i><img :src="avatar"/></i>
          <span class="pull-left ml-10" style="color:#909090;">Welcome</span>
          <span class="pull-left ml-10" style="color:#343434;">{{name}}</span>
        </div>
        <div class="pull-right">
          <div>
            <span class="pull-left" style="color:#909090;font-size:20px;">You have been with Proud Kids for</span>
            <div class="pull-left ml-10">
              <b v-for="item in days" style="margin-right:5px;">{{item}}</b>
            </div>
            <span class="pull-left" style="color:#909090;font-size:20px;">days</span>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="role-box">
        <div class="pull-left role">
          <div class="pull-left">Role:</div>
          <div class="pull-left">{{role}}</div>
        </div>
        <div class="pull-left role time ml-30">
          <div class="pull-left">Last login time:</div>
          <div class="pull-left">{{updateTime}}</div>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="mt-20">
        <div class="pull-left width80">
          <p style="line-height:34px; font-size:18px;">
            <span>It has been</span>
            <span
              style="margin:0 5px;font-size:34px;color:#909090;position:relative; top:6px">{{lastLoginDay}}</span>
            <span>day(s) and</span>
            <span style="margin:0 5px;position:relative; top:6px;font-size:34px;color:#909090;">{{lastLoginHour}}</span>
            <span>hour(s) since you last logged into CE. During this period, the following events need to be handled: </span>
          </p>
        </div>
        <div class="pull-right">
          <el-button class="mt-20" type="success" @click="showHistory">History</el-button>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="list">
        <div class="li i tran-all" v-if="roleId==17||roleId==18||roleId==19">
          <div class="left">●</div>
          <div class="right t-hidden">
            {{sellBillsStatistics.NN}}条新例子，{{sellBillsStatistics.ON}}条旧例子，{{sellBillsStatistics.PN}}条付费例子，{{sellBillsStatistics.DN}}条报废例子，{{sellBillsStatistics.NRBN}}条不续费例子还没有处理。
            <!--//NN 新例子、-->
            <!--//ON 旧例子未跟踪、-->
            <!--//OY 旧例子已跟踪、-->
            <!--//DN 报废例子未跟踪、-->
            <!--//DY 报废例子已跟踪、-->
            <!--//PN 付费排课例子未跟踪、-->
            <!--//PY 付费排课例子已跟踪、-->
            <!--//NRBN 不续费例子未跟踪、-->
            <!--//NRBY 不续费例子已跟踪-->
          </div>
        </div>
        <div class="li i tran-all" v-if="roleId==18||roleId==21||roleId==28||roleId==27">
          <div class="left">●</div>
          <div class="right t-hidden">
            {{countIndexBill.purchaseCount}}个购课工单，{{countIndexBill.refundCount}}个退课工单，{{countIndexBill.suspendCount}}个停课工单，{{countIndexBill.presentCount}}个赠课工单，{{countIndexBill.continuedCount}}个续课工单还没有处理。
          </div>
        </div>

        <div class="li i tran-all" v-if="roleId==27">
          <div class="left">●</div>
          <div class="right t-hidden">
            You have {{count1}} untreated leaving applications.
            <!--您有XXX条需要处理的请假申请-->
          </div>
        </div>

        <div class="li i tran-all" v-if="roleId==20||roleId==23">
          <div class="left">●</div>
          <div class="right t-hidden">You have {{subAndMakeUpClass['sub-total']>1 ?subAndMakeUpClass['sub-total'] + ' sub-classes' : subAndMakeUpClass['sub-total'] + ' sub-class'}}, and {{Number(subAndMakeUpClass['today-sub-total'])>1 ? subAndMakeUpClass['today-sub-total'] + ' sub-classes' : subAndMakeUpClass['today-sub-total'] + ' sub-class'}} for today.
          </div>
        </div>
        <div class="li i tran-all" v-if="roleId==20||roleId==23">
          <div class="left">●</div>
          <div class="right t-hidden">You have
            {{subAndMakeUpClass['makeUp-total']>1 ?subAndMakeUpClass['makeUp-total'] + ' make-up classes' : subAndMakeUpClass['makeUp-total'] + ' make-up class'}}, and
            {{subAndMakeUpClass['today-makeUp-total']>1 ?subAndMakeUpClass['today-makeUp-total'] + ' make-up classes' : subAndMakeUpClass['today-makeUp-total'] + ' make-up class'}} for today.
          </div>
        </div>
        <div class="mt-30"></div>
        <div class="li tran-all" v-for="(item,index) in todayList">
          <div class="left">{{index+1}}</div>
          <div class="right t-hidden">{{JSON.parse(item.content)['detail']}}</div>
        </div>
      </div>
    </div>

    <div class="page" v-if="!showHomeOrPage">
      <div class="pull-right">
        <el-button class="mt-20" style="width:100px;" type="success" @click="showHomeOrPage=true">Back</el-button>
      </div>
      <div class="clearfix"></div>
      <div style="text-align:center;" v-if="allList.length==0"><img src="./images/no.png"/></div>
      <div class="ul">
        <!--<div class="pull-left role time">-->
        <!--<div class="pull-left">Login time:</div>-->
        <!--<div class="pull-left">2018-12-12 12:12:12</div>-->
        <!--</div>-->
        <!--<div class="clearfix"></div>-->
        <div class="list">
          <div class="li tran-all" v-for="(item,index) in allList">
            <div class="left">{{index+1}}</div>
            <div class="right t-hidden">
              <div class="pull-left">
                {{JSON.parse(item.content)['detail']}}
              </div>
              <div class="pull-right">
                {{item.createTime}}
              </div>
            </div>
          </div>
        </div>
        <el-pagination v-if="allList.length>0" background style="text-align:center;margin-top:15px;"
                       layout="prev,pager,next"
                       :page-size="limit"
                       :page-sizes="[10,20,30,50]"
                       :total="total"
                       @size-change="handleSizeChange"
                       @current-change="currentChange">
        </el-pagination>
      </div>
    </div>

  </div>

  <!--<div class="dashboard-container">-->
  <!--<div class="dashboard-text">Welcome</div>-->
  <!--<div class="dashboard-text">User ID：{{name}}</div>-->
  <!--<div class="dashboard-text">Role：<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
  <!--</div>-->
</template>

<script>
  import {mapGetters} from 'vuex'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import {
    getUserInfo,
    countIndexBill,
    mmsMessageLog,
    mmsMessageLogToday,
    sellBillsStatistics,
    subAndMakeUpClass,
    getTeachersByDeptId,
    getTutorApplyHistoryCount
  } from '../../api/aom.js';
  export default {
    data(){
      return {
        showHomeOrPage: true,
        role: '',
        roleId: 0,
        userId: 0,
        deptId: 0,  //部门ID
        avatar: '',
        username: '',
        name: '',
        createTime: '',
        updateTime: '',
        days: [],
        lastLoginDay: 0,
        lastLoginHour: 0,
        countIndexBill: {
          continuedCount: 0,
          presentCount: 0,
          purchaseCount: 0,
          refundCount: 0,
          suspendCount: 0,
        },
        subAndMakeUpClass: {
          "sub-total": 0,
          "today-sub-total": 0,
          "makeUp-total": 0,
          "today-makeUp-total": 0
        },
        sellBillsStatistics: {
          DN: 0,
          DY: 0,
          NN: 0,
          NRBN: 0,
          NRBY: 0,
          ON: 0,
          OY: 0,
          PN: 0,
          PY: 0
        },
        count1:0,
        todayList: [],
        allList: [],
        limit: 10,
        page: 1,
        total: 0
      }
    },
    created(){
      getUserInfo().then((res) => {
        let a = res.data.data;
        console.log(a);
        this.role = a.roles[0];
        this.roleId = a.roleIds[0];
        this.userId = a.sysUser.userId;
        this.avatar = a.sysUser.avatar;
        this.deptId = a.sysUser.deptId;
        this.createTime = a.sysUser.createTime;
        //this.updateTime = a.sysUser.updateTime;
        this.updateTime = a.sysUser.lastLoginTime;
        this.username = a.sysUser.username;
        this.name = a.sysUser.name;
        this.avatar = a.sysUser.avatar;
//        console.log('userId:' + this.userId);
//        console.log('roleId:' + this.roleId);
//        console.log('deptId:' + this.deptId);
        //销售组员 17
        //销售组长 18
        //销售区长 19
        //中教组长 21
        //财务 28
        //教务 27
        //中教组员 20
        //外教组员 23
        let timestamp = new Date().getTime() - new Date(this.createTime).getTime();
        let b = parseInt(timestamp / 1000 / 60 / 60 / 24);
        if (b <= 0) {
          b = '0000';
        } else if (b < 10) {
          b = '000' + b;
        } else if (b < 100) {
          b = '00' + b;
        } else if (b < 1000) {
          b = '0' + b;
        } else if (b > 9999) {
          b = '9999';
        }
        this.days = b.split('');
        let timestamp2 = new Date().getTime() - new Date(this.updateTime).getTime();
        let c = parseInt(timestamp2 / 1000 / 60 / 60);
        this.lastLoginDay = Math.floor(c / 24);
        this.lastLoginHour = (c % 24);
        //console.log(this.lastLoginDay, this.lastLoginHour);
      }).then(() => {
        //销售组员 17
        //销售组长 18
        //销售区长 19
        //中教组长 21
        //财务 28
        //教务 27
        //中教组员 20
        //外教组员 23
        if (this.roleId === 17 || this.roleId === 19) {
          this._sellBillsStatistics(this.userId);
        }
        if (this.roleId === 18) {
          getTeachersByDeptId(1).then((res) => {
            let aList = res.data.data;
            let bList = [];
            let userIdList = [];
            for (let i = 0; i < aList.child.length; i++) {
              for (let j = 0; j < aList.child[i].child.length; j++) {
                bList.push(aList.child[i].child[j]);
              }
            }
            for (let i = 0; i < bList.length; i++) {
              if (bList[i].id === this.deptId) {
                for (let j = 0; j < bList[i]['users'].length; j++) {
                  userIdList.push(bList[i].users[j].userId);
                }
                break;
              }
            }
            userIdList.push(this.userId);
            this._sellBillsStatistics(userIdList.join(','));
          })
        }
        if (this.roleId === 28 || this.roleId === 18 || this.roleId === 21 || this.roleId === 27) {
          this._countIndexBill();
        }
        if(this.roleId===27){
            this._getTutorApplyHistoryCount();
        }
        if (this.roleId === 20 || this.roleId === 23) {
          this._subAndMakeUpClass();
        }
        this._mmsMessageLogToday();
      });
      //console.log(this.roleIds);
    },
    methods: {
      showHistory(){
        this.showHomeOrPage = false;
        this._mmsMessageLog();
      },
      _getTutorApplyHistoryCount(){
        getTutorApplyHistoryCount({stat: 0}).then((res) => {
          this.count1 = res.data;
        });
      },
      _subAndMakeUpClass(){
        subAndMakeUpClass(this.userId).then((res) => {
          let c = res.data.data;
          if (c !== null) {
            this.subAndMakeUpClass = {
              "sub-total": c['sub-total'],
              "today-sub-total": c['today-sub-total'],
              "makeUp-total": c['makeUp-total'],
              "today-makeUp-total": c['today-makeUp-total']
            };
          }
          //console.log(this.subAndMakeUpClass);
        });
      },
      _sellBillsStatistics(userId){
        sellBillsStatistics(userId).then((res) => {
          //sellBillsStatistics('17,18,21,53,59,70').then((res) => {
          let b = res.data.result[0];
          //console.log(b);
          this.sellBillsStatistics = {
            DN: b.DN,
            DY: b.DY,
            NN: b.NN,
            NRBN: b.NRBN,
            NRBY: b.NRBY,
            ON: b.ON,
            OY: b.OY,
            PN: b.PN,
            PY: b.PY
          };
          console.log(this.sellBillsStatistics);
        });
      },
      _mmsMessageLog(){
        mmsMessageLog(this.userId, this.roleId, this.page, this.limit).then((res) => {
          this.allList = res.data.data.records;
          this.total = res.data.data.total;
          console.log(this.allList);
        })
      },
      _mmsMessageLogToday(){
        mmsMessageLogToday(this.userId, this.roleId).then((res) => {
          this.todayList = res.data.data;
          //console.log(this.todayList);
        });
      },
      _countIndexBill(){
        countIndexBill(this.userId).then((res) => {
          let a = res.data.data;
          //console.log(a);
          this.countIndexBill = {
            continuedCount: a.continuedCount,
            presentCount: a.presentCount,
            purchaseCount: a.purchaseCount,
            refundCount: a.refundCount,
            suspendCount: a.suspendCount,
          };
        });
      },
      handleSizeChange(e){
        this.limit = e;
        this._mmsMessageLog();
      },
      currentChange(val) {
        this.page = val;
        this._mmsMessageLog();
      },
    },
    components: {ElButton},
    name: 'dashboard',
    computed: {
      //...mapGetters(['name', 'roles', 'roleIds', 'userId'])
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import '../../views/aom/index.scss';

  .dashboard-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
    /*background: yellow;*/
    padding: 20px;
    position: relative;
    .home {
      .top-line {
        width: 100%;
        height: 66px;
        line-height: 66px;
        background: #f4f4f4;
        position: relative;
        padding-right: 10px;
        margin-top: 40px;
        .pull-left {
          i {
            float: left;
            display: block;
            border-radius: 50%;
            width: 100px;
            height: 100px;
            background: #e0e0e0;
            position: relative;
            top: -17px;
            margin-left: 10px;
            img {
              width: 88px;
              height: 88px;
              border-radius: 50%;
              margin: 6px;
            }
          }
          span {
            font-size: 30px;
          }
        }
        .pull-right {
          div {
            b {
              display: inline-block;
              width: 24px;
              height: 36px;
              line-height: 36px;
              text-align: center;
              background: #69c242;
              color: white;
              font-size: 20px;
            }
          }
        }
      }
    }
    .page {
      width: 100%;
      z-index: 1;
      height: 100%;
      /*overflow-y: auto;*/
      .ul {
        margin-top: 30px;
        &:first-child {
          margin-top: 0;
        }
        .list {
          margin-top: 15px;
        }
      }
    }
    .role {
      .pull-left {
        &:first-child {
          background: #69c242 url("images/icon1.png") no-repeat 5px 6px;
          border-radius: 18px 0 0 18px;
          height: 36px;
          line-height: 36px;
          padding: 0 10px 0 29px;
          color: white;
        }
        &:last-child {
          height: 36px;
          line-height: 36px;
          border: 1px solid #929292;
          padding: 0 30px 0 10px;
          color: #868686;
        }
      }
      &.time {
        .pull-left {
          &:first-child {
            background: #69c242 url("images/icon2.png") no-repeat 3px 6px;
          }
        }
      }
    }
    .list {
      .li {
        width: 100%;
        height: 68px;
        line-height: 68px;
        background: #f8f8f8;
        margin-bottom: 10px;
        display: flex;
        cursor: pointer;
        .left {
          width: 68px;
          background: #449cfc;
          text-align: center;
          color: white;
          font-size: 35px;
        }
        .right {
          flex: 1;
          padding: 0 10px;
          font-size: 16px;
          border: 1px solid #f8f8f8;
          border-left: none;
          height: 68px;
          line-height: 68px;
        }
        &:hover {
          .left {
            box-shadow: 0 0 20px #6bb2ff;
          }
          .right {
            border: 1px solid #ebeef5;
            border-left: none;
          }
        }
        &:active {
          position: relative;
          top: 1px;
          left: 1px;
        }
        &.i{
          .left{
            background:#69c242;
            /*font-size:18px;*/
          }
        }
      }
    }
  }

  .dashboard-text {
    font-size: 30px;
    line-height: 46px;
  }
</style>
