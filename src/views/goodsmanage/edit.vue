<template>
  <div class="p-20">
    <div class="h-50 mb-10 o-hidden">
      <div class="pull-left font18">添加商品</div>
      <div class="pull-right">
        <router-link to="/goodsmanage/list">
          <el-button type="primary" class="width-150">返回列表</el-button>
        </router-link>
      </div>
    </div>
    <div>
      <div class="h-60 o-hidden">
        <div class="pull-left width20 pr-20">商品名称：</div>
        <div class="pull-right width80">
          <el-input placeholder="请输入" v-model="obj.name"/>
        </div>
      </div>
      <div class="h-60 o-hidden">
        <div class="pull-left width20 pr-20">课程时长：</div>
        <div class="pull-right width80">
          <el-input type="number" v-model="obj.periods" placeholder="请输入"/>
        </div>
      </div>
      <div class="h-60 o-hidden">
        <div class="pull-left width20 pr-20">原价：</div>
        <div class="pull-right width80">
          <el-input type="number" v-model="obj.fee" placeholder="请输入"/>
        </div>
      </div>
      <div class="h-60 o-hidden">
        <div class="pull-left width20 pr-20">折扣价：</div>
        <div class="pull-right width80">
          <el-input type="number" v-model="obj.favour" placeholder="请输入"/>
        </div>
      </div>
      <div class="h-60 o-hidden">
        <div class="pull-left width20 pr-20">名额：</div>
        <div class="pull-right width80">
          <el-input type="number" v-model="obj.qty" placeholder="请输入"/>
        </div>
      </div>
      <div class="h-60 o-hidden">
        <div class="pull-left width20 pr-20">课程包类型：</div>
        <div class="pull-right width80">
          <el-select v-model="obj.type" placeholder="请选择">
            <el-option key="1" value="1" label="长期课" value-key="obj.type">长期课</el-option>
            <el-option key="0" value="0" label="短期课" value-key="obj.type">短期课</el-option>
          </el-select>
        </div>
      </div>
      <div class="h-60 o-hidden">
        <div class="pull-left width20 pr-20">&nbsp;</div>
        <div class="pull-right width80">
          <el-button class="width-150" type="success" @click="submit">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {editPayGoods, getPayGoodsList} from '../../api/aom.js';
  export default {
    data(){
      return {
        obj: {
          name: '',
          periods: 0,
          fee: 0,
          favour: 0,
          id: 0,
          qty: 0,
          type: 0
        }
      }
    },
    created() {
      this.obj.id = this.$route.query.id;
      console.log(this.obj.id);
      getPayGoodsList().then((res) => {
        var list = res.data.data;
        console.log(list);
        for (let i = 0; i < list.length; i++) {
          if (Number(list[i]['id']) === Number(this.obj.id)) {
            this.obj.name = list[i]['name'];
            this.obj.periods = list[i]['periods'];
            this.obj.fee = list[i]['fee'];
            this.obj.favour = list[i]['favour'];
            this.obj.qty = list[i]['qty'];
            this.obj.type = list[i]['type'] == 1 ? '1' : '0';
            break;
          }
        }
        console.log(this.obj);
      })
    },
    methods: {
      submit(){
        var flag = true;
        var _this = this;
        for (let i in this.obj) {
          if (!this.obj[i]) {
            flag = false;
            this.$message({
              type: 'error', message: '输入错误!'
            });
            return;
          }
        }
        console.log(flag);
        editPayGoods(this.obj).then((res) => {
          console.log(res);
          this.$message({
            duration: 1000,
            type: 'success',
            message: '编辑成功!',
            onClose: function () {
              _this.$router.push({path: '/goodsmanage/list'});
            }
          });
        })
      }
    },
    computed: {}
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import "../aom/index.scss";
</style>
