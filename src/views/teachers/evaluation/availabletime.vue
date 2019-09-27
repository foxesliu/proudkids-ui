<template>
  <div class="availabletime">
    <div class="inner">
      <span v-for="item in btns" :key="item.name">
        <router-link :to="{path:'setCAvailabletime',query: {teacherType:item.type}}">
          <el-button type="primary" size="medium">{{item.name}}</el-button>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getClassesCount } from "@/api/teachers"; // 編輯學生
export default {
  data() {
    return {
      btns: [
        { type: 0, name: "中教-常规设置可用时间" },
        { type: 1, name: "外教-常规设置可用时间" },
        { type: -1, name: "中教-线下可用时间" }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../sale/detail/detail.scss";

.availabletime {
  .inner {
    height: 87px;
    margin: 14px 15px 0 15px;
    border-radius: 8px;
    padding-left: 17px;
    border: solid 1px #dcdfe6;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      margin-right: 20px;
    }

    button {
      background-color: #449cfc;
    }
  }
}
</style>
