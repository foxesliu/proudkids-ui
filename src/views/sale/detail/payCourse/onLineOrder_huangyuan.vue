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
        {{url}}
      </span>
      <a :href="url" target="_blank">购课</a>
      <el-row class="mt10 mb10 ">
        <qrcode-vue ref='qrcodes' class="qrcode" value="https://wechat.proudkids.cn/prePay/?goodsId=2&ccid=122674&ruserId=294577" size="100"></qrcode-vue>
        <a class="qrcode-downlooad" :href="qrcodeUrl" download="curriculum">下载</a>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import onlineHeader from "../components/onlineHeader";
import { mapGetters } from "vuex";
import { payGoods } from "@/api/sale";
export default {
  components: {
    "header-box": onlineHeader,
    QrcodeVue
  },
  data() {
    return {
      show: false,
      qrcodeUrl: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      goodsId: "",
      url: "",
      urlQrcode: ""
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  created() {
    payGoods().then(res => {
      console.log(res.data.data.records);
      this.options = res.data.data.records;
    });
  },
  methods: {
    getUrl() {
      if (!this.goodsId) {
        this.$message.error("请选择商品名称购课");
        return;
      }
      this.show = true;
      let _url =
        this.goodsId +
        "&ccid=" +
        this.userId +
        "&ruserId=" +
        this.$route.query.ruserId;
      this.urlQrcode =
        "https://wechat.proudkids.cn/purchase/prePay?goodsId=" + _url;
      this.url = "http://ce.proudkids.cn/prePay?goodsId=" + _url;
      // console.log(this.$refs.qrcodes);
      setTimeout(() => {
        let canvas = document.querySelector(".qrcode canvas");
        console.log(canvas.toDataURL("png"));
        this.qrcodeUrl = canvas.toDataURL("png");
      }, 100);
    }
  }
};
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
@import "../detail.scss";

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
  a {
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
  a:hover {
    background: #ffa76d;
  }
}
.qrcode-downlooad {
  position: relative;
  top: -127px;
  width: 100px !important;
}
.qrcode {
  margin-left: 20px;
}
</style>
