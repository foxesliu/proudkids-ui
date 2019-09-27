<template>
  <div class="aom-container">
    <div class="p-20">
      <h3>例子情况查询</h3>
      <div class="o-hidden mt-20">
        <div class="pull-left h-37 width30">筛选销售账户：</div>
        <div class="pull-left">
          <depth-tree :message="parentMsg"
                      :message1="userId"
                      ref="depthtreeRef"
                      @listenToChildEvent="showMsgFromChild">
          </depth-tree>
        </div>
      </div>
      <div class="o-hidden mt-20">
        <div class="pull-left h-37 width30">开始时间-结束时间：</div>
        <div class="pull-left">
          <el-date-picker v-model="date" type="daterange" value-format="yyyy-MM-dd"
                          range-separator="-" start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="o-hidden mt-20">
        <div class="pull-left h-37 width30">&nbsp;</div>
        <div class="pull-left">
          <el-button class="width-200" type="primary" @click="search()">搜索</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DepthTree from "../../sale/depthTree3/index2.vue";
  import {mapGetters} from 'vuex'
  import {getAllDepth} from '@/utils/index';
  //import {sfTools} from '../../../aom/util.js';
  export default {
    components: {
      DepthTree: DepthTree
    },
    data(){
      return {
        date: '',
        parentMsg: '55555',
        userIdss: null,
        firstJoin: 0,
        obj: {
          zoneId: '',
          zoneName: '',
          teamId: '',
          teamName: '',
          userId: '',
          userName: '',
          startDate: '',
          endDate: ''
        }
      }
    },
    computed: {
      ...mapGetters(['roleIds', 'deptId', 'userId', 'depthTree'])
    },
    created() {
      console.log('例子情况查询');
    },
    methods: {
      search(){
        console.log(this.date);
        this.obj.startDate = this.date[0];
        this.obj.endDate = this.date[1];
        this.$router.push({
          path: '/sale/exampleConditionsearch-detail',
          query: this.obj
        });
      },
      showMsgFromChild: function (data) {
        this.obj.zoneId = getAllDepth(this.depthTree, data[1].name1).id;
        this.obj.zoneName = getAllDepth(this.depthTree, data[1].name1).name;
        this.obj.teamId = getAllDepth(this.depthTree, data[1].name2).id;
        this.obj.teamName = getAllDepth(this.depthTree, data[1].name2).name;
        //console.log(getAllDepth(this.depthTree, data[1].name1).name)
        //console.log(getAllDepth(this.depthTree, data[1].name2).name)
        //console.log(!data[1]['name3'] ? '' : (data[1]['name3']).split('-')[1]);
        if (!!data[0]) {
          if (String(data[0]).indexOf(',') > -1) {
            this.obj.userId = undefined;
            this.obj.userName = undefined;
          } else {
            this.obj.userId = data[0];
            this.obj.userName = !data[1]['name3'] ? '' : (data[1]['name3']).split('-')[1];
          }
        }
        console.log(this.obj);
      },
    }
  }

</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  @import '../../aom/index.scss';

  .aom-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: white;

    .p-20 {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }

  .h-37 {
    height: 37px;
    line-height: 37px;
  }
</style>
