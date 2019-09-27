<template>
  <div class="aom-container">
    <div class="p-20">
      <div class="flex-box header">
        <div class="name">{{name}} ({{area}} - {{group}})</div>
        <div class="flex-box">
          <el-button
            type="success"
            size="small"
            style="height:36px;width:180px;"
            class="mr"
            @click="gotoApplyment()"
          >Holiday Applyment</el-button>
          <el-button
            type="primary"
            size="small"
            style="height:36px;width:90px;"
            class="mr"
            @click="gotoHistory()"
          >History</el-button>
          <div style="margin-left:10px;">
            <template>
              <div class="block">
                <el-date-picker
                  v-model="dateValue"
                  type="date"
                  placeholder="Select Date"
                  @change="search()"
                ></el-date-picker>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="o-hidden aom-usable">
        <div class="dl">
          <div class="dt t-center">Sun</div>
          <div class="o-hidden">
            <ul class="flex-box">
              <li v-for="(item,index) in list7" :key="index">
                <p>
                  <span>{{item.startTime}}</span>-
                  <span>{{item.endTime}}</span>
                </p>
                <p
                  :class="item.isAssignedClass==false?'green':'red'"
                  v-if="item.stat == 1"
                >{{item.status}}</p>
                <p
                  :class="item.isAssignedClass==false?'blue':'blue'"
                  v-if="item.stat == 0"
                >{{item.status}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="dl">
          <div class="dt t-center">Mon</div>
          <div class="o-hidden">
            <ul class="flex-box">
              <li v-for="(item,index) in list1" :key="index">
                <p>
                  <span>{{item.startTime}}</span>-
                  <span>{{item.endTime}}</span>
                </p>
                <p
                  :class="item.isAssignedClass==false?'green':'red'"
                  v-if="item.stat == 1"
                >{{item.status}}</p>
                <p
                  :class="item.isAssignedClass==false?'blue':'blue'"
                  v-if="item.stat == 0"
                >{{item.status}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="o-hidden aom-usable">
        <div class="dl">
          <div class="dt t-center">Tues</div>
          <div class="o-hidden">
            <ul class="flex-box">
              <li v-for="(item,index) in list2" :key="index">
                <p>
                  <span>{{item.startTime}}</span>-
                  <span>{{item.endTime}}</span>
                </p>
                <p
                  :class="item.isAssignedClass==false?'green':'red'"
                  v-if="item.stat == 1"
                >{{item.status}}</p>
                <p
                  :class="item.isAssignedClass==false?'blue':'blue'"
                  v-if="item.stat == 0"
                >{{item.status}}</p>
              </li>
            </ul>
            <!-- <div class="dd" v-for="item in list2"
                 @click="setUsable(item.stat,item.availableTimeId,item.tutorUptimeId,item.status)">
              <div class="t-center"><span>{{item.startTime}} -</span><span>{{item.endTime}}</span></div>
              <div class="t-center">{{item.status}}</div>
              <div :class="item.stat===1?'t-center':'t-center active'">{{item.stat === 1 ? '可用' : '不可用'}}</div>
            </div>-->
          </div>
        </div>
        <div class="dl">
          <div class="dt t-center">Wed</div>
          <div class="o-hidden">
            <ul class="flex-box">
              <li v-for="(item,index) in list3" :key="index">
                <p>
                  <span>{{item.startTime}}</span>-
                  <span>{{item.endTime}}</span>
                </p>
                <p
                  :class="item.isAssignedClass==false?'green':'red'"
                  v-if="item.stat == 1"
                >{{item.status}}</p>
                <p
                  :class="item.isAssignedClass==false?'blue':'blue'"
                  v-if="item.stat == 0"
                >{{item.status}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="dl">
          <div class="dt t-center">Thur</div>
          <div class="o-hidden">
            <ul class="flex-box">
              <li v-for="(item,index) in list4" :key="index">
                <p>
                  <span>{{item.startTime}}</span>-
                  <span>{{item.endTime}}</span>
                </p>
                <p
                  :class="item.isAssignedClass==false?'green':'red'"
                  v-if="item.stat == 1"
                >{{item.status}}</p>
                <p
                  :class="item.isAssignedClass==false?'blue':'blue'"
                  v-if="item.stat == 0"
                >{{item.status}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="dl">
          <div class="dt t-center">Fri</div>
          <div class="o-hidden">
            <ul class="flex-box">
              <li v-for="(item,index) in list5" :key="index">
                <p>
                  <span>{{item.startTime}}</span>-
                  <span>{{item.endTime}}</span>
                </p>
                <p
                  :class="item.isAssignedClass==false?'green':'red'"
                  v-if="item.stat == 1"
                >{{item.status}}</p>
                <p
                  :class="item.isAssignedClass==false?'blue':'blue'"
                  v-if="item.stat == 0"
                >{{item.status}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="dl">
          <div class="dt t-center">Sat</div>
          <div class="o-hidden">
            <ul class="flex-box">
              <li v-for="(item,index) in list6" :key="index">
                <p>
                  <span>{{item.startTime}}</span>-
                  <span>{{item.endTime}}</span>
                </p>
                <p
                  :class="item.isAssignedClass==false?'green':'red'"
                  v-if="item.stat == 1"
                >{{item.status}}</p>
                <p
                  :class="item.isAssignedClass==false?'blue':'blue'"
                  v-if="item.stat == 0"
                >{{item.status}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  tutorUptimeWeekPoint,
  tutorUptimeAvailable,
  tutorUptimeDisavailable
} from "@/api/aom.js";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils/index.js";
export default {
  components: {},
  data() {
    return {
      list7: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      dateValue: "",
      roleId: "",
      teacherId: "",
      originTimeGe: "",
      type: ""
    };
  },
  computed: {
    ...mapGetters(["roleIds"])
  },
  created() {
    // console.log(this.roleIds[0])
    this.roleId = this.roleIds[0];
    this.teacherId = this.$route.query.teacherId;
    this.isChinese = this.$route.query.isChinese;
    this.type = this.$route.query.type;
    this.area = this.$route.query.area;
    this.name = this.$route.query.name;
    this.group = this.$route.query.group;
    this.title = `${this.isChinese}教池 > 可用时间 > 申请调整-可用时间`;

    this.weekFun();
  },
  methods: {
    search() {
      this.originTimeGe = Date.parse(this.dateValue);

      this.weekFun();
    },
    gotoApplyment() {
      this.$router.push({
        path: "/teachers/applayHoliday",
        query: { teacherId: this.$route.query.teacherId }
      });
    },
    gotoHistory() {
      this.$router.push({
        path: "/teachers/tutorApplyHistoryList",
        query: { teacherId: this.$route.query.teacherId }
      });
    },
    setUsable(stat, availableTimeId, tutorUptimeId, status) {
      // console.log(stat);
      // console.log(this.teacherId);
      // console.log(availableTimeId);
      // console.log(tutorUptimeId);
      if (stat === 1) {
        //设置成不可用
        if (status === "Occupied") {
          this.$message({ type: "error", message: "有课程不能修改" });
          return false;
        }
        tutorUptimeDisavailable(tutorUptimeId).then(() => {
          this.weekFun();
        });
      } else {
        tutorUptimeAvailable(this.teacherId, availableTimeId).then(() => {
          this.weekFun();
        });
      }
    },

    weekFun() {
      this._tutorUptimeWeekPoint111();
      this._tutorUptimeWeekPoint222();
      // if (this.isChinese === '中') {
      //   console.log(this.isChinese);
      //   this._tutorUptimeWeekPoint111();
      // } else {
      //   this._tutorUptimeWeekPoint222();
      // }
    },
    _tutorUptimeWeekPoint111() {
      tutorUptimeWeekPoint(
        7,
        this.teacherId,
        this.originTimeGe,
        this.type
      ).then(res => {
        this.list7 = res.data.timeSoltInfo;
        this.changeStatus(this.list7);
        console.log(this.list7);
      });
      tutorUptimeWeekPoint(
        6,
        this.teacherId,
        this.originTimeGe,
        this.type
      ).then(res => {
        this.list6 = res.data.timeSoltInfo;
        this.changeStatus(this.list6);
        console.log(this.list6);
      });
      tutorUptimeWeekPoint(
        1,
        this.teacherId,
        this.originTimeGe,
        this.type
      ).then(res => {
        this.list1 = res.data.timeSoltInfo;
        this.changeStatus(this.list1);
        console.log(this.list1);
      });
    },
    _tutorUptimeWeekPoint222() {
      tutorUptimeWeekPoint(
        2,
        this.teacherId,
        this.originTimeGe,
        this.type
      ).then(res => {
        this.list2 = res.data.timeSoltInfo;
        this.changeStatus(this.list2);
        console.log(this.list2);
      });
      tutorUptimeWeekPoint(
        3,
        this.teacherId,
        this.originTimeGe,
        this.type
      ).then(res => {
        this.list3 = res.data.timeSoltInfo;
        this.changeStatus(this.list3);
        console.log(this.list3);
      });
      tutorUptimeWeekPoint(
        4,
        this.teacherId,
        this.originTimeGe,
        this.type
      ).then(res => {
        this.list4 = res.data.timeSoltInfo;
        this.changeStatus(this.list4);
        console.log(this.list4);
      });
      tutorUptimeWeekPoint(
        5,
        this.teacherId,
        this.originTimeGe,
        this.type
      ).then(res => {
        this.list5 = res.data.timeSoltInfo;
        this.changeStatus(this.list5);
        console.log(this.list5);
      });
    },
    changeStatus(list) {
      list.sort((a, b) => {
        return a.startTime - b.startTime;
      });
      list.forEach(item => {
        item.startTime = this.parseTime(item.startTime).substring(11, 16);
        item.endTime = this.parseTime(item.endTime).substring(11, 16);
        if (item.stat == 0) {
          item.status = "Unavailable";
        } else {
          if (item.isAssignedClass) {
            item.status = "Occupied";
          } else {
            item.status = "Unscheduled";
          }
        }
      });
    },
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null;
      }
      const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
      let date;
      if (typeof time === "object") {
        date = time;
      } else {
        if (("" + time).length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      };
      const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === "a")
          return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
        if (result.length > 0 && value < 10) {
          value = "0" + value;
        }
        return value || 0;
      });
      return time_str;
    }
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../index.scss";
ul,
p {
  margin: 0;
  padding: 0;
}
.aom-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: white;
  .p-20 {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .header {
      justify-content: space-between;
      margin-bottom: 30px;
      .name {
        font-size: 34px;
        color: #666666;
        font-family: SourceHanSansCN-Regular;
      }
    }

    .addclass-box {
      height: auto;
      width: 100%;
      padding: 20px 0;
    }
    .aom-usable {
      .dl {
        background-color: #ffffff;
        box-shadow: 0px 2px 35px 0px rgba(88, 93, 107, 0.13);
        border-radius: 10px;
        border: solid 1px #ebeef5;
        padding: 0 30px 30px 30px;
        margin-bottom: 20px;
        ul {
          border: 1px solid #ebeef5;
          border-bottom: none;
          flex-wrap: wrap;
          li {
            width: 14.286%;
            height: 145px;
            border-right: 1px solid #ebeef5;
            position: relative;
            border-bottom: 1px solid #ebeef5;
            p {
              text-align: center;
              font-family: MicrosoftYaHeiUI;
            }
            p:nth-child(1) {
              color: #4e5053;
              font-size: 16px;
              margin-top: 39px;
              margin-bottom: 10px;
            }
            p:nth-child(2) {
              font-size: 17 px;
            }
            div {
              width: 100%;
              height: 36px;
              line-height: 36px;
              background-color: #69c242;
              color: #ffffff;
              position: absolute;
              bottom: 0;
              cursor: pointer;
            }
            .red {
              color: #ff5a4e;
            }
            .green {
              color: #69c242;
            }
            .active {
              background: #d2d2d2;
            }
            .blue {
              color: #449cfc;
            }
          }
          li:nth-child(7n) {
            border-right: none;
          }
        }
        .dt {
          height: 54px;
          line-height: 54px;
        }
        .dd {
          width: 25%;
          float: left;
          border-right: 1px solid #ccc;
          cursor: pointer;
          div {
            &:nth-child(3n + 1) {
              height: 25px;
              line-height: 25px;
              margin-top: 10px;
            }
            &:nth-child(3n + 2) {
              height: 25px;
              line-height: 25px;
              margin-bottom: 10px;
            }
            &:nth-child(3n) {
              height: 30px;
              line-height: 30px;
              background: green;
              color: white;
              &.active {
                background: red;
              }
            }
          }
        }
      }
    }
  }
}
.mr {
  margin-right: 10px;
}
.flex-box {
  display: flex;
}
</style>
