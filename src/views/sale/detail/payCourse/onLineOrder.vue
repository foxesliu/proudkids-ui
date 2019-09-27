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
      <span class="ml20 mr20">生成的url:</span>
      <span>{{urlQrcode}}</span>
      <!--<a :href="url" target="_blank">购课</a>-->
      <el-row class="mt10 mb10" v-show="showPdfDownload">
        <div class="img-container">
          <div class="box" id="content">
            <qrcode-vue ref='qrcodes' class="qrcode"
                        :value="urlQrcode" size="200"></qrcode-vue>
          </div>
        </div>

        <!--value="https://wechat.proudkids.cn/prePay/?goodsId=2&cid=122674&ruserId=294577"-->
        <!--<a class="qrcode-downlooad" :href="qrcodeUrl" download="curriculum">下载</a>-->
        <a class="qrcode-downlooad" href="javascript:;" @click="showPdf" download="curriculum">下载</a>
      </el-row>
    </el-row>
  </div>
</template>

<!--这个页面要加个图片合成功能，参照chTeachManage/chTeachPool/TeacherInfo/index.vue-->

<script type="text/ecmascript-6">
  import QrcodeVue from "qrcode.vue";
  import onlineHeader from "../components/onlineHeader";
  import {mapGetters} from "vuex";
  import {payGoods} from "@/api/sale";
  export default {
    components: {
      "header-box": onlineHeader,
      QrcodeVue
    },
    data() {
      return {
        showPdfDownload: false,
        show: false,
        qrcodeUrl: "",
        options: [],
        goodsId: 1,
        url: "",
        urlQrcode: "",
        timestamp: 0
      };
    },
    computed: {
      ...mapGetters(["userId"])
    },
    created() {
      console.log(this.userId);
      this.channelId = this.$route.query.channelId;
      this.ruserId = this.$route.query.ruserId;
      console.log(this.ruserId);
      payGoods().then(res => {
        console.log(res.data.data);
        this.options = res.data.data;
      });
      //this.getUrl();
      setTimeout(() => {
        //this.showPdf();
      }, 2000)

    },
    methods: {
      showPdf(){
        this.showPdfDownload = true;
        let _this = this;
        let html2can = document.getElementById('html2canvas');
        let jspdf = document.getElementById('jspdf');
        if (html2can === null) {
          html2can = document.createElement('script');
          html2can.type = 'text/javascript';
          html2can.src = '../../../../../static/html2canvas.js';
          html2can.id = 'html2can';
          jspdf = document.createElement('script');
          jspdf.type = 'text/javascript';
          jspdf.src = '../../../../../static/jspdf.debug.js';
          jspdf.id = 'jspdf';
          let s = document.getElementsByTagName('head')[0];
          s.appendChild(html2can);
          s.appendChild(jspdf);
        }
        setTimeout(() => {
          html2canvas(document.getElementById("content"), {useCORS: true}).then(function (canvas) {
            var imgData = canvas.toDataURL('image/jpeg');
            _this.download(imgData);
            _this.showPdfDownload = false;
            return;
            var doc = new jsPDF("p", "mm", "a4");
            doc.addImage(imgData, 'JPEG', 0, 0, 1000, 1415);
            doc.save('content.pdf');
          })
        }, 2000);
      },

      download(src) {
        var $a = document.createElement('a');
        $a.setAttribute("href", src);
        $a.setAttribute("download", '商品订单');
        var evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
        $a.dispatchEvent(evObj);
      },

      getUrl() {
        if (!this.goodsId) {
          this.$message.error("请选择商品名称购课");
          return;
        }
        this.show = true;
        this.timestamp = new Date().getTime() + 3 * 60 * 60 * 1000;
        //alert(this.timestamp)
        //https://wechat.proudkids.cn/prePay/?goodsId=2&cid=122674&ruserId=294577
        let _url = this.goodsId + "&cid=" + this.channelId + "&ruserId=" + this.ruserId + "&timestamp=" + this.timestamp;
        this.urlQrcode = "https://wechat.proudkids.cn/prePay/?goodsId=" + _url;
        console.log(this.urlQrcode)
        this.url = "http://ce.proudkids.cn/prePay?goodsId=" + _url;
        // console.log(this.$refs.qrcodes);
        setTimeout(() => {
          let canvas = document.querySelector(".qrcode canvas");
          //console.log(canvas.toDataURL("png"));
          this.qrcodeUrl = canvas.toDataURL("png");
        }, 100);
        setTimeout(() => {
          this.showPdf();
        }, 2000);
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
    .img-container {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 1999;
      .box {
        width: 375px;
        height: 667px;
        position: relative;
        background: url("bg.png") no-repeat;
        background-size: 375px 667px;
        margin: 0 auto;
        .qrcode {
          position: absolute;
          left: 87px;
          top: 317px;
        }
      }
    }
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

</style>
