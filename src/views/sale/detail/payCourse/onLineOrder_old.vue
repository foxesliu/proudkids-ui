<template>
  <div class="onlineOrder">
    <el-row class="mt10 mb10">
      <el-col :span="3" style="color: #8e8e8e;font-size: 18px;" class="ml20">商品名称：</el-col>
      <el-col :span="6">
        <el-select v-model="goodsId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="mt10 mb10">
      <el-button class="fr mt30 mr30" size="medium" @click="getUrl">生成链接</el-button>
    </el-row>
    <el-row class="mt10 mb10" v-if="show">
      <span class="ml20 mr20">
        生成的url:
      </span>
      <span>
        http://ce.proudkids.cn/prePay?goodsId={{goodsId}}&ccid={{userId}}&phone={{$route.query.phone}}
      </span>
      <a :href="url" target="_blank">购课</a>
    </el-row>
  </div>
</template>

<script>
  import onlineHeader from '../components/onlineHeader'
  import {mapGetters} from 'vuex'
  import {payGoods} from '@/api/sale'

  export default {
    components: {
      'header-box': onlineHeader
    },

    data() {
      return {
        show: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        goodsId: '',
        url: ''
      }
    },
    computed: {
      ...mapGetters(['userId'])
    },
    created() {
      payGoods()
        .then(res => {
          console.log(res.data.data.records)
          this.options = res.data.data.records
        })
    },
    methods: {
      getUrl() {
        if(!this.goodsId){
          this.$message.error('请选择商品名称购课');
          return
        }
        this.show = true
        this.url = 'http://ce.proudkids.cn/prePay?goodsId=' + this.goodsId + '&ccid=' + this.userId + '&phone=' + this.$route.query.phone
      }
    }
  }
</script>

<style lang="scss">
  @import '../detail.scss';

  .onlineOrder {
    @include detail-container();
    @include btn();
    width: 100%;
    min-height: 400px;
    .el-row {
      background: #ffffff;
      height: 100px;
      line-height: 100px;
      border-radius: 10px;
    }
    .el-col {
      text-align: center;
    }
    a{
      display: inline-block;
      width: 100px;
      height: 40px;
      background: #ff8636;
      text-align: center;
      line-height: 40px;
      color: white;
      border-radius: 5px;
      float: right;
      margin: 30px 30px 0 0;
    }
    a:hover{
      background: #FFA76D;
    }
  }
</style>
