<template>
  <div class="setTime">
    <h1>{{titleName}}</h1>
    <div class="container" v-loading="loading">
      <ul class="week">
        <li
          v-for="(week,index) in weeks"
          :key="week.id"
          :class="{'active':currentIndex==index}"
          @click="change(week,index)"
        >{{week.name}}</li>
      </ul>

      <ul class="timeSlot">
        <li v-for="(item,index) in timeSlot" :key="index">{{item.timeSlot}}</li>
      </ul>

      <p v-if="!timeSlot.length">暂无数据</p>
    </div>

    <div class="chooseTime">
      <el-form ref="form" :model="formData" label-width="200px" size="small" class="mt30">
        <el-form-item label="选择时间段:">
          <el-row>
            <el-col :span="6">
              <el-select v-model="formData.timeSlot" placeholder="选择时间段">
                <el-option
                  v-for="item in schedulePointOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-button @click="onSubmit" type="primary">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getClassesCount,
  availableTime,
  searchAvailableTime,
  deleteAvailableTime
} from "@/api/teachers"; // 编辑学生
export default {
  data() {
    return {
      loading: false,
      titleName: "",
      currentIndex: 0,
      weeks: [
        {
          name: "周日",
          id: 7,
          index: 0,
          checked: false,
          teacherType: 0
        },
        {
          name: "周一",
          id: 1,
          index: 1,
          checked: false,
          teacherType: 0
        },
        {
          name: "周二",
          id: 2,
          index: 2,
          checked: false,
          teacherType: 0
        },
        {
          name: "周三",
          id: 3,
          index: 3,
          checked: false,
          teacherType: 0
        },
        {
          name: "周四",
          id: 4,
          index: 4,
          checked: false,
          teacherType: 0
        },
        {
          name: "周五",
          id: 5,
          index: 5,
          checked: false,
          teacherType: 0
        },
        {
          name: "周六",
          id: 6,
          index: 6,
          checked: false,
          teacherType: 0
        }
      ],
      timeSlot: [],
      formData: {
        weekpoint: null,
        timeSlot: null,
        type: null,
        createId: null,
        stat: 0
      },
      listQuery: {
        page: 0,
        limit: 100,
        type: null,
        weekpoint: 7
      },
      otherTimes: [
        { value: "8:30-10:00" },
        { value: "10:10-11:40" },
        { value: "13:00-14:30" },
        { value: "14:40-16:10" },
        { value: "16:20-17:50" },
        { value: "18:00-19:30" }
      ]
    };
  },
  created() {
    let { teacherType } = this.$route.query;
    const config = {
      0: "中教-常规设置可用时间",
      1: "外教-常规设置可用时间",
      "-1": "中教-线下可用时间"
    };
    this.titleName = config[teacherType];
    this.listQuery.type = teacherType;
    this.formData.type = teacherType;
    this.formData.createId = this.userId;
    if (teacherType != "-1") {
      this.schedulePointOptions = this.schedulePoint; //上课时间
    } else {
      this.schedulePointOptions = this.otherTimes;
    }

    this.getList();
  },
  computed: {
    ...mapGetters(["roleIds", "userId", "schedulePoint", "userId"])
  },
  methods: {
    /**
     * @description: 点击切换当前样式
     * @params: index 当前点击的索引
     */
    change(item, index) {
      this.currentIndex = index;
      this.formData.weekpoint = item.id;
      this.listQuery.weekpoint = item.id;
      this.formData.timeSlot = null;
      this.getList();
    },
    /**
     * @description: 获取时间段数据
     */
    async getList() {
      this.loading = true;
      const res = await searchAvailableTime(this.listQuery);
      this.loading = false;

      this.timeSlot = res.data.records;
      this.timeSlot.forEach(item => {
        item.timestamp = Date.parse(
          "2018-6-13 " + item.timeSlot.substring(0, 5)
        );
      });
      this.timeSlot.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
    },
    /**
     * @description: 提交
     */
    async onSubmit() {
      if (!this.formData.weekpoint) {
        this.formData.weekpoint = this.listQuery.weekpoint;
      }
      if (!this.formData.timeSlot) {
        this.$message("请选择时间段！");
        return;
      }

      const res = availableTime(this.formData);
      if (res) {
        this.$message({
          message: "添加成功！",
          type: "success"
        });

        setTimeout(() => {
          this.getList();
          this.formData.timeSlot = null;
        }, 30);
      }
    }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../sale/detail/detail.scss";
.setTime {
  @include detail-container();
  h1 {
    font-family: MicrosoftYaHeiUI;
    font-size: 24px;
    color: #666666;
  }

  .container {
    padding: 0 20px;
    margin-top: 15px;
    min-height: 209px;
    background-color: #ffffff;
    box-shadow: 0px 2px 35px 0px rgba(88, 93, 107, 0.11);
    border-radius: 8px;
    border: solid 1px #dcdfe6;

    .week {
      display: flex;

      li {
        height: 76px;
        line-height: 76px;
        width: 150px;
        text-align: center;
        font-family: MicrosoftYaHeiUI;
        font-size: 20px;
        color: #666666;
        position: relative;
        cursor: pointer;
      }

      .active {
        color: #449cfc;
      }

      .active:after {
        content: "";
        width: 150px;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        background-color: #449cfc;
        transition: all 1s;
      }
    }

    .timeSlot {
      display: flex;
      flex-wrap: wrap;
      margin-top: 21px;
      margin-bottom: 27px;
      border-left: solid 1px #e3e6eb;

      li {
        width: 237px;
        height: 85px;
        border: solid 1px #e3e6eb;
        border-left: none;
        font-family: MicrosoftYaHeiUI;
        font-size: 14px;
        color: #606266;
        text-align: center;
        line-height: 85px;
      }

      li:nth-of-type(n + 8) {
        border-top: none;
      }
    }
  }

  .chooseTime {
    padding: 0 20px;
    margin-top: 15px;
    height: 85px;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 1px #dcdfe6;
  }
}
</style>

