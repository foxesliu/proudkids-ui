<template>
  <div class="img" :class="[type ? 'text--' + type : '']">
    <div class="pic">
      <viewer class="viewer">
        <img :src="src" alt="">
      </viewer>
    </div>

    <!--回复-->
    <span v-if="type=='student'" class="replay" @click="replay">回复</span>
    <span class="triangle">

    </span>

    <!--选择一种回复方式-->
    <replay v-model="material" :type="replayType" title="" v-on:cancel="clickCancel()"></replay>
  </div>
</template>

<script>
  import replay from './replay'

  export default {
    components: {
      replay
    },
    props: {
      type: {
        type: String
      },
      src: {
        type: String
      },
      record: {
        type: Object
      }
    },
    data() {
      return {
        material: false,
        replayType: ''
      }
    },
    methods: {
      replay() {
        this.replayType = this.record.filesType
        sessionStorage.setItem('qaPic', this.record.value)
        sessionStorage.setItem('currentQaId', this.record.qaId)
        sessionStorage.setItem('qaType', this.record.type)
        sessionStorage.setItem('qaRuserId', this.$route.query.ruserId)
        sessionStorage.setItem('qaLessSecCid', this.record.id)
        sessionStorage.setItem('qaLessSecId', this.record.lessSecId)
        sessionStorage.setItem('isCurrentPage', '')
        sessionStorage.setItem('qaSwiperId', this.$parent.$parent.swiperId)
        sessionStorage.setItem('qaTabsStatus', this.tabsStatus)
        this.material = true
      },
    }

  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../common.scss';

  .img {
    width: 470px;
    height: 244px;
    border-radius: 8px;
    position: relative;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 18px;
    color: #444444;
    display: flex;
    justify-content: space-between;
    margin-left: 20px;

    .pic {
      .viewer {
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .triangle {
      position: absolute;
      border-left: 20px solid transparent;
      display: block;
      width: 0;
      height: 0;
      bottom: 20px;
      left: -20px;
      overflow: hidden;
    }
  }

  .text--student {
    background-color: #91e224;
    box-shadow: 0px 6px 0px 0px #77d10b;

    .pic {
      padding: 7px 5px 9px 8px;
      width: 100%;
      height: 100%;
    }

    .triangle {
      border-bottom: 20px solid #91e224;
      box-shadow: 0px 6px 0px 0px #77d10b;
    }

    .replay {
      width: 77px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #444444;
      cursor: pointer;
      border-radius: 0 8px 8px 0;
      background-color: #77d10b;
    }
  }

  .text--teacher {
    padding: 8px;
    background-color: #fff200;
    box-shadow: 0px 2px 0px 0px #ffc900;

    .pic {
      width: 100%;
      height: 100%;
    }

    p {
      text-align: justify;
    }

    .triangle {
      border-bottom: 20px solid #fff200;
      box-shadow: 0px 2px 0px 0px #ffc900;
    }
  }

</style>
