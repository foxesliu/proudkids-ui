<template>
  <div class="p-20">
    <div class="h-50 mb-10 o-hidden">
      <div class="pull-left font18">商品列表</div>
      <div class="pull-right">
        <router-link to="/goodsmanage/add">
          <el-button type="primary" class="width-150">添加</el-button>
        </router-link>
      </div>
    </div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="课程时长" prop="periods"></el-table-column>
      <el-table-column label="原价" prop="fee"></el-table-column>
      <el-table-column label="折扣价" prop="favour"></el-table-column>
      <el-table-column label="名额" prop="qty"></el-table-column>
      <el-table-column label="课程包类型">
        <template slot-scope="scope">
          <span>{{scope.row.type==1?'长期课':'短期课'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="edit(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getPayGoodsList, deletePayGoods} from '../../api/aom.js';
  export default {
    data(){
      return {
        list: []
      }
    },
    methods: {
      edit(scope){
        console.log(scope.row.id);
        this.$router.push({
          path: '/goodsmanage/edit',
          query: {id: scope.row.id}
        });
      },
      del(scope){
        var _this = this;
        console.log('del');
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePayGoods(scope.row.id).then(() => {
            this.$message({
              duration: 1000,
              type: 'success',
              message: '删除成功!',
              onClose: function () {
                _this._getPayGoodsList();
              }
            });
          });
        }).catch(() => {
          this.$message({type: 'info', duration: 1000, message: '已取消删除'});
        });

      },
      _getPayGoodsList(){
        getPayGoodsList().then((res) => {
          this.list = res.data.data;
          console.log(this.list);
        })
      }
    },
    computed: {},
    created() {
      this._getPayGoodsList();
    },
  }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import "../aom/index.scss";
</style>
