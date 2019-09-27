<template>
  <div class="evaluateTemplate" v-loading="listLoading">
    <div class="evaluate-header">
      <span>中教评语素材库</span>
      <router-link :to="{path:'/detail/addEvaluateTemplate'}">
        <el-button type="primary" class="fr">添加评语</el-button>
      </router-link>
    </div>
    <div class="evaluateTemplate-list">
      <p v-if="listData.length==0">暂无数据</p>
      <p v-for="(item,index) in listData">
        <el-button type="primary" size="mini" class="fl" style="margin-top: 14px;margin-right: 10px">模板{{index+1}}
        </el-button>
        <span class="fl">{{item.content}}</span>
        <router-link :to="{path:'/detail/addEvaluateTemplate',query:{edit: true,id:item.id,content:item.content}}">
          <el-button type="primary" class="fr mt10 edit" style="margin-left: 10px">编辑</el-button>
        </router-link>
        <el-button type="danger" class="fr mt10 delete" @click="del(item.id)">删除</el-button>
      </p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {evaluateTemplate, deleteTemplate} from '@/api/teachers.js';

  export default {
    data() {
      return {
        listLoading: false,
        listData: []
      }
    },
    created() {
      this.getEvaluateTemplateList()
    },
    methods: {
      //获取评价模板列表数据
      async getEvaluateTemplateList() {
        const obj = {userId: this.userId}
        this.listLoading = true
        const result = await evaluateTemplate(obj)
        this.listData = result.data
        if (result) {
          this.listLoading = false
        }
      },
      //删除评价模板数据
      async delTemplate(id) {
        const retult = await deleteTemplate(id)
        if (retult) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getEvaluateTemplateList()
        }
      },
      //删除
      del(id) {
        this.delTemplate(id)
      }
    },
    computed: {
      ...mapGetters(['userId'])
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .evaluateTemplate {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: 8px 15px 0 15px;

    .evaluate-header {
      font-size: 24px;
      line-height: 57px;
      color: #666666;

      .el-button {
        float: right;
        margin: 10px 0 10px 0;
      }
    }

    .evaluateTemplate-list {
      background-color: #ffffff;
      border-radius: 8px;
      border: solid 1px #dcdfe6;
      padding: 20px;
      color: #fff;

      p {
        height: 54px;
        line-height: 54px;
        background-color: #f9fafc;
        border: solid 1px #e3e6eb;
        padding: 0 8px 0 20px;
        color: #96999f;
        margin-bottom: 10px;

        span {
          width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      p:hover {
        background: #e3e6eb;
      }

      .edit, .delete {
        width: 96px;
        height: 37px;
        margin-top: 8px;
      }

      .fl {
        float: left;
      }

      .fr {
        float: right;
      }
    }
  }

</style>

