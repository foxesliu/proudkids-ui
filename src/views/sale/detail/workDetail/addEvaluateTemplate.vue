<template>
  <div class="evaluateTemplate">
    <div class="evaluate-header">
      <span>评语模板</span>
      <el-button type="primary" class="fr" @click="confirm">确定</el-button>
    </div>
    <div class="evaluateTemplate-cont">
      <el-input
        v-model="content"
        class="textarea"
        type="textarea"
        resize="none"
        :rows="8"
        placeholder="请在这里输入评语">
      </el-input>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {addEvaluateTemplate} from '@/api/teachers.js';

  export default {
    data() {
      return {
        obj: {},
        content: null,
        id: null,
        listLoading: false,
        listData: []
      }
    },
    created() {
      this.content = this.$route.query.content
      this.id = this.$route.query.id
    },
    methods: {
      //新增&&编辑评价模板
      async add(id = this.id) {
        this.obj = {
          userId: this.userId,
          content: this.content,
          id
        }
        this.listLoading = true
        const result = await addEvaluateTemplate(this.obj)
        if (result && id) {
          this.listLoading = false
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
        }
        if (result && !id) {
          this.listLoading = false
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        }
      },
      //确认跳转
      confirm() {
        this.add();
        this.$router.push('/detail/evaluateTemplate')
      }
    },
    computed: {
      ...mapGetters(['userId'])
    }
  }

</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss">
  @import '../common.scss';

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

    .evaluateTemplate-cont {
      background-color: #ffffff;
      border-radius: 8px;
      border: solid 1px #dcdfe6;
      padding: 24px 20px 25px 20px;

      .el-textarea__inner {
        background: #f7f7f7 !important;
        border: none;
        font-size: 14px;
        color: #b5b6b8;
      }

      .el-textarea__inner:focus {
        border: none;
      }
    }
  }

</style>

