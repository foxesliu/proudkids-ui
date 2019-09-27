<template>
  <div class="swiper clearfix">
    <div class="swiper-left" @click="leftBtn">
      <img :src="swiperLeftImg" alt="" />
    </div>
    <div class="swiper-box" ref="box">
      <ul ref="ul" :style="{ left: offsetLeft + 'px' }">
        <li
          v-for="(item, index) in swiperList"
          @click="swiperClick(item, index)"
          :key="index"
        >
          <div class="num" :class="{ active: currentId === index }">
            {{ index + 1 }}
          </div>
          <img :src="item.img" alt="" />
          <trophy :score="item.score"></trophy>
          <span :class="item.notProcessQaCount ? 'circle' : ''"></span>
        </li>
      </ul>
    </div>
    <div class="swiper-right" @click="rightBtn">
      <img :src="swiperRightImg" alt="" />
    </div>
  </div>
</template>

<script>
import arrowLeft from "@/assets/workDetail/arrowLeft.png";
import arrowRight from "@/assets/workDetail/arrowRight.png";
import unarrowLeft from "@/assets/workDetail/unarrowLeft.png";
import unarrowRight from "@/assets/workDetail/unarrowRight.png";
import trophy from "./trophy";

export default {
  components: {
    trophy
  },
  props: {
    swiperList: {
      type: Array,
      required: true
    },
    swiperIndex: {}
  },
  data() {
    return {
      left: 0,
      offsetLeft: 0,
      speed: 126,
      swiperLeftImg: arrowLeft,
      swiperRightImg: arrowRight,
      currentId: 0
    };
  },
  created() {
    this.totalLength = this.swiperList.length;
  },
  methods: {
    leftBtn() {
      if (
        this.$refs.ul.clientWidth > this.$refs.box.clientWidth &&
        this.offsetLeft != 0
      ) {
        this.offsetLeft = this.offsetLeft + 166;
        this.swiperLeftImg = arrowLeft;
        this.swiperRightImg = arrowRight;
      } else {
        this.swiperRightImg = arrowRight;
        this.swiperLeftImg = unarrowLeft;
      }
    },
    rightBtn() {
      if (
        this.$refs.ul.clientWidth > this.$refs.box.clientWidth &&
        this.offsetLeft + this.$refs.ul.clientWidth > this.$refs.box.clientWidth
      ) {
        this.offsetLeft = this.offsetLeft - 166;
        this.swiperRightImg = arrowRight;
        this.swiperLeftImg = arrowLeft;
      } else {
        this.swiperLeftImg = arrowLeft;
        this.swiperRightImg = unarrowRight;
      }
    },
    swiperClick(item, index) {
      if (item.ret) {
        const { content, type } = JSON.parse(item.ret);
        item.content = content;
        item.imgType = type;
      }
      //保存当前点击项swiperId
      sessionStorage.setItem("qaSwiperId", item.id);

      this.currentId = index;
      this.$emit("getCurrentSwiperQuestion", item);
    }
  },
  watch: {
    swiperIndex(newVal, oldVal) {
      if (newVal != oldVal) {
        this.currentId = newVal;
      }
    },
    //获取数组更新当前的serialIndex
    swiperList(newVal, oldVal) {
      this.$parent.swiperList.forEach((item, index) => {
        item.serialIndex = index + 1;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common.scss";

.swiper {
  overflow: hidden;
  display: flex;
  margin: 10px 15px 0 15px;
  padding: 20px;
  height: 172px;
  background-color: #f9fafc;
  border-radius: 8px;
  border: solid 1px #dcdfe6;

  .swiper-left,
  .swiper-right {
    width: 63px;
    height: 126px;
    line-height: 126px;
    text-align: center;
    background-color: #ffffff;
    border: solid 1px #dcdfe6;
    cursor: pointer;
  }

  .swiper-box {
    flex: 1;
    height: 126px;
    overflow: hidden;
    padding-left: 20px;
    background-color: #ffffff;
    position: relative;
  }

  ul {
    position: absolute;
    height: 126px;
    top: 0;
    white-space: nowrap;

    li {
      width: 126px;
      height: 126px;
      display: inline-block;
      background-color: #fff;
      margin: 0 20px;
      border: solid 1px #dcdfe6;
      padding-top: 14px;
      text-align: center;
      position: relative;
      cursor: pointer;

      .circle {
        position: absolute;
        top: 8px;
        right: 11px;
        border-radius: 100%;
        width: 12px;
        height: 12px;
        background-color: #ff5a4e;
      }

      .num {
        height: 40px;
        line-height: 40px;
        background-color: #449cfc;
        font-size: 24px;
        color: #ffffff;
      }

      .active {
        background: #3eb982;
      }

      img {
        margin: 16px 0;
      }
    }
  }
}
</style>
