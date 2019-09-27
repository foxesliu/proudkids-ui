<template>
  <div class="operatingBtns">
    <span></span>
    <el-button :type="type" class="btn" @click="operate" :disabled="disabled">{{content}}</el-button>
  </div>
</template>

<script>

  export default {
    props: ['type', 'content', 'stat', 'disabled'],
    data() {
      return {}
    },
    methods: {
      operate(event) {
        console.log(this.stat)
        if (this.stat == 1) {
          console.log(1111)
        } else if (this.stat == 2) { //添加到素材库

        } else if (this.stat == 3) { //点击进入画板模式
          this.$router.push({
            path: './draw'
          })
        } else {
          console.log(44444)
        }
        this.$emit('postil')
      },
      input(data) {
        console.log(data)
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .operatingBtns {
    line-height: 37px;
    display: flex;
    align-items: center;

    span {
      width: 19px;
      height: 19px;
      background-color: #449cfc;
      border-radius: 100%;
      position: relative;
    }

    span:after {
      content: "";
      display: block;
      position: absolute;
      top: 8px;
      left: 11px;
      width: 116px;
      height: 3px;
      background-color: #449cfc;
      opacity: 0.23;
    }

    .btn {
      margin-left: 106px;
    }
  }
</style>
