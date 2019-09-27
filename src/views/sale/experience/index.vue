<template>
  <div class="index" v-loading="listLoading">
    <ExperienceHeader :tit="tit"></ExperienceHeader>
    <FilterForm
      :showDeptTree="showDeptTree"
      :numSearchFlag="numSearchFlag"
      @getNoStart="getNoStart"
      @getEnded="getEnded"
    ></FilterForm>
    <Tab ref="tab"></Tab>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Tab from "./components/tab";
  import {getExperienceCount} from '@/api/sale'
  import FilterForm from './components/filterForm'
  import ExperienceHeader from '@/components/center/header.vue'

  export default {
    /*
    * showDeptTree 是否显示部门树筛选
    * chooseExperienceClass 是否显示加入班级的筛选及table
    * getNoStart 获取未开始数据
    * getEnded 获取已结束数据
    * */
    name: 'index',
    components: {
      Tab,
      FilterForm,
      ExperienceHeader
    },
    data() {
      return {
        timer: null,
        showDeptTree: true,
        numSearchFlag: true,
        listLoading: true,
        chooseExperienceClass: true,
        // noStart: null,
        // ended: null,
        pages: 1,
        pageSize: 10,
        page: {
          currentPage1: 1,
          currentPage2: 5,
          currentPage3: 5,
          currentPage4: 1
        },
        total: 0,
        tit: '我的体验课',
        dataSource: []
      }
    },
    computed: {
      ...mapGetters(['depthTree', 'permissions', 'userId'])
    },
    methods: {
      getNoStart(data) {  //获取未开始数量
        if (data.num == '0' || data.num) {
          this.listLoading = false
        }
        this.noStart = data
        this.$refs.tab.data[0].num = data.num + '个'
        sessionStorage.setItem('deptUserId', data.userId)
      },
      getEnded(data) {  //获取已结束数量
        if (data.num == '0' || data.num) {
          this.listLoading = false
        }
        this.ended = data
        this.$refs.tab.data[1].num = data.num + '个'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .index {
    width: 100%;
    height: 100%;
    padding: 18px 18px 0 18px;
    background: #fafafa;
    margin-bottom: 20px;
  }

</style>
