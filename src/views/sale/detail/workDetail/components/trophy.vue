<template>
  <div class="star">
    <span
      v-for="(item, index) in itemClasslass"
      class="star-item"
      :key="index"
      :class="item"
      @click="getNum(index)"
    ></span>
    <slot></slot>
  </div>
</template>

<script>
const lengths = 3;
const starOn = "on";
const starOff = "off";
export default {
  data() {
    return {
      currentScore: ""
    };
  },
  props: ["score", "size", "event"],
  methods: {
    getNum(index) {
      if (this.event) {
        this.currentScore = index + 1;
        const obj = {
          score: index + 1,
          btnStat: true
        };
        this.$emit("getScore", obj);
      }
    }
  },
  created() {
    this.currentScore = this.score;
    console.log(this.score)
  },
  computed: {
    itemClasslass() {
      //星星的数组
      let result = [];
      let score = this.currentScore;

      console.log(score);
      //放金色奖杯
      for (var i = 0; i < score; i++) {
        result.push(starOn);
      }
      //如果没有满到三个星就用灰色的奖杯
      if (result.length < lengths) {
        var offstar = lengths - result.length;
        for (var i = 0; i < offstar; i++) {
          result.push(starOff);
        }
      }
      return result;
    }
  },
  watch: {
    score(newVal, oldVal) {
      if (newVal != oldVal) {
        this.currentScore = newVal;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.star {
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
    width: 22px;
    height: 18px;
    margin-right: 12px;
    background-size: 20px 20px;
    background-position: center center;

    &:last-child {
      margin-right: 0;
    }

    &.on {
      background: url("../../../../../assets/workDetail/prize.png");
    }

    &.off {
      background: url("../../../../../assets/workDetail/noPrize.png");
    }
  }
}
</style>

