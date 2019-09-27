<template>
  <div class="text" :class="[type ? 'text--' + type : '']">
    <p>{{content}}</p>
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
      content: {
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

  .text {
    width: 588px;
    min-height: 52px;
    border-radius: 8px;
    position: relative;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 18px;
    color: #444444;
    display: flex;
    margin-left: 20px;

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
    padding: 0 0 0 14px;
    background-color: #91e224;
    box-shadow: 0px 6px 0px 0px #77d10b;

    p {
      margin-right: 20px;
      padding: 10px 0;
      text-align: justify;
      width: 485px;
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
    padding: 10px 22px 10px 14px;
    background-color: #fff200;
    box-shadow: 0px 2px 0px 0px #ffc900;

    p {
      text-align: justify;
    }

    .triangle {
      border-bottom: 20px solid #fff200;
      box-shadow: 0px 2px 0px 0px #ffc900;
    }
  }

</style>
