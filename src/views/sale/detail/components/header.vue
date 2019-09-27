<template>
  <div class="header">
    <el-row>
      <el-col :span="6" class="mt5">{{$t('i18nView.header.chName')}}：{{userInfo.name}}</el-col>
      <el-col :span="6" class="mt5">{{$t('i18nView.header.enName')}}：{{userInfo.enName}}</el-col>
      <el-col :span="6" class="mt5">{{$t('i18nView.header.phone')}}：{{userInfo.phone}}</el-col>
      <el-col :span="6" class="mt5">{{$t('i18nView.header.grade')}}：{{userInfo.grade}}</el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: ['userInfo']
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../detail.scss';
  @include btn();
  .header {
    height: 78px;
    background: #fff;
    font-size: 18px;
    color: #8e8e8e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #f6f6f6;
    border-radius: 10px;
    padding-left: 38px;
    margin-bottom: 18px;
  }

</style>

