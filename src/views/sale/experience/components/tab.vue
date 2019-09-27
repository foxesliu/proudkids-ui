<template>
  <div class="tab">
    <template v-for="item in data">
      <div class="card" @click="detail(item.status)">
        <p>
          <circleStatus :status="item.status"></circleStatus>
          {{item.name}}
        </p>
        <p>{{item.num}}</p>
      </div>
    </template>
  </div>
</template>

<script>
  import circleStatus from './circle'
  export default {
    name: 'tab',
    components: {
      circleStatus
    },
    data() {
      return {
        timer: null,
        data: [
          {
            name: '未开始',
            status: 0,
            num: null
          }, {
            name: '已结束',
            status: 1,
            num: null
          }
        ]
      }
    },
    methods: {
      detail(status) {
        console.log(status)
        if(status===0){
          this.$router.push({
            path:'./noStart',query:{
              status
            }
          })
        }else{
          this.$router.push({
            path:'./ended',query:{
              status
            }
          })
        }

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tab {
    display: flex;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    .card {
      height: 138px;
      background: #fff;
      flex: 1;
      text-align: center;
      border: 1px solid #dfdfdf;
      border-radius: 12px;

      p {
        margin: 0;
        color: #919296;
        font-size: 18px;
      }

      p:first-child {
        height: 56px;
        line-height: 56px;
        background: #f6f7fb;
        border-radius: 12px 12px 0 0;
      }

      p:last-child {
        line-height: 80px;
        background: #ffffff;
        border-radius: 0 0 12px 12px;
        color: #474747;
        font-size: 24px;
      }
    }

    .card:hover {
      box-shadow: 0 1px 6px 2px #dcdcdc;
    }

    .card:first-child {
      margin-right: 20px;
    }
  }

</style>
