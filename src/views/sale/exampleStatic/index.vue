<template>
  <div class="app-container calendar-list-container" style="padding-top:50px;">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-form  label-width="0">

          <depth-tree :message="parentMsg" :message1="userId" v-on:listenToChildEvent="showMsgFromChild">
          </depth-tree>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="width: 100%">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DepthTree from "../depthTree3/index.vue";
  import { mapGetters } from 'vuex'
  import { getAllDepth } from '@/utils/index';
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group'
  import ElOption from "element-ui/packages/select/src/option"
  export default {
    components: {
      DepthTree
    },
    data() {
      return {
        parentMsg: '55555',
        query1: {},
        area: null,
        group: null,
        member: null,

      }
    },
    computed: {
      ...mapGetters([
        'userId',
        'depthTree'
      ]),

    },
    methods: {
      //接收子组件
      showMsgFromChild: function (data) {
        console.log(data)
        this.query1 = {'userIds':data[0]}
        this.area = getAllDepth(this.depthTree,data[1].name1).name
        this.group = getAllDepth(this.depthTree,data[1].name2).name
        this.member = data[1].name3

        console.log(this.area)
        console.log(this.group)
        console.log(this.member)
      },
      onSubmit() {
        console.log('提交')
        if(this.query1.userIds){
          this.$router.push({path:'exampleDetailStatic',query:{ userId:this.query1.userIds,area:this.area,group:this.group,member:this.member}})
        }else {
          this.$message.error('此部门下暂未添加工作人员');
        }

      }
    }
  }
</script>

<style>

</style>
