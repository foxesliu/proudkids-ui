<template>
  <ul class="name">
    <li class="name-intro leftBorder">Chinese Name :</li>
    <li>{{chName}}</li>
    <li class="name-intro">English Name :</li>
    <li class="rightBorder">{{engName}}</li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        chName: '',
        engName: ''
      }
    },
    created() {
      this.chName = sessionStorage.getItem('chName')
      if(sessionStorage.getItem('engName') == 'null'){
        this.engName = '------'
      }else{
        this.engName = sessionStorage.getItem('engName')
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .name {
    padding: 0;
    border: 1px solid #DCDFE6;
    color: #606266;
    font-size: 20px;
    height: 66px;
    display: flex;
    margin: 15px;
    border-radius: 8px;

    li {
      flex: 1;
      line-height: 66px;
      text-align: center;
    }

    li:first-child {
      border-radius: 8px 0 0 8px;
    }

    .name-intro {
      background: #F9FAFC;
      color: #C1C5CD;
      border-left: 1px solid #DCDFE6;
      border-right: 1px solid #DCDFE6;
    }

    .leftBorder {
      border-left: none;
    }
  }

</style>

