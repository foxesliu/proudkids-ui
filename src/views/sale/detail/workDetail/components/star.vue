<template>
  <div class="stars">
    <div v-for="(star, index) in stars" :key="index">
      <img
        :src="star.img"
        @click="getNum(index)"
        v-if="canStar"
        class="bigStar"
      />
      <img :src="star.img" v-else />
    </div>
  </div>
</template>

<script>
import prizeImg from "../../../../../assets/workDetail/prize.png";
import noPrizeImg from "../../../../../assets/workDetail/noPrize.png";
export default {
  props: {
    score: {
      type: Number,
      default: 0
    },
    canStar: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      imgs: [prizeImg, noPrizeImg],
      stars: [{ img: noPrizeImg }, { img: noPrizeImg }, { img: noPrizeImg }],
      value: ""
    };
  },
  mounted() {
    console.log(this.score);
    this.value = this.score;
    this.dealStar();
  },
  methods: {
    getNum(index) {
      console.log(index);
      this.value = index + 1;
      this.$emit("getScore", this.value);
      this.dealStar();
    },
    // 对星星处理
    dealStar() {
      console.log("星星");
      console.log(this.value);
      this.stars.forEach((item, index) => {
        if (index < this.value) {
          this.stars[index].img = this.imgs[0];
        } else {
          this.stars[index].img = this.imgs[1];
        }
      });
    }
  },
  watch: {
    score(newVal, oldVal) {
      if (newVal != oldVal) {
        this.value = newVal;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.stars {
  display: flex;
  cursor: pointer;
  img {
    width: 22px;
    height: 18px;
    margin-right: 12px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  }

  //   .bigStar {
  //     width: 60rpx;
  //     height: 60rpx;
  //     margin-right: 10rpx;
  //   }
}
</style>

