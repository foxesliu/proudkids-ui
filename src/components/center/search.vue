<template>
  <div class="search">
    <el-row class="margin-top" :gutter="20">
      <el-col :span="4" class="tip-title">
        <el-input
          placeholder="渠道名称"
          prefix-icon="el-icon-search"
          v-model="data.channelName"
          @change="getChannelName"
        >
        </el-input>
      </el-col>
      <el-col :span="2" class="tip-title">
        销售：
      </el-col>
      <el-col :span="13">
        <depth-tree :message1="userId" v-on:listenToChildEvent="showMsgFromChild" :selectedMsg="selectedMsg"
                    ref="depthTree">
        </depth-tree>
      </el-col>
      <el-col :span="5" align="right">
        <el-button type="danger" @click="reset()">empty</el-button>
        <el-button type="primary" @click="search()">Search</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import DepthTree from "@/views/sale/depthTree/index2.vue";

  export default {
    components: {
      DepthTree
    },
    data() {
      return {
        data: {},
        selectedMsg: ''
      }
    },
    methods: {
      showMsgFromChild(userIdLists,area,group) {
        this.data.userIdLists = userIdLists
      },
      reset() {
        this.data.channelName = null
        this.data.userIdLists = this.$store.getters.userId
        this.data.msg='clear'
        this.$emit('getSearchData', this.data)
        this.$refs.depthTree.empty()
      },
      search() {
        if(!this.data.channelName){
          this.$message({
            message: '请输入渠道名称',
            type: 'warning'
          });
          return
        }
        this.$emit('getSearchData', this.data)
      },
      getChannelName(){
        sessionStorage.setItem('channelName',this.data.channelName)
      }
    },
    computed: {
      ...mapGetters(['deptId', 'permissions', 'userId'])
    },

  }
</script>

<style lang="scss">
  .search {
    width: 100%;
    height: 57px;
    background-color: #f9fafc;
    border-radius: 4px;
    border: solid 1px #dcdfe6;
    padding:10px 10px 0 10px;
    margin-bottom: 20px;
    .tip-title {
      font-weight: bold;
      line-height: 2;
      color: #8e8e8e;
      text-align: left;
    }
    .search{
      /*padding-right: 10px;*/
    }

  }

</style>
