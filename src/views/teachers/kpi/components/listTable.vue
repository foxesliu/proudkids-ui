<template>
  <div>
    <el-table :data="listTableData" border style="width: 100%">
      <el-table-column
        align="center"
        prop="className"
        label="班级名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="stuName"
        label="学生中文名字"
      ></el-table-column>
      <el-table-column align="center" label="学生英文名字">
        <template slot-scope="scope">
          <span>{{ scope.row.stuEnName || "--------" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="tutorName"
        label="上课老师"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="lessonName"
        label="课节"
      ></el-table-column>
      <el-table-column align="center" label="上课日期">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <p>{{ scope.row.originTime | dealTime }}</p>
          </div>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="出席">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.type==0">未开始</span>-->
      <!--<span v-else :class="{red:scope.row.ruserStatus ==0,green:scope.row.ruserStatus ==1}">{{scope.row.ruserStatus | dealRuserStatus}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="SS Attendance" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ruserStatus | ruserStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="预习状态" align="center">
        <template slot-scope="scope">
          <!--lessonHs预习1上线-->
          <span
            :class="
              scope.row.extendInfo && scope.row.extendInfo.pvStat | classStatus
            "
            v-if="scope.row.lessonPs == 1"
            >{{
              scope.row.extendInfo && scope.row.extendInfo.pvStat | pvStatStatus
            }}</span
          >
          <span v-else>不可预习</span>
        </template>
      </el-table-column>

      <el-table-column label="预习" align="center" v-if="roleId != 27">
        <template slot-scope="scope">
          <!--lessonHs预习1上线-->
          <!--<el-button type="success" >查看</el-button>-->
          <el-button
            class="disabled"
            v-if="
              scope.row.extendInfo.pvStat == 0 ||
                scope.row.extendInfo.pvStat == null
            "
            disabled
            >查看</el-button
          >
          <el-button type="primary" @click="preview(scope)" v-else
            >查看</el-button
          >
        </template>
      </el-table-column>

      <el-table-column label="预习批注&&提问" align="center">
        <template slot-scope="scope">
          <el-button type="danger" v-if="scope.row.extendInfo.pvQaCount">{{
            scope.row.extendInfo.pvQaCount
          }}</el-button>
          <span v-else>-------</span>
        </template>
      </el-table-column>

      <el-table-column label="预习更多数据" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="1571"
            trigger="manual"
            v-model="scope.row.preVisible"
          >
            <el-table
              :data="detailData"
              border
              :header-cell-style="{ background: '#f9fafc' }"
              v-loading="listLoading"
            >
              <el-table-column
                property="answerTime"
                label="答题用时"
                align="center"
              ></el-table-column>
              <el-table-column
                property="finishPercent"
                label="作业完成率"
                align="center"
              ></el-table-column>
              <el-table-column
                property="rightPercent"
                label="作业正确率"
                align="center"
              ></el-table-column>
              <el-table-column
                property="ruserScore"
                label="奖杯数量"
                align="center"
              ></el-table-column>
              <el-table-column
                property="correctTime"
                label="批改用时"
                align="center"
              ></el-table-column>
              <el-table-column
                property="correctPercent"
                label="批改率"
                align="center"
              ></el-table-column>
              <el-table-column
                property="visitNum"
                label="点开人数"
                align="center"
              ></el-table-column>
              <el-table-column
                property="supportNum"
                label="点赞人数"
                align="center"
              ></el-table-column>
              <el-table-column
                property="signUpNum"
                label="通过该页面点击参与的人"
                align="center"
              ></el-table-column>
            </el-table>

            <el-button
              slot="reference"
              type="primary"
              icon="el-icon-caret-bottom"
              @click="preExpanded(scope.row)"
              v-if="typeof scope.row.ruserId == 'number'"
              >展开</el-button
            >

            <el-button
              slot="reference"
              type="primary"
              icon="el-icon-caret-top"
              @click="prePackUp(scope.row)"
              v-if="typeof scope.row.ruserId != 'number'"
              >收起</el-button
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="作业状态" align="center">
        <!--lessonHs作业1上线-->
        <template slot-scope="scope">
          <span
            :class="
              scope.row.extendInfo && scope.row.extendInfo.hwStat | classStatus
            "
            v-if="scope.row.lessonHs == 1"
            >{{
              scope.row.extendInfo && scope.row.extendInfo.hwStat | hwStatStatus
            }}</span
          >
          <span v-else>不可作答</span>
        </template>
      </el-table-column>

      <el-table-column label="作业" align="center" v-if="roleId != 27">
        <!--lessonHs作业1上线-->
        <!--<el-button type="primary" v-if="scope.row.extendInfo.hwStat==1">查看</el-button>-->
        <!--<el-button class="disabled" v-else disabled>查看</el-button>-->
        <template slot-scope="scope">
          <el-button
            class="disabled"
            v-if="
              scope.row.extendInfo.hwStat == 0 ||
                scope.row.extendInfo.hwStat == null
            "
            disabled
            >查看</el-button
          >
          <el-button type="primary" v-else @click="view(scope)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column label="作业批注&&提问" align="center">
        <template slot-scope="scope">
          <el-button type="danger" v-if="scope.row.extendInfo.hwQaCount">{{
            scope.row.extendInfo.pvQaCount
          }}</el-button>
          <span v-else>-------</span>
        </template>
      </el-table-column>
      <el-table-column label="作业更多数据" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="1571"
            trigger="manual"
            v-model="scope.row.studyVisible"
          >
            <el-table
              :data="detailData"
              border
              :header-cell-style="{ background: '#f9fafc' }"
              v-loading="listLoading"
            >
              <el-table-column
                property="answerTime"
                label="答题用时"
                align="center"
              ></el-table-column>
              <el-table-column
                property="finishPercent"
                label="作业完成率"
                align="center"
              ></el-table-column>
              <el-table-column
                property="rightPercent"
                label="作业正确率"
                align="center"
              ></el-table-column>
              <el-table-column
                property="ruserScore"
                label="奖杯数量"
                align="center"
              ></el-table-column>
              <el-table-column
                property="correctTime"
                label="批改用时"
                align="center"
              ></el-table-column>
              <el-table-column
                property="correctPercent"
                label="批改率"
                align="center"
              ></el-table-column>
              <el-table-column
                property="visitNum"
                label="点开人数"
                align="center"
              ></el-table-column>
              <el-table-column
                property="supportNum"
                label="点赞人数"
                align="center"
              ></el-table-column>
              <el-table-column
                property="signUpNum"
                label="通过该页面点击参与的人"
                align="center"
              ></el-table-column>
            </el-table>

            <el-button
              slot="reference"
              type="primary"
              icon="el-icon-caret-bottom"
              @click="studyExpanded(scope.row)"
              v-if="typeof scope.row.classId == 'number'"
              >展开</el-button
            >

            <el-button
              slot="reference"
              type="primary"
              icon="el-icon-caret-top"
              @click="studyPackUp(scope.row)"
              v-if="typeof scope.row.classId != 'number'"
              >收起</el-button
            >
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { formatDuring } from "@/utils/index";
import { ruserStatistics } from "@/api/teachers.js";

export default {
  name: "filterTable",
  props: ["listTableData", "experience"],
  data() {
    return {
      detailData: [],
      listLoading: false,
      total: null,
      experienceList: false,
      listQuery: {
        page: 1,
        rows: 10
      },
      roleId: ""
    };
  },
  created() {
    this.type = this.$route.query.status;
    this.experienceList = this.$route.query.experienceList;
    this.roleId = this.roleIds[0];
  },
  computed: {
    ...mapGetters(["roleIds"])
  },
  filters: {
    dealTime(time) {
      return time && time.toString().substring(0, 10);
    },
    dealRuserStatus(val) {
      const config = {
        0: "未出席",
        1: "已出席"
      };
      return config[val];
    },
    //出席状态
    ruserStatus(status) {
      const config = {
        "0": "Absent",
        "1": "Attendance"
      };
      return config[status];
    },
    //作业样式
    classStatus(status) {
      const config = {
        null: "black",
        undefined: "black",
        "0": "black",
        "1": "red",
        "2": "red",
        "3": "yellow",
        "4": "green"
      };
      return config[status];
    },
    //预习状态
    pvStatStatus(status) {
      const config = {
        null: "未预习",
        undefined: "未预习",
        "0": "未预习",
        "1": "预习中",
        "2": "已预习",
        "3": "批改中",
        "4": "已批改"
      };

      return config[status];
    },
    //做题状态
    hwStatStatus(status) {
      const config = {
        null: "未作答",
        undefined: "未作答",
        "0": "未作答",
        "1": "作答中",
        "2": "已作答",
        "3": "批改中",
        "4": "已批改"
      };
      return config[status];
    }
  },
  methods: {
    /**
     * @description 预习查看
     */
    preview(scope) {
      this.$router.push({
        path: "/detail/workDetail",
        query: {
          id: scope.row.extendInfo.pvId,
          stat: scope.row.stat,
          ruserId: scope.row.ruserId,
          lessonName: scope.row.lessonName,
          courseName: scope.row.courseName,
          courseId: scope.row.courseId,
          lessonId: scope.row.lessonId,
          mode: 0
        }
      });

      sessionStorage.setItem("chName", scope.row.stuName);
      sessionStorage.setItem("engName", scope.row.stuEnName);

      console.log(scope.row);
    },
    /**
     * @description 作业查看
     */
    view(scope) {
      this.$router.push({
        path: "/detail/workDetail",
        query: {
          id: scope.row.extendInfo.hwId,
          stat: scope.row.stat,
          ruserId: scope.row.ruserId,
          lessonName: scope.row.lessonName,
          courseName: scope.row.courseName,
          courseId: scope.row.courseId,
          lessonId: scope.row.lessonId,
          mode: 1
        }
      });
      sessionStorage.setItem("chName", scope.row.stuName);
      sessionStorage.setItem("engName", scope.row.stuEnName);
    },
    //获取学生作业预习统计
    async getRuserStatistics(id) {
      this.listLoading = true;
      const result = await ruserStatistics(id);
      const {
        ruserCount,
        ruserRightCount,
        correctCount,
        sectionCount,
        rstartTime,
        ustartTime,
        rendTime,
        uendTime,
        answerCount,
        qustionCount
      } = result.data;
      //答题时间
      const answerTime =
        new Date(rendTime).getTime() - new Date(rstartTime).getTime();
      //批改时间
      const correctTime =
        new Date(uendTime).getTime() - new Date(ustartTime).getTime();
      result.data.answerTime =
        rendTime == null ? "--------" : formatDuring(answerTime);
      result.data.correctTime =
        uendTime == null ? "--------" : formatDuring(correctTime);

      result.data.rightPercent =
        sectionCount == 0
          ? 0
          : ((100 * ruserRightCount) / sectionCount).toFixed(1) + "%";
      // result.data.finishPercent =
      //   sectionCount == 0
      //     ? 0
      //     : ((100 * ruserCount) / sectionCount).toFixed(1) + "%";
      //答题完成率
      if (answerCount > qustionCount) {
        result.data.finishPercent = "100%";
      } else if (answerCount == 0) {
        result.data.finishPercent = 0;
      } else {
        result.data.finishPercent =
          ((100 * answerCount) / qustionCount).toFixed(1) + "%";
      }
      result.data.correctPercent =
        sectionCount == 0
          ? 0
          : ((100 * correctCount) / sectionCount).toFixed(1) + "%";
      result.data.rendTime == null
        ? (result.data.rendTime = "--------")
        : (result.data.rendTime = rendTime);
      result.data.uendTime == null
        ? (result.data.uendTime = "--------")
        : (result.data.uendTime = uendTime);
      result.data.ustartTime == null
        ? (result.data.ustartTime = "--------")
        : (result.data.ustartTime = ustartTime);
      this.detailData = [result.data];
      if (result) {
        this.listLoading = false;
      }
    },
    //预习展开
    preExpanded(record) {
      record.preVisible = true;
      record.ruserId = record.ruserId.toString();
      if (record.extendInfo.pvId) {
        this.getRuserStatistics(record.extendInfo.pvId);
      } else {
        this.detailData = [];
      }
    },
    //预习收起
    prePackUp(record) {
      record.preVisible = false;
      record.ruserId = Number(record.ruserId);
    },
    //作业展开
    studyExpanded(record) {
      record.studyVisible = true;
      record.classId = record.classId.toString();
      if (record.extendInfo.hwId) {
        this.getRuserStatistics(record.extendInfo.hwId);
      } else {
        this.detailData = [];
      }
    },
    //作业收起
    studyPackUp(record) {
      record.studyVisible = false;
      record.classId = Number(record.classId);
    },
    add(data) {
      const detailParams = JSON.parse(sessionStorage.getItem("detailParams"));
      const { ruserId } = detailParams[0];
      const { classId, startTime } = data;
      const startDate = startTime.toString().substring(0, 10);
      const periodNum = 1;

      this.$emit("postData", {
        classId,
        startDate,
        ruserId,
        periodNum
      });
    },
    gotoDetail(scope) {
      this.$router.push({
        path: "/detail/ruserClassInfo-beforeclass",
        query: {
          lessonId: scope.row.lessonId,
          ruserId: scope.row.ruserId,
          lessonName: scope.row.lessonName,
          courseName: scope.row.courseName
        }
      });
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/less" scoped>
.el-table {
  width: 100%;

  .green {
    color: #69c242;
  }

  .red {
    color: #ff5a4e;
  }

  .black {
    color: #666;
  }

  .yellow {
    color: #ffa01a;
  }

  .el-button {
    width: 91px;
    height: 37px;
    border-radius: 4px;
  }

  .disabled {
    background-color: #cbcbcb;
    color: #ffffff;
  }

  .evaluate {
    width: 125px;
  }
}
</style>
