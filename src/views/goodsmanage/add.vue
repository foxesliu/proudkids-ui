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
            <el-option key="1" value="1" label="长期课">长期课</el-option>
            <el-option key="0" value="0" label="短期课">短期课</el-option>
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
  import {addPayGoods} from '../../api/aom.js';
  export default {
    data(){
      return {
        obj: {
          name: '',
          periods: '',
          fee: '',
          favour: '',
          qty: '',
          type: ''
        }
      }
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
        addPayGoods(this.obj).then((res) => {
          this.$message({
            duration: 1000,
            type: 'success',
            message: '新增成功!',
            onClose: function () {
              _this.$router.push({path: '/goodsmanage/list'});
            }
          });
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import "../aom/index.scss";
</style>
