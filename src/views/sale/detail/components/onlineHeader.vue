<template>
  <div class="header">
    <el-row>
      <el-col :span="5" class="mt10">中文名字：{{userInfo.name}}</el-col>
      <el-col :span="5" class="mt10">英文名字：{{userInfo.enName}}</el-col>
      <el-col :span="5" class="mt10">绑定手机：{{userInfo.phone}}</el-col>
      <el-col :span="5" class="mt10">级别：{{userInfo.grade}}</el-col>
      <el-col :span="4">
        <el-button @click="goOnlinePay">选择在线订单</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['userInfo'],
    methods: {
      goOnlinePay(){
        console.log(this.userInfo);
        //return;
        this.$router.push({
          path: '/detail/onLineOrder', query: {
            phone: this.userInfo.phone,
            ruserId: this.userInfo.ruserId,
            channelId: this.userInfo.originChannelId
          }
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import '../detail.scss';

  @include btn();
  .header {
    height: 78px;
    background: #fff;
    font-size: 18px;
    color: #8e8e8e;
    display: flex;
    /*flex-direction: column;*/
    /*justify-content: center;*/
    border: 2px solid #f6f6f6;
    border-radius: 10px;
    padding-left: 38px;
    margin-bottom: 18px;
  }

</style>

